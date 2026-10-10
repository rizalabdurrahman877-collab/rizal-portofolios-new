"use client";

import { useEffect, useRef } from "react";

/**
 * StormEffects — lapisan interaksi global (tanpa mengubah komponen section).
 * Bekerja lewat event delegation + selector, jadi cukup dipasang satu kali di page.tsx.
 *
 *  - Tilt 3D + spotlight yang mengikuti kursor pada kartu
 *  - Tombol magnetik
 *  - Reveal 3D saat scroll (elemen di bawah lipatan saja, tanpa flash)
 *  - Kursor kustom (dot + ring) khusus mouse
 *  - Rotasi divider 3D mengikuti posisi scroll
 *
 * Untuk menambah tilt ke elemen lain: tambahkan atribut  data-tilt
 * Untuk menambah reveal ke elemen lain: tambahkan atribut data-reveal
 * Untuk magnet: data-magnetic
 */

const TILT_SEL =
  ".project-card, .contact-card, .contact-info, .luxury-card, .experience-item, [data-tilt]";
const BTN_SEL = ".button, .download-link, [data-magnetic]";
const HOVER_SEL =
  "a, button, input, textarea, [data-tilt], [data-magnetic], .project-card, .experience-item";
const REVEAL_SEL =
  ".section-label, .about-content h2, .about-columns > *, .principles span, .section-heading > *, .experience-heading, .experience-item, [data-reveal]";

export default function StormEffects() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    /* ------------------------- Reveal saat scroll ------------------------- */
    if (!reduced && "IntersectionObserver" in window) {
      const timers: number[] = [];
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            el.classList.add("fx-in");
            // Setelah selesai, lepas class supaya transform hover/tilt bebas dipakai
            const t = window.setTimeout(() => {
              el.classList.remove("fx-reveal", "fx-in");
              el.style.removeProperty("--d");
            }, 1300);
            timers.push(t);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      document.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.classList.add("fx-reveal");
        el.style.setProperty("--d", `${Math.min(idx, 6) * 70}ms`);
        io.observe(el);
      });

      cleanups.push(() => {
        io.disconnect();
        timers.forEach((t) => window.clearTimeout(t));
        document.querySelectorAll<HTMLElement>(".fx-reveal").forEach((el) => {
          el.classList.remove("fx-reveal", "fx-in");
          el.style.removeProperty("--d");
        });
      });
    }

    /* --------------- Divider 3D: rotasi mengikuti scroll --------------- */
    if (!reduced) {
      const scenes = Array.from(document.querySelectorAll<HTMLElement>(".d3-scene"));
      let ticking = false;
      const updateScenes = () => {
        ticking = false;
        const vh = window.innerHeight;
        for (const s of scenes) {
          const r = s.getBoundingClientRect();
          const p = (r.top + r.height / 2 - vh / 2) / vh;
          if (Math.abs(p) < 1.6) s.style.setProperty("--p", p.toFixed(3));
        }
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateScenes);
      };
      updateScenes();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    /* ------- Tilt 3D, spotlight, magnet, kursor (hanya mouse) ------- */
    if (!reduced && finePointer) {
      const dot = dotRef.current;
      const ring = ringRef.current;

      let tiltEl: HTMLElement | null = null;
      let magEl: HTMLElement | null = null;
      let last: PointerEvent | null = null;
      let queued = false;

      let tx = -100, ty = -100; // posisi kursor target
      let rx = -100, ry = -100; // posisi ring (lerp)
      let raf = 0;

      const resetTilt = (el: HTMLElement) => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--spot", "0");
        delete el.dataset.tilting;
      };
      const resetMag = (el: HTMLElement) => {
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      };

      const process = () => {
        queued = false;
        const e = last;
        if (!e || !(e.target instanceof Element)) return;
        const target = e.target;

        // tilt + spotlight
        const el = target.closest<HTMLElement>(TILT_SEL);
        if (el !== tiltEl) {
          if (tiltEl) resetTilt(tiltEl);
          tiltEl = el;
        }
        if (el) {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const amp = r.width > 640 ? 2.5 : 9; // elemen lebar: miring lebih halus
          el.style.setProperty("--rx", `${((0.5 - py) * amp * 2).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${((px - 0.5) * amp * 2).toFixed(2)}deg`);
          el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
          el.style.setProperty("--spot", "1");
          el.dataset.tilting = "1";
        }

        // tombol magnetik
        const b = target.closest<HTMLElement>(BTN_SEL);
        if (b !== magEl) {
          if (magEl) resetMag(magEl);
          magEl = b;
        }
        if (b) {
          const r = b.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
          b.style.setProperty("--tx", `${dx.toFixed(1)}px`);
          b.style.setProperty("--ty", `${dy.toFixed(1)}px`);
        }

        // ring kursor membesar di elemen interaktif
        ring?.classList.toggle("is-active", !!target.closest(HOVER_SEL));
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        tx = e.clientX;
        ty = e.clientY;
        dot?.classList.add("is-on");
        ring?.classList.add("is-on");
        last = e;
        if (!queued) {
          queued = true;
          requestAnimationFrame(process);
        }
      };

      const onLeave = () => {
        if (tiltEl) resetTilt(tiltEl);
        if (magEl) resetMag(magEl);
        tiltEl = magEl = null;
        dot?.classList.remove("is-on");
        ring?.classList.remove("is-on");
      };

      const loop = () => {
        rx += (tx - rx) * 0.18;
        ry += (ty - ry) * 0.18;
        if (dot) dot.style.transform = `translate3d(${tx}px,${ty}px,0)`;
        if (ring) ring.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("mouseleave", onLeave);
        if (tiltEl) resetTilt(tiltEl);
        if (magEl) resetMag(magEl);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div ref={dotRef} className="fx-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="fx-cursor-ring" aria-hidden="true" />
    </>
  );
}
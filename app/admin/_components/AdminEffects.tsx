"use client";

import { useEffect } from "react";

export default function AdminEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Efek ini hanya untuk perangkat dengan mouse
    if (!finePointer) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    let active: HTMLElement | null = null;

    const resetTilt = (el: HTMLElement) => {
      el.style.transform = "";
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          root.style.setProperty("--mx", `${mx}px`);
          root.style.setProperty("--my", `${my}px`);
        });
      }

      if (reduceMotion) return;

      const target =
        e.target instanceof Element
          ? (e.target.closest(".adm-tilt") as HTMLElement | null)
          : null;

      if (active && active !== target) resetTilt(active);

      if (target) {
        const r = target.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        target.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
        target.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        target.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
      }

      active = target;
    };

    const onLeave = () => {
      if (active) resetTilt(active);
      active = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div aria-hidden className="adm-spot" />;
}

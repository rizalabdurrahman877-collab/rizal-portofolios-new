"use client";

import { useEffect, useRef } from "react";

const DEFAULT_TEXTS = [
  "Halo, saya Rizal",
  "Saya seorang Pengembang Web",
  "Saya dari SMKN 1 Pasuruan",
];

type Props = {
  texts?: string[];
};

/**
 * Efek ketik tanpa state: teks diubah langsung lewat DOM (ref),
 * jadi tidak ada re-render React setiap 45-85 ms.
 * Teks pertama sudah ada di HTML server, jadi tidak ada flash kosong.
 */
export default function Typewriter({ texts = DEFAULT_TEXTS }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pengguna reduced motion: tampilkan teks pertama saja
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = texts[0];
      return;
    }

    let index = 0;
    let length = texts[0].length;
    let deleting = true; // teks pertama sudah tampil penuh, jadi mulai dengan menghapus
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = texts[index];

      if (deleting) {
        length -= 1;
        el.textContent = full.slice(0, length);
        if (length <= 0) {
          deleting = false;
          index = (index + 1) % texts.length;
          timer = setTimeout(tick, 500);
          return;
        }
        timer = setTimeout(tick, 45);
      } else {
        length += 1;
        el.textContent = texts[index].slice(0, length);
        if (length >= texts[index].length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 85);
      }
    };

    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [texts]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {texts[0]}
      </span>
      <span aria-hidden="true" className="hx-caret ml-1 text-cyan-400">
        |
      </span>
    </>
  );
}
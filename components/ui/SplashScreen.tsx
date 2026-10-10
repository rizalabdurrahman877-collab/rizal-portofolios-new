"use client";

import { useEffect, useState } from "react";

/** Harus sama dengan total animasi di splash.css (2.7s tunda + 0.7s keluar). */
const SPLASH_MS = 3400;

type Props = {
  /** Nama yang tampil di bawah kubus. */
  name?: string;
  /** Satu huruf di muka kubus. Default: huruf pertama dari name. */
  monogram?: string;
  subtitle?: string;
};

export default function SplashScreen({
  name = "Rizal Portofolio",
  monogram,
  subtitle = "Memuat portofolio",
}: Props) {
  const [visible, setVisible] = useState(true);
  const mark = (monogram ?? name.charAt(0)).toUpperCase();

  useEffect(() => {
    // Kunci scroll selama splash tampil
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prev;
    }, SPLASH_MS);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="sx-root" role="status" aria-label="Memuat halaman">
      <div className="sx-floor" aria-hidden="true" />

      {/* Terowongan cincin 3D */}
      <div className="sx-tunnel" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="sx-tring" style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <div className="sx-stage">
        {/* Kubus kaca 3D + orbit */}
        <div className="sx-cube-wrap" aria-hidden="true">
          <div className="sx-orbit sx-orbit--1" />
          <div className="sx-orbit sx-orbit--2" />
          <div className="sx-cube">
            <div className="sx-face sx-face--front">{mark}</div>
            <div className="sx-face sx-face--back" />
            <div className="sx-face sx-face--right" />
            <div className="sx-face sx-face--left" />
            <div className="sx-face sx-face--top" />
            <div className="sx-face sx-face--bottom" />
            <div className="sx-core" />
          </div>
        </div>

        <div className="sx-text">
          <div className="sx-name" aria-label={name}>
            {name.split("").map((ch, i) => (
              <span
                key={i}
                className="sx-letter"
                style={{ ["--i" as string]: i }}
                aria-hidden="true"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <p className="sx-sub">{subtitle}</p>
        </div>

        <div className="sx-progress" aria-hidden="true">
          <i />
        </div>
      </div>

      <div className="sx-flash" aria-hidden="true" />
      <div className="sx-vignette" aria-hidden="true" />
    </div>
  );
}
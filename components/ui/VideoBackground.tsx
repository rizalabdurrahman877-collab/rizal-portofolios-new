"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  /** Path video relatif terhadap folder /public, contoh: /video/background.mp4 */
  src?: string;
  /** (Opsional) versi webm, lebih kecil dan dipilih browser jika didukung */
  webmSrc?: string;
  /** (Opsional) gambar yang tampil saat video belum siap / dimatikan */
  poster?: string;
  /** Kegelapan overlay (0 - 1). Naikkan jika teks sulit dibaca */
  overlay?: number;
};

export default function VideoBackground({
  src = "/video/background.mp4",
  webmSrc,
  poster,
  overlay = 0.6,
}: Props) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Matikan video jika pengguna hemat data
  useEffect(() => {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    if (conn?.saveData) setDisabled(true);
  }, []);

  // Paksa autoplay (beberapa browser menolak jika tidak dipanggil manual)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce || disabled) return;
    v.muted = true;
    v.play().catch(() => setDisabled(true));
  }, [reduce, disabled]);

  const showVideo = !reduce && !disabled;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]"
    >
      {/* Poster / fallback (hanya dirender jika poster diberikan) */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Overlay gelap supaya teks tetap terbaca */}
      <div
        className="absolute inset-0 bg-[#050816]"
        style={{ opacity: overlay }}
      />

      {/* Vignette di tepi layar */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,8,22,0.8) 100%)",
        }}
      />
    </div>
  );
}
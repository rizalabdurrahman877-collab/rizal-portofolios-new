"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Path video relatif terhadap folder /public, contoh: /video/background.mp4 */
  src?: string;
  /** (Opsional) versi webm, lebih kecil dan dipilih browser jika didukung */
  webmSrc?: string;
  /** Gambar poster WebP. Sangat disarankan: ini yang tampil pertama (LCP) */
  poster?: string;
  /** Kegelapan overlay (0 - 1). Naikkan jika teks sulit dibaca */
  overlay?: number;
  /** Putar video juga di layar mobile (default: false, mobile hanya poster) */
  mobileVideo?: boolean;
};

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

export default function VideoBackground({
  src = "/video/background.mp4",
  webmSrc,
  poster,
  overlay = 0.6,
  mobileVideo = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Muat video HANYA setelah halaman selesai dimuat, saat browser idle,
  // dan hanya jika kondisi pengguna memungkinkan.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInfo })
      .connection;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const slow =
      conn?.saveData || ["slow-2g", "2g"].includes(conn?.effectiveType ?? "");

    if (reduceMotion || slow || (isSmall && !mobileVideo)) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let idle: number | undefined;

    const start = () => setEnabled(true);
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(start, { timeout: 3000 });
      } else {
        timer = setTimeout(start, 1500);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (timer) clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
    };
  }, [mobileVideo]);

  // Jeda saat tab disembunyikan, lanjutkan saat kembali
  useEffect(() => {
    const v = videoRef.current;
    if (!enabled || !v) return;
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]"
    >
      {/* Poster = elemen LCP: ringan, dimuat dengan prioritas */}
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      )}

      {/* Video (dimuat belakangan, fade-in di atas poster) */}
      {enabled && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
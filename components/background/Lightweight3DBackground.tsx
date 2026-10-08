"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   CONFIG
============================================================ */
const VIDEO_SRC = "/videos/background.mp4";
const POSTER_SRC = "/images/background-poster.webp";

/* ============================================================
   COMPONENT
============================================================ */
export default function Lightweight3DBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  /* ----------------------------------------------------------
     Respect prefers-reduced-motion
  ---------------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ----------------------------------------------------------
     Mount guard (avoid SSR mismatch)
  ---------------------------------------------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ----------------------------------------------------------
     Pause video when tab is hidden (save CPU / battery)
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {
          /* autoplay may be blocked — silently ignore */
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mounted, reduceMotion]);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02040b]"
    >
      {/* =====================================================
          VIDEO LAYER (skip if user prefers reduced motion)
      ===================================================== */}
      {!reduceMotion && mounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* =====================================================
          FALLBACK STATIC LAYER (for reduced-motion / no video)
      ===================================================== */}
      {(reduceMotion || !mounted) && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${POSTER_SRC})` }}
        />
      )}

      {/* =====================================================
          DARK CINEMATIC OVERLAY
      ===================================================== */}
      <div className="absolute inset-0 bg-[#02040b]/55" />

      {/* =====================================================
          BLUE / PURPLE LIGHT WASH
      ===================================================== */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 80% 10%, rgba(37, 99, 235, 0.18), transparent 60%),
            radial-gradient(ellipse 60% 50% at 10% 85%, rgba(124, 58, 237, 0.16), transparent 60%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 180, 255, 0.06), transparent 70%)
          `,
        }}
      />

      {/* =====================================================
          SUBTLE GRID (adds "developer" feel)
      ===================================================== */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      {/* =====================================================
          CINEMATIC VIGNETTE
      ===================================================== */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.65) 100%)
          `,
        }}
      />

      {/* =====================================================
          TOP / BOTTOM EDGE FADES
      ===================================================== */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#02040b]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#02040b]/85 to-transparent" />

      {/* =====================================================
          AMBIENT COLOR GLOWS
      ===================================================== */}
      <div
        className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(37, 99, 235, 0.08)" }}
      />
      <div
        className="absolute -left-40 bottom-1/4 h-[450px] w-[450px] rounded-full blur-[120px]"
        style={{ background: "rgba(124, 58, 237, 0.08)" }}
      />

      {/* =====================================================
          FILM GRAIN / NOISE (premium cinematic feel)
      ===================================================== */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
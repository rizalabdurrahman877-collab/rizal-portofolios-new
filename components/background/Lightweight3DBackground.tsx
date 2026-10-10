"use client";

import { useEffect, useState } from "react";

export default function Lightweight3DBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduceMotion(media.matches);
    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{
        zIndex: -1,
        backgroundColor: "#02040b",
        isolation: "isolate",
      }}
    >
      {/* Main gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #080816 0%, #050816 45%, #0b0620 100%)",
        }}
      />

      {/* Blue ambient glow */}
      <div
        className="absolute"
        style={{
          width: "65vw",
          height: "65vw",
          maxWidth: 800,
          maxHeight: 800,
          top: "-20%",
          right: "-15%",
          borderRadius: "50%",
          filter: "blur(90px)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
          animation: reduceMotion
            ? "none"
            : "lbg-float 16s ease-in-out infinite alternate",
        }}
      />

      {/* Purple ambient glow */}
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          left: "-15%",
          bottom: "-25%",
          borderRadius: "50%",
          filter: "blur(90px)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.30) 0%, rgba(124,58,237,0.08) 48%, transparent 70%)",
          animation: reduceMotion
            ? "none"
            : "lbg-float 20s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Cyan light */}
      <div
        className="absolute"
        style={{
          width: 360,
          height: 360,
          top: "38%",
          left: "42%",
          borderRadius: "50%",
          filter: "blur(100px)",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)",
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 15%, transparent 80%)",
        }}
      />

      {/* Dark edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(2,4,11,0.35) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes lbg-float {
          from {
            transform: translate3d(-12px, -10px, 0) scale(0.95);
          }
          to {
            transform: translate3d(18px, 16px, 0) scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
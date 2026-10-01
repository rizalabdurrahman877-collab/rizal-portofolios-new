"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from "framer-motion";

/* ---------- Data (deterministik, aman dari hydration mismatch) ---------- */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(42);

const DOTS = Array.from({ length: 28 }, () => ({
  left: `${(rand() * 100).toFixed(2)}%`,
  top: `${(rand() * 100).toFixed(2)}%`,
  size: Number((1 + rand() * 1.6).toFixed(2)),
  duration: Number((4 + rand() * 5).toFixed(2)),
  delay: Number((rand() * 5).toFixed(2)),
  drift: Math.round(14 + rand() * 26),
  violet: rand() > 0.5,
}));

const ORBS = [
  {
    className:
      "-left-40 -top-40 h-[22rem] w-[22rem] md:h-[30rem] md:w-[30rem] bg-[#7c6cff]/30",
    x: [0, 70, 25, 0],
    y: [0, 45, -20, 0],
    scale: [1, 1.12, 0.95, 1],
    duration: 16,
  },
  {
    className:
      "-bottom-44 -right-44 h-[24rem] w-[24rem] md:h-[34rem] md:w-[34rem] bg-[#b37dff]/25",
    x: [0, -60, -20, 0],
    y: [0, -40, 25, 0],
    scale: [1, 0.94, 1.1, 1],
    duration: 19,
  },
  {
    className: "-right-24 top-16 h-60 w-60 md:h-72 md:w-72 bg-[#4f7bff]/20",
    x: [0, -35, 0],
    y: [0, 40, 0],
    scale: [1, 1.1, 1],
    duration: 13,
  },
  {
    className: "-bottom-28 -left-24 h-56 w-56 md:h-64 md:w-64 bg-[#9b7cff]/20",
    x: [0, 40, 0],
    y: [0, -30, 0],
    scale: [1, 1.08, 1],
    duration: 15,
  },
];

const LINES = [
  { top: "28%", duration: 8, delay: 0 },
  { top: "64%", duration: 11, delay: 3 },
];

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut",
});

/* ---------- Komponen ---------- */

export default function AnimatedBackground() {
  const reduce = useReducedMotion();

  // Spotlight yang mengikuti kursor (hanya di perangkat dengan mouse)
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 110, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 110, damping: 22, mass: 0.5 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, rgba(141,124,255,0.18), transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]"
    >
      {/* Aurora: lapisan conic gradient besar yang berputar pelan */}
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(109,76,255,0.28) 70deg, transparent 140deg, rgba(79,123,255,0.22) 220deg, transparent 290deg, rgba(179,125,255,0.26) 340deg, transparent 360deg)",
        }}
      />

      {/* Orbs (diblur agar menyatu seperti cahaya, bukan lingkaran) */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          animate={
            reduce ? undefined : { x: orb.x, y: orb.y, scale: orb.scale }
          }
          transition={loop(orb.duration)}
          className={`absolute rounded-full blur-[90px] will-change-transform md:blur-[110px] ${orb.className}`}
        />
      ))}

      {/* Glow tengah yang "bernapas" */}
      <motion.div
        animate={
          reduce ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.8, 0.35] }
        }
        transition={loop(7)}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d7cff]/20 blur-[100px] md:h-96 md:w-96"
      />

      {/* Grid dengan fade di tepi */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Garis cahaya yang melintas */}
      {LINES.map((line, i) => (
        <motion.div
          key={i}
          animate={reduce ? undefined : { x: ["-40vw", "110vw"] }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 h-px w-[40vw] bg-gradient-to-r from-transparent via-[#a99bff]/60 to-transparent"
          style={{ top: line.top }}
        />
      ))}

      {/* Partikel melayang */}
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          animate={
            reduce ? undefined : { y: [0, -d.drift, 0], opacity: [0.15, 0.8, 0.15] }
          }
          transition={loop(d.duration, d.delay)}
          className={`absolute rounded-full ${
            d.violet ? "bg-[#b37dff]" : "bg-[#8d9cff]"
          }`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            opacity: reduce ? 0.4 : undefined,
          }}
        />
      ))}

      {/* Spotlight mengikuti mouse */}
      {!reduce && (
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      )}

      {/* Vignette supaya teks di tengah tetap mudah dibaca */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,22,0.75) 100%)",
        }}
      />
    </div>
  );
}
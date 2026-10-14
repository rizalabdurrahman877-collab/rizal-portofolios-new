"use client";

import { motion, useReducedMotion } from "framer-motion";

const technologies = [
  "Figma",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Supabase",
  "MySQL",
];

export default function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  // Duplikasi daftar agar animasi berjalan berulang tanpa jeda.
  const items = [...technologies, ...technologies];

  return (
    <section
      aria-label="Teknologi yang digunakan"
      className="relative isolate overflow-hidden border-y border-cyan-400/10 bg-[#061116]/80 py-7 sm:py-8"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,22,0.98)_0%,rgba(8,145,178,0.06)_50%,rgba(6,17,22,0.98)_100%)]" />

        <div className="absolute left-1/4 top-0 h-24 w-64 -translate-y-1/2 rounded-full bg-cyan-400/6 blur-3xl" />

        <div className="absolute bottom-0 right-1/4 h-24 w-64 translate-y-1/2 rounded-full bg-sky-500/6 blur-3xl" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ["0%", "-50%"] }
          }
          initial={false}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
          style={{
            willChange: shouldReduceMotion ? "auto" : "transform",
          }}
        >
          {items.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex shrink-0 items-center gap-8 px-5 sm:gap-10 sm:px-6"
            >
              <span className="whitespace-nowrap text-sm font-medium tracking-wide text-[#8fa7b5] transition-all duration-300 hover:text-cyan-200 hover:[text-shadow:0_0_12px_rgba(34,211,238,0.5)] sm:text-base">
                {tech}
              </span>

              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.55)]"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-400/25 to-transparent"
      />
    </section>
  );
}

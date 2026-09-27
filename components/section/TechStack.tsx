"use client";

import { motion } from "framer-motion";

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
  const items = [...technologies, ...technologies];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-8">
      <div className="absolute inset-0 bg-blue-500/[0.02]" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative flex w-max items-center gap-10"
      >
        {items.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-10"
          >
            <span className="whitespace-nowrap text-sm font-medium text-slate-500 transition hover:text-blue-400">
              {tech}
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
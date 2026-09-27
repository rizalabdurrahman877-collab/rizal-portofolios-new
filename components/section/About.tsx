"use client";

import { motion } from "framer-motion";
import { Code2, Layers3, Zap } from "lucide-react";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "MySQL",
  "Supabase",
  "Figma",
];

const cards = [
  {
    icon: Code2,
    title: "Clean Code",
    text: "Membuat kode yang terstruktur dan mudah dikembangkan.",
  },
  {
    icon: Layers3,
    title: "Fullstack Apps",
    text: "Mengembangkan aplikasi dari tampilan hingga database.",
  },
  {
    icon: Zap,
    title: "Performance",
    text: "Fokus pada website yang cepat, responsif, dan nyaman digunakan.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-medium text-blue-400">
            01 — About
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            About Me
          </h2>
        </motion.div>

        {/* Main */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="max-w-xl text-3xl font-medium leading-tight sm:text-4xl">
              I build scalable and user-focused web applications.
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-slate-400"
          >
            <p className="leading-8">
              Saya adalah siswa kelas XI Rekayasa Perangkat Lunak
              yang memiliki ketertarikan pada pengembangan website,
              UI/UX, dan teknologi web modern.
            </p>

            <p className="mt-5 leading-8">
              Saya terus mengembangkan kemampuan melalui project
              sekolah maupun project pribadi dengan fokus pada
              website yang modern, responsif, dan mudah digunakan.
            </p>
          </motion.div>
        </div>

        {/* Skill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-14 flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/5 hover:text-blue-300"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl transition duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.03]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <Icon className="text-cyan-400" size={20} />
                </div>

                <h3 className="text-lg font-medium">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
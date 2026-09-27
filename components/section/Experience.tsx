"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "01",
    place: "SMKN 1 PASURUAN",
    title: "Software Engineering Student",
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    description:
      "Mempelajari dasar pemrograman, pengembangan website, database, dan pembuatan aplikasi.",
  },
  {
    year: "02",
    place: "School Projects",
    title: "Web Development",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    description:
      "Membangun berbagai website sebagai bagian dari pembelajaran dan pengembangan kemampuan web development.",
  },
  {
    year: "03",
    place: "Personal Projects",
    title: "UI/UX Design Exploration",
    tech: ["Figma", "UI Design", "UX"],
    description:
      "Mengeksplorasi desain interface modern, responsive layout, dan pengalaman pengguna.",
  },
  {
    year: "04",
    place: "School & Personal Projects",
    title: "Database Development",
    tech: ["MySQL", "Supabase", "XAMPP"],
    description:
      "Mempelajari CRUD, database, relasi data, serta integrasi database dengan aplikasi web.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-blue-400">
            03 — Experience
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Experience that speaks
          </h2>

          <p className="mt-5 max-w-xl text-slate-500">
            Perjalanan saya dalam mempelajari programming dan
            pengembangan aplikasi.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Timeline */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-400/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-blue-400 bg-[#050816] shadow-lg shadow-blue-500/30" />

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.02] sm:p-7">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="text-sm text-blue-400">
                        {item.place}
                      </p>

                      <h3 className="mt-2 text-xl font-medium">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-xs text-slate-700">
                      {item.year}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-500/5 px-3 py-1.5 text-xs text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
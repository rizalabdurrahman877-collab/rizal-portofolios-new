import type { CSSProperties } from "react";

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
    <section id="experience" className="relative overflow-hidden px-6 py-28 lg:py-36">
      {/* Filter SVG untuk efek liquid (distorsi organik) */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="4"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="18s"
                values="0.012 0.018;0.018 0.012;0.012 0.018"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="28" />
          </filter>
        </defs>
      </svg>

      {/* Ambient orbs di belakang agar efek glass terlihat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="gl-orb gl-orb-a" />
        <div className="gl-orb gl-orb-b" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="reveal-view">
          <span className="text-sm font-medium tracking-wide text-[#7dd3fc]">
            03 — PERJALANAN
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bertumbuh lewat karya
          </h2>
          <p className="mt-5 max-w-xl text-[#a9b0d0]">
            Perjalanan saya dalam mempelajari programming dan pengembangan aplikasi.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline: tumbuh dari atas + cahaya mengalir */}
          <div className="timeline-line absolute bottom-0 left-1.75 top-0 w-px" />

          <div className="space-y-12">
            {experiences.map((item, i) => (
              <div
                key={item.year}
                className="glass-enter relative pl-10"
                style={{ "--i": i } as CSSProperties}
              >
                {/* Dot dengan ring berdenyut */}
                <div className="timeline-dot absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-[#7dd3fc] bg-[#050816]" />

                {/* Wrapper perspective untuk efek 3D */}
                <div className="glass-scene">
                  <article className="glass-card rounded-3xl p-6 sm:p-8">
                    <span className="glass-bg" aria-hidden="true">
                      <span className="glass-blob" />
                      <span className="glass-sheen" />
                    </span>

                    <div className="glass-content">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <p className="text-sm text-[#7dd3fc]">{item.place}</p>
                          <h3 className="mt-2 text-xl font-medium">{item.title}</h3>
                        </div>
                        <span className="text-xs tracking-[0.2em] text-[#7a82a8]">
                          {item.year}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <span key={tech} className="glass-chip">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#a9b0d0]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
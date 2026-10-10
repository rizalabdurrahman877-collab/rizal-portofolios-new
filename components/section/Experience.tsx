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

// Server Component: tanpa JavaScript di browser.
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal-view">
          <span className="text-sm font-medium tracking-wide text-[#e5c783]">
            03 — PERJALANAN
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bertumbuh lewat karya
          </h2>

          <p className="mt-5 max-w-xl text-[#aaa69d]">
            Perjalanan saya dalam mempelajari programming dan
            pengembangan aplikasi.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline */}
          <div className="absolute bottom-0 left-1.75 top-0 w-px bg-linear-to-b from-[#e5c783]/60 via-[#d7b979]/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((item) => (
              <div
                key={item.year}
                className="reveal-view reveal-left relative pl-10"
              >
                {/* Dot */}
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-[#e5c783] bg-[#09090d] shadow-lg shadow-[#d7b979]/20" />

                <div className="luxury-card rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="text-sm text-[#e5c783]">
                        {item.place}
                      </p>

                      <h3 className="mt-2 text-xl font-medium">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-xs tracking-[0.2em] text-[#777168]">
                      {item.year}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#d7b979]/10 bg-[#d7b979]/5 px-3 py-1.5 text-xs text-[#aaa69d]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#aaa69d]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

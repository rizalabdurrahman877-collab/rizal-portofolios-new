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
    text: "Membuat kode yang terstruktur, rapi, mudah dipahami, dan mudah dikembangkan.",
  },
  {
    icon: Layers3,
    title: "Fullstack Apps",
    text: "Mengembangkan aplikasi mulai dari tampilan antarmuka hingga pengelolaan database.",
  },
  {
    icon: Zap,
    title: "Performance",
    text: "Berfokus pada website yang cepat, responsif, interaktif, dan nyaman digunakan.",
  },
];

// Server Component: animasi masuk menggunakan CSS.
export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:py-36">
      {/* Cahaya latar cyan */}
      <div className="pointer-events-none absolute left-0 top-20 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07),transparent_70%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Judul */}
        <div className="reveal-view">
          <span className="text-sm font-medium tracking-wide text-[#67e8f9]">
            01 — PROFIL
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tentang Saya
            <span className="text-[#22d3ee]">.</span>
          </h2>
        </div>

        {/* Konten utama */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Sisi kiri */}
          <div className="reveal-view reveal-left">
            <h3 className="max-w-xl text-3xl font-medium leading-tight text-white sm:text-4xl">
              Saya membangun aplikasi web modern yang terstruktur dan
              berorientasi pada kebutuhan pengguna.
            </h3>
          </div>

          {/* Sisi kanan */}
          <div className="reveal-view reveal-right text-[#b5c7d1]">
            <p className="leading-8">
              Saya adalah siswa kelas XI Rekayasa Perangkat Lunak di
              SMKN 1 Pasuruan yang memiliki ketertarikan pada pengembangan
              website, UI/UX, dan teknologi web modern.
            </p>

            <p className="mt-5 leading-8">
              Saya terus mengembangkan kemampuan melalui berbagai proyek
              sekolah maupun proyek pribadi. Saya berfokus membuat website
              yang modern, responsif, terstruktur, dan mudah digunakan.
            </p>
          </div>
        </div>

        {/* Daftar keahlian */}
        <div className="reveal-view mt-14 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#22d3ee]/15 bg-[#06b6d4]/5 px-4 py-2 text-sm text-[#b5c7d1] transition duration-300 hover:-translate-y-1 hover:border-[#22d3ee]/50 hover:bg-[#06b6d4]/10 hover:text-[#67e8f9] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Kartu keunggulan */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="luxury-card reveal-view group rounded-2xl border border-[#22d3ee]/10 bg-[#061116]/50 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#22d3ee]/35 hover:bg-[#08202a]/70 hover:shadow-[0_15px_45px_rgba(8,145,178,0.12)]"
              >
                {/* Ikon */}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#22d3ee]/25 bg-[#06b6d4]/10 transition-all duration-300 group-hover:border-[#22d3ee]/50 group-hover:bg-[#06b6d4]/15 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                  <Icon
                    className="text-[#67e8f9] transition-transform duration-300 group-hover:scale-110"
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-[#67e8f9]">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#a5b4c3]">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

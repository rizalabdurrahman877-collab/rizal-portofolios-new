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

// Server Component: tanpa JavaScript di browser.
// Animasi masuk memakai CSS (.reveal-view) menggantikan framer-motion whileInView.
export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Judul */}
        <div className="reveal-view">
          <span className="text-sm font-medium text-blue-400">
            01 — Tentang Saya
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tentang Saya
          </h2>
        </div>

        {/* Konten utama */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Sisi kiri */}
          <div className="reveal-view reveal-left">
            <h3 className="max-w-xl text-3xl font-medium leading-tight sm:text-4xl">
              Saya membangun aplikasi web modern yang terstruktur dan
              berorientasi pada kebutuhan pengguna.
            </h3>
          </div>

          {/* Sisi kanan */}
          <div className="reveal-view reveal-right text-slate-400">
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

        {/* Keahlian */}
        <div className="reveal-view mt-14 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/2 px-4 py-2 text-sm text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/5 hover:text-blue-300"
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
                className="reveal-view group rounded-2xl border border-white/[0.07] bg-white/2 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-blue-400/20 hover:bg-blue-500/3"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <Icon className="text-cyan-400" size={20} />
                </div>

                <h3 className="text-lg font-medium">{card.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
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

import type { CSSProperties } from "react";
import { Code2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: number;
  nama: string;
  kategori: string | null;
  level: number;
};

async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("id, nama, kategori, level")
      .order("id", { ascending: true });

    if (error) {
      console.error("SKILLS ERROR:", error);
      return [];
    }

    return (data ?? []) as Skill[];
  } catch (err) {
    console.error("SKILLS FETCH ERROR:", err);
    return [];
  }
}

export default async function Skills() {
  const skills = await getSkills();

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Background glow cyan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="gl-orb gl-orb-a"
          style={{
            top: "20%",
            right: "-8%",
            background: "rgba(34, 211, 238, 0.12)",
          }}
        />

        <div
          className="gl-orb gl-orb-b"
          style={{
            bottom: "-5%",
            left: "-8%",
            background: "rgba(8, 145, 178, 0.12)",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="reveal-view mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/6 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              Keahlian
            </p>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Keterampilan{" "}
            <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Saya
            </span>
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-[#b5c7d1]">
            Teknologi dan tools yang saya gunakan untuk membangun website,
            mengembangkan aplikasi, dan menciptakan pengalaman digital.
          </p>

          <div className="mt-6 h-px w-24 bg-linear-to-r from-cyan-400 to-transparent" />
        </div>

        {/* Skills content */}
        {skills.length === 0 ? (
          <div className="glass-card rounded-3xl border border-cyan-400/10 p-10 text-center text-[#b5c7d1]">
            <span className="glass-bg" aria-hidden="true">
              <span className="glass-blob" />
              <span className="glass-sheen" />
            </span>

            <div className="glass-content">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/8 text-cyan-300">
                <Code2 className="h-7 w-7" />
              </div>

              <p className="font-medium text-white">Belum ada keterampilan</p>

              <p className="mt-2 text-sm text-[#8fa7b5]">
                Data keterampilan akan ditampilkan di sini setelah tersedia.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => {
              const level = Math.min(
                Math.max(Number(skill.level) || 0, 0),
                100,
              );

              return (
                <div
                  key={skill.id}
                  className="glass-enter glass-scene group"
                  style={{ "--i": i } as CSSProperties}
                >
                  <article className="glass-card relative h-full overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#07151c]/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_12px_40px_rgba(8,145,178,0.12)] sm:p-6">
                    {/* Glass effect */}
                    <span className="glass-bg" aria-hidden="true">
                      <span className="glass-blob" />
                      <span className="glass-sheen" />
                    </span>

                    <div className="glass-content relative z-10">
                      {/* Skill header */}
                      <div className="mb-6 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="skill-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/8 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.06)] transition-all duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/[0.14] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                            <Code2 className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-white transition-colors duration-300 group-hover:text-cyan-200">
                              {skill.nama}
                            </h3>

                            <p className="mt-1 truncate text-xs text-[#8fa7b5]">
                              {skill.kategori || "Technology"}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-lg border border-cyan-400/15 bg-cyan-400/6 px-2.5 py-1 text-sm font-bold tabular-nums text-cyan-300">
                          {level}%
                        </span>
                      </div>

                      {/* Progress label */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-[#8fa7b5]">
                          Tingkat penguasaan
                        </span>

                        <span className="text-xs text-cyan-300/70">
                          {level === 100
                            ? "Mahir"
                            : level >= 75
                              ? "Lanjutan"
                              : level >= 50
                                ? "Menengah"
                                : "Dasar"}
                        </span>
                      </div>

                      {/* Cyan progress bar */}
                      <div
                        className="skill-track relative h-2 overflow-hidden rounded-full border border-cyan-300/10 bg-[#10232c]"
                        role="progressbar"
                        aria-valuenow={level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Level keterampilan ${skill.nama}`}
                      >
                        <div
                          className="skill-fill relative h-full rounded-full bg-linear-to-r from-cyan-500 via-cyan-300 to-sky-400 shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-[width] duration-1000 ease-out"
                          style={
                            {
                              width: `${level}%`,
                              "--i": i,
                            } as CSSProperties
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 right-0 w-8 rounded-full bg-white/30 blur-sm"
                          />
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="mt-5 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-cyan-300" />
                        <span className="h-px flex-1 bg-linear-to-r from-cyan-400/20 to-transparent" />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

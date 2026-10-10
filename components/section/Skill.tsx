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

    return data || [];
  } catch (err) {
    console.error("SKILLS FETCH ERROR:", err);
    return [];
  }
}

export default async function Skills() {
  const skills = await getSkills();

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Orb latar agar efek kaca terlihat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="gl-orb gl-orb-a" style={{ top: "30%", left: "auto", right: "-8%" }} />
        <div className="gl-orb gl-orb-b" style={{ bottom: "-5%", right: "auto", left: "-6%" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="reveal-view mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#7dd3fc]">
            Keahlian
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Keterampilan saya
          </h2>
          <p className="mt-4 max-w-2xl text-[#a9b0d0]">
            Teknologi dan tools yang saya gunakan dalam mengembangkan berbagai
            project.
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="glass-card rounded-3xl p-10 text-center text-[#a9b0d0]">
            <span className="glass-bg" aria-hidden="true" />
            <div className="glass-content">Belum ada skills.</div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => {
              const level = Math.min(Math.max(skill.level, 0), 100);

              return (
                <div
                  key={skill.id}
                  className="glass-enter glass-scene group"
                  style={{ "--i": i } as CSSProperties}
                >
                  <article className="glass-card rounded-3xl p-5 sm:p-6">
                    <span className="glass-bg" aria-hidden="true">
                      <span className="glass-blob" />
                      <span className="glass-sheen" />
                    </span>

                    <div className="glass-content">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="skill-icon rounded-xl border border-[#7dd3fc]/25 bg-[#7dd3fc]/10 p-2.5 text-[#7dd3fc]">
                            <Code2 className="h-5 w-5" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-white">{skill.nama}</h3>
                            <p className="text-xs text-[#7a82a8]">
                              {skill.kategori || "Technology"}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm font-semibold text-[#7dd3fc]">
                          {level}%
                        </span>
                      </div>

                      {/* Bar level: tabung kaca berisi cairan biru cyan */}
                      <div
                        className="skill-track"
                        role="progressbar"
                        aria-valuenow={level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Level ${skill.nama}`}
                      >
                        <div
                          className="skill-fill"
                          style={
                            {
                              width: `${level}%`,
                              "--i": i,
                            } as CSSProperties
                          }
                        />
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
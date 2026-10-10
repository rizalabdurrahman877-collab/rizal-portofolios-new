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

// Server Component: data diambil di server (statis + revalidate dari app/page.tsx),
// jadi daftar skill sudah ada di HTML tanpa skeleton dan tanpa JavaScript di browser.
export default async function Skills() {
  const skills = await getSkills();

  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#e5c783]">
            Keahlian
          </p>

          <h2 className="text-4xl font-bold text-white sm:text-5xl">
           Keterampilan saya
          </h2>

          <p className="mt-4 max-w-2xl text-[#aaa69d]">
            Teknologi dan tools yang saya gunakan dalam mengembangkan berbagai
            project.
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="luxury-card rounded-2xl p-10 text-center text-[#aaa69d]">
            Belum ada skills.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="luxury-card group rounded-2xl p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-[#d7b979]/15 bg-[#d7b979]/8 p-2.5 text-[#e5c783]">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">{skill.nama}</h3>

                      <p className="text-xs text-[#8e897f]">
                        {skill.kategori || "Technology"}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-[#e5c783]">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#f1d79c] to-[#a77c3d] transition-all duration-1000"
                    style={{
                      width: `${Math.min(Math.max(skill.level, 0), 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: number;
  nama: string;
  kategori: string | null;
  level: number;
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("id, nama, kategori, level")
      .order("id", { ascending: true });

    if (error) {
      console.error("SKILLS ERROR:", error);
      setLoading(false);
      return;
    }

    setSkills(data || []);
    setLoading(false);
  };

  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Skills
          </p>

          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            My Skills
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Teknologi dan tools yang saya gunakan dalam mengembangkan berbagai
            project.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/3"
              />
            ))}
          </div>
        ) : skills.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-zinc-500">
            Belum ada skills.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">{skill.nama}</h3>

                      <p className="text-xs text-zinc-500">
                        {skill.kategori || "Technology"}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-violet-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-violet-500 to-blue-500 transition-all duration-1000"
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

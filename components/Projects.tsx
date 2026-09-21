"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Search,
  X,
  Star,
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import { supabase } from "@/lib/supabase";

type SupabaseProject = {
  id: number;
  created_at: string;
  judul: string | null;
  kategori: string | null;
  deskripsi: string | null;
  teknologi: string | null;
  gambar: string | null;
  link: string | null;
  featured: boolean | null;
};

type CardProject = {
  id: number;
  number: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<CardProject | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } = await supabase
        .from("proyek")
        .select(
          "id, created_at, judul, kategori, deskripsi, teknologi, gambar, link, featured",
        )
        .order("id", { ascending: true });

      if (supabaseError) {
        console.error("SUPABASE ERROR:", supabaseError);

        setError(
          supabaseError.message || "Gagal mengambil data project.",
        );

        return;
      }

      setProjects(data ?? []);
    } catch (err) {
      console.error("FETCH PROJECT ERROR:", err);
      setError("Terjadi kesalahan saat mengambil data project.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        projects
          .map((project) => project.kategori?.trim())
          .filter(Boolean),
      ),
    ) as string[];

    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return projects.filter((project) => {
      const judul = project.judul?.toLowerCase() ?? "";
      const kategori = project.kategori?.toLowerCase() ?? "";
      const deskripsi = project.deskripsi?.toLowerCase() ?? "";
      const teknologi = project.teknologi?.toLowerCase() ?? "";

      const matchCategory =
        activeCategory === "All" ||
        project.kategori === activeCategory;

      const matchSearch =
        !keyword ||
        judul.includes(keyword) ||
        kategori.includes(keyword) ||
        deskripsi.includes(keyword) ||
        teknologi.includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [projects, search, activeCategory]);

  const cardProjects: CardProject[] = useMemo(() => {
    return filteredProjects.map((project, index) => ({
      id: project.id,
      number: String(index + 1).padStart(2, "0"),
      title: project.judul?.trim() || "Project Tanpa Judul",
      category: project.kategori?.trim() || "Project",
      image: project.gambar?.trim() || "/placeholder-project.jpg",
      description:
        project.deskripsi?.trim() ||
        "Belum ada deskripsi untuk project ini.",
      tags: project.teknologi
        ? project.teknologi
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      featured: project.featured ?? false,
      liveUrl: project.link?.trim() || "#",
      githubUrl: "#",
    }));
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-violet-400" />

              <span className="text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
                Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Selected{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-2xl text-zinc-400"
            >
              Beberapa project yang saya kerjakan menggunakan teknologi
              modern.
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full lg:max-w-xs"
          >
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari project..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-white/[0.06]"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                  : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Count */}
        {!loading && !error && (
          <div className="mb-6 text-sm text-zinc-500">
            Menampilkan{" "}
            <span className="font-medium text-zinc-300">
              {cardProjects.length}
            </span>{" "}
            project
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-medium text-red-400">
              Gagal mengambil data project
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchProjects}
              className="mt-5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && cardProjects.length > 0 && (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {cardProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="cursor-pointer"
                >
                  <ProjectCard
                    project={project}
                    onClick={() =>
                      setSelectedProject(project)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && cardProjects.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center">
            <Search className="mx-auto mb-4 h-8 w-8 text-zinc-600" />

            <h3 className="text-lg font-semibold text-white">
              Project tidak ditemukan
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Coba gunakan kata kunci atau kategori lain.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0c0d1b] shadow-2xl"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-zinc-400 backdrop-blur transition hover:text-white"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                    {selectedProject.category}
                  </span>

                  {selectedProject.featured && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {selectedProject.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                {selectedProject.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {selectedProject.liveUrl !== "#" && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      Live Demo
                    </a>
                  )}

                  {selectedProject.githubUrl !== "#" && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                    >
                      <GitBranch className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
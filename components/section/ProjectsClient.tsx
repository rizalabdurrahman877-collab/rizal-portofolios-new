"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch, Search, Star, X } from "lucide-react";
import ProjectCard from "../projects/ProjectCard";

export type CardProject = {
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

type Props = {
  projects: CardProject[];
  error: string;
};

export default function ProjectsClient({ projects, error }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<CardProject | null>(
    null,
  );
  const closeRef = useRef<HTMLButtonElement>(null);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [projects]);

  const cardProjects = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return projects
      .filter((project) => {
        const matchCategory =
          activeCategory === "All" || project.category === activeCategory;

        const haystack =
          `${project.title} ${project.category} ${project.description} ${project.tags.join(" ")}`.toLowerCase();

        return matchCategory && (!keyword || haystack.includes(keyword));
      })
      .map((project, index) => ({
        ...project,
        number: String(index + 1).padStart(2, "0"),
      }));
  }, [projects, search, activeCategory]);

  // Modal: tutup dengan Escape, kunci scroll halaman, fokus ke tombol tutup
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400" />
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
                Portfolio
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Pilih{" "}
              <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Proyek
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-300">
              Beberapa project yang saya kerjakan menggunakan teknologi modern.
            </p>
          </div>

          {/* SEARCH + TAMBAH PROJEK + FILTER */}
          <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:items-end">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch lg:w-auto">
              <div className="relative flex w-full items-center sm:w-72">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 h-4 w-4 text-zinc-500"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari project..."
                  aria-label="Cari project"
                  className="box-border h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-11 pr-4 text-sm leading-normal text-white outline-none transition placeholder:text-zinc-300 focus:border-violet-500/50 focus:bg-white/6"
                />
              </div>

              {/* prefetch={false}: halaman admin tidak ikut diunduh saat beranda dibuka */}
              <Link
                href="/admin/proyek/manajemen"
                prefetch={false}
                className="box-border inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-violet-500 px-5 text-sm font-semibold leading-none text-white transition hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  +
                </span>
                Tambah Projek
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                      : "border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= COUNT ================= */}
        {!error && (
          <div className="mb-6 text-sm text-zinc-400">
            Menampilkan{" "}
            <span className="font-medium text-zinc-300">
              {cardProjects.length}
            </span>{" "}
            project
          </div>
        )}

        {/* ================= ERROR ================= */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-medium text-red-400">
              Gagal mengambil data project
            </p>
            <p className="mt-2 text-sm text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
            >
              Muat Ulang
            </button>
          </div>
        )}

        {/* ================= PROJECTS ================= */}
        {!error && cardProjects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cardProjects.map((project) => (
              <div key={project.id} className="pj-card-in cursor-pointer">
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!error && cardProjects.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/3 py-20 text-center">
            <Search
              aria-hidden="true"
              className="mx-auto mb-4 h-8 w-8 text-zinc-500"
            />
            <h3 className="text-lg font-semibold text-white">
              Project tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Coba gunakan kata kunci atau kategori lain.
            </p>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="pj-fade fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="pj-pop relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0c0d1b] shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-zinc-300 transition hover:text-white"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative aspect-video overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={`Tampilan proyek ${selectedProject.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  {selectedProject.category}
                </span>

                {selectedProject.featured && (
                  <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    Featured
                  </span>
                )}
              </div>

              <h3
                id="project-modal-title"
                className="text-2xl font-bold text-white sm:text-3xl"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-300">
                {selectedProject.description}
              </p>

              {selectedProject.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95"
                  >
                    <ExternalLink
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                    Live Demo
                  </a>
                )}

                {selectedProject.githubUrl !== "#" && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                  >
                    <GitBranch className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  GitBranch,
  Search,
  Star,
  X,
} from "lucide-react";
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
  const [selectedProject, setSelectedProject] =
    useState<CardProject | null>(null);

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
          activeCategory === "All" ||
          project.category === activeCategory;

        const haystack =
          `${project.title} ${project.category} ${project.description} ${project.tags.join(" ")}`.toLowerCase();

        return matchCategory && (!keyword || haystack.includes(keyword));
      })
      .map((project, index) => ({
        ...project,
        number: String(index + 1).padStart(2, "0"),
      }));
  }, [projects, search, activeCategory]);

  // Modal: Escape, penguncian scroll, dan fokus tombol tutup.
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      {/* Cahaya cyan dekoratif */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.09),transparent_70%)]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.10),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#22d3ee]" />

              <span className="text-sm font-medium uppercase tracking-[0.3em] text-[#67e8f9]">
                Pilihan karya
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Pilih{" "}
              <span className="bg-linear-to-r from-[#cffafe] via-[#22d3ee] to-[#0891b2] bg-clip-text text-transparent">
                Proyek
              </span>
              <span className="text-[#22d3ee]">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-[#b5c7d1]">
              Beberapa proyek yang saya kerjakan menggunakan teknologi modern.
            </p>
          </div>

          {/* SEARCH + TAMBAH PROYEK + FILTER */}
          <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:items-end">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch lg:w-auto">
              {/* Pencarian */}
              <div className="relative flex w-full items-center sm:w-72">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 h-4 w-4 text-[#67e8f9]/70"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari proyek..."
                  aria-label="Cari proyek"
                  className="box-border h-12 w-full rounded-xl border border-[#22d3ee]/20 bg-[#061116]/80 pl-11 pr-4 text-sm leading-normal text-white outline-none transition-all duration-300 placeholder:text-[#91a7b5] focus:border-[#22d3ee]/60 focus:bg-[#08202a]/80 focus:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                />
              </div>

              {/* Tambah proyek */}
              <Link
                href="/admin/proyek/manajemen"
                prefetch={false}
                className="box-border inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-linear-to-r from-[#67e8f9] via-[#22d3ee] to-[#0891b2] px-5 text-sm font-semibold leading-none text-[#041116] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
              >
                <span aria-hidden="true" className="text-lg leading-none text-black">
                  +
                </span>
                <span className="text-black">Tambah Proyek</span>
              </Link>
            </div>

            {/* Filter kategori */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-linear-to-r from-[#67e8f9] to-[#0891b2] text-[#041116] shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                        : "border border-[#22d3ee]/15 bg-[#061116]/80 text-[#b5c7d1] hover:border-[#22d3ee]/40 hover:bg-[#06b6d4]/10 hover:text-[#67e8f9]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* JUMLAH PROYEK */}
        {!error && (
          <div className="mb-6 text-sm text-[#a5b4c3]">
            Menampilkan{" "}
            <span className="font-semibold text-[#67e8f9]">
              {cardProjects.length}
            </span>{" "}
            proyek
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center backdrop-blur-xl">
            <p className="text-sm font-medium text-red-400">
              Gagal mengambil data proyek
            </p>

            <p className="mt-2 text-sm text-[#a5b4c3]">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg border border-[#22d3ee]/20 bg-[#06b6d4]/10 px-4 py-2 text-sm text-[#67e8f9] transition hover:border-[#22d3ee]/45 hover:bg-[#06b6d4]/20"
            >
              Muat Ulang
            </button>
          </div>
        )}

        {/* DAFTAR PROYEK */}
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

        {/* EMPTY STATE */}
        {!error && cardProjects.length === 0 && (
          <div className="luxury-card rounded-3xl border border-[#22d3ee]/15 bg-[#061116]/60 py-20 text-center backdrop-blur-xl">
            <Search
              aria-hidden="true"
              className="mx-auto mb-4 h-8 w-8 text-[#67e8f9]/70"
            />

            <h3 className="text-lg font-semibold text-white">
              Proyek tidak ditemukan
            </h3>

            <p className="mt-2 text-sm text-[#a5b4c3]">
              Coba gunakan kata kunci atau kategori lain.
            </p>

            {(search || activeCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-full border border-[#22d3ee]/25 px-4 py-2 text-sm text-[#67e8f9] transition hover:bg-[#06b6d4]/10"
              >
                Reset pencarian
              </button>
            )}
          </div>
        )}
      </div>

      {/* MODAL DETAIL PROYEK */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="pj-fade fixed inset-0 z-60 flex items-center justify-center bg-[#02080c]/85 p-4 backdrop-blur-md"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="pj-pop relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#22d3ee]/20 bg-[#061116] shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
          >
            {/* Tombol tutup */}
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-[#22d3ee]/25 bg-[#061116]/85 p-2 text-[#b5c7d1] transition hover:border-[#22d3ee]/60 hover:bg-[#08202a] hover:text-[#67e8f9]"
              aria-label="Tutup detail proyek"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Gambar proyek */}
            <div className="relative aspect-video overflow-hidden bg-[#08202a]">
              <Image
                src={selectedProject.image}
                alt={`Tampilan proyek ${selectedProject.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#061116]/60 via-transparent to-transparent" />
            </div>

            {/* Detail */}
            <div className="p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#22d3ee]/20 bg-[#06b6d4]/10 px-3 py-1 text-xs font-medium text-[#67e8f9]">
                  {selectedProject.category}
                </span>

                {selectedProject.featured && (
                  <span className="flex items-center gap-1 rounded-full border border-[#22d3ee]/25 bg-[#06b6d4]/10 px-3 py-1 text-xs font-medium text-[#67e8f9]">
                    <Star
                      className="h-3 w-3 fill-current"
                      aria-hidden="true"
                    />
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

              <p className="mt-4 leading-7 text-[#b5c7d1]">
                {selectedProject.description}
              </p>

              {/* Teknologi */}
              {selectedProject.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[#22d3ee]/15 bg-[#06b6d4]/5 px-3 py-1.5 text-xs text-[#b5c7d1] transition-colors hover:border-[#22d3ee]/35 hover:text-[#67e8f9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Tombol proyek */}
              <div className="mt-8 flex flex-wrap gap-3">
                {selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#67e8f9] to-[#0891b2] px-5 py-3 text-sm font-semibold text-[#041116] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] active:scale-95"
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
                    className="inline-flex items-center gap-2 rounded-xl border border-[#22d3ee]/20 bg-[#06b6d4]/5 px-5 py-3 text-sm font-semibold text-[#b5c7d1] transition-all duration-300 hover:border-[#22d3ee]/50 hover:bg-[#06b6d4]/10 hover:text-[#67e8f9]"
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

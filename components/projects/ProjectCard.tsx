"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import type { CSSProperties, PointerEvent } from "react";

type Project = {
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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

/** Helper: atur kedalaman (translateZ) dan kekuatan parallax (px) sebuah layer. */
const layer = (z: number, k: number): CSSProperties =>
  ({ "--z": `${z}px`, "--k": k }) as CSSProperties;

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Parallax per-layer + posisi glare. Tilt 3D & spotlight kartu ditangani StormEffects.
  const handleMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    el.style.setProperty("--gx", `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty("--gy", `${(e.clientY - r.top).toFixed(0)}px`);
  };

  const handleLeave = (e: PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      data-reveal
      className="group w-full rounded-3xl text-left outline-none transition-transform duration-200 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-[#7dd3fc]/70"
    >
      <div className="luxury-card pc-card rounded-3xl">
        {/* ---------- Media (di-clip sendiri supaya layer 3D tetap bebas) ---------- */}
        <div className="pc-media relative h-64 overflow-hidden rounded-t-3xl">
          <div className="pc-img absolute inset-0">
            <Image
              src={project.image}
              alt={`Tampilan proyek ${project.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Overlay warna */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8d7cff]/25 via-transparent to-[#7dd3fc]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Efek hover: grid, glare mengikuti kursor, garis scan */}
          <div className="pc-grid" />
          <div className="pc-glare" />
          <div className="pc-scan" />
        </div>

        {/* ---------- Layer melayang di atas gambar (kedalaman 3D nyata) ---------- */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 [transform-style:preserve-3d]">
          {project.featured && (
            <div
              style={layer(54, 6)}
              className="pc-layer pc-badge absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#7dd3fc]/40 bg-[#050816]/65 px-3 py-1.5 text-xs text-[#bfe9ff] backdrop-blur-md"
            >
              <Star size={12} fill="currentColor" className="pc-star" />
              Featured
            </div>
          )}

          <span
            style={layer(42, 8)}
            className="pc-layer absolute bottom-[1.7rem] left-4 text-sm font-medium tracking-[0.16em] text-white/80 transition-colors duration-300 group-hover:text-[#7dd3fc]"
          >
            {project.number}
          </span>

          <div
            style={layer(76, 12)}
            className="pc-layer absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#050816]/45 text-white backdrop-blur-md transition-[background,color,border-color,box-shadow] duration-300 group-hover:border-[#7dd3fc]/60 group-hover:bg-[#7dd3fc] group-hover:text-[#050816] group-hover:shadow-[0_0_28px_rgba(125,211,252,0.6)]"
          >
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>

        {/* ---------- Konten ---------- */}
        <div className="p-6 [transform-style:preserve-3d]">
          <p
            style={layer(22, 4)}
            className="pc-layer text-xs font-medium uppercase tracking-[0.2em] text-[#7dd3fc]"
          >
            {project.category}
          </p>

          <h3
            style={layer(34, 5)}
            className="pc-layer mt-2 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#d6f2ff]"
          >
            <span className="pc-title">{project.title}</span>
          </h3>

          <p
            style={layer(12, 2)}
            className="pc-layer mt-3 line-clamp-2 text-sm leading-6 text-[#a9b0d0]"
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={layer(18, 3)} className="pc-layer mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                style={{ "--td": `${i * 45}ms` } as CSSProperties}
                className="pc-tag rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[#a9b0d0]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
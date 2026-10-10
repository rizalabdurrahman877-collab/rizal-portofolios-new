"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";

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

export default function ProjectCard({
  project,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="luxury-card overflow-hidden rounded-3xl">

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={`Tampilan proyek ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-90" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f1d79c]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#e5c783]/35 bg-black/60 px-3 py-1.5 text-xs text-[#f1d79c] backdrop-blur-md">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          )}

          {/* Number */}
          <span className="absolute bottom-4 left-4 text-sm font-medium tracking-[0.16em] text-white/80">
            {project.number}
          </span>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#e5c783]/50 group-hover:bg-[#d7b979] group-hover:text-[#17130c]">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e5c783]">
            {project.category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#f1d79c]">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#aaa69d]">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[#aaa69d]"
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

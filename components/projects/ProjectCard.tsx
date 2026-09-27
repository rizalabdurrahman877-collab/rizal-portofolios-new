"use client";

import { motion } from "framer-motion";
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
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group w-full text-left"
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/10">

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-black/60 px-3 py-1.5 text-xs text-yellow-300 backdrop-blur-md">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          )}

          {/* Number */}
          <span className="absolute bottom-4 left-4 text-sm font-medium text-white/70">
            {project.number}
          </span>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
            {project.category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
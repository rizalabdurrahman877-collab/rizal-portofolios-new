"use client";

import { X } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  if (!project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-fuchsia-400/20 bg-[#111111] p-7 shadow-[0_0_100px_rgba(217,70,239,0.15)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-fuchsia-400 hover:bg-fuchsia-400 hover:text-black"
          aria-label="Close project"
        >
          <X size={20} />
        </button>

        <p className="text-sm tracking-[0.3em] text-fuchsia-400">
          PROJECT / {project.number}
        </p>

        <h2 className="mt-5 pr-12 text-4xl font-black tracking-tight sm:text-6xl">
          {project.title}
        </h2>

        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/30">
          {project.category}
        </p>

        <div className="my-8 h-px bg-white/10" />

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400">
            About Project
          </p>

          <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
            {project.detail}
          </p>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400">
            Technologies
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400">
            Project Status
          </p>

          <p className="mt-3 text-sm leading-7 text-white/50">
            Project ini merupakan bagian dari portfolio dan
            proses pengembangan kemampuan web development.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-full bg-fuchsia-400 px-7 py-3 font-semibold text-black transition hover:bg-fuchsia-300"
        >
          Close Project
        </button>
      </div>
    </div>
  );
}
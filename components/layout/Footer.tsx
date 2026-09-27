import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <a
            href="#home"
            className="text-lg font-semibold"
          >
            Rizal
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              .
            </span>
          </a>

          <p className="mt-2 max-w-md text-sm text-slate-600">
            Crafting modern and responsive web experiences with
            clean code and thoughtful design.
          </p>
        </div>

        <a
          href="#home"
          className="group flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-400"
        >
          Back to top
          <ArrowUpRight
            size={15}
            className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-6">
        <p className="text-xs text-slate-700">
          © 2026 Rizal Abdurrakhman. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
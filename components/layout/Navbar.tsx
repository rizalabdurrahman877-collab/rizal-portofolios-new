import { ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// Server Component: hanya menu mobile (MobileMenu) yang butuh JavaScript.
// Scroll halus ditangani CSS (html { scroll-behavior: smooth } di globals.css),
// jadi link anchor biasa sudah cukup tanpa handler JS.
export default function Navbar() {
  return (
    <header className="nav-in fixed inset-x-0 top-0 z-50 w-full border-b border-white/6 bg-[#050816]/95">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <a href="#home" className="group relative flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            {/* Glow (gradient radial, bukan blur) */}
            <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.55),transparent_70%)] opacity-40 transition-all duration-500 group-hover:scale-125 group-hover:opacity-90" />

            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-violet-500/60 via-blue-500/30 to-cyan-400/60 p-px transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-[#080a16] transition-all duration-500 group-hover:border-violet-400/50 group-hover:bg-violet-500/10 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]">
                <span className="bg-linear-to-r from-violet-300 via-blue-400 to-cyan-300 bg-clip-text text-sm font-black tracking-[-0.08em] text-transparent transition-transform duration-500 group-hover:scale-110">
                  RW
                </span>
              </div>
            </div>

            {/* Kilau */}
            <div className="pointer-events-none absolute left-2 top-1 h-2 w-5 rounded-full bg-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <span className="max-w-55 truncate text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-violet-200 sm:max-w-none sm:text-xl">
            Rizal Abdurrakhman Wakhid
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              .
            </span>
          </span>
        </a>

        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="#contact"
            className="group flex items-center gap-2 overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-300 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 hover:bg-linear-to-r hover:from-violet-600/30 hover:to-blue-600/30 hover:text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* MENU MOBILE (satu-satunya bagian client) */}
        <MobileMenu links={links} />
      </nav>
    </header>
  );
}
import { ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

const links = [
  { name: "Beranda", href: "#home" },
  { name: "Tentang", href: "#about" },
  { name: "Proyek", href: "#projects" },
  { name: "Perjalanan", href: "#experience" },
  { name: "Keahlian", href: "#skills" },
  { name: "Kontak", href: "#contact" },
];

// Server Component: hanya menu mobile (MobileMenu) yang butuh JavaScript.
// Scroll halus ditangani CSS (html { scroll-behavior: smooth } di globals.css),
// jadi link anchor biasa sudah cukup tanpa handler JS.
export default function Navbar() {
  return (
    <header className="nav-in fixed inset-x-0 top-0 z-50 w-full border-b border-[#d7b979]/12 bg-[#09090d]/80 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <a href="#home" className="group relative flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            {/* Glow (gradient radial, bukan blur) */}
            <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(215,185,121,0.4),transparent_70%)] opacity-40 transition-all duration-500 group-hover:scale-125 group-hover:opacity-90" />

            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#f1d79c]/70 via-[#b88b48]/30 to-[#f5e8c8]/60 p-px transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-[#11100c] transition-all duration-500 group-hover:border-[#e5c783]/50 group-hover:bg-[#d7b979]/10 group-hover:shadow-[0_0_35px_rgba(215,185,121,0.3)]">
                <span className="bg-linear-to-r from-[#fff0c8] via-[#e5c783] to-[#a77c3d] bg-clip-text text-sm font-black tracking-[-0.08em] text-transparent transition-transform duration-500 group-hover:scale-110">
                  RW
                </span>
              </div>
            </div>

            {/* Kilau */}
            <div className="pointer-events-none absolute left-2 top-1 h-2 w-5 rounded-full bg-[#fff0c8]/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <span className="max-w-55 truncate text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f1d79c] sm:max-w-none sm:text-xl">
            Rizal Abdurrahman Wakhid
            <span className="bg-linear-to-r from-[#f1d79c] to-[#a77c3d] bg-clip-text text-transparent">
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
              className="group relative text-sm text-[#aaa69d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#f1d79c]"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-[#f1d79c] to-[#a77c3d] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="#contact"
            className="group flex items-center gap-2 overflow-hidden rounded-full border border-[#d7b979]/25 bg-[#d7b979]/8 px-5 py-2.5 text-sm font-medium text-[#e5c783] transition-all duration-300 hover:scale-105 hover:border-[#e5c783]/50 hover:bg-[#d7b979]/15 hover:text-white hover:shadow-[0_0_25px_rgba(215,185,121,0.16)]"
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
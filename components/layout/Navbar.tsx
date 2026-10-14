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

export default function Navbar() {
  return (
    <header className="nav-in fixed inset-x-0 top-0 z-50 w-full border-b border-[#22d3ee]/15 bg-[#061116]/80 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <a
          href="#home"
          aria-label="Rizal Abdurrahman Wakhid - Beranda"
          className="group relative flex min-w-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            {/* Cyan glow */}
            <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.4),transparent_70%)] opacity-40 transition-all duration-500 group-hover:scale-125 group-hover:opacity-90" />

            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#67e8f9]/80 via-[#0891b2]/40 to-[#cffafe]/70 p-px transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-[#061116] transition-all duration-500 group-hover:border-[#22d3ee]/60 group-hover:bg-[#06b6d4]/10 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]">
                <span className="bg-linear-to-r from-[#cffafe] via-[#22d3ee] to-[#0891b2] bg-clip-text text-sm font-black tracking-[-0.08em] text-transparent transition-transform duration-500 group-hover:scale-110">
                  RW
                </span>
              </div>
            </div>

            {/* Kilau cyan */}
            <div className="pointer-events-none absolute left-2 top-1 h-2 w-5 rounded-full bg-[#cffafe]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Nama */}
          <span className="max-w-55 truncate text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#67e8f9] sm:max-w-none sm:text-xl">
            Rizal Abdurrahman Wakhid
            <span className="bg-linear-to-r from-[#67e8f9] to-[#0891b2] bg-clip-text text-transparent">
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
              className="group relative whitespace-nowrap text-sm text-[#a5b4c3] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#67e8f9]"
            >
              {link.name}

              {/* Garis cyan saat hover */}
              <span className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-[#67e8f9] to-[#0891b2] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Tombol Hubungi Saya */}
          <a
            href="#contact"
            className="group flex shrink-0 items-center gap-2 overflow-hidden rounded-full border border-[#22d3ee]/25 bg-[#06b6d4]/8 px-5 py-2.5 text-sm font-medium text-[#67e8f9] transition-all duration-300 hover:scale-105 hover:border-[#22d3ee]/60 hover:bg-[#06b6d4]/15 hover:text-white hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
          >
            <span>Hubungi Saya</span>

            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* MENU MOBILE */}
        <MobileMenu links={links} />
      </nav>
    </header>
  );
}

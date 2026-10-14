"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type AdminShellProps = {
  children: React.ReactNode;
  email?: string | null;
  siteUrl?: string;
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/admin/proyek", label: "Proyek", icon: "◆" },
  { href: "/admin/proyek/manajemen", label: "Tambah Proyek", icon: "+" },
];

export default function AdminShell({
  children,
  email,
  siteUrl,
}: AdminShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // "Proyek" tetap aktif di halaman edit/hapus, tapi tidak di halaman manajemen
  const isActive = (href: string) => {
    if (href === "/admin/proyek") {
      return (
        pathname === href ||
        (pathname.startsWith("/admin/proyek/") &&
          !pathname.startsWith("/admin/proyek/manajemen"))
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="relative min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-350">
        {/* =========================
            SIDEBAR (kaca transparan)
        ========================== */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col border-r border-cyan-400/15 bg-linear-to-b from-[#080e26]/60 to-[#050816]/40 shadow-[10px_0_50px_-20px_rgba(37,99,235,0.45)] backdrop-blur-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Garis cyan berkilau di tepi kanan */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.7)]"
          />

          <div className="flex h-full flex-col p-5">
            {/* Brand */}
            <Link
              href="/admin/dashboard"
              className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-cyan-400/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]">
                <span className="text-lg font-black">A</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">
                  Admin Panel
                </p>
                <p className="truncate text-[11px] font-medium text-slate-400">
                  Rizal Portofolio
                </p>
              </div>
            </Link>

            {/* Navigasi */}
            <nav className="flex-1 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-300 hover:translate-x-1.5 ${
                      active
                        ? "border border-cyan-400/40 bg-cyan-400/10 text-white shadow-[0_0_24px_-8px_rgba(34,211,238,0.8)]"
                        : "border border-transparent text-slate-400 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white"
                    }`}
                  >
                    {/* Bar aksen kiri */}
                    <span
                      className={`absolute left-0 top-1/2 w-0.5 -translate-y-1/2 rounded-full bg-linear-to-b from-[#3b82f6] to-[#22d3ee] transition-all duration-300 ${
                        active ? "h-2/3" : "h-0 group-hover:h-1/3"
                      }`}
                    />

                    {/* Ikon */}
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition-all duration-300 ${
                        active
                          ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_16px_-4px_rgba(34,211,238,0.8)]"
                          : "border-white/10 bg-white/3 text-slate-400 group-hover:border-cyan-400/40 group-hover:text-cyan-200"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Kartu pengguna */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#3b82f6] to-[#22d3ee] text-xs font-black text-[#04102a] shadow-[0_0_20px_-6px_rgba(34,211,238,0.8)]">
                  {email?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-black text-white">
                    {email ?? "User"}
                  </p>
                  <p className="truncate text-[11px] font-medium text-slate-400">
                    Administrator
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/"
                  className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                >
                  ← Lihat Website
                </Link>

                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-rose-200"
                  >
                    Keluar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {open && (
          <button
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* =========================
            AREA UTAMA
        ========================== */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Top bar (kaca transparan) */}
          <header className="sticky top-0 z-20 border-b border-cyan-400/10 bg-[#050816]/30 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
              <button
                aria-label="Buka menu"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-200 transition hover:border-cyan-400/40 lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <span className="text-lg leading-none">☰</span>
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-white">
                  Dashboard
                </p>
                <p className="truncate text-[11px] font-medium text-slate-400">
                  Kelola konten website kamu
                </p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-black text-cyan-300">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                  </span>
                  Online
                </span>

                {siteUrl && (
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-3 text-xs font-bold text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    ↗ Buka Situs
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Konten */}
          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>

          {/* Footer */}
          <footer className="border-t border-cyan-400/10 px-4 py-4 text-center text-[11px] font-medium text-slate-500 sm:px-6">
            © {new Date().getFullYear()} Rizal Abdurrahman Wahid · Admin Panel
          </footer>
        </div>
      </div>
    </div>
  );
}
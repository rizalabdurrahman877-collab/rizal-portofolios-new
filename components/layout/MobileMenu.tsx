"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

type NavLink = { name: string; href: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  // Tutup dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:scale-105 hover:border-violet-400/40 hover:bg-violet-500/10"
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="nav-drop absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/6 bg-[#050816]"
        >
          <div className="mx-auto max-w-7xl px-5 pb-5 sm:px-6">
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={close}
                  className="group flex min-h-13 items-center justify-between border-b border-white/5 py-4 text-sm font-medium text-slate-300 transition-all duration-200 hover:pl-2 hover:text-violet-400"
                >
                  <span>{link.name}</span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </a>
              ))}

              <a
                href="#contact"
                onClick={close}
                className="group mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-300 transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/50 hover:bg-linear-to-r hover:from-violet-600/20 hover:to-blue-600/20 hover:text-white"
              >
                Let&apos;s Talk
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="/admin/login"
                onClick={close}
                className="mt-3 flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/3 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
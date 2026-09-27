"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminSidebarProps = {
  email?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({
  email,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isDashboard = pathname === "/admin";

  const isProjects =
    pathname === "/admin/proyek" ||
    pathname.startsWith("/admin/proyek/edit/") ||
    pathname.startsWith("/admin/proyek/hapus/");

  const isManagement = pathname === "/admin/proyek/manajemen";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const menuClass = (active: boolean) =>
    [
      "group",
      "mb-2",
      "flex",
      "w-full",
      "items-center",
      "gap-3",
      "rounded-xl",
      "px-4",
      "py-3",
      "text-sm",
      "font-bold",
      "transition-all",
      "duration-200",
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "bg-blue-100 text-slate-700 hover:bg-blue-200 hover:text-slate-900",
    ].join(" ");

  const iconClass = (active: boolean) =>
    [
      "flex",
      "h-9",
      "w-9",
      "shrink-0",
      "items-center",
      "justify-center",
      "rounded-lg",
      "text-sm",
      "font-black",
      active
        ? "bg-blue-300 text-white"
        : "bg-blue-300 text-slate-700 group-hover:bg-blue group-hover:text-blue-600",
    ].join(" ");

  return (
    <>
      {/* ================= OVERLAY (MOBILE, SAAT SIDEBAR TERBUKA) ================= */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* ================= BRAND ================= */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-md shadow-blue-200">
              R
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-black text-slate-900">
                Rizal Portfolio
              </h1>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Admin Dashboard
              </p>
            </div>
          </Link>

          {/* TOMBOL TUTUP, CUMA MUNCUL DI MOBILE */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* ================= MENU ================= */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
            Menu Utama
          </p>

          {/* DASHBOARD */}
          <Link
            href="/admin"
            onClick={onClose}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
              isDashboard
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-blue-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isDashboard
                  ? "bg-blue-500 text-white"
                  : "bg-blue-300 text-slate-600"
              }`}
            >
              ▦
            </span>

            <span className="flex-1 font-bold">Dashboard</span>
          </Link>

          {/* SEMUA PROYEK */}
          <Link
            href="/admin/proyek"
            onClick={onClose}
            aria-current={isProjects ? "page" : undefined}
            className={menuClass(isProjects)}
          >
            <span className={iconClass(isProjects)}>▤</span>

            <span className="flex-1">Semua Proyek</span>
          </Link>

          {/* TAMBAH PROYEK */}
          <Link
            href="/admin/proyek/manajemen"
            onClick={onClose}
            aria-current={isManagement ? "page" : undefined}
            className={menuClass(isManagement)}
          >
            <span className={iconClass(isManagement)}>+</span>

            <span className="flex-1">Tambah Proyek</span>
          </Link>

          {/* PEMBATAS */}
          <div className="my-6 border-t border-slate-200" />

          <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
            Portfolio
          </p>

          {/* PORTFOLIO */}
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-blue-200 hover:text-blue-600 bg-blue-200"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-200 text-sm font-black text-slate-600 transition group-hover:bg-blue-200 group-hover:text-blue-600">
              ↗
            </span>

            <span>Lihat Portfolio</span>
          </a>
        </nav>

        {/* ================= USER ================= */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-600">
              {email?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Login sebagai
              </p>

              <p className="truncate text-sm font-black text-slate-800">
                {email || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
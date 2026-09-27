"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";
import LogoutButton from "./LogoutButton";
import Toast from "./Toast";

type AdminShellProps = {
  email?: string;
  siteUrl: string;
  children: React.ReactNode;
};

export default function AdminShell({
  email,
  siteUrl,
  children,
}: AdminShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={null}>
        <Toast />
      </Suspense>

      <AdminSidebar
        email={email}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 lg:h-24 lg:px-8">
          <div className="flex items-center gap-3">
            {/* TOMBOL HAMBURGER, CUMA MUNCUL DI MOBILE */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Buka menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-slate-700 transition hover:bg-blue-200 lg:hidden"
            >
              <span className="text-xl leading-none">☰</span>
            </button>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Admin Panel Dashboard
              </p>

              <h1 className="mt-1 text-base font-black text-slate-900 lg:text-lg">
                Portfolio Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[11px] font-medium text-slate-400">
                Role Account
              </p>

              <p className="text-sm font-black text-slate-800">{email}</p>
            </div>

            <Link
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center justify-center rounded-xl bg-blue-500 px-5 text-sm font-bold text-slate-700 transition hover:bg-blue-400 sm:inline-flex"
            >
              Kembali ke portofolio ↗
            </Link>

            <LogoutButton />
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)] w-full px-4 py-6 lg:min-h-[calc(100vh-6rem)] lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
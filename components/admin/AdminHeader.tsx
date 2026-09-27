import Link from "next/link";
import { logoutAction } from "@/actions/proyek-actions";

type AdminHeaderProps = {
  email?: string;
};

   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function AdminHeader({ email }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Admin Panel
        </p>

        <h2 className="text-sm font-black text-slate-900 sm:text-base">
          Portfolio Management
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[11px] font-medium text-slate-400">
            Administrator
          </p>

          <p className="max-w-48 truncate text-sm font-bold text-slate-700">
            {email}
          </p>
        </div>

        <Link
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-blue-400 sm:inline-flex"
        >
          Lihat Portfolio
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}

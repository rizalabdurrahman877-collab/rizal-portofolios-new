import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar email={user.email} />

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-40 flex h-24 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              Admin Panel Dashboard
            </p>

            <h1 className="mt-1 text-lg font-black text-slate-900">
              Portfolio Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[11px] font-medium text-slate-400">
                Role Account
              </p>

              <p className="text-sm font-black text-slate-800">{user.email}</p>
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

        <main className="min-h-[calc(100vh-6rem)] w-full px-6 py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

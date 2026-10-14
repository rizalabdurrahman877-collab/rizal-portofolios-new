import "./admin.css";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";
import AdminBackground from "./_components/AdminBackground";
import AdminEffects from "./_components/AdminEffects";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).trim();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="adm-root">
      {/* Lapisan paling belakang: animasi 3D */}
      <AdminBackground />

      {/* Lapisan efek cahaya yang mengikuti kursor */}
      <AdminEffects />

      {/* Konten utama, dibuat transparan agar background terlihat */}
      <div className="relative z-10 min-h-screen [&>*]:bg-transparent! [&_aside]:bg-transparent! [&_header]:bg-transparent! [&_nav]:bg-transparent!">
        {user ? (
          <AdminShell email={user.email ?? null} siteUrl={siteUrl}>
            {children}
          </AdminShell>
        ) : (
          <main className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">{children}</div>
          </main>
        )}
      </div>
    </div>
  );
}
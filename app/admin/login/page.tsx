import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(`/admin/login?error=Email+dan+password+harus+diisi`);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    redirect(`/admin/login?error=Email+atau+password+salah`);
  }

  // Login berhasil
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Cek apakah user sudah login
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika sudah login, redirect ke dashboard
  if (user) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-xl shadow-blue-900/30">
            R
          </div>
          <h1 className="mt-5 text-2xl font-black text-white">
            Rizal Portfolio
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-400">
            Admin Dashboard
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-black text-slate-900">
              Selamat Datang
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Login untuk mengelola portfolio kamu.
            </p>
          </div>

          {params.error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-bold text-red-600">{params.error}</p>
            </div>
          )}

          <form action={loginAction} className="space-y-5">
            {/* EMAIL INPUT - GLASSMORPHISM */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="abcdefg@gmail.com"
                required
                className="h-12 w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-white/50 focus:ring-4 focus:ring-blue-200/50"
              />
            </div>

            {/* PASSWORD INPUT - GLASSMORPHISM */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Masukkan password"
                required
                className="h-12 w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-md px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-white/50 focus:ring-4 focus:ring-blue-200/50"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] hover:-translate-y-0.5"
            >
              Login Ke Dashboard
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs font-medium text-slate-500">
          © 2026 Rizal Portfolio
        </p>
      </div>
    </main>
  );
}
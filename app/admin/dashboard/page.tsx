import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: proyek, error } = await supabase
    .from("proyek")
    .select("id, judul, teknologi")
    .order("id", { ascending: false });

  const jumlahProyek = proyek?.length ?? 0;

  return (
    <div className="w-full">
      {/* =========================
          HEADER
      ========================== */}
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
          Dashboard Admin
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Selamat Datang 👋
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Kelola portfolio, proyek, dan konten website kamu
          dengan mudah dari satu dashboard.
        </p>
      </div>

      {/* =========================
          STATISTIK
      ========================== */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {/* Total Proyek */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">
                Total Proyek
              </p>

              <p className="mt-3 text-4xl font-black text-slate-900">
                {jumlahProyek}
              </p>

              <p className="mt-2 text-xs font-medium text-slate-400">
                Proyek dalam portfolio
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-600">
              #
            </div>
          </div>
        </div>

        {/* Status Sistem */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">
                Status Sistem
              </p>

              <p className="mt-3 text-3xl font-black text-emerald-600">
                Aktif
              </p>

              <p className="mt-2 text-xs font-medium text-slate-400">
                Sistem berjalan normal
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-black text-emerald-600">
              ✓
            </div>
          </div>
        </div>

        {/* Hak Akses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">
                Hak Akses
              </p>

              <p className="mt-3 text-3xl font-black text-slate-900">
                Admin
              </p>

              <p className="mt-2 text-xs font-medium text-slate-400">
                Akses pengelolaan penuh
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl font-black text-purple-600">
              A
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          QUICK ACTION
      ========================== */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 shadow-lg shadow-blue-100 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-100">
              Kelola Portfolio
            </p>

            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Tambahkan proyek baru
            </h2>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-blue-100">
              Masukkan proyek terbaru kamu agar tampil di
              portfolio dan dapat dikelola melalui halaman admin.
            </p>
          </div>

          <Link
            href="/admin/proyek/manajemen"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            <span className="text-xl leading-none">+</span>
            <span>Tambah Proyek</span>
          </Link>
        </div>
      </div>

      {/* =========================
          PROYEK TERBARU
      ========================== */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Proyek Terbaru
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Proyek yang sudah kamu tambahkan.
            </p>
          </div>

          <Link
            href="/admin/proyek"
            className="inline-flex items-center text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            Lihat Semua
            <span className="ml-1">→</span>
          </Link>
        </div>

        {/* =========================
            ERROR
        ========================== */}
        {error ? (
          <div className="p-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
              Gagal mengambil data proyek.
            </div>
          </div>
        ) : proyek && proyek.length > 0 ? (
          /* =========================
             LIST PROJECT
          ========================== */
          <div>
            {proyek.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-slate-100 px-6 py-5 transition last:border-0 hover:bg-slate-50"
              >
                {/* Nomor */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <span className="text-sm font-black text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Informasi */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-black text-slate-900">
                    {item.judul}
                  </h3>

                  <p className="mt-1 truncate text-xs font-medium text-slate-500">
                    {item.teknologi || "Teknologi belum diisi"}
                  </p>
                </div>

                {/* Status */}
                <span className="hidden shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600 sm:inline-flex">
                  Aktif
                </span>

                {/* Edit */}
                <Link
                  href={`/admin/proyek/edit/${item.id}`}
                  className="hidden shrink-0 rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-200 hover:text-blue-800 sm:inline-flex"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* =========================
             EMPTY STATE
          ========================== */
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-black text-slate-400">
              +
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-900">
              Belum ada proyek
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
              Tambahkan proyek pertama kamu untuk mulai
              membangun portfolio.
            </p>

            <Link
              href="/admin/proyek/manajemen"
              className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-md shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <span className="text-lg leading-none">+</span>
              Tambah Proyek
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
import Link from "next/link";

export default function AdminPortfolioPage() {
  return (
    <main className="w-full">
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
          Admin Portfolio
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Portfolio Admin 👋
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Selamat datang di area pengelolaan portfolio. Dari sini kamu dapat
          membuka dashboard dan mengelola proyek.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/dashboard"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
            📊
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-900">
            Dashboard Admin
          </h2>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Lihat statistik, proyek terbaru, dan akses pengelolaan portfolio.
          </p>

          <span className="mt-5 inline-flex text-sm font-black text-blue-600 transition group-hover:translate-x-1">
            Buka Dashboard →
          </span>
        </Link>

        <Link
          href="/admin/proyek/manajemen"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
            ＋
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-900">
            Tambah Proyek
          </h2>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Tambahkan proyek baru agar dapat ditampilkan pada portfolio.
          </p>

          <span className="mt-5 inline-flex text-sm font-black text-indigo-600 transition group-hover:translate-x-1">
            Tambah Sekarang →
          </span>
        </Link>
      </div>
    </main>
  );
}

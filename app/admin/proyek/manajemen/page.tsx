import Link from "next/link";
import { tambahProyekAction } from "@/actions/project-actions";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ManajemenProyekPage() {
  const supabase = await createSupabaseServerClient();

  const { count } = await supabase
    .from("proyek")
    .select("id", {
      count: "exact",
      head: true,
    });

  const totalProyek = count ?? 0;

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
          Manajemen Proyek
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Tambah Proyek
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Tambahkan proyek baru ke portfolio kamu.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Proyek Aktif
          </p>

          <p className="mt-3 text-4xl font-black text-green-600">
            {totalProyek}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Proyek tersedia
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Total Proyek
          </p>

          <p className="mt-3 text-4xl font-black text-slate-900">
            {totalProyek}
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Semua proyek portfolio
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            Akses
          </p>

          <p className="mt-3 text-3xl font-black text-slate-900">
            Admin
          </p>

          <p className="mt-2 text-xs font-medium text-slate-400">
            Hak akses penuh
          </p>
        </div>

      </div>

      {/* Form */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
          <h2 className="text-xl font-black text-slate-900">
            Informasi Proyek
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Isi semua informasi proyek dengan lengkap.
          </p>
        </div>

        <form
          action={tambahProyekAction}
          className="space-y-6 p-6 sm:p-8"
        >

          {/* Judul */}
          <div>
            <label
              htmlFor="judul"
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Judul Proyek
            </label>

            <input
              id="judul"
              name="judul"
              type="text"
              placeholder="Contoh: Sistem Manajemen Siswa"
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label
              htmlFor="deskripsi"
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Deskripsi
            </label>

            <textarea
              id="deskripsi"
              name="deskripsi"
              rows={6}
              placeholder="Jelaskan tentang proyek ini..."
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Teknologi */}
          <div>
            <label
              htmlFor="teknologi" 
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Teknologi
            </label>

            <input
              id="teknologi"
              name="teknologi"
              type="text"
              placeholder="Contoh: Next.js, Supabase, Tailwind CSS"
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              href="/admin"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-red-500 px-6 text-sm font-black text-slate-700 hover:bg-red-4[y00"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
            >
              <span className="text-lg">
                +
              </span>

              Tambah Proyek
            </button>

          </div>

        </form>
      </section>

    </div>
  );
}
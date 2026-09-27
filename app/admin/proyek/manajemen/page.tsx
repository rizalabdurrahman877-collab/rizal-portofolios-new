import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { tambahProyekAction } from "@/actions/proyek-actions";

export default async function ManajemenProyekPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const { data: daftarProyek } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
          Manajemen Proyek
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tambah, ubah, atau hapus data proyek yang tampil di halaman portfolio.
        </p>
      </div>

      {params.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {params.error}
        </div>
      )}

      {params.success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-600">
          {params.success}
        </div>
      )}

      {/* ================= TABEL DAFTAR PROYEK ================= */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-140 text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Judul
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Kategori
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Featured
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {daftarProyek?.map((proyek) => (
              <tr key={proyek.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {proyek.judul}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                  {proyek.kategori}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {proyek.featured ? "✓" : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/proyek/edit/${proyek.id}`}
                      className="whitespace-nowrap rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-400"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/proyek/hapus/${proyek.id}`}
                      className="whitespace-nowrap rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-400"
                    >
                      Hapus
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {(!daftarProyek || daftarProyek.length === 0) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  Belum ada data proyek.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= FORM TAMBAH PROYEK ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Tambah Proyek Baru
        </h2>

        <form action={tambahProyekAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Judul Proyek
              </label>
              <input
                name="judul"
                required
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Kategori
              </label>
              <input
                name="kategori"
                placeholder="Web Application / Management System / IOT"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Teknologi (pisah koma)
              </label>
              <input
                name="teknologi"
                placeholder="Next.js, Tailwind, Supabase"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Link Proyek
              </label>
              <input
                name="link"
                type="url"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Gambar Proyek
            </label>

            <input
              name="gambar"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-500">
              Format JPG, PNG, atau WEBP. Maksimal 5 MB.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-black">
            <input type="checkbox" name="featured" className="h-4 w-4" />
            Tandai sebagai Featured
          </label>
          

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Simpan Proyek
          </button>
        </form>
      </div>
    </div>
  );
}

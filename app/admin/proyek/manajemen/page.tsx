import Link from "next/link";
import { tambahProyekAction } from "@/actions/proyek-actions";
import { requireAdminUser } from "@/lib/admin-auth";

export default async function ManajemenProyekPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireAdminUser();

  const { data: daftarProyek } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <div className="adm-up" style={{ ["--i" as string]: 0 }}>
        <span className="adm-badge mb-4">
          <span className="adm-dot" />
          Manajemen
        </span>

        <h1 className="adm-title-grad text-3xl font-black tracking-tight sm:text-4xl">
          Manajemen Proyek
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-400">
          Tambah, ubah, atau hapus data proyek yang tampil di halaman portfolio.
        </p>
      </div>

      {/* PESAN ERROR */}
      {params.error && (
        <div
          className="adm-up adm-alert adm-alert-error"
          style={{ ["--i" as string]: 1 }}
        >
          {params.error}
        </div>
      )}

      {/* PESAN SUKSES */}
      {params.success && (
        <div
          className="adm-up adm-alert adm-alert-success"
          style={{ ["--i" as string]: 1 }}
        >
          {params.success}
        </div>
      )}

      {/* TABEL DAFTAR PROYEK */}
      <div
        className="adm-card adm-up"
        style={{ ["--i" as string]: 2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="adm-th">Judul</th>
                <th className="adm-th">Kategori</th>
                <th className="adm-th">Featured</th>
                <th className="adm-th">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {daftarProyek?.map((proyek) => (
                <tr
                  key={proyek.id}
                  className="group transition-colors duration-300 hover:bg-cyan-400/5"
                >
                  <td className="px-4 py-3.5 font-bold text-white transition-colors group-hover:text-cyan-200">
                    {proyek.judul}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3.5 text-slate-400">
                    {proyek.kategori || "—"}
                  </td>

                  <td className="px-4 py-3.5">
                    {proyek.featured ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-black text-cyan-300 shadow-[0_0_18px_-6px_rgba(34,211,238,0.6)]">
                        <span className="adm-dot" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/proyek/edit/${proyek.id}`}
                        className="adm-btn adm-btn-sm adm-btn-ghost"
                      >
                        ✎ Edit
                      </Link>

                      <Link
                        href={`/admin/proyek/hapus/${proyek.id}`}
                        className="adm-btn adm-btn-sm adm-btn-danger"
                      >
                        🗑 Hapus
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {(!daftarProyek || daftarProyek.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-4 py-14 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-xl text-slate-500">
                      ◆
                    </div>
                    <p className="text-sm font-bold text-slate-300">
                      Belum ada data proyek
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Tambahkan proyek pertama kamu di bawah.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM TAMBAH PROYEK */}
      <div
        className="adm-card adm-up relative p-6 sm:p-8"
        style={{ ["--i" as string]: 3 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.25),_transparent_70%)] blur-2xl"
        />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-black text-cyan-300 shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]">
              +
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Tambah Proyek Baru
              </h2>
              <p className="text-xs font-medium text-slate-400">
                Isi data di bawah, lalu klik simpan.
              </p>
            </div>
          </div>

          <form action={tambahProyekAction} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="judul" className="adm-label">
                  Judul Proyek
                </label>
                <input
                  id="judul"
                  name="judul"
                  type="text"
                  required
                  placeholder="Contoh: Website Portfolio"
                  className="adm-input"
                />
              </div>

              <div>
                <label htmlFor="kategori" className="adm-label">
                  Kategori
                </label>
                <input
                  id="kategori"
                  name="kategori"
                  type="text"
                  placeholder="Web Application / Management System / IoT"
                  className="adm-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deskripsi" className="adm-label">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={3}
                placeholder="Tuliskan deskripsi singkat proyek..."
                className="adm-input adm-textarea"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="teknologi" className="adm-label">
                  Teknologi
                </label>
                <input
                  id="teknologi"
                  name="teknologi"
                  type="text"
                  placeholder="Next.js, Tailwind, Supabase"
                  className="adm-input"
                />
                <p className="adm-hint">Pisahkan teknologi menggunakan koma.</p>
              </div>

              <div>
                <label htmlFor="link" className="adm-label">
                  Link Proyek
                </label>
                <input
                  id="link"
                  name="link"
                  type="url"
                  placeholder="https://..."
                  className="adm-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gambar" className="adm-label">
                Gambar Proyek
              </label>
              <input
                id="gambar"
                name="gambar"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                required
                className="adm-input adm-file h-auto cursor-pointer py-2 text-slate-300"
              />
              <p className="adm-hint">
                Format JPG, PNG, atau WEBP. Maksimal 5 MB.
              </p>
            </div>

            <label className="adm-check">
              <input type="checkbox" name="featured" />
              <span className="text-sm font-bold text-slate-300">
                Tandai sebagai <span className="text-cyan-300">Featured</span>
              </span>
            </label>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="adm-btn adm-btn-lg adm-btn-primary"
              >
                <span>💾</span>
                <span>Simpan Proyek</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
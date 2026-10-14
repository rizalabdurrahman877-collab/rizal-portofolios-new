import Link from "next/link";
import { requireAdminUser } from "@/lib/admin-auth";

export default async function AdminProyekPage() {
  const { supabase } = await requireAdminUser();

  const { data: proyek, error } = await supabase
    .from("proyek")
    .select("id, judul, deskripsi, teknologi, kategori")
    .order("id", { ascending: false });

  const jumlahProyek = proyek?.length ?? 0;

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <div
        className="adm-up flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        style={{ ["--i" as string]: 0 }}
      >
        <div>
          <span className="adm-badge mb-4">
            <span className="adm-dot" />
            Portfolio
          </span>

          <h1 className="adm-title-grad text-3xl font-black tracking-tight sm:text-4xl">
            Semua Proyek
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-400">
            Kelola semua proyek yang ada di portfolio kamu.
          </p>
        </div>

        <Link
          href="/admin/proyek/manajemen"
          className="adm-btn adm-btn-lg adm-btn-primary w-fit"
        >
          <span className="text-xl leading-none">+</span>
          Tambah Proyek
        </Link>
      </div>

      {/* DAFTAR */}
      <section
        className="adm-card adm-up w-full"
        style={{ ["--i" as string]: 1 }}
      >
        <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Daftar Proyek</h2>
            <p className="mt-1 text-sm text-slate-400">
              Edit atau hapus proyek yang sudah ada.
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
            {jumlahProyek} Proyek
          </span>
        </div>

        {error ? (
          <div className="p-6">
            <div className="adm-alert adm-alert-error">
              Gagal mengambil data proyek.
            </div>
          </div>
        ) : proyek && proyek.length > 0 ? (
          <div>
            {proyek.map((item, index) => (
              <div
                key={item.id}
                className="adm-row grid gap-5 border-b border-white/5 px-6 py-6 last:border-b-0 hover:bg-cyan-400/5 lg:grid-cols-[70px_minmax(180px,1fr)_minmax(250px,1.5fr)_170px]"
                style={{ ["--i" as string]: index + 2 }}
              >
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10">
                    <span className="text-sm font-black text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-white">
                    {item.judul}
                  </h3>

                  <span className="mt-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                    Aktif
                  </span>
                </div>

                <div>
                  <p className="line-clamp-2 text-sm leading-6 text-slate-400">
                    {item.deskripsi || "Belum ada deskripsi."}
                  </p>

                  <p className="mt-2 text-sm font-bold text-cyan-300">
                    {item.teknologi || "Teknologi belum diisi"}
                  </p>
                </div>

                <div className="flex items-center gap-2 lg:justify-end">
                  <Link
                    href={`/admin/proyek/edit/${item.id}`}
                    className="adm-btn adm-btn-lg adm-btn-ghost"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/admin/proyek/hapus/${item.id}`}
                    className="adm-btn adm-btn-lg adm-btn-danger"
                  >
                    Hapus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-slate-500">
              +
            </div>

            <h3 className="mt-5 text-lg font-black text-white">
              Belum ada proyek
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Tambahkan proyek pertama kamu.
            </p>

            <Link
              href="/admin/proyek/manajemen"
              className="adm-btn adm-btn-lg adm-btn-primary mt-5"
            >
              + Tambah Proyek
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
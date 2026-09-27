import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminProyekPage() {
  const supabase = await createSupabaseServerClient();

  const { data: proyek, error } = await supabase
    .from("proyek")
    .select("id, judul, deskripsi, teknologi")
    .order("id", { ascending: false });

  const jumlahProyek = proyek?.length ?? 0;

  return (
    <div className="w-full">
      {/* HEADER HALAMAN */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2">
            <span className="text-xs font-black text-blue-600">Portfolio</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Semua Proyek
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Kelola semua proyek yang ada di portfolio kamu.
          </p>
        </div>
        <span className="text-xl">+</span>
        Tambah Proyek
      </div>

      {/* LIST */}
      <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Daftar Proyek</h2>

            <p className="mt-1 text-sm text-slate-500">
              Edit atau hapus proyek yang sudah ada.
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-600">
            {jumlahProyek} Proyek
          </span>
        </div>

        {/* ERROR */}
        {error ? (
          <div className="p-6">
            <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">
              Gagal mengambil data proyek.
            </div>
          </div>
        ) : proyek && proyek.length > 0 ? (
          <div>
            {proyek.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-5 border-b border-slate-100 px-6 py-6 last:border-b-0 hover:bg-slate-50 lg:grid-cols-[70px_minmax(180px,1fr)_minmax(250px,1.5fr)_170px]"
              >
                {/* NOMOR */}
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <span className="text-sm font-black text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* JUDUL */}
                <div>
                  <h3 className="text-base font-black text-slate-950">
                    {item.judul}
                  </h3>

                  <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
                    Aktif
                  </span>
                </div>

                {/* INFO */}
                <div>
                  <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.deskripsi || "Belum ada deskripsi."}
                  </p>

                  <p className="mt-2 text-sm font-bold text-blue-600">
                    {item.teknologi}
                  </p>
                </div>

                {/* AKSI */}
                <div className="flex items-center gap-2 lg:justify-end">
                  <Link
                    href={`/admin/proyek/edit/${item.id}`}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-500 px-4 text-sm font-black text-amber-600 hover:bg-blue-300"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/admin/proyek/hapus/${item.id}`}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-red-500 px-4 text-sm font-black text-red-600 hover:bg-red-300"
                  >
                    Hapus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
              +
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-900">
              Belum ada proyek
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Tambahkan proyek pertama kamu.
            </p>

            <Link
              href="/admin/proyek/manajemen"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-black text-black hover:bg-blue-700"
            >
              + Tambah Proyek
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

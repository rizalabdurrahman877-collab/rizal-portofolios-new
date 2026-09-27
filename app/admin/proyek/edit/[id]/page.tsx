import Link from "next/link";
import { updateProyekAction } from "@/actions/proyek-actions";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function EditProyekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select(
      "id, judul, kategori, deskripsi, teknologi, gambar, link, featured",
    )
    .eq("id", id)
    .single();

  if (!proyek) {
    redirect("/admin/proyek");
  }

  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <Link
          href="/admin/proyek"
          className="text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          ← Kembali ke Semua Proyek
        </Link>

        <h1 className="mt-4 text-3xl font-black text-slate-900">
          Edit Proyek
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Perbarui informasi proyek kamu.
        </p>
      </div>

      {/* ================= FORM ================= */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
          <p className="text-sm font-black text-slate-900">
            {proyek.judul}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Edit informasi di bawah kemudian simpan perubahan.
          </p>
        </div>

        <form
          action={updateProyekAction}
          className="space-y-6 p-6 sm:p-8"
        >
          {/* ID */}

          <input
            type="hidden"
            name="id"
            value={proyek.id}
          />

          {/* ================= JUDUL ================= */}

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
              defaultValue={proyek.judul ?? ""}
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* ================= KATEGORI ================= */}

          <div>
            <label
              htmlFor="kategori"
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Kategori
            </label>

            <input
              id="kategori"
              name="kategori"
              defaultValue={proyek.kategori ?? ""}
              placeholder="Web Application / Management System / IOT"
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* ================= DESKRIPSI ================= */}

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
              rows={7}
              defaultValue={proyek.deskripsi ?? ""}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* ================= TEKNOLOGI ================= */}

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
              defaultValue={proyek.teknologi ?? ""}
              placeholder="Next.js, Tailwind, Supabase"
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* ================= LINK PROYEK ================= */}

          <div>
            <label
              htmlFor="link"
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Link Proyek
            </label>

            <input
              id="link"
              name="link"
              type="url"
              defaultValue={proyek.link ?? ""}
              placeholder="https://contoh.com"
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* ================= GAMBAR ================= */}

          <div>
            <label
              htmlFor="gambar"
              className="mb-2 block text-sm font-black text-slate-700"
            >
              Gambar Proyek
            </label>

            {/* GAMBAR SAAT INI */}

            {proyek.gambar && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  Gambar saat ini
                </p>

                <img
                  src={proyek.gambar}
                  alt={proyek.judul ?? "Gambar proyek"}
                  className="h-48 w-full max-w-md rounded-xl border border-slate-200 object-cover"
                />
              </div>
            )}

            {/* UPLOAD GAMBAR BARU */}

            <input
              id="gambar"
              name="gambar"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <p className="mt-2 text-xs text-slate-500">
              Pilih gambar baru hanya jika ingin mengganti gambar
              saat ini. JPG, PNG, atau WEBP maksimal 5 MB.
            </p>
          </div>

          {/* ================= FEATURED ================= */}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={Boolean(proyek.featured)}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Tandai sebagai Featured
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Proyek akan ditampilkan sebagai proyek unggulan.
                </p>
              </div>
            </label>
          </div>

          {/* ================= BUTTON ================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/proyek"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-red-500 px-6 text-sm font-black text-white transition hover:bg-red-600"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-black text-white transition hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
import Link from "next/link";
import { updateProyekAction } from "@/actions/project-actions";
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
    .select("id, judul, deskripsi, teknologi")
    .eq("id", id)
    .single();

  if (!proyek) {
    redirect("/admin/proyek");
  }

  return (
    <div className="w-full">

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

          <input
            type="hidden"
            name="id"
            value={proyek.id}
          />

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
              defaultValue={proyek.judul}
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

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
              defaultValue={proyek.deskripsi}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

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
              defaultValue={proyek.teknologi}
              required
              className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              href="/admin/proyek"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-red-500 px-6 text-sm font-black text-slate-700 hover:bg-red-400"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-black text-white hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>

          </div>

        </form>
      </section>
    </div>
  );
}
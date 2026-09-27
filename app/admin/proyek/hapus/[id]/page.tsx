import Link from "next/link";
import { hapusProyekAction } from "@/actions/proyek-actions";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function HapusProyekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select("id, judul, teknologi")
    .eq("id", id)
    .single();

  if (!proyek) {
    redirect("/admin/proyek");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">

      <div className="w-full max-w-lg">

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600">
            !
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Hapus Proyek?
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Pastikan kamu benar-benar ingin menghapus proyek ini.
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">

          <div className="rounded-xl bg-slate-50 p-4">
            <h2 className="font-black text-slate-900">
              {proyek.judul}
            </h2>

            <p className="mt-1 text-xs font-medium text-blue-600">
              {proyek.teknologi}
            </p>
          </div>

          <div className="mt-5 rounded-xl bg-red-50 p-4">
            <p className="text-sm font-bold text-red-700">
              Perhatian
            </p>

            <p className="mt-1 text-xs leading-5 text-red-600">
              Data proyek yang sudah dihapus tidak dapat
              dikembalikan.
            </p>
          </div>

          <form
            action={hapusProyekAction}
            className="mt-6 flex flex-col-reverse gap-3 sm:flex-row"
          >
            <input
              type="hidden"
              name="id"
              value={proyek.id}
            />

            <Link
              href="/admin/proyek"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-blue-500 px-5 text-sm font-black text-slate-700 hover:bg-blue-400"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-black text-white hover:bg-red-700"
            >
              Ya, Hapus
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
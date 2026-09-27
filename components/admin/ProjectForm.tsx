"use client";

import { useFormStatus } from "react-dom";

type ProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: {
    id?: number;
    judul?: string | null;
    kategori?: string | null;
    deskripsi?: string | null;
    teknologi?: string | null;
    gambar?: string | null;
    link?: string | null;
  };
  submitLabel?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

export default function ProjectForm({
  action,
  initialData,
  submitLabel = "Simpan Proyek",
}: ProjectFormProps) {
  return (
    <form action={action} className="space-y-5">
      {initialData?.id !== undefined && (
        <input
          type="hidden"
          name="id"
          value={initialData.id}
        />
      )}

      {/* Judul */}
      <div>
        <label
          htmlFor="judul"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Judul Proyek
        </label>

        <input
          id="judul"
          name="judul"
          type="text"
          defaultValue={initialData?.judul ?? ""}
          placeholder="Contoh: Website Portfolio"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Kategori */}
      <div>
        <label
          htmlFor="kategori"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Kategori
        </label>

        <input
          id="kategori"
          name="kategori"
          type="text"
          defaultValue={initialData?.kategori ?? ""}
          placeholder="Contoh: Web Development"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Teknologi */}
      <div>
        <label
          htmlFor="teknologi"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Teknologi
        </label>

        <input
          id="teknologi"
          name="teknologi"
          type="text"
          defaultValue={initialData?.teknologi ?? ""}
          placeholder="Next.js, TypeScript, Supabase"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Gambar */}
      <div>
        <label
          htmlFor="gambar"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          URL / Path Gambar
        </label>

        <input
          id="gambar"
          name="gambar"
          type="text"
          defaultValue={initialData?.gambar ?? ""}
          placeholder="/MyApp.png"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Link */}
      <div>
        <label
          htmlFor="link"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Link Proyek
          <span className="ml-1 font-normal text-slate-400">
            (opsional)
          </span>
        </label>

        <input
          id="link"
          name="link"
          type="url"
          defaultValue={initialData?.link ?? ""}
          placeholder="https://example.com"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label
          htmlFor="deskripsi"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Deskripsi
        </label>

        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={5}
          required
          defaultValue={initialData?.deskripsi ?? ""}
          placeholder="Jelaskan project kamu..."
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Button */}
      <div className="flex items-center gap-3 pt-2">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}

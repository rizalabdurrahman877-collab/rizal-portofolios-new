"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Menyimpan...
          </span>
        ) : (
          "Simpan Proyek"
        )}
      </button>

      {pending && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
          <div className="flex w-55 flex-col items-center rounded-2xl bg-white p-7 shadow-2xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-bold text-slate-900">
              Menyimpan proyek...
            </p>

            <p className="mt-1 text-xs text-slate-500">Mohon tunggu sebentar</p>
          </div>
        </div>
      )}
    </>
  );
}

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: proyek, error } = await supabase
    .from("proyek")
    .select("id, judul, teknologi")
    .order("id", { ascending: false });

  const jumlahProyek = proyek?.length ?? 0;

  return (
    <div className="relative w-full text-slate-100">
      {/* =========================
          BACKGROUND GLOW (sama seperti portfolio)
      ========================== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,_rgba(141,124,255,0.22),_transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-52 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,_rgba(125,211,252,0.18),_transparent_70%)] blur-3xl" />
      </div>

      {/* =========================
          HEADER
      ========================== */}
      <div className="adm-up mb-8" style={{ ["--i" as string]: 0 }}>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8d7cff]/30 bg-[#8d7cff]/10 px-3 py-1 text-xs font-black text-[#c8bfff] shadow-[0_0_20px_-6px_rgba(141,124,255,0.6)] backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7dd3fc] shadow-[0_0_10px_#7dd3fc]" />
          Dashboard Admin
        </div>

        <h1 className="text-3xl font-black tracking-tight text-transparent sm:text-4xl bg-gradient-to-r from-white via-[#d6dcff] to-[#7dd3fc] bg-clip-text">
          Selamat Datang 👋
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-400">
          Kelola portfolio, proyek, dan konten website kamu dengan mudah dari
          satu dashboard.
        </p>
      </div>

      {/* =========================
          STATISTIK
      ========================== */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {/* Total Proyek */}
        <div
          className="adm-card adm-up group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_18px_50px_rgba(2,4,16,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-[#7dd3fc]/40 hover:shadow-[0_34px_90px_rgba(80,60,200,0.35),_0_0_40px_rgba(125,211,252,0.15)]"
          style={{ ["--i" as string]: 1 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400">Total Proyek</p>
              <p className="mt-3 text-4xl font-black text-white">
                {jumlahProyek}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Proyek dalam portfolio
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8d7cff]/30 bg-[#8d7cff]/10 text-xl font-black text-[#b8a8ff] shadow-[0_0_22px_-6px_rgba(141,124,255,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              #
            </div>
          </div>
        </div>

        {/* Status Sistem */}
        <div
          className="adm-card adm-up group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_18px_50px_rgba(2,4,16,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-[#7dd3fc]/40 hover:shadow-[0_34px_90px_rgba(80,60,200,0.35),_0_0_40px_rgba(125,211,252,0.15)]"
          style={{ ["--i" as string]: 2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400">Status Sistem</p>
              <p className="mt-3 flex items-center gap-2 text-3xl font-black text-[#7dd3fc] drop-shadow-[0_0_12px_rgba(125,211,252,0.5)]">
                <span className="relative inline-flex h-3 w-3">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#7dd3fc] opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#7dd3fc] shadow-[0_0_10px_#7dd3fc]" />
                </span>
                Aktif
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Sistem berjalan normal
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7dd3fc]/30 bg-[#7dd3fc]/10 text-xl font-black text-[#7dd3fc] shadow-[0_0_22px_-6px_rgba(125,211,252,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
              ✓
            </div>
          </div>
        </div>

        {/* Hak Akses */}
        <div
          className="adm-card adm-up group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_18px_50px_rgba(2,4,16,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-[#b37dff]/40 hover:shadow-[0_34px_90px_rgba(80,60,200,0.35),_0_0_40px_rgba(179,125,255,0.15)]"
          style={{ ["--i" as string]: 3 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400">Hak Akses</p>
              <p className="mt-3 text-3xl font-black text-white">Admin</p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Akses pengelolaan penuh
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#b37dff]/30 bg-[#b37dff]/10 text-xl font-black text-[#d9b8ff] shadow-[0_0_22px_-6px_rgba(179,125,255,0.7)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              A
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          QUICK ACTION
      ========================== */}
      <div
        className="adm-up relative mb-8 overflow-hidden rounded-2xl border border-[#8d7cff]/30 bg-gradient-to-br from-[#1a1240] via-[#0f1a4a] to-[#060b28] p-6 shadow-[0_30px_80px_-30px_rgba(60,80,220,0.6),_inset_0_1px_0_rgba(180,200,255,0.15)] sm:p-8"
        style={{ ["--i" as string]: 4 }}
      >
        {/* Ornamen grid + glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage:
              "radial-gradient(ellipse at 20% 0%, #000, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 0%, #000, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(125,211,252,0.35),_transparent_70%)] blur-2xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold text-[#a5b4ff]">
              Kelola Portfolio
            </p>

            <h2 className="mt-2 bg-gradient-to-r from-white via-[#d6dcff] to-[#7dd3fc] bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
              Tambahkan proyek baru
            </h2>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-400">
              Masukkan proyek terbaru kamu agar tampil di portfolio dan dapat
              dikelola melalui halaman admin.
            </p>
          </div>

          <Link
            href="/admin/proyek/manajemen"
            className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#8d7cff] to-[#7dd3fc] px-6 text-sm font-black text-[#04102a] shadow-[0_14px_40px_-10px_rgba(91,140,255,0.65),_inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_-10px_rgba(125,211,252,0.7),_inset_0_1px_0_rgba(255,255,255,0.5)]"
          >
            <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
            <span className="relative text-xl leading-none">+</span>
            <span className="relative">Tambah Proyek</span>
          </Link>
        </div>
      </div>

      {/* =========================
          PROYEK TERBARU
      ========================== */}
      <section
        className="adm-up overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_18px_50px_rgba(2,4,16,0.4)]"
        style={{ ["--i" as string]: 5 }}
      >
        <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">
              Proyek Terbaru
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-400">
              Proyek yang sudah kamu tambahkan.
            </p>
          </div>

          <Link
            href="/admin/proyek"
            className="group inline-flex items-center text-sm font-black text-[#7dd3fc] transition hover:text-white"
          >
            Lihat Semua
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* =========================
            ERROR
        ========================== */}
        {error ? (
          <div className="p-6">
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm font-bold text-rose-300">
              Gagal mengambil data proyek.
            </div>
          </div>
        ) : proyek && proyek.length > 0 ? (
          /* =========================
             LIST PROJECT
          ========================== */
          <div>
            {proyek.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className="adm-row group relative flex items-center gap-4 border-b border-white/5 px-6 py-5 transition-all duration-300 last:border-0 hover:bg-[#8d7cff]/5"
                style={{ ["--i" as string]: index }}
              >
                {/* Garis glow di kiri saat hover */}
                <span className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-gradient-to-b from-[#8d7cff] to-[#7dd3fc] transition-all duration-300 group-hover:h-3/4" />

                {/* Nomor */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8d7cff]/30 bg-[#8d7cff]/10 transition-all duration-300 group-hover:border-[#7dd3fc]/50 group-hover:bg-[#7dd3fc]/10 group-hover:shadow-[0_0_20px_-4px_rgba(125,211,252,0.6)]">
                  <span className="text-sm font-black text-[#b8a8ff] transition-colors group-hover:text-[#7dd3fc]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Informasi */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-black text-white transition-colors group-hover:text-[#d6dcff]">
                    {item.judul}
                  </h3>
                  <p className="mt-1 truncate text-xs font-medium text-slate-400">
                    {item.teknologi || "Teknologi belum diisi"}
                  </p>
                </div>

                {/* Status */}
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#7dd3fc]/30 bg-[#7dd3fc]/10 px-3 py-1 text-xs font-black text-[#7dd3fc] sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc] shadow-[0_0_8px_#7dd3fc]" />
                  Aktif
                </span>

                {/* Edit */}
                <Link
                  href={`/admin/proyek/edit/${item.id}`}
                  className="hidden shrink-0 rounded-lg border border-[#8d7cff]/30 bg-[#8d7cff]/10 px-3 py-2 text-xs font-bold text-[#c8bfff] transition-all duration-300 hover:border-[#7dd3fc]/50 hover:bg-[#7dd3fc]/15 hover:text-[#7dd3fc] hover:shadow-[0_0_18px_-4px_rgba(125,211,252,0.6)] sm:inline-flex"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* =========================
             EMPTY STATE
          ========================== */
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl font-black text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              +
            </div>

            <h3 className="mt-5 text-lg font-black text-white">
              Belum ada proyek
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-400">
              Tambahkan proyek pertama kamu untuk mulai membangun portfolio.
            </p>

            <Link
              href="/admin/proyek/manajemen"
              className="group relative mt-5 inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#8d7cff] to-[#7dd3fc] px-5 text-sm font-black text-[#04102a] shadow-[0_14px_40px_-10px_rgba(91,140,255,0.65),_inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_-10px_rgba(125,211,252,0.7)]"
            >
              <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
              <span className="relative text-lg leading-none">+</span>
              <span className="relative">Tambah Proyek</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import Typewriter from "./Typewriter";

// Delay animasi masuk
const delay = (seconds: number) =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-24 pt-36 lg:min-h-[92vh] lg:pb-28 lg:pt-40"
    >
      {/* Cahaya latar cyan */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-32 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.12),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        {/* BAGIAN KIRI */}
        <div>
          {/* Teks berjalan */}
          <div
            className="hx-up mb-6 flex min-h-7 items-center text-sm uppercase tracking-[0.25em] text-[#67e8f9]"
            style={delay(0)}
          >
            <span className="sr-only">Halo, saya Rizal</span>
            <Typewriter />
          </div>

          {/* Lencana */}
          <div
            className="hx-up mb-7 inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/25 bg-[#06b6d4]/8 px-4 py-2 text-sm text-[#cffafe]"
            style={delay(0.05)}
          >
            <Sparkles
              size={14}
              className="text-[#22d3ee]"
              aria-hidden="true"
            />
            Pengembang Web Kreatif
          </div>

          {/* Judul utama */}
          <h1
            className="hx-slide max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]"
            style={delay(0)}
          >
            Rizal Abdurrahman
            <span className="mt-2 block bg-linear-to-r from-[#cffafe] via-[#22d3ee] to-[#0891b2] bg-clip-text text-transparent">
              Wakhid.
            </span>
          </h1>

          {/* Deskripsi */}
          <p
            className="hx-slide mt-8 max-w-xl text-base leading-8 text-[#b5c7d1] sm:text-lg"
            style={delay(0.05)}
          >
            Saya membangun pengalaman digital yang memadukan desain yang
            matang, teknologi web modern, dan perhatian pada setiap detail.
            Dari ide hingga produk yang siap digunakan.
          </p>

          {/* Tombol */}
          <div
            className="hx-up mt-9 flex flex-wrap gap-4"
            style={delay(0.12)}
          >
            <a
              href="#contact"
              className="group rounded-full bg-linear-to-r from-[#67e8f9] via-[#22d3ee] to-[#0891b2] px-7 py-3.5 text-sm font-semibold text-[#041116] shadow-xl shadow-[#22d3ee]/20 transition duration-300 hover:scale-105 hover:shadow-[#22d3ee]/40"
            >
              Mari Berbicara
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="ml-2 inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#projects"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm text-[#d5e5ed] transition duration-300 hover:border-[#22d3ee]/45 hover:bg-[#06b6d4]/10 hover:text-[#67e8f9]"
            >
              Lihat Proyek
            </a>
          </div>

          {/* Informasi */}
          <div
            className="hx-up mt-14 flex flex-wrap gap-8"
            style={delay(0.2)}
          >
            <div className="border-l border-[#22d3ee]/50 pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#91a7b5]">
                Status
              </p>
              <p className="mt-2 text-sm text-[#d5e5ed]">
                Terbuka untuk proyek
              </p>
            </div>

            <div className="border-l border-[#22d3ee]/50 pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#91a7b5]">
                Pendidikan
              </p>
              <p className="mt-2 text-sm text-[#d5e5ed]">
                SMKN 1 PASURUAN
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN - FOTO */}
        <div
          className="hx-pop flex justify-center lg:justify-end"
          style={delay(0)}
        >
          <div className="relative">
            {/* Cahaya cyan di sekitar foto */}
            <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_70%)]" />

            {/* Lingkaran dekorasi */}
            <div
              aria-hidden="true"
              className="hx-spin absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[#22d3ee]/35"
            />

            {/* Bingkai foto */}
            <div className="relative overflow-hidden rounded-4xl border border-[#22d3ee]/30 bg-linear-to-br from-[#67e8f9]/20 via-[#061116]/90 to-[#0891b2]/25 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.5)] transition duration-700 hover:rotate-y-2 hover:scale-[1.02]">
              <div className="overflow-hidden rounded-[1.55rem]">
                <Image
                  src="/rizals.jpeg"
                  alt="Foto profil Rizal Abdurrahman Wakhid"
                  width={400}
                  height={400}
                  priority
                  className="h-auto w-full max-w-full object-cover"
                />
              </div>

              {/* Overlay foto */}
              <div className="pointer-events-none absolute inset-2 rounded-[1.55rem] bg-linear-to-t from-black/45 via-transparent to-cyan-100/10" />

              {/* Garis bingkai dalam */}
              <div className="pointer-events-none absolute inset-2 rounded-[1.55rem] ring-1 ring-inset ring-[#67e8f9]/20" />
            </div>

            {/* Lokasi */}
            <div className="hx-float absolute -bottom-5 -left-5 flex items-center gap-2 rounded-full border border-[#22d3ee]/25 bg-[#061116]/95 px-5 py-3 text-xs text-[#d5e5ed] shadow-xl shadow-black/30">
              <MapPin
                size={14}
                className="text-[#22d3ee]"
                aria-hidden="true"
              />
              Indonesia
            </div>

            {/* Ikon panah */}
            <div
              aria-hidden="true"
              className="hx-float-rotate absolute -right-5 top-10 rounded-full border border-[#22d3ee]/25 bg-[#061116]/95 p-4 shadow-xl shadow-black/30"
            >
              <ArrowUpRight className="text-[#67e8f9]" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi ke bagian Tentang */}
      <a
        href="#about"
        className="mx-auto mt-20 flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#91a7b5] transition-colors hover:text-[#67e8f9]"
      >
        Jelajahi portofolio
        <ArrowDown size={13} aria-hidden="true" />
      </a>
    </section>
  );
}

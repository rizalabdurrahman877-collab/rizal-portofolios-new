import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import Typewriter from "./Typewriter";

// Delay animasi masuk (CSS variable --d dibaca oleh class .hx-up / .hx-slide / .hx-pop)
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 lg:min-h-[92vh] lg:pb-28 lg:pt-40">
      {/* Cahaya latar: gradient radial, bukan blur (lebih ringan dirender) */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(214,174,96,0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-32 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(184,154,101,0.1),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        {/* BAGIAN KIRI */}
        <div>
          {/* Teks berjalan */}
          <div
            className="hx-up mb-6 flex min-h-7 items-center text-sm uppercase tracking-[0.25em] text-[#e5c783]"
            style={delay(0)}
          >
            <span className="sr-only">Halo, saya Rizal</span>
            <Typewriter />
          </div>

          {/* Lencana */}
          <div
            className="hx-up mb-7 inline-flex items-center gap-2 rounded-full border border-[#d7b979]/25 bg-[#d7b979]/8 px-4 py-2 text-sm text-[#eee5d2]"
            style={delay(0.05)}
          >
            <Sparkles size={14} className="text-[#e5c783]" aria-hidden="true" />
            Pengembang Web Kreatif
          </div>

          {/* Judul utama: hanya bergeser (tanpa opacity 0) agar LCP tidak tertunda */}
          <h1
            className="hx-slide max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]"
            style={delay(0)}
          >
            Rizal Abdurrahman
            <span className="mt-2 block bg-linear-to-r from-[#fff0c8] via-[#d7b979] to-[#a77c3d] bg-clip-text text-transparent">
              Wakhid.
            </span>
          </h1>

          {/* Deskripsi */}
          <p
            className="hx-slide mt-8 max-w-xl text-base leading-8 text-[#b7b3aa] sm:text-lg"
            style={delay(0.05)}
          >
            Saya membangun pengalaman digital yang memadukan desain yang
            matang, teknologi web modern, dan perhatian pada setiap detail.
            Dari ide hingga produk yang siap digunakan.
          </p>

          {/* Tombol */}
          <div className="hx-up mt-9 flex flex-wrap gap-4" style={delay(0.12)}>
            <a
              href="#contact"
              className="group rounded-full bg-linear-to-r from-[#f1d79c] to-[#b88b48] px-7 py-3.5 text-sm font-semibold text-[#17130c] shadow-xl shadow-[#c59c5b]/20 transition duration-300 hover:scale-105 hover:shadow-[#c59c5b]/35"
            >
              Mari Berbicara
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="ml-2 inline-block transition group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#projects"
              className="rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm text-[#e5e0d5] transition duration-300 hover:border-[#d7b979]/40 hover:bg-[#d7b979]/8 hover:text-[#f1d79c]"
            >
              Lihat Proyek
            </a>
          </div>

          {/* Informasi (label dinaikkan ke slate-400 supaya kontras lulus WCAG) */}
          <div className="hx-up mt-14 flex flex-wrap gap-8" style={delay(0.2)}>
            <div className="border-l border-[#d7b979]/45 pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8e897f]">
                Status
              </p>
              <p className="mt-2 text-sm text-[#e5e0d5]">
                Terbuka untuk proyek
              </p>
            </div>

            <div className="border-l border-[#d7b979]/45 pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8e897f]">
                Pendidikan
              </p>
              <p className="mt-2 text-sm text-[#e5e0d5]">SMKN 1 PASURUAN</p>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN - FOTO */}
        <div
          className="hx-pop flex justify-center lg:justify-end"
          style={delay(0)}
        >
          <div className="relative">
            {/* Cahaya foto */}
            <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(214,174,96,0.23),transparent_70%)]" />

            {/* Lingkaran dekorasi */}
            <div
              aria-hidden="true"
              className="hx-spin absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[#d7b979]/35"
            />

            {/* Foto */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[#d7b979]/30 bg-linear-to-br from-[#f1d79c]/25 via-[#15140f]/90 to-[#735a31]/30 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.5)] transition duration-700 hover:rotate-y-2 hover:scale-[1.02]">
              <div className="overflow-hidden rounded-[1.55rem]">
                <Image
                  src="/rizals.jpeg"
                  alt="Foto profil siswa pemilik portofolio ini"
                  width={400}
                  height={400}
                  priority
                  className="h-auto w-full max-w-[400px] object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-2 rounded-[1.55rem] bg-linear-to-t from-black/45 via-transparent to-white/10" />
              <div className="pointer-events-none absolute inset-2 rounded-[1.55rem] ring-1 ring-inset ring-white/15" />
            </div>

            {/* Lokasi */}
            <div className="hx-float absolute -bottom-5 -left-5 flex items-center gap-2 rounded-full border border-[#d7b979]/25 bg-[#11100c]/95 px-5 py-3 text-xs text-[#e5e0d5] shadow-xl shadow-black/30">
              <MapPin size={14} className="text-[#e5c783]" aria-hidden="true" />
              Indonesia
            </div>

            {/* Ikon panah */}
            <div
              aria-hidden="true"
              className="hx-float-rotate absolute -right-5 top-10 rounded-full border border-[#d7b979]/25 bg-[#11100c]/95 p-4 shadow-xl shadow-black/30"
            >
              <ArrowUpRight className="text-[#e5c783]" size={20} />
            </div>
          </div>
        </div>
      </div>
      <a
        href="#about"
        className="mx-auto mt-20 flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#8e897f] transition-colors hover:text-[#e5c783]"
      >
        Jelajahi portofolio
        <ArrowDown size={13} aria-hidden="true" />
      </a>
    </section>
  );
}

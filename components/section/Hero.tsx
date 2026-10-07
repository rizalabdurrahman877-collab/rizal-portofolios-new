import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import Typewriter from "./Typewriter";
import image from "next/image";

// Delay animasi masuk (CSS variable --d dibaca oleh class .hx-up / .hx-slide / .hx-pop)
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-36 lg:pb-36 lg:pt-44">
      {/* Cahaya latar: gradient radial, bukan blur (lebih ringan dirender) */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-32 h-120 w-120 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
        {/* BAGIAN KIRI */}
        <div>
          {/* Teks berjalan */}
          <div
            className="hx-up mb-6 flex min-h-7 items-center text-sm uppercase tracking-[0.25em] text-blue-400"
            style={delay(0)}
          >
            <span className="sr-only">Halo, saya Rizal</span>
            <Typewriter />
          </div>

          {/* Lencana */}
          <div
            className="hx-up mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-slate-300"
            style={delay(0.05)}
          >
            <Sparkles size={14} className="text-cyan-400" aria-hidden="true" />
            Pengembang Web Kreatif
          </div>

          {/* Judul utama: hanya bergeser (tanpa opacity 0) agar LCP tidak tertunda */}
          <h1
            className="hx-slide max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
            style={delay(0)}
          >
            Menciptakan
            <span className="mt-2 block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              pengalaman digital modern.
            </span>
          </h1>

          {/* Deskripsi */}
          <p
            className="hx-slide mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            style={delay(0.05)}
          >
            Saya merancang dan membangun website modern, responsif, dan
            interaktif menggunakan Next.js, React, Tailwind CSS, serta teknologi
            web terkini.
          </p>

          {/* Tombol */}
          <div className="hx-up mt-9 flex flex-wrap gap-4" style={delay(0.12)}>
            <a
              href="#contact"
              className="group rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition duration-300 hover:scale-105 hover:shadow-cyan-500/30"
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
              className="rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm text-slate-300 transition duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Lihat Proyek
            </a>
          </div>

          {/* Informasi (label dinaikkan ke slate-400 supaya kontras lulus WCAG) */}
          <div className="hx-up mt-14 flex flex-wrap gap-10" style={delay(0.2)}>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Status
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Terbuka untuk proyek
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Pendidikan
              </p>
              <p className="mt-2 text-sm text-slate-300">SMKN 1 PASURUAN</p>
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
            <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.28),transparent_70%)]" />

            {/* Lingkaran dekorasi */}
            <div
              aria-hidden="true"
              className="hx-spin absolute -right-8 -top-8 h-24 w-24 rounded-full border border-blue-400/20"
            />

            {/* Foto */}
            <div className="relative overflow-hidden rounded-4xl border border-blue-400/20 bg-[#0a1020]/90 p-2 shadow-2xl shadow-blue-500/10 transition duration-500 hover:scale-[1.02]">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/rizals.jpeg"
                  alt="Foto profil siswa pemilik portofolio ini"
                  width={400}
                  height={400}
                />
              </div>
            </div>

            {/* Lokasi */}
            <div className="hx-float absolute -bottom-5 -left-5 flex items-center gap-2 rounded-full border border-blue-400/20 bg-[#080d1c]/95 px-5 py-3 text-xs text-slate-300 shadow-xl shadow-blue-500/10">
              <MapPin size={14} className="text-cyan-400" aria-hidden="true" />
              Indonesia
            </div>

            {/* Ikon panah */}
            <div
              aria-hidden="true"
              className="hx-float-rotate absolute -right-5 top-10 rounded-full border border-blue-400/20 bg-[#080d1c]/95 p-4 shadow-xl shadow-blue-500/20"
            >
              <ArrowUpRight className="text-cyan-400" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

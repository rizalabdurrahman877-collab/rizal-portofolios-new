// Server Component: tanpa JavaScript. Tampilan dan durasi sama seperti versi
// framer-motion sebelumnya (tampil 1,9 detik lalu memudar 0,5 detik),
// tetapi seluruhnya dijalankan CSS (lihat bagian "Splash screen" di globals.css).
export default function SplashScreen() {
  return (
    <div
      aria-hidden="true"
      className="sp-out pointer-events-none fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="sp-logo relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-[#8d7cff] to-[#b37dff] shadow-[0_0_30px_rgba(141,124,255,0.25)]">
          <div className="sp-ring absolute inset-0 rounded-2xl border border-white/30" />

          <span className="relative text-3xl font-bold text-white">R</span>
        </div>

        {/* Name */}
        <div className="sp-name mt-5 text-center">
          <div className="text-xl font-bold tracking-tight text-white">
            Rizal Abdurrakhman
          </div>

          <p className="sp-sub mt-1 text-sm text-white/50">Web Developer</p>
        </div>

        {/* Loading */}
        <div className="sp-load mt-6">
          <div className="h-0.5 w-36 overflow-hidden rounded-full bg-white/10">
            <div className="sp-bar h-full w-full origin-left rounded-full bg-linear-to-r from-[#8d7cff] to-[#b37dff]" />
          </div>

          <p className="mt-2 text-center text-[9px] uppercase tracking-[0.25em] text-white/30">
            Loading Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}

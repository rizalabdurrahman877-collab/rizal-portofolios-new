// Server Component
// Tidak membutuhkan JavaScript.
// Animasi sepenuhnya menggunakan CSS dari globals.css.

export default function SplashScreen() {
  return (
    <div
      aria-hidden="true"
      className="sp-out pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#02040b]"
    >
      {/* =====================================================
          FUTURISTIC BLUE STORM
      ===================================================== */}

      {/* Atmospheric background */}
      <div className="sp-bg-glow absolute inset-0" />

      {/* Main storm vortex */}
      <div className="sp-storm absolute">
        <div className="sp-storm-ring sp-storm-ring-1" />
        <div className="sp-storm-ring sp-storm-ring-2" />
        <div className="sp-storm-ring sp-storm-ring-3" />
        <div className="sp-storm-ring sp-storm-ring-4" />

        {/* Storm center */}
        <div className="sp-storm-core" />
      </div>

      {/* =====================================================
          ENERGY WAVES
      ===================================================== */}
      <div className="sp-wave sp-wave-1 absolute" />
      <div className="sp-wave sp-wave-2 absolute" />
      <div className="sp-wave sp-wave-3 absolute" />

      {/* =====================================================
          ATMOSPHERIC FOG
      ===================================================== */}
      <div className="sp-fog sp-fog-1 absolute" />
      <div className="sp-fog sp-fog-2 absolute" />
      <div className="sp-fog sp-fog-3 absolute" />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}
      <div className="sp-particles absolute inset-0">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =====================================================
          LIGHTNING FLASH
      ===================================================== */}
      <div className="sp-flash absolute inset-0" />

      {/* =====================================================
          LIGHTNING BOLTS
      ===================================================== */}

      {/* LEFT LIGHTNING */}
      <svg
        className="sp-lightning sp-lightning-left absolute"
        viewBox="0 0 180 500"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="sp-bolt-glow"
          d="M112 0L55 160L92 155L28 300L75 284L15 500"
        />

        <path
          className="sp-bolt"
          d="M112 0L55 160L92 155L28 300L75 284L15 500"
        />
      </svg>

      {/* RIGHT LIGHTNING */}
      <svg
        className="sp-lightning sp-lightning-right absolute"
        viewBox="0 0 180 500"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="sp-bolt-glow"
          d="M68 0L125 160L88 155L152 300L105 284L165 500"
        />

        <path
          className="sp-bolt"
          d="M68 0L125 160L88 155L152 300L105 284L165 500"
        />
      </svg>

      {/* =====================================================
          SMALL ELECTRIC ARCS
      ===================================================== */}
      <div className="sp-arc sp-arc-1 absolute" />
      <div className="sp-arc sp-arc-2 absolute" />
      <div className="sp-arc sp-arc-3 absolute" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="relative z-20 flex flex-col items-center">
        {/* =================================================
            PREMIUM LOGO
        ================================================= */}
        <div className="sp-logo-wrap relative flex h-28 w-28 items-center justify-center">
          {/* Outer energy ring */}
          <div className="sp-energy-ring absolute inset-0 rounded-full" />

          {/* Second energy ring */}
          <div className="sp-energy-ring-2 absolute inset-[-10px] rounded-full" />

          {/* Ambient glow */}
          <div className="absolute inset-2 rounded-full bg-blue-500/20 blur-2xl" />

          {/* =================================================
              MAIN LOGO
          ================================================= */}
          <div
            className="
              sp-logo
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/20
              bg-gradient-to-br
              from-[#2563eb]
              via-[#4f46e5]
              to-[#7c3aed]
              p-[2px]
              shadow-[0_0_50px_rgba(37,99,235,0.55)]
            "
          >
            {/* Inner glass */}
            <div className="absolute inset-[2px] rounded-full bg-[#050914]/95" />

            {/* Glass highlight */}
            <div
              className="
                absolute
                -left-8
                -top-10
                h-24
                w-24
                rotate-45
                rounded-full
                bg-white/20
                blur-xl
              "
            />

            {/* Inner blue glow */}
            <div
              className="
                absolute
                inset-4
                rounded-full
                bg-blue-500/10
                blur-xl
              "
            />

            {/* Initial R */}
            <span
              className="
                relative
                z-10
                bg-gradient-to-b
                from-white
                via-blue-50
                to-blue-300
                bg-clip-text
                text-[48px]
                font-black
                tracking-[-0.08em]
                text-transparent
                drop-shadow-[0_0_18px_rgba(147,197,253,0.5)]
              "
            >
              R
            </span>

            {/* Decorative underline */}
            <div
              className="
                absolute
                bottom-5
                left-1/2
                h-[2px]
                w-8
                -translate-x-1/2
                rounded-full
                bg-blue-200/80
                shadow-[0_0_12px_rgba(96,165,250,0.9)]
              "
            />

            {/* Bottom reflection */}
            <div
              className="
                absolute
                inset-x-4
                bottom-2
                h-5
                rounded-full
                bg-white/5
                blur-md
              "
            />
          </div>
        </div>

        {/* =================================================
            NAME
        ================================================= */}
        <div className="sp-name mt-7 text-center">
          <div
            className="
              text-xl
              font-bold
              tracking-tight
              text-white
              drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]
            "
          >
            Rizal Abdurrakhman
          </div>

          <p className="sp-sub mt-1 text-sm tracking-wide text-white/50">
            Web Developer
          </p>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}
        <div className="sp-load mt-7">
          <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/[0.08]">
            {/* Progress */}
            <div
              className="
                sp-bar
                h-full
                w-full
                origin-left
                rounded-full
                bg-gradient-to-r
                from-[#2563eb]
                via-[#6366f1]
                to-[#a78bfa]
              "
            />

            {/* Moving energy */}
            <div
              className="
                sp-bar-light
                absolute
                inset-y-0
                left-0
                w-8
                bg-white/90
                blur-sm
              "
            />
          </div>

          <p
            className="
              mt-3
              text-center
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/30
            "
          >
            Loading Portfolio
          </p>
        </div>
      </div>

      {/* =====================================================
          VIGNETTE
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.15)_60%,rgba(0,0,0,0.75)_100%)]
        "
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02040b] to-transparent" />
    </div>
  );
}
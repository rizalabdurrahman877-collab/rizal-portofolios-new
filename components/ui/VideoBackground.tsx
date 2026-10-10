"use client";

type Props = {
  /** Kegelapan overlay, nilai 0 sampai 1 */
  overlay?: number;
};

export default function VideoBackground({
  overlay = 0.6,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]"
    >
      {/* Background gradient premium */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 15% 20%,
              rgba(91, 60, 180, 0.22),
              transparent 42%
            ),
            radial-gradient(
              ellipse at 85% 25%,
              rgba(35, 95, 190, 0.18),
              transparent 40%
            ),
            radial-gradient(
              ellipse at 50% 85%,
              rgba(104, 55, 160, 0.13),
              transparent 45%
            ),
            #050816
          `,
        }}
      />

      {/* Grid halus */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(148, 163, 184, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Orb bercahaya kiri */}
      <div
        className="absolute -left-40 top-20 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 70%)",
          animation: "vb-float 12s ease-in-out infinite alternate",
        }}
      />

      {/* Orb bercahaya kanan */}
      <div
        className="absolute -right-40 top-1/3 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.16), transparent 70%)",
          animation: "vb-float 15s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Overlay untuk menjaga keterbacaan teks */}
      <div
        className="absolute inset-0 bg-[#050816]"
        style={{ opacity: overlay }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(5, 8, 22, 0.7) 100%)",
        }}
      />

      {/* Animasi ringan */}
      <style jsx>{`
        @keyframes vb-float {
          from {
            transform: translate3d(0, -15px, 0) scale(1);
          }
          to {
            transform: translate3d(20px, 20px, 0) scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
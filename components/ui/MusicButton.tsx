"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Path lagu relatif terhadap folder /public, contoh: /audio/lagu.mp3 */
  src?: string;
  /** Volume 0 - 1 */
  volume?: number;
};

export default function MusicButton({
  src = "/audio/lagu.mp3",
  volume = 0.4,
}: Props) {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Jeda saat tab disembunyikan, lanjutkan saat kembali
  useEffect(() => {
    const onVisibility = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) {
        resumeRef.current = !a.paused;
        a.pause();
      } else if (resumeRef.current) {
        a.play().catch(() => {});
        resumeRef.current = false;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setFailed(false);
      } catch {
        setFailed(true);
      }
    } else {
      a.pause();
    }
  };

  const label = failed
    ? "Lagu gagal diputar"
    : playing
    ? "Jeda musik"
    : "Putar musik";

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />

      <div className="fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8">
        {/* Cincin denyut saat lagu diputar */}
        {playing && !reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#8d7cff]/40"
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          aria-pressed={playing}
          title={label}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#0c1030]/80 text-white shadow-lg shadow-[#8d7cff]/20 backdrop-blur-md transition hover:border-[#8d7cff]/60 hover:bg-[#14193f]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d7cff]"
        >
          {playing ? (
            // Equalizer saat diputar
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 0.2, 0.4, 0.1].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] origin-bottom rounded-full bg-[#b9adff]"
                  style={{ height: "100%" }}
                  animate={
                    reduce ? { scaleY: 0.7 } : { scaleY: [0.3, 1, 0.45, 0.9, 0.3] }
                  }
                  transition={{
                    duration: 0.9,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          ) : (
            // Ikon not musik saat berhenti
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              {failed && <path d="M3 3l18 18" />}
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
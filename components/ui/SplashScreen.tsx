"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-99999 flex items-center justify-center overflow-hidden bg-[#050816]"
        >
          {/* Glow */}
          <div className="absolute h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[100px]" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-400/30 bg-white/[0.04] shadow-[0_0_60px_rgba(139,92,246,0.25)]"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-xl" />

              <span className="relative bg-gradient-to-r from-violet-300 via-blue-400 to-cyan-300 bg-clip-text text-2xl font-black tracking-[-0.08em] text-transparent">
                RW
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 text-xl font-bold text-white"
            >
              Rizal Abdurrakhman Wakhid
              <span className="text-cyan-400">.</span>
            </motion.h1>

            {/* Loading line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="mt-4 h-0.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
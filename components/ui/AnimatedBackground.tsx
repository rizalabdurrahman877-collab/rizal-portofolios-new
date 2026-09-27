"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Animated gradient */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[linear-gradient(120deg,#050816,#090a20,#110b25,#080a1c,#050816)] bg-[length:300%_300%]"
      />

      {/* Orb kiri atas */}
      <motion.div
        animate={{
          x: [0, 50, 20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#8d7cff]/12"
      />

      {/* Orb kanan bawah */}
      <motion.div
        animate={{
          x: [0, -45, -15, 0],
          y: [0, -30, 20, 0],
          scale: [1, 0.94, 1.08, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-36 -right-36 h-96 w-96 rounded-full bg-[#b37dff]/10"
      />

      {/* Orb kanan atas */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 top-20 h-52 w-52 rounded-full bg-[#6d8cff]/8"
      />

      {/* Orb bawah kiri */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-[#9b7cff]/8"
      />

      {/* Center glow */}
      <motion.div
        animate={{
          scale: [0.9, 1.12, 0.9],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d7cff]/10"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Moving horizontal line */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 top-[35%] h-px w-1/3 bg-gradient-to-r from-transparent via-[#8d7cff]/20 to-transparent"
      />

      {/* Floating dots */}
      <motion.div
        animate={{
          y: [0, -28, 0],
          opacity: [0.15, 0.55, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[15%] top-[25%] h-1 w-1 rounded-full bg-[#b37dff]"
      />

      <motion.div
        animate={{
          y: [0, 22, 0],
          opacity: [0.1, 0.45, 0.1],
        }}
        transition={{
          duration: 5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#8d7cff]"
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 4.5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[25%] left-[23%] h-1 w-1 rounded-full bg-[#b37dff]"
      />

      <motion.div
        animate={{
          y: [0, 18, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 5,
          delay: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[25%] h-1 w-1 rounded-full bg-[#8d7cff]"
      />
    </div>
  );
}
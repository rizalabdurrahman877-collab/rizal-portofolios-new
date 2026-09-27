"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 25 });

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050816]">

      {/* Base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Violet glow */}
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, 80, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 h-125 w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
      />

      {/* Blue glow */}
      <motion.div
        animate={{
          x: [0, -100, 70, 0],
          y: [0, -60, 80, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-[20%] h-[550px] w-[550px] rounded-full bg-blue-500/20 blur-[130px]"
      />

      {/* Cyan glow */}
      <motion.div
        animate={{
          x: [0, 100, -70, 0],
          y: [0, -70, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-[120px]"
      />

      {/* Center glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[35%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-[40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-violet-400/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-[40%] h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-cyan-400/[0.06]"
      />

      {/* Moving light */}
      <motion.div
        animate={{
          x: ["-100%", "250%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] h-px w-[40%] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
      />

      {/* Particles */}
      {particles.map((_, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + (index % 4),
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${40 + ((index * 17) % 55)}%`,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,0.55)_100%)]" />
    </div>
  );
}
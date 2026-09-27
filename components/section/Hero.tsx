"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const texts = [
    "Hello, I'm Rizal",
    "I'm a Web Developer",
    "I'm From SMKN 1 Pasuruan",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentText) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 500);
    } else {
      timeout = setTimeout(
        () => {
          if (isDeleting) {
            setText(currentText.slice(0, text.length - 1));
          } else {
            setText(currentText.slice(0, text.length + 1));
          }
        },
        isDeleting ? 45 : 85,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, textIndex]);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-28 pt-36 lg:pb-36 lg:pt-44"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
        {/* LEFT */}
        <div>
          {/* Typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex min-h-7 items-center text-sm uppercase tracking-[0.25em] text-blue-400"
          >
            <span>{text}</span>

            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-1 text-cyan-400"
            >
              |
            </motion.span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/8 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-cyan-400" />
            Creative Web Developer
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Creating modern
            <span className="mt-2 block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              digital experiences.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
          >
            I design and build modern, responsive websites using Next.js, React,
            Tailwind CSS, and modern web technologies.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition duration-300 hover:scale-105 hover:shadow-cyan-500/30"
            >
              Let's talk.
              <ArrowUpRight
                size={16}
                className="ml-2 inline-block transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#projects"
              className="rounded-full border border-white/10 bg-white/3 px-7 py-3.5 text-sm text-slate-300 backdrop-blur-xl transition duration-300 hover:border-blue-400/40 hover:bg-blue-500/5 hover:text-blue-300"
            >
              View Projects
            </a>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-10"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-600">
                Status
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Available for projects
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-600">
                Education
              </p>

              <p className="mt-2 text-sm text-slate-300">SMKN 1 PASURUAN</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT - IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.9,
            ease: "easeOut",
          }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-8 rounded-[3rem] bg-linear-to-r from-blue-600/25 via-cyan-400/15 to-blue-600/25 blur-3xl" />

            {/* Decorative circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-blue-400/20"
            />

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-4xl border border-blue-400/20 bg-[#0a1020]/80 p-2 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
            >
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/rizal.jpeg"
                  alt="Rizal"
                  width={500}
                  height={600}
                  priority
                  className="h-105 w-82.5 object-cover transition duration-700 hover:scale-105 sm:h-125 sm:w-97.5"
                />
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-full border border-blue-400/20 bg-[#080d1c]/90 px-5 py-3 text-xs text-slate-300 shadow-xl shadow-blue-500/10 backdrop-blur-xl"
            >
              <MapPin size={14} className="text-cyan-400" />
              Indonesia
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-5 top-10 rounded-full border border-blue-400/20 bg-[#080d1c]/90 p-4 shadow-xl shadow-blue-500/20 backdrop-blur-xl"
            >
              <ArrowUpRight className="text-cyan-400" size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

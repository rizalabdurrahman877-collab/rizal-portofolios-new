"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
        >
          <AnimatedBackground />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-[#8d7cff] to-[#b37dff] shadow-[0_0_30px_rgba(141,124,255,0.25)]"
            >
              <motion.div
                animate={{
                  opacity: [0.25, 0.7, 0.25],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl border border-white/30"
              />

              <span className="relative text-3xl font-bold text-white">
                R
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
              }}
              className="mt-5 text-center"
            >
              <h1 className="text-xl font-bold tracking-tight text-white">
                Rizal Abdurrakhman
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.35,
                }}
                className="mt-1 text-sm text-white/50"
              >
                Web Developer
              </motion.p>
            </motion.div>

            {/* Loading */}
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.3,
              }}
              className="mt-6"
            >
              <div className="h-0.5 w-36 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                  }}
                  className="h-full rounded-full bg-linear-to-r from-[#8d7cff] to-[#b37dff]"
                />
              </div>

              <p className="mt-2 text-center text-[9px] uppercase tracking-[0.25em] text-white/30">
                Loading Portfolio
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
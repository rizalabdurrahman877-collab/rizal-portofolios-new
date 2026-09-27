"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavigation = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (!target) {
      console.error(`Section #${targetId} tidak ditemukan`);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);
    setOpen(false);
  };

  const handleLoginClick = () => {
    setOpen(false);
    window.location.href = "/admin/login";
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-9999 w-full border-b border-white/6 bg-[#050816]/90 backdrop-blur-xl"
    >
      <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavigation(e, "#home")}
          className="group relative z-10000 flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">

            {/* Glow */}
            <div
              className="
                absolute inset-0 rounded-2xl
                bg-linear-to-r from-violet-600 via-blue-500 to-cyan-400
                opacity-30 blur-xl
                transition-all duration-500
                group-hover:scale-150
                group-hover:opacity-80
              "
            />

            {/* Gradient Border */}
            <div
              className="
                absolute inset-0 rounded-2xl
                bg-linear-to-br
                from-violet-500/60 via-blue-500/30 to-cyan-400/60
                p-px
                transition-all duration-500
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              {/* Glass */}
              <div
                className="
                  flex h-full w-full items-center justify-center
                  rounded-2xl border border-white/10
                  bg-[#080a16]/95 backdrop-blur-xl
                  transition-all duration-500
                  group-hover:border-violet-400/50
                  group-hover:bg-violet-500/10
                  group-hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]
                "
              >
                <span
                  className="
                    bg-linear-to-r from-violet-300 via-blue-400 to-cyan-300
                    bg-clip-text text-sm font-black
                    tracking-[-0.08em] text-transparent
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                >
                  RW
                </span>
              </div>
            </div>

            {/* Shine */}
            <div
              className="
                pointer-events-none absolute left-2 top-1
                h-2 w-5 rounded-full
                bg-white/40 blur-[3px]
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100
              "
            />
          </div>

          {/* Nama */}
          <span
            className="
              max-w-55 truncate
              text-base font-bold tracking-tight text-white
              transition-colors duration-300
              group-hover:text-violet-200
              sm:max-w-none sm:text-xl
            "
          >
            Rizal Abdurrakhman Wakhid
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              .
            </span>
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
              className="
                group relative text-sm text-slate-400
                transition-all duration-300
                hover:-translate-y-0.5 hover:text-white
              "
            >
              {link.name}

              <span
                className="
                  absolute -bottom-2 left-1/2 h-0.5 w-0
                  -translate-x-1/2 rounded-full
                  bg-linear-to-r from-violet-400 to-cyan-400
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}

          {/* LET'S TALK */}
          <a
            href="#contact"
            onClick={(e) => handleNavigation(e, "#contact")}
            className="
              group relative z-10000
              flex items-center gap-2
              overflow-hidden rounded-full
              border border-blue-400/20
              bg-blue-500/10
              px-5 py-2.5
              text-sm font-medium text-blue-300
              transition-all duration-300
              hover:scale-105
              hover:border-violet-400/50
              hover:bg-linear-to-r
              hover:from-violet-600/30
              hover:to-blue-600/30
              hover:text-white
              hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]
            "
          >
            <span>Let's Talk</span>

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
            relative z-10001
            flex h-10 w-10 items-center justify-center
            rounded-xl border border-white/10
            bg-white/5 text-white
            transition-all duration-300
            hover:scale-105
            hover:border-violet-400/40
            hover:bg-violet-500/10
            md:hidden
          "
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              relative z-9999
              border-t border-white/6
              bg-[#050816]/98
              backdrop-blur-2xl
              md:hidden
            "
          >
            <div className="mx-auto max-w-7xl px-5 pb-5 sm:px-6">
              <div className="flex flex-col">

                {/* MENU */}
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.2,
                    }}
                    className="
                      group flex min-h-13
                      items-center justify-between
                      border-b border-white/5
                      py-4
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:pl-2 hover:text-violet-400
                    "
                  >
                    <span>{link.name}</span>

                    <ArrowRight
                      size={15}
                      className="
                        opacity-0
                        transition-all duration-300
                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    />
                  </motion.a>
                ))}

                {/* LET'S TALK */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavigation(e, "#contact")}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: links.length * 0.04,
                  }}
                  className="
                    group mt-4
                    flex min-h-12
                    items-center justify-center gap-2
                    rounded-full
                    border border-blue-400/20
                    bg-blue-500/10
                    px-5 py-3
                    text-sm font-medium text-blue-300
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:border-violet-400/50
                    hover:bg-linear-to-r
                    hover:from-violet-600/20
                    hover:to-blue-600/20
                    hover:text-white
                  "
                >
                  Let's Talk

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>

                {/* ADMIN MOBILE */}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="
                    mt-3 flex min-h-12
                    items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/3
                    px-5 py-3
                    text-sm font-medium text-slate-300
                    transition-all duration-300
                    hover:border-violet-400/40
                    hover:bg-violet-500/10
                    hover:text-white
                  "
                >
                  Admin Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
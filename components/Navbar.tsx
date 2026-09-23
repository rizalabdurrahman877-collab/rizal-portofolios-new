"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
  {name : "Skills",  href: "#skills"},
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      const navbarHeight = 75;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", href);
    }

    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-[9999] w-full border-b border-white/[0.06] bg-[#050816]/90 backdrop-blur-xl"
    >
      <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavigation(e, "#home")}
          className="relative z-[10000] max-w-[75%] text-base font-bold tracking-tight text-white sm:text-xl"
        >
          Rizal Abdurrakhman Wakhid
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            .
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href)}
              className="relative z-[10000] text-sm text-slate-400 transition duration-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavigation(e, "#contact")}
            className="relative z-[10000] rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm text-blue-300 transition duration-300 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white"
          >
            Let's Talk
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="relative z-[10001] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative z-[9999] border-t border-white/[0.06] bg-[#050816] md:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 pb-5 sm:px-6">
              <div className="flex flex-col">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="flex min-h-[52px] items-center border-b border-white/[0.05] py-4 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-blue-400 active:text-blue-400"
                  >
                    {link.name}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={(e) => handleNavigation(e, "#contact")}
                  className="mt-5 flex min-h-[48px] items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-300 transition-colors duration-200 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white"
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

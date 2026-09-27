"use client";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import TechStack from "../components/section/TechStack";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Contact from "../components/section/Contact";
import Footer from "../components/layout/Footer";
import Skills from "../components/section/Skill";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <TechStack />
      <About />
      <Projects />
       <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Skills from "../components/Skill";

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
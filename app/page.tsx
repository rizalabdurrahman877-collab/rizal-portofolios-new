"use client";

// 1. Impor komponen Preloader yang sudah dibuat sebelumnya
import Preloader from "../components/layout/Preloader"; 
import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import TechStack from "../components/section/TechStack";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Contact from "../components/section/Contact";
import Footer from "../components/layout/Footer";
import Skills from "../components/section/Skill";
import SplashScreen from "../components/ui/SplashScreen";
import AnimatedBackground from "../components/ui/AnimatedBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050816]">
      <AnimatedBackground />

      <div className="relative z-10">
        <SplashScreen />

        <Navbar />

        <main>
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <Projects />

          <section id="experience">
            <Experience />
          </section>

          <Skills />

          <Contact />
        </main>
      </div>
    </div>
  );
}
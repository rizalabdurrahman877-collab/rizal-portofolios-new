"use client";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Skills from "../components/section/Skill";
import Contact from "../components/section/Contact";
import SplashScreen from "../components/ui/SplashScreen";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import MusicButton from "../components/ui/MusicButton";

export default function Home() {
  return (
    // `isolate` menjaga background fixed tetap berada di belakang konten.
    <div className="relative isolate min-h-screen">
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

        <MusicButton src="/audio/sound.mp3" volume={0.4} />
      </div>
    </div>
  );
}

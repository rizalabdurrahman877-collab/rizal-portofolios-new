import dynamic from "next/dynamic";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Skills from "../components/section/Skill";
import SplashScreen from "../components/ui/SplashScreen";
import Lightweight3DBackground from "../components/background/Lightweight3DBackground";
import LazyMusicButton from "../components/ui/LazyMusicButton";

// Contact membutuhkan JavaScript karena memiliki form interaktif.
// Dipisahkan menjadi chunk tersendiri agar halaman utama tetap ringan.
const Contact = dynamic(() => import("../components/section/Contact"));

// Revalidasi halaman setiap 5 menit.
export const revalidate = 300;

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#02040b]">
      {/* =====================================================
          VIDEO BACKGROUND
      ===================================================== */}
      <Lightweight3DBackground />

      {/* =====================================================
          WEBSITE CONTENT
          Semua konten berada di atas video background.
      ===================================================== */}
      <div className="relative z-10">
        {/* Splash Screen */}
        <SplashScreen />

        {/* Navbar */}
        <Navbar />

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}
        <main>
          {/* Hero */}
          <section id="home" className="relative">
            <Hero />
          </section>

          {/* About */}
          <About />

          {/* Projects */}
          <Projects />

          {/* Experience */}
          <Experience />

          {/* Skills */}
          <Skills />

          {/* Contact */}
          <Contact />
        </main>

        {/* Background Music */}
        <LazyMusicButton
          src="/audio/sound.mp3"
          volume={0.4}
        />
      </div>
    </div>
  );
}
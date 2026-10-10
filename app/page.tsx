import dynamic from "next/dynamic";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Skills from "../components/section/Skill";
import SplashScreen from "../components/ui/SplashScreen";
import LuxuryDigitalStorm from "../components/3d/LuxuryDigitalStorm";
import LazyMusicButton from "../components/ui/LazyMusicButton";
import StormEffects from "../components/ui/StromEffects";
import Divider3D from "../components/ui/Divider3D";

// Contact membutuhkan JavaScript karena memiliki form interaktif.
// Dipisahkan menjadi chunk tersendiri agar halaman utama tetap ringan.
const Contact = dynamic(() => import("../components/section/Contact"));

// Revalidasi halaman setiap 5 menit.
export const revalidate = 300;

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#050816]">
      {/* =====================================================
          LUXURY DIGITAL STORM BACKGROUND (satu-satunya background)
      ===================================================== */}
      <LuxuryDigitalStorm />

      {/* Progress scroll (gradient violet → cyan, gaya ada di storm-theme.css) */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Interaksi global: tilt 3D, spotlight, magnet, reveal, kursor */}
      <StormEffects />

      {/* =====================================================
          WEBSITE CONTENT
          Semua konten berada di atas background.
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

          <Divider3D />

          {/* About */}
          <About />

          {/* Projects */}
          <Projects />

          <Divider3D />

          {/* Experience */}
          <Experience />

          {/* Skills */}
          <Skills />

          <Divider3D />

          {/* Contact */}
          <Contact />
        </main>

        {/* Background Music */}
        <LazyMusicButton src="/audio/sound.mp3" volume={0.4} />
      </div>
    </div>
  );
}
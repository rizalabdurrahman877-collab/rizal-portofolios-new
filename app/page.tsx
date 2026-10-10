import dynamic from "next/dynamic";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Skills from "../components/section/Skill";
import SplashScreen from "../components/ui/SplashScreen";
import LazyMusicButton from "../components/ui/LazyMusicButton";

// Pisahkan Contact menjadi chunk tersendiri.
const Contact = dynamic(() => import("../components/section/Contact"));

// Revalidasi halaman setiap 5 menit.
export const revalidate = 300;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent">
      {/* Semua konten berada di atas background */}
      <div className="relative z-10">
        <SplashScreen />

        <Navbar />

        <main>
          <section id="home" className="relative">
            <Hero />
          </section>

          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>

        <LazyMusicButton
          src="/audio/sound.mp3"
          volume={0.4}
        />
      </div>
    </div>
  );
}
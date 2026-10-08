import dynamic from "next/dynamic";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import About from "../components/section/About";
import Projects from "../components/section/Projects";
import Experience from "../components/section/Experience";
import Skills from "../components/section/Skill";
import SplashScreen from "../components/ui/SplashScreen";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import LazyMusicButton from "../components/ui/LazyMusicButton";

// Contact adalah satu-satunya section bawah yang butuh JavaScript (form),
// jadi JavaScript-nya dipisah ke chunk sendiri. HTML tetap dirender di server.
const Contact = dynamic(() => import("../components/section/Contact"));

// Beranda dibuat statis dan disegarkan tiap 5 menit (data proyek & skill dari Supabase)
export const revalidate = 300;

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

          {/* About, Projects, Experience, Skills, dan Contact sudah punya id sendiri */}
          <About />

          <Projects />

          <Experience />

          <Skills />

          <Contact />
        </main>

        <LazyMusicButton src="/audio/sound.mp3" volume={0.4} />
      </div>
    </div>
  );
}

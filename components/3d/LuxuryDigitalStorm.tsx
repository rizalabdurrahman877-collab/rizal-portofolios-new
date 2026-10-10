"use client";

import { useEffect, useRef } from "react";

import styles from "./LuxuryDigitalStorm.module.css";
import { StormEngine, type ParallaxLayer } from "@/components/3d/strom";

/**
 * Satu-satunya background utama website.
 *
 * - Tanpa video, poster, atau aset eksternal (tidak ada request tambahan).
 * - Lapisan CSS selalu dirender (termasuk di server) sehingga halaman tidak
 *   pernah hitam polos; canvas menambah detail 3D setelah hydrate.
 * - Jika canvas tidak tersedia, fallback CSS tetap tampil otomatis.
 * - Seluruh lapisan `pointer-events: none` dan berada di belakang konten.
 *
 * Interaksi: gerakkan mouse (parallax + partikel tertarik ke kursor), scroll
 * (partikel meluncur dengan jejak), klik/tap (gelombang kejut). Petir, meteor,
 * pulsa energi, dan pecahan 3D bergerak otomatis tanpa interaksi.
 */
export default function LuxuryDigitalStorm() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const farLayerRef = useRef<HTMLDivElement>(null);
  const nearLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const far = farLayerRef.current;
    const near = nearLayerRef.current;
    if (!root || !canvas || !far || !near) return;

    const layers: ParallaxLayer[] = [
      { el: far, depth: 10 },
      { el: near, depth: 18 },
    ];

    let engine: StormEngine | null = null;
    try {
      engine = StormEngine.create(canvas, layers);
    } catch {
      engine = null; // mis. memori grafis habis → tetap pakai fallback CSS
    }
    if (!engine) return;

    root.dataset.engine = "canvas";

    return () => {
      engine?.destroy();
      delete root.dataset.engine;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      aria-hidden="true"
      role="presentation"
      data-engine="css"
    >
      <div ref={farLayerRef} className={styles.parallax}>
        <div className={`${styles.aurora} ${styles.auroraBlue}`} />
      </div>
      <div ref={nearLayerRef} className={styles.parallax}>
        <div className={`${styles.aurora} ${styles.auroraViolet}`} />
        <div className={`${styles.aurora} ${styles.auroraCyan}`} />
      </div>
      <div className={styles.ambientLight} />

      <div className={`${styles.beam} ${styles.beamOne}`} />
      <div className={`${styles.beam} ${styles.beamTwo}`} />

      <div className={`${styles.halo} ${styles.haloOne}`} />
      <div className={`${styles.halo} ${styles.haloTwo}`} />

      <div className={styles.gridFloor} />
      <div className={styles.horizon} />

      <div className={`${styles.fallbackOrb} ${styles.fallbackOrbBlue}`} />
      <div className={`${styles.fallbackOrb} ${styles.fallbackOrbViolet}`} />
      <div className={styles.fallbackGrid} />

      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scan} />

      <div className={styles.scrim} />
      <div className={styles.vignette} />
    </div>
  );
}
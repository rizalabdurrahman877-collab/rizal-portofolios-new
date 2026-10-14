"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AdminBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const speed = reduceMotion ? 0.25 : 1;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.0006);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 4000);
    camera.position.set(0, 0, 700);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // Browser tanpa WebGL: background gradien tetap tampil
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // PARTIKEL 3D (tersebar di dalam area pandang kamera)
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color("#3b82f6"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#7dd3fc"),
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = -1200 + Math.random() * 1700;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // OBJEK WIREFRAME 3D
    const shapes: THREE.LineSegments[] = [];

    const addShape = (
      geo: THREE.BufferGeometry,
      color: number,
      pos: [number, number, number],
      spin: [number, number, number]
    ) => {
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.LineSegments(edges, mat);
      line.position.set(...pos);
      line.userData.spin = new THREE.Vector3(...spin);
      line.userData.baseY = pos[1];
      scene.add(line);
      shapes.push(line);
    };

    addShape(new THREE.IcosahedronGeometry(110, 0), 0x3b82f6, [-300, 120, -150], [0.004, 0.008, 0.002]);
    addShape(new THREE.OctahedronGeometry(85, 0), 0x22d3ee, [320, -130, -100], [0.006, -0.004, 0.003]);
    addShape(new THREE.TorusKnotGeometry(70, 18, 140, 14), 0x38bdf8, [40, -20, -320], [0.002, 0.004, 0.006]);
    addShape(new THREE.DodecahedronGeometry(60, 0), 0x67e8f9, [-140, -180, 40], [-0.004, 0.006, 0.002]);

    // LANTAI GRID 3D
    const grid = new THREE.GridHelper(2400, 48, 0x22d3ee, 0x1d4ed8);
    const gridMat = grid.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.35;
    gridMat.blending = THREE.AdditiveBlending;
    grid.position.y = -300;
    scene.add(grid);
    const gridCell = 2400 / 48;

    // MOUSE PARALLAX
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    // RESIZE
    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // ANIMASI
    let raf = 0;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.005 * speed;

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      particles.rotation.y = t * 0.5 + mouse.x * 0.4;
      particles.rotation.x = mouse.y * 0.2;

      camera.position.x = mouse.x * 160;
      camera.position.y = -mouse.y * 110;
      camera.lookAt(0, 0, 0);

      shapes.forEach((s, i) => {
        const spin = s.userData.spin as THREE.Vector3;
        s.rotation.x += spin.x * speed * 10;
        s.rotation.y += spin.y * speed * 10;
        s.rotation.z += spin.z * speed * 10;
        s.position.y = (s.userData.baseY as number) + Math.sin(t * 1.2 + i) * 16;
      });

      grid.position.z = (t * 500 * speed) % gridCell;

      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);

      particleGeo.dispose();
      particleMat.dispose();
      shapes.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      grid.geometry.dispose();
      gridMat.dispose();

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div aria-hidden className="adm-bg">
      <div className="adm-aurora" />
      <div ref={mountRef} className="adm-three" />
      <div className="adm-vignette" />
    </div>
  );
}
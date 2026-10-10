"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./LuxuryDigitalStorm.module.css";

const particleVertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  attribute float aSpeed;
  attribute float aPhase;
  uniform float uPixelRatio;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec3 animatedPosition = position;
    float drift = uTime * aSpeed + aPhase;
    animatedPosition.x += cos(drift) * 0.12;
    animatedPosition.y += sin(drift) * 0.2;
    vec4 viewPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * uPixelRatio * (280.0 / -viewPosition.z);
    vAlpha = aAlpha;
  }
`;

const particleFragmentShader = `
  varying float vAlpha;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float glow = 1.0 - smoothstep(0.12, 0.5, distanceToCenter);
    gl_FragColor = vec4(vec3(0.48, 0.76, 1.0), glow * vAlpha);
  }
`;

const orbVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 displaced = position;
    displaced += normal * sin(position.y * 9.0 + uTime * 0.35) * 0.012;
    vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const orbFragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(-vViewPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.2);
    float wave = sin(vUv.y * 52.0 + uTime * 0.22) * 0.5 + 0.5;
    float bands = smoothstep(0.88, 0.99, wave) * 0.22;
    float core = 1.0 - smoothstep(0.0, 0.9, length(vUv - vec2(0.5, 0.52)));
    vec3 color = mix(vec3(0.025, 0.09, 0.23), vec3(0.18, 0.22, 0.72), bands + core * 0.2);
    color += vec3(0.16, 0.66, 1.0) * fresnel * 1.25;
    color += vec3(0.38, 0.2, 0.9) * pow(fresnel, 3.0) * 0.9;
    float alpha = 0.24 + fresnel * 0.55 + bands + core * 0.08;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createParticleField(count: number, aspect: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 12 * aspect;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 8.5;
    positions[index * 3 + 2] = Math.random() * -9;
    sizes[index] = 1.2 + Math.random() * 3.2;
    alphas[index] = 0.2 + Math.random() * 0.62;
    speeds[index] = 0.12 + Math.random() * 0.36;
    phases[index] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uPixelRatio: { value: 1 },
      uTime: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

function createNetwork(aspect: number) {
  const nodes = Array.from(
    { length: 44 },
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 11 * aspect,
        (Math.random() - 0.5) * 7,
        -1 - Math.random() * 7,
      ),
  );
  const positions: number[] = [];

  nodes.forEach((node, index) => {
    nodes.slice(index + 1).forEach((neighbor) => {
      if (node.distanceTo(neighbor) < 1.65) {
        positions.push(...node.toArray(), ...neighbor.toArray());
      }
    });
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );

  return new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({
      color: 0x4c98ff,
      transparent: true,
      opacity: 0.11,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
}

export default function LuxuryDigitalStorm() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sceneRef.current;
    const canvasHost = canvasRef.current;
    if (!root || !canvasHost) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowMotionDevice = window.matchMedia("(max-width: 700px)");
    let renderer: THREE.WebGLRenderer | undefined;
    let frameId = 0;
    let isVisible = !document.hidden;
    let isAnimating = !reducedMotion.matches;
    let particleField: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
    let particleCount = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0, 10);

    const world = new THREE.Group();
    scene.add(world);

    const orbGroup = new THREE.Group();
    orbGroup.position.set(lowMotionDevice.matches ? 2.15 : 3.2, 0.7, -0.5);
    world.add(orbGroup);

    const orbUniforms = { uTime: { value: 0 } };
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.94, 48, 36),
      new THREE.ShaderMaterial({
        vertexShader: orbVertexShader,
        fragmentShader: orbFragmentShader,
        uniforms: orbUniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    orbGroup.add(orb);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 32, 24),
      new THREE.MeshBasicMaterial({
        color: 0x186de8,
        transparent: true,
        opacity: 0.075,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    orbGroup.add(halo);

    const rings = [
      { radius: 1.3, tube: 0.008, color: 0x6bd8ff, opacity: 0.3 },
      { radius: 1.52, tube: 0.004, color: 0x8470ff, opacity: 0.18 },
    ].map(({ radius, tube, color, opacity }) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 5, 120),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      ring.rotation.set(0.75, 0.2, -0.35);
      orbGroup.add(ring);
      return ring;
    });

    const network = createNetwork(window.innerWidth / window.innerHeight);
    world.add(network);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const setParallax = (x: number, y: number) => {
      root.style.setProperty("--parallax-back", `${x * 3}px ${y * 2}px`);
      root.style.setProperty("--parallax-mid", `${x * 6}px ${y * 4}px`);
      root.style.setProperty("--parallax-front", `${x * 9}px ${y * 6}px`);
    };

    const resize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / Math.max(height, 1);
      const nextCount = lowMotionDevice.matches ? 72 : 142;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          lowMotionDevice.matches ? 1.25 : 1.6,
        ),
      );
      orbGroup.position.x = Math.min(3.2, Math.max(0.85, aspect * 1.9));

      if (nextCount !== particleCount) {
        if (particleCount > 0) {
          particleField.geometry.dispose();
          particleField.material.dispose();
          world.remove(particleField);
        }
        particleField = createParticleField(nextCount, aspect);
        particleField.material.uniforms.uPixelRatio.value =
          renderer.getPixelRatio();
        world.add(particleField);
        particleCount = nextCount;
      }

      if (!isAnimating || !isVisible) renderer.render(scene, camera);
    };

    const tick = (timestamp: number) => {
      if (!renderer || !isAnimating || !isVisible) return;
      const time = timestamp * 0.001;
      pointerX += (targetX - pointerX) * 0.025;
      pointerY += (targetY - pointerY) * 0.025;
      world.position.x = pointerX * 0.22;
      world.position.y = pointerY * 0.14;
      world.rotation.y = pointerX * 0.008;
      world.rotation.x = -pointerY * 0.006;
      orbUniforms.uTime.value = time;
      orbGroup.rotation.y = time * 0.045;
      orbGroup.rotation.x = Math.sin(time * 0.18) * 0.035;
      rings[0].rotation.z = time * 0.035;
      rings[1].rotation.z = -time * 0.022;
      particleField.rotation.y = time * 0.008;
      particleField.material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const start = () => {
      if (renderer && isAnimating && isVisible && !frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const handleMotionChange = () => {
      isAnimating = !reducedMotion.matches;
      root.classList.toggle(styles.reducedMotion, !isAnimating);
      if (isAnimating && isVisible) start();
      else {
        targetX = 0;
        targetY = 0;
        pointerX = 0;
        pointerY = 0;
        setParallax(0, 0);
        world.position.set(0, 0, 0);
        world.rotation.set(0, 0, 0);
        stop();
        if (renderer) renderer.render(scene, camera);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      root.classList.toggle(styles.paused, !isVisible);
      if (isVisible && isAnimating) start();
      else stop();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !isAnimating) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      setParallax(targetX, targetY);
    };

    const handlePointerLeave = () => {
      if (!isAnimating) return;
      targetX = 0;
      targetY = 0;
      setParallax(0, 0);
    };

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !lowMotionDevice.matches,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute("aria-hidden", "true");
      canvasHost.appendChild(renderer.domElement);
      root.classList.add(styles.webglReady);
      resize();
      root.classList.toggle(styles.reducedMotion, !isAnimating);
      if (isAnimating && isVisible) start();
      else renderer.render(scene, camera);
    } catch {
      renderer?.dispose();
      renderer = undefined;
      canvasHost.replaceChildren();
      root.classList.remove(styles.webglReady);
    }

    reducedMotion.addEventListener("change", handleMotionChange);
    lowMotionDevice.addEventListener("change", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      reducedMotion.removeEventListener("change", handleMotionChange);
      lowMotionDevice.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      world.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer?.dispose();
      canvasHost.replaceChildren();
    };
  }, []);

  return (
    <div ref={sceneRef} aria-hidden="true" className={styles.scene}>
      <div className={styles.aurora} />
      <div className={styles.ambientBlue} />
      <div className={styles.ambientViolet} />
      <div className={styles.floorGrid} />
      <div className={styles.network} />
      <div className={styles.particleField} />
      <div className={styles.fallbackOrb}>
        <span />
        <span />
      </div>
      <div ref={canvasRef} className={styles.canvasLayer} />
      <div className={`${styles.streak} ${styles.streakOne}`} />
      <div className={`${styles.streak} ${styles.streakTwo}`} />
      <div className={styles.vignette} />
    </div>
  );
}

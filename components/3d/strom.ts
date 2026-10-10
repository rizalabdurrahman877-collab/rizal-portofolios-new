/**
 * StormEngine v2 — background 3D "full animasi" murni Canvas 2D (tanpa three.js, tanpa aset).
 *
 * Lapisan animasi:
 *  1. Pita aurora bergelombang (sine ribbons)
 *  2. Hujan data (garis cahaya jatuh)
 *  3. Pecahan 3D melayang (kubus/oktahedron/ikosahedron wireframe) yang berputar & melaju
 *  4. Terowongan partikel + jaring koneksi + pulsa energi yang berjalan di sepanjang garis
 *  5. Objek utama: ikosahedron + oktahedron kontra-rotasi, 2 cincin orbit, ring energi berdenyut
 *  6. Torus wireframe kedua (kiri bawah)
 *  7. Meteor, petir bercabang (kadang kembar) + kilatan
 *  8. Gelombang kejut saat klik/tap, glow + jejak kursor, partikel tertarik ke kursor
 *  9. Kamera bergoyang sendiri (idle sway) + parallax mouse + dorongan kecepatan saat scroll
 *
 * API sama: StormEngine.create(canvas, layers) & engine.destroy()
 */

export type ParallaxLayer = { el: HTMLElement; depth: number };

type V3 = [number, number, number];
type P2 = [number, number];
type Geo = { v: V3[]; e: [number, number][] };

const TAU = Math.PI * 2;
const FOV = 900;
const DEPTH = 2400;
const PIVOT = 900;
const OBJ_Z = 500;
const OBJ_SC = FOV / (FOV + OBJ_Z);
const COLORS = ["141,124,255", "125,211,252", "179,125,255"] as const;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function rotate(p: V3, ax: number, ay: number, az: number): V3 {
  let [x, y, z] = p;
  let c = Math.cos(ax);
  let s = Math.sin(ax);
  let t = y * c - z * s;
  z = y * s + z * c;
  y = t;
  c = Math.cos(ay);
  s = Math.sin(ay);
  t = x * c + z * s;
  z = -x * s + z * c;
  x = t;
  c = Math.cos(az);
  s = Math.sin(az);
  t = x * c - y * s;
  y = x * s + y * c;
  x = t;
  return [x, y, z];
}

/** Hubungkan semua pasangan vertex yang jaraknya == panjang rusuk. */
function edgesByLength(v: V3[], len: number): [number, number][] {
  const e: [number, number][] = [];
  for (let i = 0; i < v.length; i++) {
    for (let j = i + 1; j < v.length; j++) {
      const a = v[i]!;
      const b = v[j]!;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (Math.abs(d - len) < 0.01) e.push([i, j]);
    }
  }
  return e;
}

function icosahedron(): Geo {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: V3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  const e = edgesByLength(raw, 2);
  const len = Math.hypot(1, t);
  return { v: raw.map((p) => [p[0] / len, p[1] / len, p[2] / len] as V3), e };
}

function octahedron(): Geo {
  const v: V3[] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  return { v, e: edgesByLength(v, Math.SQRT2) };
}

function cube(): Geo {
  const v: V3[] = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) v.push([x, y, z]);
  return { v, e: edgesByLength(v, 2) };
}

function torus(U: number, V: number): Geo {
  const v: V3[] = [];
  const minor = 0.38;
  const norm = 1 + minor;
  for (let i = 0; i < U; i++) {
    for (let j = 0; j < V; j++) {
      const a = (i / U) * TAU;
      const b = (j / V) * TAU;
      const r = 1 + minor * Math.cos(b);
      v.push([(r * Math.cos(a)) / norm, (minor * Math.sin(b)) / norm, (r * Math.sin(a)) / norm]);
    }
  }
  const e: [number, number][] = [];
  for (let i = 0; i < U; i++) {
    for (let j = 0; j < V; j++) {
      const k = i * V + j;
      e.push([k, ((i + 1) % U) * V + j]);
      e.push([k, i * V + ((j + 1) % V)]);
    }
  }
  return { v, e };
}

const ICO = icosahedron();
const OCTA = octahedron();
const CUBE = cube();
const TORUS = torus(28, 10);
const SHARD_GEOS: Geo[] = [CUBE, OCTA, ICO];

interface Particle {
  x: number; y: number; z: number; r: number; hue: 0 | 1 | 2;
  sx: number; sy: number; sc: number; zz: number; a: number;
}
interface Shard {
  x: number; y: number; z: number; s: number;
  rx: number; ry: number; rz: number;
  vx: number; vy: number; vz: number;
  geo: Geo; hue: 0 | 1 | 2;
}
interface Bolt { pts: P2[]; branches: P2[][]; life: number; max: number }
interface Wave { x: number; y: number; t: number }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; max: number }
interface Drop { x: number; y: number; l: number; v: number; a: number }
interface Pulse { a: number; b: number; t: number; sp: number }

export class StormEngine {
  static create(canvas: HTMLCanvasElement, layers: ParallaxLayer[] = []): StormEngine {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D tidak tersedia");
    return new StormEngine(canvas, ctx, layers);
  }

  private w = 0;
  private h = 0;
  private dpr = 1;
  private raf = 0;
  private last = 0;
  private time = 0;
  private destroyed = false;
  private reduced: boolean;

  // input
  private tx = 0; private ty = 0;
  private px = 0; private py = 0;
  private tmx = 0; private tmy = 0;
  private mx = 0; private my = 0;
  private pointerAge = 99;
  private pointerSeen = false;
  private trail: P2[] = [];
  private scrollY = 0;
  private lastScrollY = 0;
  private boost = 0;

  // kamera
  private cp = 1; private sp = 0; private cyw = 1; private syw = 0;
  private o: [number, number, number, number] = [0, 0, 0, 1];

  // entitas
  private particles: Particle[] = [];
  private shards: Shard[] = [];
  private bolts: Bolt[] = [];
  private waves: Wave[] = [];
  private meteors: Meteor[] = [];
  private drops: Drop[] = [];
  private pulses: Pulse[] = [];
  private nextBolt = 2.2;
  private pendingBolt = 0;
  private nextMeteor = 1.2;
  private nextPulse = 0.3;
  private flash = 0;

  private constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private layers: ParallaxLayer[],
  ) {
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.scrollY = this.lastScrollY = window.scrollY;
    this.resize();

    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("pointermove", this.onMove, { passive: true });
    window.addEventListener("pointerdown", this.onDown, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibility);

    if (this.reduced) {
      this.draw();
    } else {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("visibilitychange", this.onVisibility);
    for (const l of this.layers) l.el.style.transform = "";
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  /* ------------------------------ events ------------------------------ */
  private onResize = () => {
    this.resize();
    if (this.reduced) this.draw();
  };
  private onMove = (e: PointerEvent) => {
    this.tx = (e.clientX / this.w) * 2 - 1;
    this.ty = (e.clientY / this.h) * 2 - 1;
    this.tmx = e.clientX;
    this.tmy = e.clientY;
    if (!this.pointerSeen) {
      this.mx = e.clientX;
      this.my = e.clientY;
      this.pointerSeen = true;
    }
    this.pointerAge = 0;
  };
  private onDown = (e: PointerEvent) => {
    if (this.reduced) return;
    this.waves.push({ x: e.clientX, y: e.clientY, t: 0 });
    if (this.waves.length > 4) this.waves.shift();
    this.flash = Math.max(this.flash, 0.05);
  };
  private onScroll = () => {
    const y = window.scrollY;
    this.boost = clamp(this.boost + Math.abs(y - this.lastScrollY) * 0.02, 0, 6);
    this.lastScrollY = y;
    this.scrollY = y;
  };
  private onVisibility = () => {
    if (this.reduced || this.destroyed) return;
    if (document.hidden) {
      cancelAnimationFrame(this.raf);
    } else {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
  };

  /* ------------------------------ setup ------------------------------- */
  private resize() {
    const mobile = window.innerWidth < 768;
    this.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.particles = Array.from({ length: mobile ? 46 : 110 }, () => this.spawnParticle(true));
    this.shards = Array.from({ length: mobile ? 4 : 9 }, () => this.spawnShard(true));
    this.drops = Array.from({ length: mobile ? 14 : 36 }, () => ({
      x: rand(0, this.w), y: rand(0, this.h), l: rand(14, 38), v: rand(500, 900), a: rand(0.06, 0.16),
    }));
    this.pulses = [];
  }

  private spawnParticle(initial: boolean, p?: Particle): Particle {
    const o: Particle = p ?? { x: 0, y: 0, z: 0, r: 0, hue: 0, sx: 0, sy: 0, sc: 1, zz: 0, a: 0 };
    o.x = rand(-this.w * 1.1, this.w * 1.1);
    o.y = rand(-this.h * 1.1, this.h * 1.1);
    o.z = initial ? rand(20, DEPTH) : DEPTH + rand(0, 200);
    o.r = rand(0.7, 1.7);
    o.hue = (Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 2) as 0 | 1 | 2;
    return o;
  }

  private spawnShard(initial: boolean, s?: Shard): Shard {
    const o: Shard = s ?? {
      x: 0, y: 0, z: 0, s: 0, rx: 0, ry: 0, rz: 0, vx: 0, vy: 0, vz: 0, geo: CUBE, hue: 0,
    };
    o.x = rand(-this.w * 0.9, this.w * 0.9);
    o.y = rand(-this.h * 0.9, this.h * 0.9);
    o.z = initial ? rand(200, DEPTH) : DEPTH + rand(0, 300);
    o.s = rand(38, 95);
    o.rx = rand(0, TAU); o.ry = rand(0, TAU); o.rz = rand(0, TAU);
    o.vx = rand(-0.7, 0.7); o.vy = rand(-0.7, 0.7); o.vz = rand(-0.5, 0.5);
    o.geo = SHARD_GEOS[Math.floor(rand(0, SHARD_GEOS.length))]!;
    o.hue = Math.floor(rand(0, 3)) as 0 | 1 | 2;
    return o;
  }

  /* ------------------------------- loop ------------------------------- */
  private frame = (now: number) => {
    if (this.destroyed) return;
    const dt = Math.min(0.05, (now - this.last) / 1000 || 0.016);
    this.last = now;
    this.update(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.frame);
  };

  private update(dt: number) {
    this.time += dt;
    const t = this.time;
    const k = 1 - Math.exp(-dt * 3);

    // kamera: mouse + goyangan idle supaya selalu bergerak
    this.px += (clamp(this.tx + Math.sin(t * 0.27) * 0.35, -1.4, 1.4) - this.px) * k;
    this.py += (clamp(this.ty + Math.cos(t * 0.21) * 0.2, -1.4, 1.4) - this.py) * k;
    this.boost *= Math.exp(-dt * 2.5);

    // kursor
    this.pointerAge += dt;
    const km = 1 - Math.exp(-dt * 10);
    this.mx += (this.tmx - this.mx) * km;
    this.my += (this.tmy - this.my) * km;
    if (this.pointerAge < 2.5) {
      this.trail.push([this.mx, this.my]);
      if (this.trail.length > 14) this.trail.shift();
    } else if (this.trail.length) {
      this.trail.shift();
    }

    const speed = 70 + this.boost * 140;
    for (const p of this.particles) {
      p.z -= speed * dt;
      if (p.z < 20) this.spawnParticle(false, p);
    }
    for (const s of this.shards) {
      s.z -= speed * 0.55 * dt;
      s.rx += s.vx * dt; s.ry += s.vy * dt; s.rz += s.vz * dt;
      if (s.z < 60) this.spawnShard(false, s);
    }

    // hujan data
    for (const d of this.drops) {
      d.y += d.v * dt * (1 + this.boost * 0.15);
      d.x -= d.v * 0.1 * dt;
      if (d.y > this.h + 40) {
        d.y = -rand(10, 80);
        d.x = rand(0, this.w * 1.1);
      }
    }

    // pulsa energi pada jaring
    this.nextPulse -= dt;
    const cap = this.w < 768 ? 6 : 14;
    if (this.nextPulse <= 0 && this.pulses.length < cap) {
      this.nextPulse = 0.12;
      this.spawnPulse();
    }
    for (const pl of this.pulses) pl.t += dt * pl.sp;
    this.pulses = this.pulses.filter((pl) => pl.t < 1);

    // meteor
    this.nextMeteor -= dt;
    if (this.nextMeteor <= 0) {
      this.nextMeteor = rand(1.2, 3.2);
      const sp = rand(700, 1100);
      this.meteors.push({
        x: rand(this.w * 0.3, this.w * 1.1), y: rand(-40, this.h * 0.35),
        vx: -sp * 0.8, vy: sp * 0.55, life: 0, max: rand(0.5, 0.9),
      });
    }
    for (const m of this.meteors) {
      m.x += m.vx * dt; m.y += m.vy * dt; m.life += dt;
    }
    this.meteors = this.meteors.filter((m) => m.life < m.max);

    // petir (kadang kembar)
    this.nextBolt -= dt;
    if (this.nextBolt <= 0) {
      this.bolts.push(this.makeBolt());
      this.nextBolt = rand(3.5, 6.5);
      if (Math.random() < 0.35) this.pendingBolt = 0.18;
    }
    if (this.pendingBolt > 0) {
      this.pendingBolt -= dt;
      if (this.pendingBolt <= 0) this.bolts.push(this.makeBolt());
    }
    for (const b of this.bolts) b.life += dt;
    this.bolts = this.bolts.filter((b) => b.life < b.max);

    for (const w of this.waves) w.t += dt;
    this.waves = this.waves.filter((w) => w.t < 1.2);
    this.flash *= Math.exp(-dt * 6);

    const sOff = Math.min(this.scrollY, 1200) * 0.004;
    for (const l of this.layers) {
      const x = -this.px * l.depth;
      const y = -this.py * l.depth - sOff * l.depth;
      l.el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
    }
  }

  private spawnPulse() {
    const ps = this.particles;
    const link = (this.w < 768 ? 240 : 300) * 0.9;
    for (let n = 0; n < 12; n++) {
      const i = Math.floor(rand(0, ps.length));
      const j = Math.floor(rand(0, ps.length));
      const a = ps[i];
      const b = ps[j];
      if (!a || !b || i === j || a.a < 0.25 || b.a < 0.25) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      if (d < link) {
        this.pulses.push({ a: i, b: j, t: 0, sp: rand(0.7, 1.4) });
        return;
      }
    }
  }

  private makeBolt(): Bolt {
    const jag = (x0: number, y0: number, endY: number, spread: number): P2[] => {
      const pts: P2[] = [[x0, y0]];
      let x = x0;
      let y = y0;
      while (y < endY) {
        y += rand(16, 44);
        x += rand(-spread, spread);
        pts.push([x, y]);
      }
      return pts;
    };
    const main = jag(rand(this.w * 0.08, this.w * 0.92), -10, rand(this.h * 0.45, this.h * 0.85), 34);
    const branches: P2[][] = [];
    const n = Math.floor(rand(1, 4));
    for (let i = 0; i < n; i++) {
      const from = main[Math.floor(rand(2, main.length - 2))];
      if (!from) continue;
      branches.push(jag(from[0], from[1], from[1] + rand(80, 220), 46));
    }
    this.flash = Math.max(this.flash, 0.12);
    return { pts: main, branches, life: 0, max: 0.55 };
  }

  /* ------------------------------ kamera ------------------------------ */
  private setCamera() {
    const yaw = this.px * 0.22;
    const pitch = this.py * 0.14;
    this.cyw = Math.cos(yaw); this.syw = Math.sin(yaw);
    this.cp = Math.cos(pitch); this.sp = Math.sin(pitch);
  }

  /** Proyeksi titik dunia -> layar. Hasil: [sx, sy, skala, zKamera] (array dipakai ulang). */
  private project(x: number, y: number, z: number) {
    const z0 = z - PIVOT;
    const y1 = y * this.cp - z0 * this.sp;
    const z1 = y * this.sp + z0 * this.cp;
    const x2 = x * this.cyw + z1 * this.syw;
    const z2 = -x * this.syw + z1 * this.cyw;
    const zz = z2 + PIVOT;
    const sc = FOV / (FOV + Math.max(zz, -FOV + 60));
    this.o[0] = this.w / 2 + x2 * sc;
    this.o[1] = this.h / 2 + y1 * sc;
    this.o[2] = sc;
    this.o[3] = zz;
    return this.o;
  }

  /* ------------------------------- draw ------------------------------- */
  private draw() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    this.setCamera();

    this.drawRibbons();
    this.drawRain();
    this.drawShards();
    this.drawParticles();
    this.drawObjects();
    this.drawMeteors();
    this.drawBolts();
    this.drawWaves();
    this.drawPointer();

    if (this.flash > 0.006) {
      ctx.fillStyle = `rgba(141,124,255,${this.flash.toFixed(3)})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  private drawRibbons() {
    const { ctx, w, h } = this;
    const t = this.time;
    const defs = [
      { y: 0.2, amp: 36, f: 0.004, s: 0.5, c: "125,211,252", a: 0.05 },
      { y: 0.3, amp: 50, f: 0.003, s: -0.35, c: "141,124,255", a: 0.055 },
      { y: 0.14, amp: 28, f: 0.006, s: 0.7, c: "179,125,255", a: 0.04 },
    ];
    const shift = this.py * -12 - Math.min(this.scrollY, 800) * 0.1;
    const passes: [number, number][] = [[64, 1], [26, 1.6], [5, 3.2]];
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const d of defs) {
      for (const [lw, m] of passes) {
        ctx.lineWidth = lw;
        ctx.strokeStyle = `rgba(${d.c},${(d.a * m).toFixed(3)})`;
        ctx.beginPath();
        for (let x = -16; x <= w + 16; x += 16) {
          const y =
            h * d.y + shift +
            Math.sin(x * d.f + t * d.s) * d.amp +
            Math.sin(x * d.f * 2.3 - t * d.s * 1.4) * d.amp * 0.4;
          if (x === -16) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  }

  private drawRain() {
    const { ctx } = this;
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    for (const d of this.drops) {
      ctx.strokeStyle = `rgba(160,200,255,${d.a.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.l * 0.1, d.y - d.l);
      ctx.stroke();
    }
  }

  private drawShards() {
    const { ctx } = this;
    ctx.lineWidth = 1;
    for (const s of this.shards) {
      const c = this.project(s.x, s.y, s.z);
      const a = clamp(1 - c[3] / DEPTH, 0, 1) * clamp(c[3] / 220, 0, 1) * 0.6;
      if (a < 0.03) continue;
      const pts = s.geo.v.map((v) => {
        const r = rotate([v[0] * s.s, v[1] * s.s, v[2] * s.s], s.rx, s.ry, s.rz);
        const q = this.project(s.x + r[0], s.y + r[1], s.z + r[2]);
        return [q[0], q[1]] as P2;
      });
      ctx.strokeStyle = `rgba(${COLORS[s.hue]},${a.toFixed(3)})`;
      ctx.beginPath();
      for (const [i, j] of s.geo.e) {
        const p = pts[i]!;
        const q = pts[j]!;
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
      }
      ctx.stroke();
    }
  }

  private drawParticles() {
    const { ctx, w, h } = this;
    const cx = w / 2;
    const cy = h / 2;
    const link = w < 768 ? 240 : 300;
    const act = clamp(1 - this.pointerAge / 2.5, 0, 1);
    const R = 170;
    const ps = this.particles;

    for (const p of ps) {
      const q = this.project(p.x, p.y, p.z);
      p.sx = q[0]; p.sy = q[1]; p.sc = q[2]; p.zz = q[3];
      p.a = clamp(1 - p.zz / DEPTH, 0, 1) * clamp(p.zz / 160, 0, 1);
      if (act > 0.02) {
        const dx = this.mx - p.sx;
        const dy = this.my - p.sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const f = (1 - Math.sqrt(d2) / R) * 0.2 * act;
          p.sx += dx * f;
          p.sy += dy * f;
        }
      }
    }

    // jaring
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    for (let i = 0; i < ps.length; i++) {
      const a = ps[i]!;
      if (a.a < 0.05) continue;
      for (let j = i + 1; j < ps.length; j++) {
        const b = ps[j]!;
        if (b.a < 0.05) continue;
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > link * link) continue;
        const al = (1 - Math.sqrt(d2) / link) * 0.3 * Math.min(a.a, b.a);
        ctx.strokeStyle = `rgba(141,124,255,${al.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }
    }

    // pulsa energi
    for (const pl of this.pulses) {
      const a = ps[pl.a];
      const b = ps[pl.b];
      if (!a || !b || a.a < 0.05 || b.a < 0.05) continue;
      const x = a.sx + (b.sx - a.sx) * pl.t;
      const y = a.sy + (b.sy - a.sy) * pl.t;
      const al = Math.sin(pl.t * Math.PI);
      ctx.fillStyle = `rgba(125,211,252,${(al * 0.28).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, TAU);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${(al * 0.95).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, TAU);
      ctx.fill();
    }

    // titik + jejak kecepatan saat scroll
    const trailK = clamp(this.boost / 3, 0, 1);
    for (const p of ps) {
      if (p.a < 0.03) continue;
      if (trailK > 0.08) {
        const sc2 = FOV / (FOV + p.zz + this.boost * 90);
        const ex = cx + (p.sx - cx) * (sc2 / p.sc);
        const ey = cy + (p.sy - cy) * (sc2 / p.sc);
        ctx.strokeStyle = `rgba(${COLORS[p.hue]},${(p.a * 0.5 * trailK).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.8, p.r * p.sc);
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${COLORS[p.hue]},${(p.a * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, p.r * p.sc * 2.2 + 0.4, 0, TAU);
      ctx.fill();
    }
  }

  private drawObjects() {
    const { ctx, w, h } = this;
    const desktop = w >= 900;
    const ox = desktop ? w * 0.74 : w * 0.5;
    const oy = desktop ? h * 0.42 : h * 0.26;
    const rScr = clamp(Math.min(w, h) * 0.26, 90, 240);
    const breath = 1 + 0.04 * Math.sin(this.time * 1.6);
    const R = (rScr / OBJ_SC) * breath;
    const alpha = clamp(1 - this.scrollY / (h * 1.1), 0.2, 1) * 0.9;
    const t = this.time;
    const spin = 1 + this.boost * 0.8;

    const rx = t * 0.25 * spin + this.py * 0.4;
    const ry = t * 0.35 * spin + this.px * 0.5;
    const rz = t * 0.1;

    // cahaya inti (berdenyut)
    const pulse = 0.85 + 0.15 * Math.sin(t * 2.2);
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, rScr * 1.25);
    g.addColorStop(0, `rgba(125,211,252,${(0.22 * alpha * pulse).toFixed(3)})`);
    g.addColorStop(0.45, `rgba(141,124,255,${(0.1 * alpha).toFixed(3)})`);
    g.addColorStop(1, "rgba(141,124,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ox, oy, rScr * 1.25, 0, TAU);
    ctx.fill();

    // ring energi yang memancar keluar
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.32 + i / 3) % 1;
      const r = rScr * (0.8 + ph * 2.3);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = `rgba(141,124,255,${((1 - ph) * 0.26 * alpha).toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(ox, oy, r, r * 0.38, 0, 0, TAU);
      ctx.stroke();
    }

    this.drawPoly(ICO, R, rx, ry, rz, ox, oy, alpha, "141,124,255", "190,175,255");
    this.drawPoly(OCTA, R * 0.46, -rx * 1.6, -ry * 1.4, -rz, ox, oy, alpha * 1.1, "125,211,252", "220,245,255");
    this.drawRing(R * 1.4, 1.15, 0.2, t * 0.5 * spin, 0.9, ox, oy, alpha, "125,211,252");
    this.drawRing(R * 1.75, 0.55, -0.9, -t * 0.35 * spin, 1.7, ox, oy, alpha * 0.85, "179,125,255");

    // torus kedua
    const tx = desktop ? w * 0.14 : w * 0.84;
    const ty = desktop ? h * 0.74 : h * 0.82;
    const tr = clamp(Math.min(w, h) * 0.14, 60, 130);
    this.drawTorus(tx, ty, tr, alpha * 0.8);
  }

  private drawPoly(
    geo: Geo, R: number, rx: number, ry: number, rz: number,
    ox: number, oy: number, alpha: number, line: string, dot: string,
  ) {
    const { ctx } = this;
    const pts = geo.v.map((p) => {
      const r = rotate([p[0] * R, p[1] * R, p[2] * R], rx, ry, rz);
      const sc = FOV / (FOV + OBJ_Z + r[2]);
      return [ox + r[0] * sc, oy + r[1] * sc, r[2] / R] as V3;
    });
    ctx.lineWidth = 1.2;
    ctx.lineCap = "butt";
    for (const [i, j] of geo.e) {
      const a = pts[i]!;
      const b = pts[j]!;
      const depth = (a[2] + b[2]) / 2;
      ctx.strokeStyle = `rgba(${line},${(alpha * (0.5 - depth * 0.38)).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    }
    const tw = this.time * 3;
    pts.forEach((p, i) => {
      const twinkle = 0.75 + 0.25 * Math.sin(tw + i * 1.7);
      ctx.fillStyle = `rgba(${dot},${(alpha * (0.85 - p[2] * 0.4) * twinkle).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 2.2 * twinkle + 0.4, 0, TAU);
      ctx.fill();
    });
  }

  private drawTorus(ox: number, oy: number, rScr: number, alpha: number) {
    const { ctx } = this;
    const t = this.time;
    const R = rScr / OBJ_SC;
    const pts = TORUS.v.map((p) => {
      const r = rotate([p[0] * R, p[1] * R, p[2] * R], t * 0.4 + this.py * 0.3, t * 0.55 + this.px * 0.3, 0.4);
      const sc = FOV / (FOV + OBJ_Z + r[2]);
      return [ox + r[0] * sc, oy + r[1] * sc] as P2;
    });
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(125,211,252,${(alpha * 0.32).toFixed(3)})`;
    ctx.beginPath();
    for (const [i, j] of TORUS.e) {
      const a = pts[i]!;
      const b = pts[j]!;
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
    }
    ctx.stroke();
  }

  private drawRing(
    radius: number, tiltX: number, tiltZ: number, spin: number, satSpeed: number,
    ox: number, oy: number, alpha: number, color: string,
  ) {
    const { ctx } = this;
    const N = 72;
    const proj = (a: number) => {
      const r = rotate([Math.cos(a) * radius, 0, Math.sin(a) * radius], tiltX + this.py * 0.3, this.px * 0.4, tiltZ);
      const sc = FOV / (FOV + OBJ_Z + r[2]);
      return [ox + r[0] * sc, oy + r[1] * sc, r[2] / radius] as V3;
    };
    ctx.lineWidth = 1;
    let prev = proj(spin);
    for (let i = 1; i <= N; i++) {
      const cur = proj(spin + (i / N) * TAU);
      const al = alpha * (0.32 - ((prev[2] + cur[2]) / 2) * 0.24);
      ctx.strokeStyle = `rgba(${color},${al.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(prev[0], prev[1]);
      ctx.lineTo(cur[0], cur[1]);
      ctx.stroke();
      prev = cur;
    }
    // satelit + ekor komet
    for (let k = 0; k < 8; k++) {
      const s = proj(spin + this.time * satSpeed - k * 0.09 * Math.sign(satSpeed));
      const sz = (3.2 - k * 0.3) * (FOV / (FOV + OBJ_Z + s[2] * radius));
      ctx.save();
      if (k === 0) {
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${color},0.95)`;
      }
      ctx.fillStyle = `rgba(255,255,255,${(alpha * (0.95 - k * 0.11)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s[0], s[1], Math.max(0.6, sz * 1.5), 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawMeteors() {
    const { ctx } = this;
    ctx.lineCap = "round";
    for (const m of this.meteors) {
      const a = Math.sin((m.life / m.max) * Math.PI);
      const sp = Math.hypot(m.vx, m.vy);
      const tx = m.x - (m.vx / sp) * 150;
      const ty = m.y - (m.vy / sp) * 150;
      const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
      g.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`);
      g.addColorStop(0.3, `rgba(125,211,252,${(a * 0.5).toFixed(3)})`);
      g.addColorStop(1, "rgba(125,211,252,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 1.8, 0, TAU);
      ctx.fill();
    }
  }

  private drawBolts() {
    const { ctx } = this;
    for (const b of this.bolts) {
      const k = b.life / b.max;
      const flicker = k < 0.2 ? 1 : Math.sin(b.life * 70) > 0.1 ? 1 : 0.3;
      const alpha = (1 - k) * flicker;
      ctx.save();
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(125,211,252,0.95)";
      ctx.lineJoin = "round";
      ctx.strokeStyle = `rgba(225,242,255,${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.7;
      this.stroke(b.pts);
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = `rgba(190,215,255,${(alpha * 0.6).toFixed(3)})`;
      for (const br of b.branches) this.stroke(br);
      ctx.restore();
    }
  }

  private stroke(pts: P2[]) {
    const { ctx } = this;
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.stroke();
  }

  private drawWaves() {
    const { ctx } = this;
    for (const wv of this.waves) {
      const k = wv.t / 1.2;
      const r = wv.t * 320;
      const a = (1 - k) * 0.5;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(125,211,252,${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(wv.x, wv.y, r, r * 0.42, 0, 0, TAU);
      ctx.stroke();
      ctx.strokeStyle = `rgba(179,125,255,${(a * 0.7).toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(wv.x, wv.y, r * 0.68, r * 0.68 * 0.42, 0, 0, TAU);
      ctx.stroke();
    }
  }

  private drawPointer() {
    const { ctx } = this;
    const act = clamp(1 - this.pointerAge / 2.5, 0, 1);
    if (act < 0.02) return;
    const g = ctx.createRadialGradient(this.mx, this.my, 0, this.mx, this.my, 120);
    g.addColorStop(0, `rgba(141,124,255,${(0.16 * act).toFixed(3)})`);
    g.addColorStop(1, "rgba(141,124,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.mx, this.my, 120, 0, TAU);
    ctx.fill();

    const n = this.trail.length;
    this.trail.forEach((p, i) => {
      const f = (i + 1) / n;
      ctx.fillStyle = `rgba(125,211,252,${(f * 0.2 * act).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 1.5 + f * 4, 0, TAU);
      ctx.fill();
    });
  }
}
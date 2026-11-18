/* The landing's entrance. A flock of the scene's birds flies in, settles into "James M. Smith", catches the light,
   and leaves as the real type takes over. Five flights; each scene picks one, so a shared scene replays the same one.
   Repeat visits get a quick dither (the scene's own 4x4 Bayer pattern) instead. Everything moves in whole scene pixels. */

export type FlightId = 'drift' | 'swirl' | 'formation' | 'rise' | 'converge';
export type IntroMode = 'birds' | 'dither' | 'none';

type Bird = { tx: number; ty: number; u: number; ox: number; oy: number; d: number; ph: number; sp: number; slot: number; sx: number; sy: number };
type Ctx = { cx: number; cy: number; minX: number; maxX: number; span: number; W: number; H: number };
type Flight = {
  plateAt: number; nameAt: number;
  init?: (b: Bird, C: Ctx) => void;
  flock: (e: number, b: Bird, C: Ctx) => [number, number]; // where the bird is before it settles
  settleAt: (b: Bird) => number; settleDur: number;
  leaveAt: (b: Bird) => number;
  leave: ((L: number, b: Bird, C: Ctx) => [number, number]) | null; // null: dissolve into the type
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (u: number) => u * u * (3 - 2 * u);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const gauss = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(6.2832 * Math.random());
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const on = (x: number, y: number, level: number) => BAYER[(x & 3) + (y & 3) * 4] < level;

export const FLIGHTS: Record<FlightId, Flight> = {
  // rides a long curve in from the left, settles, lifts off up and to the right
  drift: {
    plateAt: 0.9, nameAt: 2.15,
    flock(e, b, C) {
      const u = smooth(clamp(e / 1.25, 0, 1)), sx = -14, sy = Math.max(4, C.cy - C.H * 0.22), kx = C.cx * 0.45, ky = Math.max(2, sy - 14);
      const x = (1 - u) * (1 - u) * sx + 2 * u * (1 - u) * kx + u * u * C.cx, y = (1 - u) * (1 - u) * sy + 2 * u * (1 - u) * ky + u * u * (C.cy - 4);
      const spread = lerp(20, 9, u);
      return [x + b.ox * spread * (1 + 0.25 * Math.sin(e * 2.6 + b.ph)) + Math.sin(e * 4 + b.ph) * 1.6, y + b.oy * spread * 0.55 + Math.cos(e * 3.3 + b.ph) * 1.2];
    },
    settleAt: (b) => 0.85 + b.d * 0.3, settleDur: 0.7,
    leaveAt: (b) => 2.2 + b.d * 0.27,
    leave: (L, b) => [b.tx + L * 14 + L * L * (36 + b.ox * 10), b.ty - L * 5 - L * L * (26 + b.oy * 6) + Math.sin(L * 18 + b.ph) * 0.8],
  },
  // circles the name with density waves, falls into the letters left to right, dissolves into the type
  swirl: {
    plateAt: 0.7, nameAt: 2.2,
    flock(e, b, C) {
      const a = b.ph + e * 2.1, wave = 1 + 0.18 * Math.sin(a * 3 - e * 5);
      const ox = C.cx + Math.cos(a) * (C.span / 2 + 6 + b.oy * 3) * wave, oy = C.cy - 2 + Math.sin(a) * (7 + Math.abs(b.ox) * 3) * wave;
      const k = smooth(clamp(e / 0.7, 0, 1));
      return [lerp(-12 + b.ox * 6, ox, k), lerp(C.cy - 18 + b.oy * 6, oy, k)];
    },
    settleAt: (b) => 1.15 + b.u * 0.55, settleDur: 0.45,
    leaveAt: (b) => 2.25 + b.u * 0.25,
    leave: null,
  },
  // a V flies across; each bird peels off into its letter as the V passes, then they re-form and fly on
  formation: {
    plateAt: 0.5, nameAt: 2.1,
    flock(e, b, C) {
      const ax = -20 + (e / 1.5) * (C.maxX + 20), ay = C.cy - 14 + Math.sin(e * 2) * 1.5;
      const side = b.slot % 2 ? 1 : -1, depth = Math.ceil(b.slot / 2);
      return [ax - depth * 2.2 + Math.sin(e * 6 + b.ph) * 0.4, ay + side * depth * 1.2];
    },
    settleAt: (b) => 0.25 + b.u * 1.25, settleDur: 0.4,
    leaveAt: (b) => 2.15 + b.u * 0.35,
    leave: (L, b) => [b.tx + L * 22 + L * L * 70, b.ty - L * 8 - L * L * 14 + Math.sin(L * 16 + b.ph) * 0.6],
  },
  // startles up out of the landscape in a spiraling column, settles, dives back into the trees
  rise: {
    plateAt: 0.9, nameAt: 2.2,
    flock(e, b, C) {
      const k = smooth(clamp(e / 1.3, 0, 1)), a = b.ph + e * 4.5, r = lerp(16, 8, k) * (0.5 + Math.abs(b.ox) * 0.5);
      return [C.cx + Math.sin(e * 1.7) * 6 + Math.cos(a) * r * 1.6 + b.ox * 4, lerp(C.H + 6 + Math.abs(b.oy) * 10, C.cy - 6, k) + Math.sin(a) * r * 0.5];
    },
    settleAt: (b) => 0.95 + b.d * 0.35, settleDur: 0.6,
    leaveAt: (b) => 2.25 + b.d * 0.3,
    leave: (L, b) => [b.tx + Math.sin(L * 3 + b.ph) * 4 + b.ox * L * 10, b.ty + L * L * 55 + L * 6],
  },
  // streams in from every direction, meets in the name, bursts outward
  converge: {
    plateAt: 0.8, nameAt: 2.2,
    init(b, C) { const a = Math.random() * 6.283, R = Math.hypot(C.W, C.H) * 0.6; b.sx = C.cx + Math.cos(a) * R; b.sy = C.cy + Math.sin(a) * R * 0.7; },
    flock: (e, b) => [b.sx + Math.sin(e * 3 + b.ph) * 3, b.sy + Math.cos(e * 2.7 + b.ph) * 3],
    settleAt: (b) => 0.1 + b.d * 0.6, settleDur: 1.1,
    leaveAt: (b) => 2.3 + b.d * 0.15,
    leave(L, b, C) {
      const dx = b.tx - C.cx, dy = b.ty - C.cy, n = Math.hypot(dx, dy) || 1;
      return [b.tx + (dx / n) * L * L * 90 + dx * L * 0.5, b.ty + (dy / n) * L * L * 90 - L * 10];
    },
  },
};
export const FLIGHT_IDS = Object.keys(FLIGHTS) as FlightId[];
export const flightFor = (seed: number): FlightId => FLIGHT_IDS[seed % FLIGHT_IDS.length];

type RGB = [number, number, number];
const unpack = (v: number): RGB => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255];
const pack = (c: RGB) => ((255 << 24) | (c[2] << 16) | (c[1] << 8) | c[0]) >>> 0;
const lum = (c: RGB) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
const mix = (a: RGB, b: RGB, k: number): RGB => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * k)) as RGB;
const INK: RGB = [246, 236, 223];

export type IntroParts = { plate: HTMLElement; name: HTMLElement; role: HTMLElement; ask: HTMLElement; cmd: HTMLElement; links: HTMLElement };

/** Runs the entrance. Returns a function that skips straight to the end (scroll, resize, unmount). */
export function playIntro(o: { fx: HTMLCanvasElement; buf: Uint32Array; W: number; H: number; parts: IntroParts; mode: IntroMode; flight: FlightId }): () => void {
  const { fx, buf, W, H, parts, mode } = o;
  const shown = [parts.plate, parts.ask, parts.cmd, parts.links];
  const all = [...shown, parts.name, parts.role];
  const timers: ReturnType<typeof setTimeout>[] = [];
  let raf = 0, done = false;
  const later = (s: number, f: () => void) => timers.push(setTimeout(() => !done && f(), s * 1000));
  const show = (el: HTMLElement, ms = 160, delay = 0) =>
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, delay, easing: `steps(${Math.max(2, Math.round(ms / 40))}, end)`, fill: 'both' });

  const finish = () => {
    if (done) return; done = true;
    timers.forEach(clearTimeout); cancelAnimationFrame(raf);
    fx.getContext('2d')?.clearRect(0, 0, fx.width, fx.height);
    for (const el of all) {
      el.getAnimations().forEach((a) => a.finish());
      el.style.opacity = '1'; el.style.maskImage = el.style.webkitMaskImage = 'none';
    }
  };
  if (mode === 'none') { finish(); return finish; }

  /* quick version: each piece develops through the scene's dither, aligned to its pixel grid */
  if (mode === 'dither') {
    const cell = Math.max(1, Math.round(fx.getBoundingClientRect().width / W));
    const masks = Array.from({ length: 17 }, (_, level) => {
      const c = document.createElement('canvas'); c.width = c.height = 4 * cell; const g = c.getContext('2d')!;
      for (let i = 0; i < 16; i++) if (BAYER[i] < level) g.fillRect((i % 4) * cell, (i >> 2) * cell, cell, cell);
      return `url(${c.toDataURL()})`;
    });
    shown.forEach((el, n) => {
      const r = el.getBoundingClientRect(), tile = 4 * cell, start = [0, 0.22, 0.38, 0.54][n], dur = n ? 0.4 : 0.56;
      for (let l = 1; l <= 16; l++) later(start + (dur * l) / 16, () => {
        el.style.maskSize = el.style.webkitMaskSize = `${tile}px ${tile}px`;
        el.style.maskPosition = el.style.webkitMaskPosition = `${-(r.left % tile)}px ${-(r.top % tile)}px`;
        el.style.maskImage = el.style.webkitMaskImage = l === 16 ? 'none' : masks[l];
        el.style.opacity = '1';
      });
    });
    later(1.2, finish);
    return finish;
  }

  /* the flock */
  const F = FLIGHTS[o.flight];
  const fr = fx.getBoundingClientRect(), k = W / fr.width;
  // the pixels the name covers, rasterised at the scene's resolution
  const nr = parts.name.getBoundingClientRect(), cs = getComputedStyle(parts.name);
  const off = document.createElement('canvas'); off.width = W; off.height = H;
  const g = off.getContext('2d', { willReadFrequently: true })!;
  g.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`;
  if ('letterSpacing' in g) (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = (parseFloat(cs.letterSpacing) || 0) * k + 'px';
  const text = parts.name.textContent ?? '', m = g.measureText(text);
  const x0 = (nr.left - fr.left) * k, y0 = (nr.top - fr.top) * k, h = nr.height * k;
  g.fillText(text, x0, y0 + (h + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
  const d = g.getImageData(0, 0, W, H).data, T: [number, number][] = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 110) T.push([x, y]);
  if (!T.length) { finish(); return finish; }

  // bird colors come from this scene: its shadow by day, a pale version at night, ink once they land
  const s: RGB[] = []; for (let i = 0; i < buf.length; i += 5) s.push(unpack(buf[i]));
  s.sort((a, b) => lum(a) - lum(b));
  const sil = s[Math.floor(s.length * 0.05)], night = lum(s[s.length >> 1]) < 0.12;
  const from = night ? mix(sil, INK, 0.55) : mix(sil, [0, 0, 0], 0.2);

  let cx = 0, cy = 0, minX = Infinity, maxX = -Infinity;
  for (const p of T) { cx += p[0]; cy += p[1]; minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); }
  const C: Ctx = { cx: cx / T.length, cy: cy / T.length, minX, maxX, span: Math.max(1, maxX - minX), W, H };
  const birds: Bird[] = T.map((p, i) => ({ tx: p[0], ty: p[1], u: (p[0] - minX) / C.span, ox: gauss(), oy: gauss(), d: Math.random(), ph: Math.random() * 6.283, sp: 0.8 + Math.random() * 0.5, slot: ((i * 7) % 20) + 1, sx: 0, sy: 0 }));
  if (F.init) birds.forEach((b) => F.init!(b, C));

  fx.width = W; fx.height = H;
  const fctx = fx.getContext('2d')!, img = fctx.createImageData(W, H), px = new Uint32Array(img.data.buffer);
  const dot = (x: number, y: number, c: number) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H) px[y * W + x] = c; };
  const t0 = performance.now();
  const tick = (now: number) => {
    if (done) return;
    const e = (now - t0) / 1000;
    px.fill(0);
    let alive = 0;
    for (const b of birds) {
      let [x, y] = F.flock(e, b, C);
      const st = smooth(clamp((e - F.settleAt(b)) / F.settleDur, 0, 1));
      x = lerp(x, b.tx, st); y = lerp(y, b.ty, st);
      const L = e - F.leaveAt(b);
      let light = st, level = 16, flying = st < 1;
      if (L > 0) {
        if (F.leave) { [x, y] = F.leave(L * b.sp, b, C); light = clamp(1 - L * 1.5, 0.25, 1); flying = true; }
        else level = Math.round(clamp(1 - L / 0.35, 0, 1) * 16);
      }
      if (x < -3 || x > W + 3 || y < -3 || y > H + 12 || level === 0) continue;
      alive++;
      if (!on(Math.round(x), Math.round(y), level)) continue;
      const c = pack(mix(from, INK, light));
      dot(x, y, c);
      if (flying && ((now / 85 + b.ph * 2) | 0) % 2) { dot(x - 1, y - 1, c); dot(x + 1, y - 1, c); } // wingbeat
    }
    fctx.putImageData(img, 0, 0);
    if (e < 2.4 || alive > 0) raf = requestAnimationFrame(tick);
    else finish();
  };
  parts.name.style.opacity = '0'; parts.role.style.opacity = '0';
  raf = requestAnimationFrame(tick);
  later(F.plateAt, () => show(parts.plate, 200));
  later(F.nameAt, () => { show(parts.name, 200); show(parts.role, 160, 160); });
  later(F.nameAt + 0.26, () => { show(parts.ask, 160); show(parts.cmd, 160, 150); show(parts.links, 160, 300); });
  later(F.nameAt + 0.9, () => shown.forEach((el) => (el.style.opacity = '1')));
  return finish;
}

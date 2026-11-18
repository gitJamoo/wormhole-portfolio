// Generated pixel landscapes. No DOM; also runs in Node.
import { PixelJames } from './james.js';
/* Pixel nature scene generator.
 * generate(seed, W, H) -> scene geometry (built once)
 * render(scene, out:Uint32Array, t:seconds, phase:0..1) -> paints one frame
 * No DOM; runs in browsers and Node. */
const TAU = Math.PI * 2;
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = t => (t = clamp(t), t * t * (3 - 2 * t));
function rng(a) { a |= 0; return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hash(x, y, s) { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
function noise1(s) { return x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f), a = hash(i, 7, s), b = hash(i + 1, 7, s); return (a + (b - a) * u) * 2 - 1; }; }
function fbm(n, x, o) { let s = 0, a = 1, t = 0; for (let k = 0; k < o; k++) { s += a * n(x); t += a; x = x * 2.07 + 31.7; a *= 0.5; } return s / t; }
function noise2(x, y, s) { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; }

/* ---------- color ---------- */
const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const tint = (a, b) => [a[0] * b[0] / 255, a[1] * b[1] / 255, a[2] * b[2] / 255];
const c8 = v => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v));
const pack = c => ((255 << 24) | (c8(c[2]) << 16) | (c8(c[1]) << 8) | c8(c[0])) >>> 0;
const unpack = p => [p & 255, (p >>> 8) & 255, (p >>> 16) & 255];
function hshift(c, dh, ds) {
  let r = c[0] / 255, g = c[1] / 255, b = c[2] / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; }
  h = (((h + dh / 360) % 1) + 1) % 1; s = clamp(s * ds);
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = t => { t = ((t % 1) + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 0.5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}
const WHITE = [255, 255, 255];
const BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);

/* ---------- art direction: sky by sun elevation ----------
 * e: sun elevation (-1..1). tw: how much a mood's hue shift applies (twilight = fully). */
const SKY = [
  { e: -1.0, top: '#0a1026', hor: '#25305c', sun: '#c8d4ff', amb: '#121935', light: 0.1, glow: 0.0, tw: 0.1 },
  { e: -0.3, top: '#121a3e', hor: '#333c70', sun: '#c8d4ff', amb: '#151b3a', light: 0.12, glow: 0.05, tw: 0.15 },
  { e: -0.13, top: '#2a2b66', hor: '#a0607e', sun: '#ff8f6b', amb: '#2b2445', light: 0.2, glow: 0.45, tw: 0.45 },
  { e: -0.03, top: '#5c4a8c', hor: '#f4906b', sun: '#ffac6e', amb: '#3a2c4c', light: 0.32, glow: 0.85, tw: 1 },
  { e: 0.1, top: '#df8f7f', hor: '#f9cf92', sun: '#ffe2a2', amb: '#4a3a52', light: 0.48, glow: 1.0, tw: 1 },
  { e: 0.24, top: '#e9b69a', hor: '#f8e2b8', sun: '#fff0c4', amb: '#4f4a5c', light: 0.64, glow: 0.8, tw: 0.35 },
  { e: 0.45, top: '#86b4d8', hor: '#f0e0c4', sun: '#fff4d6', amb: '#4d586c', light: 0.84, glow: 0.5, tw: 0.15 },
  { e: 1.0, top: '#4b8ed2', hor: '#c2e1f2', sun: '#fffbe6', amb: '#56677a', light: 1.0, glow: 0.35, tw: 0.05 },
];
/* Moods shift twilight hues within hand-checked ranges. */
const MOODS = [
  { n: 'Ember', ht: 0, hh: 0, s: 1.0, atm: 1 },
  { n: 'Rose', ht: -16, hh: -10, s: 1.05, atm: 1 },
  { n: 'Lilac', ht: -42, hh: -24, s: 0.92, atm: 1.05 },
  { n: 'Honey', ht: 14, hh: 8, s: 1.12, atm: 0.95 },
  { n: 'Gilded', ht: 26, hh: 12, s: 1.2, atm: 0.9 },
  { n: 'Cobalt', ht: -75, hh: -18, s: 0.95, atm: 1 },
  { n: 'Teal', ht: 178, hh: -6, s: 0.62, atm: 1 },
  { n: 'Frost', ht: -62, hh: -40, s: 0.62, atm: 1.1 },
  { n: 'Smoke', ht: -8, hh: -4, s: 0.45, atm: 1.15 },
  { n: 'Coral', ht: -6, hh: -14, s: 1.18, atm: 0.95 },
];
/* Biomes. land/far: near & far ground; style(t): ridge profile for depth t (0 far .. 1 near). */
const BIOMES = {
  lake: { nouns: ['Lake', 'Tarn', 'Loch', 'Mere'], water: 1, ridges: [3, 5], amp: 1, land: '#3d5a45', far: '#5d6b80', fgc: '#4b5532', tree: 'pine', treeCol: '#26392f', treeMin: 0.3, treeDens: 0.55, treeH: [4, 11], fgTree: 'pine', fog: 0.6, aurora: 0.35, flies: 0.6, atm: 0.85, style: t => (t < 0.5 ? 'peak' : 'round') },
  alpine: { nouns: ['Peaks', 'Ridge', 'Summit', 'Pass'], water: 0.55, ridges: [3, 5], amp: 1.35, land: '#47604a', far: '#6a7488', fgc: '#4f5e3a', tree: 'pine', treeCol: '#2a3f33', treeMin: 0.5, treeDens: 0.5, treeH: [4, 10], fgTree: 'pine', snow: 1, fog: 0.5, aurora: 0.4, atm: 0.8, style: t => (t < 0.7 ? 'peak' : 'round') },
  coast: { nouns: ['Cove', 'Headland', 'Shore', 'Bay'], water: 1, ridges: [1, 3], amp: 0.7, land: '#566b48', far: '#64708a', fgc: '#5c6a3e', tree: 'pine', treeCol: '#2c4033', treeMin: 0.6, treeDens: 0.35, treeH: [3, 8], fgTree: 'pine', fg: 'cliff', lighthouse: 0.55, fog: 0.4, aurora: 0.2, atm: 0.9, ocean: 1, style: t => (t < 0.4 ? 'peak' : 'round') },
  meadow: { nouns: ['Meadow', 'Vale', 'Downs', 'Glen'], water: 0.35, ridges: [3, 5], amp: 0.75, land: '#6b9447', far: '#6f7f8f', fgc: '#5d8a3c', tree: 'round', treeCol: '#3d6a36', treeMin: 0.4, treeDens: 0.4, treeH: [4, 10], fgTree: 'round', flowers: 1, fog: 0.45, flies: 0.8, atm: 0.85, style: t => (t < 0.35 ? 'peak' : 'round') },
  desert: { nouns: ['Mesa', 'Dunes', 'Canyon', 'Butte'], water: 0, ridges: [3, 5], amp: 1, land: '#c98a52', far: '#b0756a', fgc: '#b8743f', tree: 'cactus', treeCol: '#4f6b3a', treeMin: 0.65, treeDens: 0.22, treeH: [4, 9], fgTree: 'cactus', bands: 1, fog: 0, atm: 0.75, style: t => (t < 0.7 ? 'mesa' : 'dune') },
  tundra: { nouns: ['Tundra', 'Pines', 'Hollow', 'Drift'], water: 0.5, ridges: [3, 5], amp: 0.9, land: '#dfe7ee', far: '#8e9ab0', fgc: '#e3eaf0', tree: 'pine', treeCol: '#2a3b37', treeMin: 0.3, treeDens: 0.6, treeH: [4, 11], fgTree: 'pine', snow: 1, snowy: 1, snowfall: 0.6, fog: 0.5, aurora: 0.55, atm: 0.9, style: t => (t < 0.45 ? 'peak' : 'round') },
};
const BIOME_W = [['lake', 3], ['alpine', 2.5], ['coast', 2], ['meadow', 2], ['desert', 1.6], ['tundra', 1.6]];
const FG = 14;
// kinds
const K_GROUND = 0, K_TREE = 1, K_SNOW = 2, K_GRASS = 3, K_TSNOW = 4, K_TRUNK = 5, K_ROCK = 6, K_WHITE = 7, K_RED = 8, K_BAND = 9, K_FLA = 10, K_FLB = 11, NK = 12;

/* ---------- generation ---------- */
function generate(seed, W, H) {
  let s = null;
  for (let a = 0; a < 10; a++) { s = build(seed, a, W, H); if (score(s)) return s; }
  return s;
}
function score(S) {
  const { W, H, L, hz } = S; let sky = 0, fg = 0, busy = 0;
  const top = Math.floor(H * 0.12);
  for (let i = 0; i < W * H; i++) { const y = (i / W) | 0; const l = L[i]; if (y < hz && l === 0) sky++; if (l === FG) fg++; if (y < top && l) busy++; }
  const sf = sky / (W * hz);
  return sf > 0.3 && sf < 0.85 && fg / (W * H) < 0.3 && busy / (W * top) < 0.05;
}

function build(seed, attempt, W, H) {
  const r = rng((seed + 1) * 9973 + attempt * 7919);
  const R = (a, b) => a + (b - a) * r(), RI = (a, b) => Math.floor(R(a, b + 1)), chance = p => r() < p;
  const pickW = list => { let s = 0; for (const [, w] of list) s += w; let x = r() * s; for (const [k, w] of list) { if ((x -= w) < 0) return k; } return list[0][0]; };
  const bk = pickW(BIOME_W), B = BIOMES[bk];
  const mood = MOODS[Math.floor(r() * MOODS.length)];
  const water = chance(B.water);
  const N = W * H;
  const S = { seed, W, H, biome: bk, B, mood, water, L: new Uint8Array(N), K: new Uint8Array(N), F: new Uint8Array(N), D: new Uint8Array(N), lay: [] };
  const unit = Math.min(W, H) / 160; // feature scale relative to a ~160px short side
  const wy = water ? Math.round(H * R(0.56, 0.68)) : H;
  const ground = water ? wy : Math.round(H * R(0.68, 0.78));
  S.wy = wy; S.hz = water ? wy : ground;
  const { L, K, F, D } = S;
  const set = (x, y, l, k, f, lim, d) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x >= W || y < 0 || y >= (lim || H)) return; const i = y * W + x; L[i] = l; K[i] = k; F[i] = f; D[i] = d || 0; };
  const bay = (x, y) => BAY[((y & 3) << 2) | (x & 3)];
  const tex = (x, y, s) => (noise2(x / (5 * unit), y / (2.5 * unit), s) > 0.64 ? 1 : 0);
  const texSeed = RI(1, 1e9);

  /* ridges, far -> near */
  const n = RI(B.ridges[0], B.ridges[1]);
  const bottom = water ? wy : H;
  let nearTop = null;
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 1 : i / (n - 1);
    const style = B.style(t);
    const nz = noise1(RI(1, 1e9)), ox = R(0, 5000);
    const yb = lerp(ground - H * R(0.13, 0.22), ground - H * R(0.0, 0.04), t);
    const amp = H * lerp(R(0.17, 0.3), R(0.05, 0.1), t) * B.amp;
    const fq = lerp(R(0.007, 0.012), R(0.016, 0.028), t) / unit * (style === 'dune' ? 0.45 : 1);
    const envN = water && t > 0.2 && chance(0.75) ? noise1(RI(1, 1e9)) : null, envOff = R(-0.25, 0.45);
    const top = new Float32Array(W);
    for (let x = 0; x < W; x++) {
      const X = (x + ox) * fq; let v;
      if (style === 'peak') { let s = 0, a = 1, tt = 0, f = 1; for (let k = 0; k < 5; k++) { const q = 1 - Math.abs(nz(X * f + k * 13.1)); s += a * q * q; tt += a; a *= 0.47; f *= 2.13; } v = clamp((s / tt - 0.28) / 0.55); }
      else if (style === 'mesa') { const v0 = (fbm(nz, X, 3) + 1) / 2; v = v0 > 0.56 ? 0.82 + 0.04 * nz(X * 9) : v0 > 0.52 ? lerp(0.32, 0.82, (v0 - 0.52) / 0.04) : v0 * 0.6; }
      else if (style === 'dune') { const ph = X * 1.2 + fbm(nz, X * 0.7, 2) * 1.2; const s = ph - Math.floor(ph); v = (s < 0.75 ? Math.pow(sstep(s / 0.75), 1.4) : 1 - sstep((s - 0.75) / 0.25)) * 0.45 + 0.45 * (fbm(nz, X * 0.35, 2) + 1) / 2; }
      else v = (fbm(nz, X, 3) + 1) / 2;
      let y = yb - amp * v;
      if (envN) { const e = sstep((envN(x * 0.012 / unit) + envOff) * 2.2); y = lerp(wy + 2, y, e); }
      top[x] = Math.max(y, H * 0.13);
    }
    const lid = i + 1;
    S.lay[lid] = { t, d: 1 - t, base: mix(hex(B.far), hex(B.land), Math.pow(t, 0.8)) };
    const snowLine = B.snow ? R(0.42, 0.62) : 2;
    for (let x = 0; x < W; x++) {
      const ty = Math.ceil(top[x]);
      const pk = (yb - top[x]) / amp;
      const jag = nz(x * 0.4) * 1.5;
      for (let y = ty; y < bottom; y++) {
        const idx = y * W + x, d = y - top[x];
        let f = 0, k = K_GROUND;
        if (style === 'peak' && d < amp * 0.6) { const xs = clamp(Math.round(x - d * 0.55 + nz(y * 0.21) * 2.5), 1, W - 2); const hp = (top[xs - 1] - top[xs + 1]) / 2; f = hp > 0.35 ? 1 : hp < -0.35 ? 2 : 0; }
        if (B.snow && t < 0.75 && pk > snowLine && d < (pk - snowLine) * amp * 0.7 + jag) k = K_SNOW;
        if (B.snowy && t >= 0.45) k = K_SNOW;
        if (B.bands && style === 'mesa' && Math.floor((y + nz(x * 0.05) * 2) / 2) % 4 === 0) k = K_BAND;
        if (!B.snowy && t > 0.6 && d < 1 && bk !== 'desert') k = K_GRASS;
        let dd = 0;
        if (t > 0.5) { dd = tex(x, y, texSeed + i); if (!water && t === 1) { const v = (y - (H * 0.78)) / (H * 0.22); const q = Math.floor(clamp(v) * 2.2 + bay(x, y)); if (q > 0) dd = Math.min(2, q + dd); } }
        if (k === K_SNOW && dd) dd = hash(x, y, seed) > 0.5 ? 3 : 0;
        L[idx] = lid; K[idx] = k; F[idx] = f; D[idx] = dd;
      }
    }
    /* trees on this ridge */
    if (B.tree && t >= B.treeMin) {
      const tn = noise1(RI(1, 1e9)), dens = B.treeDens * R(0.6, 1.3);
      for (let x = -3; x < W + 3;) {
        const dv = (tn(x * 0.03 / unit) + 1) / 2;
        if (dv < 1 - dens) { x += RI(2, 5); continue; }
        const h = Math.max(3, Math.round(lerp(B.treeH[0], B.treeH[1], t) * R(0.7, 1.25) * unit));
        const by = Math.round(top[clamp(Math.round(x), 0, W - 1)]) + RI(1, 2);
        if (by < bottom) drawTree(B.tree, x, by, h, lid, bottom);
        x += Math.max(1, Math.round(h * R(B.tree === 'pine' ? 0.22 : 0.5, B.tree === 'pine' ? 0.55 : 1.4)));
      }
    }
    if (B.flowers && t === 1) {
      for (let k = 0; k < W * 0.6; k++) { const x = RI(0, W - 1); const y = Math.round(top[x]) + RI(2, Math.max(3, Math.round((bottom - top[x]) * 0.8))); if (y < bottom && L[y * W + x] === lid && K[y * W + x] === K_GROUND) K[y * W + x] = chance(0.5) ? K_FLA : K_FLB; }
    }
    nearTop = top;
  }

  function drawTree(kind, x, by, h, lid, lim, big) {
    if (kind === 'pine') {
      const mhw = Math.max(1, Math.round(h * R(0.17, 0.25))), ph = RI(0, 2);
      for (let row = 0; row < h; row++) {
        const y = by - h + row, p = (row + 1) / h;
        let hw = Math.round(p * mhw);
        if ((row + ph) % 3 === 0 && row > 1 && h > 7) hw = Math.max(0, hw - 1);
        if (h <= 7 && row > 0) hw = Math.max(hw, 1);
        let hl = hw, hr = hw;
        if (big && row > 2) { hl += RI(-1, 1); hr += RI(-1, 1); }
        for (let dx = -hl; dx <= hr; dx++) {
          const k = B.snowy && h > 7 && (row + ph) % 3 === 1 && dx !== 0 && chance(0.7) ? K_TSNOW : K_TREE;
          const sh = 0;
          set(x + dx, y, lid, k, dx < 0 ? 1 : dx > 0 ? 2 : 0, lim, sh);
        }
      }
      if (h >= 8) for (let y = by; y < by + 2; y++) set(x, y, lid, K_TRUNK, 0, lim);
    } else if (kind === 'round') {
      const rr = Math.max(2, Math.round(h * 0.4)), cy = by - h + rr;
      for (let y = cy + rr - 1; y <= by; y++) set(x, y, lid, K_TRUNK, 0, lim);
      if (big) set(x + 1, by, lid, K_TRUNK, 0, lim);
      for (let dy = -rr; dy <= rr; dy++) for (let dx = -rr - 1; dx <= rr + 1; dx++) {
        const e = (dx * dx) / ((rr + 0.6) * (rr + 0.6)) + (dy * dy) / (rr * rr);
        if (e <= 0.85 + 0.35 * hash(x + dx, cy + dy, seed)) {
          const cl = noise2((x + dx) / 2.2, (cy + dy) / 2.2, seed + 5);
          const u = (dx + dy) / rr;
          const sh = big ? (u > 0.7 + cl * 0.4 ? 2 : u > 0.1 + cl * 0.5 ? 1 : u < -0.6 + cl * 0.3 && cl > 0.45 ? 3 : 0) : 0;
          set(x + dx, cy + dy, lid, K_TREE, big ? 0 : dx < 0 ? 1 : 2, lim, sh);
        }
      }
    } else if (kind === 'cactus') {
      const w = big ? 1 : 0;
      for (let y = by - h; y <= by; y++) for (let dx = -w; dx <= w; dx++) set(x + dx, y, lid, K_TREE, dx < 0 ? 1 : 2, lim);
      const arm = (dir, at, len, up) => { const ay = by - Math.round(h * at); for (let k = 1; k <= len; k++) set(x + dir * (w + k), ay, lid, K_TREE, dir < 0 ? 1 : 2, lim); for (let k = 1; k <= up; k++) set(x + dir * (w + len), ay - k, lid, K_TREE, dir < 0 ? 1 : 2, lim); };
      if (h > 4) { arm(-1, R(0.35, 0.55), 1 + w, Math.round(h * 0.3)); if (chance(0.7)) arm(1, R(0.45, 0.65), 1 + w, Math.round(h * 0.25)); }
    }
  }

  /* foreground */
  S.lay[FG] = { t: 1, d: -0.15, base: hex(B.fgc) };
  S.lamp = null;
  if (water) {
    const cliff = B.fg === 'cliff';
    const side = chance(0.5) ? 0 : 1;
    const bw = W * R(0.3, 0.55) * (cliff ? 0.85 : 1) * (W > H ? 1 : 1.25);
    const peak = wy - H * R(0.02, 0.1) * (cliff ? 2.6 : 1);
    const fn = noise1(RI(1, 1e9));
    const ftop = new Float32Array(W);
    for (let x = 0; x < W; x++) {
      const xn = (side ? W - 1 - x : x) / bw; let y;
      if (cliff) y = xn < 0.78 ? peak + fn(x * 0.12) * 2 + xn * xn * 9 * unit : lerp(peak + 5 * unit, H + 6, Math.pow(clamp((xn - 0.78) / 0.16), 0.7));
      else { y = lerp(peak, wy + (H - wy) * 0.45, sstep(xn)) + fn(x * 0.08 / unit) * 2.5 * unit; if (xn > 1) y = lerp(wy + (H - wy) * 0.45, H + 6, clamp((xn - 1) / 0.5)); }
      ftop[x] = y;
      S.ftop = ftop;
      for (let yy = Math.ceil(y); yy < H; yy++) {
        const d = yy - y;
        let k = K_GROUND, dd = tex(x, yy, texSeed + 99);
        if (cliff && d >= 2 + fn(x * 0.5) * 1.5) { k = K_ROCK; const rn = noise2(x / 4, yy / 9, texSeed); dd = rn > 0.68 ? 2 : rn < 0.3 ? 3 : noise2(x / 2, yy / 2, texSeed + 3) > 0.7 ? 1 : 0; }
        else if (d < 1 || (d < 2 && hash(x, yy, seed) > 0.6)) k = K_GRASS;
        if (B.snowy) { k = K_SNOW; dd = dd === 1 ? 3 : dd > 1 ? 1 : 0; }
        const v = (yy - (wy + (H - wy) * 0.3)) / (H * 0.4); const q = Math.floor(clamp(v) * 2.2 + bay(x, yy)); if (q > 0 && k !== K_ROCK) dd = Math.min(2, dd + q);
        set(x, yy, FG, k, cliff ? (side ? 2 : 1) : 0, H, dd);
      }
    }
    for (let x = 0; x < W; x++) if (hash(x, 5, seed) > 0.55) { const y = Math.ceil(ftop[x]) - 1; if (y > 0 && y < H && !L[y * W + x]) set(x, y, FG, K_GRASS, 0); if (hash(x, 6, seed) > 0.8 && y > 1 && !L[(y - 1) * W + x]) set(x, y - 1, FG, K_GRASS, 0); }
    // shore rocks
    for (let k = 0; k < RI(2, 5); k++) {
      let sx = -1; for (let x = 0; x < W; x++) { const xx = side ? W - 1 - x : x; if (ftop[xx] > wy + (H - wy) * R(0.1, 0.5)) { sx = xx; break; } }
      if (sx < 0) break;
      const rx = Math.round(R(1, 3.5) * unit) + 1, ry = Math.max(1, Math.round(rx * 0.55)), cx = sx + (side ? -1 : 1) * RI(0, 6), cy = Math.round(ftop[clamp(sx, 0, W - 1)]) + RI(-1, 2);
      for (let dy = -ry; dy <= 0; dy++) for (let dx = -rx; dx <= rx; dx++) if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1) set(cx + dx, cy + dy, FG, K_ROCK, dx < 0 || dy === -ry ? 1 : 2);
    }
    // foreground trees
    const nt = cliff ? RI(0, 2) : RI(2, 6);
    for (let k = 0; k < nt; k++) {
      const xn = R(0.04, 0.72); const x = Math.round(side ? W - 1 - xn * bw : xn * bw);
      if (x < 0 || x >= W) continue;
      const h = Math.round(H * R(0.2, 0.5) * (1 - xn * 0.4));
      drawTree(B.fgTree, x, Math.round(ftop[x]) + 2, h, FG, H, true);
    }
    if (cliff && chance(B.lighthouse)) {
      const x = Math.round(side ? W - 1 - bw * R(0.25, 0.5) : bw * R(0.25, 0.5)), by = Math.round(ftop[x]) + 1, h = Math.round(R(10, 14) * unit);
      for (let row = 0; row < h; row++) { const y = by - row, w = row < h * 0.5 ? 2 : 1; for (let dx = -w; dx <= w; dx++) set(x + dx, y, FG, Math.floor(row / 3) % 2 ? K_RED : K_WHITE, dx < 0 ? 1 : 2); }
      for (let dx = -2; dx <= 2; dx++) set(x + dx, by - h - 2, FG, K_RED, 0);
      set(x, by - h - 3, FG, K_RED, 0);
      S.lamp = { x, y: by - h - 1 };
      set(x - 1, by - h - 1, FG, K_RED, 0); set(x + 1, by - h - 1, FG, K_RED, 0);
    }
  } else if (chance(0.7)) {
    // a few big near trees growing out of the nearest hill on one side
    const side = chance(0.5) ? 0 : 1, nt = B.fgTree === 'cactus' ? RI(1, 2) : RI(1, 4);
    for (let k = 0; k < nt; k++) {
      const x = Math.round(side ? W - 1 - R(0.02, 0.3) * W : R(0.02, 0.3) * W);
      const h = Math.round(H * R(0.18, 0.42) * (B.fgTree === 'cactus' ? 0.6 : 1));
      drawTree(B.fgTree, x, Math.round(nearTop[clamp(x, 0, W - 1)]) + RI(4, 10), h, FG, H, true);
    }
  }

  /* sky & atmosphere extras */
  S.sdir = chance(0.5) ? 1 : -1;
  S.arc = R(0.72, 0.92);
  S.sunR = Math.round(clamp(Math.min(W, H) * R(0.05, 0.08), 5, 16));
  S.atm = R(0.55, 0.8) * B.atm * mood.atm;
  S.clouds = pickW([['none', 1], ['streak', 1.5], ['puffy', 1.6]]);
  S.wind = R(0.6, 2.2) * (chance(0.5) ? 1 : -1);
  if (S.clouds === 'puffy') {
    const CW = W * 2, CH = Math.round(S.hz * 0.8), cs = RI(1, 1e9), cy = R(0.15, 0.45) * S.hz, th = R(0.1, 0.18) * H, sx = R(18, 30) * unit, sy = R(6, 9) * unit;
    const f = new Float32Array(CW * CH);
    const at = (x, y) => { let s = 0, a = 1, tt = 0, fx = x / sx, fy = y / sy; for (let k = 0; k < 4; k++) { s += a * noise2(fx, fy, cs + k); tt += a; fx *= 2; fy *= 2; a *= 0.5; } return s / tt; };
    for (let y = 0; y < CH; y++) { const v = 1 - ((y - cy) / th) ** 2; if (v <= 0) continue; for (let x = 0; x < CW; x++) f[y * CW + x] = ((CW - x) * at(x, y) + x * at(x - CW, y)) / CW * (0.55 + 0.45 * v) + (v - 1) * 0.15; }
    S.cf = f; S.CW = CW; S.CH = CH; S.cth = R(0.5, 0.56);
  }
  if (S.clouds === 'streak') {
    S.streaks = []; for (let k = 0; k < RI(5, 12); k++) { const y = Math.round(R(0.06, 0.6) * S.hz); S.streaks.push({ x: R(0, W), y, len: RI(6, 34) * unit, v: R(0.3, 1.4) }); if (chance(0.35)) S.streaks.push({ x: R(0, W), y: y + 1, len: RI(3, 12) * unit, v: R(0.3, 1.4) }); }
  }
  S.stars = []; for (let k = 0; k < (W * S.hz) / 70; k++) S.stars.push({ x: RI(0, W - 1), y: RI(0, Math.round(S.hz * 0.85)), b: R(0.25, 1), ph: R(0, TAU), sp: R(1, 4), big: chance(0.05) });
  S.fog = B.fog && chance(B.fog) ? { h: R(0.05, 0.11) * H, a: R(0.35, 0.6), s: RI(1, 1e9) } : null;
  S.snowfall = B.snowfall && chance(B.snowfall) ? Array.from({ length: Math.round((W * H) / 220) }, () => ({ x: R(0, W), y: R(0, H), v: R(6, 16) * unit, ph: R(0, TAU), big: chance(0.08) })) : null;
  S.aurora = B.aurora && chance(B.aurora) ? { s: RI(1, 1e9), hue: pickW([['#5effa8', 3], ['#59f0e0', 2], ['#c58bff', 1]]), y: R(0.1, 0.3) * S.hz } : null;
  S.flies = B.flies && chance(B.flies) ? Array.from({ length: RI(10, 22) }, () => ({ x: R(0, W), y: R(Math.min(S.hz, H) - H * 0.12, H - 2), ph: R(0, TAU), sp: R(0.5, 1.5) })) : null;
  S.birds = !S.snowfall && chance(0.85) ? { period: R(14, 28), s: RI(1, 1e9) } : null;
  S.mtnBirds = null;
  /* start time-of-day: mostly golden/blue hour */
  const pz = pickW([['gold', 5], ['day', 2], ['blue', 1.5], ['night', 1.5]]);
  const eT = pz === 'gold' ? R(-0.02, 0.2) : pz === 'day' ? R(0.35, 0.95) : pz === 'blue' ? R(-0.16, -0.05) : R(-0.9, -0.35);
  const a0 = Math.asin(eT) / TAU; S.phase0 = ((chance(0.5) ? 0.25 + a0 : 0.75 - a0) + 1) % 1;
  /* precompute mood-shifted sky keys */
  S.sky = SKY.map(k => ({ e: k.e, top: hshift(hex(k.top), mood.ht * k.tw, lerp(1, mood.s, k.tw)), hor: hshift(hex(k.hor), mood.hh * k.tw, lerp(1, mood.s, k.tw)), sun: hex(k.sun), amb: hshift(hex(k.amb), mood.ht * 0.5 * k.tw, 1), light: k.light, glow: k.glow }));
  S.name = `${mood.n} ${B.nouns[seed % B.nouns.length]}`;
  S.pal = new Uint32Array(16 * NK * 3 * 4);
  placeMe(S, r);
  return S;
}

/* Where little James sits: flat foreground ground, clear of big trees and the lighthouse. */
function placeMe(S, r) {
  const { W, H, L, K, wy } = S;
  const busy = (x, feet) => { let n = 0; for (let y = feet - 15; y < feet; y++) for (let xx = x - 7; xx <= x + 7; xx++) { if (xx < 0 || xx >= W || y < 0) { n += 3; continue; } const i = y * W + xx; if (L[i] === FG && (K[i] === K_TREE || K[i] === K_TRUNK || K[i] === K_WHITE || K[i] === K_RED)) n++; } return n; };
  const cands = [];
  for (let x = 8; x < W - 8; x++) {
    let feet;
    if (S.water) { if (!S.ftop) return; feet = Math.round(S.ftop[x]) + 1; if (feet < wy - 2 || feet > H - 12 || Math.abs(S.ftop[x - 4] - S.ftop[x + 4]) > 4) continue; }
    else { feet = Math.round(H - H * 0.13); if (!L[feet * W + x]) continue; }
    if (S.lamp && Math.abs(x - S.lamp.x) < 10) continue;
    let solid = true; for (let xx = x - 7; xx <= x + 7 && solid; xx++) for (const dy of [0, 2, 4]) { const yy = Math.min(H - 1, feet + dy); if (L[yy * W + xx] !== FG && S.water) { solid = false; break; } }
    if (!solid) continue;
    const b = busy(x, feet); if (b < 6) cands.push([x, feet, b]);
  }
  if (!cands.length) return;
  cands.sort((a, b) => a[2] - b[2]);
  const pool = cands.slice(0, Math.max(1, Math.ceil(cands.length * 0.4)));
  const [x, feet] = pool[Math.floor(r() * pool.length)];
  S.me = { x, feet, beanie: !!(S.B.snowy || S.snowfall) };
}

function skyAt(S, e) {
  const k = S.sky; let i = 0; while (i < k.length - 2 && e > k[i + 1].e) i++;
  const a = k[i], b = k[i + 1], t = sstep((e - a.e) / (b.e - a.e));
  return { top: mix(a.top, b.top, t), hor: mix(a.hor, b.hor, t), sun: mix(a.sun, b.sun, t), amb: mix(a.amb, b.amb, t), light: lerp(a.light, b.light, t), glow: lerp(a.glow, b.glow, t) };
}
function timeWord(p) {
  p = ((p % 1) + 1) % 1;
  return p < 0.2 ? 'Night' : p < 0.25 ? 'Dawn' : p < 0.3 ? 'Sunrise' : p < 0.42 ? 'Morning' : p < 0.58 ? 'Midday' : p < 0.69 ? 'Afternoon' : p < 0.745 ? 'Golden Hour' : p < 0.8 ? 'Dusk' : 'Night';
}

/* ---------- render one frame ---------- */
function render(S, out, t, p, opts = {}) {
  const { W, H, wy, hz, L, K, F, D, B } = S;
  const th = TAU * (p - 0.25), se = Math.sin(th);
  const C = skyAt(S, se);
  const sx = W * (0.5 - 0.4 * Math.cos(th) * S.sdir), sy = hz - (hz - H * 0.1) * (se > 0 ? Math.pow(se, 0.6) : se * 1.5) * S.arc;
  const mth = th + Math.PI, me = Math.sin(mth);
  const mx = W * (0.5 - 0.4 * Math.cos(mth) * S.sdir), my = hz - (hz - H * 0.12) * (me > 0 ? Math.pow(me, 0.6) : me * 1.5) * S.arc * 0.9;
  const night = clamp((-se - 0.04) * 5);
  const sdx = -Math.cos(th) * S.sdir * clamp(se * 6 + 0.3);
  const sunTint = mix(WHITE, C.sun, 0.45);
  const fogc = mix(C.top, C.hor, 0.72);

  /* material palette for this frame */
  const pal = S.pal;
  const KB = [null, hex(B.treeCol), hex('#eef3f8'), null, hex('#eef3f8'), hex('#4a3426'), hex('#6c6670'), hex('#efe9df'), hex('#b8483c'), null, hex('#f0a0b8'), hex('#f3dd78')];
  for (let l = 1; l < 16; l++) {
    const lay = S.lay[l]; if (!lay) continue;
    const fogA = lay.d > 0 ? Math.pow(lay.d, 1.15) * S.atm : 0;
    for (let k = 0; k < NK; k++) {
      let base = KB[k];
      if (k === K_GROUND) base = lay.base; else if (k === K_GRASS) base = mul(lay.base, 1.18); else if (k === K_BAND) base = mul(lay.base, 0.82);
      if (k === K_TREE && lay.d > 0) base = mix(base, lay.base, 0.25);
      for (let f = 0; f < 3; f++) {
        const dot = f === 0 ? 0 : f === 1 ? -sdx : sdx;
        let c = mix(C.amb, tint(base, sunTint), C.light * (lay.d < 0 ? 0.82 : 1));
        c = mul(c, 1 + 0.2 * dot * C.light);
        if (dot > 0) c = mix(c, C.sun, 0.14 * dot * C.glow);
        if ((k === K_SNOW || k === K_TSNOW) && dot <= 0) c = mix(c, C.top, 0.28 + 0.1 * -dot);
        c = mix(c, fogc, fogA);
        const pi = ((l * NK + k) * 3 + f) * 4;
        for (let d = 0; d < 4; d++) pal[pi + d] = pack(d === 0 ? c : d === 3 ? mix(mul(c, 1.12), C.sun, 0.06 * C.light) : mix(mul(c, 1 - d * 0.13), C.amb, d * 0.06 * (1 - C.light)));
      }
    }
  }

  /* sky tables: band x glow level */
  const NB = 12, NG = 5;
  const glowSrc = se > -0.1 ? { x: sx, y: sy, c: C.sun, a: C.glow } : { x: mx, y: my, c: hex('#9fb0e0'), a: 0.25 * night * (me > 0 ? 1 : 0) };
  const sk = new Uint32Array((NB + 1) * NG);
  for (let b = 0; b <= NB; b++) { const c = mix(C.top, C.hor, b / NB); for (let g = 0; g < NG; g++) sk[b * NG + g] = pack(mix(c, glowSrc.c, (g / (NG - 1)) * 0.62)); }
  const GR = Math.max(W, H) * 0.42;
  const sunC = pack(mix(C.sun, WHITE, 0.15)), sunEdge = pack(mix(C.sun, C.hor, 0.35)), sr = S.sunR, sr2 = sr * sr, srE = (sr - 1) * (sr - 1);
  const moonC = pack(hex('#f2eedc')), moonD = pack(hex('#cfcab4')), mr = Math.max(3, Math.round(sr * 0.6));
  const mphase = 0.35 + 0.3 * Math.sin(S.seed);

  /* clouds */
  const cf = S.cf, CW = S.CW, CH = S.CH, cth = S.cth, coff = Math.floor(t * S.wind);
  const cLit = pack(mix(mix(C.hor, C.sun, 0.55), WHITE, C.light * 0.35));
  const cBody = pack(mix(mix(C.top, C.hor, 0.55), WHITE, C.light * 0.25 + 0.05));
  const cShade = pack(mix(mix(C.top, C.amb, 0.35), C.hor, 0.12));

  /* aurora per column */
  let au = null, auC = null;
  if (S.aurora && night > 0) {
    au = new Float32Array(W * 2); auC = hex(S.aurora.hue);
    for (let x = 0; x < W; x++) { const n = noise2(x * 0.03 + t * 0.05, t * 0.08, S.aurora.s); au[x * 2] = S.aurora.y + Math.sin(x * 0.045 + t * 0.25) * 6 + n * 10; au[x * 2 + 1] = clamp((noise2(x * 0.02 - t * 0.04, 3.3, S.aurora.s + 1) - 0.35) * 2.2) * night; }
  }

  const ytop = Math.min(hz, wy);
  /* pass 1: everything above the waterline */
  for (let y = 0; y < wy; y++) {
    const gpos = Math.pow(clamp(y / hz), 1.55) * NB;
    const row = y * W, by = (y & 3) << 2;
    for (let x = 0; x < W; x++) {
      const i = row + x, l = L[i];
      if (l) { out[i] = pal[((l * NK + K[i]) * 3 + F[i]) * 4 + D[i]]; continue; }
      const bay = BAY[by | (x & 3)];
      // clouds
      if (cf && y < CH) {
        const cx = ((x + coff) % CW + CW) % CW, d = cf[y * CW + cx];
        if (d > cth) {
          const up = y > 2 ? cf[(y - 2) * CW + cx] : 0, dn = y < CH - 1 ? cf[(y + 1) * CW + cx] : 0;
          out[i] = up < cth + 0.03 ? cLit : dn < cth + (bay - 0.5) * 0.04 ? cShade : cBody; continue;
        }
      }
      // sun & moon discs
      const dx = x - sx, dy = y - sy, d2 = dx * dx + dy * dy;
      if (d2 <= sr2) { out[i] = d2 >= srE ? sunEdge : sunC; continue; }
      if (me > -0.05) { const ex = x - mx, ey = y - my; if (ex * ex + ey * ey <= mr * mr) { const ox = ex + mr * mphase * 1.6; if (ox * ox + ey * ey > mr * mr) { out[i] = (hash(x, y, 9) > 0.8) ? moonD : moonC; continue; } } }
      // sky gradient + glow rings (ordered dither)
      let band = Math.floor(gpos + bay - 0.5); band = band < 0 ? 0 : band > NB ? NB : band;
      let g = 0;
      if (glowSrc.a > 0) { const gx = x - glowSrc.x, gy = (y - glowSrc.y) * 1.6; const dd = 1 - Math.sqrt(gx * gx + gy * gy) / GR; if (dd > 0) { g = Math.floor(dd * dd * glowSrc.a * (NG - 1) + bay); g = g > NG - 1 ? NG - 1 : g; } }
      let c = sk[band * NG + g];
      if (au) { const ay = au[x * 2], ai = au[x * 2 + 1]; const k = y - ay; if (ai > 0 && k > -28 && k < 3) { const v = (k > 0 ? 1 - k / 3 : Math.exp(k / 9)) * ai; const q = Math.floor(v * 3 + bay) / 3; if (q > 0) c = pack(mix(unpack(c), mix(auC, hex('#9a6bff'), clamp(-k / 28)), q * 0.55)); } }
      out[i] = c;
    }
  }
  /* streak clouds */
  if (S.streaks) {
    const sc = pack(mix(mix(C.hor, C.sun, 0.4), WHITE, 0.2 + C.light * 0.2)), sd = pack(mix(C.top, C.hor, 0.85));
    for (const s of S.streaks) { const x0 = Math.round(((s.x + t * s.v * S.wind) % (W + s.len * 2) + W + s.len * 2) % (W + s.len * 2) - s.len); for (let k = 0; k < s.len; k++) { const x = x0 + k; if (x < 0 || x >= W) continue; const i = s.y * W + x; if (!L[i]) out[i] = k === 0 || k === s.len - 1 ? sd : sc; } }
  }
  /* stars */
  if (night > 0) {
    for (const s of S.stars) {
      const i = s.y * W + s.x; if (L[i] || s.y >= ytop) continue;
      const a = night * s.b * (0.55 + 0.45 * Math.sin(t * s.sp + s.ph));
      if (a < 0.08) continue;
      out[i] = pack(mix(unpack(out[i]), [255, 250, 235], a));
      if (s.big && a > 0.5) for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const j = (s.y + oy) * W + s.x + ox; if (s.x + ox >= 0 && s.x + ox < W && s.y + oy >= 0 && !L[j]) out[j] = pack(mix(unpack(out[j]), [255, 250, 235], a * 0.4)); }
    }
    // shooting star
    const slot = Math.floor(t / 7), st = t - slot * 7;
    if (night > 0.6 && hash(slot, 1, S.seed) < 0.45 && st < 0.7) {
      const x0 = hash(slot, 2, S.seed) * W, y0 = hash(slot, 3, S.seed) * hz * 0.4, len = 10;
      for (let k = 0; k < len; k++) { const pp = st / 0.7 * 40 - k; const x = Math.round(x0 + pp), y = Math.round(y0 + pp * 0.45); if (x >= 0 && x < W && y >= 0 && y < ytop && !L[y * W + x]) out[y * W + x] = pack(mix(unpack(out[y * W + x]), WHITE, (1 - k / len) * night)); }
    }
  }
  /* mist along the horizon */
  if (S.fog) {
    const mc = mix(C.hor, WHITE, 0.15 + 0.2 * C.light), y0 = Math.max(0, Math.floor(hz - S.fog.h)), y1 = Math.min(H, Math.ceil(hz + S.fog.h * 0.4));
    for (let y = y0; y < y1; y++) {
      const v = 1 - Math.abs((y - hz + S.fog.h * 0.3) / S.fog.h);
      if (v <= 0) continue;
      for (let x = 0; x < W; x++) {
        const i = y * W + x; if (L[i] === FG) continue;
        const n = noise2((x + t * 3) / 26, y / 5, S.fog.s), a = Math.floor((v * n * S.fog.a * 1.6) * 4 + BAY[((y & 3) << 2) | (x & 3)]) / 4 * 0.45;
        if (a > 0) out[i] = pack(mix(unpack(out[i]), mc, a));
      }
    }
  }

  /* pass 2: water (reflection + ripples + glints) */
  if (S.water) {
    const deep = mix(C.top, C.amb, 0.55), wH = H - wy;
    const glint = pack(mix(C.sun, WHITE, 0.4)), gOn = se > -0.04 && se < 0.75, mglint = pack(hex('#e8ecff')), mOn = night > 0.3 && me > 0;
    const shore = pack(mix(C.hor, WHITE, 0.35));
    for (let y = wy; y < H; y++) {
      const dd = (y - wy) / wH;
      const dx = Math.round(Math.sin(y * 1.9 + t * 2.4 + Math.sin(y * 0.37 + t * 0.6) * 2) * (0.4 + dd * 2.6));
      let my2 = 2 * wy - y - 1 - Math.round(dd * 2); if (my2 < 0) my2 = 0;
      const mixA = 0.18 + 0.42 * dd;
      for (let x = 0; x < W; x++) {
        const i = y * W + x; if (L[i]) { out[i] = pal[((L[i] * NK + K[i]) * 3 + F[i]) * 4 + D[i]]; continue; }
        const xs = x + dx < 0 ? 0 : x + dx >= W ? W - 1 : x + dx;
        let c = mul(unpack(out[my2 * W + xs]), 0.86);
        c = mix(c, deep, mixA);
        if (y === wy && L[(wy - 1) * W + x] && hash(x, 3, S.seed) > 0.25) { out[i] = shore; continue; }
        const tick = Math.floor(t * 5);
        if (gOn && Math.abs(x - sx) < 1.5 + (y - wy) * 0.3 * (1 - se) && hash(x >> 1, y, tick) > 0.8) { out[i] = glint; continue; }
        if (mOn && Math.abs(x - mx) < 1 + (y - wy) * 0.25 && hash(x >> 1, y, tick) > 0.8) { out[i] = mglint; continue; }
        if (hash(x >> 3, y, S.seed) > 0.985 && ((y + tick) & 1)) c = mix(c, C.hor, 0.35);
        out[i] = pack(c);
      }
    }
  } else {
    for (let y = wy; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; out[i] = pal[((L[i] * NK + K[i]) * 3 + F[i]) * 4 + D[i]]; }
  }

  /* lighthouse lamp */
  if (S.lamp) {
    const on = clamp(1 - C.light * 1.6); const pulse = 0.5 + 0.5 * Math.cos(t * 1.6);
    const lc = [255, 226, 140];
    if (on > 0.05) for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const x = S.lamp.x + dx, y = S.lamp.y + dy; if (x < 0 || x >= W || y < 0 || y >= H) continue; const d = Math.hypot(dx, dy); const i = y * W + x;
      if (d < 0.5) { out[i] = pack(lc); continue; }
      if (L[i]) continue;
      const a = Math.floor(clamp(1 - d / 4.5) * pulse * on * 3 + BAY[((y & 3) << 2) | (x & 3)]) / 3 * 0.7; if (a > 0) out[i] = pack(mix(unpack(out[i]), lc, a));
    }
    else out[S.lamp.y * W + S.lamp.x] = pack(hex('#3a3a3a'));
  }
  /* birds */
  if (S.birds && C.light > 0.2) {
    const P = S.birds.period, k = Math.floor(t / P), tau = t - k * P, h = (a) => hash(k, a, S.birds.s);
    if (h(1) < 0.8) {
      const dir = h(2) < 0.5 ? 1 : -1, sp = 8 + h(3) * 8, y0 = (0.12 + h(4) * 0.35) * hz, cnt = 2 + Math.floor(h(5) * 6);
      const bc = pack(mix(C.amb, [20, 18, 28], 0.5));
      for (let b = 0; b < cnt; b++) {
        const off = b === 0 ? 0 : Math.ceil(b / 2), sideB = b % 2 ? 1 : -1;
        const bx = Math.round((dir > 0 ? -12 + tau * sp : W + 12 - tau * sp) - dir * off * 4), byy = Math.round(y0 + sideB * off * 2 * (b ? 1 : 0) + Math.sin(tau * 1.3 + b) * 1.5);
        const up = Math.floor(t * 6 + b * 1.7) % 2;
        const pts = up ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1]];
        for (const [ox, oy] of pts) { const x = bx + ox, y = byy + oy; if (x >= 0 && x < W && y >= 0 && y < H) out[y * W + x] = bc; }
      }
    }
  }
  /* fireflies */
  if (S.flies && night > 0.3) {
    for (const f of S.flies) {
      const x = Math.round(f.x + Math.sin(t * 0.4 * f.sp + f.ph) * 6), y = Math.round(f.y + Math.cos(t * 0.3 * f.sp + f.ph * 2) * 3);
      if (x < 1 || x >= W - 1 || y < 1 || y >= H - 1) continue;
      const a = Math.pow(Math.max(0, Math.sin(t * 1.3 * f.sp + f.ph)), 3) * night;
      if (a < 0.1) continue;
      out[y * W + x] = pack(mix(unpack(out[y * W + x]), [246, 255, 160], a));
      for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const j = (y + oy) * W + x + ox; out[j] = pack(mix(unpack(out[j]), [200, 230, 120], a * 0.3)); }
    }
  }
  /* little James */
  if (S.me) drawMe(S, out, t, C, night, sunTint, opts);
  /* snowfall */
  if (S.snowfall) {
    const sc = mix(WHITE, C.top, 0.15);
    for (const s of S.snowfall) {
      const y = Math.floor((s.y + t * s.v) % H), x = Math.floor((((s.x + Math.sin(t * 0.7 + s.ph) * 3 + t * S.wind * 2) % W) + W) % W);
      const i = y * W + x; out[i] = pack(mix(unpack(out[i]), sc, 0.85));
      if (s.big && x + 1 < W && y + 1 < H) { out[i + 1] = out[i]; out[i + W] = out[i]; out[i + W + 1] = out[i]; }
    }
  }
}

function meState(t, wave) {
  if (wave) return Math.floor(t * 5) % 2 ? 'wave1' : 'wave0';
  const c = t % 9; if (c > 6.2 && c < 7.7) return 'look';
  if (t % 3.7 < 0.15) return 'blink';
  return Math.floor(t * 4) % 2 ? 'type1' : 'type0';
}
function drawMe(S, out, t, C, night, sunTint, opts) {
  const J = PixelJames, me = S.me, { W, H } = S;
  const st = meState(t, opts.wave);
  me.cache = me.cache || {};
  const sp = me.cache[st] || (me.cache[st] = J.sprite(st, { beanie: me.beanie }));
  const x0 = me.x - (sp.w >> 1), y0 = me.feet - (sp.h - 2);
  me.box = { x: x0, y: y0, w: sp.w, h: sp.h };
  const glow = hex('#9fd0ff'), lit = {};
  for (let j = 0; j < sp.h; j++) for (let i = 0; i < sp.w; i++) {
    const code = sp.g[j * sp.w + i]; if (!code) continue;
    const x = x0 + i, y = y0 + j; if (x < 0 || x >= W || y < 0 || y >= H) continue;
    let c = lit[code];
    if (!c) {
      const base = J.RGB[code];
      let v = code === J.M.OUT ? mix(base, C.amb, 0.25) : mix(C.amb, tint(base, sunTint), 0.25 + C.light * 0.75);
      if ((code === J.M.SKIN || code === J.M.SKINS || code === J.M.EYE) && night > 0) v = mix(v, glow, 0.35 * night); // laptop glow on the face
      if (code === J.M.LIDL && night > 0) v = mix(v, glow, 0.5 * night);
      c = lit[code] = pack(v);
    }
    out[y * W + x] = c;
  }
}

/* advance the day: time lingers around sunrise/sunset so golden hour lasts */
function advance(p, dt, day) { const se = Math.abs(Math.sin(TAU * (p - 0.25))); return (p + (dt / day) * (0.3 + 1.4 * sstep(se * 2.2))) % 1; }
export const PixelScene = { generate, render, timeWord, advance, rng, version: 1 };

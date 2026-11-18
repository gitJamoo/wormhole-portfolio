/* Pixel James: a 32x32 portrait for the name plate and a 13x14 sitting sprite for the scene.
 * Sprite pixels are material codes so the scene can light them; portrait returns RGBA (ABGR-packed). */
const M = { OUT: 1, HAIR: 2, HAIRL: 3, HAIRD: 4, SKIN: 5, SKINS: 6, EYE: 7, MOUTH: 8, SHIRT: 9, TIE: 10, SUIT: 11, SUITL: 12, LID: 13, LIDL: 14, PANTS: 15, SHOE: 16, BEANIE: 17, BEANIEL: 18, BROW: 19, CHEEK: 20, IRIS: 21 };
const COL = {
  1: '#1a1520', 2: '#a8743f', 3: '#d4a066', 4: '#74492a', 5: '#f2c7a2', 6: '#d99d7c', 7: '#2b2733', 8: '#c47a70',
  9: '#f3f0ea', 10: '#8e2a36', 11: '#262b3a', 12: '#3d4560', 13: '#c3c8d2', 14: '#e6e9ef', 15: '#2e3242', 16: '#14131a',
  17: '#d73f09', 18: '#f2733a', 19: '#6b4426', 20: '#e9a58f', 21: '#7d9aa6',
};
const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const RGB = {}; for (const k in COL) RGB[k] = hex(COL[k]);
const pack = c => ((255 << 24) | (c[2] << 16) | (c[1] << 8) | c[0]) >>> 0;

function outline(g, w, h) {
  const o = g.slice();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (g[y * w + x]) continue;
    const n = (xx, yy) => xx >= 0 && yy >= 0 && xx < w && yy < h && g[yy * w + xx];
    if (n(x - 1, y) || n(x + 1, y) || n(x, y - 1) || n(x, y + 1)) o[y * w + x] = M.OUT;
  }
  return o;
}

/* ---- sitting sprite: states 'type0' 'type1' 'blink' 'look' 'wave0' 'wave1'; opts.beanie ---- */
const SW = 15, SH = 16; // includes 1px outline margin
function sprite(state, opts = {}) {
  const w = SW, h = SH, g = new Uint8Array(w * h);
  const p = (x, y, c) => { x += 1; y += 1; if (x >= 0 && y >= 0 && x < w && y < h) g[y * w + x] = c; };
  const r = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) p(x, y, c); };
  // legs, crossed
  r(1, 12, 11, 12, M.PANTS); r(0, 13, 12, 13, M.PANTS); p(0, 13, M.SHOE); p(1, 13, M.SHOE); p(11, 13, M.SHOE); p(12, 13, M.SHOE);
  // torso + shoulders
  r(2, 8, 10, 11, M.SUIT); r(3, 7, 9, 7, M.SUIT);
  p(5, 7, M.SHIRT); p(6, 7, M.TIE); p(7, 7, M.SHIRT); p(6, 8, M.TIE); p(4, 8, M.SUITL); p(8, 8, M.SUITL);
  // laptop lid (back of the screen faces us)
  r(3, 9, 9, 11, M.LID); r(3, 9, 9, 9, M.LIDL); p(6, 10, M.LIDL);
  // head
  r(4, 2, 8, 5, M.SKIN); r(5, 6, 7, 6, M.SKIN); p(8, 5, M.SKINS); p(7, 6, M.SKINS);
  p(3, 4, M.SKINS); p(9, 4, M.SKINS); // ears
  // hair: swoopy fringe
  if (opts.beanie) { r(4, 0, 8, 0, M.BEANIE); r(3, 1, 9, 1, M.BEANIE); r(3, 2, 9, 2, M.BEANIEL); p(6, -1, M.BEANIEL); p(3, 3, M.HAIR); p(9, 3, M.HAIR); p(8, 3, M.HAIR); }
  else { r(4, 0, 8, 0, M.HAIR); p(5, 0, M.HAIRL); p(6, 0, M.HAIRL); r(3, 1, 9, 1, M.HAIR); p(4, 1, M.HAIRL); p(5, 1, M.HAIRL); r(3, 2, 10, 2, M.HAIR); p(9, 2, M.HAIRD); p(3, 3, M.HAIR); p(6, 3, M.HAIR); p(7, 3, M.HAIR); p(9, 3, M.HAIRD); p(10, 3, M.HAIRD); }
  // face
  const look = state === 'look' ? 1 : 0;
  if (state === 'blink') { p(5, 4, M.SKINS); p(7, 4, M.SKINS); } else { p(5 + look, 4, M.EYE); p(7 + look, 4, M.EYE); }
  p(6, 5, M.SKINS); p(5, 6, M.SKINS);
  // hands
  const wave = state === 'wave0' || state === 'wave1';
  const up = state === 'type1' ? 1 : 0;
  p(2, 10 + up, M.SKIN);
  if (wave) { p(10, 7, M.SUIT); p(11, 6, M.SUIT); p(11, 5, M.SUIT); p(state === 'wave0' ? 11 : 12, 4, M.SKIN); p(state === 'wave0' ? 11 : 12, 3, M.SKIN); }
  else p(10, 11 - up, M.SKIN);
  return { w, h, g: outline(g, w, h) };
}

/* ---- 32x32 portrait ---- */
function portrait() {
  const S = 32, g = new Uint8Array(S * S);
  const set = (x, y, c) => { if (x >= 0 && y >= 0 && x < S && y < S) g[y * S + x] = c; };
  const ell = (cx, cy, rx, ry, c, cond) => { for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy <= 1 && (!cond || cond(x, y))) set(x, y, c); } };
  const rect = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, c); };
  // suit shoulders
  ell(16, 34, 15.5, 9, M.SUIT);
  // shirt V + tie
  for (let y = 25; y < 32; y++) { const hw = Math.max(0, 4 - (y - 25) * 0.6); for (let x = Math.round(16 - hw); x <= Math.round(15 + hw); x++) set(x, y, M.SHIRT); }
  rect(15, 26, 16, 31, M.TIE); set(14, 27, M.TIE); set(17, 27, M.TIE);
  // lapels
  for (let y = 25; y < 32; y++) { const xo = Math.round(4.5 - (y - 25) * 0.6); set(16 - xo - 1, y, M.SUITL); set(15 + xo + 1, y, M.SUITL); }
  // neck
  rect(13, 20, 18, 25, M.SKIN); rect(13, 20, 18, 21, M.SKINS); set(13, 22, M.SKINS); set(18, 22, M.SKINS);
  // collar points
  set(12, 25, M.SHIRT); set(13, 25, M.SHIRT); set(18, 25, M.SHIRT); set(19, 25, M.SHIRT); set(13, 24, M.SHIRT); set(18, 24, M.SHIRT);
  // ears
  ell(9.2, 15.5, 1.5, 2.2, M.SKINS); ell(22.8, 15.5, 1.5, 2.2, M.SKINS);
  // head
  ell(16, 14.6, 6.7, 7.6, M.SKIN);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (g[y * S + x] === M.SKIN && (x >= 21 || (y >= 20 && x >= 19))) g[y * S + x] = M.SKINS;
  // hair: soft volume, fringe falling forward in strands
  ell(16, 9.6, 8.2, 6, M.HAIR, (x, y) => y <= 10 || ((x <= 9 || x >= 22) && y <= 13));
  ell(15.5, 7.6, 7.4, 4.6, M.HAIR);
  const fringe = [12, 13, 13, 13, 12, 12, 13, 12, 11, 11, 11, 10, 11, 12]; // fringe bottom for x = 9..22
  for (let i = 0; i < fringe.length; i++) for (let y = 8; y <= fringe[i]; y++) set(9 + i, y, M.HAIR);
  set(8, 12, M.HAIR); set(23, 11, M.HAIR); set(23, 12, M.HAIR);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    if (g[y * S + x] !== M.HAIR) continue;
    const top = !g[(y - 1) * S + x] || g[(y - 1) * S + x] === M.OUT;
    if (x >= 20 && y > 6) g[y * S + x] = M.HAIRD;                       // shadow side
    else if ((x - y + 40) % 5 === 0 && y >= 9) g[y * S + x] = M.HAIRD;  // strands in the fringe
    else if (top || ((x - y + 40) % 5 === 2 && y > 3 && y < 10 && x < 19)) g[y * S + x] = M.HAIRL; // light on the crown
  }
  // brows, eyes, nose, smile
  rect(11, 14, 13, 14, M.BROW); rect(18, 14, 20, 14, M.BROW);
  set(12, 16, M.SHIRT); set(13, 16, M.EYE); set(13, 17, M.EYE); set(12, 17, M.IRIS);
  set(19, 16, M.SHIRT); set(18, 16, M.EYE); set(18, 17, M.EYE); set(19, 17, M.IRIS);
  set(16, 19, M.SKINS); set(15, 19, M.SKINS);
  rect(14, 21, 17, 21, M.MOUTH); set(13, 20, M.MOUTH); set(18, 20, M.MOUTH); set(15, 22, M.SKINS); set(16, 22, M.SKINS);
  const o = outline(g, S, S);
  const out = new Uint32Array(S * S);
  for (let i = 0; i < S * S; i++) if (o[i]) out[i] = pack(RGB[o[i]]);
  return out;
}

export const PixelJames = { M, RGB, sprite, portrait, SW, SH };

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

/* ---- 32x32 portrait, hand-placed. One character per pixel; edit freely. ---- */
const PORTRAIT = [
    '................................',
    '............ooooooo.o...........',
    '.........ooo2222222o2o..........',
    '........o234443312222o..........',
    '........o3343333132211o.........',
    '.......o233333313331211o........',
    '......o22313331334412111o.......',
    '......o22213313333132111o.......',
    '......o22343122231321111o.......',
    '......o22333122212221111o.......',
    '......o22232222212211111o.......',
    '.......o22212212111ssS11o.......',
    '.......o211s11s1s2sssSo1o.......',
    '.......o1ssbbb2sssbbbSoo........',
    '.......oSsbssssssssssbSSo.......',
    '......oSSssseesssseesSSSSo......',
    '......oSDsseiwsssswieSSDSo......',
    '.......oSshsSSshSsSSsSSSo.......',
    '........oshhssshSssssSoo........',
    '.........ossSsSDSSsSso..........',
    '.........osssmssssmsso..........',
    '..........osssmmmmSSo...........',
    '...........osssllsSSo...........',
    '...........oSSSSSSSSo...........',
    '...........oSsssssSSo...........',
    '..........ocwwwwwwwwco..........',
    '.......oooKkwwwTtwwwKoooo.......',
    '....oookkkkKwwwttwwKkkkkkooo....',
    '..ookkkkkkkkKwtTttKkkkkkkkkkoo..',
    'ookkkkkkkkkkkKttttKkkkkkkkkkkkoo',
    'kkkkkkkkkkkkkKttTKkkkkkkkkkkkkkk',
    'kkkkkkkkkkkkkkKtKtkkkkkkkkkkkkkk',
];
const PCOL = {
  o: '#1a1520', 1: '#74492a', 2: '#a8743f', 3: '#d4a066', 4: '#ecc58a', // outline, hair dark→highlight
  s: '#f2c7a2', S: '#d99d7c', D: '#b97a60', h: '#fbdcc0', b: '#5e3b22', // skin, shadow, deep, light, brows
  e: '#2b2733', i: '#6f93a3', w: '#f1ede6', c: '#cfc9bf', m: '#b4675d', l: '#d68a7c', // eyes, shirt, mouth
  k: '#262b3a', K: '#3d4560', t: '#8e2a36', T: '#b8414e', // suit, tie
};
function portrait() {
  const out = new Uint32Array(32 * 32);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const ch = PORTRAIT[y][x]; if (ch !== '.') out[y * 32 + x] = pack(hex(PCOL[ch])); }
  return out;
}

export const PixelJames = { M, RGB, sprite, portrait, SW, SH };

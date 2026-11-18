/* 32x32 pixel-art beaver chomping a log. beaverFrame(i) -> Uint32Array(1024) RGBA (ABGR-packed). */
const P = {
  ol: '#2a170e', fur: '#8b5631', furL: '#b2753f', furD: '#5e361b', belly: '#c08a52',
  tail: '#3c302f', tailD: '#2a2021', tailL: '#55464a',
  bark: '#6f4a28', barkD: '#4a2f18', barkL: '#8f6536', wood: '#e6c48b', ring: '#b88b54',
  teeth: '#fff3d6', eye: '#0c0604', nose: '#1b0f09', glint: '#ffffff', paw: '#4a2a15',
};
const C = {}; for (const k in P) { const n = parseInt(P[k].slice(1), 16); C[k] = (255 << 24 | (n & 255) << 16 | ((n >> 8) & 255) << 8 | (n >> 16)) >>> 0; }
const S = 32;
// head bob (dy) and nudge (dx) per frame: up, down, bite, bite, up
const BOB = [[0, 0], [0, 1], [1, 3], [1, 4], [1, 3], [0, 1]];
function beaverFrame(fi) {
  const [hx, hy] = BOB[fi % BOB.length];
  const obj = new Uint8Array(S * S); // object ids for shading
  const col = new Uint32Array(S * S);
  const ell = (cx, cy, rx, ry, id, a = 0) => { const ca = Math.cos(a), sa = Math.sin(a); for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const px = x + 0.5 - cx, py = y + 0.5 - cy; const dx = (px * ca + py * sa) / rx, dy = (-px * sa + py * ca) / ry; if (dx * dx + dy * dy <= 1) obj[y * S + x] = id; } };
  const rect = (x0, y0, x1, y1, id) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) obj[y * S + x] = id; };
  // ids: 1 tail 2 body 3 hind 4 log 5 logEnd 6 head 7 snout 8 ear 9 paw
  ell(5.2, 22.5, 5.8, 2.7, 1, 0.62); // tail: flat paddle, raised behind
  ell(12.5, 20, 6.2, 7.4, 2);         // body
  ell(13.5, 27.2, 3.4, 2, 3);         // hind leg
  rect(16, 22, 29, 28, 4);            // log
  ell(29.6, 25.5, 2.2, 3.6, 5);       // log cut end
  ell(18.5 + hx, 12.5 + hy, 4.6, 4.2, 6); // head
  ell(22.6 + hx, 14.8 + hy, 2.8, 2.2, 7); // snout
  ell(15.6 + hx, 9.2 + hy, 1.4, 1.4, 8);  // ear
  ell(20.5, 21.6, 2, 1.3, 9);         // front paw on log
  // notch chewed into the log
  for (const [x, y] of [[22, 22], [23, 22], [24, 22], [25, 22], [23, 23], [24, 23]]) obj[y * S + x] = 10;
  const at = (x, y) => (x < 0 || y < 0 || x >= S || y >= S ? 0 : obj[y * S + x]);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const id = obj[y * S + x]; if (!id) continue; const i = y * S + x;
    const topEdge = at(x, y - 1) !== id && at(x, y - 1) !== 6, leftEdge = !at(x - 1, y);
    const botEdge = at(x, y + 1) !== id || at(x + 1, y + 1) === 0;
    let c;
    if (id === 1) c = at(x, y - 1) !== 1 || at(x - 1, y) !== 1 ? C.tailL : ((x + y) % 3 === 0 || (x - y + 40) % 3 === 0) ? C.tailD : C.tail;
    else if (id === 4) c = y === 22 ? C.barkL : (y === 24 || y === 27) && x % 5 !== 1 ? C.barkD : (x * 7 + y * 3) % 11 === 0 ? C.barkD : C.bark;
    else if (id === 5) { const d = Math.hypot((x + 0.5 - 29) / 2, (y + 0.5 - 25.5) / 3.6); c = d > 0.85 ? C.barkL : d > 0.55 && d < 0.7 ? C.ring : d < 0.22 ? C.ring : C.wood; }
    else if (id === 10) c = C.wood;
    else if (id === 9) c = C.paw;
    else if (id === 3) c = botEdge ? C.furD : topEdge ? C.fur : C.furD;
    else if (id === 2) {
      c = C.fur;
      const bx = (x + 0.5 - 14.5) / 3.6, by = (y + 0.5 - 22) / 5; if (bx * bx + by * by < 1) c = C.belly;
      if (at(x, y - 1) === 6 || at(x, y - 2) === 6) c = C.furD; else if (topEdge || leftEdge) c = C.furL; else if (botEdge) c = C.furD;
    } else { // head, snout, ear
      c = id === 7 ? C.furL : id === 8 ? C.furD : C.fur;
      if (id === 6 && (topEdge || leftEdge)) c = C.furL;
      if (id === 6 && at(x, y + 1) !== 6 && at(x, y + 1) !== 7) c = C.furD;
      if (id === 7 && at(x, y + 1) !== 7) c = C.fur;
    }
    col[i] = c;
  }
  // face details
  const px = (x, y, c) => { if (x >= 0 && y >= 0 && x < S && y < S) { col[y * S + x] = c; if (!obj[y * S + x]) obj[y * S + x] = 99; } };
  px(19 + hx, 11 + hy, C.eye); px(20 + hx, 11 + hy, C.eye); px(19 + hx, 10 + hy, C.eye); px(20 + hx, 10 + hy, C.glint);
  px(25 + hx, 13 + hy, C.nose); px(24 + hx, 13 + hy, C.nose); px(25 + hx, 14 + hy, C.nose);
  px(16 + hx, 9 + hy, C.ol); // inner ear
  // whisker dots
  px(23 + hx, 15 + hy, C.furD); px(22 + hx, 15 + hy, C.furD);
  // big front teeth
  px(23 + hx, 17 + hy, C.teeth); px(24 + hx, 17 + hy, C.teeth); px(23 + hx, 18 + hy, C.teeth); px(24 + hx, 18 + hy, C.teeth);
  if (hy < 2) { px(23 + hx, 19 + hy, C.ol); px(24 + hx, 19 + hy, C.ol); }
  px(21 + hx, 17 + hy, C.ol); px(22 + hx, 17 + hy, C.ol); // mouth line
  // paw claws
  px(22, 21, C.ol); px(21, 21, C.paw);
  // outline pass
  const outl = new Uint8Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    if (obj[y * S + x]) continue;
    if (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1)) outl[y * S + x] = 1;
  }
  for (let i = 0; i < S * S; i++) if (outl[i]) col[i] = C.ol;
  // inner outlines: head over body, snout under-jaw, log vs body
  for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
    const i = y * S + x, id = obj[i];
    if (id === 2 && (obj[i - S] === 6 || obj[i - S] === 7)) col[i] = C.ol;
    if (id === 4 && obj[i - 1] === 2) col[i] = C.barkD;
  }
  return col;
}
const CHIP = [C.wood, C.ring, C.barkL];
export const Beaver = { frames: BOB.length, beaverFrame, CHIP, size: S };

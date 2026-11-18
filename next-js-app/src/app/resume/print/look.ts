// How the resume looks: every knob, the default look, the classic look, and the scene painter.
import { PixelScene } from '@/lib/pixel-scene/scene';

export type RGB = [number, number, number];
type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string };

export const OPTIONS = {
  place: { full: 'Full page', banner: 'Top banner', spine: 'Left spine', bottom: 'Bottom band', top: 'Top fade', fade: 'Soft vignette', corner: 'Corner', none: 'No scene' },
  backing: { none: 'None', paper: 'Paper card', halo: 'Halo' },
  tint: { color: 'Color', mono: 'Mono', sepia: 'Sepia', blueprint: 'Blueprint', dusk: 'Dusk' },
  font: { source: 'Source Serif', garamond: 'Garamond', hyper: 'Atkinson Hyperlegible', mixed: 'Display + Geist', geist: 'Geist', sf: 'SF Pro', mono: 'Mono' },
  nameSize: { classic: 'Classic', large: 'Large', poster: 'Poster' },
  align: { center: 'Centered', left: 'Left' },
  heads: { rule: 'Underline', caps: 'Small caps', bar: 'Side bar', pixel: 'Pixel rule' },
  bullets: { dot: 'Dot', dash: 'Dash', square: 'Pixel', arrow: 'Arrow' },
  accent: { ink: 'Ink', scene: 'From scene', orange: 'OSU orange', navy: 'Navy', forest: 'Forest', plum: 'Plum' },
  ink: { soft: 'Warm black', black: 'Pure black' },
  minSize: { s75: '7.5pt', s85: '8.5pt', s95: '9.5pt' },
  density: { tight: 'Tight', normal: 'Normal', airy: 'Airy' },
  pixels: { fine: 'Fine', normal: 'Normal', chunky: 'Chunky' },
  mark: { show: 'Show', hide: 'Hide' },
} as const;
export type Opts = { [K in keyof typeof OPTIONS]: keyof (typeof OPTIONS)[K] } & { wash: number };

// James's pick: the visitor's scene framing a paper card
export const DEFAULTS: Opts = {
  place: 'full', backing: 'paper', tint: 'color', font: 'source', nameSize: 'classic', align: 'center', heads: 'caps', bullets: 'arrow',
  accent: 'scene', ink: 'black', minSize: 's85', density: 'normal', pixels: 'fine', mark: 'show', wash: 20,
};
// plain paper, no scene
export const CLASSIC: Opts = { ...DEFAULTS, place: 'none', backing: 'none', heads: 'rule', bullets: 'dot', accent: 'ink', mark: 'hide' };

export const LABELS: Record<keyof Opts, string> = {
  place: 'Scene placement', backing: 'Behind the text', tint: 'Tint', font: 'Typeface', nameSize: 'Name size', align: 'Name alignment', heads: 'Section headings',
  bullets: 'Bullets', accent: 'Accent', ink: 'Body ink', minSize: 'Smallest text allowed', density: 'Spacing', pixels: 'Pixel size', mark: 'Scene number on page', wash: 'Wash',
};
export const PRESETS: Record<string, { label: string; note: string; opts: Partial<Opts> }> = {
  recruiter: { label: 'Recruiter-safe', note: 'Scene in a banner, nothing behind the text', opts: { place: 'banner', backing: 'none', ink: 'black', wash: 40, heads: 'caps', minSize: 's85', mark: 'hide', accent: 'ink' } },
  balanced: { label: 'Balanced', note: 'Full scene framing a paper card', opts: { place: 'full', backing: 'paper', wash: 45, accent: 'scene', heads: 'rule', ink: 'black', minSize: 's85' } },
  gallery: { label: 'Gallery', note: 'Art first, text on a halo', opts: { place: 'full', backing: 'halo', wash: 74, pixels: 'chunky', heads: 'pixel', bullets: 'square', accent: 'scene', nameSize: 'poster', font: 'mixed', align: 'left' } },
  hyper: { label: 'Max legibility', note: 'Atkinson Hyperlegible, spine art, 9.5pt floor', opts: { place: 'spine', backing: 'none', font: 'hyper', ink: 'black', wash: 30, minSize: 's95', density: 'tight', heads: 'bar', accent: 'navy', mark: 'hide' } },
  classic: { label: 'Classic', note: 'Plain paper, no scene', opts: CLASSIC },
};

const FONTS: Record<Opts['font'], { head: string; body: string }> = {
  source: { head: 'var(--serif), Georgia, serif', body: 'var(--serif), Georgia, serif' },
  garamond: { head: 'var(--garamond), Garamond, serif', body: 'var(--garamond), Garamond, serif' },
  hyper: { head: 'var(--hyper), -apple-system, system-ui, sans-serif', body: 'var(--hyper), -apple-system, system-ui, sans-serif' },
  mixed: { head: 'var(--display), Georgia, serif', body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' },
  geist: { head: 'var(--font-geist-sans), -apple-system, system-ui, sans-serif', body: 'var(--font-geist-sans), -apple-system, system-ui, sans-serif' },
  sf: { head: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif', body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' },
  mono: { head: 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace', body: 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace' },
};
const MASKS: Record<Opts['place'], string> = {
  full: 'none',
  none: 'none',
  banner: 'linear-gradient(to bottom, #000 0 var(--band), transparent var(--band))',
  spine: 'linear-gradient(to right, #000 0 var(--spine), transparent var(--spine))',
  bottom: 'linear-gradient(to top, #000 0%, #000 22%, transparent 58%)',
  top: 'linear-gradient(to bottom, #000 0%, #000 18%, transparent 50%)',
  fade: 'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 35%, #000 100%)',
  corner: 'radial-gradient(circle at 100% 100%, #000 0%, #000 18%, transparent 55%)',
};
const TINTS: Record<Opts['tint'], string> = {
  color: 'none', mono: 'grayscale(1) contrast(1.1)', sepia: 'sepia(.85) saturate(1.2)', blueprint: 'grayscale(1) sepia(1) hue-rotate(175deg) saturate(2.2)', dusk: 'hue-rotate(-25deg) saturate(1.35)',
};
export const PIXEL_K = { fine: 0.5, normal: 1, chunky: 2 };
const DENSITY = { tight: { pt: 0.34, px: 0.45, pb: 0.28, lh: 1.12 }, normal: { pt: 0.42, px: 0.5, pb: 0.3, lh: 1.18 }, airy: { pt: 0.55, px: 0.62, pb: 0.4, lh: 1.3 } };
export const FLOOR = { s75: 7.5, s85: 8.5, s95: 9.5 };
const NAME_EM = { classic: 2.6, large: 3.3, poster: 4.2 };
const BULLET = { dot: 'disc', dash: '"–  "', square: 'square', arrow: '"›  "' };
const INK: Record<Opts['ink'], RGB> = { soft: [23, 20, 15], black: [0, 0, 0] };
const ACCENTS: Record<Exclude<Opts['accent'], 'scene'>, RGB> = { ink: [23, 20, 15], orange: [196, 64, 12], navy: [31, 58, 95], forest: [38, 84, 52], plum: [94, 44, 84] };
const PAPER = 0.95; // opacity of the paper card
const CLEAR = new Set<Opts['place']>(['banner', 'spine', 'none']); // the text never sits on the scene

const rgb = (c: RGB) => `rgb(${c.join(', ')})`;
const lum = (c: RGB) => { const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a: RGB, b: RGB) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (c: RGB, white: number): RGB => c.map((v) => Math.round(v * (1 - white) + 255 * white)) as RGB;
// the scene accent only colors rules and bullet markers (all text is ink), darkened until it holds 4.5:1 on white
const deepen = (c: RGB): RGB => { let x = c; while (ratio(x, [255, 255, 255]) < 4.5) x = x.map((v) => Math.round(v * 0.88)) as RGB; return x; };
const accentOf = (o: Opts, sky: RGB) => (o.accent === 'scene' ? deepen(sky) : ACCENTS[o.accent]);

export function lookVars(o: Opts, sky: RGB = [23, 20, 15]) {
  const f = FONTS[o.font], d = DENSITY[o.density];
  return {
    '--head': f.head, '--body': f.body, '--ink': rgb(INK[o.ink]), '--accent': rgb(accentOf(o, sky)), '--wash': String(o.wash / 100),
    '--mask': MASKS[o.place], '--tint': TINTS[o.tint], '--align': o.align, '--pt': d.pt + 'in', '--px': d.px + 'in', '--pb': d.pb + 'in', '--lh': String(d.lh),
    '--name': NAME_EM[o.nameSize] + 'em', '--bullet': BULLET[o.bullets], '--paper': String(PAPER),
  } as React.CSSProperties;
}
export const lookAttrs = (o: Opts) => ({ 'data-place': o.place, 'data-backing': o.backing, 'data-heads': o.heads, 'data-bullets': o.bullets });

// readability on the printed page: the worst background a line can land on vs. the ink and the accent
export function readability(o: Opts, sky: RGB, dark: RGB) {
  const bg: RGB = CLEAR.has(o.place) ? [255, 255, 255] : o.backing === 'paper' ? over(over(dark, o.wash / 100), PAPER) : over(dark, o.wash / 100);
  void sky; // every line of text is ink; the accent is decoration only
  return { contrast: ratio(INK[o.ink], bg) };
}

export function paint(cv: HTMLCanvasElement, seed: number, phase: number | null, W: number, H: number) {
  const S = PixelScene.generate(seed, W, H) as Scene;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d', { alpha: false })!;
  const img = ctx.createImageData(W, H);
  const px = new Uint32Array(img.data.buffer);
  PixelScene.render(S, px, 2.3, phase ?? S.phase0, { noMe: true }); // no little James on the resume
  ctx.putImageData(img, 0, 0);
  // average sky color (top third), darkened enough to read as text on white
  let r = 0, g = 0, b = 0; const n = W * Math.floor(H / 3);
  for (let i = 0; i < n; i++) { r += px[i] & 255; g += (px[i] >>> 8) & 255; b += (px[i] >>> 16) & 255; }
  const sky: RGB = [Math.round((r / n) * 0.45), Math.round((g / n) * 0.45), Math.round((b / n) * 0.45)];
  // a dark-end pixel (5th percentile by luminance)
  const sample: RGB[] = [];
  for (let i = 0; i < px.length; i += 7) sample.push([px[i] & 255, (px[i] >>> 8) & 255, (px[i] >>> 16) & 255]);
  sample.sort((a, c) => lum(a) - lum(c));
  return { S, sky, dark: sample[Math.floor(sample.length * 0.05)] };
}

export function readOpts(q: URLSearchParams): Opts {
  const o = { ...(q.get('look') === 'classic' ? CLASSIC : DEFAULTS) } as Record<string, string | number>;
  for (const k of Object.keys(OPTIONS)) { const v = q.get(k); if (v && v in OPTIONS[k as keyof typeof OPTIONS]) o[k] = v; }
  const w = Number(q.get('wash')); if (w >= 20 && w <= 98) o.wash = w;
  return o as Opts;
}

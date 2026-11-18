'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { parseSceneSlug, sceneSlug } from '@/lib/pixel-scene/share';
import ResumeBody from './ResumeBody';
import st from './resume.module.css';

type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string };
type RGB = [number, number, number];

/* ---- the knobs (?tune=1 shows the panel; every pick is kept in the URL) ---- */
const OPTIONS = {
  place: { full: 'Full page', banner: 'Top banner', spine: 'Left spine', bottom: 'Bottom band', top: 'Top fade', fade: 'Soft vignette', corner: 'Corner' },
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
type Opts = { [K in keyof typeof OPTIONS]: keyof (typeof OPTIONS)[K] } & { wash: number };
const DEFAULTS: Opts = {
  place: 'full', backing: 'none', tint: 'color', font: 'source', nameSize: 'classic', align: 'center', heads: 'rule', bullets: 'dot',
  accent: 'ink', ink: 'soft', minSize: 's75', density: 'normal', pixels: 'normal', mark: 'show', wash: 86,
};
const LABELS: Record<keyof Opts, string> = {
  place: 'Scene placement', backing: 'Behind the text', tint: 'Tint', font: 'Typeface', nameSize: 'Name size', align: 'Name alignment', heads: 'Section headings',
  bullets: 'Bullets', accent: 'Accent', ink: 'Body ink', minSize: 'Smallest text allowed', density: 'Spacing', pixels: 'Pixel size', mark: 'Scene number on page', wash: 'Wash',
};
// starting points; each one is just a set of picks you can keep adjusting
const PRESETS: Record<string, { label: string; note: string; opts: Partial<Opts> }> = {
  recruiter: { label: 'Recruiter-safe', note: 'Scene in a banner, nothing behind the text', opts: { place: 'banner', backing: 'none', ink: 'black', wash: 40, heads: 'caps', minSize: 's85', mark: 'hide', accent: 'ink' } },
  balanced: { label: 'Balanced', note: 'Full scene framing a paper card', opts: { place: 'full', backing: 'paper', wash: 45, accent: 'scene', heads: 'rule', ink: 'black', minSize: 's85' } },
  gallery: { label: 'Gallery', note: 'Art first, text on a halo', opts: { place: 'full', backing: 'halo', wash: 74, pixels: 'chunky', heads: 'pixel', bullets: 'square', accent: 'scene', nameSize: 'poster', font: 'mixed', align: 'left' } },
  hyper: { label: 'Max legibility', note: 'Atkinson Hyperlegible, spine art, 9.5pt floor', opts: { place: 'spine', backing: 'none', font: 'hyper', ink: 'black', wash: 30, minSize: 's95', density: 'tight', heads: 'bar', accent: 'navy', mark: 'hide' } },
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
const PIXEL_K = { fine: 0.5, normal: 1, chunky: 2 };
const DENSITY = { tight: { pt: 0.34, px: 0.45, pb: 0.28, lh: 1.12 }, normal: { pt: 0.42, px: 0.5, pb: 0.3, lh: 1.18 }, airy: { pt: 0.55, px: 0.62, pb: 0.4, lh: 1.3 } };
const FLOOR = { s75: 7.5, s85: 8.5, s95: 9.5 };
const NAME_EM = { classic: 2.6, large: 3.3, poster: 4.2 };
const BULLET = { dot: 'disc', dash: '"–  "', square: 'square', arrow: '"›  "' };
const INK: Record<Opts['ink'], RGB> = { soft: [23, 20, 15], black: [0, 0, 0] };
const ACCENTS: Record<Exclude<Opts['accent'], 'scene'>, RGB> = { ink: [23, 20, 15], orange: [196, 64, 12], navy: [31, 58, 95], forest: [38, 84, 52], plum: [94, 44, 84] };
const PAPER = 0.95; // opacity of the paper card
// placements where the text never sits on the scene
const CLEAR = new Set<Opts['place']>(['banner', 'spine']);

const rgb = (c: RGB) => `rgb(${c.join(', ')})`;
const lum = (c: RGB) => { const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a: RGB, b: RGB) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const over = (c: RGB, white: number): RGB => c.map((v) => Math.round(v * (1 - white) + 255 * white)) as RGB;

function paint(cv: HTMLCanvasElement, seed: number, phase: number | null, W: number, H: number) {
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
  // a dark-end pixel (5th percentile by luminance): the worst background a line of text could land on
  const sample: RGB[] = [];
  for (let i = 0; i < px.length; i += 7) sample.push([px[i] & 255, (px[i] >>> 8) & 255, (px[i] >>> 16) & 255]);
  sample.sort((a, c) => lum(a) - lum(c));
  return { S, sky, dark: sample[Math.floor(sample.length * 0.05)] };
}

function readOpts(q: URLSearchParams): Opts {
  const o = { ...DEFAULTS } as Record<string, string | number>;
  for (const k of Object.keys(OPTIONS)) { const v = q.get(k); if (v && v in OPTIONS[k as keyof typeof OPTIONS]) o[k] = v; }
  const w = Number(q.get('wash')); if (w >= 20 && w <= 98) o.wash = w;
  return o as Opts;
}

export default function ResumeView() {
  const screenCv = useRef<HTMLCanvasElement>(null);
  const sheetCv = useRef<HTMLCanvasElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const sheetBody = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<{ seed: number; phase: number } | null>(null);
  const [name, setName] = useState('');
  const [sky, setSky] = useState<RGB>([23, 20, 15]);
  const [dark, setDark] = useState<RGB>([40, 40, 40]);
  const [opts, setOpts] = useState<Opts>(DEFAULTS);
  const [tune, setTune] = useState(false);
  const [pageView, setPageView] = useState(false); // ?view=page shows the exact printed page on screen
  const [copied, setCopied] = useState(false);
  const [fitted, setFitted] = useState({ pt: 10.6, fits: true });
  const wantPrint = useRef(false);
  const floor = useRef(FLOOR[DEFAULTS.minSize]);
  floor.current = FLOOR[opts.minSize];

  // first load: scene from the landing (?scene=48213-740) or a fresh one, plus any saved picks
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    wantPrint.current = q.get('print') === '1';
    const parsed = parseSceneSlug(q.get('scene') ?? '');
    const seed = parsed?.seed ?? 1 + Math.floor(Math.random() * 99999);
    const S = PixelScene.generate(seed, 120, 64) as Scene;
    setScene({ seed, phase: parsed?.phase ?? S.phase0 });
    setOpts(readOpts(q));
    setTune(q.get('tune') === '1');
    setPageView(q.get('view') === 'page' || q.get('tune') === '1');
  }, []);

  // shrink the print type until everything fits on one page, but never below the chosen floor
  const fit = useCallback(() => {
    const body = sheetBody.current, page = sheet.current; if (!body || !page) return;
    const cs = getComputedStyle(body);
    const room = page.clientHeight - parseFloat(cs.marginTop) - parseFloat(cs.marginBottom) - 4;
    let fs = 10.6;
    body.style.fontSize = fs + 'pt';
    while (body.scrollHeight > room && fs > floor.current + 0.01) { fs -= 0.1; body.style.fontSize = fs.toFixed(1) + 'pt'; }
    setFitted({ pt: +fs.toFixed(1), fits: body.scrollHeight <= room });
  }, []);

  // draw both copies of the scene whenever the scene or pixel size changes
  useEffect(() => {
    if (!scene) return;
    const k = PIXEL_K[opts.pixels];
    const { S, sky, dark } = paint(sheetCv.current!, scene.seed, scene.phase, Math.round(170 / k), Math.round(220 / k));
    setName(S.name); setSky(sky); setDark(dark);
    const drawScreen = () => {
      const w = innerWidth, h = innerHeight, s = Math.max(1, Math.round((Math.min(w, h) / 165) * k));
      paint(screenCv.current!, scene.seed, scene.phase, Math.ceil(w / s), Math.ceil(h / s));
    };
    drawScreen();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(drawScreen, 150); };
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [scene, opts.pixels]);

  // refit when the type or spacing changes; keep the picks in the URL so the link reproduces the look
  useEffect(() => {
    if (!scene) return;
    document.fonts.ready.then(() => requestAnimationFrame(fit));
    const q = new URLSearchParams(location.search);
    q.set('scene', sceneSlug(scene.seed, scene.phase));
    for (const [k, v] of Object.entries(opts)) { if (v === DEFAULTS[k as keyof Opts]) q.delete(k); else q.set(k, String(v)); }
    q.delete('print');
    history.replaceState(null, '', location.pathname + '?' + q);
  }, [opts, scene, fit]);

  // arriving from the landing with ?print=1: open the print dialog once everything is laid out
  useEffect(() => {
    if (!scene) return;
    addEventListener('beforeprint', fit);
    if (wantPrint.current) document.fonts.ready.then(() => { fit(); setTimeout(() => print(), 350); });
    return () => removeEventListener('beforeprint', fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on first scene
  }, [scene === null]);

  const set = <K extends keyof Opts>(k: K, v: Opts[K]) => setOpts((o) => ({ ...o, [k]: v }));
  const slug = scene ? sceneSlug(scene.seed, scene.phase) : '';
  const ink = INK[opts.ink];
  const accent = opts.accent === 'scene' ? sky : ACCENTS[opts.accent];
  const f = FONTS[opts.font];
  const d = DENSITY[opts.density];
  const vars = {
    '--head': f.head, '--body': f.body, '--ink': rgb(ink), '--accent': rgb(accent), '--wash': String(opts.wash / 100),
    '--mask': MASKS[opts.place], '--tint': TINTS[opts.tint], '--align': opts.align, '--pt': d.pt + 'in', '--px': d.px + 'in', '--pb': d.pb + 'in', '--lh': String(d.lh),
    '--name': NAME_EM[opts.nameSize] + 'em', '--bullet': BULLET[opts.bullets], '--paper': String(PAPER),
  } as React.CSSProperties;

  // readability, measured on the printed page: worst background a line can land on vs. ink and accent
  const bg: RGB = CLEAR.has(opts.place) ? [255, 255, 255] : opts.backing === 'paper' ? over(over(dark, opts.wash / 100), PAPER) : over(dark, opts.wash / 100);
  const cBody = ratio(ink, bg), cHead = ratio(accent, bg);
  const contrast = Math.min(cBody, cHead);
  const grade = !fitted.fits ? 'over' : contrast >= 7 && fitted.pt >= 8.5 ? 'great' : contrast >= 4.5 && fitted.pt >= 8 ? 'ok' : 'low';
  const verdict = { great: 'Easy for people and parsers', ok: 'Readable. A recruiter will be fine', low: 'Art over legibility', over: "Doesn't fit one page" }[grade];

  const summary = () => {
    const picks = (Object.keys(LABELS) as (keyof Opts)[]).map((k) => `${LABELS[k].toLowerCase()}: ${k === 'wash' ? opts.wash + '%' : (OPTIONS as Record<string, Record<string, string>>)[k][opts[k] as string]}`);
    return `resume look → ${picks.join(' · ')} · scene ${slug} (${name}) · ${fitted.pt}pt, ${contrast.toFixed(1)}:1`;
  };
  const copyPicks = async () => { try { await navigator.clipboard.writeText(summary() + '\n' + location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div
      className={`${st.root} ${pageView ? st.pageView : ''} ${tune ? st.tuning : ''}`}
      style={vars}
      data-place={opts.place} data-backing={opts.backing} data-heads={opts.heads} data-bullets={opts.bullets}
    >
      <canvas ref={screenCv} className={st.bg} aria-hidden="true" />
      <div className={st.wash} aria-hidden="true" />

      <header className={st.bar}>
        <a href={slug ? `/s/${slug}` : '/'}>← j-m-s.dev</a>
        <span className={st.caption}>{scene ? `No. ${String(scene.seed).padStart(5, '0')} · ${name}` : ''}</span>
        <button className={st.hideSm} onClick={() => setTune((t) => !t)} aria-pressed={tune}>tune</button>
        <a href="/james_smith_resume.pdf" className={st.hideSm}>original PDF</a>
        <button className={st.primary} onClick={() => { fit(); print(); }}>Save as PDF</button>
      </header>

      <article className={st.screen}>
        <ResumeBody />
      </article>

      <div ref={sheet} className={st.sheet} aria-hidden="true">
        <canvas ref={sheetCv} className={st.sheetBg} />
        <div className={st.sheetWash} />
        <div ref={sheetBody} className={st.sheetBody}>
          <ResumeBody />
        </div>
        {scene && opts.mark === 'show' && <div className={st.sheetMark}>{`No. ${String(scene.seed).padStart(5, '0')} · ${name} · j-m-s.dev/s/${slug}`}</div>}
      </div>

      {tune && (
        <aside className={st.panel} aria-label="Tune the resume">
          <div className={st.panelHead}>
            <span>tune</span>
            <button onClick={() => setTune(false)} aria-label="Close">×</button>
          </div>

          <div className={st.meter} data-grade={grade}>
            <strong>{verdict}</strong>
            <span>Body text {fitted.pt}pt{fitted.pt < 8.5 ? ' (small)' : ''}</span>
            <span>Contrast {contrast.toFixed(1)}:1 {contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'below AA'}{cHead < cBody ? ' (accent is the weak spot)' : ''}</span>
            <span>Real text layer, one column, standard section names ✓</span>
          </div>

          <div className={st.group}>
            <span className={st.label}>Start from</span>
            <div className={st.presets}>
              {Object.entries(PRESETS).map(([k, p]) => (
                <button key={k} onClick={() => setOpts({ ...DEFAULTS, ...p.opts })}><b>{p.label}</b><span>{p.note}</span></button>
              ))}
            </div>
          </div>

          <div className={st.group}>
            <span className={st.label}>View</span>
            <div className={st.seg}>
              <button aria-pressed={pageView} onClick={() => setPageView(true)}>Printed page</button>
              <button aria-pressed={!pageView} onClick={() => setPageView(false)}>Screen</button>
            </div>
          </div>
          <div className={st.group}>
            <span className={st.label}>Scene</span>
            <div className={st.seg}>
              <button onClick={() => setScene({ seed: 1 + Math.floor(Math.random() * 99999), phase: 0.27 + Math.random() * 0.46 })}>↻ New scene</button>
            </div>
            <label className={st.slider}>
              <span>Time of day</span>
              <input type="range" min={0} max={999} value={scene ? Math.round(scene.phase * 1000) % 1000 : 0} onChange={(e) => scene && setScene({ ...scene, phase: +e.target.value / 1000 })} />
            </label>
          </div>
          <label className={st.slider}>
            <span>{LABELS.wash} · {opts.wash}% (lower shows more scene)</span>
            <input type="range" min={20} max={96} value={opts.wash} onChange={(e) => set('wash', +e.target.value)} />
          </label>
          {(Object.keys(OPTIONS) as (keyof typeof OPTIONS)[]).map((k) => (
            <div key={k} className={st.group}>
              <span className={st.label}>{LABELS[k]}</span>
              <div className={st.seg}>
                {Object.entries(OPTIONS[k]).map(([v, label]) => (
                  <button key={v} aria-pressed={opts[k] === v} onClick={() => set(k, v as never)}>{label}</button>
                ))}
              </div>
            </div>
          ))}
          <div className={st.panelFoot}>
            <button onClick={() => { setOpts(DEFAULTS); }}>Reset</button>
            <button className={st.primary} onClick={copyPicks}>{copied ? 'Copied ✓' : 'Copy my picks'}</button>
          </div>
        </aside>
      )}
    </div>
  );
}

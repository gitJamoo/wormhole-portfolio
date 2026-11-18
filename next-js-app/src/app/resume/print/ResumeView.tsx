'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { parseSceneSlug, sceneSlug } from '@/lib/pixel-scene/share';
import ResumeBody from './ResumeBody';
import st from './resume.module.css';

type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string };

/* ---- the knobs (?tune=1 shows the panel; every pick is kept in the URL) ---- */
const OPTIONS = {
  place: { full: 'Full page', bottom: 'Bottom band', top: 'Top band', fade: 'Soft vignette', corner: 'Corner' },
  tint: { color: 'Color', mono: 'Mono', sepia: 'Sepia', blueprint: 'Blueprint', dusk: 'Dusk' },
  font: { source: 'Source Serif', garamond: 'Garamond', mixed: 'Display + Geist', geist: 'Geist', sf: 'SF Pro', mono: 'Mono' },
  align: { center: 'Centered', left: 'Left' },
  accent: { ink: 'Ink', scene: 'From scene', orange: 'OSU orange', navy: 'Navy' },
  pixels: { fine: 'Fine', normal: 'Normal', chunky: 'Chunky' },
  density: { tight: 'Tight', normal: 'Normal', airy: 'Airy' },
} as const;
type Opts = { [K in keyof typeof OPTIONS]: keyof (typeof OPTIONS)[K] } & { wash: number };
const DEFAULTS: Opts = { place: 'full', tint: 'color', font: 'source', align: 'center', accent: 'ink', pixels: 'normal', density: 'normal', wash: 86 };
const LABELS: Record<keyof Opts, string> = { place: 'Scene placement', tint: 'Tint', font: 'Typeface', align: 'Name', accent: 'Accent', pixels: 'Pixel size', density: 'Spacing', wash: 'Wash' };

const FONTS: Record<Opts['font'], { head: string; body: string }> = {
  source: { head: 'var(--serif), Georgia, serif', body: 'var(--serif), Georgia, serif' },
  garamond: { head: 'var(--garamond), Garamond, serif', body: 'var(--garamond), Garamond, serif' },
  mixed: { head: 'var(--display), Georgia, serif', body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' },
  geist: { head: 'var(--font-geist-sans), -apple-system, system-ui, sans-serif', body: 'var(--font-geist-sans), -apple-system, system-ui, sans-serif' },
  sf: { head: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif', body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' },
  mono: { head: 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace', body: 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace' },
};
const MASKS: Record<Opts['place'], string> = {
  full: 'none',
  bottom: 'linear-gradient(to top, #000 0%, #000 22%, transparent 58%)',
  top: 'linear-gradient(to bottom, #000 0%, #000 18%, transparent 50%)',
  fade: 'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 35%, #000 100%)',
  corner: 'radial-gradient(circle at 100% 100%, #000 0%, #000 18%, transparent 55%)',
};
const TINTS: Record<Opts['tint'], string> = {
  color: 'none', mono: 'grayscale(1) contrast(1.1)', sepia: 'sepia(.85) saturate(1.2)', blueprint: 'grayscale(1) sepia(1) hue-rotate(175deg) saturate(2.2)', dusk: 'hue-rotate(-25deg) saturate(1.35)',
};
const PIXEL_K = { fine: 0.5, normal: 1, chunky: 2 };
const DENSITY = { tight: { pad: '0.34in 0.45in 0.28in', lh: 1.12 }, normal: { pad: '0.42in 0.5in 0.3in', lh: 1.18 }, airy: { pad: '0.55in 0.62in 0.4in', lh: 1.3 } };

function paint(cv: HTMLCanvasElement, seed: number, phase: number | null, W: number, H: number) {
  const S = PixelScene.generate(seed, W, H) as Scene;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d', { alpha: false })!;
  const img = ctx.createImageData(W, H);
  const px = new Uint32Array(img.data.buffer);
  PixelScene.render(S, px, 2.3, phase ?? S.phase0, {});
  ctx.putImageData(img, 0, 0);
  // average sky color (top third), darkened enough to read as text on white
  let r = 0, g = 0, b = 0; const n = W * Math.floor(H / 3);
  for (let i = 0; i < n; i++) { r += px[i] & 255; g += (px[i] >>> 8) & 255; b += (px[i] >>> 16) & 255; }
  const k = 0.5 / 255;
  const sky = `rgb(${Math.round((r / n) * k * 255 * 0.9)}, ${Math.round((g / n) * k * 255 * 0.9)}, ${Math.round((b / n) * k * 255 * 0.9)})`;
  return { S, sky };
}

function readOpts(q: URLSearchParams): Opts {
  const o = { ...DEFAULTS } as Record<string, string | number>;
  for (const k of Object.keys(OPTIONS)) { const v = q.get(k); if (v && v in OPTIONS[k as keyof typeof OPTIONS]) o[k] = v; }
  const w = Number(q.get('wash')); if (w >= 50 && w <= 98) o.wash = w;
  return o as Opts;
}

export default function ResumeView() {
  const screenCv = useRef<HTMLCanvasElement>(null);
  const sheetCv = useRef<HTMLCanvasElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const sheetBody = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<{ seed: number; phase: number } | null>(null);
  const [name, setName] = useState('');
  const [sky, setSky] = useState('#17140f');
  const [opts, setOpts] = useState<Opts>(DEFAULTS);
  const [tune, setTune] = useState(false);
  const [pageView, setPageView] = useState(false); // ?view=page shows the exact printed page on screen
  const [copied, setCopied] = useState(false);
  const wantPrint = useRef(false);

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

  // shrink the print type until everything fits on one page
  const fit = useCallback(() => {
    const body = sheetBody.current, page = sheet.current; if (!body || !page) return;
    let fs = 10.6;
    body.style.fontSize = fs + 'pt';
    while (body.scrollHeight > page.clientHeight - 4 && fs > 7.4) { fs -= 0.1; body.style.fontSize = fs.toFixed(1) + 'pt'; }
  }, []);

  // draw both copies of the scene whenever the scene or pixel size changes
  useEffect(() => {
    if (!scene) return;
    const k = PIXEL_K[opts.pixels];
    const { S, sky } = paint(sheetCv.current!, scene.seed, scene.phase, Math.round(170 / k), Math.round(220 / k));
    setName(S.name); setSky(sky);
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
    document.fonts.ready.then(fit);
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
  const accent = { ink: '#17140f', scene: sky, orange: '#c4400c', navy: '#1f3a5f' }[opts.accent];
  const f = FONTS[opts.font];
  const vars = {
    '--head': f.head, '--body': f.body, '--accent': accent, '--wash': String(opts.wash / 100),
    '--mask': MASKS[opts.place], '--tint': TINTS[opts.tint], '--align': opts.align, '--pad': DENSITY[opts.density].pad, '--lh': String(DENSITY[opts.density].lh),
  } as React.CSSProperties;

  const summary = () => {
    const picks = (Object.keys(LABELS) as (keyof Opts)[]).map((k) => `${LABELS[k].toLowerCase()}: ${k === 'wash' ? opts.wash + '%' : (OPTIONS as Record<string, Record<string, string>>)[k][opts[k] as string]}`);
    return `resume look → ${picks.join(' · ')} · scene ${slug} (${name})`;
  };
  const copyPicks = async () => { try { await navigator.clipboard.writeText(summary() + '\n' + location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className={`${st.root} ${pageView ? st.pageView : ''} ${tune ? st.tuning : ''}`} style={vars}>
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
        {scene && <div className={st.sheetMark}>{`No. ${String(scene.seed).padStart(5, '0')} · ${name} · j-m-s.dev/s/${slug}`}</div>}
      </div>

      {tune && (
        <aside className={st.panel} aria-label="Tune the resume">
          <div className={st.panelHead}>
            <span>tune</span>
            <button onClick={() => setTune(false)} aria-label="Close">×</button>
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
            <input type="range" min={55} max={96} value={opts.wash} onChange={(e) => set('wash', +e.target.value)} />
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

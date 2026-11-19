'use client';

import { printResume } from "./printResume";
import { useCallback, useEffect, useRef, useState } from 'react';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { parseSceneSlug, sceneSlug } from '@/lib/pixel-scene/share';
import ResumeBody from './ResumeBody';
import ResumeSheet, { type Measure } from './ResumeSheet';
import { CLASSIC, DEFAULTS, LABELS, lookAttrs, lookVars, OPTIONS, paint, PIXEL_K, PRESETS, readability, readOpts, type Opts } from './look';
import st from './resume.module.css';

/* /resume/print — the resume over the visitor's scene (or Classic: plain paper).
   Printing only starts from Save as PDF. ?tune=1 opens the (unlisted) tuning panel. */
export default function ResumeView() {
  const screenCv = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<{ seed: number; phase: number } | null>(null);
  const [opts, setOpts] = useState<Opts>(DEFAULTS);
  const [classic, setClassic] = useState(false);
  const [tune, setTune] = useState(false);
  const [pageView, setPageView] = useState(false); // ?view=page shows the exact printed page on screen
  const [copied, setCopied] = useState(false);
  const [m, setM] = useState<Measure | null>(null);
  const look = classic ? CLASSIC : opts;

  // first load: scene from the landing (?scene=48213-740) or a fresh one, plus any saved picks
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const parsed = parseSceneSlug(q.get('scene') ?? '');
    const seed = parsed?.seed ?? 1 + Math.floor(Math.random() * 99999);
    const S = PixelScene.generate(seed, 120, 64) as unknown as { phase0: number };
    setScene({ seed, phase: parsed?.phase ?? S.phase0 });
    setClassic(q.get('look') === 'classic');
    setOpts(readOpts(new URLSearchParams([...q].filter(([k]) => k !== 'look'))));
    setTune(q.get('tune') === '1');
    setPageView(q.get('view') === 'page' || q.get('tune') === '1');
  }, []);

  // the screen copy of the scene, sized to this device
  useEffect(() => {
    if (!scene) return;
    const k = PIXEL_K[look.pixels];
    const draw = () => {
      const w = innerWidth, h = innerHeight, s = Math.max(1, Math.round((Math.min(w, h) / 165) * k));
      paint(screenCv.current!, scene.seed, scene.phase, Math.ceil(w / s), Math.ceil(h / s));
    };
    draw();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(draw, 150); };
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [scene, look.pixels]);

  // keep the look in the URL so the link reproduces it
  useEffect(() => {
    if (!scene) return;
    const q = new URLSearchParams(location.search);
    q.set('scene', sceneSlug(scene.seed, scene.phase));
    for (const [k, v] of Object.entries(opts)) { if (v === DEFAULTS[k as keyof Opts]) q.delete(k); else q.set(k, String(v)); }
    if (classic) q.set('look', 'classic'); else q.delete('look');
    q.delete('print');
    history.replaceState(null, '', location.pathname + '?' + q);
  }, [opts, classic, scene]);

  const onMeasure = useCallback((x: Measure) => setM(x), []);

  const set = <K extends keyof Opts>(k: K, v: Opts[K]) => { setClassic(false); setOpts((o) => ({ ...o, [k]: v })); };
  const slug = scene ? sceneSlug(scene.seed, scene.phase) : '';
  const r = m ? readability(look, m.sky, m.dark) : null;
  const grade = !m || !r ? 'ok' : !m.fits ? 'over' : r.contrast >= 7 && m.pt >= 8.5 ? 'great' : r.contrast >= 4.5 && m.pt >= 8 ? 'ok' : 'low';
  const verdict = { great: 'Easy for people and parsers', ok: 'Readable. A recruiter will be fine', low: 'Art over legibility', over: "Doesn't fit one page" }[grade];

  const summary = () => {
    const picks = (Object.keys(LABELS) as (keyof Opts)[]).map((k) => `${LABELS[k].toLowerCase()}: ${k === 'wash' ? look.wash + '%' : (OPTIONS as Record<string, Record<string, string>>)[k][look[k] as string]}`);
    return `resume look → ${picks.join(' · ')} · scene ${slug} (${m?.name ?? ''})${m && r ? ` · ${m.pt}pt, ${r.contrast.toFixed(1)}:1` : ''}`;
  };
  const copyPicks = async () => { try { await navigator.clipboard.writeText(summary() + '\n' + location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className={`${st.root} ${pageView ? st.pageView : ''} ${tune ? st.tuning : ''}`} style={lookVars(look, m?.sky)} {...lookAttrs(look)}>
      <canvas ref={screenCv} className={st.bg} aria-hidden="true" />
      <div className={st.wash} aria-hidden="true" />

      <header className={st.bar}>
        <a href={slug ? `/s/${slug}` : '/'}>← j-m-s.dev</a>
        <span className={st.caption}>{scene && m && !classic ? `No. ${String(scene.seed).padStart(5, '0')} · ${m.name}` : ''}</span>
        <div className={st.toggle} role="group" aria-label="Resume style">
          <button aria-pressed={!classic} onClick={() => setClassic(false)}>Scene</button>
          <button aria-pressed={classic} onClick={() => setClassic(true)}>Classic</button>
        </div>
        <button className={st.primary} onClick={printResume}>Save as PDF</button>
      </header>

      <article className={st.screen}>
        <ResumeBody />
      </article>

      {scene && <ResumeSheet seed={scene.seed} phase={scene.phase} opts={look} visible={pageView} onMeasure={onMeasure} />}

      {tune && (
        <aside className={st.panel} aria-label="Tune the resume">
          <div className={st.panelHead}>
            <span>tune</span>
            <button onClick={() => setTune(false)} aria-label="Close">×</button>
          </div>

          {m && r && (
            <div className={st.meter} data-grade={grade}>
              <strong>{verdict}</strong>
              <span>Body text {m.pt}pt{m.pt < 8.5 ? ' (small)' : ''}</span>
              <span>Contrast {r.contrast.toFixed(1)}:1 {r.contrast >= 7 ? 'AAA' : r.contrast >= 4.5 ? 'AA' : 'below AA'}</span>
              <span>Real text layer, one column, standard section names ✓</span>
            </div>
          )}

          <div className={st.group}>
            <span className={st.label}>Start from</span>
            <div className={st.presets}>
              {Object.entries(PRESETS).map(([k, p]) => (
                <button key={k} onClick={() => { setClassic(false); setOpts({ ...DEFAULTS, ...p.opts }); }}><b>{p.label}</b><span>{p.note}</span></button>
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
            <span>{LABELS.wash} · {look.wash}% (lower shows more scene)</span>
            <input type="range" min={20} max={96} value={look.wash} onChange={(e) => set('wash', +e.target.value)} />
          </label>
          {(Object.keys(OPTIONS) as (keyof typeof OPTIONS)[]).map((k) => (
            <div key={k} className={st.group}>
              <span className={st.label}>{LABELS[k]}</span>
              <div className={st.seg}>
                {Object.entries(OPTIONS[k]).map(([v, label]) => (
                  <button key={v} aria-pressed={look[k] === v} onClick={() => set(k, v as never)}>{label}</button>
                ))}
              </div>
            </div>
          ))}
          <div className={st.panelFoot}>
            <button onClick={() => { setClassic(false); setOpts(DEFAULTS); }}>Reset</button>
            <button className={st.primary} onClick={copyPicks}>{copied ? 'Copied ✓' : 'Copy my picks'}</button>
          </div>
        </aside>
      )}
    </div>
  );
}

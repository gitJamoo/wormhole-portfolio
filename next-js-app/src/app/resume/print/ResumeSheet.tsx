'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { sceneSlug } from '@/lib/pixel-scene/share';
import ResumeBody from './ResumeBody';
import { resumeFonts } from './fonts';
import { FLOOR, lookAttrs, lookVars, paint, PIXEL_K, type Opts, type RGB } from './look';
import st from './resume.module.css';

export type Measure = { pt: number; fits: boolean; sky: RGB; dark: RGB; name: string };

/* One Letter page: the scene painted at page proportions, washed, with the resume on top.
   The type shrinks until it fits one page (never below the chosen floor). This is what prints. */
export default function ResumeSheet({ seed, phase, opts, visible = false, onMeasure }: {
  seed: number; phase: number; opts: Opts; visible?: boolean; onMeasure?: (m: Measure) => void;
}) {
  const sheet = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [art, setArt] = useState<{ sky: RGB; dark: RGB; name: string } | null>(null);
  const floor = useRef(FLOOR[opts.minSize]); floor.current = FLOOR[opts.minSize];
  const report = useRef(onMeasure); report.current = onMeasure;
  const artNow = useRef(art); artNow.current = art;

  const fit = useCallback(() => {
    const b = body.current, page = sheet.current, a = artNow.current; if (!b || !page || !a) return;
    const cs = getComputedStyle(b);
    const room = page.clientHeight - parseFloat(cs.marginTop) - parseFloat(cs.marginBottom) - 4;
    let fs = 10.6;
    b.style.fontSize = fs + 'pt';
    while (b.scrollHeight > room && fs > floor.current + 0.01) { fs -= 0.1; b.style.fontSize = fs.toFixed(1) + 'pt'; }
    report.current?.({ pt: +fs.toFixed(1), fits: b.scrollHeight <= room, ...a });
  }, []);

  useEffect(() => {
    const k = PIXEL_K[opts.pixels];
    const { S, sky, dark } = paint(cv.current!, seed, phase, Math.round(170 / k), Math.round(220 / k));
    setArt({ sky, dark, name: S.name });
  }, [seed, phase, opts.pixels]);

  useEffect(() => {
    if (!art) return;
    let live = true;
    document.fonts.ready.then(() => requestAnimationFrame(() => live && fit()));
    return () => { live = false; };
  }, [art, opts, fit]);

  useEffect(() => { addEventListener('beforeprint', fit); return () => removeEventListener('beforeprint', fit); }, [fit]);

  return (
    <div ref={sheet} className={`${st.sheet} ${visible ? st.sheetVisible : ''} ${resumeFonts}`} style={lookVars(opts, art?.sky)} {...lookAttrs(opts)} aria-hidden={!visible}>
      <canvas ref={cv} className={st.sheetBg} />
      <div className={st.sheetWash} />
      <div ref={body} className={st.sheetBody}>
        <ResumeBody />
      </div>
      {art && opts.mark === 'show' && <div className={st.sheetMark}>{`No. ${String(seed).padStart(5, '0')} · ${art.name} · j-m-s.dev/s/${sceneSlug(seed, phase)}`}</div>}
    </div>
  );
}

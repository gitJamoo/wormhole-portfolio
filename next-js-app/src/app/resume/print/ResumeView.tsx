'use client';

import { useEffect, useRef, useState } from 'react';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { parseSceneSlug, sceneSlug } from '@/lib/pixel-scene/share';
import ResumeBody from './ResumeBody';
import st from './resume.module.css';

type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string };

function paint(cv: HTMLCanvasElement, seed: number, phase: number | null, W: number, H: number) {
  const S = PixelScene.generate(seed, W, H) as Scene;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d', { alpha: false })!;
  const img = ctx.createImageData(W, H);
  PixelScene.render(S, new Uint32Array(img.data.buffer), 2.3, phase ?? S.phase0, {});
  ctx.putImageData(img, 0, 0);
  return S;
}

export default function ResumeView() {
  const screenCv = useRef<HTMLCanvasElement>(null);
  const sheetCv = useRef<HTMLCanvasElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const sheetBody = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<{ seed: number; phase: number; name: string } | null>(null);
  const [pageView, setPageView] = useState(false); // ?view=page shows the exact printed page on screen

  useEffect(() => {
    // The scene comes from the landing page (?scene=48213-740); open directly and you get a fresh one.
    const q = new URLSearchParams(location.search);
    setPageView(q.get('view') === 'page');
    const parsed = parseSceneSlug(q.get('scene') ?? '');
    const seed = parsed?.seed ?? 1 + Math.floor(Math.random() * 99999);

    // the print copy: generated at Letter proportions so the landscape is composed for the page
    const S = paint(sheetCv.current!, seed, parsed?.phase ?? null, 170, 220);
    const phase = parsed?.phase ?? S.phase0;
    setInfo({ seed, phase, name: S.name });

    // the screen copy: generated for this device's viewport
    const drawScreen = () => {
      const w = innerWidth, h = innerHeight, k = Math.max(2, Math.round(Math.min(w, h) / 165));
      paint(screenCv.current!, seed, phase, Math.ceil(w / k), Math.ceil(h / k));
    };
    drawScreen();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(drawScreen, 150); };
    addEventListener('resize', onResize);

    // shrink the print type until everything fits on one page
    const fit = () => {
      const body = sheetBody.current, page = sheet.current; if (!body || !page) return;
      let fs = 10.4;
      body.style.fontSize = fs + 'pt';
      while (body.scrollHeight > page.clientHeight - 4 && fs > 7.6) { fs -= 0.1; body.style.fontSize = fs.toFixed(1) + 'pt'; }
    };
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      fit();
      if (q.get('print') === '1') {
        q.delete('print');
        history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
        setTimeout(() => print(), 350);
      }
    });
    addEventListener('beforeprint', fit);
    return () => { cancelled = true; removeEventListener('resize', onResize); removeEventListener('beforeprint', fit); };
  }, []);

  const slug = info ? sceneSlug(info.seed, info.phase) : '';
  return (
    <div className={`${st.root} ${pageView ? st.pageView : ''}`}>
      <canvas ref={screenCv} className={st.bg} aria-hidden="true" />
      <div className={st.wash} aria-hidden="true" />

      <header className={st.bar}>
        <a href={slug ? `/s/${slug}` : '/'}>← j-m-s.dev</a>
        <span className={st.caption}>{info ? `No. ${String(info.seed).padStart(5, '0')} · ${info.name}` : ''}</span>
        <a href="/james_smith_resume.pdf" className={st.hideSm}>original PDF</a>
        <button className={st.primary} onClick={() => print()}>Save as PDF</button>
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
        {info && <div className={st.sheetMark}>{`No. ${String(info.seed).padStart(5, '0')} · ${info.name} · j-m-s.dev/s/${slug}`}</div>}
      </div>
    </div>
  );
}

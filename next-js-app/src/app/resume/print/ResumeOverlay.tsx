'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { sceneSlug } from '@/lib/pixel-scene/share';
import ResumeSheet from './ResumeSheet';
import { CLASSIC, DEFAULTS } from './look';
import o from './overlay.module.css';

/* The resume, laid over whatever page you're on (the landing), drawn from the scene you're looking at.
   It opens the print dialog as soon as the page is laid out; printing shows only the sheet. */
export default function ResumeOverlay({ seed, phase, onClose }: { seed: number; phase: number; onClose: () => void }) {
  const [classic, setClassic] = useState(false);
  const [scale, setScale] = useState(0.5);
  const printed = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-resume-print', '');
    const prev = html.style.overflow; html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const size = () => setScale(Math.min((innerWidth - 32) / 816, (innerHeight - 92) / 1056, 1));
    size();
    addEventListener('keydown', onKey); addEventListener('resize', size);
    return () => { html.removeAttribute('data-resume-print'); html.style.overflow = prev; removeEventListener('keydown', onKey); removeEventListener('resize', size); };
  }, [onClose]);

  const onMeasure = useCallback(() => {
    if (printed.current) return;
    printed.current = true;
    setTimeout(() => print(), 250);
  }, []);

  const full = `/resume/print?scene=${sceneSlug(seed, phase)}${classic ? '&look=classic' : ''}`;

  return createPortal(
    <div className={o.overlay} data-resume-portal="" role="dialog" aria-modal="true" aria-label="Resume" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={o.bar}>
        <div className={o.toggle} role="group" aria-label="Resume style">
          <button aria-pressed={!classic} onClick={() => setClassic(false)}>Scene</button>
          <button aria-pressed={classic} onClick={() => setClassic(true)}>Classic</button>
        </div>
        <a href={full} className={o.quiet}>Full page</a>
        <button className={o.primary} onClick={() => print()}>Save as PDF</button>
        <button className={o.close} onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className={o.holder} style={{ width: 816 * scale, height: 1056 * scale }}>
        <div className={o.scaler} style={{ transform: `scale(${scale})` }}>
          <ResumeSheet seed={seed} phase={phase} opts={classic ? CLASSIC : DEFAULTS} visible onMeasure={onMeasure} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

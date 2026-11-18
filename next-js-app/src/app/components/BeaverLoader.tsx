'use client';

import { useEffect, useRef } from 'react';
import { Beaver } from '@/lib/pixel-scene/beaver';

type Chip = { x: number; y: number; vx: number; vy: number; life: number; c: number };

/** 32x32 pixel beaver chomping a log. Used for every loading state on the site. */
export default function BeaverLoader({ size = 128, label = 'gnawing on it…', className = '' }: { size?: number; label?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const frames = Array.from({ length: Beaver.frames }, (_, i) => Beaver.beaverFrame(i));
    const img = ctx.createImageData(32, 32);
    const px = new Uint32Array(img.data.buffer);
    const chips: Chip[] = [];
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let f = 0;
    const tick = () => {
      const bi = f % frames.length;
      px.set(frames[bi]);
      if (bi === 3) for (let k = 0; k < 3; k++) chips.push({ x: 24 + Math.random() * 2, y: 21, vx: Math.random() * 1.6 - 0.2, vy: -1.2 - Math.random() * 1.1, life: 7, c: Beaver.CHIP[k % 3] });
      for (let i = chips.length - 1; i >= 0; i--) {
        const c = chips[i];
        c.x += c.vx; c.y += c.vy; c.vy += 0.38; c.life--;
        const x = Math.round(c.x), y = Math.round(c.y);
        if (c.life <= 0 || x < 0 || x > 31 || y > 31) { chips.splice(i, 1); continue; }
        if (y >= 0) px[y * 32 + x] = c.c;
      }
      ctx.putImageData(img, 0, 0);
      f++;
    };
    tick();
    if (still) return;
    const id = setInterval(tick, 95);
    return () => clearInterval(id);
  }, []);

  return (
    <div role="status" aria-label="Loading" className={`flex flex-col items-center gap-3 ${className}`}>
      <canvas ref={ref} width={32} height={32} style={{ width: size, height: size, imageRendering: 'pixelated' }} />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
}

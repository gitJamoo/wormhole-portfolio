'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { Check, Clipboard } from 'lucide-react';
import BeaverLoader from './BeaverLoader';
import AnthropicIcon from './icons/AnthropicIcon';
import OpenAIIcon from './icons/OpenAIIcon';

/* The brag sheet agents read to learn about James. */
const BRAG_REPO = 'github.com/gitJamoo/brag-sheet';
const AGENT_PROMPT = `Read https://${BRAG_REPO} and tell me about James M. Smith.`;
const CLAUDE_URL = `https://claude.ai/new?q=${encodeURIComponent(AGENT_PROMPT)}`;
const CODEX_URL = `codex://new?prompt=${encodeURIComponent(AGENT_PROMPT)}`;
const CODEX_FALLBACK = `https://chatgpt.com/?q=${encodeURIComponent(AGENT_PROMPT)}`;
const DAY = 300; // seconds for a full day at 1x; time lingers around golden hour

const FONTS = {
  sf: { label: 'SF Pro', css: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif' },
  geist: { label: 'Geist', css: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' },
  serif: { label: 'New York', css: 'ui-serif, "New York", "Iowan Old Style", Georgia, serif' },
  mono: { label: 'Mono', css: 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace' },
} as const;
const SIZES = { s: 0.85, m: 1, l: 1.2, xl: 1.4 } as const;
type FontKey = keyof typeof FONTS;
type SizeKey = keyof typeof SIZES;
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, var(--font-geist-mono), Menlo, monospace';

type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string };

export default function PixelLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef<{ S?: Scene; seed: number; phase: number | null; t: number; speed: number; img?: ImageData; buf?: Uint32Array }>({ seed: 0, phase: null, t: 0, speed: 1 });
  const [ready, setReady] = useState(false);
  const [caption, setCaption] = useState({ no: '', name: '', tod: '' });
  const [copied, setCopied] = useState(false);
  const [fast, setFast] = useState(false);
  const [lab, setLab] = useState(false);
  const [font, setFont] = useState<FontKey>('mono');
  // null = responsive default: M on desktop, XL on phones
  const [size, setSize] = useState<SizeKey | null>(null);

  const draw = useCallback(() => {
    const s = st.current, cv = canvasRef.current;
    if (!s.S || !s.img || !s.buf || !cv) return;
    PixelScene.render(s.S, s.buf, s.t, s.phase!);
    cv.getContext('2d', { alpha: false })!.putImageData(s.img, 0, 0);
    const tod = PixelScene.timeWord(s.phase!);
    setCaption((c) => (c.tod === tod ? c : { ...c, tod }));
  }, []);

  const setup = useCallback((seed: number, phase: number | null) => {
    const s = st.current, cv = canvasRef.current;
    if (!cv) return;
    const w = innerWidth, h = innerHeight, k = Math.max(2, Math.round(Math.min(w, h) / 165));
    const W = Math.ceil(w / k), H = Math.ceil(h / k);
    s.seed = seed;
    s.S = PixelScene.generate(seed, W, H) as Scene;
    cv.width = W; cv.height = H;
    s.img = cv.getContext('2d', { alpha: false })!.createImageData(W, H);
    s.buf = new Uint32Array(s.img.data.buffer);
    s.phase = phase ?? s.phase ?? s.S.phase0;
    setCaption({ no: 'No. ' + String(seed).padStart(5, '0'), name: s.S.name, tod: '' });
    draw();
  }, [draw]);

  useEffect(() => {
    const s = st.current;
    const m = location.hash.match(/^#(\d{1,5})(?:-(\d{1,3}))?$/);
    setLab(new URLSearchParams(location.search).has('lab'));
    setup(m ? +m[1] : 1 + Math.floor(Math.random() * 99999), m && m[2] ? +m[2] / 1000 : null);
    setReady(true);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, last = 0, acc = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      acc += Math.min(0.1, (now - last) / 1000); last = now;
      if (acc < 1 / 24) return; // pixel art doesn't need 60fps
      s.t += acc; s.phase = PixelScene.advance(s.phase!, acc * s.speed, DAY); acc = 0;
      draw();
    };
    const play = () => { if (reduce || raf) return; last = performance.now(); raf = requestAnimationFrame(frame); };
    const pause = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? pause() : play());
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => setup(s.seed, s.phase), 120); };
    play();
    document.addEventListener('visibilitychange', onVis);
    addEventListener('resize', onResize);
    return () => { pause(); document.removeEventListener('visibilitychange', onVis); removeEventListener('resize', onResize); };
  }, [setup, draw]);

  const newScene = () => {
    st.current.phase = null;
    setup(1 + Math.floor(Math.random() * 99999), null);
    history.replaceState(null, '', location.pathname + location.search);
  };
  const toggleFast = () => { st.current.speed = st.current.speed === 1 ? 40 : 1; setFast(st.current.speed > 1); };
  const share = async () => {
    const s = st.current;
    const url = `${location.origin}/#${s.seed}-${String(Math.round(s.phase! * 1000) % 1000).padStart(3, '0')}`;
    try { if (navigator.share) { await navigator.share({ title: s.S?.name, url }); return; } } catch (e) { if ((e as Error).name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(url); } catch {}
  };
  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(AGENT_PROMPT); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };
  // codex:// only works with the Codex desktop app installed; if nothing takes focus, fall back to ChatGPT.
  const openCodex = () => {
    let left = false;
    const onBlur = () => { left = true; };
    addEventListener('blur', onBlur, { once: true });
    location.href = CODEX_URL;
    setTimeout(() => { removeEventListener('blur', onBlur); if (!left && !document.hidden) window.open(CODEX_FALLBACK, '_blank', 'noopener'); }, 1200);
  };
  // Each element eases in after the scene is up: opacity + a little lift + blur clearing.
  const rise = (delay: number) => ({
    transition: 'opacity 1.1s ease, transform 1.1s cubic-bezier(.2,.7,.2,1), filter 1.1s ease',
    transitionDelay: `${delay}ms`,
    opacity: ready ? 1 : 0,
    transform: ready ? 'none' : 'translateY(8px)',
    filter: ready ? 'none' : 'blur(6px)',
  });

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#14110f] text-[#f6ecdf]" style={{ fontFamily: FONTS[font].css }}>
      <canvas
        ref={canvasRef}
        aria-label="A generated pixel-art landscape that changes with every visit"
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated', opacity: ready ? 1 : 0, transition: 'opacity .6s ease' }}
      />

      {/* Shown only if the scene is slow to start (CSS delay), so fast loads never flash it. */}
      {!ready && (
        <div className="absolute inset-0 grid place-items-center opacity-0 animate-[beaver-in_.2s_ease-out_.15s_forwards]">
          <BeaverLoader />
        </div>
      )}

      <main
        className="absolute inset-x-0 top-0 flex flex-col items-start gap-4 max-sm:items-center max-sm:text-center [--k:1] max-sm:[--k:1.4]"
        style={{
          padding: 'max(12vh, calc(24px + env(safe-area-inset-top))) max(6vw, 16px) 0',
          ...(size ? ({ '--k': SIZES[size] } as React.CSSProperties) : {}),
        }}
      >
        <h1
          className="font-semibold tracking-tight leading-none rounded-[12px] border border-white/[.1] bg-[#0e0d12]/35 backdrop-blur-md px-[.4em] py-[.22em] max-w-full"
          style={{ fontSize: 'min(clamp(calc(34px * var(--k)), calc(5.4vw * var(--k)), calc(68px * var(--k))), 9.6vw)', ...rise(900) }}
        >
          James M. Smith
        </h1>

        <div className="inline-flex flex-col items-stretch gap-2 max-w-full">
          <p className="text-[#f6ecdf]/85 [text-shadow:0_1px_10px_rgba(0,0,0,.35)]" style={{ fontSize: 'calc(15px * var(--k))', ...rise(1300) }}>
            Ask your agent about me:
          </p>

          <div
            className="flex items-center gap-3 rounded-[10px] border border-white/[.16] bg-[#0e0d12]/60 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,.18)] pl-4 pr-2 py-2 max-w-full"
            style={{ fontFamily: MONO, fontSize: 'calc(14px * min(var(--k), 1.15))', ...rise(1550) }}
          >
            <a href={`https://${BRAG_REPO}`} target="_blank" rel="noopener noreferrer" className="min-w-0 truncate text-left hover:text-white" data-ph-capture-attribute-cta="brag_sheet">
              <span className="text-white/40 select-none">$ </span>
              <span className="max-sm:hidden">tell me about </span>
              <span className="underline decoration-white/25 underline-offset-4">{BRAG_REPO.replace('github.com/', '')}</span>
            </a>
            <div className="flex shrink-0 items-center gap-1.5 border-l border-white/[.12] pl-2.5 pr-1">
              <a
                href={CLAUDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-6 place-items-center rounded-md text-[#f6ecdf]/80 hover:bg-white/[.08] hover:text-[#e8a07a] active:scale-90 transition"
                aria-label="Ask Claude about me"
                title="Ask Claude"
                data-ph-capture-attribute-cta="ask_claude"
              >
                <AnthropicIcon className="size-4 shrink-0" />
              </a>
              <button
                onClick={openCodex}
                className="grid size-6 place-items-center rounded-md text-[#f6ecdf]/80 hover:bg-white/[.08] hover:text-white active:scale-90 transition"
                aria-label="Ask Codex about me"
                title="Ask Codex"
                data-ph-capture-attribute-cta="ask_codex"
              >
                <OpenAIIcon className="size-4 shrink-0" />
              </button>
              <button
                onClick={copyPrompt}
                className={`grid size-6 place-items-center rounded-md transition-[transform,background-color,color] duration-200 hover:bg-white/[.08] active:scale-90 ${copied ? 'text-[#9be7b0] scale-110' : 'text-[#b9c6ff]'}`}
                aria-label={copied ? 'Copied' : 'Copy a prompt for your agent'}
                title="Copy prompt"
                data-ph-capture-attribute-cta="copy_agent_prompt"
              >
                {copied ? <Check size={16} strokeWidth={2.5} /> : <Clipboard size={16} />}
              </button>
            </div>
          </div>

          <nav
            className="grid grid-cols-3 rounded-[10px] border border-white/[.12] bg-[#0e0d12]/30 backdrop-blur-sm text-center text-[#f6ecdf]/85 divide-x divide-white/[.12] overflow-hidden"
            style={{ fontSize: 'calc(13px * min(var(--k), 1.2))', ...rise(1800) }}
          >
            <Link href="/about" className="py-2 hover:bg-white/[.08] hover:text-white" data-ph-capture-attribute-cta="learn_more">learn more</Link>
            <Link href="/wormhole-config/" className="py-2 hover:bg-white/[.08] hover:text-white" data-ph-capture-attribute-cta="enter_wormhole">wormhole</Link>
            <a href="/james_smith_resume.pdf" className="py-2 hover:bg-white/[.08] hover:text-white" data-ph-capture-attribute-cta="resume">resume</a>
          </nav>
        </div>
      </main>

      {/* scene caption + controls */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 pointer-events-none text-xs"
        style={{ padding: '0 max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))', fontFamily: MONO, ...rise(2300) }}
      >
        <div className="pointer-events-auto text-[#f6ecdf]/70 [text-shadow:0_1px_8px_rgba(0,0,0,.4)]">
          <span className="text-[#f6ecdf]/50">{caption.no}</span> · {caption.name} · {caption.tod}
        </div>
        <div className="pointer-events-auto flex gap-1 rounded-lg border border-white/[.12] bg-[#0e0d12]/30 backdrop-blur-sm p-0.5">
          {[
            ['↻ new', newScene, undefined],
            ['◐ timelapse', toggleFast, fast],
            ['share', share, undefined],
          ].map(([label, fn, pressed]) => (
            <button key={label as string} onClick={fn as () => void} aria-pressed={pressed as boolean | undefined} className={`rounded-md px-2.5 py-1.5 hover:bg-white/[.1] ${pressed ? 'bg-white/[.16]' : ''}`}>
              {label as string}
            </button>
          ))}
        </div>
      </div>

      {lab && (
        <div className="absolute right-4 top-4 rounded-lg border border-white/[.14] bg-[#0e0d12]/70 backdrop-blur-md p-3 text-xs space-y-2" style={{ fontFamily: MONO }}>
          <div className="text-white/50 uppercase tracking-[.14em]">type lab</div>
          <div className="flex gap-1">
            {(Object.keys(FONTS) as FontKey[]).map((k) => (
              <button key={k} onClick={() => setFont(k)} className={`rounded px-2 py-1 ${font === k ? 'bg-white/20' : 'hover:bg-white/10'}`}>{FONTS[k].label}</button>
            ))}
          </div>
          <div className="flex gap-1">
            {(Object.keys(SIZES) as SizeKey[]).map((k) => (
              <button key={k} onClick={() => setSize(size === k ? null : k)} className={`rounded px-2 py-1 uppercase ${size === k ? 'bg-white/20' : 'hover:bg-white/10'}`}>{k}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

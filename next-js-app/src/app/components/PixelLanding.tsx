'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { sceneSlug } from '@/lib/pixel-scene/share';
import Image from 'next/image';
import headshot from '../../../public/image-assets/smiling-headshot.jpg';
import { Check, Clipboard } from 'lucide-react';
import BeaverLoader from './BeaverLoader';
import AnthropicIcon from './icons/AnthropicIcon';
import OpenAIIcon from './icons/OpenAIIcon';

/* The brag sheet agents read to learn about James. */
const BRAG_REPO = 'github.com/gitJamoo/brag-sheets';
const AGENT_PROMPT = `Read https://${BRAG_REPO} (start at AGENTS.md) and tell me about James M. Smith.`;
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

type Scene = NonNullable<ReturnType<typeof PixelScene.generate>> & { phase0: number; name: string; me?: { box?: { x: number; y: number; w: number; h: number } } };

const NAV = [
  { id: 'about', label: 'about' },
  { id: 'featured', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'creative-works', label: 'creative' },
  { id: 'contact', label: 'contact' },
];
const ease = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

export default function PixelLanding({ children, initialSeed, initialPhase = null }: { children?: React.ReactNode; initialSeed?: number; initialPhase?: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const st = useRef<{ S?: Scene; seed: number; phase: number | null; t: number; speed: number; waveUntil: number; scroll: number; img?: ImageData; buf?: Uint32Array }>({ seed: 0, phase: null, t: 0, speed: 1, waveUntil: -1, scroll: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [navOn, setNavOn] = useState(false);
  const [active, setActive] = useState('');
  const [hi, setHi] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  const hiTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
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
    PixelScene.render(s.S, s.buf, s.t, (s.phase! + 0.12 * ease(s.scroll)) % 1, { wave: s.t < s.waveUntil });
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
    if (m) setup(+m[1], m[2] ? +m[2] / 1000 : null);
    else setup(initialSeed ?? 1 + Math.floor(Math.random() * 99999), initialSeed ? initialPhase : null);
    setReady(true);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, last = 0, acc = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      acc += Math.min(0.1, (now - last) / 1000); last = now;
      if (acc < 1 / 24) return; // pixel art doesn't need 60fps
      if (s.scroll > 1.4) { acc = 0; return; } // scene is covered by the content; save battery
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
  // eslint-disable-next-line react-hooks/exhaustive-deps -- the initial scene is only read on mount
  }, [setup, draw]);

  // Scroll: the scene sinks and zooms a touch, the intro lifts away faster, a vignette closes in,
  // the day drifts toward evening, then the nav slides down and the content rises over the scene.
  useEffect(() => {
    const s = st.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const p = scrollY / innerHeight; s.scroll = p;
      const e = ease(p);
      if (stageRef.current) stageRef.current.style.transform = reduce ? '' : `translate3d(0, ${-e * 9}vh, 0) scale(${1 + e * 0.07})`;
      if (introRef.current) { introRef.current.style.transform = reduce ? '' : `translate3d(0, ${-p * 32}vh, 0)`; introRef.current.style.opacity = String(1 - ease(p * 1.5)); }
      if (hudRef.current) hudRef.current.style.opacity = String(1 - ease(p * 3));
      if (vignetteRef.current) vignetteRef.current.style.opacity = String(e);
      if (washRef.current) washRef.current.style.opacity = String(ease((p - 0.2) / 0.9) * 0.6);
      setNavOn(p > 0.72);
      if (!reduce && p < 1.4) draw();
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    // the page background stays night-dark so overscroll never flashes white
    const html = document.documentElement, prev = html.style.background;
    html.style.background = '#0b0c12';
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); html.style.background = prev; };
  }, [draw]);

  useEffect(() => {
    const root = contentRef.current; if (!root) return;
    // highlight the nav item for the section in view
    const spy = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) setActive(en.target.id);
    }, { rootMargin: '-40% 0px -55% 0px' });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) spy.observe(el); });
    // sections drift up softly as they enter
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('header, section, .grid'));
    const reveal = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) { const el = en.target as HTMLElement; el.style.opacity = '1'; el.style.transform = 'none'; reveal.unobserve(el); }
    }, { rootMargin: '0px 0px -8% 0px' });
    if (!reduce) blocks.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1)';
      reveal.observe(el);
    });
    return () => { spy.disconnect(); reveal.disconnect(); };
  }, []);

  // resume opens over this same scene, ready to save as a PDF
  const openResume = (e: React.MouseEvent) => {
    const s = st.current; if (!s.seed || s.phase == null) return;
    e.preventDefault();
    location.href = `/resume/print?scene=${sceneSlug(s.seed, s.phase)}&print=1`;
  };

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) { scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // little James in the scene: hover shows a pointer, click makes him wave and say hi
  const hitMe = (e: React.PointerEvent | React.MouseEvent) => {
    const cv = canvasRef.current, b = st.current.S?.me?.box; if (!cv || !b) return false;
    const r = cv.getBoundingClientRect(), x = ((e.clientX - r.left) / r.width) * cv.width, y = ((e.clientY - r.top) / r.height) * cv.height;
    return x >= b.x - 2 && x <= b.x + b.w + 2 && y >= b.y - 3 && y <= b.y + b.h + 1;
  };
  const onSceneClick = (e: React.MouseEvent) => {
    const cv = canvasRef.current, b = st.current.S?.me?.box; if (!cv || !b || !hitMe(e)) return;
    st.current.waveUntil = st.current.t + 2.6; draw();
    const r = cv.getBoundingClientRect();
    setHi({ x: r.left + ((b.x + b.w / 2) / cv.width) * r.width, y: r.top + ((b.y - 1) / cv.height) * r.height, show: true });
    clearTimeout(hiTimer.current); hiTimer.current = setTimeout(() => setHi((h) => ({ ...h, show: false })), 2400);
  };

  const newScene = () => {
    st.current.phase = null;
    setup(1 + Math.floor(Math.random() * 99999), null);
    history.replaceState(null, '', location.pathname.startsWith('/s/') ? '/' : location.pathname + location.search);
  };
  const toggleFast = () => { st.current.speed = st.current.speed === 1 ? 40 : 1; setFast(st.current.speed > 1); };
  const share = async () => {
    const s = st.current;
    // /s/<seed>-<time> opens this exact scene, and its link preview is this scene too
    const url = `${location.origin}/s/${sceneSlug(s.seed, s.phase!)}`;
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
    <div
      className="dark relative text-[#f6ecdf]"
      style={{ fontFamily: FONTS[font].css, background: '#0b0c12', '--background': '#0b0c12', '--foreground': '#ededed' } as React.CSSProperties}
    >
      {/* the stage: fixed behind everything */}
      <div ref={stageRef} className="fixed inset-0 overflow-hidden origin-[50%_70%] will-change-transform">
      <canvas
        ref={canvasRef}
        aria-label="A generated pixel-art landscape that changes with every visit"
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated', opacity: ready ? 1 : 0, transition: 'opacity .6s ease' }}
        onClick={onSceneClick}
        onPointerMove={(e) => { e.currentTarget.style.cursor = hitMe(e) ? 'pointer' : ''; }}
      />
      <div
        role="status"
        className="fixed z-10 pointer-events-none whitespace-nowrap rounded-lg border border-white/[.18] bg-[#0e0d12]/70 backdrop-blur-md px-2.5 py-1 text-xs"
        style={{ left: hi.x, top: hi.y, fontFamily: MONO, opacity: hi.show ? 1 : 0, transform: `translate(-50%, -100%) scale(${hi.show ? 1 : 0.6})`, transition: 'opacity .25s ease, transform .35s cubic-bezier(.3,1.6,.5,1)' }}
      >
        {hi.show ? 'hi 👋' : ''}
      </div>

      {/* Shown only if the scene is slow to start (CSS delay), so fast loads never flash it. */}
      {!ready && (
        <div className="absolute inset-0 grid place-items-center opacity-0 animate-[beaver-in_.2s_ease-out_.15s_forwards]">
          <BeaverLoader />
        </div>
      )}
      </div>
      <div ref={washRef} aria-hidden="true" className="fixed inset-0 pointer-events-none bg-[#0b0c12] opacity-0" />
      <div
        ref={vignetteRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-0"
        style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 42%, transparent 35%, rgba(6,7,12,.55) 70%, rgba(6,7,12,.95) 100%)' }}
      />

      {/* sticky nav: slides in once you scroll past the scene */}
      <header
        className="fixed inset-x-0 top-0 z-30 border-b border-white/[.08] bg-[#0b0c12]/55 backdrop-blur-md transition-[transform,opacity] duration-500 ease-out"
        style={{ transform: navOn ? 'none' : 'translateY(-100%)', opacity: navOn ? 1 : 0, paddingTop: 'env(safe-area-inset-top)', fontFamily: MONO }}
        aria-hidden={!navOn}
      >
        <div className="max-w-6xl mx-auto h-14 px-6 sm:px-10 flex items-center gap-6 text-[13px]">
          <a href="#" onClick={goTo('')} tabIndex={navOn ? 0 : -1} className="flex items-center gap-2.5 shrink-0 text-[#f6ecdf] hover:text-white">
            <Image src={headshot} alt="" sizes="32px" className="h-7 w-auto rounded-[4px] ring-1 ring-white/20" />
            <span className="max-sm:hidden">James M. Smith</span>
          </a>
          <nav className="ml-auto flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={goTo(n.id)}
                tabIndex={navOn ? 0 : -1}
                aria-current={active === n.id ? 'location' : undefined}
                className={`relative shrink-0 rounded-md px-2.5 py-1.5 transition-colors ${active === n.id ? 'text-white' : 'text-white/55 hover:text-white'}`}
              >
                {n.label}
                <span className={`absolute left-1/2 -bottom-0.5 h-[3px] w-[3px] -translate-x-1/2 bg-[#e8a07a] transition-opacity ${active === n.id ? 'opacity-100' : 'opacity-0'}`} />
              </a>
            ))}
            <span className="mx-1 h-4 w-px bg-white/15 shrink-0" />
            <a href="/resume/print" onClick={openResume} tabIndex={navOn ? 0 : -1} className="shrink-0 rounded-md px-2.5 py-1.5 text-white/55 hover:text-white">resume</a>
          </nav>
        </div>
      </header>

      {/* the first screen: transparent so the scene shows; only its controls take clicks */}
      <section className="relative h-[100svh] pointer-events-none">

      <main
        ref={introRef}
        className="pointer-events-auto absolute inset-x-0 top-0 flex flex-col items-start gap-4 max-sm:items-center max-sm:text-center [--k:1] max-sm:[--k:1.4]"
        style={{
          padding: 'max(12vh, calc(24px + env(safe-area-inset-top))) max(6vw, 16px) 0',
          ...(size ? ({ '--k': SIZES[size] } as React.CSSProperties) : {}),
        }}
      >
        <h1
          className="inline-flex items-center gap-[.32em] font-semibold tracking-tight leading-none rounded-[12px] border border-white/[.1] bg-[#0e0d12]/35 backdrop-blur-md px-[.4em] py-[.22em] max-w-full"
          style={{ fontSize: 'min(clamp(calc(34px * var(--k)), calc(5.4vw * var(--k)), calc(68px * var(--k))), 8.2vw)', ...rise(900) }}
        >
          <Image src={headshot} alt="" priority sizes="120px" className="-ml-[.12em] h-[1.3em] w-auto shrink-0 rounded-[.12em] ring-1 ring-white/25" />
          <span>James M. Smith</span>
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
            <a href="/resume/print" onClick={openResume} className="py-2 hover:bg-white/[.08] hover:text-white" data-ph-capture-attribute-cta="resume">resume</a>
          </nav>
        </div>
      </main>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-20 flex justify-center text-[11px] tracking-[.25em] uppercase text-[#f6ecdf]/55" style={{ fontFamily: MONO, ...rise(3200) }}>
        <span className="motion-safe:animate-bounce">scroll ↓</span>
      </div>

      {/* scene caption + controls */}
      <div
        ref={hudRef}
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
      </section>

      {/* the rest of the site rises over the darkened scene */}
      <div ref={contentRef} className="relative z-10">
        <div aria-hidden="true" className="h-[22vh] bg-gradient-to-b from-transparent to-[#0b0c12]" />
        <div className="bg-[#0b0c12] text-[#ededed]" style={{ fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
          {children}
        </div>
      </div>

      {lab && (
        <div className="fixed right-4 top-16 z-40 rounded-lg border border-white/[.14] bg-[#0e0d12]/70 backdrop-blur-md p-3 text-xs space-y-2" style={{ fontFamily: MONO }}>
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

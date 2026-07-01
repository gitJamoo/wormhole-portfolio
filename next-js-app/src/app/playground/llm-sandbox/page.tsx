"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { tokenize } from "./tokenize";
import SceneBoundary from "./SceneBoundary";
import {
  WordVector,
  VectorizeResponse,
  cosineSimilarity,
  euclideanDistance,
  analogyVector,
  nearestPoint,
  colorForIndex,
} from "./types";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-slate-500">
      Loading 3D space…
    </div>
  ),
});

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gpt-4o",
  "claude-3-haiku-20240307",
  "claude-sonnet-4-20250514",
];

const DEFAULT_INPUT =
  "king, queen, man, woman, prince, apple, banana, dog, cat, car, truck, happy, sad";

type Tab = "space" | "tokens" | "similarity" | "analogy";

const TABS: { id: Tab; label: string }[] = [
  { id: "space", label: "Vector space" },
  { id: "tokens", label: "Tokenization" },
  { id: "similarity", label: "Similarity" },
  { id: "analogy", label: "Analogies" },
];

export default function PlaygroundPage() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [model, setModel] = useState(MODELS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [words, setWords] = useState<WordVector[]>([]);
  const [axes, setAxes] = useState({ x: "", y: "", z: "" });
  const [tab, setTab] = useState<Tab>("space");

  // selections for the similarity / analogy tools
  const [simA, setSimA] = useState(0);
  const [simB, setSimB] = useState(1);
  const [anA, setAnA] = useState(0);
  const [anB, setAnB] = useState(1);
  const [anC, setAnC] = useState(2);

  useEffect(() => {
    const saved = localStorage.getItem("selectedWormholeModel");
    if (saved && MODELS.includes(saved)) setModel(saved);
  }, []);

  const tokens = useMemo(() => tokenize(input), [input]);

  async function handleVectorize() {
    const parsed = Array.from(
      new Set(
        input
          .split(/[,\n]+/)
          .flatMap((s) => s.split(/\s+/))
          .map((s) => s.trim())
          .filter(Boolean)
      )
    ).slice(0, 30);

    if (parsed.length < 2) {
      setError("Enter at least two words.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiKey = localStorage.getItem("apiKey") || undefined;
      const res = await fetch("/api/vectorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: parsed, selectedModel: model, apiKey }),
      });
      const data = (await res.json()) as VectorizeResponse & { error?: string };
      if (!res.ok) throw new Error(data.error || "Request failed");

      const total = data.words.length;
      const mapped: WordVector[] = data.words.map((w, i) => ({
        word: w.word,
        x: clamp(w.x),
        y: clamp(w.y),
        z: clamp(w.z),
        reason: w.reason,
        color: colorForIndex(i, total),
      }));
      setWords(mapped);
      setAxes(data.axes || { x: "", y: "", z: "" });
      // reset selections to valid indices
      setSimA(0);
      setSimB(Math.min(1, mapped.length - 1));
      setAnA(0);
      setAnB(Math.min(1, mapped.length - 1));
      setAnC(Math.min(2, mapped.length - 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ---- derived data for the active tool ----
  const similarity = useMemo(() => {
    if (words[simA] && words[simB]) {
      return {
        cos: cosineSimilarity(words[simA], words[simB]),
        dist: euclideanDistance(words[simA], words[simB]),
      };
    }
    return null;
  }, [words, simA, simB]);

  const analogy = useMemo(() => {
    if (words[anA] && words[anB] && words[anC]) {
      const result = analogyVector(words[anA], words[anB], words[anC]);
      const nearest = nearestPoint(result, words, [anA, anB, anC]);
      return { a: anA, b: anB, c: anC, result, nearest };
    }
    return null;
  }, [words, anA, anB, anC]);

  const highlighted = useMemo(() => {
    if (tab === "similarity" && words.length) return new Set([simA, simB]);
    if (tab === "analogy" && analogy)
      return new Set([anA, anB, anC, analogy.nearest].filter((i) => i >= 0));
    return new Set<number>();
  }, [tab, words, simA, simB, anA, anB, anC, analogy]);

  const sceneSimilarity: [number, number] | null =
    tab === "similarity" && words.length ? [simA, simB] : null;
  const sceneAnalogy = tab === "analogy" ? analogy : null;

  return (
    <div className="fixed inset-0 flex flex-col bg-[#05070d] text-slate-200 md:flex-row">
      {/* 3D canvas */}
      <div className="relative order-2 h-1/2 w-full md:order-1 md:h-full md:flex-1">
        {words.length > 0 ? (
          <SceneBoundary>
            <Scene
              points={words}
              axes={axes}
              highlighted={highlighted}
              similarityPair={sceneSimilarity}
              analogy={sceneAnalogy}
            />
          </SceneBoundary>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-slate-500">
            <div className="text-5xl">🌌</div>
            <p className="max-w-sm text-sm">
              Enter some words and hit{" "}
              <span className="text-slate-300">Vectorize</span> to see them placed
              in 3D vector space.
            </p>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-slate-400 backdrop-blur">
          drag to orbit · scroll to zoom
        </div>
      </div>

      {/* Control panel */}
      <aside className="order-1 flex h-1/2 w-full flex-col overflow-y-auto border-b border-white/10 bg-black/40 p-5 backdrop-blur md:order-2 md:h-full md:w-[380px] md:border-b-0 md:border-l">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">
            Vector Space Playground
          </h1>
          <Link
            href="/playground"
            className="text-xs text-slate-400 transition-colors hover:text-white"
          >
            ← Experiences
          </Link>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-slate-400">
          A tiny, 3-dimensional model of how language models turn words into{" "}
          <span className="text-slate-200">vectors</span>. Real models use
          hundreds of dimensions — here an LLM squeezes that idea into 3 so you
          can actually see it.
        </p>

        {/* Input */}
        <label className="mb-1 text-xs font-medium text-slate-300">Words</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="mb-3 w-full resize-y rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
          placeholder="king, queen, apple, dog…"
        />

        <div className="mb-3 flex items-center gap-2">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            suppressHydrationWarning
            className="flex-1 rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-slate-200 outline-none focus:border-indigo-400"
          >
            {MODELS.map((m) => (
              <option key={m} value={m} className="bg-slate-900">
                {m}
              </option>
            ))}
          </select>
          <button
            onClick={handleVectorize}
            disabled={loading}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400 disabled:opacity-50"
          >
            {loading ? "…" : "Vectorize"}
          </button>
        </div>

        {error && (
          <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-3 flex flex-wrap gap-1 rounded-lg bg-white/5 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                tab === t.id
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 text-sm">
          {tab === "space" && <SpacePanel words={words} axes={axes} />}
          {tab === "tokens" && <TokensPanel tokens={tokens} />}
          {tab === "similarity" && (
            <SimilarityPanel
              words={words}
              simA={simA}
              simB={simB}
              setSimA={setSimA}
              setSimB={setSimB}
              similarity={similarity}
            />
          )}
          {tab === "analogy" && (
            <AnalogyPanel
              words={words}
              anA={anA}
              anB={anB}
              anC={anC}
              setAnA={setAnA}
              setAnB={setAnB}
              setAnC={setAnC}
              analogy={analogy}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(-1, Math.min(1, n));
}

// ---------- panels ----------

function SpacePanel({
  words,
  axes,
}: {
  words: WordVector[];
  axes: { x: string; y: string; z: string };
}) {
  if (!words.length)
    return (
      <p className="text-xs text-slate-500">
        Once vectorized, each word becomes a point. Words with similar meaning
        end up near each other — that clustering is the whole idea behind
        embeddings.
      </p>
    );
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <AxisChip color="#ef4444" label={axes.x || "X"} />
        <AxisChip color="#22c55e" label={axes.y || "Y"} />
        <AxisChip color="#3b82f6" label={axes.z || "Z"} />
      </div>
      <p className="text-[11px] text-slate-500">
        The model chose these rough meanings for each axis to best separate your
        words.
      </p>
      <ul className="space-y-2">
        {words.map((w) => (
          <li key={w.word} className="flex gap-2 text-xs">
            <span
              className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: w.color }}
            />
            <div>
              <span className="font-medium text-slate-100">{w.word}</span>
              <span className="ml-1 text-slate-500">
                ({w.x.toFixed(2)}, {w.y.toFixed(2)}, {w.z.toFixed(2)})
              </span>
              <p className="text-slate-400">{w.reason}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AxisChip({ color, label }: { color: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
      <div className="mb-1 h-1 w-full rounded" style={{ backgroundColor: color }} />
      <span className="text-slate-200">{label}</span>
    </div>
  );
}

function TokensPanel({
  tokens,
}: {
  tokens: { text: string; id: number; isSubword: boolean }[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        Before anything is vectorized, text is split into{" "}
        <span className="text-slate-200">tokens</span> and each token maps to an
        integer <span className="text-slate-200">ID</span>. The model only ever
        sees these IDs.
      </p>
      <div className="flex flex-wrap gap-1">
        {tokens.map((t, i) => (
          <span
            key={i}
            className={`rounded px-1.5 py-0.5 text-xs ${
              t.isSubword
                ? "bg-amber-500/20 text-amber-200"
                : "bg-indigo-500/20 text-indigo-200"
            }`}
            title={`token id: ${t.id}`}
          >
            {t.text}
            <span className="ml-1 text-[10px] opacity-60">{t.id}</span>
          </span>
        ))}
      </div>
      <p className="text-[11px] leading-relaxed text-slate-500">
        Blue = whole word, amber = a sub-word piece of a longer word. This is a
        simplified illustration — real tokenizers (like GPT&apos;s BPE) learn
        their splits from data and use a fixed ~50k-token vocabulary.
      </p>
    </div>
  );
}

function WordSelect({
  words,
  value,
  onChange,
  label,
}: {
  words: WordVector[];
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-4 text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        suppressHydrationWarning
        className="flex-1 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-200 outline-none focus:border-indigo-400"
      >
        {words.map((w, i) => (
          <option key={w.word} value={i} className="bg-slate-900">
            {w.word}
          </option>
        ))}
      </select>
    </label>
  );
}

function SimilarityPanel({
  words,
  simA,
  simB,
  setSimA,
  setSimB,
  similarity,
}: {
  words: WordVector[];
  simA: number;
  simB: number;
  setSimA: (n: number) => void;
  setSimB: (n: number) => void;
  similarity: { cos: number; dist: number } | null;
}) {
  if (words.length < 2)
    return <p className="text-xs text-slate-500">Vectorize some words first.</p>;
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        How &quot;close&quot; are two meanings? Pick two words to compare them.
      </p>
      <div className="space-y-2">
        <WordSelect words={words} value={simA} onChange={setSimA} label="A" />
        <WordSelect words={words} value={simB} onChange={setSimB} label="B" />
      </div>
      {similarity && (
        <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-3">
          <Metric
            label="Cosine similarity"
            value={similarity.cos.toFixed(3)}
            hint="direction / angle — 1 = same, 0 = unrelated, -1 = opposite"
          />
          <Metric
            label="Distance"
            value={similarity.dist.toFixed(3)}
            hint="straight-line gap — smaller = more alike"
          />
          <div className="pt-1 text-[11px] text-amber-300">
            The yellow line in the scene connects them.
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-slate-300">{label}</span>
        <span className="font-mono text-sm text-white">{value}</span>
      </div>
      <p className="text-[10px] text-slate-500">{hint}</p>
    </div>
  );
}

function AnalogyPanel({
  words,
  anA,
  anB,
  anC,
  setAnA,
  setAnB,
  setAnC,
  analogy,
}: {
  words: WordVector[];
  anA: number;
  anB: number;
  anC: number;
  setAnA: (n: number) => void;
  setAnB: (n: number) => void;
  setAnC: (n: number) => void;
  analogy: {
    a: number;
    b: number;
    c: number;
    result: { x: number; y: number; z: number };
    nearest: number;
  } | null;
}) {
  if (words.length < 3)
    return (
      <p className="text-xs text-slate-500">
        Vectorize at least three words to try analogies.
      </p>
    );
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        The famous trick:{" "}
        <span className="text-slate-200">king − man + woman ≈ queen</span>.
        Meaning can be moved around with vector math. Read it as{" "}
        <span className="text-slate-200">A is to B as C is to&nbsp;?</span>
      </p>
      <div className="space-y-2">
        <WordSelect words={words} value={anA} onChange={setAnA} label="A" />
        <WordSelect words={words} value={anB} onChange={setAnB} label="B" />
        <WordSelect words={words} value={anC} onChange={setAnC} label="C" />
      </div>
      {analogy && analogy.nearest >= 0 && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
          <div className="text-slate-300">
            <span className="text-purple-300">{words[anA].word}</span> is to{" "}
            <span className="text-purple-300">{words[anB].word}</span> as{" "}
            <span className="text-pink-300">{words[anC].word}</span> is to
          </div>
          <div className="mt-1 text-lg font-semibold text-pink-300">
            {words[analogy.nearest].word}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            We compute B − A + C and find the nearest word. The pink wireframe
            marks the exact target; the nearest real word rarely lands exactly on
            it — in only 3 dimensions there isn&apos;t much room, which is
            exactly why real models use so many.
          </p>
        </div>
      )}
    </div>
  );
}

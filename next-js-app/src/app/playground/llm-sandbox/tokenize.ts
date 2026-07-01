// A deliberately simplified stand-in for real byte-pair-encoding tokenizers
// (like GPT's tiktoken). It is NOT accurate to any real model — it exists only
// to give people an intuition for the tokens -> IDs -> vectors pipeline.

export interface Token {
  text: string; // the visible chunk
  id: number; // a stable pseudo "token ID"
  isSubword: boolean; // true if this is a continuation of a previous word
}

// Deterministic small hash so the same chunk always maps to the same "ID".
function hashToId(chunk: string): number {
  let h = 2166136261;
  for (let i = 0; i < chunk.length; i++) {
    h ^= chunk.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Squash into a plausible vocab-sized range (~50k like GPT-2).
  return Math.abs(h) % 50257;
}

// Common short words stay as a single token; longer/rarer words get split into
// subword chunks — mirroring how real tokenizers keep frequent words whole and
// break rare ones apart.
function splitWord(word: string): string[] {
  if (word.length <= 5) return [word];
  const chunks: string[] = [];
  let i = 0;
  // First chunk a little larger, then ~3-char continuations.
  const first = Math.min(4, word.length);
  chunks.push(word.slice(0, first));
  i = first;
  while (i < word.length) {
    chunks.push(word.slice(i, i + 3));
    i += 3;
  }
  return chunks;
}

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  // Split on whitespace but also peel off trailing/leading punctuation.
  const words = text.split(/\s+/).filter(Boolean);
  for (const raw of words) {
    const match = raw.match(/^(\W*)(\w[\w'-]*)?(\W*)$/);
    const lead = match?.[1] ?? "";
    const core = match?.[2] ?? "";
    const trail = match?.[3] ?? "";

    if (lead) {
      for (const ch of lead) {
        tokens.push({ text: ch, id: hashToId(ch), isSubword: false });
      }
    }
    if (core) {
      const parts = splitWord(core.toLowerCase());
      parts.forEach((p, idx) => {
        tokens.push({
          text: p,
          id: hashToId(p),
          isSubword: idx > 0,
        });
      });
    }
    if (trail) {
      for (const ch of trail) {
        tokens.push({ text: ch, id: hashToId(ch), isSubword: false });
      }
    }
  }
  return tokens;
}

export interface WordVector {
  word: string;
  x: number;
  y: number;
  z: number;
  reason: string;
  color: string;
}

export interface VectorizeResponse {
  words: {
    word: string;
    x: number;
    y: number;
    z: number;
    reason: string;
  }[];
  axes: { x: string; y: string; z: string };
}

type Vec = { x: number; y: number; z: number };

export function dot(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function magnitude(a: Vec): number {
  return Math.sqrt(dot(a, a));
}

export function cosineSimilarity(a: Vec, b: Vec): number {
  const denom = magnitude(a) * magnitude(b);
  if (denom === 0) return 0;
  return dot(a, b) / denom;
}

export function euclideanDistance(a: Vec, b: Vec): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// b - a + c  (the classic "king - man + woman" analogy vector)
export function analogyVector(a: Vec, b: Vec, c: Vec): Vec {
  return { x: b.x - a.x + c.x, y: b.y - a.y + c.y, z: b.z - a.z + c.z };
}

// index of the point in `points` nearest to `target`, optionally excluding some
export function nearestPoint(
  target: Vec,
  points: Vec[],
  exclude: number[] = []
): number {
  let best = -1;
  let bestDist = Infinity;
  points.forEach((p, i) => {
    if (exclude.includes(i)) return;
    const d = euclideanDistance(target, p);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

// Evenly spaced, vivid colors around the hue wheel.
export function colorForIndex(i: number, total: number): string {
  const hue = Math.round((i / Math.max(1, total)) * 360);
  return `hsl(${hue}, 80%, 60%)`;
}

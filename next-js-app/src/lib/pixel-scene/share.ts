import { PixelScene } from './scene';

/** "48213-740" → seed 48213 at phase .740. The phase part is optional. */
export function parseSceneSlug(slug: string): { seed: number; phase: number | null } | null {
  const m = /^(\d{1,5})(?:-(\d{1,3}))?$/.exec(slug);
  if (!m || +m[1] < 1) return null;
  return { seed: +m[1], phase: m[2] !== undefined ? +m[2] / 1000 : null };
}

export function sceneSlug(seed: number, phase: number) {
  return `${seed}-${String(Math.round(phase * 1000) % 1000).padStart(3, '0')}`;
}

/** Name and time of day for a scene. The name depends only on the seed, so any size works. */
export function sceneInfo(seed: number, phase: number | null) {
  const S = PixelScene.generate(seed, 120, 64) as unknown as { name: string; phase0: number };
  const p = phase ?? S.phase0;
  return { name: S.name as string, phase: p, tod: PixelScene.timeWord(p) as string, no: 'No. ' + String(seed).padStart(5, '0') };
}

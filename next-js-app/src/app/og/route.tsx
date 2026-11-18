import { ImageResponse } from 'next/og';
import { deflateSync } from 'node:zlib';
import { PixelScene } from '@/lib/pixel-scene/scene';
import { sceneInfo } from '@/lib/pixel-scene/share';
import { HEADSHOT } from './headshot';

// A pixel scene behind the name plate, drawn on request.
//   /og                 → a brand-new random scene every time (the site's default preview)
//   /og?seed=48213&p=740 → that exact scene, cached for good (share links)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OW = 1200, OH = 630, K = 4, W = OW / K, H = Math.ceil(OH / K);

const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b: Buffer) => { let c = ~0; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return ~c >>> 0; };
const chunk = (type: string, data: Buffer) => { const l = Buffer.alloc(4); l.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); };

/** Scale the scene up K× with hard edges and encode it as a PNG. Rows repeat, so the "Up" filter makes it tiny. */
function scenePng(px: Uint32Array) {
  const stride = OW * 3 + 1, raw = Buffer.alloc(stride * OH);
  for (let y = 0; y < OH; y++) {
    const o = y * stride;
    if (y % K) { raw[o] = 2; continue; } // same as the row above → all zeros with the Up filter
    raw[o] = 0;
    for (let x = 0; x < OW; x++) { const p = px[Math.floor(y / K) * W + Math.floor(x / K)]; raw[o + 1 + x * 3] = p & 255; raw[o + 2 + x * 3] = (p >>> 8) & 255; raw[o + 3 + x * 3] = (p >>> 16) & 255; }
  }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(OW, 0); ih.writeUInt32BE(OH, 4); ih[8] = 8; ih[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ih), chunk('IDAT', deflateSync(raw, { level: 6 })), chunk('IEND', Buffer.alloc(0))]);
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const fixed = Number(q.get('seed')) >= 1;
  const seed = fixed ? Math.min(99999, Math.floor(Number(q.get('seed')))) : 1 + Math.floor(Math.random() * 99999);
  const pq = q.get('p');
  const asked = pq !== null && /^\d{1,3}$/.test(pq) ? +pq / 1000 : null;
  let info = sceneInfo(seed, asked);
  // Random previews stay bright: swap night skies for golden hour. Shared scenes keep their real time.
  if (!fixed && /Night|Dawn|Dusk/.test(info.tod)) info = sceneInfo(seed, Math.random() < 0.5 ? 0.27 : 0.725);

  const S = PixelScene.generate(seed, W, H);
  const px = new Uint32Array(W * H);
  PixelScene.render(S, px, 2.3, info.phase, {});
  const bg = 'data:image/png;base64,' + scenePng(px).toString('base64');
  const mono = 'monospace';

  return new ImageResponse(
    (
      <div style={{ width: OW, height: OH, display: 'flex', position: 'relative', fontFamily: mono }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} width={OW} height={OH} alt="" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', left: 64, top: 64, display: 'flex', alignItems: 'center', gap: 22, padding: '16px 30px 16px 18px', borderRadius: 18, background: 'rgba(14,13,18,0.45)', border: '1px solid rgba(255,255,255,0.14)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HEADSHOT} width={66} height={85} alt="" style={{ borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 58, color: '#f6ecdf', letterSpacing: -1 }}>James M. Smith</div>
            <div style={{ fontSize: 22, color: 'rgba(246,236,223,0.75)' }}>AI/Product Engineer · San Francisco</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 64, bottom: 40, display: 'flex', fontSize: 20, color: 'rgba(246,236,223,0.8)', padding: '8px 14px', borderRadius: 10, background: 'rgba(14,13,18,0.35)' }}>
          {`${info.no} · ${info.name} · ${info.tod}`}
        </div>
        <div style={{ position: 'absolute', right: 64, bottom: 40, display: 'flex', fontSize: 20, color: 'rgba(246,236,223,0.8)', padding: '8px 14px', borderRadius: 10, background: 'rgba(14,13,18,0.35)' }}>
          j-m-s.dev
        </div>
      </div>
    ),
    {
      width: OW,
      height: OH,
      headers: { 'Cache-Control': fixed ? 'public, max-age=86400, s-maxage=31536000, immutable' : 'no-store, max-age=0' },
    },
  );
}

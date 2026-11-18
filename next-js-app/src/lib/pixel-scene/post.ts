/* WebGL2 post-process for the landing scene ("Subtle"): light spills off the sun, lamps and fireflies in stepped,
   dithered rings so the glow stays pixel art; sun rays travel only through open sky, so ridges cut them;
   a little haze, a warm grade, a vignette and per-scene-pixel grain. Returns null without WebGL2 (callers keep the 2D canvas). */

const LOOK = { bloom: 0.6, rays: 0.35, haze: 0.1, vig: 0.25, grain: 0.25, lift: [0.02, 0, 0.04], gain: [1.05, 1, 0.93], sat: 1.08, con: 1.05 };

type SceneLike = { L: Uint8Array; water?: unknown; wy?: number; glow?: { x: number; y: number; c: number[]; a: number; sun: boolean } };
type Target = { t: WebGLTexture; f: WebGLFramebuffer; w: number; h: number };
type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };

const VS = `#version 300 es
in vec2 p; out vec2 uv; void main(){ uv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;
const HEAD = `#version 300 es
precision highp float; in vec2 uv; out vec4 o;
const vec3 LUM = vec3(.2126, .7152, .0722);`;
const FS = {
  bright: `${HEAD} uniform sampler2D s;
void main(){ vec3 c = texture(s, uv).rgb; float l = dot(c, LUM); o = vec4(c * smoothstep(.62, .8, l), 1.); }`,
  blur: `${HEAD} uniform sampler2D s; uniform vec2 dir;
void main(){ const float w[5] = float[](.227027, .1945946, .1216216, .054054, .016216);
  vec3 r = texture(s, uv).rgb * w[0];
  for (int i = 1; i < 5; i++) { r += texture(s, uv + dir * float(i)).rgb * w[i]; r += texture(s, uv - dir * float(i)).rgb * w[i]; }
  o = vec4(r, 1.); }`,
  rays: `${HEAD} uniform sampler2D s; uniform sampler2D m; uniform vec2 sun;
void main(){ vec2 st = (uv - sun) / 48.; vec2 q = uv; float acc = 0., dec = 1.;
  for (int i = 0; i < 48; i++) { q -= st; float sky = texture(m, q).r; float l = dot(texture(s, q).rgb, LUM); acc += sky * smoothstep(.5, .95, l) * dec; dec *= .955; }
  o = vec4(vec3(acc / 14.), 1.); }`,
  comp: `${HEAD}
uniform sampler2D scene, glowA, glowB, rays; uniform vec2 size, sun; uniform vec3 lightC, uLift, uGain; uniform float aspect, time;
uniform float uBloom, uRays, uHaze, uVig, uGrain, uSat, uCon;
const float B[16] = float[](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
void main(){
  vec2 cell = floor(uv * size), cuv = (cell + .5) / size;
  vec3 c = texture(scene, cuv).rgb;
  vec3 add = (texture(glowA, cuv).rgb * .55 + texture(glowB, cuv).rgb * .9) * uBloom + texture(rays, cuv).r * lightC * uRays;
  vec2 dv = (cuv - sun) * vec2(aspect, 1.); add += lightC * exp(-dot(dv, dv) * 5.) * uHaze * .45;
  float th = (B[int(mod(cell.x, 4.)) + int(mod(cell.y, 4.)) * 4] + .5) / 16.; add = floor(add * 5. + th) / 5.;
  c = 1. - (1. - c) * (1. - clamp(add, 0., 1.));
  c = c * uGain + uLift * (1. - c);
  float l = dot(c, LUM); c = mix(vec3(l), c, uSat); c = (c - .5) * uCon + .5;
  vec2 v = (uv - .5) * vec2(aspect * .78, 1.); c *= 1. - uVig * .55 * smoothstep(.28, .85, length(v));
  c += (fract(sin(dot(cell + floor(time * 12.) * vec2(17., 31.), vec2(12.9898, 78.233))) * 43758.5453) - .5) * uGrain * .07;
  o = vec4(clamp(c, 0., 1.), 1.);
}`,
};

export type Post = { setup: (S: SceneLike, W: number, H: number) => void; draw: (buf: Uint32Array, S: SceneLike, now: number) => void; lost: () => boolean };

export function createPost(cv: HTMLCanvasElement): Post | null {
  const gl = cv.getContext('webgl2', { antialias: false, alpha: false, premultipliedAlpha: false });
  if (!gl) return null;
  let isLost = false;
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); isLost = true; });
  try {
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
      return s;
    };
    const prog = (fs: string): Prog => {
      const p = gl.createProgram()!; gl.attachShader(p, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link');
      const u: Prog['u'] = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) { const info = gl.getActiveUniform(p, i)!; u[info.name.replace('[0]', '')] = gl.getUniformLocation(p, info.name); }
      return { p, u };
    };
    const P = { bright: prog(FS.bright), blur: prog(FS.blur), rays: prog(FS.rays), comp: prog(FS.comp) };
    gl.bindVertexArray(gl.createVertexArray());
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const tex = (w: number, h: number, filter: number, data: Uint8Array | null = null) => {
      const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const target = (w: number, h: number): Target => {
      const t = tex(w, h, gl.LINEAR), f = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, f, w, h };
    };
    let W = 1, H = 1, texScene: WebGLTexture | null = null, texMask: WebGLTexture | null = null, T: Record<'a' | 'b' | 'c' | 'd' | 'r', Target> | null = null;

    const setup = (S: SceneLike, w: number, h: number) => {
      if (isLost) return;
      W = w; H = h;
      if (texScene) gl.deleteTexture(texScene);
      if (texMask) gl.deleteTexture(texMask);
      if (T) for (const x of Object.values(T)) { gl.deleteTexture(x.t); gl.deleteFramebuffer(x.f); }
      texScene = tex(W, H, gl.NEAREST);
      // open sky (light can travel) vs land and water, from the scene's layer buffer
      const m = new Uint8Array(W * H * 4);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; m[i * 4] = S.L[i] === 0 && !(S.water && y >= (S.wy ?? H)) ? 255 : 0; m[i * 4 + 3] = 255; }
      texMask = tex(W, H, gl.LINEAR, m);
      const hw = Math.max(1, W >> 1), hh = Math.max(1, H >> 1);
      T = { a: target(W, H), b: target(W, H), c: target(hw, hh), d: target(hw, hh), r: target(hw, hh) };
      const d = Math.min(2, devicePixelRatio || 1);
      cv.width = Math.round(innerWidth * d); cv.height = Math.round(innerHeight * d);
    };

    const pass = (p: Prog, out: Target | null, binds: [string, WebGLTexture][], set?: (u: Prog['u']) => void) => {
      gl.useProgram(p.p);
      gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.f : null);
      gl.viewport(0, 0, out ? out.w : cv.width, out ? out.h : cv.height);
      binds.forEach(([name, t], i) => { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(p.u[name], i); });
      set?.(p.u);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const draw = (buf: Uint32Array, S: SceneLike, now: number) => {
      if (isLost || !T || !texScene || !texMask) return;
      gl.bindTexture(gl.TEXTURE_2D, texScene);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength));
      const G = S.glow ?? { x: W / 2, y: H * 0.3, c: [255, 210, 160], a: 0.5, sun: true };
      const sun: [number, number] = [G.x / W, 1 - G.y / H], lc = G.c.map((v) => v / 255), la = Math.min(1, Math.max(0, G.a)) * (G.sun ? 1 : 0.5);
      pass(P.bright, T.a, [['s', texScene]]);
      pass(P.blur, T.b, [['s', T.a.t]], (u) => gl.uniform2f(u.dir, 1.2 / W, 0));
      pass(P.blur, T.a, [['s', T.b.t]], (u) => gl.uniform2f(u.dir, 0, 1.2 / H));
      pass(P.blur, T.c, [['s', T.a.t]], (u) => gl.uniform2f(u.dir, 2.4 / T!.c.w, 0));
      pass(P.blur, T.d, [['s', T.c.t]], (u) => gl.uniform2f(u.dir, 0, 2.4 / T!.c.h));
      pass(P.rays, T.r, [['s', texScene], ['m', texMask]], (u) => gl.uniform2f(u.sun, sun[0], sun[1]));
      pass(P.comp, null, [['scene', texScene], ['glowA', T.a.t], ['glowB', T.d.t], ['rays', T.r.t]], (u) => {
        gl.uniform2f(u.size, W, H); gl.uniform2f(u.sun, sun[0], sun[1]); gl.uniform3f(u.lightC, lc[0], lc[1], lc[2]);
        gl.uniform1f(u.aspect, innerWidth / innerHeight); gl.uniform1f(u.time, now / 1000);
        gl.uniform1f(u.uBloom, LOOK.bloom); gl.uniform1f(u.uRays, LOOK.rays * (0.4 + la)); gl.uniform1f(u.uHaze, LOOK.haze * (0.3 + la));
        gl.uniform1f(u.uVig, LOOK.vig); gl.uniform1f(u.uGrain, LOOK.grain);
        gl.uniform1f(u.uSat, LOOK.sat); gl.uniform1f(u.uCon, LOOK.con); gl.uniform3fv(u.uLift, LOOK.lift); gl.uniform3fv(u.uGain, LOOK.gain);
      });
    };
    return { setup, draw, lost: () => isLost };
  } catch (e) {
    console.warn('scene shaders off:', e);
    return null;
  }
}

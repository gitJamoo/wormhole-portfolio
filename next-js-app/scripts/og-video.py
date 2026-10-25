"""Render public/og-video.mp4: an 8s seamless loop of a dithered pixel-art wormhole.

    python scripts/og-video.py            # writes public/og-video.mp4
    python scripts/og-video.py --frames   # also dumps a few PNG stills to $TMP/og

Needs numpy, Pillow and ffmpeg on PATH. Everything is drawn on a 240x126 grid
and upscaled 5x with nearest-neighbour to 1200x630.
"""

import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

W, H, SCALE = 240, 126, 5
FPS, SECONDS = 30, 8
N = FPS * SECONDS
CX, CY = W / 2, H / 2 - 6
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Black through violet up to a pale lavender highlight.
PALETTE = np.array(
    [
        (0, 0, 0),
        (12, 4, 22),
        (36, 12, 64),
        (74, 26, 128),
        (118, 52, 196),
        (160, 98, 240),
        (205, 160, 255),
        (244, 230, 255),
    ],
    dtype=np.uint8,
)
LEVELS = len(PALETTE) - 1

BAYER = (
    np.array(
        [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]],
        dtype=np.float32,
    )
    + 0.5
) / 16.0
DITHER = np.tile(BAYER, (H // 4 + 1, W // 4 + 1))[:H, :W]

# 5x7 bitmap font, rows top to bottom.
FONT = {
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    "J": ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
    "-": ["00000", "00000", "00000", "01110", "00000", "00000", "00000"],
    "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
    ">": ["01000", "00100", "00010", "00001", "00010", "00100", "01000"],
    "_": ["00000", "00000", "00000", "00000", "00000", "00000", "11111"],
    " ": ["00000"] * 7,
    "d": ["00001", "00001", "01101", "10011", "10001", "10011", "01101"],
    "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
    "j": ["00010", "00000", "00110", "00010", "00010", "10010", "01100"],
    "m": ["00000", "00000", "11010", "10101", "10101", "10101", "10101"],
    "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"],
    "v": ["00000", "00000", "10001", "10001", "10001", "01010", "00100"],
}


def text_mask(s, size=1):
    """Boolean bitmap for `s` at `size`x, 1px (scaled) letter spacing."""
    cols = []
    for ch in s:
        glyph = np.array([[c == "1" for c in row] for row in FONT[ch]])
        cols += [glyph, np.zeros((7, 1), bool)]
    m = np.hstack(cols[:-1]) if cols else np.zeros((7, 0), bool)
    return m.repeat(size, 0).repeat(size, 1)


def stamp(rgb, mask, x, y, color, outline=True):
    """Draw `mask` at (x, y) in `color`, with a 1px black outline for legibility."""
    h, w = mask.shape
    if outline:
        pad = np.pad(mask, 1)
        grown = np.zeros_like(pad)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                grown |= np.roll(np.roll(pad, dy, 0), dx, 1)
        ys, xs = np.nonzero(grown)
        ys, xs = ys + y - 1, xs + x - 1
        ok = (ys >= 0) & (ys < H) & (xs >= 0) & (xs < W)
        rgb[ys[ok], xs[ok]] = 0
    ys, xs = np.nonzero(mask)
    ys, xs = ys + y, xs + x
    ok = (ys >= 0) & (ys < H) & (xs >= 0) & (xs < W)
    rgb[ys[ok], xs[ok]] = color


def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


# Polar grid, with a slight vertical squash so the hole reads as a disc in perspective.
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
DX, DY = xx - CX, (yy - CY) * 1.35
R = np.sqrt(DX * DX + DY * DY) + 1e-3
ANG = np.arctan2(DY, DX)
LOGR = np.log(R)

# Debris falling in: each particle loops once per clip.
rng = np.random.default_rng(7)
NP = 70
P_ANG = rng.uniform(0, 2 * np.pi, NP)
P_PHASE = rng.uniform(0, 1, NP)

URL = "j-m-s.dev/"
URL_MASK = text_mask(URL)
# Seconds where the URL is lit; the gaps make it flicker in and out.
URL_ON = [(1.0, 1.08), (1.2, 1.3), (1.45, 1.5), (1.6, 6.3), (6.4, 6.55), (6.7, 6.75)]


def render(f):
    t = f / N  # 0..1 over the loop
    s = t * SECONDS

    # A large, slowly breathing horizon.
    r0 = 34 + 1.5 * np.sin(2 * np.pi * t)

    # Log-polar spiral arms drifting inward; whole cycles per loop keep it seamless.
    arms = 3
    phase = 1.2 * LOGR + arms * ANG / (2 * np.pi) + t
    spiral = 0.5 + 0.5 * np.sin(2 * np.pi * (phase + 0.1 * np.sin(ANG * 2 - 2 * np.pi * t)))
    rings = 0.5 + 0.5 * np.sin(2 * np.pi * (2.2 * LOGR + 2 * t))
    swirl = 0.6 * spiral + 0.2 * rings + 0.2

    # Brightest just outside the horizon, falling off into the dark.
    d = R - r0
    glow = np.exp(-np.maximum(d, 0) / 40) * smooth(-1.5, 2.5, d)
    halo = np.exp(-((d - 1.5) ** 2) / 4.0) * 0.9
    val = glow * swirl * 1.05 + halo
    val = np.where(R < r0 - 1, 0.0, val)

    q = np.clip(val, 0, 1) * LEVELS
    idx = np.clip(np.floor(q + DITHER), 0, LEVELS).astype(np.uint8)
    rgb = PALETTE[idx]

    # Debris spiralling in.
    life = (P_PHASE + t) % 1.0
    pr = 150 * np.exp(-life * 1.6) + r0 * 0.6
    pa = P_ANG + 1.6 * life
    px = (CX + pr * np.cos(pa)).astype(int)
    py = (CY + pr * np.sin(pa) / 1.35).astype(int)
    vis = (pr > r0 + 1) & (px >= 0) & (px < W) & (py >= 0) & (py < H)
    bright = np.where(life > 0.6, 7, 6)
    rgb[py[vis], px[vis]] = PALETTE[bright[vis]]

    # The address, flickering in and out inside the void.
    if any(a <= s < b for a, b in URL_ON):
        h, w = URL_MASK.shape
        stamp(rgb, URL_MASK, int(CX - w / 2), int(CY - h / 2), PALETTE[7], outline=False)

    big = rgb.repeat(SCALE, 0).repeat(SCALE, 1)
    # Pixel-grid scanline: darken the last row of every pixel.
    big[SCALE - 1 :: SCALE] = (big[SCALE - 1 :: SCALE] * 0.72).astype(np.uint8)
    return big


def main():
    out = os.path.join(ROOT, "public/og-video.mp4")
    if "--frames" in sys.argv:
        os.makedirs(os.path.join(tempfile.gettempdir(), "og"), exist_ok=True)
        for sec in (0, 3.5, 7.2):
            Image.fromarray(render(int(sec * FPS))).save(os.path.join(tempfile.gettempdir(), "og", f"new_{sec}.png"))
    ff = subprocess.Popen(
        [
            "ffmpeg", "-v", "error", "-y",
            "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W * SCALE}x{H * SCALE}",
            "-r", str(FPS), "-i", "-",
            "-c:v", "libx264", "-preset", "veryslow", "-crf", "28",
            "-pix_fmt", "yuv420p", "-tune", "animation",
            "-movflags", "+faststart", out,
        ],
        stdin=subprocess.PIPE,
    )
    for f in range(N):
        ff.stdin.write(render(f).tobytes())
    ff.stdin.close()
    ff.wait()
    print(out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    main()

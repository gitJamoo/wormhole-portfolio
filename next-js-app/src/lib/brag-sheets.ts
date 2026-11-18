import path from "path";

// The Wormhole's source of truth: github.com/gitJamoo/brag-sheets. Fetched live
// (cached for a few minutes) so edits there show up here without a redeploy.
const RAW = "https://raw.githubusercontent.com/gitJamoo/brag-sheets/main/";
const REVALIDATE_SECONDS = 300;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;

export type BragSheets = {
  context: string;
  images: { url: string; alt: string }[];
};

async function fetchText(file: string): Promise<string> {
  const res = await fetch(RAW + file, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`brag-sheets ${file}: ${res.status}`);
  return res.text();
}

// Relative links in a sheet ("assets/x.png", "../ecodues/brag.md") become absolute
// raw URLs, so the generated page can embed the photos directly.
function absolutize(markdown: string, file: string): string {
  const dir = path.posix.dirname(file);
  return markdown.replace(/\]\(([^)\s]+)\)/g, (match, href: string) => {
    if (/^(https?:|mailto:|#)/.test(href)) return match;
    const resolved = path.posix.normalize(path.posix.join(dir, href));
    return resolved.startsWith("..") ? match : `](${RAW}${resolved})`;
  });
}

/** Every sheet linked from the brag-sheets README, with image URLs. Null if GitHub is unreachable. */
export async function loadBragSheets(): Promise<BragSheets | null> {
  try {
    const readme = await fetchText("README.md");
    const files = [...new Set([...readme.matchAll(/\]\(([\w./-]+\/brag\.md)\)/g)].map((m) => m[1]))];
    const sheets = await Promise.all(
      files.map(async (file) => `<!-- ${file} -->\n${absolutize(await fetchText(file), file)}`)
    );
    const context = [absolutize(readme, "README.md"), ...sheets].join("\n\n---\n\n");

    const seen = new Set<string>();
    const images = [...context.matchAll(/!\[([^\]]*)\]\((https:[^)\s]+)\)/g)]
      .filter(([, , url]) => IMAGE_EXT.test(url) && !seen.has(url) && seen.add(url))
      .map(([, alt, url]) => ({ url, alt }));

    return { context, images };
  } catch (error) {
    console.error("Falling back to local info.md:", error);
    return null;
  }
}

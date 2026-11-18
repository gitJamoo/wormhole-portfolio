import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PixelLanding from "../../components/PixelLanding";
import WorkContent from "../../home/WorkContent";
import { parseSceneSlug, sceneInfo } from "@/lib/pixel-scene/share";

// A shared scene: /s/48213-740 opens that exact landscape and time of day, and its link preview shows it.
type Props = { params: Promise<{ scene: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scene } = await params;
  const s = parseSceneSlug(scene);
  if (!s) return {};
  const info = sceneInfo(s.seed, s.phase);
  const title = `${info.name} · ${info.tod} — James M. Smith`;
  const description = `${info.no}, one of the pixel landscapes at j-m-s.dev. James M. Smith is an AI/Product Engineer in San Francisco.`;
  const image = `/og?seed=${s.seed}${s.phase !== null ? `&p=${scene.split("-")[1]}` : ""}`;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `https://j-m-s.dev/s/${scene}`,
      siteName: "James M. Smith",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${info.name}, a pixel-art landscape` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ScenePage({ params }: Props) {
  const { scene } = await params;
  const s = parseSceneSlug(scene);
  if (!s) notFound();
  return (
    <PixelLanding initialSeed={s.seed} initialPhase={s.phase}>
      <WorkContent compactHeader />
    </PixelLanding>
  );
}

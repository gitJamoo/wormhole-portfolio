import type { Metadata } from "next";

import PixelLanding from "./components/PixelLanding";
import WorkContent from "./home/WorkContent";

const title = "James M. Smith — AI/Product Engineer";
const description =
  "James M. Smith is an AI/Product Engineer in San Francisco building production AI systems, agentic automation, and full-stack products. Home of the Wormhole — an AI-regenerated portfolio.";

// Link previews get a freshly drawn landscape every time a crawler asks (/og picks a random scene).
export const metadata: Metadata = {
  openGraph: {
    title,
    description,
    url: "https://j-m-s.dev",
    siteName: "James M. Smith",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630, alt: "A pixel-art landscape with James M. Smith's name" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og"] },
};

// A new pixel-art landscape on every visit; scroll down for the work, experience and projects.
export default function Home() {
  return (
    <PixelLanding>
      <WorkContent compactHeader />
    </PixelLanding>
  );
}

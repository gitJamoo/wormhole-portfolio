import type { Metadata } from "next";

import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work & Projects — James M. Smith",
  description:
    "Experience, projects and creative work from James M. Smith, AI/Product Engineer at Magical in San Francisco: Estée Lauder, Oregon State, NJ Transit and more.",
  alternates: { canonical: "/home" },
};

export default function HomePage() {
  return <WorkContent />;
}

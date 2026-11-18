import type { Metadata } from "next";

import ResumeView from "./ResumeView";
import { resumeFonts } from "./fonts";

export const metadata: Metadata = {
  title: "Resume — James M. Smith",
  description: "James M. Smith's resume: AI/Product Engineer, Oregon State CS '26, Estée Lauder, NJ Transit, Envolvly.",
  alternates: { canonical: "/resume/print" },
};

// The resume over a faint copy of the visitor's landscape (or Classic, plain paper). Save as PDF prints one Letter page.
export default function ResumePrintPage() {
  return (
    <div className={resumeFonts}>
      <ResumeView />
    </div>
  );
}

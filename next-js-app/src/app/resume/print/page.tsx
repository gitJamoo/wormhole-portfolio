import type { Metadata } from "next";
import { EB_Garamond, Instrument_Serif, Source_Serif_4 } from "next/font/google";

import ResumeView from "./ResumeView";

const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--serif" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--garamond" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--display" });

export const metadata: Metadata = {
  title: "Resume — James M. Smith",
  description: "James M. Smith's resume: AI/Product Engineer, Oregon State CS '26, Estée Lauder, NJ Transit, Envolvly.",
  alternates: { canonical: "/resume/print" },
};

// The resume over a faint copy of the visitor's landscape. Save as PDF prints one Letter page.
export default function ResumePrintPage() {
  return (
    <div className={`${serif.variable} ${garamond.variable} ${display.variable}`}>
      <ResumeView />
    </div>
  );
}

import { Atkinson_Hyperlegible, EB_Garamond, Instrument_Serif, Source_Serif_4 } from "next/font/google";

// Not preloaded: the landing page only needs these once someone opens the resume.
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--serif", preload: false });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--garamond", preload: false });
const hyper = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--hyper", preload: false });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--display", preload: false });

export const resumeFonts = `${serif.variable} ${garamond.variable} ${display.variable} ${hyper.variable}`;

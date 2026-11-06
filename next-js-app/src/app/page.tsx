import Link from "next/link";
import Image from "next/image";

import finalPresentation from "../../public/image-assets/Estee_Lauder_Images/ELC_James_Given_Final_Presentation.jpg";

const facts = [
  { value: "$1.5M", label: "projected revenue from my Estée Lauder recommender" },
  { value: "45%", label: "lower LLM API cost with vector caching" },
  { value: "200K", label: "users on the admin panel I built" },
];

const btn =
  "inline-flex items-center justify-center h-12 px-6 rounded-full font-medium text-base transition-[transform,background-color,color] duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98]";

const textLink =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-200 hover:bg-[length:100%_1px] hover:text-foreground";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-0 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D73F09]" />
              James M. Smith · San Francisco
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              AI/Product Engineer building agentic systems that ship.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Currently at Magical, a Series A workflow-automation startup.
              Before that: Estée Lauder, Oregon State and NJ Transit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/home"
                data-ph-capture-attribute-cta="see_my_work"
                className={`${btn} bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]`}
              >
                See my work
              </Link>
              <Link
                href="/book"
                data-ph-capture-attribute-cta="book_meeting"
                className={`${btn} border border-foreground/20 hover:border-foreground hover:bg-foreground/[.04]`}
              >
                Book a meeting
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="/james_smith_resume.pdf"
                download="james_smith_resume.pdf"
                data-ph-capture-attribute-cta="resume"
                className={textLink}
              >
                Download resume ↓
              </a>
              <Link
                href="/wormhole-config/"
                data-ph-capture-attribute-cta="enter_wormhole"
                className={`${textLink} text-[#D73F09]`}
                title="An AI generates every page as you browse"
              >
                Enter the Wormhole →
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 mt-2 border-t border-black/[.08] dark:border-white/[.12]">
              {facts.map((f) => (
                <div key={f.value}>
                  <dt className="text-2xl sm:text-3xl font-semibold tracking-tight">{f.value}</dt>
                  <dd className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 group">
            <Image
              src={finalPresentation}
              alt="James presenting his machine learning internship project at Estée Lauder"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-[50%_30%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </main>

      <footer className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-8 flex gap-6 flex-wrap items-center text-sm text-gray-500">
        <a href="https://www.linkedin.com/in/james-m-smith1" target="_blank" rel="noopener noreferrer" className={textLink}>
          LinkedIn ↗
        </a>
        <a href="https://github.com/gitJamoo" target="_blank" rel="noopener noreferrer" className={textLink}>
          GitHub ↗
        </a>
        <Link href="/playground" className={textLink}>
          Playground
        </Link>
        <Link href="/blog" className={textLink}>
          Blog
        </Link>
      </footer>
    </div>
  );
}

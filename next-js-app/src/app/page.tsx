"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 sm:p-16 gap-12">
      <main className="flex flex-col gap-y-6 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-y-4 text-center sm:text-left">
          <h1 className="text-4xl font-bold">
            Hello, I am{" "}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#D73F09] to-[#FDB813] transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-[-5deg] animate-gradient">
              James
            </span>
            .
          </h1>
          <p className="text-lg max-w-xl">
            AI/Product Engineer at Magical in San Francisco. I build agentic AI
            systems that ship — a $1.5M recommendation engine at Estée Lauder,
            a university-wide AI portal at Oregon State, and a few things in
            between.
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D73F09]" />
            Currently building at Magical Inc · San Francisco
          </p>
        </div>
        <div className="flex flex-col gap-y-3 items-center sm:items-start">
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/home")}
              className="rounded-full border border-solid border-transparent flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 shadow-lg transition-all duration-200 ease-in-out hover:scale-105 transform"
            >
              See My Work
            </button>
            <button
              onClick={() => router.push("/wormhole-config/")}
              className="rounded-full border border-solid border-[#D73F09] bg-transparent text-[#D73F09] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-[#D73F09] hover:text-white transition-colors"
            >
              Enter the Wormhole
            </button>
            <a
              href="/james_smith_resume.pdf"
              download="james_smith_resume.pdf"
              className="rounded-full border border-solid border-foreground bg-transparent text-foreground font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => router.push("/book")}
              className="rounded-full border border-solid border-foreground bg-transparent text-foreground font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              Book a Meeting
            </button>
          </div>
          <p className="text-xs max-w-xl text-gray-500 text-center sm:text-left">
            The Wormhole: an AI generates every page as you browse — no two
            visits are alike.
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <a
          href="https://www.linkedin.com/in/james-m-smith1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn ↗
        </a>
        <Link href="/playground" className="hover:text-foreground transition-colors">
          Playground ↗
        </Link>
        <Link href="/blog" className="hover:text-foreground transition-colors">
          Blog ↗
        </Link>
      </footer>
    </div>
  );
}

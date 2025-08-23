"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/wormhole-config/");
  };

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
            I am a Computer Science student focusing on Machine Learning with a
            background in Full Stack, ML/AI, and DevOps. I decided to make a
            portfolio page and create a unique portfolio experience.
          </p>
          <p className="text-xs max-w-xl text-gray-500">
            The Wormhole is a unique browsing experience, where AI generates
            each page being viewed. It has been fed information about me, and
            makes each vist a one of a kind portfolio viewing experience. Take
            everything with a grain of salt since it is AI generated. I
            encourage you to play around wiht it, as this is an experiment.
            Enjoy, James.
          </p>
        </div>
        <div className="flex flex-col gap-y-4 items-center sm:items-start">
          <button
            onClick={handleButtonClick}
            className="rounded-full border border-solid border-transparent flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto shadow-lg transition-all duration-200 ease-in-out hover:scale-105 transform"
          >
            Enter the Wormhole
          </button>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/james_smith_resume.pdf"
              download="james_smith_resume.pdf"
              className="rounded-full border border-solid border-foreground bg-transparent text-foreground font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-foreground hover:text-background"
            >
              Resume
            </a>
            <button
              onClick={() => router.push("/home")}
              className="rounded-full border border-solid border-foreground bg-transparent text-foreground font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-foreground hover:text-background"
            >
              Portfolio
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/james-m-smith1",
                  "_blank"
                )
              }
              className="rounded-full border border-solid border-foreground bg-transparent text-foreground font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center hover:bg-foreground hover:text-background"
            >
              LinkedIn
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* You can add footer content here if you like */}
      </footer>
    </div>
  );
}

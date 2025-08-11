"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/wormhole-config/");
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Hello, I am James.
        </h1>
        <p className="text-lg text-center sm:text-left max-w-xl">
          I am a Computer Science student focusing on Machine Learning with a
          background in Full Stack, ML/AI, and DevOps. I decided to make a
          unique portfolio page and create something very unique.
        </p>
          <button
            onClick={handleButtonClick}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Enter the Wormhole
          </button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* You can add footer content here if you like */}
      </footer>
    </div>
  );
}

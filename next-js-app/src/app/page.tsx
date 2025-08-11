"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleApiKeySubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      localStorage.setItem("generatedContent", data.generatedContent);
      router.push("/wormhole/home");
    } catch (err) {
      setError("Failed to generate content. Please check your API key and try again.");
      console.error(err);
    }
    setLoading(false);
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
        {!showInput ? (
          <button
            onClick={handleButtonClick}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Enter the Wormhole
          </button>
        ) : (
          <div className="flex flex-col gap-4 items-center sm:flex-row">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API Key"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[300px]"
            />
            <button
              onClick={handleApiKeySubmit}
              disabled={loading}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto disabled:opacity-50"
            >
              {loading ? "Generating..." : "Submit"}
            </button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* You can add footer content here if you like */}
      </footer>
    </div>
  );
}

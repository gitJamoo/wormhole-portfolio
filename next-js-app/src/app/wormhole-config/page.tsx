"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WormholeConfig() {
  const router = useRouter();
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedInstructions = localStorage.getItem("wormholeInstructions");
    if (savedInstructions) {
      setAdditionalInstructions(savedInstructions);
    }
  }, []);

  const handleApiKeySubmit = async () => {
    setLoading(true);
    setError("");
    try {
      localStorage.setItem("geminiApiKey", apiKey);
      router.push("/wormhole/home");
    } catch (err) {
      setError(
        "Failed to generate content. Please check your API key and try again."
      );
      console.error(err);
    }
    setLoading(false);
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleSaveInstructions = () => {
    localStorage.setItem("wormholeInstructions", additionalInstructions);
    alert("Instructions saved!");
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Wormhole Configuration
        </h1>
        <p className="text-lg text-center sm:text-left max-w-xl">
          This page allows you to configure the settings for the wormhole. More
          options will be available here soon.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          <label htmlFor="system-instructions" className="text-lg font-medium">
            Additional System Instructions:
          </label>
          <textarea
            id="system-instructions"
            className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors p-4 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter additional instructions for the wormhole API..."
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
          />
          <button
            onClick={handleSaveInstructions}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto self-end"
          >
            Save Instructions
          </button>
        </div>
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
        {/* Optional: Add footer content specific to this page or a back button */}
      </footer>
    </div>
  );
}

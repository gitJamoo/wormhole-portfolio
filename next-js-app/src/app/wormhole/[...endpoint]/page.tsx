"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import LoadingScreen from "./loadingScreen";

export default function WormholePage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const generateContent = async () => {
      setLoading(true);
      setError("");
      const apiKey = localStorage.getItem("geminiApiKey");
      const selectedModel = localStorage.getItem("selectedWormholeModel");
      const language = localStorage.getItem("wormholeLanguage") || "English";
      const additionalInstructions =
        localStorage.getItem("wormholeInstructions");
      const useImageAssets = localStorage.getItem("useImageAssets")
        ? JSON.parse(localStorage.getItem("useImageAssets")!)
        : true;
      const temperature = localStorage.getItem("temperature")
        ? JSON.parse(localStorage.getItem("temperature")!)
        : 0.5;

      // if (!apiKey) {
      //   setError(
      //     "API key not found. Please return to the home page to enter it."
      //   );
      //   setLoading(false);
      //   return;
      // }

      if (!selectedModel) {
        setError(
          "Model not selected. Please return to the configuration page to select a model."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiKey,
            currentPath: pathname.replace("/wormhole", "") || "/",
            selectedModel,
            language,
            additionalInstructions,
            useImageAssets,
            temperature,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate content");
        }

        const data = await response.json();
        setContent(data.generatedContent);
      } catch (err) {
        setError("Failed to generate content. Please try again later.");
        console.error(err);
      }
      setLoading(false);
    };

    generateContent();
  }, [pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md px-6">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-white text-xl font-semibold mb-2">
            Generation Failed
          </h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

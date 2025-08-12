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
    return <div>{error}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const languages = [
  "English",
  "Arabic",
  "Bengali",
  "Bulgarian",
  "Chinese (Simplified & Traditional)",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Estonian",
  "Farsi",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Gujarati",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Indonesian",
  "Italian",
  "Japanese",
  "Kannada",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Malayalam",
  "Marathi",
  "Norwegian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tamil",
  "Telugu",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Vietnamese",
];

export default function WormholeConfig() {
  const router = useRouter();

  const [apiKey, setApiKey] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [language, setLanguage] = useState("English");
  const [useImageAssets, setUseImageAssets] = useState(true);
  const [temperature, setTemperature] = useState(1.0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const savedInstructions = localStorage.getItem("wormholeInstructions");
    if (savedInstructions) {
      setAdditionalInstructions(savedInstructions);
    }
    const savedModel = localStorage.getItem("selectedWormholeModel");
    if (savedModel) {
      setSelectedModel(savedModel);
      setSelectedProvider("Gemini");
    }
    const savedApiKey = localStorage.getItem("geminiApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedLanguage = localStorage.getItem("wormholeLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    const savedUseImageAssets = localStorage.getItem("useImageAssets");
    if (savedUseImageAssets) {
      setUseImageAssets(JSON.parse(savedUseImageAssets));
    }
    const savedTemperature = localStorage.getItem("temperature");
    if (savedTemperature) {
      setTemperature(JSON.parse(savedTemperature));
    }
  }, []);

  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem("selectedWormholeModel", selectedModel);
    }
  }, [selectedModel]);

  useEffect(() => {
    localStorage.setItem("wormholeLanguage", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("useImageAssets", JSON.stringify(useImageAssets));
  }, [useImageAssets]);

  useEffect(() => {
    localStorage.setItem("temperature", JSON.stringify(temperature));
  }, [temperature]);

  const handleSaveApiKey = () => {
    localStorage.setItem("geminiApiKey", apiKey);
    alert("API Key saved!");
  };

  const handleContinue = () => {
    router.push("/wormhole/home");
  };

  const handleSaveInstructions = () => {
    localStorage.setItem("wormholeInstructions", additionalInstructions);
    console.log(additionalInstructions);
    alert("Instructions saved!");
  };

  const handleContinueWithDefaults = () => {
    localStorage.setItem("selectedWormholeModel", "gemini-2.5-flash-lite");
    localStorage.setItem("temperature", "1.0");
    localStorage.setItem("wormholeLanguage", "English");
    localStorage.removeItem("wormholeInstructions");
    localStorage.setItem("useImageAssets", JSON.stringify(true));
    router.push("/wormhole/home");
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Welcome to the Wormhole
            </h2>
            <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
              The Wormhole is a unique browsing experience where AI generates
              each page you view. It has been fed information about myself to
              create a one-of-a-kind portfolio viewing experience.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="p-4 border rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold block">Configure settings</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Custom prompts, 50+ languages, model selection, temperature +
                  more
                </span>
              </button>
              <button
                onClick={handleContinueWithDefaults}
                className="p-4 border rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold block">
                  Continue with defaults
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Default system prompts on gemini-2.5-flash-lite, temperature
                  1.0, in English
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Wormhole Configuration
        </h1>
        <p className="text-lg text-center sm:text-left max-w-xl">
          This page allows you to configure the settings for the wormhole. More
          options will be available here soon.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          <label htmlFor="language-select" className="text-lg font-medium">
            Generation Language:
          </label>
          <select
            id="language-select"
            className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

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

        <div className="flex flex-col gap-4 w-full max-w-xl">
          <label
            htmlFor="use-image-assets"
            className="text-lg font-medium flex items-center gap-2"
          >
            Use Image Assets:
            <input
              id="use-image-assets"
              type="checkbox"
              checked={useImageAssets}
              onChange={(e) => setUseImageAssets(e.target.checked)}
              className="h-5 w-5"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          <label htmlFor="temperature" className="text-lg font-medium">
            Temperature: {temperature}
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="model-provider" className="text-lg font-medium">
              Model Provider:
            </label>
            <select
              id="model-provider"
              className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
            >
              <option value="">Select a provider</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>

          {selectedProvider === "Gemini" && (
            <>
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="gemini-model" className="text-lg font-medium">
                  Gemini Model:
                </label>
                <select
                  id="gemini-model"
                  className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">Select a model</option>
                  <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro</option>
                  <option value="gemini-2.5-flash-lite">
                    gemini-2.5-flash-lite
                  </option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                </select>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="api-key" className="text-lg font-medium">
                  API Key (Optional):
                </label>
                <div className="flex gap-2">
                  <input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API Key"
                    className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        >
          Enter the Wormhole
        </button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Optional: Add footer content specific to this page or a back button */}
      </footer>
    </div>
  );
}

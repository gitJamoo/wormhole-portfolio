import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";
import { MODEL_TO_API_PROVIDER } from "@/lib/wormhole-models";

type Resolved =
  | { model: LanguageModelV1 }
  | { error: string; status: number };

// Shared by /api/generate and /api/vectorize: validates the model id against
// the Wormhole model list and builds a client with the caller's key or ours.
export function resolveModel(
  selectedModel: string | undefined,
  apiKey: string | undefined
): Resolved {
  const provider = selectedModel ? MODEL_TO_API_PROVIDER[selectedModel] : undefined;
  if (!selectedModel || !provider) {
    return { error: "Invalid model selected", status: 400 };
  }

  const envMap: Record<string, string | undefined> = {
    google: process.env.GEMINI_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
  };
  const apiKeyToUse = apiKey || envMap[provider];
  if (!apiKeyToUse) {
    return { error: `API key for ${provider} not configured`, status: 400 };
  }

  if (provider === "google") {
    return { model: createGoogleGenerativeAI({ apiKey: apiKeyToUse })(selectedModel) };
  }
  if (provider === "openai") {
    return { model: createOpenAI({ apiKey: apiKeyToUse })(selectedModel) };
  }
  return { model: createAnthropic({ apiKey: apiKeyToUse })(selectedModel) };
}

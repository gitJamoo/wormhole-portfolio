import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModelV1 } from "ai";
import type { NextRequest } from "next/server";
import {
  MODEL_TO_API_PROVIDER,
  SERVER_KEY_MODELS,
} from "@/lib/wormhole-models";

type Resolved =
  | { model: LanguageModelV1 }
  | { error: string; status: number };

// Best-effort per-IP limit for requests that spend the site's own keys.
// In-memory, so it's per serverless instance: it stops a casual loop, while
// provider spend caps remain the hard backstop.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function rateLimited(req: NextRequest): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

// Shared by /api/generate and /api/vectorize: validates the model id against
// the Wormhole model list and builds a client with the caller's key or ours.
export function resolveModel(
  req: NextRequest,
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
  if (!apiKey) {
    if (!SERVER_KEY_MODELS.has(selectedModel)) {
      return { error: "Add your own API key to use this model", status: 403 };
    }
    if (rateLimited(req)) {
      return { error: "Too many requests, try again in a few minutes", status: 429 };
    }
  }

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

// Shared model list for the Wormhole feature.
// Single source of truth used by both wormhole-config/page.tsx (client) and
// api/generate/route.ts (server). The client uses displayProvider ("Gemini" /
// "OpenAI" / "Claude"); the server needs the lowercase provider key
// ("google" / "openai" / "anthropic").

export type WormholeModel = {
  id: string;
  /** Human-readable provider label used in the client UI. */
  displayProvider: "Gemini" | "OpenAI" | "Claude";
  /** Lowercase provider key consumed by the API route / Vercel AI SDK. */
  apiProvider: "google" | "openai" | "anthropic";
};

export const WORMHOLE_MODELS: WormholeModel[] = [
  // --- Google Gemini (cheap → mid) ---
  { id: "gemini-2.5-flash-lite", displayProvider: "Gemini", apiProvider: "google" },
  { id: "gemini-2.5-flash",      displayProvider: "Gemini", apiProvider: "google" },
  { id: "gemini-3.5-flash",      displayProvider: "Gemini", apiProvider: "google" },
  { id: "gemini-3.1-flash-lite", displayProvider: "Gemini", apiProvider: "google" },

  // --- OpenAI (cheap → mid) ---
  { id: "gpt-4o-mini",   displayProvider: "OpenAI", apiProvider: "openai" },
  { id: "gpt-5.4-nano",  displayProvider: "OpenAI", apiProvider: "openai" },
  { id: "gpt-5.4-mini",  displayProvider: "OpenAI", apiProvider: "openai" },

  // --- Anthropic Claude (cheap → mid) ---
  { id: "claude-haiku-4-5-20251001", displayProvider: "Claude", apiProvider: "anthropic" },
  { id: "claude-sonnet-4-6",         displayProvider: "Claude", apiProvider: "anthropic" },
  { id: "claude-sonnet-5",           displayProvider: "Claude", apiProvider: "anthropic" },
];

/** id → displayProvider  (used by the config page) */
export const MODEL_TO_DISPLAY_PROVIDER: Record<string, WormholeModel["displayProvider"]> =
  Object.fromEntries(WORMHOLE_MODELS.map((m) => [m.id, m.displayProvider]));

/** id → apiProvider  (used by the API route) */
export const MODEL_TO_API_PROVIDER: Record<string, WormholeModel["apiProvider"]> =
  Object.fromEntries(WORMHOLE_MODELS.map((m) => [m.id, m.apiProvider]));

/** The default model used by "Continue with defaults". */
export const DEFAULT_WORMHOLE_MODEL = "gemini-2.5-flash-lite";

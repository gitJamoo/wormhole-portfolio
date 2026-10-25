import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { resolveModel } from "@/lib/llm";
import { DEFAULT_WORMHOLE_MODEL } from "@/lib/wormhole-models";

const vectorSchema = z.object({
  words: z.array(
    z.object({
      word: z.string().describe("The input word, unchanged."),
      x: z.number().describe("X coordinate, between -1 and 1."),
      y: z.number().describe("Y coordinate, between -1 and 1."),
      z: z.number().describe("Z coordinate, between -1 and 1."),
      reason: z
        .string()
        .describe(
          "One short sentence (max ~15 words) explaining why the word sits where it does relative to the others."
        ),
    })
  ),
  axes: z
    .object({
      x: z.string().describe("A 2-3 word label for what the X axis roughly represents."),
      y: z.string().describe("A 2-3 word label for what the Y axis roughly represents."),
      z: z.string().describe("A 2-3 word label for what the Z axis roughly represents."),
    })
    .describe("Rough human-readable meaning you assigned to each axis."),
});

export async function POST(req: NextRequest) {
  try {
    const {
      words,
      apiKey,
      selectedModel = DEFAULT_WORMHOLE_MODEL,
    }: { words: string[]; apiKey?: string; selectedModel?: string } =
      await req.json();

    if (!Array.isArray(words) || words.length === 0) {
      return NextResponse.json(
        { error: "At least one word is required" },
        { status: 400 }
      );
    }

    if (words.length > 30) {
      return NextResponse.json(
        { error: "Please use 30 words or fewer" },
        { status: 400 }
      );
    }

    const resolved = resolveModel(selectedModel, apiKey);
    if ("error" in resolved) {
      return NextResponse.json(
        { error: resolved.error },
        { status: resolved.status }
      );
    }
    const { model } = resolved;

    const system = `You are an educational tool that demonstrates how word embeddings work.
Given a list of words, place each word as a point in a simple 3D vector space (a toy stand-in for the high-dimensional embedding space real language models use).

Rules:
- Semantically similar words (similar meaning, category, or usage) MUST be placed close together.
- Unrelated words MUST be placed far apart.
- Try to make the three axes correspond to interpretable semantic directions (e.g. living vs non-living, abstract vs concrete, size, gender, sentiment). Pick whatever axes best separate THESE particular words.
- Preserve meaningful relationships so simple vector arithmetic roughly works (e.g. king - man + woman should land near queen).
- All coordinates must be between -1 and 1. Spread the words out to fill the space; do not cluster everything near the origin.
- Return every input word exactly once, spelled exactly as given.`;

    const prompt = `Place these words in the 3D space:\n${words
      .map((w) => `- ${w}`)
      .join("\n")}`;

    const { object } = await generateObject({
      model,
      schema: vectorSchema,
      system,
      prompt,
      temperature: 0.2,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Error vectorizing words:", error);
    return NextResponse.json(
      { error: "Failed to vectorize words" },
      { status: 500 }
    );
  }
}

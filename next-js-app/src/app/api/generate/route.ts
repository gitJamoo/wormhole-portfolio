import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import fs from "fs";
import path from "path";
import { resolveModel } from "@/lib/llm";
import { loadBragSheets } from "@/lib/brag-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, selectedModel, useImageAssets = true } = body;
    // Bound free-text inputs so a request can't inflate the prompt (and bill).
    const currentPath = String(body.currentPath ?? "").slice(0, 200);
    const additionalInstructions = String(body.additionalInstructions ?? "").slice(0, 2000);
    const language = String(body.language || "English").slice(0, 50);
    const t = Number(body.temperature ?? 0.5);
    const temperature = Number.isFinite(t) ? Math.min(Math.max(t, 0), 2) : 0.5;

    if (!currentPath) {
      return NextResponse.json(
        { error: "Current path is required" },
        { status: 400 }
      );
    }

    const resolved = resolveModel(req, selectedModel, apiKey);
    if ("error" in resolved) {
      return NextResponse.json(
        { error: resolved.error },
        { status: resolved.status }
      );
    }
    const { model } = resolved;

    // Brag sheets are the source of truth; info.md/resume.md are the offline fallback.
    const brag = await loadBragSheets();
    const candidateInfo = brag
      ? `These are the candidate's brag sheets, the source of truth about his work. Respect the confidence tags: state ✅/🟢 figures as fact, qualify 🟡 ones ("about", "projected"), never fill in ❓ or invent numbers.\n\n${brag.context}`
      : localCandidateInfo();

    const systemInstructionsPath = path.join(
      process.cwd(),
      "src",
      "app",
      "api",
      "generate",
      "system-instructions.txt"
    );
    const promptTemplate = fs.readFileSync(systemInstructionsPath, "utf-8");

    let imageAssetsText = "";
    if (useImageAssets) {
      const images = brag ? brag.images.map((i) => `- ${i.url} (${i.alt})`) : localImages();
      if (images.length > 0) {
        imageAssetsText = `
**Available Image Assets:**
You can use the following images in your design. Use each path EXACTLY as written. The text in parentheses describes the photo.
---
${images.join("\n")}
---
`;
      }
    }

    const additionalInstructionsText = additionalInstructions
      ? `**Additional Instructions:**
${additionalInstructions}
---`
      : "";

    const systemPrompt = promptTemplate
      .replace("{{infoMdContent}}", "")
      .replace("{{additionalInstructions}}", "")
      .replace("{{imageAssets}}", "")
      .replace(/{{currentPath}}/g, currentPath)
      .replace("{{language}}", language);

    const userPrompt = `Here is the raw information about the candidate:\n---\n${candidateInfo}\n---\n${additionalInstructionsText}\n${imageAssetsText}`;

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature,
      maxTokens: 4096,
    });

    return NextResponse.json({ generatedContent: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

function localCandidateInfo(): string {
  const read = (file: string) => {
    const p = path.join(process.cwd(), file);
    return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
  };
  const resume = read("resume.md");
  return read("info.md") + (resume ? `\n---\nHere is the candidate's resume:\n${resume}` : "");
}

// Real image files only, with subfolder paths, served from /image-assets.
function localImages(): string[] {
  const dir = path.join(process.cwd(), "public", "image-assets");
  if (!fs.existsSync(dir)) return [];
  return (fs.readdirSync(dir, { recursive: true }) as string[])
    .filter((file) => /\.(jpe?g|png|webp|gif|svg)$/i.test(file))
    .map((file) => `- /image-assets/${file.split(path.sep).join("/")}`);
}

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import fs from "fs";
import path from "path";
import { resolveModel } from "@/lib/llm";

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

    const infoMdPath = path.join(process.cwd(), "info.md");
    const infoMdContent = fs.readFileSync(infoMdPath, "utf-8");

    const resumeMdPath = path.join(process.cwd(), "resume.md");
    const resumeMdContent = fs.existsSync(resumeMdPath)
      ? fs.readFileSync(resumeMdPath, "utf-8")
      : "";

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
      const imageAssetsPath = path.join(
        process.cwd(),
        "public",
        "image-assets"
      );
      if (fs.existsSync(imageAssetsPath)) {
        const imageFiles = fs.readdirSync(imageAssetsPath);
        if (imageFiles.length > 0) {
          imageAssetsText = `
**Available Image Assets:**
You can use the following images in your design. Assume they are served from the '/image-assets' path. For example, to use 'profile.jpg', the path would STRICTLY be '/image-assets/profile.jpg'.
---
${imageFiles.map((file) => `- ${file}`).join("\n")}---
`;
        }
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

    const resumeText = resumeMdContent
      ? `Here is the candidate's resume:\n---\n${resumeMdContent}\n---\n`
      : "";

    const userPrompt = `Here is the raw information about the candidate:\n---\n${infoMdContent}\n---\n${resumeText}${additionalInstructionsText}\n${imageAssetsText}`;



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

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import fs from "fs";
import path from "path";
import { MODEL_TO_API_PROVIDER } from "@/lib/wormhole-models";

export async function POST(req: NextRequest) {
  try {
    const {
      apiKey,
      currentPath,
      additionalInstructions,
      selectedModel,
      language = "English",
      useImageAssets = true,
      temperature = 0.5,
    } = await req.json();

    if (!currentPath) {
      return NextResponse.json(
        { error: "Current path is required" },
        { status: 400 }
      );
    }

    if (!selectedModel) {
      return NextResponse.json(
        { error: "Model selection is required" },
        { status: 400 }
      );
    }

    const provider = MODEL_TO_API_PROVIDER[selectedModel];

    if (!provider) {
      return NextResponse.json(
        { error: "Invalid model selected" },
        { status: 400 }
      );
    }

    let apiKeyToUse: string | undefined;
    if (apiKey) {
      apiKeyToUse = apiKey;
    } else {
      const envMap: Record<string, string | undefined> = {
        google: process.env.GEMINI_API_KEY,
        openai: process.env.OPENAI_API_KEY,
        anthropic: process.env.ANTHROPIC_API_KEY,
      };
      apiKeyToUse = envMap[provider];
    }

    if (!apiKeyToUse) {
      return NextResponse.json(
        { error: `API key for ${provider} not configured` },
        { status: 400 }
      );
    }

    const infoMdPath = path.join(process.cwd(), "info.md");
    const infoMdContent = fs.readFileSync(infoMdPath, "utf-8");

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

    const userPrompt = `Here is the raw information about the candidate:\n---\n${infoMdContent}\n---\n${additionalInstructionsText}\n${imageAssetsText}`;

    console.log(
      "Using model:",
      selectedModel,
      "from provider:",
      provider,
      "with temperature:",
      temperature
    );

    let model;
    if (provider === "google") {
      const google = createGoogleGenerativeAI({ apiKey: apiKeyToUse });
      model = google(selectedModel);
    } else if (provider === "openai") {
      const openai = createOpenAI({ apiKey: apiKeyToUse });
      model = openai(selectedModel);
    } else {
      const anthropic = createAnthropic({ apiKey: apiKeyToUse });
      model = anthropic(selectedModel);
    }

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

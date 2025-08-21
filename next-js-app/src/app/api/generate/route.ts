import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const envApiKey = process.env.GEMINI_API_KEY;
  let apiKeyToUse = envApiKey;

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

    if (apiKey) {
      apiKeyToUse = apiKey;
    }

    if (!apiKeyToUse) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 400 }
      );
    }

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

    const infoMdPath = path.join(process.cwd(), "info.md");
    const infoMdContent = fs.readFileSync(infoMdPath, "utf-8");

    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    const model = genAI.getGenerativeModel({
      model: selectedModel,
      generationConfig: {
        temperature: temperature,
      },
    });

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

    const prompt = promptTemplate
      .replace("{{infoMdContent}}", infoMdContent)
      .replace("{{additionalInstructions}}", additionalInstructionsText)
      .replace("{{imageAssets}}", imageAssetsText)
      .replace(/{{currentPath}}/g, currentPath)
      .replace("{{language}}", language);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(
      "Using model:",
      selectedModel,
      "with temperature:",
      temperature
    );

    return NextResponse.json({ generatedContent: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

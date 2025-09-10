import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const modelToProvider: { [key: string]: string } = {
  "gemini-2.5-flash": "Gemini",
  "gemini-2.5-pro": "Gemini",
  "gemini-2.5-flash-lite": "Gemini",
  "gemini-1.5-flash": "Gemini",
  "claude-3-7-sonnet-latest": "Claude",
  "claude-opus-4-1-20250805": "Claude",
  "claude-sonnet-4-20250514": "Claude",
  "claude-3-haiku-20240307": "Claude",
  "gpt-4o": "OpenAI",
  "gpt-4-turbo": "OpenAI",
  "gpt-3.5-turbo": "OpenAI",
};

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

    const provider = modelToProvider[selectedModel];

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
      if (provider === "Gemini") {
        apiKeyToUse = process.env.GEMINI_API_KEY;
      } else if (provider === "OpenAI") {
        apiKeyToUse = process.env.OPENAI_API_KEY;
      } else if (provider === "Claude") {
        apiKeyToUse = process.env.ANTHROPIC_API_KEY;
      }
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

    let generatedContent: string = "";

    console.log(
      "Using model:",
      selectedModel,
      "from provider:",
      provider,
      "with temperature:",
      temperature
    );

    if (provider === "Gemini") {
      const genAI = new GoogleGenerativeAI(apiKeyToUse);
      const model = genAI.getGenerativeModel({
        model: selectedModel,
        generationConfig: {
          temperature: temperature,
        },
      });
      const prompt = promptTemplate
        .replace("{{infoMdContent}}", infoMdContent)
        .replace("{{additionalInstructions}}", additionalInstructionsText)
        .replace("{{imageAssets}}", imageAssetsText)
        .replace(/{{currentPath}}/g, currentPath)
        .replace("{{language}}", language);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      generatedContent = await response.text();
    } else if (provider === "OpenAI") {
      const openai = new OpenAI({ apiKey: apiKeyToUse });
      const systemPrompt = promptTemplate
        .replace("{{infoMdContent}}", "")
        .replace("{{additionalInstructions}}", "")
        .replace("{{imageAssets}}", "")
        .replace(/{{currentPath}}/g, currentPath)
        .replace("{{language}}", language);
      const userPrompt = `Here is the raw information about the candidate:\n---\n${infoMdContent}\n---\n${additionalInstructionsText}\n${imageAssetsText}`;
      const completion = await openai.chat.completions.create({
        model: selectedModel,
        temperature: temperature,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      });
      generatedContent = completion.choices[0].message.content ?? "";
    } else if (provider === "Claude") {
      const anthropic = new Anthropic({ apiKey: apiKeyToUse });
      const systemPrompt = promptTemplate
        .replace("{{infoMdContent}}", "")
        .replace("{{additionalInstructions}}", "")
        .replace("{{imageAssets}}", "")
        .replace(/{{currentPath}}/g, currentPath)
        .replace("{{language}}", language);
      const userPrompt = `Here is the raw information about the candidate:\n---\n${infoMdContent}\n---\n${additionalInstructionsText}\n${imageAssetsText}`;
      const message = await anthropic.messages.create({
        model: selectedModel,
        max_tokens: 4096,
        temperature: temperature,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });
      if (message.content[0].type === "text") {
        generatedContent = message.content[0].text;
      }
    }

    return NextResponse.json({ generatedContent });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

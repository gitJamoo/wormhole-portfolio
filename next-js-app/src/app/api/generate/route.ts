import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { apiKey, currentPath, additionalInstructions } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    if (!currentPath) {
      return NextResponse.json(
        { error: "Current path is required" },
        { status: 400 }
      );
    }

    const infoMdPath = path.join(process.cwd(), "info.md");
    const infoMdContent = fs.readFileSync(infoMdPath, "utf-8");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert web developer and a creative storyteller. Your task is to build a single, visually stunning webpage section for a portfolio.

      **Candidate Information:**
      Here is the raw information about the candidate:
      ---
      ${infoMdContent}
      ---

      ${additionalInstructions ? `**Additional Instructions:**
      ${additionalInstructions}
      ---
      ` : ''}

      **Your Task:**

      1.  **Path:** The user is currently viewing the page at the path: '/wormhole${currentPath}'. The content you generate should be exclusively for this path.

      2.  **Content Generation:**
          *   **DO NOT** just copy the information verbatim.
          *   **DO** interpret and infer from the candidate's experiences. Tell a story. For example, instead of just listing skills, you could describe how the candidate has applied them in their projects. Instead of just listing a project, describe the challenges and what the candidate learned.
          *   Be creative, engaging, and professional.

      3.  **Styling:**
          *   **Go crazy with the styling!** Create a modern, visually appealing, and unique design.
          *   Use inline CSS within the HTML. Feel free to use advanced CSS like gradients, animations, and modern layout techniques (Flexbox, Grid).
          *   The design should be professional and suitable for a portfolio.

      4.  **Output Format:**
          *   Provide only the HTML for the content of the page.
          *   **DO NOT** include <html>, <head>, or <body> tags.
          *   Include navigation links to other potential pages: /wormhole/home, /wormhole/projects, /wormhole/skills, and /wormhole/contact.

      Generate the HTML for the '${currentPath}' page now. DO NOT WRAP IN MARKDOWN, just HTML.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ generatedContent: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

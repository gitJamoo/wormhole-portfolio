import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    const infoMdPath = path.join(process.cwd(), "info.md");
    const infoMdContent = fs.readFileSync(infoMdPath, "utf-8");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Based on the following information about me:
      ${infoMdContent}

      and the current path:
      ${path}

      Generate a creative and factual portfolio website about me. The website should be a fully navigable web app. The response should be a single HTML file with inline CSS and JavaScript. The user should be able to navigate the app through a simulated URL path like '/<endpoint>'. The JavaScript code should handle this routing and change the content of the page based on the endpoint.

      For example, you could have the following endpoints:
      - /home: A landing page with a brief introduction and a way to route around the portfolio.
      - /projects: A page showcasing my projects.
      - /skills: A page listing my skills.
      - /contact: A page with my contact information.

      The generated HTML should be relevant and have information about me given the current path

      Do NOT! Wrap in markdown, it should just be the app. 
    `;

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

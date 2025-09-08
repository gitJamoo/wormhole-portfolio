import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const submissionsDir = path.resolve(process.cwd(), "contact-submissions");
const submissionsFile = path.resolve(submissionsDir, "submissions.json");

async function getSubmissions() {
  try {
    const data = await fs.readFile(submissionsFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

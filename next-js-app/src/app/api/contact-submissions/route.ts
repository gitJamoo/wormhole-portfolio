import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

async function getSubmissions() {
  try {
    const { blobs } = await list({ prefix: "submissions.json" });
    if (blobs.length === 0) {
      return [];
    }
    const submissionsBlob = blobs[0];
    const response = await fetch(submissionsBlob.url);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    const submissions = await response.json();
    return submissions;
  } catch (error) {
    console.error("Error fetching submissions from blob:", error);
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

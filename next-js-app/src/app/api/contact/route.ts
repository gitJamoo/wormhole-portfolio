import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

interface Submission {
  name: string;
  email: string;
  message: string;
  date: string;
}

async function getSubmissions(): Promise<Submission[]> {
  try {
    const { blobs } = await list({ prefix: "submissions.json" });
    if (blobs.length === 0) {
      return [];
    }
    const submissionsBlob = blobs[0];
    const response = await fetch(submissionsBlob.url);
    if (!response.ok) {
      // If the blob is not found or there's an error, start fresh.
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    const submissions = await response.json();
    return submissions;
  } catch (error) {
    console.error("Error fetching submissions from blob:", error);
    // In case of any error, assume no submissions exist to avoid data loss.
    return [];
  }
}

async function saveSubmissions(data: Submission[]) {
  await put("submissions.json", JSON.stringify(data, null, 2), {
    access: "public",
    allowOverwrite: true, // Overwrite the existing blob
    cacheControlMaxAge: 0, // Ensure fresh data is always read
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSubmission: Submission = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    const submissions = await getSubmissions();
    submissions.push(newSubmission);
    await saveSubmissions(submissions);

    return NextResponse.json({ message: "Submission saved" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { timingSafeEqual } from "crypto";

// The admin password lives only on the server (Vercel env var). If it's not
// set, the endpoint stays closed.
function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.CONTACT_ADMIN_PASSWORD;
  const given = req.headers.get("x-admin-password");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

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

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
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

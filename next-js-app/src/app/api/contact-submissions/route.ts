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

async function fetchJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

// Each submission is its own blob under submissions/. The old single
// submissions.json file is still read so earlier messages keep showing.
async function getSubmissions() {
  const urls: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "submissions/", cursor });
    urls.push(...page.blobs.map((b) => b.url));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const { blobs: legacy } = await list({ prefix: "submissions.json" });
  const legacySubmissions = legacy.length ? await fetchJson(legacy[0].url) : [];

  const submissions = [
    ...legacySubmissions,
    ...(await Promise.all(urls.map(fetchJson))),
  ];
  return submissions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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

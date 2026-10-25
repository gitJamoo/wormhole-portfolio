import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

interface Submission {
  name: string;
  email: string;
  message: string;
  date: string;
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
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      message: String(message).slice(0, 5000),
      date: new Date().toISOString(),
    };

    // One blob per submission: concurrent posts can't overwrite each other,
    // and a failed read can never wipe history. The random suffix keeps the
    // public blob URL unguessable.
    await put(
      `submissions/${newSubmission.date}.json`,
      JSON.stringify(newSubmission),
      { access: "public", addRandomSuffix: true }
    );

    return NextResponse.json({ message: "Submission saved" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

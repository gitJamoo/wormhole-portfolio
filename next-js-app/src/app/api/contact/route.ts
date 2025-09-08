import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const submissionsDir = path.resolve(process.cwd(), 'contact-submissions');
const submissionsFile = path.resolve(submissionsDir, 'submissions.json');

async function ensureSubmissionsDirExists() {
  try {
    await fs.mkdir(submissionsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating submissions directory:', error);
  }
}

async function getSubmissions() {
  try {
    await ensureSubmissionsDirExists();
    const data = await fs.readFile(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveSubmission(data: any) {
  const submissions = await getSubmissions();
  submissions.push(data);
  await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newSubmission = {
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    await saveSubmission(newSubmission);

    return NextResponse.json({ message: 'Submission saved' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

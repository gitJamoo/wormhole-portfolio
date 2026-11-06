import type { Metadata } from "next";
import Link from "next/link";

// OAuth app privacy policy. See ../layout.tsx for why this page exists.
export const metadata: Metadata = {
  title: "agent-kit privacy policy",
};

export default function AgentKitPrivacy() {
  return (
    <>
      <h1 className="text-3xl font-bold">agent-kit privacy policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last updated November 6, 2026
      </p>
      <p>
        agent-kit is used only by its owner, James M. Smith, with his own
        Google account. It is not offered to anyone else.
      </p>
      <h2 className="text-xl font-semibold pt-4">What it accesses</h2>
      <p>
        With the owner&apos;s permission, it reads and manages his Gmail,
        Google Drive, Google Calendar and Google Tasks, and reads his basic
        profile and email address.
      </p>
      <h2 className="text-xl font-semibold pt-4">How data is used</h2>
      <p>
        Data is used only to carry out tasks the owner asks for on his own
        devices. It is not sold, shared with third parties, or used for
        advertising. Sign-in credentials are stored in the owner&apos;s own
        secrets manager.
      </p>
      <p>
        Use of information received from Google APIs adheres to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          className="underline"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
      <h2 className="text-xl font-semibold pt-4">Removing access</h2>
      <p>
        Access can be revoked at any time from{" "}
        <a
          href="https://myaccount.google.com/permissions"
          className="underline"
        >
          Google Account &gt; Third-party connections
        </a>
        .
      </p>
      <p>
        <Link href="/agent-kit" className="underline">
          Back to agent-kit
        </Link>
      </p>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

// OAuth app homepage. See ./layout.tsx for why this page exists.
export const metadata: Metadata = {
  title: "agent-kit",
};

export default function AgentKitHome() {
  return (
    <>
      <h1 className="text-3xl font-bold">agent-kit</h1>
      <p>
        agent-kit is a personal tool. It lets James M. Smith&apos;s own
        computers sign in to his own Google account so that his scripts and
        assistants can use his Gmail, Google Drive, Google Calendar and Google
        Tasks.
      </p>
      <p>
        It is not a public product, and no one else can sign up for it.
      </p>
      <p>
        <Link href="/agent-kit/privacy" className="underline">
          Privacy policy
        </Link>
      </p>
    </>
  );
}

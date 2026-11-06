import type { Metadata } from "next";

// Unlisted pages for the Google OAuth app behind agent-kit
// (github.com/gitJamoo/agent-kit), the tool that lets James's own machines
// sign in to his Google account for Gmail, Drive, Calendar and Tasks.
//
// Google requires a homepage URL and a privacy policy URL before an OAuth app
// can move from "Testing" (logins expire every 7 days) to "In production".
// These two pages exist only to satisfy that requirement. Their URLs are
// entered on Google Cloud Console > Google Auth Platform > Branding.
//
// Keep them unlisted: no links from the rest of the site, no sitemap entry,
// and noindex below. They are deliberately left out of robots.ts too, since a
// disallow rule would publicly list the path. Don't move or rename these
// routes without updating the URLs in the Branding page, or Google may
// reject the app.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AgentKitLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto px-6 py-16 max-w-2xl space-y-4 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

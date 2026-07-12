import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { TagFilter } from "./TagFilter";

export const metadata: Metadata = {
  title: "Blog — James M. Smith",
  description:
    "Thoughts on AI, product engineering, and building things that work — by James M. Smith.",
  openGraph: {
    title: "Blog — James M. Smith",
    description:
      "Thoughts on AI, product engineering, and building things that work — by James M. Smith.",
    url: "https://j-m-s.dev/blog",
    siteName: "James M. Smith",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  // strip content before passing to client component (serialization budget)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const postMeta = posts.map(({ content: _content, ...rest }) => rest);
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Back link */}
        <Link
          href="/home"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts on AI, product engineering, and building things that actually work.
            Written by James M. Smith.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-400 dark:text-gray-500">
            <a
              href="/blog/rss.xml"
              className="inline-flex items-center gap-1.5 hover:text-orange-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 012.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 012.18-2.18M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44m0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
              </svg>
              RSS feed
            </a>
          </div>
        </header>

        {/* Tag filter + cards */}
        <TagFilter posts={postMeta} allTags={allTags} />
      </div>
    </div>
  );
}

import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://j-m-s.dev";
const AUTHOR = "James M. Smith";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = post.date
        ? new Date(post.date + "T00:00:00").toUTCString()
        : "";

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <author>galavantinggeckoguy@gmail.com (${AUTHOR})</author>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AUTHOR)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Thoughts on AI, product engineering, and building things that work — by ${escapeXml(AUTHOR)}.</description>
    <language>en-us</language>
    <managingEditor>galavantinggeckoguy@gmail.com (${AUTHOR})</managingEditor>
    <webMaster>galavantinggeckoguy@gmail.com (${AUTHOR})</webMaster>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

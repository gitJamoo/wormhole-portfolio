import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

// j-m-s.dev redirects to www, so list the final URLs.
const BASE_URL = "https://www.j-m-s.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/home",
    "/blog",
    "/playground",
    "/playground/llm-sandbox",
    "/wormhole-config",
    "/book",
  ].map((path) => ({ url: `${BASE_URL}${path}` }));

  const posts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date || undefined,
  }));

  return [...pages, ...posts];
}

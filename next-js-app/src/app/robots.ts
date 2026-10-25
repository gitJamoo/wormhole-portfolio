import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/contact-submissions"],
    },
    sitemap: "https://www.j-m-s.dev/sitemap.xml",
  };
}

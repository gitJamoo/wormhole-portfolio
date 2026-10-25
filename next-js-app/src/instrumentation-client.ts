import posthog from "posthog-js";

// Requests go through the /ingest rewrite in next.config.ts so ad blockers
// don't drop them. Pageviews, clicks, referrers and UTM params are captured
// automatically.
if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
  });
}

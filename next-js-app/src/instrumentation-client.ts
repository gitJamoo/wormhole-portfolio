import posthog from "posthog-js";

// Public project key (it ships to the browser regardless). Hardcoded as a
// fallback because the Vercel project that builds production doesn't have
// NEXT_PUBLIC_POSTHOG_KEY set.
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_vA2h4wLkDFGfo3KFn2j4Jr2xcyk48RM3AkcFpd5NKuzq";

// Requests go through the /ingest rewrite in next.config.ts so ad blockers
// don't drop them. Pageviews, clicks, referrers and UTM params are captured
// automatically.
posthog.init(POSTHOG_KEY, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: "2025-05-24",
});

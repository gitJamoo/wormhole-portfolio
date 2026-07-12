# Website Overhaul — Implementation Plan (2026-07-11)

## STATUS (updated 2026-07-11 — all waves complete)

- ✅ **Wave 1 / Agent A** — `home/page.tsx` overhauled: Magical Inc + anonymized freelance experience added; BVR ST CO & OSU dates closed out; typos fixed; bio/subtitle now "AI/Product Engineer"; EcoDues added as flagship project (with `demoVideoUrl` TODO placeholder); Second Brain Pipeline + Hermes added; Wormhole entry mentions the LLM Sandbox; OVERSEER/jcord thumbnails fixed; Rick Roll removed and all 6 creative works given real titles from YouTube oEmbed; demo-video 16:9 ⇄ 9:16 toggle added; Playground button added to landing page.
- ✅ **Wave 1 / Agent B** — `info.md` fully rewritten with current resume; `layout.tsx` metadata fixed (+Twitter card); EcoDues/OVERSEER/jcord thumbnails downloaded; dead `.heic` files deleted.
- ✅ **Wave 2 / Agent C** — `/blog` shipped: MDX in `content/blog/`, index with tag filter, `[slug]` pages with per-post accent colors + Shiki highlighting, `Callout`/`YouTube` (16:9⇄9:16)/`ImageRow` component kit, RSS at `/blog/rss.xml`, sample post `hello-world.mdx`, Blog links in `/home` nav and landing page. `public/llms.txt` + `public/agents.txt` created.
- ✅ **Wave 2 / Agent D** — GitHub profile README (`gitJamoo/gitJamoo`) updated and pushed (commit `bb2b22e`): Magical role, graduation Cum Laude, EcoDues project row, email → real.jamesmsmith@gmail.com. Repo descriptions set for `stunt-cv`, `jcord`, `STUNTigami`, `wormhole-portfolio`.
- ✅ `npm run build` passes (blog routes present); privacy grep clean repo-wide (client name appears nowhere).
- ⏳ **Remaining for James:**
  1. Upload the EcoDues launch video to YouTube, then paste the URL into the commented `demoVideoUrl` in `home/page.tsx` (search for "TODO: paste EcoDues").
  2. Pin repos manually (API doesn't allow it): github.com/gitJamoo → "Customize your pins" → ecodues, wormhole-portfolio, stunt-cv, jcord.

Confirmed decisions:
- EcoDues launch video will be uploaded to YouTube by James later. Wire the project entry with a clearly-marked `demoVideoUrl` TODO placeholder. The demo video player defaults to **16:9** with a user-facing toggle to **9:16** (portrait).
- Freelance work is included but **fully anonymized** — the client is described only as a "lumber wholesale distributor". The client's name must not appear anywhere in code, copy, commits, or docs.
- GitHub profile README contact email: `real.jamesmsmith@gmail.com`.
- The `/playground` section must be discoverable — add access from the landing page (`/`) in addition to the existing `/home` header link.

Execution: two waves of two Sonnet subagents, then build/lint verification, then commit + push.

---

## Wave 1

### Agent A — `home/page.tsx` content overhaul + landing page playground access

**Identity/bio:**
- Header subtitle: "Machine Learning Engineer & Software Developer" → "AI/Product Engineer".
- Rewrite bio paragraph: no longer a student. AI/Product Engineer at Magical Inc (Series A, San Francisco); B.S. CS from Oregon State University, June 2026, Cum Laude, Cybersecurity minor; former NCAA D1 cheerleader; builds production AI systems (shipped a 12,000-SKU recommendation engine at Estée Lauder with $1.5M projected revenue impact; 45% LLM cost reduction via vector-db caching). Casual, conversational tone.

**Experiences array:**
1. Add **Magical Inc** (top): AI/Product Engineer, July 2026 – Present, San Francisco. Building AI-powered workflow automation; shipping end-to-end from prompt engineering to production; agentic multi-step business-process automation.
2. Add **Freelance AI Engineer**: May 2026 – Present. AI quoting agent for a lumber wholesale distributor — reads customer email RFQs, queries the company ERP via SQL for pricing/availability, drafts quote replies in Outlook. N8N, Microsoft Graph API, SQL Server, LLM orchestration. (Anonymous client.)
3. BVR ST CO: period → "October 2025 – June 2026"; replace placeholder long description ("More will come soon...") with real copy: ML pipelines for football performance analysis, player-tracking data processing, CV models for automated game-film breakdown.
4. OSU AI Advisor: period → "August 2025 – June 2026"; fix "interal" → "internal"; add detail: advised university-wide adoption of Amazon Bedrock/Google Gemini/Microsoft Copilot, AI governance for a 35,000-student university.
5. NJ Transit: fix "creatign" → "creating".

**Education:** graduated — add Cum Laude, Dean's List; keep existing images/description.

**Projects array:**
1. Add **EcoDues** as first project (category "Products", Live badge): full-stack SaaS that tracks AI token usage across OpenRouter/OpenAI/Anthropic, computes CO2e emissions, applies a configurable multiplier (default 2x), and routes monthly donations to environmental charities via Every.org. MIT open-source.
   - `liveUrl: https://ecodues.org`, `githubUrl: https://github.com/gitJamoo/ecodues`
   - `demoVideoUrl`: commented-out TODO placeholder for the YouTube launch video.
   - `features`: multiplier slider; daily provider sync; monthly donation cycles via Every.org; dashboard with real-world equivalents (miles driven, tree-days, phone charges); "Spotify Wrapped for AI carbon" share cards; leaderboard + streaks; CSV export; GitHub/Google OAuth.
   - `techStack`: Next.js, TypeScript, Supabase, Every.org Partner API, Resend, Zod, Vitest, Vercel, GitHub CI.
   - `image`: `public/image-assets/projects/EcoDues/thumbnail.png` (Agent B downloads).
2. Add **Second Brain Pipeline** (AI & ML): LLM-native knowledge system — archives 1,400+ AI conversations to markdown via adapters (Claude, ChatGPT, Gemini, Claude Code), distills them into an Obsidian vault using Haiku-class subagents for digests and Sonnet for synthesis. Python + Claude API.
3. Add **Hermes Multi-Agent System** (AI & ML, in progress): personal AI executive coordinator — distributed multi-agent architecture on Raspberry Pi 5 + Dell OptiPlex, Telegram interface with human approval gate, N8N/calendar/email integrations, shared Obsidian state layer.
4. Update **Wormhole** entry: mention `/playground/llm-sandbox` — interactive 3D LLM education lab (React Three Fiber) visualizing tokenization, embedding clustering, cosine similarity, word analogies.
5. Fix **OVERSEER** thumbnail → `projects/OVERSEER/thumbnail.png`; give **jcord** an image → `projects/jcord/thumbnail.png` (Agent B downloads both).
6. Replace the empty "My next big thing." card with a "Currently building: Hermes"-style teaser (or fold into Hermes entry).

**Demo video aspect-ratio toggle:** in the project modal's Demo tab, default the player to 16:9 (`aspect-video`) and add a small toggle (16:9 / 9:16) that switches to portrait (`aspect-[9/16]`, height-constrained + centered).

**Creative Works:** remove the Rick Astley placeholder entry; fetch real titles for the remaining 6 videos via YouTube oEmbed (`https://www.youtube.com/oembed?url=<url>&format=json`); fix duplicate/misnumbered titles.

**Landing page (`src/app/page.tsx`):** add a visible "Playground" button/link (→ `/playground`) alongside the existing wormhole/home routing so the section is discoverable from the front door.

### Agent B — `info.md` rewrite, metadata, assets

1. **`next-js-app/info.md` full rewrite**: current resume data — Magical Inc, OSU AI Advisor, BVR ST CO, Estée Lauder, NJ Transit, Hats & Ladders, Envolvly, freelance (anonymized); graduation June 2026 Cum Laude; all projects incl. EcoDues, Hermes, Second Brain Pipeline, LLM Sandbox, StuntCV, OVERSEER, COORDINATOR, Genesis AI Hub, jcord; skills; links (j-m-s.dev, ecodues.org, GitHub gitJamoo, LinkedIn james-m-smith1).
2. **`layout.tsx` metadata**: title "James M. Smith — AI/Product Engineer"; real description; consistent OG title; add Twitter card block.
3. **Assets**: download thumbnails —
   - EcoDues: og:image from https://ecodues.org → `public/image-assets/projects/EcoDues/thumbnail.png`
   - OVERSEER: og:image/screenshot from https://overseer-website.vercel.app → `public/image-assets/projects/OVERSEER/thumbnail.png`
   - jcord: `https://opengraph.githubassets.com/1/gitJamoo/jcord` → `public/image-assets/projects/jcord/thumbnail.png`
4. Delete unused `.heic` files in `public/image-assets/Estee_Lauder_Images/`.

## Wave 2

### Agent C — `/blog` section

- Local MDX architecture: `next-js-app/content/blog/*.mdx` with frontmatter (`title`, `date`, `description`, `tags`, optional `accent`, `cover`).
- Dependencies: `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`.
- Routes: `/blog` (index — post cards, tag filter, styled to match the site) and `/blog/[slug]` (static via `generateStaticParams`).
- MDX component kit: `<Callout>`, `<YouTube id>` (16:9 default with 9:16 toggle, reuse embed-parsing logic), `<ImageRow>`; code highlighting via rehype-pretty-code.
- Per-post accent color from frontmatter; reading-time estimate; RSS at `/blog/rss.xml`.
- Nav: add "Blog" link to `/home` header and the landing page.
- One sample post demonstrating every component.
- **`llms.txt` + `agents.txt`** (added 2026-07-11 per James): SEO/AEO-optimized files in `next-js-app/public/` so they serve at `j-m-s.dev/llms.txt` and `j-m-s.dev/agents.txt` — markdown site map + bio for LLM crawlers/agents: who James is, key pages (/home, /playground, /blog, /wormhole), projects with URLs, contact info.

### Agent D — GitHub profile README + repo hygiene

- Update `gitJamoo/gitJamoo` README (clone, edit, push):
  - Subtitle → "AI/Product Engineer @ Magical · OSU CS '26"; email → `real.jamesmsmith@gmail.com`; keep Website/LinkedIn.
  - Education line: graduated, Cum Laude.
  - Experience table: add Magical Inc (2026–Present) on top; close BVR ST CO (Fall 2025–Spring 2026) and OSU DRI-Genesis (Summer 2025–Spring 2026) ranges.
  - Projects table: add EcoDues first (link ecodues.org; Next.js/TS/Supabase icons); keep COORDINATOR, OVERSEER, StuntCV, Genesis Hub, Wormhole.
- Repo descriptions via `gh api`: `stunt-cv`, `jcord`, `STUNTigami`, improve `wormhole-portfolio`.
- Attempt profile pins via GraphQL (`ecodues`, `wormhole-portfolio`, `stunt-cv`, `jcord`); note for James if scopes insufficient.

## Verification & ship

1. `npm run build` + `npm run lint` in `next-js-app/` after each wave.
2. Grep the repo to confirm the freelance client name appears nowhere.
3. Commit + push `wormhole-portfolio` (and the profile README repo from Agent D).

## Deferred / waiting on James

- Paste the EcoDues YouTube URL into the `demoVideoUrl` placeholder once uploaded.
- Confirm GitHub profile pins if the API can't set them.

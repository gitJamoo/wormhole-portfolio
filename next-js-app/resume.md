# JAMES M. SMITH

San Francisco, CA | (503) 713-8776 | james.smith.tig@gmail.com
LinkedIn: linkedin.com/in/james-m-smith1 | GitHub: github.com/gitJamoo | Portfolio: j-m-s.dev
US Citizen

---

## PROFESSIONAL SUMMARY

AI/Product Engineer specializing in agentic AI systems, LLM orchestration, and full-stack product development. Track record of shipping production AI systems with measurable business impact: a product recommendation engine projected at $1.5M in revenue at The Estée Lauder Companies, a 45% LLM token cost reduction via vector database caching, and an AI quoting agent deployed for a manufacturing client as an independent consultant. Co-founded a MERN SaaS startup serving 1,000+ users and won a school-wide pitch competition. B.S. in Computer Science (Machine Learning and AI focus) with a Cybersecurity minor from Oregon State University, completed while training 20+ hours per week as an NCAA Division I student athlete.

---

## TECHNICAL SKILLS

**Languages:** Python, TypeScript, JavaScript, SQL (SQL Server / T-SQL, SQLite, PostgreSQL), C, C++, C#, x86 Assembly, Bash, PowerShell, HTML, CSS, LaTeX

**AI / Machine Learning:** LLM orchestration, agentic AI frameworks, Anthropic Claude API, OpenAI API, Google Gemini, OpenRouter, Google Agent Development Kit (ADK), Agent2Agent (A2A) protocol, Model Context Protocol (MCP), LangChain, LoRA fine-tuning, Nemotron, retrieval-augmented generation (RAG), vector databases and embeddings, semantic caching, prompt engineering, prompt-injection and SQL-injection hardening, YOLOv8, ByteTrack, MediaPipe, computer vision

**Data:** pandas, NumPy, Matplotlib, scikit-learn workflows (K-means clustering, sentiment analysis), exploratory data analysis, data cleaning pipelines, Jupyter

**Web / Full Stack:** React, Next.js (App Router), Node.js, Express, FastAPI, Supabase, MongoDB, Auth0, Stripe Connect, Tailwind CSS, React Three Fiber / three.js, Zod, REST APIs, GraphQL, Microsoft Graph API (Outlook), Remotion

**Cloud / DevOps:** Vercel, Google Cloud Platform (GCP), AWS, Azure, Azure Pipelines, GitHub Actions, Jenkins, CI/CD, Docker, Git, N8N workflow automation, Cloudflare Tunnel, Linux server administration (systemd, SSH, iptables, fail2ban)

**Security / Digital Forensics:** Kali Linux, nmap, Wireshark, tshark, pyshark, FTK Imager, Autopsy, HxD, NTFS/MFT analysis, Windows registry forensics (SAM, SYSTEM, NTUSER.DAT, USBSTOR), SRUM and Prefetch analysis, steganography detection, forensic timeline construction, webhook authentication, API key rotation and secrets management

**Testing:** Jest, Gherkin/Cucumber, Vitest, test fixture design, 85%+ code coverage practices

---

## PROFESSIONAL EXPERIENCE

### AI/Product Engineer — Magical Inc
**San Francisco, CA | July 2026 – Present**

- Build and ship AI-powered product features as an AI/Product engineer at a San Francisco software company, joining immediately after graduation.

### Founder / AI Automation Consultant — Independent
**Portland, OR (Remote) | May 2026 – July 2026**

- Designed, built, and deployed a production AI quoting agent for a lumber manufacturer's sales desk: the system ingests inbound quote-request emails, queries live inventory and pricing data from the company's ERP (SQL Server), and generates Outlook-ready draft replies for traders.
- Architected the pipeline in N8N on a self-managed Linux server (Cloudflare Tunnel ingress, SSH port-forwarded database access), using Claude Sonnet via OpenRouter with a Zero Data Retention (ZDR) configuration for maximum customer data security.
- Grounded the SQL agent in a confirmed database schema to eliminate hallucinated table references, and enforced a single canonical pricing unit (MBF) across all five pipeline layers, correcting price floor errors of up to 3x against wholesale market benchmarks.
- Built an operations dashboard with per-quote deal strips (order value, margin vs. floor, customer history), price-position and stock-coverage visualizations, incoming purchase order matching, a collapsible AI reasoning trail, and a one-click "Add to Outlook" reply action using Microsoft Graph API message threading.
- Conducted a full security audit and remediated 7 findings, including unauthenticated webhooks, database write-gate bypasses (SELECT...INTO, stored procedure regex), silent failure paths, and provider data-privacy risks; validated the system against prompt-injection and SQL-injection test fixtures.
- Designed a 9-fixture regression test suite covering multi-item quotes, unknown customers, unparseable input, injection attacks, and below-cost pricing risk.

### Machine Learning Intern — BVR ST CO
**Corvallis, OR | October 2025 – June 2026**

- Developed core components of an agentic AI framework for real-time football game analysis, using Nemotron for low-latency local reasoning.
- Implemented Low-Rank Adaptation (LoRA) fine-tuning to enable efficient reinforcement-based learning from verified real-time game outcomes.

### Artificial Intelligence Advisor — Oregon State University (DRI-Genesis)
**Corvallis, OR | August 2025 – June 2026**

- Advised university teams on implementing enterprise AI systems including Amazon Bedrock, Google Gemini, and Microsoft Copilot; collaborated directly with Google, Amazon, and Microsoft vendor teams on best practices.
- Integrated Google's Agent2Agent (A2A) protocol to enable dynamic, secure agent registration and cross-agent communication, improving interoperability and scalability of university AI systems.
- Authored training materials, guides, and documentation on agentic AI development, LLM integration, and cloud-based agentic architectures, raising AI proficiency and adoption across the organization.
- Engineered the GENESIS AI Hub, a full-stack agent registry (React, FastAPI/Express REST API, GCP) providing centralized registration and monitoring for decentralized AI services.

### Data Analyst — Carrick FC
**Remote | 2025 – 2026**

- Built N8N automation workflows for club operations, including automated newsletter generation and distribution.
- Performed sentiment analysis and demographic research to inform fan engagement and communications strategy.

### Machine Learning Intern, AI & Innovations Team — The Estée Lauder Companies
**New York, NY | June 2025 – August 2025**

- Developed an agentic AI workflow powering a customer-facing product recommendation chatbot projected to generate $1.5M in revenue and a 2% global add-to-cart uplift.
- Processed 12,000 live SKUs across 30+ brand databases with 50+ features per SKU, unifying inconsistent product data into a centralized SQLite reverse search index supporting hyper-specific queries (e.g., "eczema-safe products, no parabens, sustainably sourced").
- Created and deployed a microservice to pull and normalize data from 30+ databases for the recommendation engine.
- Implemented a vector database caching layer over all internal AI calls (chatbot and coding assistants), targeting a 45% reduction in LLM token costs by reusing existing embeddings instead of regenerating them.
- Led exploratory data analysis for a product catalog migration between the legacy Broadcast system (~8,500 SKUs) and the modern Loki system, quantifying that the legacy system carried only 8.5% of SKU volume and producing materials that helped stakeholders commit to modernization.
- Built agentic AI tooling with Google ADK and MCP servers for catalog queries and cross-system analysis; filed bug reports and technical feedback to Google on ADK, influencing team adoption of the toolchain.
- Produced documentation, tooling, and architecture diagrams enabling long-term support after project handoff.

### Programmer & Technical Analyst Intern — NJ Transit
**Newark, NJ | June 2024 – August 2024**

- Achieved 85% code coverage by authoring 200+ tests across 18 suites using Jest and Gherkin.
- Deployed Azure Pipelines CI/CD with integrated automated testing, providing instant feedback on changes and preventing production issues.
- Analyzed and assessed 127 .NET projects (2010–2023), automating screening and auditing with Python and pandas to produce detailed documentation of each project's APIs, databases, libraries, plugins, errors, and security posture — saving days of manual effort.
- Discovered and resolved security vulnerabilities related to employee data handling.

### Co-Founder & Full-Stack Developer — Envolvly
**Remote | September 2023 – Present**

- Co-founded a B2B SaaS user marketplace and led end-to-end development of the full-stack MERN application (MongoDB, Express, React, Node.js), growing it to 1,000+ users.
- Implemented secure authentication with Auth0, including client-credentials backend flows, JWT expiry handling, and refresh token management.
- Integrated Stripe Connect for a complete payments and payouts system covering customer payments through creator disbursements.
- Won Oregon State University's school-wide startup pitch competition.

### Software Engineering Intern — Hats & Ladders
**New York, NY | June 2022 – August 2022**

- Drafted, developed, and documented a company-wide administration control panel serving 200,000+ unique users across 200+ organizations.
- Built a permissions management dashboard reducing recurring admin tasks from roughly 2 hours to seconds, with full-stack real-time updates (React frontend, Node.js API, SQL persistence).
- Practiced SCRUM and Agile methodologies with CI/CD (Jenkins) on a distributed, multi-timezone team working asynchronously.

---

## EDUCATION

### Oregon State University — Corvallis, OR
**Bachelor of Science in Computer Science, Focus in Machine Learning & Artificial Intelligence**
**Minor in Cybersecurity | September 2022 – June 2026**

- GPA: 3.5+ | Dean's List | Honor Roll
- Senior Capstone: OpenBeavs — a catalog and discovery platform for AI projects across Oregon State University, built with a four-person team under faculty advisor John Sweet.
- Systems coursework included completing MIT JOS operating system kernel Labs 1–4 (physical memory allocation, virtual memory, system calls) in C and x86 Assembly.
- Relevant coursework: Machine Learning, Deep Learning, Data Mining, Artificial Intelligence, Analysis of Algorithms, Data Structures, Operating Systems I & II, Software Engineering I & II, Database Management, Mathematical Statistics (ST 421/521), Vector Calculus, Linear Algebra, Network Security (ECE/CS 478), Digital Forensics (CS 473), Sentiment Analysis / NLP (CS 331), Computer Assembly

---

## PROJECTS

### EcoDues — Founder & Sole Developer (2026 – Present)
Live at ecodues.org | Open source (MIT), github.com/gitJamoo

- Launched a climate SaaS that tracks AI token usage across providers (Anthropic, OpenAI, OpenRouter), calculates CO2-equivalent emissions, and generates proportionate monthly donations to user-chosen charities via the Every.org Partner API.
- Built with Next.js, Supabase (auth and Postgres), and Vercel; Zod validation on client and server; structured logging; Resend transactional email.
- Implemented GitHub OAuth and Google OAuth, database-level security hardening (locked-down triggers, rate limiting), 14 production database migrations, and a CI pipeline (TypeScript compile, lint, Vitest, build) with a 30-test suite covering the emissions engine.
- Shipped full product surface: live-computed dashboard stat cards, usage backfill flows, multi-key provider connections, CSV export, opt-in leaderboard with streaks and badges, responsive mobile layout, SEO (dynamic OG images, sitemap, robots), and a 31-second launch video produced in Remotion.

### Hermes Multi-Agent System — Personal AI Infrastructure (2026 – Present)

- Designed and operate a phased multi-agent AI coordinator on self-hosted hardware (Raspberry Pi 5 and Dell OptiPlex), using Notion as a shared state layer, MCP integrations for Gmail and Calendar, and a Telegram human-approval gate for outbound actions.
- Applied security-first agent design: hardcoded sender allowlists, separate agent-owned email identity, and approval flows routed outside email to prevent command injection.

### Second Brain Pipeline — LLM Knowledge Distillation System (2026 – Present)

- Built a pipeline that ingests 1,400+ AI conversation exports across four formats (Claude, ChatGPT, Gemini Takeout, Claude Code JSONL) via an adapter pattern and distills them into an Obsidian knowledge base of topics, solutions, decisions, and people.
- Optimized inference costs by routing per-conversation digests to a small model and reserving a frontier model for synthesis.

### Wormhole Portfolio / LLM Sandbox — Interactive AI Education Lab (2025 – 2026)
Live at j-m-s.dev

- Built an interactive 3D learning lab (React Three Fiber, Next.js) visualizing tokenization, embedding clustering, cosine similarity, and word-vector analogies, with an LLM assigning live 3D coordinates to words.
- Solved production WebGL issues including context loss on low-end GPUs, hydration mismatches, and dependency deduplication.

### StuntCV — Computer Vision Stunt Analysis (2024 – 2026)

- Built a body-tracking application for cheerleading stunt analysis: YOLOv8 pose detection with ByteTrack persistent identity tracking, occlusion-robust height signals, and gap-bridging smoothing to eliminate identity swaps during stunts.
- Tracks 30+ landmarks per performer with CSV export for 3D analysis; computes stunt shakiness, velocity, and weak points via custom algorithms.
- Shipped a FastAPI web UI with frame-accurate video playback overlays, click-to-assign role relabeling, and an AI chat analysis tab.

### GENESIS AI Hub — Full-Stack Agent Registry (2025 – 2026)

- Engineered a scalable AI agent hub (React, FastAPI/Express, GCP) providing centralized registration and monitoring for decentralized AI services, using the A2A protocol for secure cross-agent communication. (Built in the OSU AI Advisor role, above.)

### Additional Projects

- **COORDINATOR** — agentic AI system for sports analysis.
- **OVERSEER** — real-time eye and posture tracking application.
- **mdsnip** — single-file Python CLI for low-token markdown section retrieval and editing by AI agents, using stable HTML-comment anchors and heading-path queries.

---

## LEADERSHIP & ACTIVITIES

### NCAA Division I Student Athlete — Oregon State University Cheer
**February 2023 – June 2026**

- Trained and performed 20+ hours per week year-round as a base/stunt athlete while maintaining a 3.5+ GPA and completing multiple concurrent internships.
- Performed across four sports seasons: football (Reser Stadium), men's and women's basketball (Gill Coliseum), wrestling, and volleyball.
- Community service through DAM Able and DAM Proud Day events.

### Additional Leadership

- **Winner, Oregon State University school-wide startup pitch competition** — pitched Envolvly (B2B SaaS).
- **Founder, Gaming Club** — Tigard High School (2018 – 2022); founded and led the club.
- **Rotary Club Public Speaking Award** recipient.

---

## SECURITY & FORENSICS HIGHLIGHTS (Cybersecurity Minor)

- Authored a multi-week expert witness report on a simulated insider data exfiltration case: NTFS Master File Table analysis in FTK Imager, Windows registry artifact analysis (USBSTOR, timezone normalization, recent files), SRUM/Prefetch execution evidence, steganography detection via JPEG end-of-file markers, email artifact recovery, and UTC-normalized cross-source timeline construction.
- Network security lab work: protocol analysis with pyshark/Wireshark/tshark, reconnaissance tooling (nmap, arp-scan, netdiscover, p0f), VPN/tunnel fingerprinting via MTU analysis, and home-lab network hardening (fail2ban, iptables).
- Applied security engineering in production systems: webhook authentication, prompt-injection and SQL-injection resistance testing, database write-gating, secrets rotation, and OAuth scope minimization.

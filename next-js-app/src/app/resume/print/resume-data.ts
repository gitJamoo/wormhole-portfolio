// Source of truth: github.com/gitJamoo/brag-sheets. Every figure here is quoted from a sheet; don't round up.
// Kept plain for ATS parsers: standard section names, one date format, no tables or icons in the text.
export type Entry = { title: string; date: string; org: string; place: string; bullets: string[] };
export type Project = { name: string; tech: string; date: string; bullets: string[] };

export const contact = [
  { label: "San Francisco, CA" },
  { label: "(503) 713-8776", href: "tel:+15037138776" },
  { label: "real.jamesmsmith@gmail.com", href: "mailto:real.jamesmsmith@gmail.com" },
  { label: "linkedin.com/in/james-m-smith1", href: "https://www.linkedin.com/in/james-m-smith1/" },
  { label: "j-m-s.dev", href: "https://j-m-s.dev" },
  { label: "US Citizen" },
];

export const summary =
  "AI/Product Engineer shipping production LLM agents, agentic workflow automation and full-stack products, from prompt design and evaluation to deployment.";

export const experience: Entry[] = [
  {
    title: "AI/Product Engineer", date: "Jul 2026 – Present", org: "Magical", place: "San Francisco, CA",
    bullets: [
      "Shipped a production review agent that checks every new workflow change for bugs and regressions and proposes patches, moving engineers from implementers to reviewers",
      "Shipped an autonomous agent that catches real-world failures in live workflows and finds them before customers, increasing real-world accuracy to 95%",
      "Proposed and carried out LLM model changes saving an estimated $450K a year",
      "Rebuilt the evals and benchmarking engine from the ground up, turning each new model release into a regression-safe cost and speed upgrade the moment it lands, and laying the groundwork for fine-tuning",
    ],
  },
  {
    title: "AI Consultant", date: "May 2026 – Jul 2026", org: "Independent (Lumber Manufacturer Client)", place: "Portland, OR (Remote)",
    bullets: [
      "Built and deployed a production AI quoting agent (Claude via OpenRouter, N8N, SQL Server) that automated quoting from RFQ emails, saving each trader 10 hours a month and moving $150K+ in revenue",
      "Built an operations dashboard showing each quote's margin against floor, customer history, stock coverage and the AI's reasoning trail",
    ],
  },
  {
    title: "Software Engineer", date: "Oct 2025 – Jun 2026", org: "BVR ST CO", place: "Corvallis, OR",
    bullets: [
      "Developed core components of COORDINATOR, an agentic AI framework for real-time football strategy, using NVIDIA Nemotron for low-latency local reasoning",
      "Implemented LoRA fine-tuning for reinforcement-based learning from verified game outcomes",
    ],
  },
  {
    title: "Artificial Intelligence Advisor", date: "Aug 2025 – Jun 2026", org: "Oregon State University, College of Business", place: "Corvallis, OR",
    bullets: [
      "Advised university teams on enterprise AI (Amazon Bedrock, Google Gemini, Microsoft Copilot) at a 35,000-student university",
      "Authored agentic-AI training materials and reference codebases adopted as onboarding for the College of Business team",
    ],
  },
  {
    title: "Machine Learning Intern, AI & Innovations", date: "Jun 2025 – Aug 2025", org: "The Estée Lauder Companies", place: "New York, NY",
    bullets: [
      "Worked on the agentic AI workflow behind a product-recommendation chatbot projected at $1.5M in revenue and a 2% global add-to-cart uplift",
      "Unified 12,000 live SKUs across 30+ brand databases into a SQLite reverse-search index and microservice; built Google ADK and MCP agent tooling",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "StuntCV", tech: "Python, YOLOv8, ByteTrack, FastAPI", date: "Aug 2025 – Jul 2026",
    bullets: [
      "Solo-built a computer-vision app for cheerleading stunt analysis that tracks each performer through lifts and computes center-of-mass height, velocity and shakiness",
    ],
  },
  {
    name: "EcoDues", tech: "Next.js, TypeScript, Supabase, Vercel", date: "Jul 2026 – Present",
    bullets: [
      "Solo-built and launched an open-source SaaS that turns AI token usage into CO₂e and monthly charity donations, in about 10 days",
    ],
  },
  {
    name: "Envolvly (Co-Founder)", tech: "MERN, Auth0, Stripe Connect", date: "Feb 2023 – Jun 2026",
    bullets: [
      "Co-founded a creator-marketplace SaaS and led full-stack development; won Oregon State's school-wide pitch competition",
    ],
  },
];

export const education = {
  school: "Oregon State University",
  date: "Sep 2022 – Jun 2026",
  degree: "B.S. Computer Science (Machine Learning & AI), Minor in Cybersecurity, Cum Laude",
  place: "Corvallis, OR",
  bullets: [
    ["NCAA Division I Student-Athlete:", "Trained 20+ hours per week year-round while completing multiple internships."],
  ],
};

export const skills: [string, string][] = [
  ["Languages", "Python, TypeScript, JavaScript, SQL (PostgreSQL, SQL Server, SQLite), C, C++, C#, Bash"],
  ["AI/ML", "LLM Agents, RAG, Prompt Engineering, Claude, OpenAI, Gemini, Google ADK, A2A, MCP, LangChain, Vector Databases, LoRA"],
  ["Web", "Next.js, React, Node.js, Express, FastAPI, Supabase, MongoDB, Stripe Connect"],
  ["Cloud/DevOps", "GCP, AWS, Azure, Vercel, Docker, GitHub Actions, N8N, Linux"],
];

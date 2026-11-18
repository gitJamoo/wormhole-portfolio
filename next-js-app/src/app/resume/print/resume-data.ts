// Mirrors public/james_smith_resume.pdf. Update both together.
export type Entry = { title: string; date: string; org: string; place: string; bullets: string[] };
export type Project = { name: string; tech: string; date: string; bullets: string[] };

export const contact = [
  { label: "(503) 713-8776", href: "tel:+15037138776" },
  { label: "real.jamesmsmith@gmail.com", href: "mailto:real.jamesmsmith@gmail.com" },
  { label: "linkedin.com/in/james-m-smith1/", href: "https://www.linkedin.com/in/james-m-smith1/" },
  { label: "github.com/gitJamoo", href: "https://github.com/gitJamoo" },
  { label: "j-m-s.dev", href: "https://j-m-s.dev" },
  { label: "US Citizen" },
];

export const education = {
  school: "Oregon State University",
  date: "September 2022 – June 2026",
  degree: "BS in Computer Science (Focus: Machine Learning & AI), Minor in Cybersecurity",
  place: "Corvallis, OR",
  bullets: [
    ["Relevant Coursework:", "Machine Learning, Deep Learning, Data Mining, Artificial Intelligence, Analysis of Algorithms, Data Structures, Operating Systems, Mathematical Statistics, Database Management, Software Engineering"],
    ["NCAA D1 Student Athlete:", "Managed full academic responsibilities alongside year-round training and competition."],
  ],
};

export const experience: Entry[] = [
  {
    title: "Artificial Intelligence Intern", date: "October 2025 – Current", org: "BVR ST CO", place: "Corvallis, OR",
    bullets: ["Developed core components of an agentic framework, utilizing Nemotron for low-latency, local reasoning & implementing Low-Rank Adaptation (LoRA) to enable efficient, reinforcement-based learning from verified real-time game outcomes"],
  },
  {
    title: "Artificial Intelligence Advisor", date: "August 2025 – Current", org: "Oregon State University", place: "Corvallis, OR",
    bullets: [
      "Integrated Google’s A2A protocol to enhance interoperability and scalability of AI systems",
      "Authored training materials and best practices on Agentic AI development, LLM integration, and cloud-based development for Agentic systems, increasing AI proficiency, literacy, and adoption allowing better alignment on University goals",
    ],
  },
  {
    title: "Co-Founder & Full-Stack Developer", date: "September 2023 – Current", org: "Envolvly", place: "Remote",
    bullets: [
      "Orchestrated end-to-end development of a full-stack MERN (MongoDB, Express.js, React, Node.js) user marketplace application, implementing secure user authentication with Auth0 & complete payment system",
      "Integrated Stripe Connect to build a comprehensive payment & payout system, handling everything from user payments for services to creator payouts, ensuring secure & reliable financial transactions",
      "Handled system implementation to scale to 100+ users, watching product grow from 0 → 1",
    ],
  },
  {
    title: "Machine Learning Intern", date: "June 2025 – August 2025", org: "The Estée Lauder Companies", place: "New York City, NY",
    bullets: [
      "Developed an Agentic AI workflow to create an AI chatbot for analysis on 12,000 Live SKUs",
      "Generated documentation, tooling, and architecture diagrams to enable long-term support after project handoff",
      "Created & deployed Microservice to pull from 30+ databases, normalizing data & creating a SQLite reverse search index",
      "Contributed to customer-facing chatbot expected to gross $1,500,000 in revenue",
    ],
  },
  {
    title: "Programmer & Technical Analyst Intern", date: "June 2024 – August 2024", org: "NJ Transit", place: "Newark, NJ",
    bullets: [
      "Achieved 85% code coverage through 200+ tests across 18 suites using Jest and Gherkin",
      "Deployed CI/CD Azure pipelines, integrating automated tests to ensure reliable software delivery",
      "Analyzed 127 .NET projects, automating the screening and auditing with Python & Pandas to build detailed documentation on projects APIs, databases, libraries, plugins, errors, & security vulnerabilities",
    ],
  },
  {
    title: "Software Engineering Intern", date: "June 2022 – August 2022", org: "Hats & Ladders", place: "New York, NY",
    bullets: [
      "Created management panel that was used by 200,000+ unique users across 200+ organizations",
      "Drafted, developed, & documented a company-wide administration user control panel",
      "Practiced SCRUM & Agile methodologies on a diverse team, across multiple time zones, working asynchronously",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "GENESIS AI Hub", tech: "React.js, FastAPI, A2A, GCP, Technical Writing", date: "September 2025 – Present",
    bullets: [
      "Engineered a scalable, full-stack AI Agent Hub utilizing React & an Express REST API to provide centralized registration & monitoring for decentralized AI services",
      "Implemented the A2A protocol to enable dynamic, secure registration & seamless cross-agent communication",
    ],
  },
  {
    name: "StuntCV", tech: "Python, Computer Vision (CV), MediaPipe, NumPy", date: "March 2024 – June 2024",
    bullets: [
      "Tracks 30+ landmarks on each performer, allowing data to be exported to .csv for viewing in a 3D space",
      "Calculates stunt shakiness, velocity, weak points & more providing detailed information via proprietary algorithms",
    ],
  },
];

export const skills: [string, string][] = [
  ["Languages", "TypeScript, Python, C++, C, SQL, SQLite, JavaScript, PowerShell, Bash"],
  ["AI/ML", "Nemotron, LoRA, MediaPipe, Agentic Frameworks, A2A, Pandas, NumPy, Matplotlib"],
  ["Frameworks/Tools", "React, FastAPI, Node.js, Next.js, .NET, Django, Spring Boot, MongoDB, PostgreSQL"],
  ["Cloud/DevOps", "GCP, AWS, Azure, CI/CD (GitHub Actions/Jenkins), Git, Docker"],
];

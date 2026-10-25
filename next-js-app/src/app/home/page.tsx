import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactFormEmbedded from "../components/contact/ContactFormEmbedded";
import CreativeWorksCarousel from "../components/CreativeWorksCarousel";
import {
  EducationCard,
  ExperienceCard,
  ProjectGrid,
  type Education,
  type Experience,
  type Project,
} from "./HomeCards";


import headshot from "../../../public/image-assets/beaver-headshot.jpg";

import esteeLauderLogo from "../../../public/image-assets/estee_lauder_companies_logo.png";
import njTransitLogo from "../../../public/image-assets/nj_transit_logo.jpeg";
import hatsAndLaddersLogo from "../../../public/image-assets/hats_and_ladders_logo.jpg";
import oregonStateUniversityLogo from "../../../public/image-assets/oregon_state_university_logo.png";
import envolvlyLogo from "../../../public/image-assets/envolvly_logo.png";
import bvrstcoLogo from "../../../public/image-assets/bvr_st_co_logo.jpg";
import magicalLogo from "../../../public/image-assets/magical_logo.png";
import logLogo from "../../../public/image-assets/log_logo.png";

import osuCheerBoysTeamPhoto from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_Boys_Team_Photo.jpg";
import osuCheerJamesAtWbbMarchMadness from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_at_WBB_March_Madness.jpg";
import osuCheerJamesCheeringOnBeavs from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_Cheering_On_Beavs.jpg";
import osuCheerJamesDoingCupie from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_Doing_Cupie.jpg";
import osuCheerJamesOnTheNews from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_On_The_News.jpg";
import osuCheerJamesRepresentingBeavsAtPac12MbbTournament from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_Representing_Beavs_At_Pac12_MBB_Tournament.jpg";
import osuCheerJamesRunningFlag from "../../../public/image-assets/Oregon_State_University/OSU_Cheer_James_Running_Flag.jpeg";
import osuEnvolvlyWinningPitch from "../../../public/image-assets/Oregon_State_University/OSU_Envolvly_Winning_Pitch.jpg";
import osuJamesWithBennyOnField from "../../../public/image-assets/Oregon_State_University/OSU_James_With_Benny_On_Field.jpg";

import elcEsteeLauderCompaniesOnlineCandid from "../../../public/image-assets/Estee_Lauder_Images/ELC_Estee_Lauder_Companies_Online_Candid.jpg";
import elcJamesSmithNametagCollection from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Smith_Nametag_Collection.jpg";
import elcLaunchIqPicture from "../../../public/image-assets/Estee_Lauder_Images/ELC_LaunchIQ_Picture.jpg";
import elcStandingWithCoInternsOnRooftop from "../../../public/image-assets/Estee_Lauder_Images/ELC_Standing_With_CoInterns_On_Rooftop.jpg";
import elcJamesGivingFinalPresentation from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Given_Final_Presentation.jpg";
import elcJamesStandingFrontOfBackdrop from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Standing_In_Front_Of_Backdrop.jpg";

import njtJamesGroupInternNjtOfficialPicture from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Group_Intern_NJT_Official_Picture.jpg";
import njtJamesGroupInternPicture1 from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Group_Intern_Picture_1.jpg";
import njtJamesWearingHardhatConsoleRoom from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Wearing_Hardhat_Console_Room.jpg";

import envolvlyProjectThumbnail from "../../../public/image-assets/projects/Envolvly/thumbnail.png";
import MITJOSProjectThumbnail from "../../../public/image-assets/projects/MIT-JOS/thumbnail.png";
import WormholeProjectThumbnail from "../../../public/image-assets/projects/Wormhole/thumbnail.png";
import StuntCVProjectThumbnail from "../../../public/image-assets/projects/StuntCV/thumbnail.png";
import ResumAIProjectThumbnail from "../../../public/image-assets/projects/ResumAI/thumbnail.png";
import CoordinatorProjectThumbnail from "../../../public/image-assets/projects/Coordinator/thumbnail.png";
import OpenBeavsProjectThumbnail from "../../../public/image-assets/projects/OpenBeavs/thumbnail.png";
import EcoDuesProjectThumbnail from "../../../public/image-assets/projects/EcoDues/thumbnail.png";
import OVERSEERProjectThumbnail from "../../../public/image-assets/projects/OVERSEER/thumbnail.png";
import jcordProjectThumbnail from "../../../public/image-assets/projects/jcord/thumbnail.png";

export const metadata: Metadata = {
  title: "Work & Projects — James M. Smith",
  description:
    "Experience, projects and creative work from James M. Smith, AI/Product Engineer at Magical in San Francisco: Estée Lauder, Oregon State, NJ Transit and more.",
  alternates: { canonical: "/home" },
};

const education: Education = {
  institution: "Oregon State University",
  degree: "Bachelor of Science in Computer Science & ML/AI",
  period: "September 2022 – June 2026",
  details:
    "Graduated Cum Laude. Minor in Cybersecurity. Dean's List. Relevant Coursework: Operating Systems I&II, Discrete Math, Analysis of Algorithms, Software Eng. I&II, Data Structures, Web Development, Computer Assembly, Technical Writing.",
  longDescription:
    "Graduated Cum Laude from Oregon State University in June 2026 with a B.S. in Computer Science and a Cybersecurity minor. Made the Dean's List and was a member of the OSU cheer team — competing at the NCAA Division I level — and won an entrepreneurship award for my work with Envolvly at the OSU Business Pitch Competition.",
  logo: oregonStateUniversityLogo,
  images: [
    osuCheerBoysTeamPhoto,
    osuCheerJamesAtWbbMarchMadness,
    osuCheerJamesCheeringOnBeavs,
    osuCheerJamesDoingCupie,
    osuCheerJamesOnTheNews,
    osuCheerJamesRepresentingBeavsAtPac12MbbTournament,
    osuCheerJamesRunningFlag,
    osuEnvolvlyWinningPitch,
    osuJamesWithBennyOnField,
  ],
};

const experiences: Experience[] = [
  {
    company: "Magical Inc",
    role: "AI/Product Engineer",
    period: "July 2026 – Present",
    description:
      "Building AI-powered workflow automation features at a Series A startup in San Francisco, shipping end-to-end from prompt engineering through production deployment.",
    longDescription:
      "Joined Magical Inc — a Series A workflow-automation startup in San Francisco — as an AI/Product Engineer. Building AI-powered workflow automation features and shipping end-to-end from prompt engineering through production deployment. Developing agentic capabilities that automate multi-step business processes from natural language, reducing manual work for teams at scale.",
    logo: magicalLogo,
  },
  {
    company: "Freelance AI Engineer",
    role: "Freelance AI Engineer",
    period: "May 2026 – July 2026",
    description:
      "Built an AI quoting agent for a lumber wholesale distributor that reads customer RFQ emails, queries live ERP data, and drafts quote replies in Outlook.",
    longDescription:
      "Built an end-to-end AI quoting agent for a lumber wholesale distributor. The agent reads inbound customer Request for Quote (RFQ) emails, queries the company's ERP database via SQL for live pricing and inventory availability, and drafts accurate quote reply emails directly in Outlook — cutting quote turnaround time significantly. Stack: N8N for workflow orchestration, Microsoft Graph API for email access, SQL Server for ERP queries, and LLM orchestration via Claude and GPT-4o through OpenRouter, configured with Zero Data Retention (ZDR) for maximum customer data security.",
    logo: logLogo,
  },
  {
    company: "Envolvly",
    role: "Co-Founder",
    period: "February 2023 - Present",
    description:
      "Co-founded and scaled a tech startup by building a robust, secure, and scalable full-stack application from the ground up.",
    longDescription:
      "As technical co-founder, I led Envolvly's development from concept to a scalable app with active users. I architected the full-stack infrastructure using React, AWS, and MongoDB, and established all technical operations, including the CI/CD pipeline. My leadership in applying Agile methodologies was key to our rapid growth and winning the OSU Business Pitch Competition, demonstrating strong technical and business acumen.",
    logo: envolvlyLogo,
  },
  {
    company: "BVR ST CO",
    role: "Machine Learning Intern",
    period: "October 2025 – June 2026",
    description:
      "Built ML pipelines for collegiate football performance analysis, processing player-tracking data to surface tactical insights for coaching staff.",
    longDescription:
      "Built ML pipelines for football performance analysis, processing player-tracking and game data to surface tactical insights for coaching staff. Developed computer-vision models for automated game-film breakdown, enabling frame-level recognition of formations and player positioning. Built pattern-recognition systems for player-movement analysis, helping coaches identify tendencies and prepare more effectively for opponents.",
    logo: bvrstcoLogo,
  },
  {
    company: "Oregon State University",
    role: "AI Advisor",
    period: "August 2025 – June 2026",
    description:
      "Advised the GENESIS AI development team on building internal agentic AI tools to streamline university business operations across a 35,000-student public research university.",
    longDescription:
      "Advised the GENESIS AI Dev team on building internal agentic AI tools for Oregon State University, a 35,000-student public research university. Advised university-wide adoption of Amazon Bedrock, Google Gemini, and Microsoft Copilot, working directly with vendor teams to ensure best-practice implementation. Created training materials and example codebases for agentic AI tools, and helped shape AI governance policy for the university.",
    logo: oregonStateUniversityLogo,
  },
  {
    company: "The Estée Lauder Companies",
    role: "Machine Learning Intern",
    period: "June 2025 – August 2025",
    description:
      "Engineered an agentic AI workflow to power a customer-facing chatbot, enhancing product recommendations for a global brand.",
    longDescription:
      "As a Machine Learning Intern on the Data Science and Analytics global team, I leveraged cutting-edge AI and data engineering to develop and optimize intelligent systems, significantly enhancing customer experiences and driving substantial operational efficiencies. My work focused on transforming complex data into actionable insights and building scalable solutions that directly contributed to future revenue growth and cost savings.",
    logo: esteeLauderLogo,
    images: [
      elcEsteeLauderCompaniesOnlineCandid,
      elcJamesSmithNametagCollection,
      elcLaunchIqPicture,
      elcStandingWithCoInternsOnRooftop,
      elcJamesGivingFinalPresentation,
      elcJamesStandingFrontOfBackdrop,
    ],
  },
  {
    company: "NJ Transit",
    role: "Programmer & Technical Analyst Intern",
    period: "June 2024 – August 2024",
    description:
      "Fortified a critical statewide incident reporting system by creating tests, directly contributing to system reliability and modernization.",
    longDescription:
      "As a member of the engineering and innovations team, I contributed to the modernization and reliability of critical transit systems through comprehensive testing, automation, and infrastructure enhancements. Engineered and executed over 200 comprehensive tests across 18 suites for a critical, statewide digital incident reporting system, achieving an exceptional 85% code coverage with Jest and Gherkin.",
    logo: njTransitLogo,
    images: [
      njtJamesGroupInternNjtOfficialPicture,
      njtJamesGroupInternPicture1,
      njtJamesWearingHardhatConsoleRoom,
    ],
  },
  {
    company: "Hats & Ladders",
    role: "Software Engineering Intern",
    period: "June 2022 – August 2022",
    description:
      "Built a user management panel serving over 200,000 users, simplifying administration for hundreds of organizations.",
    longDescription:
      "As a Web Development Intern, I contributed to the development and optimization of critical user management systems, enhancing administrative efficiency and user experience for a large-scale platform. Engineered a comprehensive administration user control panel, empowering administrators with instant, self-service capabilities to manage user roles, permissions, and settings for over 200,000 active unique users.",
    logo: hatsAndLaddersLogo,
  },
];

const projects: Project[] = [
  {
    name: "EcoDues",
    category: "Products",
    technologies: "Next.js, TypeScript, Tailwind CSS, Supabase, Every.org API, Vitest, GitHub Actions, Vercel",
    period: "May 2026 – Present",
    description:
      "Open-source SaaS that tracks AI token usage across providers, calculates the CO2e footprint, and routes monthly donations to environmental charities to offset it.",
    longDescription:
      "I built EcoDues because I couldn't find a tool that told me what my AI usage actually cost the environment — let alone did anything about it. It pulls usage data daily from OpenRouter, OpenAI, and Anthropic admin APIs, calculates CO2e per model, applies a configurable offset multiplier (default 2x), and routes the resulting donation to environmental charities through Every.org at the end of each month. MIT-licensed, 30 Vitest tests, deployed on Vercel.",
    image: EcoDuesProjectThumbnail,
    liveUrl: "https://ecodues.org",
    githubUrl: "https://github.com/gitJamoo/ecodues",
    demoVideoUrl: "https://www.ecodues.org/launch-film.mp4",
    features: [
      "Multiplier slider with 0.25x steps (default 2x offset)",
      "Daily automated provider sync (OpenRouter, OpenAI, Anthropic)",
      "Monthly donation cycles via Every.org Partner API",
      "Dashboard stats with real-world equivalents (miles driven, tree-days, phone charges)",
      "Shareable annual/monthly impact cards",
      "Leaderboard, streaks & badges",
      "CSV export of usage and footprint data",
      "GitHub & Google OAuth"
    ],
    techStack: [
      { category: "Frontend", technologies: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", technologies: ["Supabase", "Every.org Partner API", "Resend", "Zod"] },
      { category: "Quality", technologies: ["Vitest (30 tests)", "GitHub Actions CI"] },
      { category: "Infra", technologies: ["Vercel"] }
    ],
    metrics: [
      { label: "Test Coverage", value: "30 tests" },
      { label: "Providers", value: "3 APIs" },
      { label: "License", value: "MIT" }
    ],
    documentation: `## EcoDues

An open-source SaaS that tracks your AI token usage, computes its CO2e carbon footprint, and routes donations to environmental charities to offset your impact.

## How It Works

1. **Connect your providers** — link OpenRouter, OpenAI, and/or Anthropic admin API keys
2. **Auto-sync** — EcoDues pulls usage data daily and calculates CO2e per provider/model
3. **Set your multiplier** — default 2x offset; adjust in 0.25x steps to go further
4. **Choose your charities** — pick from verified environmental orgs via the Every.org Partner API
5. **Monthly donations** — EcoDues charges and routes your offset donation automatically

## Features

### Impact Dashboard
Real-world equivalents translate abstract token counts into miles driven, tree-days of carbon sequestration, and phone charges — making your footprint tangible.

### Shareable Cards
"Spotify Wrapped for AI carbon" — generate a shareable annual or monthly card showing your usage, footprint, and offset impact.

### Community
Leaderboard ranks users by offset impact. Streaks reward consistent offsetting. Badges for milestones.

## Tech Stack
Next.js + TypeScript + Tailwind CSS frontend, Supabase backend, Every.org Partner API for charity routing, Resend for email, Zod for validation. 30 Vitest tests with GitHub Actions CI. Deployed on Vercel.`
  },
  {
    name: "Envolvly",
    category: "Products",
    technologies: "GitHub, Docker, AWS, React, Typescript, MongoDB",
    period: "September 2023 - Present",
    description:
      "B2B SaaS I co-founded at OSU. Built the full stack from scratch — React, Node.js, MongoDB, AWS — and grew it to 1,000+ users. Won OSU's school-wide pitch competition.",
    longDescription:
      "Envolvly is a B2B SaaS I co-founded at Oregon State. I built the full-stack infrastructure — React, Node.js, MongoDB, AWS — set up CI/CD, and led engineering throughout. We won OSU's school-wide pitch competition, and the platform has reached 1,000+ users. I'm still the primary engineer.",
    image: envolvlyProjectThumbnail,
    liveUrl: "https://www.envolvly.com",
    features: [
      "Full-stack web application with real-time updates",
      "AWS infrastructure with auto-scaling",
      "CI/CD pipeline for automated deployments",
      "MongoDB backend with optimized queries"
    ],
    techStack: [
      { category: "Frontend", technologies: ["React", "TypeScript", "CSS3"] },
      { category: "Backend", technologies: ["Node.js", "Express", "MongoDB"] },
      { category: "DevOps", technologies: ["AWS", "Docker", "GitHub Actions"] },
      { category: "Tools", technologies: ["Git", "Postman", "VS Code"] }
    ],
    metrics: [
      { label: "Active Users", value: "1,000+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Response Time", value: "<200ms" }
    ],
    documentation: `## Project Overview
Envolvly is a comprehensive platform designed to connect students with volunteer opportunities and track their community service hours. The platform streamlines the volunteer management process for both organizations and volunteers.

## Technical Architecture
- **Frontend**: Built with React and TypeScript for type safety and maintainability
- **Backend**: Node.js/Express API with RESTful endpoints
- **Database**: MongoDB for flexible document storage
- **Hosting**: AWS EC2 with load balancing and auto-scaling
- **CI/CD**: Automated testing and deployment via GitHub Actions

## Key Achievements
- Won OSU Business Pitch Competition ($10,000 prize)
- Achieved 1,000+ active users within first year
- Maintained 99.9% uptime since launch
- Implemented comprehensive security measures including encryption and OAuth

## Development Process
Followed Agile methodology with 2-week sprints, daily standups, and continuous integration. Utilized Git for version control with feature branching and pull request reviews.`
  },
  {
    name: "StuntCV",
    category: "AI & ML",
    technologies: "Python, OpenCV, MediaPipe, Tkinter, NumPy",
    period: "July 2025 - Present",
    description:
      "Computer vision tool for analyzing cheer stunts. Tracks 33 body landmarks per frame, measures joint angles, and exports pose data to CSV.",
    longDescription:
      "I built StuntCV to solve a problem I actually had as a D1 cheerleader — there was no easy way to review stunt technique on video. It uses MediaPipe Pose to track 33 body landmarks in real-time, measures joint angles, and lets coaches do frame-by-frame playback. Built with Python, OpenCV, and a Tkinter UI. Exports tracking data to CSV for deeper analysis.",
    image: StuntCVProjectThumbnail,
    githubUrl: "https://github.com/gitJamoo/StuntCV",
    features: [
      "Real-time pose estimation with 33 body landmarks",
      "Frame-by-frame video playback analysis",
      "Angle measurement for joint positions",
      "Export tracking data to CSV"
    ],
    techStack: [
      { category: "Computer Vision", technologies: ["OpenCV", "MediaPipe"] },
      { category: "Languages", technologies: ["Python"] },
      { category: "UI Framework", technologies: ["Tkinter"] },
      { category: "Data Processing", technologies: ["NumPy", "Pandas"] }
    ],
    metrics: [
      { label: "Tracking Points", value: "33" },
      { label: "Frame Rate", value: "30 FPS" },
      { label: "Accuracy", value: "95%+" }
    ],
    documentation: `## StuntCV - Computer Vision for Stunt Analysis

StuntCV is a specialized application for analyzing acrobatic performances using computer vision technology.

## Features

### Real-Time Tracking
Uses MediaPipe Pose to track 33 body landmarks in real-time, providing instant feedback on form and technique.

### Video Analysis
- Record performances directly in the app
- Import existing videos for analysis
- Frame-by-frame playback
- Slow-motion analysis

### Metrics & Analytics
- Joint angle measurements
- Height and distance calculations
- Performance scoring
- Comparison tools for before/after analysis

### Data Export
Export tracking data to CSV format for use in spreadsheets or other analysis tools.

## Use Cases
- Cheerleading stunt training
- Gymnastics form analysis
- Dance choreography refinement
- Physical therapy progress tracking

## Technical Implementation
Built with Python using OpenCV for video processing and MediaPipe for pose estimation. The UI is created with Tkinter for cross-platform compatibility.`
  },
  {
    name: "OVERSEER",
    category: "Products",
    technologies: "Rust, Tauri, OpenCV",
    period: "December 2025",
    description:
      "Native desktop app that uses your webcam to monitor eye gaze and posture. Sends alerts when you drift. All processing is local — nothing leaves your machine.",
    longDescription:
      "OVERSEER runs silently in the background and uses OpenCV to watch your eye gaze and body posture via webcam. When it detects you've zoned out or are slouching, it sends a corrective alert. Built with Rust and Tauri for a lightweight native binary — far less overhead than an Electron alternative. All processing is local; no data is sent anywhere. Has paying users.",
    image: OVERSEERProjectThumbnail,
    liveUrl: "https://overseer-website.vercel.app",
    features: [
      "Real-time eye tracking for focus monitoring",
      "Posture detection and corrective alerts",
      "Work session tracking and daily summaries",
      "Offline-first — no data leaves your machine"
    ],
    techStack: [
      { category: "Core", technologies: ["Rust", "Tauri"] },
      { category: "Computer Vision", technologies: ["OpenCV"] },
      { category: "Platform", technologies: ["Desktop (Windows, macOS, Linux)"] }
    ],
    metrics: [
      { label: "Paying Users", value: "Active" },
      { label: "Detection", value: "Real-time" },
      { label: "Data Privacy", value: "100% Local" }
    ],
    documentation: `## OVERSEER

A native desktop accountability app that uses computer vision to monitor focus and posture in real-time.

## Concept
OVERSEER runs silently in the background, using your webcam to track eye gaze and body posture. When it detects distraction or poor posture, it sends alerts to keep you on track. All processing happens locally — no data is ever sent to the cloud.

## Technical Architecture

### Desktop Runtime
- Built with Tauri for a lightweight, native binary
- Rust backend for performance-critical CV processing
- Minimal memory footprint compared to Electron alternatives

### Computer Vision
- OpenCV for frame capture and image processing
- Eye tracking using facial landmark detection
- Posture analysis via pose estimation algorithms

## Features
- Session-based work tracking
- Configurable alert thresholds
- Daily/weekly productivity reports
- System tray integration for unobtrusive monitoring

## Distribution
Shipped as a signed installer for Windows, macOS, and Linux. Available for purchase with active paying users.`
  },
  {
    name: "COORDINATOR",
    category: "AI & ML",
    technologies: "NVIDIA, AutoGen, Next.js",
    period: "October 2025",
    description:
      "Agentic AI for real-time sports strategy. Runs on local NVIDIA hardware, processes live play-by-play data, and surfaces tactical recommendations mid-game.",
    longDescription:
      "COORDINATOR is an agentic AI system built for real-time sports strategy — it ingests live play-by-play feeds, video, and schematic data, and surfaces tactical recommendations during games. It runs on local NVIDIA DGX Spark hardware so coaching data never leaves the facility. The framework uses a dual-mode reasoning approach: a fast path for in-game decisions and a slower path for deeper strategic analysis between possessions. Built at BVR ST CO with NVIDIA Nemotron and AutoGen.",
    image: CoordinatorProjectThumbnail,
    liveUrl: "https://getcoordinator.ai/",
    features: [
      "Dual-mode reasoning (fast in-game tactics vs. deep strategic analysis)",
      "Live play-by-play, video, and schematic data ingestion",
      "Local NVIDIA DGX Spark deployment — no cloud dependency",
      "LoRA fine-tuning on team-specific data"
    ],
    techStack: [
      { category: "AI/ML", technologies: ["NVIDIA Nemotron", "AutoGen", "LoRA", "Reinforcement Learning"] },
      { category: "Hardware", technologies: ["NVIDIA DGX Spark", "Local GPUs"] },
      { category: "Frontend", technologies: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Data", technologies: ["Live Play-by-Play Feeds", "Video Analysis", "Schematic Data"] }
    ],
    metrics: [
      { label: "Processing Mode", value: "Real-time" },
      { label: "Security", value: "100% Local" },
      { label: "Analysis Speed", value: "<100ms" }
    ],
    documentation: `https://bvrstco.com/blog/introducing-coordinator`
  },
  {
    name: "OpenBeavs",
    category: "AI & ML",
    technologies: "React.js, Node.js, Python, GCP",
    period: "September 2025 - Present",
    description:
      "University-wide AI portal I built during my AI Advisor role at OSU. A single secured interface that routes faculty to multiple agentic AI services.",
    longDescription:
      "During my AI Advisor role at Oregon State, I built OpenBeavs (formerly the Genesis AI Hub) as the official front-end for OSU's internal agentic tools. Faculty log in via Microsoft SSO and Duo, then interact with specialized agents through a shared chat interface. The backend uses a registry pattern — new agents can be registered and made available without touching the frontend. Built for a 35,000-student institution with FERPA compliance requirements.",
    image: OpenBeavsProjectThumbnail,
    githubUrl: "https://github.com/GENESIS-AI-Hub/GENESIS-AI-Hub-App",
    liveUrl: "https://openbeavs-deploy-test-716080272371.us-west1.run.app/",
    features: [
      "Registry-based architecture for registering new agents without frontend changes",
      "Microsoft SSO & Duo authentication",
      "Persistent chat history per user",
      "File upload and document attachment support"
    ],
    techStack: [
      { category: "Frontend", technologies: ["React.js", "TypeScript"] },
      { category: "Backend", technologies: ["Node.js", "Python (FastAPI/Flask)", "Java (Spring Boot)"] },
      { category: "Authentication", technologies: ["Microsoft SSO", "Duo"] },
      { category: "Cloud/Data", technologies: ["Google Cloud Platform (GCP)", "PostgreSQL", "Firebase"] }
    ],
    metrics: [
      { label: "Response Latency", value: "<5s" },
      { label: "Target Users", value: "10,000+" },
      { label: "Compliance", value: "FERPA/SSO" }
    ],
    documentation: `## OpenBeavs

A secure, web-based portal for registering and interacting with agentic AI applications for Oregon State Faculty. Formerly known as the OSU Genesis AI Hub.

## Concept
The Hub provides a unified front-end for multiple independent AI agents. Instead of disparate tools, faculty access a single, branded interface where developers can register new agentic services using a standardized protocol.

## Technical Architecture

### Frontend & Security
- Built with React.js for a responsive, professional chat experience.
- Strict access control via OSU Microsoft SSO and Duo authentication.

### Registry & Routing
- Centralized registry system to manage agent metadata and endpoints.
- Backend routing that passes conversation context and attachments to the selected agent (e.g., FAIE or GOA).

### Infrastructure
- Preferred deployment on Google Cloud Platform (GCP).
- Persistent storage for user sessions and chat histories.

## Success Criteria
Success is measured by the ability to register a simple backend agentic system with the Hub and successfully invoke it through the frontend chat interface to perform specific tasks.`
  },
  {
    name: "ResumAI",
    category: "AI & ML",
    technologies: "Python, OpenAI API, CSV, ATS",
    period: "August 2025",
    description:
      "CLI tool that reads a resume and job description, then generates a tailored cover letter, ATS score, and interview prep materials.",
    longDescription:
      "A Python CLI I built while job searching. You feed it your resume and a job description, and it uses OpenAI to score ATS keyword match, write a tailored cover letter, and generate likely interview questions with suggested answers. No UI — just a script you run from the terminal and pipe output wherever you need it.",
    image: ResumAIProjectThumbnail,
    features: [
      "ATS keyword match scoring against job description",
      "Tailored cover letter generation",
      "Interview question prediction with suggested answers"
    ],
    techStack: [
      { category: "Languages", technologies: ["Python"] },
      { category: "AI/ML", technologies: ["OpenAI API", "NLP"] },
      { category: "Data", technologies: ["CSV", "JSON"] },
      { category: "Libraries", technologies: ["Pandas", "NLTK"] }
    ],
    metrics: [
      { label: "ATS Score Improvement", value: "40%+" },
      { label: "Processing Time", value: "<5s" },
      { label: "Accuracy", value: "90%+" }
    ],
    documentation: `## ResumAI - Intelligent Resume Optimization

ResumAI helps job seekers optimize their resumes for specific positions using AI-powered analysis.

## Core Features

### Resume Analysis
- Scans resume for ATS compatibility
- Identifies missing keywords
- Suggests improvements for formatting
- Scores resume against job description

### Cover Letter Generation
- Creates personalized cover letters
- Matches tone to company culture
- Highlights relevant experience
- Customizable templates

### Interview Preparation
- Predicts likely interview questions
- Generates sample answers
- Provides tips based on job description

## How It Works

1. **Upload Resume**: User uploads their current resume (PDF, DOCX, or TXT)
2. **Job Description**: User pastes the job description they're applying for
3. **AI Analysis**: OpenAI API analyzes both documents
4. **Recommendations**: System provides specific suggestions for improvement
5. **Generate Materials**: Creates optimized resume, cover letter, and interview prep

## Technical Details
Built with Python, using OpenAI's GPT-4 for natural language understanding. Processes documents using Pandas for data manipulation and NLTK for text analysis.

## Results
Users report 40%+ improvement in ATS scores and higher callback rates after using ResumAI to optimize their applications.`
  },
  {
    name: "MIT JOS",
    category: "Systems",
    technologies: "C, C++, Assembly, OS concepts, Computer Architecture",
    period: "March 2024",
    description:
      "Worked through MIT's 6.828 JOS curriculum, implementing memory management, system calls, a file system, and concurrency in C and x86 Assembly.",
    longDescription:
      "MIT 6.828 (JOS) is one of the harder OS courses you can self-study. I worked through the full lab sequence: physical and virtual memory with paging, context switching and process scheduling, copy-on-write fork, a Unix-like file system, and kernel-level IPC. All in C and x86 Assembly on QEMU. More useful than any lecture for understanding what actually happens below the OS API.",
    image: MITJOSProjectThumbnail,
    features: [
      "Virtual memory with paging and page table management",
      "Copy-on-write fork implementation",
      "Unix-like file system (create, read, write, delete)",
      "20+ system calls with user-kernel mode switching"
    ],
    techStack: [
      { category: "Languages", technologies: ["C", "C++", "x86 Assembly"] },
      { category: "Concepts", technologies: ["Operating Systems", "Computer Architecture", "Low-level Programming"] },
      { category: "Tools", technologies: ["GDB", "QEMU", "Make"] }
    ],
    documentation: `## Operating System Implementation

This project involved building a Unix-like operating system from scratch following MIT's JOS (6.828) curriculum.

## Core Components Implemented

### Memory Management
- Virtual memory with paging
- Page table management
- Memory allocation and deallocation
- Copy-on-write fork implementation

### Process Management
- Process creation and termination
- Context switching
- Process scheduling (round-robin)
- Inter-process communication

### File System
- Basic file system structure
- File operations (create, read, write, delete)
- Directory management
- Disk I/O operations

### System Calls
- Implemented 20+ system calls
- User-kernel mode switching
- Trap handling and interrupts

## Learning Outcomes
Deep understanding of how operating systems work at the lowest level, including memory management, process scheduling, and hardware interaction.`
  },
  {
    name: "Wormhole",
    category: "Web",
    technologies: "Next.js, TypeScript, Tailwind CSS, Vercel, Generative AI",
    period: "August 2025",
    description:
      "This site. Every /wormhole/* page visit calls an LLM with my bio and generates a unique HTML portfolio page. Supports 10+ models and 100+ languages.",
    longDescription:
      "The Wormhole is the core feature of this portfolio. Every visit to a /wormhole/* path calls whichever LLM the visitor has configured — Gemini, GPT-4o, Claude, or others — with my bio and a system prompt, and renders the resulting HTML directly. No two visits produce the same page. Also includes /playground/llm-sandbox, a 3D vector-space lab built with React Three Fiber that lets you visualize tokenization, embedding clusters, cosine similarity, and word analogies in real time.",
    image: WormholeProjectThumbnail,
    githubUrl: "https://github.com/gitJamoo/wormhole-portfolio",
    liveUrl: "https://j-m-s.dev",
    features: [
      "Every page visit generates unique HTML via LLM",
      "10+ supported models (Gemini, GPT-4o, Claude, and more)",
      "100+ language support",
      "/playground/llm-sandbox — 3D vector-space visualizer built with React Three Fiber"
    ],
    techStack: [
      { category: "Frontend", technologies: ["Next.js", "React", "TypeScript"] },
      { category: "Styling", technologies: ["Tailwind CSS", "CSS3"] },
      { category: "AI/ML", technologies: ["OpenAI API", "Generative AI"] },
      { category: "Deployment", technologies: ["Vercel", "GitHub"] }
    ],
    metrics: [
      { label: "Build Time", value: "<30s" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Page Load", value: "<1s" }
    ],
    documentation: `## Wormhole Portfolio

An experimental portfolio website that uses AI to generate unique content for each visitor.

## Concept
Instead of a static portfolio, Wormhole uses a Large Language Model to dynamically generate page content based on my professional background. Each visit creates a slightly different narrative while maintaining factual accuracy.

## Technical Architecture

### Frontend
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Server-side rendering for performance

### AI Integration
- OpenAI GPT-4 API for content generation
- Custom prompts for consistent branding
- Caching layer to reduce API calls
- Fallback to static content if API fails

### Deployment
- Hosted on Vercel for optimal Next.js performance
- Automatic deployments from GitHub
- Edge functions for low latency

## Features
- Dynamic "About Me" section
- AI-generated project descriptions
- Personalized greetings
- Contact form with email notifications
- Responsive design for all devices

## Performance
Optimized for speed with server-side rendering, image optimization, and efficient caching strategies.`
  },
  {
    name: "jcord",
    category: "Products",
    technologies: "Next.js 16, TypeScript, Supabase, PostgreSQL, LiveKit, Tailwind CSS, shadcn/ui",
    period: "March 26, 2026",
    description:
      "Full-stack Discord clone with real-time messaging, WebRTC voice/video, typing indicators, presence, and full-text search.",
    longDescription:
      "Built jcord as a deep-dive into real-time web architecture. Supabase Realtime (Postgres logical replication) handles live messaging per channel with optimistic UI. LiveKit provides the WebRTC layer for voice and video. Typing indicators and presence are broadcast as ephemeral events over Supabase Realtime. Full-text search runs on PostgreSQL tsvector with an indexed messages table. Every message is persisted and searchable.",
    image: jcordProjectThumbnail,
    githubUrl: "https://github.com/gitJamoo/jcord",
    features: [
      "Real-time messaging via Supabase Realtime (Postgres WebSockets)",
      "Voice & video calls with WebRTC through LiveKit (Discord-style grid layout)",
      "Active user presence tracking per room",
      "Typing indicators ('X is typing...' in real-time)",
      "Unread message badges and read receipts",
      "Full-text message search (Ctrl+F)",
      "Persistent message history in PostgreSQL",
      "Full authentication with separate user accounts"
    ],
    techStack: [
      { category: "Frontend", technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "shadcn/ui"] },
      { category: "Backend & Realtime", technologies: ["Supabase Realtime", "Supabase Auth", "PostgreSQL"] },
      { category: "Voice & Video", technologies: ["LiveKit", "WebRTC"] },
      { category: "Deployment", technologies: ["Vercel", "Supabase Cloud"] }
    ],
    metrics: [
      { label: "Realtime Transport", value: "WebSockets" },
      { label: "A/V Protocol", value: "WebRTC" },
      { label: "Message Storage", value: "PostgreSQL" }
    ],
    documentation: `## jcord

A full-stack Discord clone built with Next.js 16, Supabase, and LiveKit.

## Concept
jcord replicates Discord's core experience from scratch — real-time group chat, voice/video calling, presence, and notifications — as a deep-dive into building production-grade real-time web applications.

## Technical Architecture

### Real-Time Messaging
Supabase Realtime (backed by Postgres logical replication) powers all live messaging. WebSocket connections are maintained per channel, with optimistic UI updates and server-reconciled delivery.

### Voice & Video
LiveKit provides the WebRTC infrastructure for voice and video rooms. The UI renders a Discord-style grid layout that adapts to the number of active participants.

### Presence & Typing
Supabase Realtime Presence tracks which users are online in a given room. Typing indicators are broadcast as ephemeral presence events and expire automatically.

### Authentication & Storage
Supabase Auth handles user accounts (email/password + OAuth). All messages, rooms, and user data are stored in PostgreSQL with row-level security policies.

### Search
Full-text message search is implemented using PostgreSQL's tsvector/tsquery with an indexed messages table, accessible via Ctrl+F in the UI.

## UI
Discord-inspired dark theme built with Tailwind CSS v4 and shadcn/ui component primitives.`
  },
  {
    name: "n8n Automation Suite",
    category: "Infrastructure",
    technologies: "n8n, Node.js, REST APIs, Webhooks, AI Integrations",
    period: "2024 - Present",
    description:
      "Personal collection of self-hosted n8n automation workflows — AI agents, sentiment analysis pipelines, lead gen, and self-healing infrastructure monitors.",
    longDescription:
      "I run a personal n8n instance on my homelab and use it as the orchestration layer for a range of automation workflows: AI-powered sentiment analysis that feeds into automated newsletters, social listening pipelines, lead generation and enrichment, and self-healing infrastructure alerts that trigger automated remediation. All self-hosted in Docker behind Cloudflare Tunnels — no vendor lock-in, full data ownership.",
    features: [
      "AI-powered sentiment analysis and automated newsletters",
      "Social listening pipelines",
      "Lead generation and enrichment workflows",
      "Self-healing infrastructure monitors with automated remediation"
    ],
    techStack: [
      { category: "Platform", technologies: ["n8n"] },
      { category: "Languages", technologies: ["JavaScript", "Node.js"] },
      { category: "Integrations", technologies: ["REST APIs", "Webhooks", "AI APIs"] },
      { category: "Infrastructure", technologies: ["Docker", "Self-hosted"] }
    ],
    metrics: [
      { label: "Workflow Types", value: "5+" },
      { label: "Hosting", value: "Self-hosted" },
      { label: "Uptime", value: "24/7" }
    ],
    documentation: `## n8n Automation Suite

A self-hosted collection of automation workflows running on personal infrastructure.

## What is n8n?
n8n is an open-source, self-hostable workflow automation tool — think Zapier, but code-first and fully self-hosted. Workflows are built visually with support for custom JavaScript nodes and direct API calls.

## Workflow Categories

### AI & Intelligence
Sentiment analysis pipelines that aggregate and summarize content into automated newsletters. Custom AI agent workflows that orchestrate multi-step reasoning tasks.

### Data & Monitoring
Social listening flows that track signals across platforms. Self-healing infrastructure workflows that detect anomalies and trigger automated remediation.

### Business Automation
Lead generation and enrichment pipelines that reduce manual research overhead.

## Infrastructure
Runs as a Docker container on personal homelab hardware behind Nginx and Cloudflare Tunnels. Persistent volume storage ensures workflow state survives restarts.`
  },
  {
    name: "Personal Homelab",
    category: "Infrastructure",
    technologies: "Raspberry Pi, Docker, Tailscale, Pi-hole, Caddy, Linux",
    period: "2024 - Present",
    description:
      "Raspberry Pi home server running self-hosted services on a Tailscale mesh VPN, with Pi-hole for DNS, Caddy as a reverse proxy, and Docker for containerization.",
    longDescription:
      "My personal homelab runs on a Raspberry Pi with Docker for containerization and Caddy as a reverse proxy that routes .home subdomains to the right container. Pi-hole handles DNS resolution and network-wide ad blocking. Everything is connected over a Tailscale mesh VPN so I can SSH into any device from anywhere without port forwarding. Hosts n8n, Plane, Minecraft, and a few other things permanently.",
    features: [
      "Tailscale mesh VPN — SSH access from anywhere without port forwarding",
      "Pi-hole for network-wide DNS ad-blocking",
      "Caddy reverse proxy with .home subdomain routing",
      "Dockerized services: n8n, Plane, Minecraft"
    ],
    techStack: [
      { category: "Hardware", technologies: ["Raspberry Pi"] },
      { category: "Networking", technologies: ["Tailscale", "Pi-hole", "Caddy"] },
      { category: "Containers", technologies: ["Docker", "Docker Compose"] },
      { category: "OS", technologies: ["Linux (Raspberry Pi OS)"] }
    ],
    metrics: [
      { label: "Network", value: "Tailscale VPN" },
      { label: "DNS", value: "Pi-hole" },
      { label: "Uptime", value: "24/7" }
    ],
    documentation: `## Personal Homelab

A Raspberry Pi-based home server running self-hosted services on a private Tailscale mesh network.

## Hardware
- Primary server: Raspberry Pi
- Personal devices connected via Tailscale (laptop, phone, desktop)

## Networking

### Tailscale
All devices are connected via a Tailscale mesh VPN, enabling secure private access from anywhere without port forwarding or exposing services to the public internet.

### Pi-hole
Handles DNS resolution and network-wide ad blocking. Custom split-DNS entries resolve .home subdomains to internal services when on the Tailscale network.

### Caddy
Acts as a reverse proxy, routing .home hostnames to the appropriate Docker containers by port. Simple config — add a new service block, reload, and it's live.

## Services Hosted
- **n8n** — workflow automation (see n8n Automation Suite)
- **Plane** — self-hosted project management
- **Pi-hole** — DNS and ad-blocking dashboard
- **Minecraft Server** — personal/friends game server

## Access
SSH is configured over Tailscale for all nodes. Services are accessed via Magic DNS (.home hostnames) from any device on the tailnet — no VPN client setup required beyond Tailscale.`
  },
  {
    name: "Second Brain Pipeline",
    category: "AI & ML",
    technologies: "Python, Claude API, Haiku, Sonnet, Obsidian, Markdown",
    period: "June 2026 – Present",
    description:
      "Two-tier agent pipeline that converts 1,400+ AI conversations into a structured Obsidian knowledge base — Haiku for batch digesting, Sonnet for synthesis.",
    longDescription:
      "I had 1,400+ conversations across Claude, ChatGPT, Gemini, and Claude Code with no good way to access what I'd learned in them. So I built this: adapters normalize conversations from all four sources into a unified markdown archive, then Haiku-class subagents batch-digest each conversation cheaply, and Sonnet-class agents synthesize the digests into structured Topic, Solution, Decision, and People notes written directly into Obsidian. It runs automatically — every new conversation gets processed and distilled.",
    features: [
      "Multi-source adapters for Claude, ChatGPT, Gemini, and Claude Code exports",
      "Haiku-class subagents for cost-efficient batch digesting",
      "Sonnet-class agents for synthesis into Topics, Solutions, Decisions, People notes",
      "Auto-writes structured notes directly into Obsidian vault"
    ],
    techStack: [
      { category: "Language", technologies: ["Python"] },
      { category: "AI", technologies: ["Claude API", "claude-haiku-4-5", "claude-sonnet-4-5"] },
      { category: "Knowledge Base", technologies: ["Obsidian", "Markdown"] }
    ],
    metrics: [
      { label: "Conversations", value: "1,400+" },
      { label: "Agent Tiers", value: "2" },
      { label: "Sources", value: "4 providers" }
    ],
  },
  {
    name: "Hermes",
    category: "AI & ML",
    technologies: "Raspberry Pi 5, Dell OptiPlex, Python, Telegram, N8N, Obsidian, open-source agent framework",
    period: "July 2026 – Present",
    description:
      "Personal AI executive assistant running on my homelab. Telegram interface, human-in-the-loop approval gate, and integrations for email, calendar, and voice. In progress.",
    longDescription:
      "Hermes is the personal AI coordinator I've always wanted — something that can manage email, schedule meetings, run workflows, and make calls on my behalf, but only after I approve it. It runs on a Raspberry Pi 5 and Dell OptiPlex, uses Telegram as the interface, and routes tasks to specialized subagents. The shared Obsidian vault is the persistent state layer — agents read and write structured notes to stay in sync. Still in active development.",
    features: [
      "Telegram interface with human-in-the-loop approval gate for all actions",
      "Email, calendar, and voice call integrations",
      "N8N workflow automation integration",
      "Shared Obsidian vault as persistent state layer across agents"
    ],
    techStack: [
      { category: "Hardware", technologies: ["Raspberry Pi 5", "Dell OptiPlex"] },
      { category: "Interface", technologies: ["Telegram Bot API"] },
      { category: "Automation", technologies: ["N8N", "Email", "Calendar"] },
      { category: "State", technologies: ["Obsidian", "Markdown"] },
      { category: "Framework", technologies: ["Open-source agent framework", "Python"] }
    ],
    metrics: [
      { label: "Status", value: "In Progress" },
      { label: "Interface", value: "Telegram" },
      { label: "Hosting", value: "Self-hosted" }
    ],
  },
];


const creativeWorks = [
  {
    title: "EcoDues Launch Film",
    videoUrl: "https://www.ecodues.org/launch-film.mp4",
  },
  {
    title: "OpenBeavs Sizzle Reel",
    videoUrl: "https://youtu.be/_Dzs6amoz1c",
  },
  {
    title: "NY Montage 1",
    videoUrl: "https://youtube.com/shorts/ybqFLenkeWE",
  },
  {
    title: "Gaming Montage",
    videoUrl: "https://youtu.be/wxSr9o4Vqsc",
  },
  {
    title: "Beach Trip",
    videoUrl: "https://youtu.be/pbhPOA26mrI",
  },
  {
    title: "Spring Montage",
    videoUrl: "https://youtube.com/shorts/xGahzFqC6dk",
  },
  {
    title: "Winter 25",
    videoUrl: "https://youtube.com/shorts/7nCGFNZC5Pw",
  },
  {
    title: "NY Montage 2",
    videoUrl: "https://youtube.com/shorts/qnMAit1Upro",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto p-8 sm:p-12 md:p-16 lg:p-24">
        <header className="text-center mb-16">
          <div className="w-32 h-32 rounded-full mx-auto mb-4 relative overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <Image
              src={headshot}
              alt="James M. Smith Headshot"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            James M. Smith
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
            AI/Product Engineer
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/james-m-smith1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:james.smith.tig@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <Link
              href="/book"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="/playground"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Playground
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
            <a
              href="https://github.com/gitJamoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>

        <section className="mb-16">
          <p className="text-lg text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            AI/Product Engineer at Magical Inc in San Francisco, building AI-powered workflow automation that ships real features end-to-end. I graduated from Oregon State University in June 2026 (B.S. Computer Science, Cybersecurity minor, Cum Laude) and spent four years as an NCAA Division I cheerleader while building production AI systems on the side. At Estée Lauder I shipped a 12,000-SKU recommendation engine with $1.5M projected annual revenue impact and cut LLM API costs 45% with vector-database caching — and I&apos;ve been chasing that kind of leverage ever since. I care about building things that actually work.
          </p>
        </section>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-1 h-64 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center">
                 <span className="text-gray-500">Picture 1</span>
            </div>
            <div className="md:col-span-2 h-64 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center">
                 <span className="text-gray-500">Picture 2</span>
            </div>
        </div> */}

        <section id="education" className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Education</h2>
          <div className="space-y-8">
            <EducationCard education={education} />
          </div>
        </section>

        <section id="experience" className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Companies I Have Worked With
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
          <ProjectGrid projects={projects} />
        </section>



        <section id="creative-works" className="mb-16 mt-24">
          <h2 className="text-4xl font-bold mb-4 text-center">Creative Works</h2>
          <p className="text-lg text-center max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            I have a passion for making small videos recapping chapters of my life and saving memories. Here are a few:
          </p>
          <CreativeWorksCarousel works={creativeWorks} />
        </section>

        <section id="contact" className="text-center mt-16">
          <ContactFormEmbedded />
        </section>
      </div>
    </div >
  );
}

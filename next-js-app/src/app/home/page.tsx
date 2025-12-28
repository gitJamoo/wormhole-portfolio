"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import ContactFormEmbedded from "../components/contact/ContactFormEmbedded";
import CreativeWorksCarousel from "../components/CreativeWorksCarousel";


import headshot from "../../../public/image-assets/beaver-headshot.jpg";

import esteeLauderLogo from "../../../public/image-assets/estee_lauder_companies_logo.png";
import njTransitLogo from "../../../public/image-assets/nj_transit_logo.jpeg";
import hatsAndLaddersLogo from "../../../public/image-assets/hats_and_ladders_logo.jpg";
import oregonStateUniversityLogo from "../../../public/image-assets/oregon_state_university_logo.png";
import envolvlyLogo from "../../../public/image-assets/envolvly_logo.png";

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
// import elcFirstDayHeadshot from "../../../public/image-assets/Estee_Lauder_Images/ELC_First_Day_Headshot.jpg";
import elcJamesSmithNametagCollection from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Smith_Nametag_Collection.jpg";
import elcLaunchIqPicture from "../../../public/image-assets/Estee_Lauder_Images/ELC_LaunchIQ_Picture.jpg";
import elcStandingWithCoInternsOnRooftop from "../../../public/image-assets/Estee_Lauder_Images/ELC_Standing_With_CoInterns_On_Rooftop.jpg";
import elcJamesGivingFinalPresentation from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Given_Final_Presentation.png";
import elcJamesStandingFrontOfBackdrop from "../../../public/image-assets/Estee_Lauder_Images/ELC_James_Standing_In_Front_Of_Backdrop.png";

import njtJamesGroupInternNjtOfficialPicture from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Group_Intern_NJT_Official_Picture.jpg";
import njtJamesGroupInternPicture1 from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Group_Intern_Picture_1.jpg";
import njtJamesWearingHardhatConsoleRoom from "../../../public/image-assets/New_Jersey_Transit/NJT_James_Wearing_Hardhat_Console_Room.jpg";

import envolvlyProjectThumbnail from "../../../public/image-assets/projects/Envolvly/thumbnail.png";
import MITJOSProjectThumbnail from "../../../public/image-assets/projects/MIT-JOS/thumbnail.png";
import WormholeProjectThumbnail from "../../../public/image-assets/projects/Wormhole/thumbnail.png";
import StuntCVProjectThumbnail from "../../../public/image-assets/projects/StuntCV/thumbnail.png";
import ResumAIProjectThumbnail from "../../../public/image-assets/projects/ResumAI/thumbnail.png";
import CoordinatorProjectThumbnail from "../../../public/image-assets/projects/Coordinator/thumbnail.png";
import GenesisAIHubProjectThumbnail from "../../../public/image-assets/projects/GenesisAIHub/thumbnail.png";

import fileIcon from "../../../public/file.svg";
import globeIcon from "../../../public/globe.svg";
import windowIcon from "../../../public/window.svg";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  longDescription: string;
  logo?: StaticImageData;
  images?: StaticImageData[];
}

interface Project {
  name: string;
  technologies: string;
  period: string;
  description: string;
  longDescription: string;
  image?: StaticImageData;
  links?: { text: string; url: string }[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
  documentation?: string;
  features?: string[];
  techStack?: { category: string; technologies: string[] }[];
  metrics?: { label: string; value: string; icon?: string }[];
  gallery?: StaticImageData[];
}

const education: Education = {
  institution: "Oregon State University",
  degree: "Bachelor of Engineering in Computer Science & ML/AI",
  period: "September 2022 – June 2026",
  details:
    "Minor in Cybersecurity. Relevant Coursework: Operating Systems I&II, Discrete Math, Analysis of Algorithms, Software Eng. I&II, Data Structures, Web Development, Computer Assembly, Technical Writing.",
  longDescription:
    "Attended Oregon State University and was a part of the cheer team, and won an award for my work with Envolvly.",
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
    company: "Oregon State University",
    role: "GENESIS AI Dev Team Advisor",
    period: "August 2025 – Present",
    description:
      "Advising the GENESIS AI development team on creating internal agentic AI tools to streamline university business operations.",
    longDescription:
      "Advising the GENESIS AI Dev team on building interal agentic AI tools. This includes but is not limited to creating documentation, training videos, and example codebases. Also worked with vendors (Google, Amazon, Microsoft) in order to ensure best practices in implementation. Created applicaitons across Google Gemini, Amazon Bedrock, and Microsoft Copilot environments.",
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
      "Fortified a critical statewide incident reporting system by creatign tests, directly contributing to system reliability and modernization.",
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
    name: "Envolvly",
    technologies: "GitHub, Docker, AWS, React, Typescript, MongoDB",
    period: "September 2023 - Present",
    description:
      "Laid groundwork for tech infrastructure, resulting in a robust, scalable application reaching 1,000+ unique users.",
    longDescription:
      "As technical co-founder, I led Envolvly's development from concept to a scalable app with live users. I architected the full-stack infrastructure using React, AWS, and MongoDB, and established all technical operations, including the CI/CD pipeline. My leadership in applying Agile methodologies was key to our rapid growth and winning the OSU Business Pitch Competition, demonstrating strong technical and business acumen.",
    image: envolvlyProjectThumbnail,
    liveUrl: "https://www.envolvly.com",
    features: [
      "Full-stack web application with real-time updates",
      "Scalable AWS infrastructure with auto-scaling",
      "Secure authentication and authorization system",
      "CI/CD pipeline for automated deployments",
      "MongoDB database with optimized queries",
      "Responsive design for mobile and desktop"
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
    technologies: "Python, OpenCV, MediaPipe, Tkinter, NumPy",
    period: "July 2025 - Present",
    description:
      "A desktop application designed for analysis of stunt performances. Tracks 70 points of accuracy per frame and performs data analysis on stunts performed.",
    longDescription:
      "A desktop application designed for detailed analysis of acrobatic performances, such as cheer stunts and partner acrobatics, using advanced computer vision. The application uses MediaPipe's pose estimation to track 33 body landmarks in real-time, enabling coaches and athletes to analyze form, technique, and safety.",
    image: StuntCVProjectThumbnail,
    githubUrl: "https://github.com/gitJamoo/StuntCV",
    features: [
      "Real-time pose estimation with 33 body landmarks",
      "Video recording and playback analysis",
      "Angle measurement for joint positions",
      "Performance metrics and statistics",
      "Frame-by-frame analysis tools",
      "Export data to CSV for further analysis"
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
    technologies: "Rust, Tauri, OpenCV",
    period: "December 2025",
    description:
      "An accountability app that tracks users eyes and posture to ensure that good habits are followed and work is done.",
    longDescription:
      "OVERSEER is an accountability app that tracks users eyes and posture to ensure that good habits are followed and work is done. The app uses Rust and Tauri to create a desktop application that uses OpenCV to track the user's eyes and posture. The app has been deployed and has paying users.",
    image: WormholeProjectThumbnail,
    liveUrl: "https://overseer-website.vercel.app",
    features: [
      "AI-generated content for unique experiences",
      "Dynamic page generation with LLM",
      "Responsive design with Tailwind CSS",
      "Server-side rendering with Next.js",
      "Contact form with email integration",
      "Dark mode support"
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
    name: "COORDINATOR",
    technologies: "NVIDIA, AutoGen, Next.js",
    period: "October 2025",
    description:
      "A first-of-its-kind agentic framework designed to optimize real-time strategy and decision-making in sports.",
    longDescription:
      "COORDINATOR is a continuous cognitive AI system that transforms sports strategy into adaptive, real-time intelligence. Inspired by the human brain's cognitive cycle, it observes, thinks, acts, and verifies to spot patterns and anticipate game changes. Built on NVIDIA technologies and running on local hardware (DGX Spark), it ensures strategic data remains secure and offline while providing coaches with a significant competitive edge.",
    image: CoordinatorProjectThumbnail,
    liveUrl: "https://getcoordinator.ai/",
    features: [
      "Real-time strategic analysis and adaptive learning",
      "Dual-mode reasoning (Fast-mode tactics vs. Slow-mode strategy)",
      "Secure local infrastructure with offline training",
      "Agentic framework for multi-source data processing",
      "Low-Rank Adaptation (LoRA) for efficient model fine-tuning",
      "End-to-end encryption for sensitive team data"
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
    name: "OSU Genesis AI Hub",
    technologies: "React.js, Node.js, Python, GCP",
    period: "September 2025 - Present",
    description:
      "A central AI service portal designed to serve as the secure, branded front-end for Oregon State University's faculty-facing agentic applications.",
    longDescription:
      "The OSU Genesis Hub is a modular web-based interface that acts as a unified entry point for specialized agents like FAIE and GOA. It provides a secure environment through Microsoft SSO and Duo authentication, featuring a registry-based architecture that routes user queries and file attachments to specific agentic services. This project focuses on creating a seamless, persistent chat experience while establishing a standard interface for future OSU-developed AI tools.",
    image: GenesisAIHubProjectThumbnail,
    githubUrl: "https://github.com/GENESIS-AI-Hub/GENESIS-AI-Hub-App",
    liveUrl: "https://genesis.dev.oregonstate.edu/",
    features: [
      "Modular Agentic Services Registry",
      "Secure Microsoft SSO & Duo Authentication",
      "Persistent chat history tied to user accounts",
      "Context-aware backend routing for specialized agents",
      "File upload and document attachment support",
      "Responsive, OSU-branded chat interface"
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
    documentation: `## OSU Genesis Hub

A secure, web-based portal for registering and interacting with agentic AI applications for Oregon State Faculty.

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
    technologies: "Python, OpenAI API, CSV, ATS",
    period: "August 2025",
    description:
      "An AI-powered job search application. Creates curated Cover letter, anticipated Interview questions, and more",
    longDescription:
      "An AI-powered resume builder and analyzer that helps users create and optimize their resumes for job applications. The application uses natural language processing to analyze job descriptions and tailor resumes to match specific positions, improving ATS (Applicant Tracking System) compatibility.",
    image: ResumAIProjectThumbnail,
    features: [
      "AI-powered resume analysis and optimization",
      "Custom cover letter generation",
      "Interview question prediction",
      "ATS compatibility scoring",
      "Keyword optimization",
      "Multiple resume format support"
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
    technologies: "C, C++, Assembly, OS concepts, Computer Architecture",
    period: "March 2024",
    description:
      "Completed labs, assignments, & built an Operating system based off of MIT's JOS curriculum.",
    longDescription:
      "Completed labs, assignments, & built an Operating system based off of MIT's JOS curriculum. Worked directly on memory management, process management, file systems, concurrency, & kernel operations.",
    image: MITJOSProjectThumbnail,
    features: [
      "Custom memory management with paging",
      "Process scheduling and context switching",
      "File system implementation",
      "System call interface",
      "Multi-threading support",
      "Kernel-level debugging tools"
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
    technologies: "Next.js, TypeScript, Tailwind CSS, Vercel, Generative AI",
    period: "August 2025",
    description:
      "An AI-powered portfolio experience that dynamically generates pages for a unique visit every time.",
    longDescription:
      "The Wormhole is an AI-powered portfolio experience that dynamically generates pages using a Large Language Model (LLM). The LLM is provided with information about my professional background and generates unique content for each visitor. This project showcases my skills in full-stack development, API design, and generative AI.",
    image: WormholeProjectThumbnail,
    githubUrl: "https://github.com/gitJamoo/wormhole-portfolio",
    liveUrl: "https://j-m-s.dev",
    features: [
      "AI-generated content for unique experiences",
      "Dynamic page generation with LLM",
      "Responsive design with Tailwind CSS",
      "Server-side rendering with Next.js",
      "Contact form with email integration",
      "Dark mode support"
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
    name: "My next big thing.",
    technologies: "???",
    period: "???",
    description:
      "My next big thing could be built with your team. Contact me to make it happen.",
    longDescription:
      "My next big thing could be built with your team. Contact me to make it happen.",
    image: globeIcon,
  },
];


const creativeWorks = [
  {
    title: "Cinematic Video 1",
    youtubeUrl: "https://youtube.com/shorts/ybqFLenkeWE", // Placeholder
  },
  {
    title: "Cinematic Video 1",
    youtubeUrl: "https://youtu.be/wxSr9o4Vqsc", // Placeholder
  },
  {
    title: "Cinematic Video 2",
    youtubeUrl: "https://youtu.be/pbhPOA26mrI", // Placeholder
  },
  {
    title: "Cinematic Video 3",
    youtubeUrl: "https://youtube.com/shorts/xGahzFqC6dk", // Placeholder
  },
  {
    title: "Cinematic Video 4",
    youtubeUrl: "https://youtube.com/shorts/7nCGFNZC5Pw", // Placeholder
  },
  {
    title: "Cinematic Video 5",
    youtubeUrl: "https://youtube.com/shorts/qnMAit1Upro", // Placeholder
  },
  {
    title: "Cinematic Video 7",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
  },
];


interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
  longDescription: string;
  logo?: StaticImageData;
  images?: StaticImageData[];
}

function EducationCard({ education }: { education: Education }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">{education.institution}</h3>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {education.degree}
          </p>
          <p className="text-sm text-gray-500">{education.period}</p>
        </div>
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          {education.logo ? (
            <Image
              src={education.logo}
              alt={`${education.institution} logo`}
              className="rounded-lg object-contain"
            />
          ) : (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Logo
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {education.details}
      </p>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            {education.longDescription}
          </p>
          {education.images && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {education.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`Education image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">{experience.company}</h3>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {experience.role}
          </p>
          <p className="text-sm text-gray-500">{experience.period}</p>
        </div>
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          {experience.logo ? (
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="rounded-lg object-contain"
            />
          ) : (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Logo
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {experience.description}
      </p>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            {experience.longDescription}
          </p>
          {experience.images && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {experience.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`Experience image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "demo" | "documentation" | "gallery">("overview");

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on a link
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    setIsModalOpen(true);
  };

  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    // Direct video URL
    return url;
  };

  const isDirectVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i) !== null;
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 cursor-pointer h-full flex flex-col group hover:shadow-xl hover:-translate-y-1"
        onClick={handleCardClick}
      >
        {project.image && (
          <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.name} image`}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{project.period}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
            {project.description}
          </p>
          <p className="text-xs text-gray-500 font-mono mb-4 line-clamp-2">
            {project.technologies}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-800 dark:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                title="View on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                title="View Live Demo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <button className="flex-1 bg-purple-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors">
                View Details
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
                  <p className="text-sm text-gray-500">{project.period}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === "overview"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  Overview
                </button>
                {project.demoVideoUrl && (
                  <button
                    onClick={() => setActiveTab("demo")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === "demo"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    🎬 Demo
                  </button>
                )}
                {project.documentation && (
                  <button
                    onClick={() => setActiveTab("documentation")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === "documentation"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    📝 Documentation
                  </button>
                )}
                {project.gallery && project.gallery.length > 0 && (
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === "gallery"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    🖼️ Gallery
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {project.image && (
                    <div className="w-full h-64 relative rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.name} image`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold mb-3">About This Project</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">✨ Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400 mt-1">▸</span>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">📊 Impact & Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                          >
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.techStack && project.techStack.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">🛠️ Tech Stack</h3>
                      <div className="space-y-4">
                        {project.techStack.map((stack, index) => (
                          <div key={index}>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                              {stack.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {stack.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!project.techStack && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">🛠️ Technologies</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                        {project.technologies}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Demo Tab */}
              {activeTab === "demo" && project.demoVideoUrl && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Project Demo</h3>
                  <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {isDirectVideo(project.demoVideoUrl) ? (
                      <video
                        controls
                        className="w-full h-full"
                        src={project.demoVideoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={getVideoEmbedUrl(project.demoVideoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Documentation Tab */}
              {activeTab === "documentation" && project.documentation && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Documentation</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {project.documentation}
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && project.gallery && project.gallery.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-48 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer"
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 dark:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Live Demo
                    </a>
                  )}
                  {project.links && project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
            Machine Learning Engineer & Software Developer
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
            A passionate and driven computer science student with a focus on
            machine learning and artificial intelligence. I thrive on building
            innovative solutions and have a proven track record of delivering
            high-impact projects in various internship roles. I am always eager
            to learn and apply new technologies to solve real-world problems.
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
          <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <ProjectCard key={index} project={proj} />
            ))}
          </div>
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

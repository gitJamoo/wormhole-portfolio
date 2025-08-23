"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import headshot from "../../../public/image-assets/beaver-headshot.jpg";

import esteeLauderLogo from "../../../public/image-assets/estee_lauder_companies_logo.png";
import njTransitLogo from "../../../public/image-assets/nj_transit_logo.jpeg";
import hatsAndLaddersLogo from "../../../public/image-assets/hats_and_ladders_logo.jpg";
import oregonStateUniversityLogo from "../../../public/image-assets/oregon_state_university_logo.png";
import envolvlyLogo from "../../../public/image-assets/envolvly_logo.png";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  longDescription: string;
  logo?: StaticImageData;
}

interface Project {
  name: string;
  technologies: string;
  period: string;
  description: string;
}

const education = {
  institution: "Oregon State University",
  degree: "Bachelor of Engineering in Computer Science & ML/AI",
  period: "September 2022 – June 2026",
  details:
    "Minor in Cybersecurity. Relevant Coursework: Operating Systems I&II, Discrete Math, Analysis of Algorithms, Software Eng. I&II, Data Structures, Web Development, Computer Assembly, Technical Writing.",
};

const experiences: Experience[] = [
  {
    company: "Oregon State University",
    role: "GENESIS AI Dev Team Advisor",
    period: "August 2025 – Present",
    description:
      "Created internal tooling for business operations at Oregon State University.",
    longDescription: "New role. More to come soon",
    logo: oregonStateUniversityLogo,
  },
  {
    company: "Envolvly",
    role: "Co-Founder",
    period: "February 2023 - Present",
    description:
      "Laid groundwork for tech infrastructure, resulting in a robust, scalable application reaching 1,000+ unique users.",
    longDescription:
      "Technical lead and Co-founder of Envolvly. Worked on everything under the sun of technology - including; Website (React, AWS, Domains & Hosting), Internal use (Google Suite and Emails), & CRMS. Leading use of Agile Methodologies.",
    logo: envolvlyLogo,
  },
  {
    company: "The Estée Lauder Companies",
    role: "Machine Learning Intern",
    period: "June 2025 – August 2025",
    description:
      "Developed an Agentic AI workflow to create a customer-facing AI chabot for product recommendation.",
    longDescription:
      "As a Machine Learning Intern on the Data Science and Analytics global team, I leveraged cutting-edge AI and data engineering to develop and optimize intelligent systems, significantly enhancing customer experiences and driving substantial operational efficiencies. My work focused on transforming complex data into actionable insights and building scalable solutions that directly contributed to future revenue growth and cost savings.",
    logo: esteeLauderLogo,
  },
  {
    company: "NJ Transit",
    role: "Programmer & Technical Analyst Intern",
    period: "June 2024 – August 2024",
    description:
      "Created 200+ tests across 18 suites resulting in 85% code coverage using Jest & Gherkin.",
    longDescription:
      "As a member of the engineering and innovations team, I contributed to the modernization and reliability of critical transit systems through comprehensive testing, automation, and infrastructure enhancements. Engineered and executed over 200 comprehensive tests across 18 suites for a critical, statewide digital incident reporting system, achieving an exceptional 85% code coverage with Jest and Gherkin.",
    logo: njTransitLogo,
  },
  {
    company: "Hats & Ladders",
    role: "Software Engineering Intern",
    period: "June 2022 – August 2022",
    description:
      "Created management panel that was used by 200,000+ unique users across 200+ organizations.",
    longDescription:
      "As a Web Development Intern, I contributed to the development and optimization of critical user management systems, enhancing administrative efficiency and user experience for a large-scale platform. Engineered a comprehensive administration user control panel, empowering administrators with instant, self-service capabilities to manage user roles, permissions, and settings for over 200,000 active unique users.",
    logo: hatsAndLaddersLogo,
  },
];

const projects: Project[] = [
  {
    name: "Envolvly",
    technologies: "GitHub, Docker, AWS, React, Typescript, MongoDB",
    period: "September 2023 - Current",
    description:
      "Laid groundwork for tech infrastructure, resulting in a robust, scalable application reaching 1,000+ unique users. Directly implemented cloud technologies such as AWS Lambda, Elastic Beanstalk, EC2, Git, and Firebase, creating a full stack web application with full mobile & desktop support.",
  },
  {
    name: "MIT JOS",
    technologies: "C, C++, Assembly, OS concepts, Computer Architecture",
    period: "March 2024 - June 2024",
    description:
      "Completed labs, assignments, & built an Operating system based off of MIT’s JOS curriculum. Worked directly on memory management, process management, file systems, concurrency, & kernel operations.",
  },
  {
    name: "StuntCV",
    technologies: "Python, OpenCV, MediaPipe, Tkinter, NumPy",
    period: "July 2025 - Present",
    description:
      "A desktop application designed for detailed analysis of acrobatic performances, such as cheer stunts and partner acrobatics, using advanced computer vision.",
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{experience.company}</h3>
          <p className="text-md text-gray-600 dark:text-gray-400">{experience.role}</p>
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
            <span className="text-xs text-gray-600 dark:text-gray-400">Logo</span>
          )}
        </div>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">{experience.description}</p>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">{experience.longDescription}</p>
          <div className="flex gap-4 mt-4">
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">More Pictures Here</span>
            </div>
          </div>
        </div>
      )}
    </div>
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
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold">{education.institution}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">{education.degree}</p>
            <p className="text-md text-gray-500 mb-4">{education.period}</p>
            <p className="text-gray-700 dark:text-gray-300">{education.details}</p>
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
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
              >
                <h3 className="text-xl font-bold">{proj.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{proj.period}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{proj.description}</p>
                <p className="text-sm text-gray-500 font-mono">
                  {proj.technologies}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

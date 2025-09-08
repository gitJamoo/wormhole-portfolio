"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import ContactFormEmbedded from "../components/contact/ContactFormEmbedded";

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
      "Created 200+ tests across 18 suites resulting in 85% code coverage using Jest & Gherkin.",
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
      "Laid groundwork for tech infrastructure, resulting in a robust, scalable application reaching 1,000+ unique users.",
    longDescription:
      "Laid groundwork for tech infrastructure, resulting in a robust, scalable application reaching 1,000+ unique users. Directly implemented cloud technologies such as AWS Lambda, Elastic Beanstalk, EC2, Git, and Firebase, creating a full stack web application with full mobile & desktop support.",
    image: envolvlyProjectThumbnail,
  },
  {
    name: "MIT JOS",
    technologies: "C, C++, Assembly, OS concepts, Computer Architecture",
    period: "March 2024 - June 2024",
    description:
      "Completed labs, assignments, & built an Operating system based off of MIT’s JOS curriculum.",
    longDescription:
      "Completed labs, assignments, & built an Operating system based off of MIT’s JOS curriculum. Worked directly on memory management, process management, file systems, concurrency, & kernel operations.",
    image: MITJOSProjectThumbnail,
  },
  {
    name: "StuntCV",
    technologies: "Python, OpenCV, MediaPipe, Tkinter, NumPy",
    period: "July 2025 - Present",
    description:
      "A desktop application designed for detailed analysis of acrobatic performances.",
    longDescription:
      "A desktop application designed for detailed analysis of acrobatic performances, such as cheer stunts and partner acrobatics, using advanced computer vision.",
    image: windowIcon,
  },
  {
    name: "Wormhole",
    technologies: "Next.js, TypeScript, Tailwind CSS, Vercel",
    period: "August 2025",
    description: "A secure file transfer application.",
    longDescription:
      "A secure file transfer application that allows users to send files of any size with end-to-end encryption.",
    image: WormholeProjectThumbnail,
  },
  {
    name: "ResumAI",
    technologies: "Python, OpenAI API, Streamlit",
    period: "August 2025",
    description: "An AI-powered resume builder and analyzer.",
    longDescription:
      "An AI-powered resume builder and analyzer that helps users create and optimize their resumes for job applications.",
    image: globeIcon,
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
              className={`w-6 h-6 transition-transform duration-300 ${
                isExpanded ? "transform rotate-180" : ""
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
              className={`w-6 h-6 transition-transform duration-300 ${
                isExpanded ? "transform rotate-180" : ""
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

  return (
    <>
      <div
        className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {project.image && (
          <div className="w-full h-40 relative mb-4 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.name} image`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{project.period}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <p className="text-sm text-gray-500 font-mono">
          {project.technologies}
        </p>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {project.image && (
              <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} image`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{project.period}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {project.longDescription}
            </p>
            <p className="text-md text-gray-500 font-mono">
              {project.technologies}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
            >
              Close
            </button>
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
          <div className="flex overflow-x-auto gap-8 pb-8">
            {projects.map((proj, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              >
                <ProjectCard project={proj} />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="text-center mt-16">
          <ContactFormEmbedded />
        </section>
      </div>
    </div>
  );
}

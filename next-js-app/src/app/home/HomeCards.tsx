"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

// Interactive pieces of /home (expanding cards, project modal, filter).
// Everything else on the page renders on the server.

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  longDescription: string;
  logo?: StaticImageData;
  images?: StaticImageData[];
}

export interface Project {
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
  category?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
  longDescription: string;
  logo?: StaticImageData;
  images?: StaticImageData[];
}

export function EducationCard({ education }: { education: Education }) {
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

export function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCurrent = experience.period.toLowerCase().includes("present");

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">{experience.company}</h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Current
              </span>
            )}
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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


export function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "demo" | "documentation" | "gallery">("overview");
  const [videoAspect, setVideoAspect] = useState<"16:9" | "9:16">("16:9");

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setVideoAspect("16:9");
  };

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const isDirectVideo = (url: string) => url.match(/\.(mp4|webm|ogg)$/i) !== null;

  const techList = project.technologies.split(",");

  const tabs = [
    { id: "overview" as const, label: "Overview", show: true },
    { id: "demo" as const, label: "Demo", show: !!project.demoVideoUrl },
    { id: "documentation" as const, label: "Documentation", show: !!project.documentation },
    { id: "gallery" as const, label: "Gallery", show: !!(project.gallery && project.gallery.length > 0) },
  ].filter(t => t.show);

  return (
    <>
      {/* Card */}
      <div
        className="group border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200 cursor-pointer flex flex-col overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Thumbnail */}
        {project.image && (
          <div className="relative aspect-video overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-900">
            <Image
              src={project.image}
              alt={`${project.name} thumbnail`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category + Period */}
          <div className="flex items-baseline gap-3 mb-3">
            {project.category && (
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {project.category}
              </span>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-600">{project.period}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 leading-snug tracking-tight">{project.name}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech list — plain text, muted */}
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-4 leading-relaxed">
            {techList.slice(0, 5).map(t => t.trim()).join(" · ")}
            {techList.length > 5 && <span> · +{techList.length - 5} more</span>}
          </p>

          {/* Action links */}
          <div className="flex gap-4 mt-auto text-sm" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2"
              >
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2"
              >
                Live
              </a>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <span className="text-gray-400 dark:text-gray-600 text-xs">Details →</span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <div
            className="bg-white dark:bg-gray-950 w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-0 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  {project.category && (
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                  )}
                  <h2 className="text-2xl font-semibold tracking-tight">{project.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">{project.period}</p>
                </div>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 mt-1"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Underline Tab Navigation */}
              <div className="flex gap-0 overflow-x-auto -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {project.image && (
                    <div className="w-full h-56 relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={project.image}
                        alt={`${project.name} image`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0">—</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-800 p-4"
                          >
                            <div className="text-xl font-semibold tracking-tight">
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.techStack && project.techStack.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Stack</h3>
                      <div className="space-y-3">
                        {project.techStack.map((stack, index) => (
                          <div key={index} className="flex gap-3">
                            <span className="text-xs text-gray-400 dark:text-gray-600 w-24 flex-shrink-0 pt-0.5">
                              {stack.category}
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {stack.technologies.join(", ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!project.techStack && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Stack</h3>
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
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Demo</h3>
                    <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 p-0.5">
                      <button
                        onClick={() => setVideoAspect("16:9")}
                        className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                          videoAspect === "16:9"
                            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        16:9
                      </button>
                      <button
                        onClick={() => setVideoAspect("9:16")}
                        className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                          videoAspect === "9:16"
                            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        9:16
                      </button>
                    </div>
                  </div>
                  {videoAspect === "16:9" ? (
                    <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
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
                  ) : (
                    <div className="flex justify-center">
                      <div className="bg-gray-100 dark:bg-gray-900 overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: "70vh", width: "auto" }}>
                        {isDirectVideo(project.demoVideoUrl) ? (
                          <video
                            controls
                            className="h-full w-full"
                            src={project.demoVideoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <iframe
                            src={getVideoEmbedUrl(project.demoVideoUrl)}
                            className="h-full w-full"
                            style={{ minWidth: "calc(70vh * 9 / 16)" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Documentation Tab */}
              {activeTab === "documentation" && project.documentation && (
                <div className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none prose-sm">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {project.documentation}
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && project.gallery && project.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-900"
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
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2 flex items-center gap-1.5"
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
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2 flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View live
                    </a>
                  )}
                  {project.links && project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
                <button
                  onClick={handleModalClose}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
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

const PROJECT_CATEGORIES = ["All", "Products", "AI & ML", "Infrastructure", "Systems", "Web"] as const;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [projectFilter, setProjectFilter] = useState<string>("All");

  const filteredProjects = projectFilter === "All"
    ? projects
    : projects.filter(p => p.category === projectFilter || !p.category);

  return (
    <>
    <div className="flex flex-wrap gap-0 justify-center mb-8 border-b border-gray-200 dark:border-gray-800">
      {PROJECT_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setProjectFilter(cat)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${
            projectFilter === cat
              ? "border-gray-900 dark:border-white text-gray-900 dark:text-white"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((proj) => (
        <ProjectCard key={proj.name} project={proj} />
      ))}
    </div>
    </>
  );
}

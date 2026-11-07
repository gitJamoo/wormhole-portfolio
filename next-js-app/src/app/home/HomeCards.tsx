"use client";

import { useCallback, useEffect, useState } from "react";
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
  // "contain" for a logo-style image that would be cropped by "cover".
  imageFit?: "cover" | "contain";
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

const linkCls =
  "text-sm text-gray-600 dark:text-gray-400 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-200 hover:bg-[length:100%_1px] hover:text-foreground";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 flex-none text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// One line per job; click to expand the longer story and photos.
export function ExperienceRow({ experience }: { experience: Experience }) {
  const [open, setOpen] = useState(false);
  const isCurrent = experience.period.toLowerCase().includes("present");
  const id = `exp-${experience.company.replace(/\W+/g, "-").toLowerCase()}-${experience.role.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li className="border-b border-black/[.08] dark:border-white/[.1]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="group w-full text-left py-5 grid grid-cols-[40px_1fr_auto] sm:grid-cols-[48px_1fr_auto] gap-4 items-start"
      >
        <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white ring-1 ring-black/[.06] overflow-hidden flex items-center justify-center">
          {experience.logo && (
            <Image src={experience.logo} alt="" className="w-full h-full object-contain" />
          )}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="font-semibold text-lg tracking-tight group-hover:underline underline-offset-4 decoration-1">
              {experience.company}
            </span>
            <span className="text-gray-600 dark:text-gray-400">{experience.role}</span>
            {isCurrent && (
              <span className="text-xs font-medium px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                Current
              </span>
            )}
          </span>
          <span className="block mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {experience.description}
          </span>
        </span>
        <span className="flex items-center gap-3 pt-1">
          <span className="hidden sm:block text-sm text-gray-500 whitespace-nowrap">{experience.period}</span>
          <Chevron open={open} />
        </span>
      </button>
      {open && (
        <div id={id} className="pb-6 sm:pl-16">
          <p className="sm:hidden text-sm text-gray-500 mb-2">{experience.period}</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">{experience.longDescription}</p>
          {experience.images && experience.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {experience.images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "demo" | "documentation" | "gallery">("overview");
  const [videoAspect, setVideoAspect] = useState<"16:9" | "9:16">("16:9");

  const handleModalClose = onClose;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

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


  const tabs = [
    { id: "overview" as const, label: "Overview", show: true },
    { id: "demo" as const, label: "Demo", show: !!project.demoVideoUrl },
    { id: "documentation" as const, label: "Documentation", show: !!project.documentation },
    { id: "gallery" as const, label: "Gallery", show: !!(project.gallery && project.gallery.length > 0) },
  ].filter(t => t.show);

  return (
        <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleModalClose}
    >
      <div
        className="bg-background w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.12] shadow-xl flex flex-col"
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
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkCls} onClick={(e) => e.stopPropagation()}>
          Live ↗
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkCls} onClick={(e) => e.stopPropagation()}>
          GitHub ↗
        </a>
      )}
    </>
  );
}

function useProjectModal() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const modal = open ? <ProjectModal project={open} onClose={close} /> : null;
  return { show: setOpen, modal };
}

// The few projects worth leading with: big picture, one line, their own numbers.
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const { show, modal } = useProjectModal();

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project, i) => {
          const lead = i === 0;
          return (
            <article
              key={project.name}
              onClick={() => show(project)}
              className={`group cursor-pointer rounded-2xl border border-black/[.08] dark:border-white/[.12] overflow-hidden bg-background transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-black/20 dark:hover:border-white/25 ${
                lead ? "lg:col-span-2 lg:grid lg:grid-cols-[1.35fr_1fr]" : "flex flex-col"
              }`}
            >
              {project.image && (
                <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-900 ${lead ? "aspect-[16/10] lg:aspect-auto lg:min-h-[340px]" : "aspect-[16/10]"}`}>
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes={lead ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 540px, 100vw"}
                    className={`${project.imageFit === "contain" ? "object-contain p-10 bg-white" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                  />
                </div>
              )}
              <div className="p-6 sm:p-8 flex flex-col">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {project.category} · {project.period}
                </p>
                <h3 className={`mt-2 font-semibold tracking-tight ${lead ? "text-3xl" : "text-2xl"}`}>{project.name}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
                {project.metrics && project.metrics.length > 0 && (
                  <dl className="mt-6 grid grid-cols-3 gap-4">
                    {project.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <dt className="text-lg font-semibold tracking-tight">{m.value}</dt>
                        <dd className="text-xs text-gray-500 mt-0.5">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-6 pt-5 border-t border-black/[.06] dark:border-white/[.08] flex flex-wrap gap-x-5 gap-y-2 lg:mt-auto">
                  <ProjectLinks project={project} />
                  <span className={`${linkCls} ml-auto`}>Details →</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {modal}
    </>
  );
}

const PROJECT_CATEGORIES = ["All", "Products", "AI & ML", "Infrastructure", "Systems", "Web"] as const;

// Everything else as slim rows; the filter only shows categories that have rows.
export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("All");
  const { show, modal } = useProjectModal();

  const categories = PROJECT_CATEGORIES.filter((c) => c === "All" || projects.some((p) => p.category === c));
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Filter projects">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`h-8 px-3.5 rounded-full text-sm transition-colors ${
              filter === cat
                ? "bg-foreground text-background"
                : "border border-black/[.1] dark:border-white/[.15] text-gray-600 dark:text-gray-400 hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul className="border-t border-black/[.08] dark:border-white/[.1]">
        {shown.map((project) => (
          <li key={project.name} className="border-b border-black/[.08] dark:border-white/[.1]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => show(project)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), show(project))}
              className="group cursor-pointer py-4 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 items-baseline"
            >
              <div className="min-w-0 lg:line-clamp-1">
                <span className="font-semibold tracking-tight group-hover:underline underline-offset-4 decoration-1">{project.name}</span>
                <span className="text-gray-400 dark:text-gray-600"> · </span>
                <span className="text-gray-600 dark:text-gray-400">{project.description}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 whitespace-nowrap">
                <span>{project.category}</span>
                <span>{project.period.replace(/\s*[–-]\s*Present/i, "–now")}</span>
                <ProjectLinks project={project} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {modal}
    </>
  );
}

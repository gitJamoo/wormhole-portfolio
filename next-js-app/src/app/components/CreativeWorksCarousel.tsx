"use client";

import { useState } from "react";

interface CreativeWork {
  title: string;
  videoUrl: string;
  poster?: string;
}

// YouTube id from youtu.be/, watch?v=, shorts/ or embed/ links.
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

function VideoTile({ work }: { work: CreativeWork }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(work.videoUrl);
  const isFile = /\.(mp4|webm|ogg)$/i.test(work.videoUrl);
  const isShort = work.videoUrl.includes("/shorts/");
  const thumb = isFile ? work.poster : id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;

  const frame =
    "relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 ring-1 ring-black/[.08] dark:ring-white/[.1]";

  if (playing && isFile) {
    return (
      <div className={frame}>
        <video src={work.videoUrl} title={work.title} poster={work.poster} controls autoPlay playsInline className="absolute inset-0 w-full h-full bg-black" />
      </div>
    );
  }

  if (playing && id) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={work.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${work.title}`}
      className={`${frame} group block w-full text-left transition-transform duration-200 ease-out hover:-translate-y-0.5`}
    >
      {thumb && isShort && (
        // A Short's thumbnail is a vertical frame inside black bars: blur a zoomed copy behind it
        // and show only the frame's own column in front.
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-[3] blur-xl opacity-70" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none [clip-path:inset(0_29%)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </>
      )}
      {thumb && !isShort && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-black shadow-lg transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
      <span className="absolute left-4 bottom-3 right-4 text-sm font-medium text-white">{work.title}</span>
    </button>
  );
}

export default function CreativeWorksCarousel({ works }: { works: CreativeWork[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {works.map((work) => (
        <VideoTile key={work.videoUrl} work={work} />
      ))}
    </div>
  );
}

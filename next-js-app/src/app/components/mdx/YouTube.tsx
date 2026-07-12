"use client";

import { useState } from "react";

interface YouTubeProps {
  url: string;
  caption?: string;
}

function extractVideoId(url: string): string {
  // handles youtu.be/ID and youtube.com/watch?v=ID and bare IDs
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  // assume it's already an ID if it's 11 chars
  if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
  return url;
}

export function YouTube({ url, caption }: YouTubeProps) {
  const [isPortrait, setIsPortrait] = useState(false);
  const videoId = extractVideoId(url);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <figure className="my-8">
      <div
        className={
          isPortrait
            ? "mx-auto w-full max-w-xs"
            : "relative w-full"
        }
      >
        <div
          style={
            isPortrait
              ? { position: "relative", paddingBottom: "177.78%", maxHeight: "70vh" }
              : { position: "relative", paddingBottom: "56.25%" }
          }
        >
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center gap-2">
        <button
          onClick={() => setIsPortrait((p) => !p)}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={isPortrait ? "Switch to landscape" : "Switch to portrait (9:16)"}
        >
          {isPortrait ? (
            <>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={2} />
              </svg>
              Landscape
            </>
          ) : (
            <>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="7" y="2" width="10" height="20" rx="2" strokeWidth={2} />
              </svg>
              Portrait (9:16)
            </>
          )}
        </button>
        {caption && (
          <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

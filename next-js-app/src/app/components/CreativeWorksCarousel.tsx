"use client";

import { useState, useRef, useEffect } from "react";

interface CreativeWork {
  title: string;
  youtubeUrl: string;
}

interface CreativeWorksCarouselProps {
  works: CreativeWork[];
}

export default function CreativeWorksCarousel({
  works,
}: CreativeWorksCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getYoutubeEmbedUrl = (url: string) => {
    // Basic parser for youtube links to embed url
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1];
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }

    // Clean up videoId if it has query parameters
    const queryPosition = videoId.indexOf("?");
    if (queryPosition !== -1) {
      videoId = videoId.substring(0, queryPosition);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // buffer
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of view width
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 focus:outline-none"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 focus:outline-none"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {works.map((work, index) => (
          <div
            key={index}
            className="flex-none w-full md:w-[450px] aspect-video snap-center bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800"
          >
            <iframe
              src={getYoutubeEmbedUrl(work.youtubeUrl)}
              title={work.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Overlay for title if needed, or put below */}
          </div>
        ))}
      </div>
    </div>
  );
}

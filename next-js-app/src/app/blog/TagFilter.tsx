"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface TagFilterProps {
  posts: Omit<BlogPost, "content">[];
  allTags: string[];
}

export function TagFilter({ posts, allTags }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered =
    activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      {/* Tag pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {["All", ...allTags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeTag === tag
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent"
                : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">
          No posts yet with that tag.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              {post.cover && (
                <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={
                        post.accent
                          ? {
                              color: post.accent,
                              borderColor: post.accent + "44",
                              backgroundColor: post.accent + "18",
                            }
                          : undefined
                      }
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        post.accent
                          ? ""
                          : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

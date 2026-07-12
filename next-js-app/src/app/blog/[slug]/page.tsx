import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/app/components/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImages = post.cover
    ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }]
    : [{ url: "/image-assets/og-image.png", width: 1200, height: 630, alt: post.title }];

  return {
    title: `${post.title} — James M. Smith`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://j-m-s.dev/blog/${post.slug}`,
      siteName: "James M. Smith",
      images: ogImages,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImages[0].url],
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// rehype-pretty-code options
const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {post.accent && (
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --post-accent: ${post.accent}; }`,
          }}
        />
      )}

      <div className="min-h-screen font-sans">
        <div className="container mx-auto px-6 py-16 max-w-2xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-12"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All posts
          </Link>

          {/* Post header */}
          <header className="mb-10">
            {post.cover && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 672px) 100vw, 672px"
                />
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      post.accent
                        ? ""
                        : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                James M. Smith
              </span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* MDX content */}
          <article className="prose-custom">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode as Parameters<typeof Array.prototype.push>[0], prettyCodeOptions],
                  ],
                },
              }}
            />
          </article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all posts
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}

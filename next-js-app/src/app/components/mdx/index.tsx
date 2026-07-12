import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { YouTube } from "./YouTube";
import { ImageRow } from "./ImageRow";

export const mdxComponents: MDXComponents = {
  // Custom components available in .mdx files
  Callout,
  YouTube,
  ImageRow,

  // Styled default elements
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="my-5 leading-7 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-[var(--post-accent,#6366f1)] underline underline-offset-2 hover:opacity-80 transition-opacity"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="my-5 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="my-5 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-[var(--post-accent,#6366f1)] pl-4 italic text-gray-600 dark:text-gray-400"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-[color-mix(in_srgb,var(--post-accent,#6366f1)_12%,transparent)] px-1.5 py-0.5 font-mono text-sm text-[var(--post-accent,#6366f1)]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-950 p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
};

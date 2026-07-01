import Link from "next/link";

interface Experience {
  href: string;
  emoji: string;
  title: string;
  blurb: string;
  available: boolean;
}

const EXPERIENCES: Experience[] = [
  {
    href: "/playground/llm-sandbox",
    emoji: "🌌",
    title: "LLM Sandbox",
    blurb:
      "See how language models turn words into vectors. Explore tokenization, 3D vector space, similarity, and analogies.",
    available: true,
  },
  {
    href: "#",
    emoji: "✨",
    title: "More coming soon",
    blurb: "New interactive experiments are in the works.",
    available: false,
  },
];

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-[#05070d] px-6 py-16 text-slate-200">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-slate-500">
            Playground
          </span>
          <Link
            href="/home"
            className="text-xs text-slate-400 transition-colors hover:text-white"
          >
            ← Portfolio
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-semibold text-white">
          Pick an experience
        </h1>
        <p className="mb-10 max-w-xl text-sm text-slate-400">
          A small collection of interactive experiments. Choose one to dive in.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {EXPERIENCES.map((exp) =>
            exp.available ? (
              <Link
                key={exp.title}
                href={exp.href}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-indigo-400/60 hover:bg-white/10"
              >
                <div className="mb-3 text-3xl">{exp.emoji}</div>
                <h2 className="mb-1 font-medium text-white">{exp.title}</h2>
                <p className="text-xs leading-relaxed text-slate-400">
                  {exp.blurb}
                </p>
                <span className="mt-3 inline-block text-xs text-indigo-300 opacity-0 transition-opacity group-hover:opacity-100">
                  Open →
                </span>
              </Link>
            ) : (
              <div
                key={exp.title}
                className="cursor-default rounded-xl border border-dashed border-white/10 bg-transparent p-5 opacity-50"
              >
                <div className="mb-3 text-3xl">{exp.emoji}</div>
                <h2 className="mb-1 font-medium text-white">{exp.title}</h2>
                <p className="text-xs leading-relaxed text-slate-400">
                  {exp.blurb}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

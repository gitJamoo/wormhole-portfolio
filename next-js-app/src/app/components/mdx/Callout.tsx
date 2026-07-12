import React from "react";

type CalloutVariant = "info" | "warn" | "tip";

interface CalloutProps {
  variant?: CalloutVariant;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<CalloutVariant, { border: string; bg: string; icon: string; label: string }> = {
  info: {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    icon: "ℹ",
    label: "Info",
  },
  warn: {
    border: "border-yellow-500",
    bg: "bg-yellow-500/10",
    icon: "⚠",
    label: "Warning",
  },
  tip: {
    border: "border-[var(--post-accent,#6366f1)]",
    bg: "bg-[color-mix(in_srgb,var(--post-accent,#6366f1)_10%,transparent)]",
    icon: "✦",
    label: "Tip",
  },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const styles = VARIANT_STYLES[variant];
  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border-l-4 ${styles.border} ${styles.bg} p-4`}
    >
      <span
        className="mt-0.5 shrink-0 text-lg leading-none"
        aria-hidden="true"
      >
        {styles.icon}
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest opacity-60">
          {styles.label}
        </p>
        <div className="prose-sm [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

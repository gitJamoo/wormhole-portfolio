"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// Keeps a WebGL / three.js failure from blanking the whole panel — shows the
// error message instead of an unrecoverable white screen.
export default class SceneBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("3D scene error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="text-4xl">⚠️</div>
          <p className="text-sm text-slate-300">
            The 3D view hit an error and stopped.
          </p>
          <pre className="max-w-md overflow-auto rounded bg-black/40 p-3 text-left text-[11px] text-red-300">
            {this.state.error.message}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-400"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

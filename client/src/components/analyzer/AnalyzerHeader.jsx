import { CheckCircle2, Zap } from "lucide-react";

function AnalyzerHeader({ mode }) {
  if (mode !== "home") {
    return (
      <section id="buglens-analyzer-header" className="mx-auto max-w-4xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400"><Zap size={14} />Debugging workspace</div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Analyze your error.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">Paste a stack trace, upload a log, or add an error screenshot. BugLens will turn the raw output into a clear explanation and actionable fix.</p>
      </section>
    );
  }

  return (
    <section id="buglens-home-hero" className="mx-auto max-w-4xl text-center">
      <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">Understand your bugs.<span className="block text-gradient">Fix them faster.</span></h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">Paste an error, upload a log, or drop a screenshot. BugLens will explain what went wrong, why it happened, and how to fix it.</p>
    </section>
  );
}

export function WorkspaceHeader({ mode }) {
  if (mode !== "home") {
    return (
      <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div><h2 className="font-semibold">Error input</h2><p className="mt-1 text-sm text-[var(--text-secondary)]">Give BugLens the raw output and we'll handle the explanation.</p></div>
          <div className="hidden items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 sm:flex"><CheckCircle2 size={14} />Ready</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-5 sm:px-6 sm:py-6">
      <div className="glass blue-glow relative w-full max-w-md overflow-hidden rounded-full border border-black/10 bg-white/78 px-6 py-3 text-center shadow-xl shadow-blue-500/10 backdrop-blur-2xl ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/78 dark:ring-white/5">
        <div className="pointer-events-none absolute -left-10 -top-10 h-20 w-20 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-400/15" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl dark:bg-cyan-300/10" />
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25"><Zap size={17} /></div>
          <div className="min-w-0 text-left"><h2 className="text-base font-bold tracking-tight text-[var(--text-primary)] sm:text-lg">Analyze an error</h2><p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-white/60 sm:text-sm">Your AI debugging workspace</p></div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzerHeader;

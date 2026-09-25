import { Bug, Code2, FileSearch, Sparkles, Zap } from "lucide-react";
import Feature from "./Feature";

function AnalyzerBenefits() {
  return (
    <div id="buglens-what-you-get">
      <div className="mb-5 flex justify-center">
        <div className="glass relative overflow-hidden rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-cyan-500/10 px-4 py-2.5 shadow-lg shadow-blue-500/5 backdrop-blur-xl ring-1 ring-white/20 dark:border-white/10 dark:bg-slate-900/45 dark:ring-white/5">
          <div className="pointer-events-none absolute -left-6 -top-6 h-12 w-12 rounded-full bg-blue-400/15 blur-xl dark:bg-blue-300/10" />
          <div className="pointer-events-none absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-cyan-400/15 blur-xl dark:bg-cyan-300/10" />
          <div className="relative flex items-center justify-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 dark:text-blue-400">
              <Zap size={15} />
            </span>
            <h3 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] sm:text-[15px]">
              What you'll get
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div id="buglens-feature-bug-identification">
          <Feature
            icon={<Bug size={17} />}
            title="Bug identification"
            description="Understand exactly what is failing."
          />
        </div>
        <div id="buglens-feature-root-cause">
          <Feature
            icon={<FileSearch size={17} />}
            title="Root cause"
            description="Find the underlying reason behind the error."
          />
        </div>
        <div id="buglens-feature-fix-suggestion">
          <Feature
            icon={<Code2 size={17} />}
            title="Fix suggestion"
            description="Get practical steps and corrected code."
          />
        </div>
        <div id="buglens-feature-ai-explanation">
          <Feature
            icon={<Sparkles size={17} />}
            title="AI explanation"
            description="Turn confusing logs into clear language."
          />
        </div>
      </div>

      <div
        id="buglens-developer-focused"
        className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Developer focused
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          BugLens will analyze errors from JavaScript, TypeScript, Python, Java,
          C++, APIs, databases, and more.
        </p>
      </div>
    </div>
  );
}

export default AnalyzerBenefits;

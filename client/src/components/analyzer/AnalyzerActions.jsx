import { Clipboard, Sparkles, Upload, X } from "lucide-react";

function AnalyzerActions({
  fileInputRef,
  onFileChange,
  onChooseFile,
  onPaste,
  onAnalyze,
  onClear,
  isAnalyzing,
  hasInput,
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.log,.json,.md,.png,.jpg,.jpeg,.webp"
        className="hidden"
        onChange={onFileChange}
      />
      <button
        type="button"
        onClick={onChooseFile}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
      >
        <Upload size={16} />
        Choose file
      </button>
      <button
        type="button"
        onClick={onPaste}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-muted)] active:scale-[0.98]"
      >
        <Clipboard size={16} />
        Paste
      </button>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className={`group relative w-full sm:ml-auto sm:w-auto inline-flex  min-w-[180px] shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98] sm:min-w-[205px] ${isAnalyzing ? "cursor-wait bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-90 shadow-lg shadow-blue-600/25" : hasInput ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/30" : "bg-slate-300 text-slate-600 shadow-none hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"}`}
      >
        <span className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-700 group-hover:left-[115%]" />
        {isAnalyzing ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
              <Sparkles size={16} />
            </span>
            Analyze with BugLens
          </>
        )}
      </button>

      {hasInput && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
        >
          <X size={15} />
          Clear
        </button>
      )}
    </div>
  );
}

export default AnalyzerActions;

function SearchResult({ result, active, index, resultRef, Icon, onMouseEnter, onClick }) {
  return (
    <button
      ref={resultRef}
      data-search-index={index}
      type="button"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 ease-out ${
        active
          ? "z-10 -translate-y-0.5 scale-[1.01] bg-blue-500/10 shadow-[0_10px_30px_-18px_rgba(37,99,235,0.75)]"
          : "hover:z-10 hover:-translate-y-1 hover:scale-[1.015] hover:bg-slate-100/95 hover:shadow-[0_14px_28px_-20px_rgba(15,23,42,0.45)] dark:hover:bg-slate-800/95 dark:hover:shadow-[0_14px_28px_-20px_rgba(0,0,0,0.7)]"
      }`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
          : "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
      }`}>
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{result.title}</p>
          <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{result.type}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{result.description}</p>
      </div>

      {active && (
        <kbd className="hidden shrink-0 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-semibold text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:block">
          Enter
        </kbd>
      )}
    </button>
  );
}

export default SearchResult;

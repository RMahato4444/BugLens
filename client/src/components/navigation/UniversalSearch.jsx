import { Bug, CheckCircle2, FileCode2, FileSearch, History, Home, Lightbulb, Search, Sparkles, Terminal, Upload, User, X } from "lucide-react";

import SearchResult from "./SearchResult";

const icons = {
  Bug, CheckCircle2, FileCode2, FileSearch, History, Home, Lightbulb, Search, Sparkles, Terminal, Upload, User,
};

function UniversalSearch({ search }) {
  const {
    open,
    query,
    setQuery,
    results,
    activeIndex,
    setActiveIndex,
    inputRef,
    resultRefs,
    closeSearch,
    onSelect,
  } = search;

  if (!open) return null;

  const clearSearch = () => {
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  return (
    <div
      className="absolute left-2 right-2 top-[calc(100%+10px)] z-[70] overflow-hidden rounded-[28px] border border-slate-200/90 bg-white/[0.96] shadow-[0_24px_80px_-28px_rgba(15,23,42,0.45)] backdrop-blur-3xl backdrop-saturate-200 dark:border-white/10 dark:bg-slate-950/[0.96] sm:left-auto sm:right-0 sm:w-[500px]"
    >
      <div className="pointer-events-none absolute -left-12 -top-12 h-28 w-28 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-300/8" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl dark:bg-violet-400/8" />

      <div className="relative border-b border-slate-200/80 p-3 dark:border-white/10">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search anything in BugLens..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-24 text-sm text-slate-900 outline-none shadow-inner shadow-slate-900/[0.03] transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            aria-label="Universal search"
            autoComplete="off"
          />

          <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            {query && (
              <button type="button" onClick={clearSearch} className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
            <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-semibold text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">Enter</kbd>
          </div>
        </div>

        <p className="mt-2 px-1 text-[11px] text-slate-500 dark:text-slate-400">
          Search pages, docs, analyzer sections, analysis details, account pages, and previous scans.
        </p>
      </div>

      <div className="relative max-h-[420px] overflow-y-auto p-2">
        {results.length > 0 ? (
          results.map((result, index) => {
            const Icon = icons[result.icon] || FileSearch;
            return (
              <SearchResult
                key={result.id}
                result={result}
                index={index}
                resultRef={(node) => { resultRefs.current[index] = node; }}
                Icon={Icon}
                active={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  onSelect?.(result);
                  closeSearch();
                }}
              />
            );
          })
        ) : (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Search size={19} />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">No results found</p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Try a page name, feature, bug term, language, file type, or previous scan title.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UniversalSearch;

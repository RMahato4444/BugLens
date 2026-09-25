import { CheckCircle2, Clock3, FileSearch, ShieldAlert, Trash2, Search, X, LogIn } from "lucide-react";

import EmptyHistory from "./EmptyHistory";
import HistoryCard from "./HistoryCard";
import HistoryDetails from "./HistoryDetails";
import HistoryStat from "./HistoryStat";
import { useHistory } from "../../hooks/useHistory";
import { useAuth } from "../../context/AuthContext";

function HistoryView({ onOpenScan, onLogin }) {
  const { user } = useAuth();
  const { history, filteredHistory, search, setSearch, severityFilter, setSeverityFilter, selectedScan, setSelectedScan, deletingIds, deleteScan, clearHistory, isLoading, error } = useHistory();

  const openScan = (scan) => onOpenScan({
    errorText: scan.inputText || "",
    selectedFile: null,
    filePreview: null,
    analysis: scan.analysis || null,
    analysisId: scan.id,
  });

  const formatDate = (date) => {
    const value = new Date(date);
    return Number.isNaN(value.getTime()) ? "Unknown date" : value.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  };

  const formatTime = (date) => {
    const value = new Date(date);
    return Number.isNaN(value.getTime()) ? "" : value.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  };

  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <section id="buglens-history-top" className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400"><Clock3 size={14} />Developer history</div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Your bug history</h1><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">Review previous BugLens analyses and return to a problem you were debugging earlier.</p></div>
          {user && history.length > 0 && <button type="button" onClick={clearHistory} className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-xl border border-red-500/15 bg-red-500/5 px-3.5 text-sm font-semibold text-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/10 active:scale-95 sm:self-auto"><Trash2 size={15} />Clear history</button>}
        </div>

        {!user ? (
          <div className="glass mb-5 rounded-3xl px-6 py-10 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><LogIn size={20} /></div><h3 className="mt-4 text-lg font-bold">Sign in to use history</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">Analyses are saved to your BugLens account so you can search and reopen them later.</p><button type="button" onClick={onLogin} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Log in</button></div>
        ) : (
          <>
            <div className="mb-5 flex justify-center"><div className="glass flex w-full max-w-3xl flex-col gap-2 rounded-2xl p-2 sm:flex-row"><div className="relative min-w-0 flex-1"><Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" /><input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bugs, languages, frameworks..." className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />{search && <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"><X size={15} /></button>}</div><select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value)} className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-blue-500 sm:w-[105px] sm:shrink-0"><option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div></div>

            <div className="mb-5 grid gap-3 sm:grid-cols-3"><HistoryStat icon={<FileSearch size={17} />} label="Total scans" value={history.length} /><HistoryStat icon={<ShieldAlert size={17} />} label="High / Critical" value={history.filter((item) => item.severity === "High" || item.severity === "Critical").length} /><HistoryStat icon={<CheckCircle2 size={17} />} label="Results found" value={filteredHistory.length} /></div>

            {error && <div className="mb-5 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>}
            {isLoading ? <div className="glass rounded-3xl px-6 py-14 text-center text-sm text-[var(--text-secondary)]">Loading your history...</div> : filteredHistory.length === 0 ? <EmptyHistory hasFilters={search.length > 0 || severityFilter !== "All"} /> : <div className="flex flex-col">
              {filteredHistory.map((scan, index) => {
                const isDeleting = deletingIds.has(scan.id);
                return <div key={scan.id} className="grid overflow-hidden" style={{ gridTemplateRows: isDeleting ? "0fr" : "1fr", marginBottom: isDeleting || index === filteredHistory.length - 1 ? "0px" : "10px", transition: "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1), margin-bottom 420ms cubic-bezier(0.22, 1, 0.36, 1)" }}><div className="min-h-0 overflow-hidden"><HistoryCard scan={scan} isDeleting={isDeleting} onOpen={() => openScan(scan)} onDelete={() => deleteScan(scan.id)} onDetails={() => setSelectedScan(scan)} formatDate={formatDate} formatTime={formatTime} /></div></div>;
              })}
            </div>}
          </>
        )}
      </section>

      {selectedScan && <HistoryDetails scan={selectedScan} onClose={() => setSelectedScan(null)} onOpen={() => { openScan(selectedScan); setSelectedScan(null); }} />}
    </main>
  );
}

export default HistoryView;

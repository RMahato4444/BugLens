import { Bug, CalendarDays, ChevronRight, Database, Trash2 } from "lucide-react";
import SeverityBadge from "./SeverityBadge";

function HistoryCard({ scan, isDeleting, onOpen, onDelete, onDetails, formatDate, formatTime }) {
  const isDatabase = scan.bugType?.toLowerCase().includes("database");
  const iconClass = scan.severity === "Critical" ? "bg-red-500/10 text-red-500" : scan.severity === "High" ? "bg-orange-500/10 text-orange-500" : scan.severity === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-600 dark:text-blue-400";

  return (
    <article id={`buglens-history-item-${scan.id}`} className={`glass group rounded-2xl p-3 transition-all duration-[420ms] ease-out sm:p-3.5 ${isDeleting ? "pointer-events-none translate-x-4 scale-[0.98] opacity-0" : "translate-x-0 scale-100 opacity-100 hover:-translate-y-0.5 hover:shadow-xl"}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>{isDatabase ? <Database size={18} /> : <Bug size={18} />}</div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold sm:text-[15px]">{scan.title}</h2>
          <div className="mt-1"><SeverityBadge severity={scan.severity} /></div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-[var(--text-secondary)] sm:text-xs"><span>{scan.language}</span><span className="text-[var(--text-muted)]">•</span><span>{scan.framework}</span><span className="text-[var(--text-muted)]">•</span><span>{scan.bugType}</span></div>
          <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[var(--text-muted)] sm:text-xs"><CalendarDays size={11} /><span>{formatDate(scan.createdAt)}</span><span>at</span><span>{formatTime(scan.createdAt)}</span></div>
        </div>
        <div className="hidden shrink-0 text-right sm:block"><p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">Confidence</p><p className="mt-0.5 text-sm font-semibold">{scan.confidence}%</p></div>
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="mr-1 flex flex-col items-end sm:hidden"><span className="text-[7px] uppercase tracking-wider text-[var(--text-muted)]">Confidence</span><span className="text-[11px] font-semibold">{scan.confidence}%</span></div>
          <button type="button" onClick={onDetails} className="hidden h-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 text-[11px] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 sm:inline-flex">Details</button>
          <button type="button" onClick={onOpen} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95" title="Open scan" aria-label="Open scan"><ChevronRight size={15} /></button>
          <button type="button" onClick={onDelete} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/10 text-[var(--text-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/10 hover:text-red-500 active:scale-95" title="Delete scan" aria-label="Delete scan"><Trash2 size={14} /></button>
        </div>
      </div>
      <button type="button" onClick={onDetails} className="mt-2 flex w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-1.5 text-[10px] font-semibold text-[var(--text-secondary)] transition hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400 sm:hidden">View details</button>
    </article>
  );
}

export default HistoryCard;

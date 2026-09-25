import { CalendarDays, X } from "lucide-react";
import DetailItem from "./DetailItem";

function HistoryDetails({ scan, onClose, onOpen }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Analysis details">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">Saved analysis</p><h2 className="mt-1 text-lg font-bold">{scan.title}</h2></div><button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-red-500/10 hover:text-red-500" aria-label="Close details"><X size={17} /></button></div>
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]"><CalendarDays size={13} />{new Date(scan.createdAt).toLocaleString()}</div>
          <div className="grid gap-3 sm:grid-cols-2"><DetailItem label="Severity" value={scan.severity} /><DetailItem label="Bug type" value={scan.bugType} /><DetailItem label="Language" value={scan.language} /><DetailItem label="Framework" value={scan.framework} /><DetailItem label="Confidence" value={`${scan.confidence}%`} /></div>
          <div><p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Original input</p><pre className="mt-2 max-h-48 overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 whitespace-pre-wrap font-mono text-xs leading-5 text-[var(--text-secondary)]">{scan.inputText || "No text input."}</pre></div>
          <button type="button" onClick={onOpen} className="flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Open analysis</button>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetails;

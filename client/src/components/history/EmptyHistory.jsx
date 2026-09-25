import { Search } from "lucide-react";
function EmptyHistory({ hasFilters }) {
  return <div className="glass rounded-3xl px-6 py-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><Search size={20} /></div><h3 className="mt-4 text-lg font-bold">{hasFilters ? "No matching analyses" : "No bug history yet"}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">{hasFilters ? "Try a different keyword or severity filter." : "Run an analysis and your recent scans will appear here."}</p></div>;
}
export default EmptyHistory;

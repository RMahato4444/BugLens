function OverviewCard({ icon, label, value, danger = false, success = false }) {
  return (
    <div className="group flex min-h-[118px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/20 hover:shadow-md">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${danger ? "border-red-500/10 bg-red-500/10 text-red-500" : success ? "border-emerald-500/10 bg-emerald-500/10 text-emerald-500" : "border-blue-500/10 bg-blue-500/10 text-blue-600 dark:text-blue-400"}`}>{icon}</div>
      <div className="mt-auto pt-4"><p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</p><p className={`mt-1.5 truncate text-sm font-bold ${danger ? "text-red-600 dark:text-red-400" : success ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--text-primary)]"}`} title={value}>{value}</p></div>
    </div>
  );
}

export default OverviewCard;

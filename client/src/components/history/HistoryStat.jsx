function HistoryStat({ icon, label, value }) {
  return <div className="glass flex items-center gap-3 rounded-2xl p-3.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">{icon}</div><div><p className="text-[11px] text-[var(--text-muted)]">{label}</p><p className="mt-0.5 text-sm font-semibold">{value}</p></div></div>;
}
export default HistoryStat;

function DetailItem({ label, value }) {
  return <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3"><p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{label}</p><p className="mt-1 break-words text-sm font-medium">{value || "—"}</p></div>;
}
export default DetailItem;

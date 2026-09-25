function TextField({ icon: Icon, label, id, value, onChange, type = "text", placeholder }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label><div className="relative"><Icon size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" /><input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></div></div>;
}
export default TextField;

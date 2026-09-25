function DocsMobileNav({ sections, value, onChange }) {
  return (
    <div className="glass mb-4 rounded-2xl p-2 lg:hidden">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
        {sections.map((section) => <option key={section.id} value={section.id}>{section.navLabel}</option>)}
      </select>
    </div>
  );
}

export default DocsMobileNav;

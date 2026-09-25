function DocsSidebar({ sections, activeId, onSelect }) {
  return (
    <aside className="sticky top-28 hidden h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-2 shadow-sm lg:block">
      <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">Documentation</p>
      <nav className="space-y-1">
        {sections.map((section) => <button key={section.id} type="button" onClick={() => onSelect(section.id)} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${activeId === section.id ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-[var(--text-secondary)] hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"}`}>{section.navLabel}</button>)}
      </nav>
    </aside>
  );
}

export default DocsSidebar;

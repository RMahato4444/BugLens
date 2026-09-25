function DocsSection({ section, index }) {
  return (
    <section id={`buglens-docs-${section.id}`} className="scroll-mt-28 rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-600 dark:text-blue-400">{String(index + 1).padStart(2, "0")}</span>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">BugLens Docs</p><h2 className="mt-1 text-2xl font-black tracking-tight">{section.title}</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{section.description}</p></div>
      </div>
      <div className="space-y-4 text-sm leading-7 text-[var(--text-secondary)]">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
  );
}

export default DocsSection;

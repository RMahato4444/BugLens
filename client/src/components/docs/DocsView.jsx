import { useEffect, useState } from "react";
import { BookOpen, ChevronUp } from "lucide-react";

import { docsSections } from "./docsData";
import DocsMobileNav from "./DocsMobileNav";
import DocsSection from "./DocsSection";
import DocsSidebar from "./DocsSidebar";

function DocsView() {
  const [activeId, setActiveId] = useState(docsSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id.replace("buglens-docs-", ""));
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: 0 },
    );

    docsSections.forEach((section) => {
      const element = document.getElementById(`buglens-docs-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(`buglens-docs-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <main className="py-10 sm:py-14 lg:py-16">
      <section className="mx-auto max-w-7xl">
        <div id="buglens-docs-introduction" className="mb-8 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-6 sm:p-8">
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><BookOpen size={20} /></div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">BugLens Docs</p><h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Understand the workspace.</h1><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">Learn how the analyzer, analysis view, history, universal search, themes, and current client architecture fit together.</p></div></div>
        </div>

        <DocsMobileNav sections={docsSections} value={activeId} onChange={goTo} />

        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <DocsSidebar sections={docsSections} activeId={activeId} onSelect={goTo} />
          <div className="space-y-5">
            {docsSections.slice(1).map((section, index) => <DocsSection key={section.id} section={section} index={index + 1} />)}
          </div>
        </div>

        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] text-[var(--text-secondary)] shadow-xl transition hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400" aria-label="Back to top"><ChevronUp size={18} /></button>
      </section>
    </main>
  );
}

export default DocsView;

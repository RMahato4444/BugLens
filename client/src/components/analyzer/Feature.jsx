function Feature({ icon, title, description }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">{icon}</div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
}

export default Feature;

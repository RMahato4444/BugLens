function SeverityBadge({ severity }) {
  const styles = { Critical: "bg-red-500/10 text-red-500", High: "bg-orange-500/10 text-orange-500", Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400", Low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${styles[severity] || styles.Medium}`}>{severity}</span>;
}
export default SeverityBadge;

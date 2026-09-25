import { Eye, EyeOff, LockKeyhole } from "lucide-react";

function PasswordField({ label, id, value, onChange, visible, onToggle, placeholder }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label><div className="relative"><LockKeyhole size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" /><input id={id} type={visible ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] pl-11 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /><button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]" aria-label={visible ? "Hide password" : "Show password"}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>;
}
export default PasswordField;

import { ArrowLeft, Bug } from "lucide-react";
import ThemeMenu from "../theme/ThemeMenu";

function AuthLayout({ title, subtitle, children, bottomText, bottomAction, onBack }) {
  return (
    <div className="app-shell min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="sticky top-4 z-50 flex justify-center">
          <div className="navbar-glass flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 sm:px-4">
            <button type="button" onClick={onBack} className="flex items-center gap-2 rounded-full px-2 py-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Bug size={18} /></div><span className="text-sm font-bold">BugLens</span></button>
            <div className="flex items-center gap-2"><button type="button" onClick={onBack} className="auth-back-button hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[var(--nav-text)] transition hover:bg-white/10 hover:text-[var(--nav-text-hover)] sm:flex"><ArrowLeft size={16} />Back to home</button><ThemeMenu /></div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-110px)] items-center justify-center py-12 sm:py-16">
          <div className="w-full max-w-md"><div className="glass overflow-hidden rounded-[28px]">
            <div className="border-b border-[var(--border)] px-6 py-7 text-center sm:px-8"><div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><Bug size={23} /></div><h1 className="text-2xl font-black tracking-tight">{title}</h1><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{subtitle}</p></div>
            <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
            <div className="border-t border-[var(--border)] bg-[var(--surface-muted)]/50 px-6 py-5 text-center"><p className="text-sm text-[var(--text-secondary)]">{bottomText}{" "}<button type="button" onClick={bottomAction.onClick} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">{bottomAction.label}</button></p></div>
          </div></div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;

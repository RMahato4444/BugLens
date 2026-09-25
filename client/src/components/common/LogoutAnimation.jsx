import { LogOut } from "lucide-react";

function LogoutAnimation() {
  return (
    <div
      className="pointer-events-none fixed right-4 top-20 z-[120] flex justify-end sm:right-8 sm:top-24"
      role="status"
      aria-live="polite"
      aria-label="Logged out successfully"
    >
      <div className="logout-animation-card">
        <div className="logout-animation-glow" />

        <div className="logout-animation-icon">
          <LogOut size={18} strokeWidth={2.3} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Logged out successfully
          </p>

          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            See you again soon.
          </p>
        </div>

        <div className="logout-animation-progress" />
      </div>
    </div>
  );
}

export default LogoutAnimation;
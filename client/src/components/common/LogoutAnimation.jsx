import { LogOut } from "lucide-react";

function LogoutAnimation() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[120] flex items-start justify-center px-4 pt-24 sm:pt-28"
      role="status"
      aria-live="polite"
      aria-label="Logged out successfully"
    >
      <div className="logout-animation-card">
        <div className="logout-animation-icon">
          <LogOut size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Logged out successfully
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
            See you again soon.
          </p>
        </div>

        <div className="logout-animation-progress" />
      </div>
    </div>
  );
}

export default LogoutAnimation;

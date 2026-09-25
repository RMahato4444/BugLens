import { LogOut, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="hidden items-center gap-1.5 sm:flex">
      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)]">
        <UserRound size={14} className="text-blue-600 dark:text-blue-400" />
        <span className="max-w-[130px] truncate">{user.name}</span>
      </div>

      <button
        type="button"
        onClick={logout}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/15 bg-red-500/5 text-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/10 active:scale-95"
        title="Log out"
        aria-label="Log out"
      >
        <LogOut size={17} />
      </button>
    </div>
  );
}

export default UserMenu;

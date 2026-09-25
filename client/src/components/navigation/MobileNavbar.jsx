import { FileSearch, History, Home, LogOut, UserRound, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function MobileNavbar({ currentView, onNavigate, onLogin, onSignup, onClose }) {
  const navigate = (destination) => {
    onNavigate(destination);
    onClose();
  };

  return (
    <div className="mobile-navbar-menu">
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="text-sm font-semibold text-[var(--text-primary)]">Menu</span>
        <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all duration-200 hover:scale-105 hover:bg-red-500/10 hover:text-red-500 active:scale-95" aria-label="Close menu">
          <X size={17} />
        </button>
      </div>

      <div className="space-y-1">
        <MobileNavItem icon={<Home size={17} />} label="Home" active={currentView === "home"} onClick={() => navigate("home")} />
        <MobileNavItem icon={<History size={17} />} label="History" active={currentView === "history"} onClick={() => navigate("history")} />
        <MobileNavItem icon={<FileSearch size={17} />} label="Docs" active={currentView === "docs"} onClick={() => navigate("docs")} />
      </div>

      <div className="my-3 h-px bg-[var(--border)]" />

      <MobileAccountActions
        onLogin={onLogin}
        onSignup={onSignup}
        onClose={onClose}
      />
    </div>
  );
}


function MobileAccountActions({ onLogin, onSignup, onClose }) {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="space-y-2 px-1">
        <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-muted)] px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <UserRound size={16} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-[11px] text-[var(--text-secondary)]">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            onClose();
          }}
          className="group flex w-full items-center gap-3 rounded-2xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/10 active:scale-95"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition group-hover:scale-110">
            <LogOut size={16} />
          </span>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 px-1">
      <button
        type="button"
        onClick={() => {
          onLogin();
          onClose();
        }}
        className="mobile-login-button transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
      >
        Log in
      </button>

      <button
        type="button"
        onClick={() => {
          onSignup();
          onClose();
        }}
        className="mobile-signup-button transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/20 active:scale-95"
      >
        Sign up
      </button>
    </div>
  );
}

function MobileNavItem({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-out ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "text-[var(--text-primary)] hover:-translate-y-0.5 hover:scale-[1.015] hover:bg-blue-500/10 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 dark:hover:text-blue-400"
      }`}
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
        active
          ? "bg-white/15 text-white"
          : "bg-[var(--surface-muted)] text-[var(--text-secondary)] group-hover:rotate-3 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400"
      }`}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {!active && <span className="text-[var(--text-muted)] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">→</span>}
    </button>
  );
}

export default MobileNavbar;

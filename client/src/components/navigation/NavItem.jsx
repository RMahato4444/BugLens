function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-[var(--nav-active)] text-[var(--nav-active-text)] shadow-sm"
          : "text-[var(--nav-text)] hover:bg-white/10 hover:text-[var(--nav-text-hover)]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default NavItem;

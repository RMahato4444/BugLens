import { CheckCircle2, ChevronDown, Laptop, Moon, Sun } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const themes = {
  light: { label: "Light", icon: Sun },
  dark: { label: "Dark", icon: Moon },
  system: { label: "System", icon: Laptop },
};

function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const CurrentIcon = themes[theme].icon;

  useEffect(() => {
    const handleOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="theme-trigger"
        aria-label="Change theme"
        aria-expanded={open}
      >
        <CurrentIcon size={17} />
        <span className="hidden sm:inline">{themes[theme].label}</span>
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="theme-dropdown">
          {Object.entries(themes).map(([key, item]) => (
            <ThemeOption
              key={key}
              icon={<item.icon size={16} />}
              label={item.label}
              active={theme === key}
              onClick={() => {
                setTheme(key);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeOption({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
          : "text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
      }`}
    >
      <span className="flex items-center gap-3">{icon}{label}</span>
      {active && <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" />}
    </button>
  );
}

export default ThemeMenu;

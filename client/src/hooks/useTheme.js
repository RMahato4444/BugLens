import { useEffect, useState } from "react";

const THEME_KEY = "buglens-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem(THEME_KEY) || "system",
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const apply = (dark) => root.classList.toggle("dark", dark);

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      apply(media.matches);
      const listener = (event) => apply(event.matches);
      media.addEventListener("change", listener);
      localStorage.setItem(THEME_KEY, theme);
      return () => media.removeEventListener("change", listener);
    }

    apply(theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}

import { useState } from "react";
import { headerThemes } from "./analysisCardThemes";

function AnalysisCard({
  icon,
  title,
  description,
  action,
  children,
  compact = false,
  id,
}) {
  const [theme] = useState(
    () => headerThemes[Math.floor(Math.random() * headerThemes.length)],
  );

  return (
    <section
      id={id}
      className="glass
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border)]
                shadow-sm"
    >
      <div
        className={`relative flex items-center justify-between gap-3 overflow-hidden border-b border-white/10 bg-gradient-to-r ${theme.gradient} text-white ${compact ? "min-h-[54px] rounded-t-xl px-3.5 py-2.5 sm:min-h-[56px] sm:px-4" : "min-h-[78px] rounded-t-2xl px-5 py-4 sm:px-6"}`}
      >
        <div
          className={`pointer-events-none absolute -left-8 -top-8 h-20 w-20 rounded-full blur-2xl ${theme.glowOne}`}
        />
        <div
          className={`pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 rounded-full blur-2xl ${theme.glowTwo}`}
        />
        <div className="relative flex min-w-0 items-center gap-3">
          <div
            className={`flex shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/15 text-white backdrop-blur-sm ${compact ? "h-8 w-8" : "h-10 w-10 rounded-xl"}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h2
              className={`truncate font-extrabold tracking-tight text-white ${compact ? "text-sm sm:text-[15px]" : "text-lg sm:text-xl"}`}
            >
              {title}
            </h2>
            {description && (
              <p
                className={`truncate text-white/80 ${compact ? "mt-0.5 text-[11px] font-medium sm:text-xs" : "mt-1 text-xs font-medium sm:text-sm"}`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <div className="relative shrink-0">{action}</div>}
      </div>
      <div className={compact ? "p-3 sm:p-3.5" : "p-5 sm:p-6"}>{children}</div>
    </section>
  );
}

export default AnalysisCard;

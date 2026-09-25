import { AlertTriangle, Bug, Check, CheckCircle2, Lightbulb } from "lucide-react";
import { AnalysisCard } from "./ui";

function AnalysisMain({ analysis }) {
  return (
    <div className="space-y-6">
      <AnalysisCard id="buglens-analysis-bug" icon={<Bug size={19} />} title="What is the bug?" description="The problem BugLens identified">
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 sm:p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500"><AlertTriangle size={19} /></div>
            <div className="min-w-0"><h3 className="font-semibold text-red-600 dark:text-red-400">{analysis.bugType}</h3><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{analysis.rootCause}</p></div>
          </div>
        </div>
      </AnalysisCard>

      <AnalysisCard id="buglens-analysis-why" icon={<Lightbulb size={19} />} title="Why did it happen?" description="The sequence that caused the error">
        <div className="space-y-3">
          {analysis.whyItHappened.map((item, index) => <div key={`${item}-${index}`} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400">{index + 1}</div><p className="text-sm leading-6 text-[var(--text-secondary)]">{item}</p></div>)}
        </div>
      </AnalysisCard>

      <AnalysisCard id="buglens-analysis-fix" icon={<CheckCircle2 size={19} />} title="How to fix it" description="Recommended steps">
        <div className="space-y-3">
          {analysis.fixSteps.map((step, index) => <div key={`${step}-${index}`} className="flex gap-3"><div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"><Check size={14} /></div><div className="min-w-0"><p className="text-sm font-medium">Step {index + 1}</p><p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{step}</p></div></div>)}
        </div>
      </AnalysisCard>
    </div>
  );
}

export default AnalysisMain;

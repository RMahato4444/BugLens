import { Code2 } from "lucide-react";
import { AnalysisCard, CodeBlock } from "./ui";

function CodeFixes({ analysis, copiedSection, onCopy }) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <AnalysisCard id="buglens-analysis-code-fix" icon={<Code2 size={19} />} title="Suggested code fix" description="A safer implementation">
        <CodeBlock code={analysis.codeFix} copied={copiedSection === "code"} onCopy={() => onCopy(analysis.codeFix, "code")} />
      </AnalysisCard>

      <AnalysisCard id="buglens-analysis-alternative-fix" icon={<Code2 size={19} />} title="Alternative quick fix" description="Useful when the value is optional">
        <CodeBlock code={analysis.alternativeFix} copied={copiedSection === "alternative"} onCopy={() => onCopy(analysis.alternativeFix, "alternative")} />
        <div className="mt-3 rounded-xl border border-amber-500/10 bg-amber-500/5 p-3.5 text-xs leading-5 text-[var(--text-secondary)]">Optional chaining can prevent the error, but it may hide an unexpected missing-data problem. Prefer fixing the underlying state when possible.</div>
      </AnalysisCard>
    </div>
  );
}

export default CodeFixes;

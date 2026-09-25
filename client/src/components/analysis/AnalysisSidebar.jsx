import { FileCode2, FileSearch, Search, Terminal, Zap } from "lucide-react";
import { AnalysisCard, Tag } from "./ui";

function AnalysisSidebar({ analysis, inputText, selectedFile, filePreview, onCopyCommand }) {
  return (
    <aside className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-2">
      <AnalysisCard id="buglens-analysis-location" compact icon={<FileCode2 size={17} />} title="Likely location">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3"><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">File</p><p className="mt-1.5 break-words font-mono text-xs font-semibold leading-5 text-[var(--text-primary)]">{analysis.likelyLocation}</p></div>
      </AnalysisCard>

      <AnalysisCard id="buglens-analysis-stack" compact icon={<Zap size={17} />} title="Detected stack"><div className="flex flex-wrap gap-1.5"><Tag>{analysis.language}</Tag><Tag>{analysis.framework}</Tag><Tag>Runtime</Tag></div></AnalysisCard>

      <AnalysisCard id="buglens-analysis-commands" compact icon={<Terminal size={17} />} title="Useful commands">
        <div className="space-y-1.5">{analysis.commands.map((command) => <button key={command} type="button" onClick={() => onCopyCommand(command)} className="flex w-full items-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-left transition hover:border-emerald-500/20 hover:bg-emerald-500/5"><span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-[var(--text-secondary)]">{command}</span></button>)}</div>
      </AnalysisCard>

      <AnalysisCard id="buglens-analysis-concepts" compact icon={<Search size={17} />} title="Related concepts"><div className="flex flex-wrap gap-1.5">{analysis.concepts.map((concept) => <Tag key={concept}>{concept}</Tag>)}</div></AnalysisCard>

      <AnalysisCard id="buglens-analysis-input" compact icon={<FileSearch size={17} />} title="Analyzed input">
        {selectedFile ? <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3"><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Uploaded file</p><p className="mt-1.5 break-all text-xs font-semibold leading-5">{selectedFile.name}</p>{filePreview && <img src={filePreview} alt="Analyzed screenshot" className="mt-2 max-h-32 w-full rounded-lg object-contain" />}</div> : <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3"><p className="max-h-24 overflow-auto whitespace-pre-wrap font-mono text-xs leading-5 text-[var(--text-secondary)]">{inputText || "No text input."}</p></div>}
      </AnalysisCard>
    </aside>
  );
}

export default AnalysisSidebar;

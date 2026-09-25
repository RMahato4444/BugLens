import { FileText, FileType2, X } from "lucide-react";
import { formatFileSize, isImageFile } from "../../utils/fileUtils";

function FilePreview({ file, preview, text, onRemove }) {
  if (!file) return null;

  const image = isImageFile(file);

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">{image ? <FileType2 size={18} /> : <FileText size={18} />}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">{file.name}</p><p className="mt-0.5 text-xs text-[var(--text-secondary)]">{formatFileSize(file.size)}{!image && text && <><span className="mx-1.5">•</span>Text preview</>}</p></div>
        </div>
        <button type="button" onClick={onRemove} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-red-500/10 hover:text-red-500" aria-label="Remove selected file"><X size={16} /></button>
      </div>

      <div className="p-3">
        {image && preview ? (
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-black/5 dark:bg-black/20"><img src={preview} alt="Uploaded error screenshot" className="max-h-72 w-full object-contain" /></div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-black/[0.03] dark:bg-black/20">
            <div className="border-b border-[var(--border)] bg-white/30 px-3 py-2 dark:bg-white/[0.03]"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">File preview</p></div>
            <pre className="max-h-56 overflow-auto p-4 font-mono text-xs leading-5 text-[var(--text-secondary)]"><code>{text || "No readable text content."}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilePreview;

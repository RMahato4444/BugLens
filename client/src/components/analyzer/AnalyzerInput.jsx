import { Upload } from "lucide-react";

import FilePreview from "./FilePreview";

function AnalyzerInput({ errorText, setErrorText, selectedFile, filePreview, isDragging, fileInputRef, onFileInput, onDragOver, onDragLeave, onDrop, onRemoveFile }) {
  return (
    <div id="buglens-supported-files">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <label htmlFor="bug-input" className="text-sm font-semibold">Supported file types</label>
          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">TXT · LOG · JSON · MD · PNG · JPG · JPEG · WEBP<span className="mx-1.5">•</span>Maximum 5 MB</p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">{errorText.length.toLocaleString()} characters</span>
      </div>

      <div className={`relative overflow-hidden rounded-2xl border transition-all ${isDragging ? "border-blue-500 bg-blue-500/5 ring-4 ring-blue-500/10" : "border-[var(--border)]"}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        <textarea
          id="bug-input"
          value={errorText}
          onChange={(event) => setErrorText(event.target.value)}
          placeholder={`Paste an error, stack trace, or log here...\n\nExample:\n\nTypeError: Cannot read properties of undefined\n    at App.jsx:24:18\n    at renderWithHooks (...)\n\nTip: You can also drag & drop a file into this box.`}
          className="block min-h-[320px] w-full resize-y border-0 bg-[var(--surface-muted)] px-4 py-4 font-mono text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
        />

        {isDragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-blue-600/5 backdrop-blur-[2px]">
            <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20"><Upload size={24} /></div><p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Drop your file here</p></div>
          </div>
        )}
      </div>

      <FilePreview file={selectedFile} preview={filePreview} text={errorText} onRemove={onRemoveFile} />
    </div>
  );
}

export default AnalyzerInput;

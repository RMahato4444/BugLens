import CopyButton from "./CopyButton";

function CodeBlock({ code, copied = false, onCopy }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0b1220] shadow-inner">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2.5"><div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-green-400/80" /></div><span className="text-[11px] font-medium text-slate-400">Suggested fix</span></div>
        <CopyButton copied={copied} onClick={onCopy} />
      </div>
      <pre className="max-h-[420px] overflow-auto bg-[#080f1c] p-4 text-xs leading-6 text-slate-200 sm:p-5 sm:text-sm"><code>{code}</code></pre>
    </div>
  );
}

export default CodeBlock;

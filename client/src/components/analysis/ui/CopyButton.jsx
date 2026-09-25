import { Check, Copy } from "lucide-react";

function CopyButton({ copied, onClick }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 text-[11px] font-semibold text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.12] hover:text-white active:scale-95">
      {copied ? <><Check size={13} />Copied</> : <><Copy size={13} />Copy</>}
    </button>
  );
}

export default CopyButton;

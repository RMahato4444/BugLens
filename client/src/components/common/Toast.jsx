import { CheckCircle2, X } from "lucide-react";

function Toast({ message }) {
  if (!message) return null;

  const isError = message.type === "error";

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2">
      <div
        className={`flex max-w-[calc(100vw-32px)] items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-xl ${
          isError
            ? "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {isError ? <X size={17} /> : <CheckCircle2 size={17} />}
        <span>{message.text}</span>
      </div>
    </div>
  );
}

export default Toast;

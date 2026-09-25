import { useEffect, useRef, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showMessage = (type, text, duration = 3500) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setMessage({ type, text });
    timeoutRef.current = window.setTimeout(() => setMessage(null), duration);
  };

  useEffect(() => () => timeoutRef.current && window.clearTimeout(timeoutRef.current), []);

  return { message, showMessage, clearMessage: () => setMessage(null) };
}

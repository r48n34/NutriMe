import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { ToastContext } from "./ToastContext";
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);
  return (
    <ToastContext.Provider value={setMessage}>
      {children}
      <div className={`toast ${message ? "visible" : ""}`} role="status" aria-live="polite">
        {message && (
          <>
            <CheckCircle2 size={19} />
            {message}
          </>
        )}
      </div>
    </ToastContext.Provider>
  );
}

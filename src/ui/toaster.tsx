import { useEffect, useState } from "react";

type Toast = { id: string; message: string };

let toasts: Toast[] = [];
const listenerIds = new Map<symbol, (t: Toast[]) => void>();

function notifyListeners(): void {
  const snapshot = [...toasts];
  listenerIds.forEach((fn) => fn(snapshot));
}

export function getToasts(): Toast[] {
  return toasts;
}

export function addToast(message: string): void {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, message }];
  notifyListeners();
}

export function removeToast(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notifyListeners();
}

export function Toaster() {
  const [state, setState] = useState<Toast[]>(() => [...toasts]);

  useEffect(() => {
    const id = Symbol("toaster");
    listenerIds.set(id, setState);
    setState([...toasts]);
    return () => {
      listenerIds.delete(id);
    };
  }, []);

  return (
    <div
      data-slot="toaster"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
    >
      {state.map((t) => (
        <div
          key={t.id}
          role="status"
          className="rounded-md border border-neutral-200 bg-white px-4 py-2 shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
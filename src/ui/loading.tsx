export function Loading({ className }: { className?: string }) {
  return (
    <div
      data-slot="loading"
      className={className ?? ""}
      role="status"
      aria-label="Loading"
    >
      <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
    </div>
  );
}

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-4">
      <span className="sr-only">Loading meetings…</span>
      <div className="h-8 w-1/3 rounded bg-rule" />
      <div className="h-10 w-full rounded bg-rule" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-lg bg-rule" />
        <div className="h-32 rounded-lg bg-rule" />
        <div className="h-32 rounded-lg bg-rule" />
        <div className="h-32 rounded-lg bg-rule" />
      </div>
    </div>
  );
}

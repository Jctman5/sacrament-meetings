'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90 print:hidden"
    >
      Print program
    </button>
  );
}

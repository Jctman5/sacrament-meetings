import { WARD_NAME } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-surface print:hidden">
      <p className="mx-auto max-w-5xl px-4 py-4 text-sm text-muted">
        {WARD_NAME} sacrament meeting planner. Programs are for planning and may change.
      </p>
    </footer>
  );
}

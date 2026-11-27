'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = Math.min(Math.max(Number.isFinite(raw) ? raw : 1, 1), Math.max(totalPages, 1));

  // Keeps any active search query; only the page number changes.
  const pageHref = (page: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const base = 'rounded border px-3 py-2 text-sm font-semibold';
  const enabled = `${base} border-accent text-accent hover:bg-accent-soft`;
  const disabled = `${base} border-rule text-muted`;

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} rel="prev" className={enabled}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          Previous
        </span>
      )}

      <ul className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link
              href={pageHref(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
              className={`block rounded px-3 py-2 text-sm font-semibold ${
                p === currentPage ? 'bg-accent text-white' : 'text-accent hover:bg-accent-soft'
              }`}
            >
              {p}
            </Link>
          </li>
        ))}
      </ul>

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} rel="next" className={enabled}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          Next
        </span>
      )}
    </nav>
  );
}

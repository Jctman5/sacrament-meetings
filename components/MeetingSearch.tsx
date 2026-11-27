'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page'); // a new search always starts on page 1
    const trimmed = term.trim();
    if (trimmed) {
      params.set('query', trimmed);
    } else {
      params.delete('query');
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }, 300);

  return (
    <div role="search">
      <input
        type="search"
        name="query"
        aria-label="Search meetings by speaker, presiding, conducting, or meeting type"
        placeholder="Search speakers, leaders, or meeting type"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded border border-rule bg-surface px-4 py-2"
      />
    </div>
  );
}

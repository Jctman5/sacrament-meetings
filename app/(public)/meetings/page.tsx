import { Suspense } from 'react';
import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { PAGE_SIZE, getMeetingsPage } from '@/lib/meetings-db';

export const metadata: Metadata = { title: 'All meetings' };

type SearchParams = Promise<{ query?: string | string[]; page?: string | string[] }>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function MeetingResults({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const query = (first(sp.query) ?? '').trim();
  const requestedPage = Number.parseInt(first(sp.page) ?? '1', 10);

  const { meetings, total, page, totalPages } = await getMeetingsPage({
    query,
    page: Number.isFinite(requestedPage) ? requestedPage : 1,
  });

  if (meetings.length === 0) {
    return (
      <p role="status" className="mt-6 text-muted">
        {query ? `No meetings match “${query}”.` : 'No meetings have been planned yet.'}
      </p>
    );
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end = start + meetings.length - 1;

  return (
    <>
      <p role="status" className="mt-4 text-sm text-muted">
        Showing {start}–{end} of {total} {total === 1 ? 'meeting' : 'meetings'}
        {query ? ` matching “${query}”` : ''}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {meetings.map((m) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function MeetingsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">All meetings</h1>
      <div className="mt-4">
        <Suspense fallback={<div className="h-10 rounded bg-rule" />}>
          <MeetingSearch />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <p role="status" className="mt-6 text-muted">
            Loading meetings…
          </p>
        }
      >
        <MeetingResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

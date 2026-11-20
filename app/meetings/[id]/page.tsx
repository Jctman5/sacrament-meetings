import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { fetchMeeting } from '@/lib/api';

async function MeetingContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);
  if (!meeting) notFound();

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/meetings" className="font-semibold text-accent underline">
          Back to all meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </>
  );
}

export default function MeetingPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div role="status" className="animate-pulse space-y-4">
          <span className="sr-only">Loading meeting…</span>
          <div className="h-8 w-1/2 rounded bg-rule" />
          <div className="h-64 rounded-lg bg-rule" />
        </div>
      }
    >
      <MeetingContent params={params} />
    </Suspense>
  );
}

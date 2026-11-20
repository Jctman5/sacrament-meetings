import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import { fetchMeetings } from '@/lib/api';

export const metadata: Metadata = { title: 'All meetings' };

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">All meetings</h1>
      {meetings.length === 0 ? (
        <p className="mt-4 text-muted">No meetings have been planned yet.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {meetings.map((m) => (
            <MeetingCard key={m.id} meeting={m} />
          ))}
        </ul>
      )}
    </div>
  );
}

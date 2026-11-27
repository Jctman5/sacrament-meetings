import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import { MEETING_TYPE_LABELS } from '@/lib/types';
import { formatLongDate, getMostRecentSunday } from '@/lib/dates';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const isCurrent = meeting.date === getMostRecentSunday();
  const speakerCount = meeting.speakers.filter((s) => s.type === 'speaker').length;
  const musicCount = meeting.speakers.length - speakerCount;

  return (
    <li>
      <Link
        href={`/meetings/${meeting.id}`}
        className="block h-full rounded-lg border border-rule bg-surface p-5 hover:border-accent"
      >
        <h2 className="font-serif text-xl font-semibold">{formatLongDate(meeting.date)}</h2>
        <p className="mt-1 text-sm font-semibold text-accent">
          {MEETING_TYPE_LABELS[meeting.meetingType]}
          {isCurrent && (
            <span className="ml-2 rounded bg-highlight-soft px-2 py-0.5 text-highlight">This Sunday</span>
          )}
        </p>
        <dl className="mt-3 text-sm text-muted">
          <div className="flex gap-2">
            <dt className="font-semibold">Presiding:</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">Conducting:</dt>
            <dd>{meeting.conducting}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">Program:</dt>
            <dd>
              {speakerCount} {speakerCount === 1 ? 'speaker' : 'speakers'}, {musicCount} musical{' '}
              {musicCount === 1 ? 'number' : 'numbers'}
            </dd>
          </div>
        </dl>
      </Link>
    </li>
  );
}

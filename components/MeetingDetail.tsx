import type { Hymn, SacramentMeeting } from '@/lib/types';
import { MEETING_TYPE_LABELS, includesSacrament } from '@/lib/types';
import { formatLongDate } from '@/lib/dates';
import { WARD_NAME } from '@/lib/site';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule py-4 print:break-inside-avoid">
      <h2 className="font-serif text-lg font-semibold text-accent">{title}</h2>
      <div className="mt-1">{children}</div>
    </section>
  );
}

function hymnText(h: Hymn): string {
  return `#${h.number}, ${h.title}`;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const sacrament = includesSacrament(meeting.meetingType);

  return (
    <article className="rounded-lg border border-rule bg-surface p-6 sm:p-8 print:border-0 print:p-0">
      <header className="pb-4">
        <p className="text-sm text-muted">{WARD_NAME}</p>
        <h1 className="font-serif text-3xl font-semibold">{formatLongDate(meeting.date)}</h1>
        <p className="mt-1 font-semibold text-accent">{MEETING_TYPE_LABELS[meeting.meetingType]}</p>
        <dl className="mt-3 grid gap-x-6 sm:grid-cols-2">
          <div className="flex gap-2">
            <dt className="font-semibold">Presiding:</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">Conducting:</dt>
            <dd>{meeting.conducting}</dd>
          </div>
        </dl>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <Section title="Announcements">
          <ul className="list-disc pl-5">
            {meeting.announcements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Opening hymn">
        <p>{hymnText(meeting.openingHymn)}</p>
      </Section>

      <Section title="Opening prayer">
        <p>{meeting.openingPrayer}</p>
      </Section>

      <Section title="Ward business">
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-5">
            {meeting.wardBusiness.map((b) => (
              <li key={b.description}>{b.description}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </Section>

      <Section title="Stake business">
        <p>{meeting.stakeBusiness ? 'Yes' : 'No'}</p>
      </Section>

      <Section title="Sacrament hymn">
        {sacrament ? (
          <p>{hymnText(meeting.sacramentHymn)}</p>
        ) : (
          <p>No sacrament is administered at this meeting.</p>
        )}
      </Section>

      <Section title="Speakers and musical numbers">
        {meeting.speakers.length > 0 ? (
          <ol className="space-y-2">
            {meeting.speakers.map((item) => (
              <li key={`${item.name}-${item.topic}`}>
                <span className="font-semibold">{item.name}</span>
                <span className="text-muted">
                  {' '}
                  ({item.type === 'speaker' ? 'Speaker' : 'Musical number'})
                </span>
                <br />
                <span>{item.topic}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p>None scheduled</p>
        )}
      </Section>

      <Section title="Closing hymn">
        <p>{hymnText(meeting.closingHymn)}</p>
      </Section>

      <Section title="Closing prayer">
        <p>{meeting.closingPrayer}</p>
      </Section>
    </article>
  );
}

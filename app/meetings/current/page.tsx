import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetingByDate, getMeetings } from '@/lib/meetings-db';
import { getMostRecentSunday } from '@/lib/dates';

export default async function CurrentMeetingPage() {
  // Opt into request-time rendering: the answer depends on today's date.
  await connection();

  const today = getMostRecentSunday();
  const meeting =
    getMeetingByDate(today) ??
    getMeetings().find((m) => m.date <= today);

  redirect(meeting ? `/meetings/${meeting.id}` : '/meetings');
}
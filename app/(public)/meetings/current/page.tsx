import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getLatestMeetingOnOrBefore } from '@/lib/meetings-db';
import { getMostRecentSunday } from '@/lib/dates';

export default async function CurrentMeetingPage() {
  // The answer depends on today's date, so render at request time.
  await connection();

  const meeting = await getLatestMeetingOnOrBefore(getMostRecentSunday());
  redirect(meeting ? `/meetings/${meeting.id}` : '/meetings');
}

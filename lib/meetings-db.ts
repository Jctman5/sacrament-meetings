import { neon } from '@neondatabase/serverless';
import type { Hymn, MeetingType, SacramentMeeting, SpeakerItem, WardBusinessItem } from './types';

export const PAGE_SIZE = 5;

export interface PaginatedMeetings {
  meetings: SacramentMeeting[];
  total: number;
  page: number;
  totalPages: number;
}

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean | null;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

// Created lazily so importing this file never fails when DATABASE_URL is missing (e.g. at build time).
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set. Run `vercel env pull .env.local`.');
  return neon(url);
}

function toMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business ?? false,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

/** Escape LIKE wildcards so user input is matched literally. */
function toLikePattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, '\\$&')}%`;
}

/** All meetings, newest first. Optionally filtered to one date ('YYYY-MM-DD'). */
export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const rows = (date
    ? await sql`
        SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding, conducting,
               announcements, opening_hymn, opening_prayer, ward_business, stake_business,
               sacrament_hymn, speakers, closing_hymn, closing_prayer
        FROM meetings WHERE date = ${date}::date ORDER BY date DESC`
    : await sql`
        SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding, conducting,
               announcements, opening_hymn, opening_prayer, ward_business, stake_business,
               sacrament_hymn, speakers, closing_hymn, closing_prayer
        FROM meetings ORDER BY date DESC`) as unknown as MeetingRow[];
  return rows.map(toMeeting);
}

/** One page of meetings, newest first, optionally filtered by a search term. */
export async function getMeetingsPage(options: {
  query?: string;
  page?: number;
}): Promise<PaginatedMeetings> {
  const sql = getSql();
  const like = toLikePattern((options.query ?? '').trim());

  const countRows = (await sql`
    SELECT COUNT(*)::int AS count FROM meetings
    WHERE presiding ILIKE ${like}
       OR conducting ILIKE ${like}
       OR meeting_type ILIKE ${like}
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(speakers) AS s WHERE s->>'name' ILIKE ${like})
  `) as unknown as { count: number }[];
  const total = countRows[0]?.count ?? 0;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, Math.trunc(options.page ?? 1)), totalPages);
  const offset = (page - 1) * PAGE_SIZE;

  const rows = (await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding, conducting,
           announcements, opening_hymn, opening_prayer, ward_business, stake_business,
           sacrament_hymn, speakers, closing_hymn, closing_prayer
    FROM meetings
    WHERE presiding ILIKE ${like}
       OR conducting ILIKE ${like}
       OR meeting_type ILIKE ${like}
       OR EXISTS (SELECT 1 FROM jsonb_array_elements(speakers) AS s WHERE s->>'name' ILIKE ${like})
    ORDER BY date DESC
    LIMIT ${PAGE_SIZE} OFFSET ${offset}
  `) as unknown as MeetingRow[];

  return { meetings: rows.map(toMeeting), total, page, totalPages };
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding, conducting,
           announcements, opening_hymn, opening_prayer, ward_business, stake_business,
           sacrament_hymn, speakers, closing_hymn, closing_prayer
    FROM meetings WHERE id = ${id}
  `) as unknown as MeetingRow[];
  return rows[0] ? toMeeting(rows[0]) : undefined;
}

/** The meeting on the given date, or the most recent one before it. */
export async function getLatestMeetingOnOrBefore(date: string): Promise<SacramentMeeting | undefined> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date, meeting_type, presiding, conducting,
           announcements, opening_hymn, opening_prayer, ward_business, stake_business,
           sacrament_hymn, speakers, closing_hymn, closing_prayer
    FROM meetings WHERE date <= ${date}::date ORDER BY date DESC LIMIT 1
  `) as unknown as MeetingRow[];
  return rows[0] ? toMeeting(rows[0]) : undefined;
}

// Mutation stubs: wired to the database in Week 04 when the forms are built.
/* eslint-disable @typescript-eslint/no-unused-vars */
export async function addMeeting(meeting: Omit<SacramentMeeting, 'id'>): Promise<SacramentMeeting> {
  throw new Error('addMeeting is not implemented until Week 04');
}

export async function updateMeeting(
  id: number,
  updates: Partial<Omit<SacramentMeeting, 'id'>>,
): Promise<SacramentMeeting | undefined> {
  throw new Error('updateMeeting is not implemented until Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting is not implemented until Week 04');
}
/* eslint-enable @typescript-eslint/no-unused-vars */

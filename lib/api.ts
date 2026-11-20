import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch(`${await getBaseUrl()}/api/meetings`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load meetings (${res.status})`);
  return (await res.json()) as SacramentMeeting[];
}

/** Returns null when the id is invalid (400) or not found (404). */
export async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const res = await fetch(`${await getBaseUrl()}/api/meetings/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });
  if (res.status === 400 || res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load meeting (${res.status})`);
  return (await res.json()) as SacramentMeeting;
}

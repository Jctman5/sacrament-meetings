import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

// GET /api/meetings
// GET /api/meetings?date=2026-03-01
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date must use the format YYYY-MM-DD' }, { status: 400 });
  }

  return NextResponse.json(await getMeetings(date ?? undefined));
}

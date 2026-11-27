import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'id must be a valid number' }, { status: 400 });
  }

  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return NextResponse.json({ error: `No meeting found with id ${id}` }, { status: 404 });
  }

  return NextResponse.json(meeting);
}

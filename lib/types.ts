export type MeetingType =
  | 'testimony'
  | 'regular'
  | 'stake'
  | 'general';

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string; // ISO date string: 'YYYY-MM-DD'
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}

export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  testimony: 'Fast and testimony meeting',
  regular: 'Regular sacrament meeting',
  stake: 'Stake meeting (no sacrament)',
  general: 'General meeting (no sacrament)',
};

/** Stake and general meetings do not include the sacrament. */
export function includesSacrament(type: MeetingType): boolean {
  return type === 'testimony' || type === 'regular';
}

import type { SacramentMeeting } from './types';
import { addDays, getMostRecentSunday } from './dates';

// Temporary in-memory data. Replaced by a real database in a later week.
// Dates are generated relative to the current Sunday so /meetings/current always works.
function buildMeetings(): SacramentMeeting[] {
  const thisSunday = getMostRecentSunday();
  const sunday = (weeksFromNow: number): string => addDays(thisSunday, weeksFromNow * 7);

  return [
    {
      id: 1,
      date: sunday(-4),
      meetingType: 'testimony',
      presiding: 'Bishop David Larsen',
      conducting: 'Brother Mark Ellison',
      announcements: ['Ward temple night is Thursday at 7:00 PM.', 'Youth service project next Saturday at 9:00 AM.'],
      openingHymn: { number: 2, title: 'The Spirit of God' },
      openingPrayer: 'Sister Anna Reyes',
      wardBusiness: [{ description: 'Sustain Sister Ruth Whitaker as Primary secretary.' }],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [{ name: 'Members of the ward', topic: 'Bearing of testimonies', type: 'speaker' }],
      closingHymn: { number: 134, title: 'I Believe in Christ' },
      closingPrayer: 'Brother Tom Nakamura',
    },
    {
      id: 2,
      date: sunday(-3),
      meetingType: 'stake',
      presiding: 'President Alan Brooks',
      conducting: 'President Alan Brooks',
      openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
      openingPrayer: 'Sister Carol Jensen',
      wardBusiness: [],
      stakeBusiness: true,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [
        { name: 'Sister Helen Ortiz', topic: 'Strengthening families through the gospel', type: 'speaker' },
        { name: 'Stake choir', topic: 'Come, Thou Fount of Every Blessing', type: 'musical-number' },
        { name: 'President Alan Brooks', topic: 'Gathering Israel on both sides of the veil', type: 'speaker' },
      ],
      closingHymn: { number: 85, title: 'How Firm a Foundation' },
      closingPrayer: 'Elder James Whitfield',
    },
    {
      id: 3,
      date: sunday(-2),
      meetingType: 'regular',
      presiding: 'Bishop David Larsen',
      conducting: 'Brother Mark Ellison',
      announcements: ['Ward choir practice Wednesday at 7:30 PM.'],
      openingHymn: { number: 5, title: 'High on the Mountain Top' },
      openingPrayer: 'Brother Peter Hall',
      wardBusiness: [
        { description: 'Release Brother Kyle Dean as ward activities chair.' },
        { description: 'Sustain Sister Maria Lopez as ward activities chair.' },
      ],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
      speakers: [
        { name: 'Sister Emily Carter', topic: 'Faith in Jesus Christ', type: 'speaker' },
        { name: 'Hannah and Lucy Brown', topic: 'I Am a Child of God (duet)', type: 'musical-number' },
        { name: 'Brother Samuel Okafor', topic: 'The blessings of service', type: 'speaker' },
      ],
      closingHymn: { number: 241, title: 'Count Your Blessings' },
      closingPrayer: 'Sister Grace Kim',
    },
    {
      id: 4,
      date: sunday(-1),
      meetingType: 'general',
      presiding: 'Bishop David Larsen',
      conducting: 'Bishop David Larsen',
      announcements: ['General conference broadcast begins at 10:00 AM in the chapel.'],
      openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
      openingPrayer: 'Brother Daniel Moore',
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [{ name: 'General conference session', topic: 'Broadcast from Salt Lake City', type: 'speaker' }],
      closingHymn: { number: 2, title: 'The Spirit of God' },
      closingPrayer: 'Sister Julia Park',
    },
    {
      id: 5,
      date: thisSunday,
      meetingType: 'regular',
      presiding: 'Bishop David Larsen',
      conducting: 'Brother Mark Ellison',
      announcements: [
        'Ward Christmas dinner signup is in the foyer.',
        'Please bring canned goods for the food drive.',
      ],
      openingHymn: { number: 85, title: 'How Firm a Foundation' },
      openingPrayer: 'Sister Rachel Adams',
      wardBusiness: [{ description: 'Sustain Brother Luke Tanner as elders quorum counselor.' }],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
      speakers: [
        { name: 'Brother Ethan Walsh', topic: 'Gratitude in all circumstances', type: 'speaker' },
        { name: 'Primary children', topic: 'Musical number', type: 'musical-number' },
        { name: 'Sister Naomi Fields', topic: 'Preparing to celebrate the birth of Christ', type: 'speaker' },
      ],
      closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
      closingPrayer: 'Brother Victor Chen',
    },
    {
      id: 6,
      date: sunday(1),
      meetingType: 'testimony',
      presiding: 'Bishop David Larsen',
      conducting: 'Brother Mark Ellison',
      announcements: ['Fast offerings help those in need. Thank you for your generosity.'],
      openingHymn: { number: 2, title: 'The Spirit of God' },
      openingPrayer: 'Brother Isaac Young',
      wardBusiness: [],
      stakeBusiness: true,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [{ name: 'Members of the ward', topic: 'Bearing of testimonies', type: 'speaker' }],
      closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
      closingPrayer: 'Sister Olivia Grant',
    },
    {
      id: 7,
      date: '2026-05-03',
      meetingType: 'regular',
      presiding: 'Bishop David Larsen',
      conducting: 'Brother Mark Ellison',
      openingHymn: { number: 5, title: 'High on the Mountain Top' },
      openingPrayer: 'Sister Beth Morgan',
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
      speakers: [{ name: 'Brother Noah Reed', topic: 'The covenant path', type: 'speaker' }],
      closingHymn: { number: 241, title: 'Count Your Blessings' },
      closingPrayer: 'Brother Henry Cole',
    },
  ];
}

/** All meetings, newest first. Optionally filtered to one date ('YYYY-MM-DD'). */
export function getMeetings(date?: string): SacramentMeeting[] {
  const all = buildMeetings();
  const list = date ? all.filter((m) => m.date === date) : all;
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return buildMeetings().find((m) => m.id === id);
}

export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return buildMeetings().find((m) => m.date === date);
}
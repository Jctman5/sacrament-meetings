import { Suspense } from 'react';
import NavLinks, { type NavItem } from '@/components/NavLinks';

const items: NavItem[] = [
  { href: '/meetings', label: 'All meetings', exact: true },
  { href: '/meetings/current', label: 'This Sunday', exact: true },
];

export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6 border-b border-rule pb-3 print:hidden">
        <Suspense fallback={null}>
          <NavLinks items={items} label="Meetings section" />
        </Suspense>
      </div>
      {children}
    </div>
  );
}

import { Suspense } from 'react';
import Link from 'next/link';
import CurrentDate from './CurrentDate';
import NavLinks, { type NavItem } from './NavLinks';
import { WARD_NAME } from '@/lib/site';

const items: NavItem[] = [
  { href: '/', label: 'Home', exact: true },
  { href: '/meetings', label: 'Meetings' },
];

export default function Header() {
  return (
    <header className="border-b border-rule bg-surface print:hidden">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4">
        <div>
          <Link href="/" className="font-serif text-2xl font-semibold">
            {WARD_NAME}
          </Link>
          <CurrentDate />
        </div>
        <Suspense fallback={null}>
          <NavLinks items={items} label="Main" />
        </Suspense>
      </div>
    </header>
  );
}
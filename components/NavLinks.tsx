'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  href: string;
  label: string;
  /** Active only on the exact path (otherwise also on nested paths). */
  exact?: boolean;
}

interface NavLinksProps {
  items: NavItem[];
  label: string;
}

export default function NavLinks({ items, label }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-1">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`block rounded px-3 py-2 text-sm font-semibold ${
                  active ? 'bg-accent text-white' : 'text-accent hover:bg-accent-soft'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

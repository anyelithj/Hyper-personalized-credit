'use client';

import { usePathname } from 'next/navigation';


export function useActivePath() {
  const pathname = usePathname();

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return { pathname, isActive };
}

'use client';

import { usePathname } from 'next/navigation';

export default function DynamicCanonical() {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jagannathholidays.com';

  const cleanPath = pathname === '/' ? '' : (pathname || '').replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}${cleanPath}`;

  return <link rel="canonical" href={canonicalUrl} />;
}

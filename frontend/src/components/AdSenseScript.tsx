'use client';

import React from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const ADSENSE_CLIENT_ID = 'ca-pub-8800056915088711';

/**
 * Route-aware Google AdSense loader.
 * Prevents AdSense from executing on utility screens, admin panels,
 * settings pages, or thin redirect stubs (AdSense Policy: answer/10502938).
 */
export function isAdSenseEligiblePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const clean = pathname.toLowerCase();

  const disallowedSegments = [
    '/admin',
    '/settings',
    '/download',
    '/404',
    '/pokemon/',
    '/eggs',
    '/research',
  ];

  for (const segment of disallowedSegments) {
    if (clean === segment || clean.includes(segment)) {
      return false;
    }
  }

  return true;
}

export const AdSenseScript: React.FC = () => {
  const pathname = usePathname();
  const eligible = isAdSenseEligiblePath(pathname);

  if (!eligible) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

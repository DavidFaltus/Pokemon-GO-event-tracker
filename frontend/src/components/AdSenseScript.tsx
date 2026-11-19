'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ADSENSE_CLIENT_ID = 'ca-pub-8800056915088711';
const ADSENSE_SCRIPT_ID = 'google-adsense-head-script';

/**
 * Route-aware Google AdSense loader.
 * Appends a native <script> tag to document.head without Next.js's `data-nscript`
 * attribute (which triggers "AdSense head tag doesn't support data-nscript attribute").
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

  useEffect(() => {
    if (!eligible || typeof document === 'undefined') return;
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [eligible]);

  return null;
};

'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ADSENSE_CLIENT_ID = 'ca-pub-8800056915088711';
const ADSENSE_SCRIPT_ID = 'google-adsense-head-script';

const ALLOWED_ADSENSE_PATTERNS: RegExp[] = [
  // Language homepages
  /^\/(cs|en|ja|ru)\/?$/,
  // Original editorial guides hub & individual articles
  /^\/(cs|en|ja|ru)\/guides(\/[^/]+)?\/?$/,
  // Event strategy guides (filtered below for canceled/micro stubs)
  /^\/(cs|en|ja|ru)\/events\/[^/]+\/?$/,
  // Raid hub & raid boss counter guides
  /^\/(cs|en|ja|ru)\/raids(\/[^/]+)?\/?$/,
  // Team GO Rocket hub & leader guides
  /^\/(cs|en|ja|ru)\/rocket(\/[^/]+)?\/?$/,
  // Rankings hub & category guides
  /^\/(cs|en|ja|ru)\/rankings(\/[^/]+)?\/?$/,
];

const EXCLUDED_EVENT_SLUG_PATTERNS: RegExp[] = [
  /cancell?ed/i,
  /\/events\/gbl-/i,
  /\/events\/max-mondays-/i,
  /\/events\/raid-hour-/i,
  /\/events\/pokemon-spotlight-hour-/i,
];

/**
 * Route-aware Google AdSense loader using a strict editorial whitelist.
 * Never loads adsbygoogle.js on thin utility/game screens (/pokedle, /filter, /friends),
 * noindex Pokédex/Type templates, or legal/admin/settings routes.
 */
export function isAdSenseEligiblePath(pathname: string | null): boolean {
  if (!pathname) return false;
  const clean = pathname.split('?')[0].split('#')[0].toLowerCase();

  const matchesWhitelist = ALLOWED_ADSENSE_PATTERNS.some((pattern) => pattern.test(clean));
  if (!matchesWhitelist) return false;

  if (EXCLUDED_EVENT_SLUG_PATTERNS.some((pattern) => pattern.test(clean))) {
    return false;
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

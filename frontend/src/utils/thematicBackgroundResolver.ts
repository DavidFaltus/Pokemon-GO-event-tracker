import type { EventData } from '../components/EventCard';

export interface ThematicBackgroundOption {
  id: string;
  name: string;
  url: string;
  category: 'season' | 'tour' | 'community' | 'battle' | 'fest';
}

export const THEMATIC_BACKGROUNDS: ThematicBackgroundOption[] = [
  { id: 'might-and-mastery-season', name: 'Might & Mastery Season', url: '/backgrounds/might-and-mastery-season.png', category: 'season' },
  { id: 'delightful-days-season', name: 'Delightful Days Season', url: '/backgrounds/delightful-days-season.png', category: 'season' },
  { id: 'dual-destiny-season', name: 'Dual Destiny Season', url: '/backgrounds/dual-destiny-season.png', category: 'season' },
  { id: 'road-of-legends-2026', name: 'Road of Legends 2026', url: '/backgrounds/road-of-legends-2026.png', category: 'tour' },
  { id: 'wild-area-global-soundwave', name: 'Wild Area Global', url: '/backgrounds/wild-area-global-soundwave.png', category: 'tour' },
  { id: 'community-days-2026', name: 'Community Days 2026', url: '/backgrounds/community-days-2026.png', category: 'community' },
  { id: 'pyeongchang-winter-festival-2026', name: 'Winter Festival', url: '/backgrounds/pyeongchang-winter-festival-2026.png', category: 'fest' },
  { id: 'mega-evolution-matrix', name: 'Mega Evolution Matrix', url: '/backgrounds/mega-evolution-matrix.png', category: 'battle' },
  { id: 'max-finale-dark-skies', name: 'Max Finale Dark Skies', url: '/backgrounds/max-finale-dark-skies.png', category: 'battle' },
  { id: 'ultra-space-wormhole', name: 'Ultra Space Wormhole', url: '/backgrounds/ultra-space-wormhole.png', category: 'battle' },
  { id: 'kyurem-black-white-fusion', name: 'Kyurem Fusion', url: '/backgrounds/kyurem-black-white-fusion.png', category: 'battle' },
  { id: 'necrozma-solar-lunar-fusion', name: 'Necrozma Fusion', url: '/backgrounds/necrozma-solar-lunar-fusion.png', category: 'battle' },
  { id: '10th-anniversary-celebration-2026', name: '10th Anniversary', url: '/backgrounds/10th-anniversary-celebration-2026.png', category: 'fest' }
];

/**
 * Automatically determine the best thematic background image from public/backgrounds/
 * for multi-pokemon events, seasonal summaries, or festivals.
 */
export function resolveEventThematicBackground(event?: Partial<EventData>): string | null {
  if (!event) return null;

  const eventId = (event.eventID || '').toLowerCase();
  const name = (typeof event.name === 'string' ? event.name : '').toLowerCase();
  const eventType = (event.eventType || '').toLowerCase();

  // 1. Explicit season matches
  if (eventId.includes('might-and-mastery') || name.includes('might and mastery') || name.includes('might & mastery')) {
    return '/backgrounds/might-and-mastery-season.png';
  }
  if (eventId.includes('delightful-days') || name.includes('delightful days')) {
    return '/backgrounds/delightful-days-season.png';
  }
  if (eventId.includes('dual-destiny') || name.includes('dual destiny')) {
    return '/backgrounds/dual-destiny-season.png';
  }

  // 2. Event types & titles
  if (eventType === 'season' || name.includes('season')) {
    // Current season default fallback
    return '/backgrounds/might-and-mastery-season.png';
  }
  if (eventType === 'wild-area' || name.includes('wild area')) {
    return '/backgrounds/wild-area-global-soundwave.png';
  }
  if (name.includes('road of legends')) {
    return '/backgrounds/road-of-legends-2026.png';
  }
  if (name.includes('winter') || name.includes('pyeongchang') || name.includes('holiday')) {
    return '/backgrounds/pyeongchang-winter-festival-2026.png';
  }
  if (eventType === 'community-day' || name.includes('community day')) {
    if (name.includes('december')) {
      return '/backgrounds/december-2024-community-day.png';
    }
    return '/backgrounds/community-days-2026.png';
  }
  if (name.includes('mega') || eventType.includes('mega')) {
    return '/backgrounds/mega-evolution-matrix.png';
  }
  if (eventType.includes('max') || name.includes('dynamax') || name.includes('gigantamax')) {
    return '/backgrounds/max-finale-dark-skies.png';
  }
  if (name.includes('necrozma') || name.includes('solgaleo') || name.includes('lunala')) {
    return '/backgrounds/necrozma-solar-lunar-fusion.png';
  }
  if (name.includes('kyurem') || name.includes('black kyurem') || name.includes('white kyurem')) {
    return '/backgrounds/kyurem-black-white-fusion.png';
  }
  if (name.includes('ultra unlock') || name.includes('wormhole') || name.includes('ultra beast')) {
    return '/backgrounds/ultra-space-wormhole.png';
  }

  return null;
}

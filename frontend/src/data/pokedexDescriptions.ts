/**
 * Server-only Pokédex descriptions loader.
 *
 * IMPORTANT: Only import this module in Next.js Server Components (e.g. app/[lang]/pokedex/[slug]/page.tsx)
 * or Node build/test scripts — NEVER in 'use client' components — so the per-locale JSON files
 * (~180–360 KB each) stay completely out of the client JS bundle (0 KB client JS impact).
 */

import csDescriptions from './descriptions/cs.json';
import enDescriptions from './descriptions/en.json';
import jaDescriptions from './descriptions/ja.json';
import ruDescriptions from './descriptions/ru.json';
import type { Language } from './translations';
import type {
  PokedexDescriptionEntry,
  PokedexDescriptionsMap,
} from '../types/pokedexDescription';

const DESCRIPTIONS_BY_LANG: Record<Language, PokedexDescriptionsMap> = {
  cs: csDescriptions as PokedexDescriptionsMap,
  en: enDescriptions as PokedexDescriptionsMap,
  ja: jaDescriptions as PokedexDescriptionsMap,
  ru: ruDescriptions as PokedexDescriptionsMap,
};

export function getPokedexDescription(
  dexId: number | string,
  lang: Language
): PokedexDescriptionEntry | null {
  const map = DESCRIPTIONS_BY_LANG[lang] || DESCRIPTIONS_BY_LANG.en;
  return map[String(dexId)] || null;
}

export function getAllPokedexDescriptions(lang: Language): PokedexDescriptionsMap {
  return DESCRIPTIONS_BY_LANG[lang] || DESCRIPTIONS_BY_LANG.en;
}

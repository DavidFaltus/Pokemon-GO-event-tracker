/**
 * pokedexCatalog.ts — Complete Static Pokédex Database for Pokémon GO
 *
 * Generated automatically by backend/src/scripts/generatePokedexCatalog.ts
 */

import pokedexDataJson from './pokedexCatalog.json';

export type PokemonType =
  | 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug'
  | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export type VariantCategory =
  | 'mega'
  | 'primal'
  | 'gigantamax'
  | 'dynamax'
  | 'shadow'
  | 'regional'
  | 'fusion'
  | 'battle_form'
  | 'alternate_form';

export type RegionalRegion = 'alola' | 'galar' | 'hisui' | 'paldea';
export type RarityClass = 'standard' | 'starter' | 'baby' | 'legendary' | 'mythical' | 'ultra_beast' | 'paradox';

export interface PokedexMove {
  name: string;
  type: PokemonType;
  isElite?: boolean;
}

export interface PokedexVariant {
  id: string;
  category: VariantCategory;
  name: Record<'cs' | 'en' | 'ja' | 'ru', string>;
  types: PokemonType[];
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  maxCp: number;
  regionalRegion?: RegionalRegion;
  gmaxMoveName?: string;
  megaEnergyFirstCost?: number;
  purificationStardust?: number;
  // Fusion & Signature mechanics
  fusionPartner?: string;
  fusionEnergyCost?: {
    energyType: string;
    energyAmount: number;
    candy1: string;
    candy1Amount: number;
    candy2?: string;
    candy2Amount?: number;
  };
  signatureMove?: {
    name: string;
    type: PokemonType;
    pvePower?: number;
    pvpPower?: number;
  };
  adventureEffect?: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  quickMoves?: PokedexMove[];
  cinematicMoves?: PokedexMove[];
  spriteOverrides?: {
    officialArtwork?: string;
    shinyArtwork?: string;
    goAsset?: string;
  };
}

export interface EvolutionNode {
  targetDexId: number;
  targetName: string;
  candies: number;
  itemRequired?: string | null;
  questRequirement?: string | null;
}

export interface PokedexCatalogEntry {
  dexId: number;
  slug: string;
  generation: number;
  names: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  types: PokemonType[];
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  maxCp: {
    lv15: number;
    lv20: number;
    lv25: number;
    lv40: number;
    lv50: number;
  };
  rarityClass: RarityClass;
  isReleasedInGo: boolean;
  canBeShinyInGo: boolean;
  hasDynamax: boolean;
  hasGigantamax: boolean;
  hasMega: boolean;
  hasShadow: boolean;
  hasRegionalVariants: boolean;
  hasFusions?: boolean;
  hasBattleForms?: boolean;
  hasAlternateForms?: boolean;
  variants: PokedexVariant[];
  evolutions: EvolutionNode[];
  evolutionChainIds: number[];
  quickMoves: PokedexMove[];
  cinematicMoves: PokedexMove[];
}

export const POKEDEX_CATALOG: PokedexCatalogEntry[] = pokedexDataJson as unknown as PokedexCatalogEntry[];

export const POKEDEX_MAP: Record<number, PokedexCatalogEntry> = POKEDEX_CATALOG.reduce((acc, entry) => {
  acc[entry.dexId] = entry;
  return acc;
}, {} as Record<number, PokedexCatalogEntry>);

export function getPokedexEntryById(id: number | string): PokedexCatalogEntry | undefined {
  const num = typeof id === 'number' ? id : parseInt(id, 10);
  return POKEDEX_MAP[num];
}

export function getPokedexEntryBySlug(slug: string): PokedexCatalogEntry | undefined {
  const clean = slug.toLowerCase().trim();
  return POKEDEX_CATALOG.find(e => e.slug === clean || e.names.en.toLowerCase() === clean);
}

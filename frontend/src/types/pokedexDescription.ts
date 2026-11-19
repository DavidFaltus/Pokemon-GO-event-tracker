export interface PokedexDescriptionVariantEntry {
  /** Official Pokédex flavor text for this specific form/variant */
  text: string;
  /** Attribution label for <cite>, e.g. "Pokémon GO" or "Pokémon Scarlet" */
  source: string;
}

export interface PokedexDescriptionEntry {
  /** Canonical official Pokédex flavor text for the base species */
  text: string;
  /** Attribution label for <cite>, e.g. "Pokémon GO" or "Pokémon Scarlet" */
  source: string;
  /** Optional form/variant-specific descriptions keyed by PokedexVariant.id */
  variants?: Record<string, PokedexDescriptionVariantEntry>;
}

export type PokedexDescriptionsMap = Record<string, PokedexDescriptionEntry>;

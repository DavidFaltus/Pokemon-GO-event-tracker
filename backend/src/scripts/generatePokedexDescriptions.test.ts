import { describe, it, expect } from 'vitest';
import {
  normalizeFlavorText,
  resolvePogoKeyForVariant,
  VARIANT_ID_TO_POGO_KEY,
} from './generatePokedexDescriptions';

describe('generatePokedexDescriptions helpers', () => {
  it('normalizes PokéAPI and game flavor text control characters', () => {
    expect(normalizeFlavorText('Line one\fline two\r\n  inter\u00ad\nnational  ')).toBe(
      'Line one line two international'
    );
  });

  it('resolves Mega, Primal, Gigantamax, Regional, and Fusion keys accurately', () => {
    const mockEnMap = new Map<string, string>([
      ['pokemon_desc_tmpevo_0006_0002', 'Mega Charizard X'],
      ['pokemon_desc_tmpevo_0006_0003', 'Mega Charizard Y'],
      ['pokemon_desc_tmpevo_0384_0001', 'Mega Rayquaza'],
      ['pokemon_desc_tmpevo_0382_0001', 'Primal Kyogre'],
      ['pokemon_desc_0006_0178_2', 'G-Max Charizard'],
      ['pokemon_desc_0026_0050', 'Alolan Raichu'],
      ['pokemon_desc_0800_2718', 'Dusk Mane Necrozma'],
      ['pokemon_desc_0774_meteor', 'Minior Meteor'],
      ['pokemon_desc_0774_exposed', 'Minior Core'],
    ]);

    expect(
      resolvePogoKeyForVariant(6, { id: 'CHARIZARD_MEGA_X', category: 'mega' }, mockEnMap)
    ).toBe('pokemon_desc_tmpevo_0006_0002');
    expect(
      resolvePogoKeyForVariant(6, { id: 'CHARIZARD_MEGA_Y', category: 'mega' }, mockEnMap)
    ).toBe('pokemon_desc_tmpevo_0006_0003');
    expect(
      resolvePogoKeyForVariant(384, { id: 'RAYQUAZA_MEGA', category: 'mega' }, mockEnMap)
    ).toBe('pokemon_desc_tmpevo_0384_0001');
    expect(
      resolvePogoKeyForVariant(382, { id: 'KYOGRE_PRIMAL', category: 'primal' }, mockEnMap)
    ).toBe('pokemon_desc_tmpevo_0382_0001');
    expect(
      resolvePogoKeyForVariant(6, { id: 'CHARIZARD_GMAX', category: 'gigantamax' }, mockEnMap)
    ).toBe('pokemon_desc_0006_0178_2');
    expect(
      resolvePogoKeyForVariant(26, { id: 'RAICHU_ALOLA', category: 'regional' }, mockEnMap)
    ).toBe('pokemon_desc_0026_0050');
    expect(
      resolvePogoKeyForVariant(800, { id: 'NECROZMA_DUSK_MANE', category: 'fusion' }, mockEnMap)
    ).toBe('pokemon_desc_0800_2718');
    expect(
      resolvePogoKeyForVariant(774, { id: 'MINIOR_METEOR_RED', category: 'alternate_form' }, mockEnMap)
    ).toBe('pokemon_desc_0774_meteor');
    expect(
      resolvePogoKeyForVariant(774, { id: 'MINIOR_RED', category: 'alternate_form' }, mockEnMap)
    ).toBe('pokemon_desc_0774_exposed');
    expect(
      resolvePogoKeyForVariant(150, { id: 'MEWTWO_SHADOW', category: 'shadow' }, mockEnMap)
    ).toBeNull();
  });

  it('maps Galarian birds and Paldean Tauros explicitly', () => {
    expect(VARIANT_ID_TO_POGO_KEY.ARTICUNO_GALARIAN).toBe('pokemon_desc_0144_2801');
    expect(VARIANT_ID_TO_POGO_KEY.TAUROS_PALDEA_BLAZE).toBe('pokemon_desc_0128_3007');
  });
});

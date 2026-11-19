import { describe, it, expect } from 'vitest';
import { maskPokemonNamesInText } from './generatePokedleData';

describe('generatePokedleData name masker', () => {
  it('masks Czech inflected Pokémon and evolution-family names', () => {
    const out = maskPokemonNamesInText(
      'Aby unesl váhu, nohy i trup Ivysaura mohutní a později se vyvine v Venusaura.',
      { en: ['Bulbasaur', 'Ivysaur', 'Venusaur'], ja: [], ru: [] },
      'cs'
    );
    expect(out).not.toMatch(/ivysaur|venusaur/i);
    expect(out).toContain('[???]');
  });

  it('masks Russian Cyrillic inflected names', () => {
    const out = maskPokemonNamesInText(
      'На спине Айвизавра есть бутон, как у Бульбазавра.',
      { en: ['Bulbasaur', 'Ivysaur'], ja: [], ru: ['Бульбазавр', 'Айвизавр'] },
      'ru'
    );
    expect(out).not.toMatch(/Айвизавр|Бульбазавр/i);
    expect(out).toContain('[???]');
  });

  it('masks Japanese katakana names', () => {
    const out = maskPokemonNamesInText(
      'リザードンは強い相手を求めて空を飛び回る。',
      { en: ['Charizard'], ja: ['リザードン'], ru: [] },
      'ja'
    );
    expect(out).toBe('[???]は強い相手を求めて空を飛び回る。');
  });
});

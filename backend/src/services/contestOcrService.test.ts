import { describe, it, expect } from 'vitest';
import {
  evaluateInventoryComboFromOcr,
  extractPokemonNamesFromLines,
  detectAge0Filter,
} from './contestOcrService';

describe('Contest OCR & Inventory Combo Evaluator', () => {
  it('extracts valid Pokédex names and ignores fake nicknames and CP noise', () => {
    const lines = [
      'POKÉMON  EGGS  TAGS',
      'age0',
      'CP 420  CP 188  CP 612',
      'Bulbasaur  Caterpie  Eevee',
      'CP 999  CP 550',
      'SuperHundo100  FakeNickXYZ',
    ];
    expect(detectAge0Filter(lines.join('\n'), lines)).toBe(true);
    const names = extractPokemonNamesFromLines(lines);
    expect(names).toEqual(['Bulbasaur', 'Caterpie', 'Eevee']);
  });

  it('approves alphabetical combo in both forward and reverse chronological grid directions', () => {
    const reverseGridLines = ['age0', 'Eevee  Caterpie  Bulbasaur'];
    const res = evaluateInventoryComboFromOcr(
      {
        provider: 'google_vision',
        rawText: reverseGridLines.join('\n'),
        orderedLines: reverseGridLines,
      },
      { ruleMode: 'alphabetical', comboLength: 3, requireAge0: true }
    );

    expect(res.status).toBe('approved');
    expect(res.matchedDirection).toBe('reverse');
    expect(res.matchedSequence).toEqual(['Bulbasaur', 'Caterpie', 'Eevee']);
  });

  it('rejects when age0 filter is required but missing from screenshot', () => {
    const lines = ['POKÉMON', 'Bulbasaur  Caterpie  Eevee'];
    const res = evaluateInventoryComboFromOcr(
      {
        provider: 'google_vision',
        rawText: lines.join('\n'),
        orderedLines: lines,
      },
      { ruleMode: 'alphabetical', comboLength: 3, requireAge0: true }
    );

    expect(res.status).toBe('rejected');
    expect(res.age0Detected).toBe(false);
    expect(res.reason).toContain('age0');
  });

  it('evaluates word cipher (e.g. POG) in reverse chronological inventory order', () => {
    const lines = ['age0', 'Zubat  Gengar  Oddish  Pikachu  Rattata'];
    const res = evaluateInventoryComboFromOcr(
      {
        provider: 'google_vision',
        rawText: lines.join('\n'),
        orderedLines: lines,
      },
      { ruleMode: 'word_cipher', comboLength: 3, targetWord: 'POG', requireAge0: true }
    );

    expect(res.status).toBe('approved');
    expect(res.matchedDirection).toBe('reverse');
    expect(res.matchedSequence).toEqual(['Pikachu', 'Oddish', 'Gengar']);
  });

  it('sends unreadable screenshots to pending_review for admin inspection', () => {
    const res = evaluateInventoryComboFromOcr(
      {
        provider: 'tesseract',
        rawText: 'blurry text 123',
        orderedLines: ['blurry text 123'],
      },
      { ruleMode: 'alphabetical', comboLength: 3, requireAge0: false }
    );

    expect(res.status).toBe('pending_review');
  });
});

import { describe, it, expect } from 'vitest';
import { getTypeBackgroundStyle } from './typeBackgroundHelper';

describe('typeBackgroundHelper', () => {
  it('returns default dark style when types array is empty', () => {
    const style = getTypeBackgroundStyle([]);
    expect(style.primaryType).toBe('default');
    expect(style.radialGlowColor).toContain('168, 85, 247');
  });

  it('generates fire themed background for fire type', () => {
    const style = getTypeBackgroundStyle(['fire']);
    expect(style.primaryType).toBe('fire');
    expect(style.accentColor).toBe('#f87171');
    expect(style.radialGlowColor).toContain('239, 68, 68');
  });

  it('generates ghost themed background for ghost type', () => {
    const style = getTypeBackgroundStyle(['ghost']);
    expect(style.primaryType).toBe('ghost');
    expect(style.accentColor).toBe('#c084fc');
    expect(style.radialGlowColor).toContain('168, 85, 247');
  });

  it('blends dual types properly (e.g. ghost + grass)', () => {
    const style = getTypeBackgroundStyle(['ghost', 'grass']);
    expect(style.primaryType).toBe('ghost-grass');
    expect(style.radialGlowColor).toContain('168, 85, 247'); // primary ghost glow
    expect(style.borderColor).toContain('74, 222, 128'); // secondary grass border
  });

  it('blends dragon + flying for Rayquaza', () => {
    const style = getTypeBackgroundStyle(['dragon', 'flying']);
    expect(style.primaryType).toBe('dragon-flying');
    expect(style.radialGlowColor).toContain('99, 102, 241'); // dragon glow
    expect(style.borderColor).toContain('165, 180, 252'); // flying border
  });
});

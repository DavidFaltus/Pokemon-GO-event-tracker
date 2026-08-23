export interface BonusWeightResult {
  weight: number;
  category: 'stardust' | 'raid_pass' | 'xl_candy' | 'elite_move' | 'hatch' | 'xp' | 'trade' | 'general';
  highlightEn: string;
  highlightCs: string;
  icon: string;
}

export function evaluateBonusImpact(textEn: string, textCs?: string): BonusWeightResult {
  const lowerEn = textEn.toLowerCase();
  const lowerCs = (textCs || '').toLowerCase();

  // 1. Stardust Multipliers (+3 pts)
  if (
    lowerEn.includes('stardust') ||
    lowerEn.includes('dust') ||
    lowerCs.includes('hvězdný prach') ||
    lowerCs.includes('prach')
  ) {
    const isBig = lowerEn.includes('3x') || lowerEn.includes('3×') || lowerEn.includes('4x') || lowerEn.includes('5x');
    return {
      weight: isBig ? 3 : 2,
      category: 'stardust',
      highlightEn: `✨ ${textEn} (High value grind)`,
      highlightCs: `✨ ${textCs || textEn} (Vynikající pro farmení prachu)`,
      icon: '✨'
    };
  }

  // 2. Free Raid Passes (+2 pts)
  if (
    lowerEn.includes('raid pass') ||
    lowerEn.includes('raid passes') ||
    lowerCs.includes('raid pass') ||
    lowerCs.includes('raid passy')
  ) {
    return {
      weight: 2,
      category: 'raid_pass',
      highlightEn: `🎟️ ${textEn}`,
      highlightCs: `🎟️ ${textCs || textEn}`,
      icon: '🎟️'
    };
  }

  // 3. Guaranteed XL Candy / Extra Candy (+2 pts)
  if (
    lowerEn.includes('candy xl') ||
    lowerEn.includes('xl candy') ||
    lowerEn.includes('guaranteed xl') ||
    lowerCs.includes('candy xl') ||
    lowerCs.includes('xl bonbón')
  ) {
    return {
      weight: 2,
      category: 'xl_candy',
      highlightEn: `🍬 ${textEn}`,
      highlightCs: `🍬 ${textCs || textEn}`,
      icon: '🍬'
    };
  }

  // 4. Elite Move / Special Attack (+2 pts)
  if (
    lowerEn.includes('featured attack') ||
    lowerEn.includes('exclusive move') ||
    lowerEn.includes('signature attack') ||
    lowerCs.includes('speciální útok')
  ) {
    return {
      weight: 2,
      category: 'elite_move',
      highlightEn: `⚔️ ${textEn}`,
      highlightCs: `⚔️ ${textCs || textEn}`,
      icon: '⚔️'
    };
  }

  // 5. Hatch Distance Reduction (+1 pt)
  if (
    lowerEn.includes('hatch') ||
    lowerEn.includes('incubator') ||
    lowerEn.includes('egg distance') ||
    lowerCs.includes('líhnutí') ||
    lowerCs.includes('inkubátor') ||
    lowerCs.includes('vejce')
  ) {
    return {
      weight: 1,
      category: 'hatch',
      highlightEn: `🥚 ${textEn}`,
      highlightCs: `🥚 ${textCs || textEn}`,
      icon: '🥚'
    };
  }

  // 6. XP Multipliers (+1 pt)
  if (
    lowerEn.includes('xp') ||
    lowerEn.includes('experience') ||
    lowerCs.includes('xp') ||
    lowerCs.includes('zkušenost')
  ) {
    return {
      weight: 1,
      category: 'xp',
      highlightEn: `⚡ ${textEn}`,
      highlightCs: `⚡ ${textCs || textEn}`,
      icon: '⚡'
    };
  }

  // 7. Special Trades (+1 pt)
  if (
    lowerEn.includes('special trade') ||
    lowerEn.includes('trade stardust') ||
    lowerCs.includes('special trade') ||
    lowerCs.includes('výměn')
  ) {
    return {
      weight: 1,
      category: 'trade',
      highlightEn: `🤝 ${textEn}`,
      highlightCs: `🤝 ${textCs || textEn}`,
      icon: '🤝'
    };
  }

  return {
    weight: 0,
    category: 'general',
    highlightEn: textEn,
    highlightCs: textCs || textEn,
    icon: '🎁'
  };
}

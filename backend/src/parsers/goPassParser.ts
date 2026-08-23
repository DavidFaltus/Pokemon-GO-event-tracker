import * as cheerio from 'cheerio';
import { ClassifiedSection } from './semanticClassifier';
import { SpecialEventBonus } from '../types';

export interface GoPassData {
  ranks?: {
    rank: number;
    pointsRequired?: number;
    freeReward?: { name: string; image?: string };
    deluxeReward?: { name: string; image?: string };
  }[];
  milestones?: SpecialEventBonus[];
}

export function parseGoPassFromSections(
  sections: ClassifiedSection[],
  $: cheerio.CheerioAPI,
  translateFn: (text: string) => string = (t) => t
): GoPassData | undefined {
  let hasPassData = false;
  const milestones: SpecialEventBonus[] = [];
  const ranks: GoPassData['ranks'] = [];

  for (const section of sections) {
    if (section.type !== 'GO_PASS') continue;
    hasPassData = true;

    // 1. Check for milestone bonuses or list items
    const bonusElements = section.elements.filter('.bonus-item, li, p').add(section.elements.find('.bonus-item, li, p'));
    bonusElements.each((_, item) => {
      const text = $(item).text().trim();
      if (text.length > 5 && (text.includes('GO Pass') || text.includes('Rank') || text.includes('Deluxe') || text.includes('Points') || text.includes('Incubator'))) {
        milestones.push({
          text: {
            cs: translateFn(text),
            en: text
          },
          icon: text.toLowerCase().includes('deluxe') ? '🎁' : text.toLowerCase().includes('incubator') ? '🥚' : '⭐'
        });
      }
    });

    // 2. Check for interactive rank items (.rank-item or table rows)
    const rankElements = section.elements.filter('.rank-item, tr.rank-row').add(section.elements.find('.rank-item, tr.rank-row'));
    rankElements.each((_, rEl) => {
      const rankText = $(rEl).find('.rank-number, .rank-num').text().trim();
      const rankNum = parseInt(rankText.replace(/\D/g, ''), 10);
      const pointsText = $(rEl).find('.bp-points-pill, .points').text().trim();
      const pointsRequired = parseInt(pointsText.replace(/\D/g, ''), 10) || undefined;

      const freeRewardName = $(rEl).find('.free-reward .reward-name, .basic-track .reward-name').text().trim();
      const freeRewardImg = $(rEl).find('.free-reward img, .basic-track img').attr('src');

      const deluxeRewardName = $(rEl).find('.deluxe-reward .reward-name, .deluxe-track .reward-name').text().trim();
      const deluxeRewardImg = $(rEl).find('.deluxe-reward img, .deluxe-track img').attr('src');

      if (!isNaN(rankNum)) {
        ranks.push({
          rank: rankNum,
          pointsRequired,
          freeReward: freeRewardName ? { name: freeRewardName, image: freeRewardImg } : undefined,
          deluxeReward: deluxeRewardName ? { name: deluxeRewardName, image: deluxeRewardImg } : undefined
        });
      }
    });
  }

  if (!hasPassData && milestones.length === 0 && ranks.length === 0) {
    return undefined;
  }

  return {
    ranks: ranks.length > 0 ? ranks : undefined,
    milestones: milestones.length > 0 ? milestones : undefined
  };
}

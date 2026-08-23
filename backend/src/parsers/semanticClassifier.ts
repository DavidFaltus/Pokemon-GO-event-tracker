import * as cheerio from 'cheerio';

export type SectionType =
  | 'BONUSES'
  | 'SPAWNS_WILD'
  | 'SPAWNS_HABITAT'
  | 'DEBUTS'
  | 'EGGS'
  | 'RAIDS'
  | 'RESEARCH_FIELD'
  | 'RESEARCH_TIMED'
  | 'FEATURED_ATTACKS'
  | 'SHOWCASES'
  | 'GO_PASS'
  | 'PAID_TICKET'
  | 'UNKNOWN';

export interface ClassifiedSection {
  type: SectionType;
  headingText: string;
  headingId?: string;
  elements: cheerio.Cheerio<any>;
  metadata?: Record<string, any>;
}

/**
 * Classifies document sections between structural boundaries (h2, h3, h4, .event-section-header)
 * and assigns semantic tags with extracted metadata.
 */
export function classifyDocumentSections($: cheerio.CheerioAPI): ClassifiedSection[] {
  const sections: ClassifiedSection[] = [];

  $('h2, h3, h4, .event-section-header').each((_, headingEl) => {
    const heading = $(headingEl);
    const text = heading.text().trim().toLowerCase();
    const id = (heading.attr('id') || '').toLowerCase();
    const sectionElements = heading.nextUntil('h2, h3, h4, .event-section-header');

    let type: SectionType = 'UNKNOWN';
    const metadata: Record<string, any> = {};

    // 1. Habitat / Biome Detection
    if (
      text.includes('habitat:') ||
      text.includes('habitat -') ||
      text.includes('habitat –') ||
      text.includes('biome:') ||
      text.includes('biome -') ||
      id.includes('habitat') ||
      id.includes('biome')
    ) {
      type = 'SPAWNS_HABITAT';
      const habitatMatch = text.match(/(?:habitat|biome)(?:\s*[:\-–]\s*|\s+)(.+)/i);
      if (habitatMatch) {
        metadata.habitatName = habitatMatch[1].trim();
      } else {
        metadata.habitatName = text.replace(/habitat|biome/gi, '').trim();
      }
    }
    // 2. GO Pass / Battle Pass
    else if (
      id.includes('go-pass') ||
      id.includes('battle-pass') ||
      text.includes('go pass') ||
      text.includes('battle pass')
    ) {
      type = 'GO_PASS';
    }
    // 3. Featured / Signature Attacks
    else if (
      id.includes('featured-attack') ||
      id.includes('exclusive-move') ||
      text.includes('featured attack') ||
      text.includes('exclusive move') ||
      text.includes('signature move') ||
      text.includes('speciální útok')
    ) {
      type = 'FEATURED_ATTACKS';
    }
    // 4. Paid Ticket Sections
    else if (
      id.includes('ticket') ||
      text.includes('ticket-exclusive') ||
      text.includes('paid ticket') ||
      text.includes('vstupenk')
    ) {
      type = 'PAID_TICKET';
    }
    // 5. Debuts & New Shinies
    else if (
      id.includes('debut') ||
      text.includes('debut') ||
      text.includes('new shiny') ||
      text.includes('save shadow')
    ) {
      type = 'DEBUTS';
    }
    // 6. Eggs / Hatching
    else if (
      id.includes('egg') ||
      id.includes('hatch') ||
      text.includes('egg') ||
      text.includes('hatch') ||
      text.includes('vejce') ||
      text.includes('líhnutí')
    ) {
      type = 'EGGS';
      const distMatch = text.match(/(\d+)\s*km/i);
      if (distMatch) {
        metadata.eggDistance = distMatch[0];
      }
    }
    // 7. Raids (Tiers & Megas)
    else if (
      id.includes('raid') ||
      text.includes('raid') ||
      text.includes('mega raid') ||
      text.includes('shadow raid')
    ) {
      type = 'RAIDS';
      if (text.includes('1-star') || text.includes('1 star') || text.includes('1*')) metadata.tier = '1';
      else if (text.includes('3-star') || text.includes('3 star') || text.includes('3*')) metadata.tier = '3';
      else if (text.includes('5-star') || text.includes('5 star') || text.includes('5*') || text.includes('legendary')) metadata.tier = '5';
      else if (text.includes('mega')) metadata.tier = 'mega';
      else if (text.includes('shadow')) metadata.tier = 'shadow';
      else if (text.includes('primal')) metadata.tier = 'primal';
      else if (text.includes('max') || text.includes('dynamax') || text.includes('gigantamax')) metadata.tier = 'dynamax';
    }
    // 8. Field & Timed Research
    else if (
      id.includes('field-research') ||
      text.includes('field research') ||
      text.includes('výzkum')
    ) {
      type = 'RESEARCH_FIELD';
    } else if (
      id.includes('timed-research') ||
      id.includes('special-research') ||
      text.includes('timed research') ||
      text.includes('special research') ||
      text.includes('časově omezený')
    ) {
      type = 'RESEARCH_TIMED';
    }
    // 9. PokéStop Showcases
    else if (
      id.includes('showcase') ||
      text.includes('showcase') ||
      text.includes('soutěž')
    ) {
      type = 'SHOWCASES';
    }
    // 10. General Bonuses
    else if (
      id.includes('bonus') ||
      text.includes('bonus') ||
      text.includes('event bonus') ||
      text.includes('bonusy')
    ) {
      type = 'BONUSES';
    }
    // 11. Wild Spawns / Encounters
    else if (
      id.includes('spawn') ||
      id.includes('wild') ||
      id.includes('encounter') ||
      text.includes('wild encounter') ||
      text.includes('spawns') ||
      text.includes('divocí pokémoni')
    ) {
      type = 'SPAWNS_WILD';
    }

    if (type !== 'UNKNOWN' || sectionElements.length > 0) {
      sections.push({
        type,
        headingText: text,
        headingId: id,
        elements: sectionElements,
        metadata
      });
    }
  });

  return sections;
}

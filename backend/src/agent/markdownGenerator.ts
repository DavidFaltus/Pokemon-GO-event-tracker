import { EventData, ScrapedRaidBoss, EnrichedResearchTask, EnrichedEggGroup, SpecialEventDetails } from '../types';

export type AgentLanguage = 'cs' | 'en';

/**
 * Format events list into clean, token-efficient Markdown for AI agents and LLMs.
 */
export function generateEventsMarkdown(
  events: EventData[],
  lang: AgentLanguage = 'cs',
  getDetails?: (eventId: string) => SpecialEventDetails | null
): string {
  const isCs = lang === 'cs';
  const now = new Date();

  const active = events.filter(e => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    return start <= now && now <= end;
  });

  const upcoming = events.filter(e => {
    const start = new Date(e.start);
    return start > now;
  });

  let md = `# ${isCs ? 'Pokémon GO — Přehled Událostí' : 'Pokémon GO — Events Overview'}\n\n`;
  md += `> ${isCs ? 'Zdroj dat' : 'Data source'}: [pogoevents.app](https://pogoevents.app/${lang}/events) | ${isCs ? 'Aktualizováno' : 'Updated'}: ${now.toISOString()}\n\n`;

  // Active Events
  md += `## 🟢 ${isCs ? 'Právě aktivní události' : 'Active Events Now'} (${active.length})\n\n`;
  if (active.length === 0) {
    md += `_${isCs ? 'Momentálně neprobíhá žádná speciální událost.' : 'No special events active right now.'}_\n\n`;
  } else {
    for (const ev of active) {
      const details = getDetails ? getDetails(ev.eventID) : null;
      md += `### ${ev.name}\n`;
      md += `- **${isCs ? 'Trvání' : 'Duration'}**: ${ev.start} ➔ ${ev.end}\n`;
      md += `- **${isCs ? 'Typ' : 'Type'}**: ${ev.eventType || 'Event'}\n`;
      if (ev.heading) {
        md += `- **${isCs ? 'Popis' : 'Summary'}**: ${ev.heading}\n`;
      }
      if (details?.bonuses && details.bonuses.length > 0) {
        md += `- **${isCs ? 'Bonusy' : 'Bonuses'}**:\n`;
        for (const b of details.bonuses) {
          const bText = isCs ? (b.text.cs || b.text.en) : b.text.en;
          md += `  - ${bText}\n`;
        }
      }
      md += `- **URL**: https://pogoevents.app/${lang}/events/${ev.eventID}\n\n`;
    }
  }

  // Upcoming Events
  md += `## ⏳ ${isCs ? 'Nadcházející události' : 'Upcoming Events'} (${upcoming.length})\n\n`;
  if (upcoming.length === 0) {
    md += `_${isCs ? 'Žádné ohlášené nadcházející události.' : 'No upcoming events announced.'}_\n\n`;
  } else {
    for (const ev of upcoming.slice(0, 15)) {
      md += `### ${ev.name}\n`;
      md += `- **${isCs ? 'Začátek' : 'Starts'}**: ${ev.start} | **${isCs ? 'Konec' : 'Ends'}**: ${ev.end}\n`;
      md += `- **${isCs ? 'Typ' : 'Type'}**: ${ev.eventType || 'Event'}\n`;
      if (ev.heading) {
        md += `- **${isCs ? 'Popis' : 'Summary'}**: ${ev.heading}\n`;
      }
      md += `- **URL**: https://pogoevents.app/${lang}/events/${ev.eventID}\n\n`;
    }
  }

  return md;
}

/**
 * Format raid bosses and counters into clean Markdown.
 */
export function generateRaidsMarkdown(raids: ScrapedRaidBoss[], lang: AgentLanguage = 'cs'): string {
  const isCs = lang === 'cs';
  let md = `# ${isCs ? 'Pokémon GO — Aktuální Raid Bossi & Counters' : 'Pokémon GO — Current Raid Bosses & Counters'}\n\n`;
  md += `> ${isCs ? 'Zdroj' : 'Source'}: [pogoevents.app](https://pogoevents.app/${lang}/raids) | ${new Date().toISOString()}\n\n`;

  const tiers: ('5' | 'mega' | 'shadow-5' | '3' | 'shadow-3' | '1' | 'shadow-1')[] = [
    'mega', '5', 'shadow-5', '3', 'shadow-3', '1', 'shadow-1'
  ];
  const tierLabels: Record<string, string> = {
    '5': 'Tier 5 (Legendary Raids)',
    'mega': 'Mega Raids',
    'shadow-5': 'Shadow 5-Star Raids',
    '3': 'Tier 3 Raids',
    'shadow-3': 'Shadow 3-Star Raids',
    '1': 'Tier 1 Raids',
    'shadow-1': 'Shadow 1-Star Raids'
  };

  for (const tier of tiers) {
    const bossesInTier = raids.filter(r => r.tier === tier);
    if (bossesInTier.length === 0) continue;

    md += `## ${tierLabels[tier] || `Tier ${tier}`}\n\n`;
    for (const boss of bossesInTier) {
      md += `### ${boss.name} ${boss.canBeShiny ? '✨ (Shiny Available)' : ''}\n`;
      if (boss.types && boss.types.length > 0) {
        md += `- **${isCs ? 'Typy' : 'Types'}**: ${boss.types.join(' / ')}\n`;
      }
      if (boss.cpRange) {
        md += `- **100% IV (Lvl 20)**: ${boss.cpRange} CP\n`;
      }
      if (boss.boostedCpRange) {
        md += `- **100% IV Weather Boost (Lvl 25)**: ${boss.boostedCpRange} CP\n`;
      }
      if (boss.playersRecommended || boss.difficultyTier) {
        const players = boss.playersRecommended || (isCs ? 'Skupina' : 'Group');
        const diffTier = boss.difficultyTier || '';
        md += `- **${isCs ? 'Obtížnost' : 'Difficulty'}**: ${players} (${diffTier})\n`;
      }
      if (boss.counters) {
        const cList = [
          ...(boss.counters.megaCounters || []).slice(0, 2),
          ...(boss.counters.advancedCounters || []).slice(0, 4)
        ];
        if (cList.length > 0) {
          md += `- **${isCs ? 'Doporučené countery' : 'Top Counters'}**:\n`;
          for (const cName of cList) {
            md += `  - **${cName}**\n`;
          }
        }
      }
      md += `\n`;
    }
  }

  return md;
}

/**
 * Format field research tasks into clean Markdown.
 */
export function generateResearchMarkdown(tasks: EnrichedResearchTask[], lang: AgentLanguage = 'cs'): string {
  const isCs = lang === 'cs';
  let md = `# ${isCs ? 'Pokémon GO — Polní Výzkumy & Odměny' : 'Pokémon GO — Field Research Tasks & Rewards'}\n\n`;
  md += `> ${isCs ? 'Zdroj' : 'Source'}: [pogoevents.app](https://pogoevents.app/${lang}/research) | ${new Date().toISOString()}\n\n`;

  const categories = ['catch', 'throw', 'raid', 'buddy', 'power_up', 'spin', 'misc'] as const;
  const categoryLabels: Record<string, string> = {
    catch: isCs ? 'Chytání Pokémonů' : 'Catching Pokémon',
    throw: isCs ? 'Házení Pokéballů' : 'Throwing Pokeballs',
    raid: isCs ? 'Raidy & Boje' : 'Raids & Battles',
    buddy: isCs ? 'Parťák & Přátelé' : 'Buddy & Friendship',
    power_up: isCs ? 'Vylepšování & Vývoj' : 'Power Up & Evolve',
    spin: isCs ? 'Pokéstopy' : 'PokéStops',
    misc: isCs ? 'Ostatní úkoly' : 'Miscellaneous'
  };

  for (const cat of categories) {
    const tasksInCat = tasks.filter(t => t.category === cat);
    if (tasksInCat.length === 0) continue;

    md += `## ${categoryLabels[cat] || cat}\n\n`;
    for (const item of tasksInCat) {
      const taskText = isCs ? (item.task.cs || item.task.en) : item.task.en;
      const rewardsStr = (item.rewards || []).map(r => {
        const shiny = r.canBeShiny ? ' ✨' : '';
        const cp = (r.minCp && r.maxCp) ? ` (${r.minCp}-${r.maxCp} CP)` : '';
        const qty = r.amount ? ` ×${r.amount}` : '';
        return `${r.name}${qty}${shiny}${cp}`;
      }).join(', ');

      md += `- **${taskText}** ➔ ${rewardsStr || 'Item/Encounter'}\n`;
    }
    md += `\n`;
  }

  return md;
}

/**
 * Format complete live summary of Pokémon GO state.
 */
export function generateSummaryMarkdown(
  events: EventData[],
  raids: ScrapedRaidBoss[],
  rocket: any,
  eggs: EnrichedEggGroup[],
  research: EnrichedResearchTask[],
  lang: AgentLanguage = 'cs'
): string {
  const isCs = lang === 'cs';
  let md = `# Pokémon GO — ${isCs ? 'Aktuální Stav & Souhrn' : 'Live Status & Summary'}\n\n`;
  md += `> [pogoevents.app](https://pogoevents.app/${lang}) — Generated for LLM / AI Agents at ${new Date().toISOString()}\n\n`;

  // Events
  md += `## 1. ${isCs ? 'Aktivní Události' : 'Active Events'}\n`;
  const activeEvents = events.filter(e => {
    const now = new Date();
    return new Date(e.start) <= now && now <= new Date(e.end);
  });
  if (activeEvents.length === 0) {
    md += `- ${isCs ? 'Žádné speciální události neprobíhají.' : 'No special events active.'}\n`;
  } else {
    for (const e of activeEvents) {
      md += `- **${e.name}** (do ${e.end}): ${e.heading || ''}\n`;
    }
  }
  md += `\n`;

  // Raids
  md += `## 2. ${isCs ? 'Top Raid Bossi' : 'Current Top Raid Bosses'}\n`;
  const topRaids = raids.filter(r => ['5', 'mega', 'shadow-5'].includes(r.tier));
  for (const r of topRaids) {
    md += `- **${r.name}** [Tier ${r.tier}] ${r.canBeShiny ? '✨' : ''}: CP ${r.cpRange || 'N/A'}\n`;
  }
  md += `\n`;

  // Giovanni / Rocket
  if (rocket?.giovanni) {
    md += `## 3. Team GO Rocket (Giovanni)\n`;
    md += `- **Giovanni Shadow Pokémon**: ${rocket.giovanni.reward?.name || 'Shadow Pokémon'}\n\n`;
  }

  // Eggs
  if (eggs && eggs.length > 0) {
    md += `## 4. ${isCs ? 'Vejce' : 'Egg Pools'}\n`;
    for (const group of eggs) {
      const pokemonList = (group.eggs || []).map(e => `${e.name}${e.canBeShiny ? '✨' : ''}`).slice(0, 6).join(', ');
      md += `- **${group.distance}**: ${pokemonList}${group.eggs.length > 6 ? ', ...' : ''}\n`;
    }
    md += `\n`;
  }

  return md;
}

import { EventData, ScrapedRaidBoss, EnrichedResearchTask, EnrichedEggGroup, SpecialEventDetails } from '../types';

export type AgentLanguage = 'cs' | 'en' | 'ja' | 'ru';

function t(dict: Record<AgentLanguage, string>, lang: AgentLanguage): string {
  return dict[lang] || dict.en || dict.cs;
}

function getLocalizedText(obj: any, lang: AgentLanguage): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.en || obj.cs || '';
}

/**
 * Format events list into clean, token-efficient Markdown for AI agents and LLMs.
 */
export function generateEventsMarkdown(
  events: EventData[],
  lang: AgentLanguage = 'cs',
  getDetails?: (eventId: string) => SpecialEventDetails | null
): string {
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

  const titleByLang: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Přehled Událostí',
    en: 'Pokémon GO — Events Overview',
    ja: 'Pokémon GO — イベント一覧',
    ru: 'Pokémon GO — Обзор событий',
  };

  const sourceByLang: Record<AgentLanguage, string> = {
    cs: 'Zdroj dat',
    en: 'Data source',
    ja: '情報元',
    ru: 'Источник данных',
  };

  const updatedByLang: Record<AgentLanguage, string> = {
    cs: 'Aktualizováno',
    en: 'Updated',
    ja: '更新日時',
    ru: 'Обновлено',
  };

  let md = `# ${t(titleByLang, lang)}\n\n`;
  md += `> ${t(sourceByLang, lang)}: [pogoevents.app](https://pogoevents.app/${lang}) | ${t(updatedByLang, lang)}: ${now.toISOString()}\n\n`;

  // Active Events
  const activeHeader: Record<AgentLanguage, string> = {
    cs: 'Právě aktivní události',
    en: 'Active Events Now',
    ja: '現在開催中のイベント',
    ru: 'Текущие активные события',
  };
  md += `## 🟢 ${t(activeHeader, lang)} (${active.length})\n\n`;

  if (active.length === 0) {
    const noActive: Record<AgentLanguage, string> = {
      cs: 'Momentálně neprobíhá žádná speciální událost.',
      en: 'No special events active right now.',
      ja: '現在開催中の特別イベントはありません。',
      ru: 'В данный момент нет активных специальных событий.',
    };
    md += `_${t(noActive, lang)}_\n\n`;
  } else {
    for (const ev of active) {
      const details = getDetails ? getDetails(ev.eventID) : null;
      md += `### ${ev.name}\n`;
      md += `- **${lang === 'cs' ? 'Trvání' : lang === 'ja' ? '期間' : lang === 'ru' ? 'Длительность' : 'Duration'}**: ${ev.start} ➔ ${ev.end}\n`;
      md += `- **${lang === 'cs' ? 'Typ' : lang === 'ja' ? '種別' : lang === 'ru' ? 'Тип' : 'Type'}**: ${ev.eventType || 'Event'}\n`;
      if (ev.heading) {
        md += `- **${lang === 'cs' ? 'Popis' : lang === 'ja' ? '概要' : lang === 'ru' ? 'Описание' : 'Summary'}**: ${ev.heading}\n`;
      }
      if (details?.bonuses && details.bonuses.length > 0) {
        md += `- **${lang === 'cs' ? 'Bonusy' : lang === 'ja' ? 'ボーナス' : lang === 'ru' ? 'Бонусы' : 'Bonuses'}**:\n`;
        for (const b of details.bonuses) {
          const bText = getLocalizedText(b.text, lang);
          md += `  - ${bText}\n`;
        }
      }
      if (details?.spawns && details.spawns.length > 0) {
        md += `- **${lang === 'cs' ? 'Výskyty (Spawns)' : lang === 'ja' ? '野生出現' : lang === 'ru' ? 'Спавны' : 'Wild Spawns'}**: ${details.spawns.map(s => `${s.name}${s.isShinyAvailable ? ' ✨' : ''}`).join(', ')}\n`;
      }
      md += `- **URL**: https://pogoevents.app/${lang}/events/${ev.eventID}\n\n`;
    }
  }

  // Upcoming Events
  const upcomingHeader: Record<AgentLanguage, string> = {
    cs: 'Nadcházející události',
    en: 'Upcoming Events',
    ja: '近日開催のイベント',
    ru: 'Предстоящие события',
  };
  md += `## ⏳ ${t(upcomingHeader, lang)} (${upcoming.length})\n\n`;
  if (upcoming.length === 0) {
    const noUpcoming: Record<AgentLanguage, string> = {
      cs: 'Žádné ohlášené nadcházející události.',
      en: 'No upcoming events announced.',
      ja: '告知されている今後のイベントはありません。',
      ru: 'Нет объявленных предстоящих событий.',
    };
    md += `_${t(noUpcoming, lang)}_\n\n`;
  } else {
    for (const ev of upcoming.slice(0, 15)) {
      const details = getDetails ? getDetails(ev.eventID) : null;
      md += `### ${ev.name}\n`;
      md += `- **${lang === 'cs' ? 'Začátek' : lang === 'ja' ? '開始' : lang === 'ru' ? 'Начало' : 'Starts'}**: ${ev.start} | **${lang === 'cs' ? 'Konec' : lang === 'ja' ? '終了' : lang === 'ru' ? 'Конец' : 'Ends'}**: ${ev.end}\n`;
      md += `- **${lang === 'cs' ? 'Typ' : lang === 'ja' ? '種別' : lang === 'ru' ? 'Тип' : 'Type'}**: ${ev.eventType || 'Event'}\n`;
      if (ev.heading) {
        md += `- **${lang === 'cs' ? 'Popis' : lang === 'ja' ? '概要' : lang === 'ru' ? 'Описание' : 'Summary'}**: ${ev.heading}\n`;
      }
      if (details?.bonuses && details.bonuses.length > 0) {
        md += `- **${lang === 'cs' ? 'Bonusy' : lang === 'ja' ? 'ボーナス' : lang === 'ru' ? 'Бонусы' : 'Bonuses'}**:\n`;
        for (const b of details.bonuses) {
          const bText = getLocalizedText(b.text, lang);
          md += `  - ${bText}\n`;
        }
      }
      md += `- **URL**: https://pogoevents.app/${lang}/events/${ev.eventID}\n\n`;
    }
  }

  return md;
}

/**
 * Format a single event into detailed Markdown for /api/agent/events/:id.md
 */
export function generateSingleEventMarkdown(
  ev: EventData,
  details: SpecialEventDetails | null,
  lang: AgentLanguage = 'cs'
): string {
  const isCs = lang === 'cs';
  let md = `# ${ev.name} — Pokémon GO Event\n\n`;
  md += `> ${lang === 'cs' ? 'Zdroj' : lang === 'ja' ? '情報元' : lang === 'ru' ? 'Источник' : 'Source'}: [pogoevents.app](https://pogoevents.app/${lang}/events/${ev.eventID})\n\n`;
  md += `- **${lang === 'cs' ? 'Začátek' : lang === 'ja' ? '開始' : lang === 'ru' ? 'Начало' : 'Start'}**: ${ev.start}\n`;
  md += `- **${lang === 'cs' ? 'Konec' : lang === 'ja' ? '終了' : lang === 'ru' ? 'Конец' : 'End'}**: ${ev.end}\n`;
  md += `- **${lang === 'cs' ? 'Typ události' : lang === 'ja' ? 'イベント種別' : lang === 'ru' ? 'Тип события' : 'Event Type'}**: ${ev.eventType || 'Event'}\n`;
  if (ev.heading) {
    md += `- **${lang === 'cs' ? 'Shrnutí' : lang === 'ja' ? '概要' : lang === 'ru' ? 'Описание' : 'Heading'}**: ${ev.heading}\n`;
  }
  md += `\n`;

  if (details?.bonuses && details.bonuses.length > 0) {
    md += `## ${lang === 'cs' ? 'Aktivní Bonusy' : lang === 'ja' ? 'イベントボーナス' : lang === 'ru' ? 'Активные бонусы' : 'Event Bonuses'}\n\n`;
    for (const b of details.bonuses) {
      const bText = getLocalizedText(b.text, lang);
      md += `- ${bText}\n`;
    }
    md += `\n`;
  }

  if (details?.spawns && details.spawns.length > 0) {
    md += `## ${lang === 'cs' ? 'Výskyty v divočině (Wild Spawns)' : lang === 'ja' ? '野生出現' : lang === 'ru' ? 'Спавны в дикой природе' : 'Wild Spawns'}\n\n`;
    md += details.spawns.map(s => `- **${s.name}**${s.isShinyAvailable ? ' ✨ (Shiny available)' : ''}`).join('\n') + `\n\n`;
  }

  if (details?.eggs && details.eggs.length > 0) {
    md += `## ${lang === 'cs' ? 'Líhnutí z vajec' : lang === 'ja' ? 'タマゴ孵化' : lang === 'ru' ? 'Высиживание яиц' : 'Event Egg Hatches'}\n\n`;
    for (const eg of details.eggs) {
      md += `- **${eg.distance}**: ${(eg.contents || []).map(c => `${c.name}${c.isShinyAvailable ? ' ✨' : ''}`).join(', ')}\n`;
    }
    md += `\n`;
  }

  if (details?.research && details.research.length > 0) {
    md += `## ${lang === 'cs' ? 'Polní výzkum (Field Research)' : lang === 'ja' ? 'フィールドリサーチ' : lang === 'ru' ? 'Полевые исследования' : 'Event Field Research'}\n\n`;
    for (const r of details.research) {
      const taskText = getLocalizedText(r.task, lang);
      md += `- **${taskText}** ➔ ${r.reward}${r.isShinyAvailable ? ' ✨' : ''}\n`;
    }
    md += `\n`;
  }

  return md;
}

/**
 * Format raid bosses and counters into clean Markdown.
 */
export function generateRaidsMarkdown(raids: ScrapedRaidBoss[], lang: AgentLanguage = 'cs'): string {
  const titles: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Aktuální Raid Bossi & Counters',
    en: 'Pokémon GO — Current Raid Bosses & Counters',
    ja: 'Pokémon GO — 現在のレイドボス＆対策ポケモン',
    ru: 'Pokémon GO — Текущие Рейд-боссы и контр-покемоны',
  };
  const sourceLabel: Record<AgentLanguage, string> = {
    cs: 'Zdroj',
    en: 'Source',
    ja: '情報元',
    ru: 'Источник',
  };

  let md = `# ${t(titles, lang)}\n\n`;
  md += `> ${t(sourceLabel, lang)}: [pogoevents.app](https://pogoevents.app/${lang}/raids) | ${new Date().toISOString()}\n\n`;

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
        md += `- **${lang === 'cs' ? 'Typy' : lang === 'ja' ? 'タイプ' : lang === 'ru' ? 'Типы' : 'Types'}**: ${boss.types.join(' / ')}\n`;
      }
      if (boss.cpRange) {
        md += `- **100% IV (Lvl 20)**: ${boss.cpRange} CP\n`;
      }
      if (boss.boostedCpRange) {
        md += `- **100% IV Weather Boost (Lvl 25)**: ${boss.boostedCpRange} CP\n`;
      }
      if (boss.playersRecommended || boss.difficultyTier) {
        const players = boss.playersRecommended || (lang === 'cs' ? 'Skupina' : lang === 'ja' ? 'グループ' : lang === 'ru' ? 'Группа' : 'Group');
        const diffTier = boss.difficultyTier || '';
        md += `- **${lang === 'cs' ? 'Obtížnost' : lang === 'ja' ? '難易度' : lang === 'ru' ? 'Сложность' : 'Difficulty'}**: ${players} (${diffTier})\n`;
      }
      if (boss.counters) {
        const cList = [
          ...(boss.counters.megaCounters || []).slice(0, 2),
          ...(boss.counters.advancedCounters || []).slice(0, 4)
        ];
        if (cList.length > 0) {
          md += `- **${lang === 'cs' ? 'Doporučené countery' : lang === 'ja' ? 'おすすめ対策ポケモン' : lang === 'ru' ? 'Лучшие контр-покемоны' : 'Top Counters'}**:\n`;
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
  const titles: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Polní Výzkumy & Odměny',
    en: 'Pokémon GO — Field Research Tasks & Rewards',
    ja: 'Pokémon GO — フィールドリサーチタスク＆報酬',
    ru: 'Pokémon GO — Полевые исследования и награды',
  };
  const sourceLabel: Record<AgentLanguage, string> = {
    cs: 'Zdroj',
    en: 'Source',
    ja: '情報元',
    ru: 'Источник',
  };

  let md = `# ${t(titles, lang)}\n\n`;
  md += `> ${t(sourceLabel, lang)}: [pogoevents.app](https://pogoevents.app/${lang}/guides/field-research-tasks-guide) | ${new Date().toISOString()}\n\n`;

  const categories = ['catch', 'throw', 'raid', 'buddy', 'power_up', 'spin', 'misc'] as const;
  const categoryLabels: Record<string, Record<AgentLanguage, string>> = {
    catch: { cs: 'Chytání Pokémonů', en: 'Catching Pokémon', ja: 'ポケモン捕獲', ru: 'Ловля покемонов' },
    throw: { cs: 'Házení Pokéballů', en: 'Throwing Pokeballs', ja: 'ボール投げ', ru: 'Броски покеболов' },
    raid: { cs: 'Raidy & Boje', en: 'Raids & Battles', ja: 'レイド＆バトル', ru: 'Рейды и битвы' },
    buddy: { cs: 'Parťák & Přátelé', en: 'Buddy & Friendship', ja: '相棒＆フレンド', ru: 'Бадди и друзья' },
    power_up: { cs: 'Vylepšování & Vývoj', en: 'Power Up & Evolve', ja: '強化＆進化', ru: 'Усиление и эволюция' },
    spin: { cs: 'Pokéstopy', en: 'PokéStops', ja: 'ポケストップ', ru: 'Покестопы' },
    misc: { cs: 'Ostatní úkoly', en: 'Miscellaneous', ja: 'その他', ru: 'Разное' }
  };

  for (const cat of categories) {
    const tasksInCat = tasks.filter(t => t.category === cat);
    if (tasksInCat.length === 0) continue;

    const catLabel = categoryLabels[cat] ? t(categoryLabels[cat], lang) : cat;
    md += `## ${catLabel}\n\n`;
    for (const item of tasksInCat) {
      const taskText = getLocalizedText(item.task, lang);
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
 * Format egg hatch pools into clean Markdown for /api/agent/eggs.md
 */
export function generateEggsMarkdown(eggs: EnrichedEggGroup[], lang: AgentLanguage = 'cs'): string {
  const titles: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Líhnutí z vajec (Egg Hatch Pools)',
    en: 'Pokémon GO — Egg Hatch Pools (2km, 5km, 7km, 10km, 12km)',
    ja: 'Pokémon GO — タマゴ孵化一覧 (2km, 5km, 7km, 10km, 12km)',
    ru: 'Pokémon GO — Высиживание яиц (2км, 5км, 7км, 10км, 12км)',
  };
  const sourceLabel: Record<AgentLanguage, string> = {
    cs: 'Zdroj',
    en: 'Source',
    ja: '情報元',
    ru: 'Источник',
  };

  let md = `# ${t(titles, lang)}\n\n`;
  md += `> ${t(sourceLabel, lang)}: [pogoevents.app](https://pogoevents.app/${lang}/guides/egg-hatching-guide) | ${new Date().toISOString()}\n\n`;

  if (!eggs || eggs.length === 0) {
    const noEggs: Record<AgentLanguage, string> = {
      cs: 'Data o vejcích nejsou momentálně k dispozici.',
      en: 'Egg pool data is currently unavailable.',
      ja: 'タマゴデータは現在利用できません。',
      ru: 'Данные о яйцах в настоящее время недоступны.',
    };
    md += `_${t(noEggs, lang)}_\n`;
    return md;
  }

  for (const group of eggs) {
    md += `## 🥚 ${group.distance}\n\n`;
    for (const poke of group.eggs || []) {
      const shiny = poke.canBeShiny ? ' ✨' : '';
      const cp = (poke.minCp && poke.maxCp) ? ` (CP: ${poke.minCp}–${poke.maxCp})` : '';
      const rarity = poke.rarity ? ` [Tier ${poke.rarity}]` : '';
      md += `- **${poke.name}**${shiny}${cp}${rarity}\n`;
    }
    md += `\n`;
  }

  return md;
}

/**
 * Format Team GO Rocket lineups (Giovanni, Cliff, Sierra, Arlo, Grunts) into clean Markdown for /api/agent/rocket.md
 */
export function generateRocketMarkdown(rocket: any, lang: AgentLanguage = 'cs'): string {
  const titles: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Team GO Rocket Sestavy & Counters',
    en: 'Pokémon GO — Team GO Rocket Lineups & Counters',
    ja: 'Pokémon GO — GOロケット団 手持ち＆対策',
    ru: 'Pokémon GO — Команда GO Rocket Составы и контр-покемоны',
  };
  const sourceLabel: Record<AgentLanguage, string> = {
    cs: 'Zdroj',
    en: 'Source',
    ja: '情報元',
    ru: 'Источник',
  };

  let md = `# ${t(titles, lang)}\n\n`;
  md += `> ${t(sourceLabel, lang)}: [pogoevents.app](https://pogoevents.app/${lang}/rocket) | ${new Date().toISOString()}\n\n`;

  if (!rocket) {
    const noRocket: Record<AgentLanguage, string> = {
      cs: 'Data o Team GO Rocket nejsou k dispozici.',
      en: 'Team GO Rocket data is currently unavailable.',
      ja: 'GOロケット団データは現在利用できません。',
      ru: 'Данные о Команде GO Rocket недоступны.',
    };
    md += `_${t(noRocket, lang)}_\n`;
    return md;
  }

  const formatMember = (m: any) => {
    let block = `### ${m.name} (${m.title || 'Leader'})\n`;
    if (m.reward?.name) {
      const rewardLabel = lang === 'cs' ? 'Shadow Odměna' : lang === 'ja' ? 'シャドウ報酬' : lang === 'ru' ? 'Теневая награда' : 'Shadow Reward';
      block += `- **${rewardLabel}**: ${m.reward.name}${m.reward.canBeShiny ? ' ✨' : ''}\n`;
    }
    if (m.lineup) {
      const s1 = (m.lineup.slot1 || []).map((p: any) => `${p.name} (Counters: ${(p.counters || []).join(', ') || 'Fighting/Fast'})`).join(' / ');
      const s2 = (m.lineup.slot2 || []).map((p: any) => p.name).join(' / ');
      const s3 = (m.lineup.slot3 || []).map((p: any) => p.name).join(' / ');
      block += `- **Slot 1**: ${s1}\n`;
      block += `- **Slot 2**: ${s2}\n`;
      block += `- **Slot 3**: ${s3}\n`;
    }
    block += `\n`;
    return block;
  };

  if (rocket.giovanni) {
    md += `## 👑 Boss Giovanni\n\n`;
    md += formatMember(rocket.giovanni);
  }

  if (Array.isArray(rocket.leaders) && rocket.leaders.length > 0) {
    md += `## 🛡️ Team GO Rocket Leaders\n\n`;
    for (const leader of rocket.leaders) {
      md += formatMember(leader);
    }
  }

  if (Array.isArray(rocket.grunts) && rocket.grunts.length > 0) {
    md += `## 👥 Team GO Rocket Grunts\n\n`;
    for (const g of rocket.grunts) {
      let phrase = '';
      if (lang === 'cs') {
        phrase = g.phraseCs || g.phrase || g.phraseEn || '';
      } else if (lang === 'ja') {
        phrase = g.phraseJa || g.phraseEn || g.phrase || '';
      } else if (lang === 'ru') {
        phrase = g.phraseRu || g.phraseEn || g.phrase || '';
      } else {
        phrase = g.phraseEn || g.phrase || g.phraseCs || '';
      }
      const tier1 = g.lineup?.slot1 || g.shadowPokemon || [];
      md += `- **"${phrase}"** (${g.type}): ${tier1.join(', ')}\n`;
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
  const titles: Record<AgentLanguage, string> = {
    cs: 'Pokémon GO — Aktuální Stav & Souhrn',
    en: 'Pokémon GO — Live Status & Summary',
    ja: 'Pokémon GO — 最新状況サマリー',
    ru: 'Pokémon GO — Текущий статус и сводка',
  };

  let md = `# ${t(titles, lang)}\n\n`;
  md += `> [pogoevents.app](https://pogoevents.app/${lang}) — Generated for LLM / AI Agents at ${new Date().toISOString()}\n\n`;

  // Events
  const eventsSec: Record<AgentLanguage, string> = {
    cs: 'Aktivní Události',
    en: 'Active Events',
    ja: '開催中のイベント',
    ru: 'Активные события',
  };
  md += `## 1. ${t(eventsSec, lang)}\n`;
  const activeEvents = events.filter(e => {
    const now = new Date();
    return new Date(e.start) <= now && now <= new Date(e.end);
  });
  if (activeEvents.length === 0) {
    md += `- ${lang === 'cs' ? 'Žádné speciální události neprobíhá.' : lang === 'ja' ? '現在開催中の特別イベントはありません。' : lang === 'ru' ? 'Нет активных событий.' : 'No special events active.'}\n`;
  } else {
    for (const e of activeEvents) {
      md += `- **${e.name}** (do ${e.end}): ${e.heading || ''}\n`;
    }
  }
  md += `\n`;

  // Raids
  const raidsSec: Record<AgentLanguage, string> = {
    cs: 'Top Raid Bossi',
    en: 'Current Top Raid Bosses',
    ja: '主要レイドボス',
    ru: 'Основные рейд-боссы',
  };
  md += `## 2. ${t(raidsSec, lang)}\n`;
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
    const eggsSec: Record<AgentLanguage, string> = {
      cs: 'Vejce',
      en: 'Egg Pools',
      ja: 'タマゴ孵化',
      ru: 'Высиживание яиц',
    };
    md += `## 4. ${t(eggsSec, lang)}\n`;
    for (const group of eggs) {
      const pokemonList = (group.eggs || []).map(e => `${e.name}${e.canBeShiny ? '✨' : ''}`).slice(0, 6).join(', ');
      md += `- **${group.distance}**: ${pokemonList}${group.eggs.length > 6 ? ', ...' : ''}\n`;
    }
    md += `\n`;
  }

  return md;
}


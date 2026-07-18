import { EventData, SpecialEventDetails, ScrapedRaidBoss, RocketMember } from './types';

interface BotTranslations {
  title: string;
  description: string;
  h1: string;
  intro: string;
  events: string;
  raids: string;
  rocket: string;
  active: string;
  upcoming: string;
  ends: string;
  starts: string;
  noEvents: string;
  noRaids: string;
  noRocket: string;
  bonuses: string;
  debuts: string;
  spawns: string;
  eggs: string;
  research: string;
  counters: string;
  weaknesses: string;
  shinyAvailable: string;
  reward: string;
  worthGrinding: string;
  lineup: string;
}

const botTranslations: Record<'cs' | 'en' | 'ja' | 'ru', BotTranslations> = {
  en: {
    title: "Pokémon GO Event Tracker - Active & Upcoming Events",
    description: "Track active and upcoming Pokémon GO events, raid bosses, Team GO Rocket lineups, eggs, and more in real time.",
    h1: "Pokémon GO Event Tracker",
    intro: "Welcome to the ultimate Pokémon GO Event Tracker. Here you will find live information about current and upcoming in-game events, raid bosses, and Team GO Rocket battles.",
    events: "Active & Upcoming Events",
    raids: "Current Raid Bosses",
    rocket: "Team GO Rocket Lineups",
    active: "Active",
    upcoming: "Upcoming",
    ends: "Ends",
    starts: "Starts",
    noEvents: "No events active or upcoming.",
    noRaids: "No raid boss information available.",
    noRocket: "No Rocket lineup information available.",
    bonuses: "Event Bonuses",
    debuts: "Debuts & New Releases",
    spawns: "Wild Spawns",
    eggs: "Egg Hatches",
    research: "Field Research Tasks",
    counters: "Counters",
    weaknesses: "Weaknesses",
    shinyAvailable: "Shiny Available",
    reward: "Reward",
    worthGrinding: "Worth Grinding",
    lineup: "Lineup"
  },
  cs: {
    title: "Pokémon GO Event Tracker - Aktivní a nadcházející události",
    description: "Sledujte aktivní a nadcházející Pokémon GO události, raid bossy, sestavy Team GO Rocket, vejce a další v reálném čase.",
    h1: "Pokémon GO Event Tracker",
    intro: "Vítejte v přehledném sledovači událostí Pokémon GO. Najdete zde aktuální informace o probíhajících a nadcházejících herních událostech, raid bossech a soubojích s Rakeťáky.",
    events: "Aktivní a nadcházející události",
    raids: "Aktuální Raid Bossi",
    rocket: "Sestavy Team GO Rocket",
    active: "Aktivní",
    upcoming: "Nadcházející",
    ends: "Končí",
    starts: "Začíná",
    noEvents: "Žádné aktivní ani nadcházející události.",
    noRaids: "Žádné informace o raid bossech.",
    noRocket: "Žádné informace o sestavách Rakeťáků.",
    bonuses: "Eventové bonusy",
    debuts: "Debuty & Novinky",
    spawns: "Výskyt v divočině (Wild Spawns)",
    eggs: "Líhnutí z vajec (Eggs)",
    research: "Terénní výzkum (Field Research)",
    counters: "Doporučené protihráče (Counters)",
    weaknesses: "Slabosti",
    shinyAvailable: "Shiny možný",
    reward: "Odměna",
    worthGrinding: "Vyplatí se farmit",
    lineup: "Sestava"
  },
  ja: {
    title: "Pokémon GO イベントトラッカー - 開催中および予定されているイベント",
    description: "開催中および予定されているPokémon GOのイベント、レイドボス、GOロケット団の編成、タマゴなどをリアルタイムで追跡します。",
    h1: "Pokémon GO イベントトラッカー",
    intro: "究極のPokémon GOイベントトラッカーへようこそ。ここでは、現在開催中および今後のゲーム内イベント、レイドボス、ロケット団のバトルに関するライブ情報をご覧いただけます。",
    events: "開催中および予定されているイベント",
    raids: "現在のレイドボス",
    rocket: "GOロケット団 of メンバー",
    active: "開催中",
    upcoming: "まもなく開始",
    ends: "終了:",
    starts: "開始:",
    noEvents: "現在および今後のイベントはありません。",
    noRaids: "レイドボスの情報はありません。",
    noRocket: "ロケット団の情報はありません。",
    bonuses: "イベントボーナス",
    debuts: "新登場のポケモン",
    spawns: "野生での出現",
    eggs: "タマゴ孵化",
    research: "フィールドリサーチタスク",
    counters: "対策ポケモン",
    weaknesses: "弱点",
    shinyAvailable: "色違い出現の可能性あり",
    reward: "報酬",
    worthGrinding: "周回価値あり",
    lineup: "手持ちポケモン"
  },
  ru: {
    title: "Трекер событий Pokémon GO - Текущие и предстоящие события",
    description: "Отслеживайте текущие и предстоящие события Pokémon GO, боссов рейдов, составы Команды R, яйца и многое другое в реальном времени.",
    h1: "Трекер событий Pokémon GO",
    intro: "Добро пожаловать в трекер событий Pokémon GO. Здесь вы найдете актуальную информацию о текущих и предстоящих внутриигровых событиях, боссах рейдов и битвах с Командой R.",
    events: "Текущие и предстоящие события",
    raids: "Текущие боссы рейдов",
    rocket: "Составы Команды GO Rocket",
    active: "Активно",
    upcoming: "Предстоит",
    ends: "Заканчивается",
    starts: "Начинается",
    noEvents: "Нет активных или предстоящих событий.",
    noRaids: "Информация о боссах рейдов недоступна.",
    noRocket: "Информация о составах Команды R недоступна.",
    bonuses: "Бонусы события",
    debuts: "Дебюты и новые покемоны",
    spawns: "Покемоны в дикой природе",
    eggs: "Яйца",
    research: "Полевые исследования",
    counters: "Контр-покемоны",
    weaknesses: "Уязвимости",
    shinyAvailable: "Может быть сияющим",
    reward: "Награда",
    worthGrinding: "Стоит ловить",
    lineup: "Состав"
  }
};

export async function generateBotHtml(
  lang: 'cs' | 'en' | 'ja' | 'ru',
  events: any[],
  raids: any[],
  rocket: any,
  getDetails: (eventId: string) => SpecialEventDetails | null
): Promise<string> {
  const t = botTranslations[lang] || botTranslations.en;
  
  // Format current date
  const nowStr = new Date().toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // 1. Process Events
  const now = Date.now();
  const sortedEvents = [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  
  let eventsHtml = '';
  if (sortedEvents.length === 0) {
    eventsHtml = `<p>${t.noEvents}</p>`;
  } else {
    sortedEvents.forEach(event => {
      const startMs = new Date(event.start).getTime();
      const endMs = new Date(event.end).getTime();
      const isActive = now >= startMs && now <= endMs;
      const isUpcoming = now < startMs;
      
      // Skip ended events for bots
      if (now > endMs) return;

      const statusLabel = isActive ? t.active : t.upcoming;
      const timeLabel = isActive 
        ? `${t.ends}: ${new Date(event.end).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}`
        : `${t.starts}: ${new Date(event.start).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}`;

      eventsHtml += `
        <div class="event-card ${isActive ? 'active-card' : 'upcoming-card'}">
          <div class="event-header">
            <span class="event-status-badge">${statusLabel}</span>
            <span class="event-type">${event.eventType}</span>
          </div>
          <h3 class="event-title">${event.name}</h3>
          <p class="event-time">${timeLabel}</p>
          ${event.heading ? `<p class="event-summary"><em>${event.heading}</em></p>` : ''}
      `;

      // Embed special event details if available
      const details = getDetails(event.eventID);
      if (details) {
        eventsHtml += `<div class="event-details-section">`;

        // Debuts
        if (details.debuts && details.debuts.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.debuts}</h4>
              <ul>
                ${details.debuts.map(d => `
                  <li>
                    <strong>${d.name}</strong>: ${lang === 'cs' ? d.description.cs : d.description.en}
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        // Bonuses
        if (details.bonuses && details.bonuses.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.bonuses}</h4>
              <ul>
                ${details.bonuses.map(b => `
                  <li>
                    <span class="bonus-icon">${b.icon}</span> ${lang === 'cs' ? b.text.cs : b.text.en}
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        // Spawns
        if (details.spawns && details.spawns.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.spawns}</h4>
              <p>${details.spawns.map(s => `${s.name}${s.isShinyAvailable ? ' ✨' : ''}`).join(', ')}</p>
            </div>
          `;
        }

        // Eggs
        if (details.eggs && details.eggs.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.eggs}</h4>
              <ul>
                ${details.eggs.map(e => `
                  <li>
                    <strong>${e.distance}:</strong> ${e.contents.map(c => `${c.name}${c.isShinyAvailable ? ' ✨' : ''}`).join(', ')}
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        // Research
        if (details.research && details.research.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.research}</h4>
              <ul>
                ${details.research.map(r => `
                  <li>
                    <strong>${lang === 'cs' ? r.task.cs : r.task.en}</strong> &rarr; 
                    Odměna: ${r.reward}${r.isShinyAvailable ? ' ✨' : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        eventsHtml += `</div>`;
      }

      eventsHtml += `</div>`;
    });
  }

  // 2. Process Raids
  let raidsHtml = '';
  if (!raids || raids.length === 0) {
    raidsHtml = `<p>${t.noRaids}</p>`;
  } else {
    // Group bosses by tier
    const bossesByTier: Record<string, ScrapedRaidBoss[]> = {};
    raids.forEach((boss: ScrapedRaidBoss) => {
      const tier = boss.tier || 'Other';
      if (!bossesByTier[tier]) bossesByTier[tier] = [];
      bossesByTier[tier].push(boss);
    });

    const tierNames: Record<string, string> = {
      '5': lang === 'cs' ? '5-Star Raidy' : '5-Star Raids',
      'mega': lang === 'cs' ? 'Mega & Primal Raidy' : 'Mega & Primal Raids',
      '3': lang === 'cs' ? '3-Star Raidy' : '3-Star Raids',
      '1': lang === 'cs' ? '1-Star Raidy' : '1-Star Raids',
      'shadow-5': lang === 'cs' ? 'Shadow 5-Star Raidy' : 'Shadow 5-Star Raids',
      'shadow-3': lang === 'cs' ? 'Shadow 3-Star Raidy' : 'Shadow 3-Star Raids',
      'shadow-1': lang === 'cs' ? 'Shadow 1-Star Raidy' : 'Shadow 1-Star Raids'
    };

    const orderedTiers = ['mega', '5', 'shadow-5', '3', 'shadow-3', '1', 'shadow-1'];
    
    orderedTiers.forEach(tier => {
      const bosses = bossesByTier[tier];
      if (!bosses || bosses.length === 0) return;

      raidsHtml += `<h3>${tierNames[tier] || `${tier}-Star Raids`}</h3><div class="raid-grid">`;
      
      bosses.forEach(boss => {
        raidsHtml += `
          <div class="raid-card">
            <h4 class="boss-name">${boss.name} ${boss.canBeShiny ? '✨' : ''}</h4>
            ${boss.cpRange ? `<p class="cp-range">CP: <strong>${boss.cpRange}</strong> ${boss.boostedCpRange ? `(Weather: <strong>${boss.boostedCpRange}</strong>)` : ''}</p>` : ''}
        `;

        if (boss.counters) {
          raidsHtml += `
            <div class="boss-counters">
              <p><strong>${t.weaknesses}:</strong> ${boss.counters.weaknesses?.join(', ') || 'N/A'}</p>
              ${boss.counters.megaCounters?.length ? `<p><strong>Mega ${t.counters}:</strong> ${boss.counters.megaCounters.join(', ')}</p>` : ''}
              ${boss.counters.advancedCounters?.length ? `<p><strong>Best ${t.counters}:</strong> ${boss.counters.advancedCounters.join(', ')}</p>` : ''}
              ${boss.counters.budgetCounters?.length ? `<p><strong>Budget ${t.counters}:</strong> ${boss.counters.budgetCounters.join(', ')}</p>` : ''}
            </div>
          `;
        }
        raidsHtml += `</div>`;
      });
      
      raidsHtml += `</div>`;
    });
  }

  // 3. Process Rocket Sestavy
  let rocketHtml = '';
  if (!rocket || (!rocket.giovanni && (!rocket.leaders || rocket.leaders.length === 0) && (!rocket.grunts || rocket.grunts.length === 0))) {
    rocketHtml = `<p>${t.noRocket}</p>`;
  } else {
    // Render Boss Giovanni
    if (rocket.giovanni) {
      const boss = rocket.giovanni;
      rocketHtml += `
        <div class="rocket-card shadow-boss">
          <h3 class="rocket-name">${boss.name} <span class="badge-boss">${lang === 'cs' ? 'Boss Rakeťáků' : 'Team GO Rocket Boss'}</span></h3>
          ${boss.reward ? `
            <div class="rocket-reward">
              <p><strong>${t.reward}:</strong> ${boss.reward.name} ${boss.reward.worthGrinding ? `🎉 (${t.worthGrinding})` : ''}</p>
              ${boss.reward.reason ? `<p><em>Reason: ${boss.reward.reason}</em></p>` : ''}
            </div>
          ` : ''}
          <div class="rocket-lineup">
            <h4>${t.lineup}:</h4>
            <ol>
              <li>Slot 1: ${boss.lineup.slot1.map((p: any) => p.name).join(', ')}</li>
              <li>Slot 2: ${boss.lineup.slot2.map((p: any) => p.name).join(', ')}</li>
              <li>Slot 3: ${boss.lineup.slot3.map((p: any) => p.name).join(', ')}</li>
            </ol>
          </div>
      `;
      if (boss.counters) {
        rocketHtml += `
          <div class="rocket-counters">
            <h4>${t.counters}:</h4>
            ${boss.counters.megaCounters?.length ? `<p><strong>Mega:</strong> ${boss.counters.megaCounters.join(', ')}</p>` : ''}
            ${boss.counters.advancedCounters?.length ? `<p><strong>Best:</strong> ${boss.counters.advancedCounters.join(', ')}</p>` : ''}
            ${boss.counters.budgetCounters?.length ? `<p><strong>Budget:</strong> ${boss.counters.budgetCounters.join(', ')}</p>` : ''}
          </div>
        `;
      }
      rocketHtml += `</div>`;
    }

    // Render Leaders (Arlo, Cliff, Sierra)
    if (rocket.leaders && rocket.leaders.length > 0) {
      rocket.leaders.forEach((leader: any) => {
        rocketHtml += `
          <div class="rocket-card">
            <h3 class="rocket-name">${leader.name} <span class="badge-leader">${lang === 'cs' ? 'Lídr Rakeťáků' : 'Team GO Rocket Leader'}</span></h3>
            ${leader.reward ? `
              <div class="rocket-reward">
                <p><strong>${t.reward}:</strong> ${leader.reward.name} ${leader.reward.worthGrinding ? `🎉 (${t.worthGrinding})` : ''}</p>
                ${leader.reward.reason ? `<p><em>Reason: ${leader.reward.reason}</em></p>` : ''}
              </div>
            ` : ''}
            <div class="rocket-lineup">
              <h4>${t.lineup}:</h4>
              <ol>
                <li>Slot 1: ${leader.lineup.slot1.map((p: any) => p.name).join(', ')}</li>
                <li>Slot 2: ${leader.lineup.slot2.map((p: any) => p.name).join(', ')}</li>
                <li>Slot 3: ${leader.lineup.slot3.map((p: any) => p.name).join(', ')}</li>
              </ol>
            </div>
        `;
        if (leader.counters) {
          rocketHtml += `
            <div class="rocket-counters">
              <h4>${t.counters}:</h4>
              ${leader.counters.megaCounters?.length ? `<p><strong>Mega:</strong> ${leader.counters.megaCounters.join(', ')}</p>` : ''}
              ${leader.counters.advancedCounters?.length ? `<p><strong>Best:</strong> ${leader.counters.advancedCounters.join(', ')}</p>` : ''}
              ${leader.counters.budgetCounters?.length ? `<p><strong>Budget:</strong> ${leader.counters.budgetCounters.join(', ')}</p>` : ''}
            </div>
          `;
        }
        rocketHtml += `</div>`;
      });
    }

    // Render Grunts
    if (rocket.grunts && rocket.grunts.length > 0) {
      rocketHtml += `<h3>${lang === 'cs' ? 'Řadoví členové (Grunts)' : 'Team GO Rocket Grunts'}</h3><div class="grunt-grid">`;
      rocket.grunts.forEach((grunt: any) => {
        rocketHtml += `
          <div class="grunt-card">
            <h4 class="grunt-phrase">"${lang === 'cs' ? grunt.phraseCs : grunt.phraseEn}"</h4>
            <p class="grunt-info"><strong>Type:</strong> ${grunt.type} | <strong>Difficulty:</strong> ${grunt.difficulty}</p>
            <p class="grunt-reward"><strong>Shadow:</strong> ${grunt.shadowPokemon?.join(', ') || 'N/A'}</p>
            ${grunt.counters?.length ? `<p class="grunt-counters"><strong>${t.counters}:</strong> ${grunt.counters.join(', ')}</p>` : ''}
          </div>
        `;
      });
      rocketHtml += `</div>`;
    }
  }

  // Generate complete HTML page
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${t.title}</title>
  <meta name="description" content="${t.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <style>
    :root {
      --bg-color: #0b0c10;
      --card-bg: rgba(22, 26, 35, 0.85);
      --text-color: #c5c6c7;
      --title-color: #ffffff;
      --accent-color: #66fcf1;
      --accent-dim: #45a29e;
      --border-color: #1f2833;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 30px 15px;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
    }
    h1, h2, h3, h4 {
      color: var(--title-color);
      font-weight: 600;
    }
    h1 {
      font-size: 2.2rem;
      border-bottom: 2px solid var(--accent-color);
      padding-bottom: 10px;
      margin-bottom: 5px;
    }
    .date-indicator {
      font-size: 0.95rem;
      color: var(--accent-color);
      margin-bottom: 30px;
    }
    .intro-paragraph {
      font-size: 1.1rem;
      margin-bottom: 40px;
      color: #959aa0;
    }
    h2 {
      font-size: 1.6rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 8px;
      margin-top: 50px;
      margin-bottom: 25px;
      color: var(--accent-color);
    }
    h3 {
      font-size: 1.3rem;
      margin-top: 30px;
      margin-bottom: 15px;
      color: #ffffff;
    }
    .event-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .active-card {
      border-left: 4px solid var(--accent-color);
    }
    .upcoming-card {
      border-left: 4px solid var(--accent-dim);
    }
    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 0.85rem;
    }
    .event-status-badge {
      font-weight: bold;
      text-transform: uppercase;
      color: var(--accent-color);
    }
    .event-type {
      background-color: var(--border-color);
      padding: 3px 8px;
      border-radius: 4px;
      color: #959aa0;
    }
    .event-title {
      font-size: 1.4rem;
      margin: 5px 0 10px 0;
      color: #ffffff;
    }
    .event-time {
      font-size: 0.9rem;
      color: #959aa0;
      margin-bottom: 15px;
    }
    .event-summary {
      color: #c5c6c7;
      margin-bottom: 20px;
    }
    .event-details-section {
      border-top: 1px dashed var(--border-color);
      padding-top: 15px;
      margin-top: 15px;
    }
    .detail-block {
      margin-bottom: 15px;
    }
    .detail-block h4 {
      margin-top: 0;
      margin-bottom: 5px;
      font-size: 1rem;
      color: var(--accent-color);
    }
    .detail-block ul {
      margin: 0;
      padding-left: 20px;
    }
    .bonus-icon {
      font-size: 1.1rem;
      margin-right: 5px;
    }
    .raid-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-bottom: 30px;
    }
    @media (min-width: 600px) {
      .raid-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .raid-card, .rocket-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 15px;
    }
    .boss-name {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .cp-range {
      font-size: 0.85rem;
      margin: 0 0 12px 0;
      color: #959aa0;
    }
    .boss-counters p, .rocket-counters p {
      font-size: 0.85rem;
      margin: 4px 0;
    }
    .rocket-card {
      margin-bottom: 20px;
    }
    .rocket-name {
      font-size: 1.25rem;
      margin-top: 0;
      margin-bottom: 10px;
      color: #ffffff;
    }
    .rocket-reward p, .rocket-lineup p {
      font-size: 0.9rem;
      margin: 5px 0;
    }
    .rocket-lineup ol {
      margin: 5px 0;
      padding-left: 20px;
      font-size: 0.9rem;
    }
    .rocket-counters h4, .rocket-lineup h4 {
      margin-top: 15px;
      margin-bottom: 5px;
      font-size: 0.95rem;
      color: var(--accent-color);
    }
    .badge-boss {
      background-color: #ff3b30;
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 8px;
    }
    .badge-leader {
      background-color: #ff9500;
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 8px;
    }
    .shadow-boss {
      border: 1px solid #ff3b30;
    }
    .grunt-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-bottom: 30px;
    }
    @media (min-width: 600px) {
      .grunt-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .grunt-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 15px;
    }
    .grunt-phrase {
      font-style: italic;
      margin-top: 0;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .grunt-info, .grunt-reward, .grunt-counters {
      font-size: 0.85rem;
      margin: 4px 0;
    }
    footer {
      margin-top: 80px;
      border-top: 1px solid var(--border-color);
      padding-top: 20px;
      text-align: center;
      font-size: 0.8rem;
      color: #4f5b66;
    }
  </style>
</head>
<body>
  <h1>${t.h1}</h1>
  <div class="date-indicator">Data current as of: ${nowStr}</div>
  <p class="intro-paragraph">${t.intro}</p>
  
  <h2>${t.events}</h2>
  ${eventsHtml}
  
  <h2>${t.raids}</h2>
  ${raidsHtml}
  
  <h2>${t.rocket}</h2>
  ${rocketHtml}
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Pokémon GO Event Tracker. This website is not affiliated with Niantic, Inc. or Nintendo.</p>
  </footer>
</body>
</html>`;
}

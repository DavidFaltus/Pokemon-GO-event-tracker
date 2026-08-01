import { EventData, SpecialEventDetails, ScrapedRaidBoss, RocketMember } from './types';

interface BotTranslations {
  title: string;
  description: string;
  h1: string;
  intro: string;
  events: string;
  raids: string;
  rocket: string;
  ditto: string;
  eggs: string;
  rankings: string;
  filter: string;
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
  eggTitle: string;
  research: string;
  counters: string;
  weaknesses: string;
  shinyAvailable: string;
  reward: string;
  worthGrinding: string;
  lineup: string;
  viewDetails: string;
  privacyPolicy: string;
  rightsReserved: string;
  guidesHeading: string;
  raidsGuideText: string;
  rocketGuideText: string;
}

const botTranslations: Record<'cs' | 'en' | 'ja' | 'ru', BotTranslations> = {
  en: {
    title: "Pokémon GO Event Tracker - Active Events, Raids, Rocket & Guides",
    description: "Track live and upcoming Pokémon GO events, raid bosses, Team GO Rocket lineups, egg hatches, Ditto disguises, and PvP rankings in real time.",
    h1: "Pokémon GO Event Tracker",
    intro: "Welcome to the ultimate Pokémon GO Event Tracker. Access live event schedules, countdowns, raid boss counters, Team GO Rocket guides, egg hatch pools, and search filters.",
    events: "Events & Timers",
    raids: "Raid Bosses & Counters",
    rocket: "Team GO Rocket Lineups",
    ditto: "Ditto Disguises",
    eggs: "Egg Hatch Pools",
    rankings: "PvP & Raid Rankings",
    filter: "Search Filter Generator",
    active: "Active Now",
    upcoming: "Upcoming",
    ends: "Ends",
    starts: "Starts",
    noEvents: "No events active or upcoming.",
    noRaids: "No raid boss information available right now.",
    noRocket: "No Rocket lineup information available right now.",
    bonuses: "Event Bonuses",
    debuts: "Debuts & New Releases",
    spawns: "Wild Spawns",
    eggTitle: "Egg Hatches",
    research: "Field Research Tasks",
    counters: "Best Counters",
    weaknesses: "Type Weaknesses",
    shinyAvailable: "Shiny Available",
    reward: "Reward",
    worthGrinding: "High Priority",
    lineup: "Battle Lineup",
    viewDetails: "View Full Event Details",
    privacyPolicy: "Privacy Policy & Terms",
    rightsReserved: "All rights reserved. Not affiliated with Niantic, Inc. or Nintendo.",
    guidesHeading: "Pokémon GO Guides & Tips",
    raidsGuideText: "Defeating Raid Bosses efficiently requires utilizing Super Effective type matchups and Mega Evolutions. Coordinate with local communities or remote raid apps during Raid Hours to secure Legendary and Mythical Pokémon with exclusive moves.",
    rocketGuideText: "Team GO Rocket Leaders Arlo, Cliff, and Sierra use rotated Shadow lineups. Defeat them to receive Rocket Radar components, encounter high-IV Shadow Pokémon, and face Boss Giovanni for Legendary Shadow encounters."
  },
  cs: {
    title: "Pokémon GO Event Tracker - Živé události, Raidy, Rakeťáci & Průvodce",
    description: "Sledujte aktuální a nadcházející události v Pokémon GO, raid bossy, sestavy Team GO Rocket, líhnutí z vajec, maskování Ditto a PvP žebříčky v reálném čase.",
    h1: "Pokémon GO Event Tracker",
    intro: "Vítejte v přehledném sledovači událostí Pokémon GO. Získejte přehled o živých a nadcházejících událostech, doporučených protihráčích na raid bossy, sestavách Rakeťáků a herních bonusech.",
    events: "Události & Odpočty",
    raids: "Raid Bossi & Counters",
    rocket: "Sestavy Team GO Rocket",
    ditto: "Ditto Maskování",
    eggs: "Líhnutí z vajec",
    rankings: "PvP & Raid Žebříčky",
    filter: "Generátor vyhledávacích filtrů",
    active: "Právě probíhá",
    upcoming: "Nadcházející",
    ends: "Končí",
    starts: "Začíná",
    noEvents: "Momentálně nejsou žádné aktivní ani nadcházející události.",
    noRaids: "Žádné informace o raid bossech.",
    noRocket: "Žádné informace o sestavách Rakeťáků.",
    bonuses: "Eventové bonusy",
    debuts: "Debuty a noví Pokémoni",
    spawns: "Divocí Pokémoni (Wild Spawns)",
    eggTitle: "Líhnutí z vajec (Eggs)",
    research: "Terénní výzkum (Field Research)",
    counters: "Doporučení protihráči (Counters)",
    weaknesses: "Slabosti Pokémona",
    shinyAvailable: "Možnost Shiny verze",
    reward: "Odměna",
    worthGrinding: "Vysoká priorita",
    lineup: "Sestava pro souboj",
    viewDetails: "Zobrazit detail události",
    privacyPolicy: "Ochrana soukromí a podmínky",
    rightsReserved: "Všechna práva vyhrazena. Aplikace není spjata s Niantic, Inc. ani Nintendo.",
    guidesHeading: "Návody a strategie pro Pokémon GO",
    raidsGuideText: "Pro rychlé poražení Raid Bossů používejte správné typové slabosti a Mega evoluce. Během Raid Hours (Raidových hodin) využívejte koordinaci s komunitou pro získání Legendárních Pokémonů s exkluzivními útoky.",
    rocketGuideText: "Lídři Team GO Rocket (Arlo, Cliff, Sierra) obměňují své Shadow Pokémony. Jejich poražením získáte přístup k Bossi Giovannimu a šanci chytit vzácné Shadow Pokémony."
  },
  ja: {
    title: "Pokémon GO イベントトラッカー - イベント、レイド、ロケット団 & ガイド",
    description: "Pokémon GOのイベント、レイドボス、GOロケット団の編成、タマゴ孵化、メタモン、PvPランキングをリアルタイムで確認できます。",
    h1: "Pokémon GO イベントトラッカー",
    intro: "Pokémon GOのイベントトラッカーへようこそ。開催中および今後のイベント、レイドボスの対策、ロケット団の対策ガイド、ボーナス情報を一 me で確認できます。",
    events: "イベント & タイマー",
    raids: "レイドボス & 対策",
    rocket: "GOロケット団編成",
    ditto: "メタモンのへんしん姿",
    eggs: "タマゴ孵化一覧",
    rankings: "PvP & レイドランキング",
    filter: "検索フィルター作成",
    active: "開催中",
    upcoming: "まもなく開始",
    ends: "終了:",
    starts: "開始:",
    noEvents: "現在開催中または予定されているイベントはありません。",
    noRaids: "レイドボスの情報はありません。",
    noRocket: "ロケット団の情報はありません。",
    bonuses: "イベントボーナス",
    debuts: "新登場ポケモン",
    spawns: "野生での出現",
    eggTitle: "タマゴ孵化",
    research: "フィールドリサーチタスク",
    counters: "対策ポケモン",
    weaknesses: "タイプ弱点",
    shinyAvailable: "色違い出現可能性あり",
    reward: "報酬",
    worthGrinding: "おすすめ",
    lineup: "手持ちポケモン",
    viewDetails: "イベントの詳細を見る",
    privacyPolicy: "プライバシーポリシー & 利用規約",
    rightsReserved: "All rights reserved. Niantic, Inc. または 任天堂 との提携はありません。",
    guidesHeading: "Pokémon GO ガイド & 攻略情報",
    raidsGuideText: "レイドボスを効率よく倒すには、弱点タイプやメガシンカの活用が重要です。レイドアワーを活用して伝説のポケモンをゲットしましょう。",
    rocketGuideText: "GOロケット団のリーダー（アルロ、クリフ、シエラ）の手持ちポケモンを対策し、サカキとのバトルに備えましょう。"
  },
  ru: {
    title: "Трекер событий Pokémon GO - События, Рейды, Команда R и Руководства",
    description: "Отслеживайте текущие и предстоящие события Pokémon GO, боссов рейдов, составы Команды R, вылупление яиц и маскировки Дитто в реальном времени.",
    h1: "Трекер событий Pokémon GO",
    intro: "Добро пожаловать в трекер событий Pokémon GO. Здесь вы найдете актуальную информацию о внутриигровых событиях, контр-покемонах для рейдов и битвах с Командой R.",
    events: "События и таймеры",
    raids: "Боссы рейдов и контр-покемоны",
    rocket: "Составы Команды GO Rocket",
    ditto: "Маскировки Дитто",
    eggs: "Вылупление яиц",
    rankings: "Рейтинги PvP и рейдов",
    filter: "Генератор фильтров",
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
    eggTitle: "Яйца",
    research: "Полевые исследования",
    counters: "Контр-покемоны",
    weaknesses: "Уязвимости",
    shinyAvailable: "Может быть сияющим",
    reward: "Награда",
    worthGrinding: "Высокий приоритет",
    lineup: "Состав битвы",
    viewDetails: "Подробности события",
    privacyPolicy: "Политика конфиденциальности",
    rightsReserved: "Все права защищены. Не связано с Niantic, Inc. или Nintendo.",
    guidesHeading: "Руководства и советы Pokémon GO",
    raidsGuideText: "Эффективная победа над боссами рейдов требует использования суперэффективных атак и Мега-эволюций. Координируйтесь во время Часа Рейдов.",
    rocketGuideText: "Лидеры Команды R (Арло, Клифф, Сиерра) меняют своих Shadow покемонов. Победите их, чтобы сразиться с Боссом Джованни."
  }
};

export async function generateBotHtml(
  lang: 'cs' | 'en' | 'ja' | 'ru',
  events: any[],
  raids: any[],
  rocket: any,
  getDetails: (eventId: string) => SpecialEventDetails | null,
  targetEventId?: string
): Promise<string> {
  const t = botTranslations[lang] || botTranslations.en;
  
  // Format current date
  const nowStr = new Date().toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Target event for event-level SEO page
  const targetEvent = targetEventId ? events.find(e => e.eventID === targetEventId) : null;
  const pageTitle = targetEvent ? `${targetEvent.name} | Pokémon GO Event Tracker` : t.title;
  const pageDesc = targetEvent
    ? `${targetEvent.name} (${new Date(targetEvent.start).toLocaleDateString()} – ${new Date(targetEvent.end).toLocaleDateString()}) — Spawns, bonuses, raids, and research details.`
    : t.description;
  const canonicalPath = targetEventId ? `/${lang}/events/${targetEventId}` : `/${lang}/events`;
  const canonicalUrl = `https://pogoevents.app${canonicalPath}`;

  // Process Events
  const now = Date.now();
  let sortedEvents = [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  
  if (targetEvent) {
    sortedEvents = [targetEvent, ...sortedEvents.filter(e => e.eventID !== targetEventId)];
  }

  let eventsHtml = '';
  if (sortedEvents.length === 0) {
    eventsHtml = `<p class="empty-state">${t.noEvents}</p>`;
  } else {
    sortedEvents.forEach(event => {
      const startMs = new Date(event.start).getTime();
      const endMs = new Date(event.end).getTime();
      const isActive = now >= startMs && now <= endMs;
      const isUpcoming = now < startMs;
      
      if (now > endMs && event.eventID !== targetEventId) return;

      const statusLabel = isActive ? t.active : isUpcoming ? t.upcoming : (lang === 'cs' ? 'Ukončeno' : 'Ended');
      const timeLabel = isActive 
        ? `${t.ends}: ${new Date(event.end).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}`
        : `${t.starts}: ${new Date(event.start).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US')}`;

      const eventUrl = `/${lang}/events/${event.eventID}`;

      eventsHtml += `
        <article class="event-card ${isActive ? 'active-card' : 'upcoming-card'}" id="event-${event.eventID}">
          <div class="event-header">
            <span class="event-status-badge">${statusLabel}</span>
            <span class="event-type">${event.eventType}</span>
          </div>
          <h3 class="event-title">
            <a href="${eventUrl}" title="${event.name}">${event.name}</a>
          </h3>
          <p class="event-time">${timeLabel}</p>
          ${event.heading ? `<p class="event-summary">${event.heading}</p>` : ''}
      `;

      const details = getDetails(event.eventID);
      if (details) {
        eventsHtml += `<div class="event-details-section">`;

        if (details.debuts && details.debuts.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.debuts}</h4>
              <ul>
                ${details.debuts.map(d => `
                  <li><strong>${d.name}</strong>: ${lang === 'cs' ? d.description.cs : d.description.en}</li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        if (details.bonuses && details.bonuses.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.bonuses}</h4>
              <ul>
                ${details.bonuses.map(b => `
                  <li><span class="bonus-icon">${b.icon || '🎁'}</span> ${lang === 'cs' ? b.text.cs : b.text.en}</li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        if (details.spawns && details.spawns.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.spawns}</h4>
              <p>${details.spawns.map(s => `${s.name}${s.isShinyAvailable ? ' ✨' : ''}`).join(', ')}</p>
            </div>
          `;
        }

        if (details.eggs && details.eggs.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.eggTitle}</h4>
              <ul>
                ${details.eggs.map(e => `
                  <li><strong>${e.distance}:</strong> ${e.contents.map(c => `${c.name}${c.isShinyAvailable ? ' ✨' : ''}`).join(', ')}</li>
                `).join('')}
              </ul>
            </div>
          `;
        }

        if (details.research && details.research.length > 0) {
          eventsHtml += `
            <div class="detail-block">
              <h4>${t.research}</h4>
              <ul>
                ${details.research.map(r => `
                  <li><strong>${lang === 'cs' ? r.task.cs : r.task.en}</strong> &rarr; ${t.reward}: ${r.reward}${r.isShinyAvailable ? ' ✨' : ''}</li>
                `).join('')}
              </ul>
            </div>
          `;
        }
        eventsHtml += `</div>`;
      }

      eventsHtml += `
        <div class="event-card-actions">
          <a href="${eventUrl}" class="btn-event-detail">${t.viewDetails} &rarr;</a>
        </div>
      </article>`;
    });
  }

  // Process Raids
  let raidsHtml = '';
  if (!raids || raids.length === 0) {
    raidsHtml = `<p class="empty-state">${t.noRaids}</p>`;
  } else {
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

      raidsHtml += `<section class="raid-tier-section"><h3>${tierNames[tier] || `${tier}-Star Raids`}</h3><div class="raid-grid">`;
      
      bosses.forEach(boss => {
        raidsHtml += `
          <div class="raid-card">
            <h4 class="boss-name">${boss.name} ${boss.canBeShiny ? '✨' : ''}</h4>
            ${boss.cpRange ? `<p class="cp-range">CP: <strong>${boss.cpRange}</strong> ${boss.boostedCpRange ? `(Weather: <strong>${boss.boostedCpRange}</strong>)` : ''}</p>` : ''}
            ${boss.counters ? `
              <div class="boss-counters">
                <p><strong>${t.weaknesses}:</strong> ${boss.counters.weaknesses?.join(', ') || 'N/A'}</p>
                ${boss.counters.megaCounters?.length ? `<p><strong>Mega ${t.counters}:</strong> ${boss.counters.megaCounters.join(', ')}</p>` : ''}
                ${boss.counters.advancedCounters?.length ? `<p><strong>Best ${t.counters}:</strong> ${boss.counters.advancedCounters.join(', ')}</p>` : ''}
              </div>
            ` : ''}
          </div>
        `;
      });
      
      raidsHtml += `</div></section>`;
    });
  }

  // Process Rocket Sestavy
  let rocketHtml = '';
  if (!rocket || (!rocket.giovanni && (!rocket.leaders || rocket.leaders.length === 0) && (!rocket.grunts || rocket.grunts.length === 0))) {
    rocketHtml = `<p class="empty-state">${t.noRocket}</p>`;
  } else {
    if (rocket.giovanni) {
      const boss = rocket.giovanni;
      rocketHtml += `
        <div class="rocket-card shadow-boss">
          <h3 class="rocket-name">${boss.name} <span class="badge-boss">Boss</span></h3>
          ${boss.reward ? `
            <div class="rocket-reward">
              <p><strong>${t.reward}:</strong> ${boss.reward.name} ${boss.reward.worthGrinding ? `🎉 (${t.worthGrinding})` : ''}</p>
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
        </div>
      `;
    }

    if (rocket.leaders && rocket.leaders.length > 0) {
      rocket.leaders.forEach((leader: any) => {
        rocketHtml += `
          <div class="rocket-card">
            <h3 class="rocket-name">${leader.name} <span class="badge-leader">Leader</span></h3>
            ${leader.reward ? `<p class="rocket-reward"><strong>${t.reward}:</strong> ${leader.reward.name}</p>` : ''}
            <div class="rocket-lineup">
              <h4>${t.lineup}:</h4>
              <ol>
                <li>Slot 1: ${leader.lineup.slot1.map((p: any) => p.name).join(', ')}</li>
                <li>Slot 2: ${leader.lineup.slot2.map((p: any) => p.name).join(', ')}</li>
                <li>Slot 3: ${leader.lineup.slot3.map((p: any) => p.name).join(', ')}</li>
              </ol>
            </div>
          </div>
        `;
      });
    }

    if (rocket.grunts && rocket.grunts.length > 0) {
      rocketHtml += `<h3>Team GO Rocket Grunts</h3><div class="grunt-grid">`;
      rocket.grunts.forEach((grunt: any) => {
        rocketHtml += `
          <div class="grunt-card">
            <h4 class="grunt-phrase">"${lang === 'cs' ? grunt.phraseCs : grunt.phraseEn}"</h4>
            <p class="grunt-info"><strong>Type:</strong> ${grunt.type} | <strong>Shadow:</strong> ${grunt.shadowPokemon?.join(', ') || 'N/A'}</p>
          </div>
        `;
      });
      rocketHtml += `</div>`;
    }
  }

  // Generate complete HTML page with structured internal navigation (<a href>)
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="https://pogoevents.app/en/events">
  <link rel="alternate" hreflang="cs" href="https://pogoevents.app/cs/events">
  <link rel="alternate" hreflang="ja" href="https://pogoevents.app/ja/events">
  <link rel="alternate" hreflang="ru" href="https://pogoevents.app/ru/events">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${canonicalUrl}">
  ${targetEvent?.image ? `<meta property="og:image" content="${targetEvent.image}">` : `<meta property="og:image" content="https://pogoevents.app/logo-banner.jpg">`}
  <style>
    :root {
      --bg-color: #0b0c10;
      --card-bg: rgba(22, 26, 35, 0.95);
      --text-color: #c5c6c7;
      --title-color: #ffffff;
      --accent-color: #66fcf1;
      --accent-dim: #45a29e;
      --border-color: #1f2833;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 20px 15px;
      line-height: 1.6;
      max-width: 960px;
      margin: 0 auto;
    }
    a, a:hover, a:focus, a:active {
      text-decoration: none;
    }
    header {
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    h1 {
      font-size: 2rem;
      color: var(--title-color);
      margin: 0 0 10px 0;
    }
    h1 a {
      color: inherit;
      text-decoration: none;
    }
    .site-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }
    .site-nav a {
      background: var(--border-color);
      color: var(--title-color);
      padding: 8px 14px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background 0.2s;
    }
    .site-nav a:hover, .site-nav a.active {
      background: var(--accent-dim);
      color: #fff;
    }
    .lang-switcher {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .lang-switcher a {
      color: var(--accent-color);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: bold;
      padding: 2px 6px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }
    .intro-box {
      background: rgba(31, 40, 51, 0.4);
      border-left: 4px solid var(--accent-color);
      padding: 15px 20px;
      border-radius: 6px;
      margin-bottom: 30px;
    }
    .intro-box p {
      margin: 0;
      font-size: 1rem;
    }
    h2 {
      font-size: 1.5rem;
      color: var(--accent-color);
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 8px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .event-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
    }
    .event-title {
      font-size: 1.35rem;
      margin: 8px 0;
    }
    .event-title a {
      color: #ffffff;
      text-decoration: none;
    }
    .event-title a:hover {
      color: var(--accent-color);
      text-decoration: underline;
    }
    .btn-event-detail {
      display: inline-block;
      margin-top: 15px;
      background: rgba(102, 252, 241, 0.15);
      color: var(--accent-color);
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .btn-event-detail:hover {
      background: var(--accent-color);
      color: #000;
    }
    .guide-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 25px;
      margin-top: 40px;
    }
    footer {
      margin-top: 60px;
      border-top: 1px solid var(--border-color);
      padding-top: 25px;
      text-align: center;
      font-size: 0.85rem;
      color: #888;
    }
    footer a {
      color: var(--accent-color);
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header>
    <h1><a href="/${lang}/events">${t.h1}</a></h1>
    <div class="lang-switcher">
      <a href="/cs/events">CS</a>
      <a href="/en/events">EN</a>
      <a href="/ja/events">JA</a>
      <a href="/ru/events">RU</a>
    </div>
    <nav class="site-nav">
      <a href="/${lang}/events" class="active">${t.events}</a>
      <a href="/${lang}/raids">${t.raids}</a>
      <a href="/${lang}/rocket">${t.rocket}</a>
      <a href="/${lang}/ditto">${t.ditto}</a>
      <a href="/${lang}/eggs">${t.eggs}</a>
      <a href="/${lang}/rankings">${t.rankings}</a>
      <a href="/${lang}/filter">${t.filter}</a>
    </nav>
  </header>

  <main>
    <div class="intro-box">
      <p>${t.intro}</p>
      <small style="display:block; margin-top: 8px; color: var(--accent-color);">Data updated: ${nowStr}</small>
    </div>

    <h2>${t.events}</h2>
    ${eventsHtml}

    <h2>${t.raids}</h2>
    ${raidsHtml}

    <h2>${t.rocket}</h2>
    ${rocketHtml}

    <section class="guide-section">
      <h2>${t.guidesHeading}</h2>
      <h3>${t.raids}</h3>
      <p>${t.raidsGuideText}</p>
      <h3>${t.rocket}</h3>
      <p>${t.rocketGuideText}</p>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Pokémon GO Event Tracker. ${t.rightsReserved}</p>
    <p><a href="/privacy-policy.html">${t.privacyPolicy}</a></p>
  </footer>
</body>
</html>`;
}

'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  Swords, 
  Users, 
  Flame, 
  Award, 
  Copy, 
  Check, 
  Compass, 
  ShieldAlert, 
  Coins, 
  Footprints,
  Layers,
  ChevronRight,
  Zap
} from 'lucide-react';
import './WeeklyMiniEventsInteractiveWidget.css';

interface WeeklyMiniEventsInteractiveWidgetProps {
  lang: Language;
}

type DayFilter = 'all' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'weekend' | 'daily';

interface RoutineEvent {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'weekend' | 'daily';
  time: Record<Language, string>;
  category: 'combat' | 'social' | 'collector' | 'daily';
  title: Record<Language, string>;
  desc: Record<Language, string>;
  proTip: Record<Language, string>;
  iconName: 'swords' | 'calendar' | 'users' | 'sparkles' | 'footprints' | 'coins' | 'flame' | 'award' | 'compass';
  color: string;
}

const ROUTINE_EVENTS: RoutineEvent[] = [
  {
    id: 'adventure-sync-reset',
    day: 'monday',
    time: { cs: 'Pondělí 09:00', en: 'Monday 9:00 AM', ja: '月曜日 9:00', ru: 'Понедельник 9:00' },
    category: 'daily',
    title: {
      cs: 'Adventure Sync Týdenní Reset (50km / 100km)',
      en: 'Adventure Sync 50km/100km Weekly Tally',
      ja: 'アドベンチャーシンク週間リワード（50km/100km）',
      ru: 'Adventure Sync сброс за неделю (50км / 100км)'
    },
    desc: {
      cs: 'Týdenní odměna za nachozené kilometry. Hranice 50 km garantuje vzácné 10km vejce (Riolu, Larvitar), Rare Candy a až 16 000 Stardustu.',
      en: 'Weekly walking distance payout. The 50 km milestone awards exclusive 10km eggs (Riolu, Larvitar), Rare Candies, and 16,000 Stardust.',
      ja: '1週間の総歩行距離リワード。50km達成で特選10kmタマゴ（リオル等）、ふしぎなアメ、16,000ほしのすなを獲得。',
      ru: 'Еженедельный подсчет шагов. За 50 км дают эксклюзивное 10км яйцо (Риолу, Ларвитар), Rare Candy и 16 000 пыли.'
    },
    proTip: {
      cs: 'Aktivujte Star Piece v 8:59! Výnos Stardustu vyskočí na 24 000+. Vždy mějte 2 volné sloty na vejce v inventáři.',
      en: 'Pop a Star Piece at 8:59 AM to boost dust payout to 24,000+! Keep 2 open egg slots beforehand.',
      ja: '月曜8:59に「ほしのかけら」使用でほしのすなが24,000以上に！タマゴ枠を2つ空けておくこと。',
      ru: 'Включите Star Piece в 8:59 утра для 24 000+ пыли! Освободите 2 слота под яйца заранее.'
    },
    iconName: 'footprints',
    color: '#38bdf8'
  },
  {
    id: 'max-mondays',
    day: 'monday',
    time: { cs: 'Pondělí 18:00–19:00', en: 'Monday 6:00–7:00 PM', ja: '月曜日 18:00–19:00', ru: 'Понедельник 18:00–19:00' },
    category: 'combat',
    title: {
      cs: 'Max Mondays (Dynamax Power Spot Takeover)',
      en: 'Max Mondays (Power Spot Surge)',
      ja: 'マックスマンデー（パワースポット集中出現）',
      ru: 'Max Mondays (Захват Power Spot)'
    },
    desc: {
      cs: 'Vybraný Dynamax Pokémon obsadí drtivou většinu Power Spotů. Zvýšená produkce Max Particles a rychlé dokončení Max Move úkolů.',
      en: 'Featured Dynamax Pokémon takes over majority of Power Spots with increased Max Particles generation.',
      ja: '注目のダイマックスポケモンがパワースポットを一斉占拠。マックス粒子（MP）収集に最適。',
      ru: 'Выбранный Dynamax покемон захватывает Power Spot точки. Повышенный сбор Max Particles.'
    },
    proTip: {
      cs: 'Sbírejte MP před 18:00 až na 960 MP, v 18:00 seberte velký 300 MP balík z chůze pro přetečení na 1 080 MP.',
      en: 'Cap at 960 MP prior to 6 PM, then claim the 300 MP walking reward to overflow to 1,080 MP.',
      ja: '18時前に960 MPまで貯め、歩行300 MPを受け取って上限突破（1,080 MP）させましょう。',
      ru: 'Накопите 960 MP до 18:00, затем заберите 300 MP за ходьбу для переполнения до 1 080 MP.'
    },
    iconName: 'flame',
    color: '#a855f7'
  },
  {
    id: 'spotlight-hour',
    day: 'tuesday',
    time: { cs: 'Úterý 18:00–19:00', en: 'Tuesday 6:00–7:00 PM', ja: '火曜日 18:00–19:00', ru: 'Вторник 18:00–19:00' },
    category: 'collector',
    title: {
      cs: 'Pokémon Spotlight Hour',
      en: 'Pokémon Spotlight Hour',
      ja: 'スポットライトアワー',
      ru: 'Spotlight Hour'
    },
    desc: {
      cs: 'Masivní spawn jednoho vybraného Pokémona a 1 z 5 rotujících bonusů: 2× Catch Stardust, 2× Catch XP, 2× Catch Candy, 2× Transfer Candy, nebo 2× Evolve XP.',
      en: 'Hyper-spawns of one featured Pokémon paired with rotating bonuses: 2x Catch Stardust, 2x Catch XP, 2x Catch Candy, 2x Transfer Candy, or 2x Evolve XP.',
      ja: '特定ポケモンの大量出現と週替わりボーナス（捕獲ほしのすな2倍、捕獲XP2倍、アメ2倍、博士送り2倍、進化XP2倍）。',
      ru: 'Массовый спавн покемона и ротирующийся бонус: 2× пыль за поимку, 2× XP, 2× конфеты, 2× за трансфер или 2× за эволюцию.'
    },
    proTip: {
      cs: 'Během 2× Stardustu se Star Piece získáte až 300 000+ Stardustu za 60 minut pomocí techniky Fast Catch!',
      en: 'During 2x Catch Stardust with a Star Piece, net 300,000+ Stardust in 60 minutes via Fast Catch!',
      ja: 'ほしのすな2倍時に「ほしのかけら」＋捕獲スキップで60分間に30万以上の砂を稼げます。',
      ru: 'При 2× пыли со Star Piece и фаст-кетчем можно заработать 300 000+ пыли за 60 минут!'
    },
    iconName: 'sparkles',
    color: '#facc15'
  },
  {
    id: 'raid-hour',
    day: 'wednesday',
    time: { cs: 'Středa 18:00–19:00', en: 'Wednesday 6:00–7:00 PM', ja: '水曜日 18:00–19:00', ru: 'Среда 18:00–19:00' },
    category: 'combat',
    title: {
      cs: 'Legendary Raid Hour',
      en: 'Legendary Raid Hour',
      ja: 'レイドアワー（伝説レイド）',
      ru: 'Legendary Raid Hour'
    },
    desc: {
      cs: 'Téměř všechny gymy současně vylíhnou aktuálního 5★ Legendárního bosse. Ideální čas pro chycení Shiny varianty (1/20 šance) a farmení Candy XL.',
      en: 'Virtually all gyms spawn current 5★ Legendary Tier boss. Peak time for Shiny hunting (1/20 rate) and Candy XL farming.',
      ja: 'ほぼ全てのジムで一斉に伝説レイド（5★）が出現。色違い厳選（1/20確率）とアメXL集めのゴールデンタイム。',
      ru: 'Почти на всех гимах появляется текущий 5★ легендарный босс. Шанс на шайни 1/20 и фарм конфет XL.'
    },
    proTip: {
      cs: 'Vytvořte Party Play pro Party Power (+100% Charged Move damage) — boss padne za 40 sekund v partě 3–4 trenérů!',
      en: 'Form a Party Play group for Party Power (+100% Charged Move damage) to take down bosses in ~40 seconds!',
      ja: 'チームコラボ（Party Play）を発動させるとチャージ技ダメージが2倍になり、高速連戦が可能です。',
      ru: 'Создайте команду в Party Play для бонуса +100% к урону Charged Move — босс упадет за 40 секунд!'
    },
    iconName: 'swords',
    color: '#ef4444'
  },
  {
    id: 'showcase-start',
    day: 'thursday',
    time: { cs: 'Čtvrtek 10:00 (do Neděle 20:00)', en: 'Thursday 10:00 AM – Sunday 8:00 PM', ja: '木曜日 10:00 ～ 日曜日 20:00', ru: 'Четверг 10:00 — Воскресенье 20:00' },
    category: 'collector',
    title: {
      cs: 'PokéStop Showcases (Soutěže velikostí XXL)',
      en: 'PokéStop Showcases (XXL Size Competitions)',
      ja: 'ポケストップおひろめ（XXLサイズ対決）',
      ru: 'PokéStop Showcases (Конкурс XXL размеров)'
    },
    desc: {
      cs: 'Soutěž o největšího Pokémona u vybraných PokéStopů. 1. místo přináší prémiové předměty: Incubators, Star Pieces, Lure moduly, Lucky Eggs a 10 000 XP!',
      en: 'Size ranking tournament at designated PokéStops. 1st place awards Incubators, Star Pieces, Lures, Lucky Eggs, and 10,000 XP!',
      ja: '特定ポケストップで開催される大きさ対決。1位入賞でふかそうち、ほしのかけら、ルアー、しあわせタマゴ、10,000 XPを獲得！',
      ru: 'Соревнование размеров на избранных покестопах. 1-е место дает инкубаторы, Star Piece, приманки и 10 000 XP!'
    },
    proTip: {
      cs: 'Zadejte do vyhledávání "xxl" pro zobrazení vašich největších kandidátů. Umístěte Pokémony do odlehlejších vesnických PokéStopů!',
      en: 'Search "xxl" to find top score specimens. Enter remote suburban or rural PokéStops for guaranteed 1st place!',
      ja: 'ボックス検索で「xxl」と入力。郊外や人の少ないポケストップに預けると1位が確定しやすいです。',
      ru: 'Ищите "xxl" в поиске для отбора гигантов. Ставьте в отдаленные покестопы для легкого 1-го места!'
    },
    iconName: 'award',
    color: '#f97316'
  },
  {
    id: 'friendship-friday',
    day: 'friday',
    time: { cs: 'Pátek celý den', en: 'Friday All Day', ja: '金曜日 終日', ru: 'Пятница весь день' },
    category: 'social',
    title: {
      cs: 'Friendship Friday (Dárkový maraton & Lucky Friends)',
      en: 'Friendship Friday (Gift Marathon & Lucky Friends)',
      ja: 'フレンドシップフライデー（ギフト一括開封＆キラフレンド）',
      ru: 'Friendship Friday (Подарки и Lucky Friends)'
    },
    desc: {
      cs: 'Pravidelný den pro otevření plného limitu dárků (30–40 denně) a odeslání dárků všem přátelům pro maximalizaci šance na Lucky Friends.',
      en: 'Dedicated weekly routine to open full gift cap (30-40 daily) and send outgoing gifts to trigger Lucky Friends.',
      ja: '1日のギフト開封上限（30〜40個）を全消化し、フレンド全員に送ってキラフレンド昇格を狙う日。',
      ru: 'День для выкрутки лимита открытия подарков (30–40 в день) и отправки подарков для шанса на Lucky Friends.'
    },
    proTip: {
      cs: 'Použijte trik Pin & Unpin na každou pohlednici, abyste získali body do Vivillon medaile bez zaplnění 350 položek alba.',
      en: 'Combine with the instant Pin & Unpin trick to farm Vivillon medal credit without eating postcard storage space.',
      ja: 'ピン留め＋即解除裏技を併用すれば、ポストカード枠を消費せずビビヨン進捗を同時に進められます。',
      ru: 'Используйте трюк Pin & Unpin на каждой открытке для прокачки Вивиллонов без забивания альбома.'
    },
    iconName: 'users',
    color: '#06b6d4'
  },
  {
    id: 'distance-trades-weekend',
    day: 'weekend',
    time: { cs: 'Sobota & Neděle', en: 'Saturday & Sunday', ja: '土曜日・日曜日', ru: 'Суббота и Воскресенье' },
    category: 'social',
    title: {
      cs: 'Víkendové Výměny 100+ km (Garantované Candy XL)',
      en: 'Weekend 100+ km Trades (Guaranteed Candy XL)',
      ja: '週末100km長距離トレード（アメXL確定交換）',
      ru: 'Выходные трейды 100+ км (Гарантированная Candy XL)'
    },
    desc: {
      cs: 'Výměna Pokémonů chycených s geografickým odstupem 100+ km uděluje oběma trenérům garantované 1× Candy XL a 3× Candy za každý trade (až 100 tradů/den).',
      en: 'Trading Pokémon caught 100+ km apart awards 1 guaranteed Candy XL and 3 Candy to both players (up to 100 trades/day).',
      ja: '100km以上離れた場所で捕獲したポケモン同士を交換すると、双方にアメXL確定＋アメ3個が付与されます（1日最大100回）。',
      ru: 'Обмен покемонами с дистанцией 100+ км дает гарантированную 1× Candy XL и 3 конфеты обоим игрокам (до 100 трейдов в день).'
    },
    proTip: {
      cs: 'Hledejte "distance100-" v batohu pro zobrazení všech ulovených Pokémonů z vašich zahraničních cest nebo 7km vajec.',
      en: 'Type "distance100-" in search to display all foreign vacation catches or 7km gift hatchlings ready for trade.',
      ja: 'ボックス検索で「距離100-」と入力すると、旅行先や7kmタマゴ産の交換用ポケモンが一発で出ます。',
      ru: 'Введите "distance100-" в поиске для нахождения покемонов из отпусков или 7км яиц.'
    },
    iconName: 'users',
    color: '#10b981'
  },
  {
    id: 'daily-adventure-incense',
    day: 'daily',
    time: { cs: 'Denně (15 minut)', en: 'Daily (15 minutes)', ja: '毎日（15分間）', ru: 'Ежедневно (15 минут)' },
    category: 'daily',
    title: {
      cs: 'Daily Adventure Incense (Galarian Birds Lov)',
      en: 'Daily Adventure Incense (Galarian Birds Hunt)',
      ja: 'おさんぽおこう（ガラル三鳥探索）',
      ru: 'Daily Adventure Incense (Охота на Галарских Птиц)'
    },
    desc: {
      cs: 'Bezplatné denní kadidlo aktivní při nepřetržité svižné chůzi. Exkluzivní šance na setkání s Galarian Articuno, Zapdos a Moltres!',
      en: 'Free daily 15-minute walking incense. Exclusive source of wild Galarian Articuno, Zapdos, and Moltres spawns!',
      ja: '毎日1回15分間無料。歩行時のみポケモンが出現し、超激レアのガラル三鳥（フリーザー、サンダー、ファイヤー）と遭遇可能。',
      ru: 'Бесплатное 15-минутное ежедневное благовоние при ходьбе. Единственный шанс встретить диких Galarian Articuno, Zapdos и Moltres!'
    },
    proTip: {
      cs: 'Kráčejte v přímé linii rychlostí ~4–6 km/h (spawn každých 30 sekund / 50 metrů). Při méně než 30 Pokéballech vám hra zdarma doplní 30 Pokéballů!',
      en: 'Walk in a straight line at 4-6 km/h (spawns every 30s/50m). If under 30 balls, activating grants 30 free Poké Balls!',
      ja: '直線ルートを時速4〜6kmで歩くと30秒ごとに湧きます。手持ちボールが30個未満なら無料補充されます。',
      ru: 'Идите по прямой со скоростью 4–6 км/ч (спавн каждые 30 сек). Если шаров меньше 30, игра подарит 30 покеболов!'
    },
    iconName: 'compass',
    color: '#ec4899'
  },
  {
    id: 'daily-gym-coins',
    day: 'daily',
    time: { cs: 'Denní reset v 00:00', en: 'Daily Reset at Midnight', ja: '毎日 0:00 更新', ru: 'Сброс в 00:00' },
    category: 'daily',
    title: {
      cs: '50 Denních PokéCoins z Gymů (1 500 Coinů Měsíčně)',
      en: '50 Daily Gym Defense PokéCoins (1,500 Monthly)',
      ja: 'ジム防衛 毎日50ポケコイン（月間1,500コイン）',
      ru: '50 ежедневных PokéCoins из гимов (1 500 в месяц)'
    },
    desc: {
      cs: 'Obrana gymů přináší 1 PokéCoin za každých 10 minut obhajoby (strop 50 coinů/den = 8 hodin 20 minut). Základní zdroj prémiové měny pro nákup Storage a Raid Passů.',
      en: 'Gym defense yields 1 PokéCoin per 10 minutes defended (max 50 coins/day = 8 hrs 20 mins). Primary free currency source for Storage and Raid Passes.',
      ja: 'ジム防衛10分ごとに1コイン（1日上限50コイン＝8時間20分防衛）。無課金でボックス拡張やパスを買う生命線。',
      ru: 'Защита гимов приносит 1 PokéCoin за каждые 10 минут (лимит 50 монет/день = 8 часов 20 мин). Главный источник монет на слоты и пассы.'
    },
    proTip: {
      cs: 'Rozmístěte obránce do 3–5 různých gymů s různou fluktuací hráčů, abyste zajistili vyřazení v různé dny.',
      en: 'Stagger defenders across 3-5 gyms with varied turnover to prevent all returning on the same calendar day.',
      ja: '人の入れ替わりが激しいジムと静かなジムに分けて3〜5体配置し、同じ日に全員戻るのを防ぎましょう。',
      ru: 'Сажайте покемонов в 3–5 разных гимов, чтобы они не выбивались все в один и тот же день.'
    },
    iconName: 'coins',
    color: '#eab308'
  }
];

export const WeeklyMiniEventsInteractiveWidget: React.FC<WeeklyMiniEventsInteractiveWidgetProps> = ({ lang }) => {
  const [activeDay, setActiveDay] = useState<DayFilter>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'combat' | 'social' | 'collector' | 'daily'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Compute current day of week to give user immediate contextual highlight
  const currentDayOfWeek = useMemo(() => {
    const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    switch (dayIndex) {
      case 1: return 'monday';
      case 2: return 'tuesday';
      case 3: return 'wednesday';
      case 4: return 'thursday';
      case 5: return 'friday';
      default: return 'weekend';
    }
  }, []);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const filteredEvents = useMemo(() => {
    return ROUTINE_EVENTS.filter(evt => {
      if (activeDay !== 'all') {
        if (activeDay === 'daily') {
          if (evt.day !== 'daily') return false;
        } else if (evt.day !== activeDay && evt.day !== 'daily') {
          return false;
        }
      }

      if (activeCategory !== 'all' && evt.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [activeDay, activeCategory]);

  return (
    <div className="weekly-mini-events-widget">
      {/* Hero Header */}
      <div className="weekly-hero-header">
        <div className="weekly-badge-pill">
          <Calendar size={16} />
          <span>TRAINER WEEKLY TIMETABLE & ROUTINES</span>
        </div>
        <h2>
          {lang === 'cs' ? 'Týdenní Minieventy & Trenérské Rutiny: Interaktivní Kalendář' :
           lang === 'ja' ? '週間ミニイベント＆トレーナールーティン完全攻略カレンダー' :
           lang === 'ru' ? 'Еженедельные мини-ивенты и рутины: Интерактивный календарь' :
           'Weekly Mini-Events & Trainer Routines: Master Timetable'}
        </h2>
        <p>
          {lang === 'cs' ? 'Kompletní rozvrh týdne: Adventure Sync reset, Max Mondays, Spotlight & Raid Hour, PokéStop Showcases a denní návyky na mince a vzácné ptáky.' :
           lang === 'ja' ? 'アドベンチャーシンクリセット、マックスマンデー、スポットライト＆レイドアワー、おひろめ、毎日のコイン＆ガラル鳥回収ルーティン。' :
           lang === 'ru' ? 'Полное расписание недели: Adventure Sync, Max Mondays, Spotlight & Raid Hour, викенд-шоукейсы и ежедневные рутины.' :
           'Full weekly playbook: Adventure Sync tally, Max Mondays, Spotlight & Raid Hour, weekend Showcases, and daily habits for free coins and rare birds.'}
        </p>

        {/* Current Day Context Banner */}
        <div className="today-context-banner">
          <Clock size={18} color="#38bdf8" />
          <div className="banner-content">
            <strong>
              {lang === 'cs' ? `Dnes je ${currentDayOfWeek === 'monday' ? 'Pondělí' : currentDayOfWeek === 'tuesday' ? 'Úterý' : currentDayOfWeek === 'wednesday' ? 'Středa' : currentDayOfWeek === 'thursday' ? 'Čtvrtek' : currentDayOfWeek === 'friday' ? 'Pátek' : 'Víkend'}!` :
               lang === 'ja' ? `今日は ${currentDayOfWeek === 'monday' ? '月曜日' : currentDayOfWeek === 'tuesday' ? '火曜日' : currentDayOfWeek === 'wednesday' ? '水曜日' : currentDayOfWeek === 'thursday' ? '木曜日' : currentDayOfWeek === 'friday' ? '金曜日' : '週末'} です！` :
               lang === 'ru' ? `Сегодня ${currentDayOfWeek === 'monday' ? 'Понедельник' : currentDayOfWeek === 'tuesday' ? 'Вторник' : currentDayOfWeek === 'wednesday' ? 'Среда' : currentDayOfWeek === 'thursday' ? 'Четверг' : currentDayOfWeek === 'friday' ? 'Пятница' : 'Выходной'}!` :
               `Today is ${currentDayOfWeek.charAt(0).toUpperCase() + currentDayOfWeek.slice(1)}!`}
            </strong>
            <span>
              {lang === 'cs' ? 'Nezapomeňte zkontrolovat denní odměny a dnešní časově omezenou hodinu v menu níže.' :
               'Check below for today\'s scheduled routine and active hour bonus.'}
            </span>
          </div>
          <button 
            type="button" 
            className="filter-today-quick-btn"
            onClick={() => setActiveDay(currentDayOfWeek as DayFilter)}
          >
            {lang === 'cs' ? 'Filtrovat na dnešek' : 'Filter for Today'}
          </button>
        </div>
      </div>

      {/* Day Filter Tabs */}
      <div className="weekly-filters-panel">
        <div className="day-filter-tabs">
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'all' ? 'active' : ''}`}
            onClick={() => setActiveDay('all')}
          >
            {lang === 'cs' ? 'Celý týden' : 'Full Week'}
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'monday' ? 'active' : ''}`}
            onClick={() => setActiveDay('monday')}
          >
            <span>{lang === 'cs' ? 'Po (Sync + Max)' : 'Mon (Max)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'tuesday' ? 'active' : ''}`}
            onClick={() => setActiveDay('tuesday')}
          >
            <span>{lang === 'cs' ? 'Út (Spotlight)' : 'Tue (Spotlight)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'wednesday' ? 'active' : ''}`}
            onClick={() => setActiveDay('wednesday')}
          >
            <span>{lang === 'cs' ? 'St (Raid Hour)' : 'Wed (Raid)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'thursday' ? 'active' : ''}`}
            onClick={() => setActiveDay('thursday')}
          >
            <span>{lang === 'cs' ? 'Čt (Showcase)' : 'Thu (Showcase)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'friday' ? 'active' : ''}`}
            onClick={() => setActiveDay('friday')}
          >
            <span>{lang === 'cs' ? 'Pá (Friendship)' : 'Fri (Friendship)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'weekend' ? 'active' : ''}`}
            onClick={() => setActiveDay('weekend')}
          >
            <span>{lang === 'cs' ? 'So/Ne (Trady)' : 'Sat/Sun (Trades)'}</span>
          </button>
          <button 
            type="button" 
            className={`day-tab-btn ${activeDay === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveDay('daily')}
          >
            <span>{lang === 'cs' ? '✨ Denní návyky' : '✨ Daily Habits'}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-pills">
          <button 
            type="button" 
            className={`cat-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            {lang === 'cs' ? 'Všechny disciplíny' : 'All Disciplines'}
          </button>
          <button 
            type="button" 
            className={`cat-pill ${activeCategory === 'combat' ? 'active' : ''}`}
            onClick={() => setActiveCategory('combat')}
          >
            <Swords size={13} />
            <span>{lang === 'cs' ? 'Boj & Raidy' : 'Combat & Raids'}</span>
          </button>
          <button 
            type="button" 
            className={`cat-pill ${activeCategory === 'collector' ? 'active' : ''}`}
            onClick={() => setActiveCategory('collector')}
          >
            <Sparkles size={13} />
            <span>{lang === 'cs' ? 'Sběratel & Spawny' : 'Collector & Spawns'}</span>
          </button>
          <button 
            type="button" 
            className={`cat-pill ${activeCategory === 'social' ? 'active' : ''}`}
            onClick={() => setActiveCategory('social')}
          >
            <Users size={13} />
            <span>{lang === 'cs' ? 'Dárky & Trady' : 'Gifts & Trades'}</span>
          </button>
          <button 
            type="button" 
            className={`cat-pill ${activeCategory === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveCategory('daily')}
          >
            <Footprints size={13} />
            <span>{lang === 'cs' ? 'Denní rutiny' : 'Daily Habits'}</span>
          </button>
        </div>
      </div>

      {/* Routine Cards Grid */}
      <div className="routines-grid">
        {filteredEvents.map(evt => (
          <div key={evt.id} className="routine-card" style={{ borderLeftColor: evt.color }}>
            <div className="routine-card-header">
              <div className="routine-title-wrap">
                <span className="routine-badge-tag" style={{ background: `${evt.color}22`, color: evt.color, borderColor: `${evt.color}44` }}>
                  {evt.time[lang] || evt.time.en}
                </span>
                <strong className="routine-title">{evt.title[lang] || evt.title.en}</strong>
              </div>
            </div>

            <p className="routine-desc">{evt.desc[lang] || evt.desc.en}</p>

            <div className="routine-protip-box">
              <Zap size={14} color="#facc15" />
              <div className="protip-text">
                <strong className="protip-label">{lang === 'cs' ? 'PRO-TIP:' : 'PRO-TIP:'}</strong>
                <span>{evt.proTip[lang] || evt.proTip.en}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1-Click Pro Search Strings Card */}
      <div className="pro-search-strings-panel">
        <div className="panel-title-row">
          <Copy size={18} color="#facc15" />
          <h3>
            {lang === 'cs' ? '1-Click Vyhledávací Filtry pro Týdenní Rutiny' :
             lang === 'ja' ? '週間ルーティン用ワンタップ検索コマンド' :
             lang === 'ru' ? 'Быстрые поисковые фильтры для рутин' :
             '1-Click Weekly Routine In-Game Search Strings'}
          </h3>
        </div>

        <div className="search-cards-grid">
          <div className="search-snippet-card">
            <div className="snippet-info">
              <code>distance100-</code>
              <span>{lang === 'cs' ? 'Víkendové trady: Pokémoni s garantovanou Candy XL' : 'Weekend trades: 100+ km catches with guaranteed Candy XL'}</span>
            </div>
            <button 
              type="button" 
              className="copy-btn"
              onClick={() => handleCopy('distance100-', 'dist100')}
            >
              {copiedKey === 'dist100' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'dist100' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-snippet-card">
            <div className="snippet-info">
              <code>xxl,xxs</code>
              <span>{lang === 'cs' ? 'Čtvrtek až Neděle: Všichni kandidáti na PokéStop Showcases' : 'Thu to Sun: Extreme size candidates for PokéStop Showcases'}</span>
            </div>
            <button 
              type="button" 
              className="copy-btn"
              onClick={() => handleCopy('xxl,xxs', 'xxl')}
            >
              {copiedKey === 'xxl' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'xxl' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-snippet-card">
            <div className="snippet-info">
              <code>age0&!4*&!shiny</code>
              <span>{lang === 'cs' ? 'Rychlá večerní čistka dnešních úlovků před spaním' : 'Evening cleanup: Today\'s non-rare catches ready for bulk transfer'}</span>
            </div>
            <button 
              type="button" 
              className="copy-btn"
              onClick={() => handleCopy('age0&!4*&!shiny', 'age0')}
            >
              {copiedKey === 'age0' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'age0' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-snippet-card">
            <div className="snippet-info">
              <code>tradeevolve</code>
              <span>{lang === 'cs' ? 'Pokémoni s bezplatnou evolucí za 0 Candy po výměně' : 'Free 0-candy evolutions when traded with friends'}</span>
            </div>
            <button 
              type="button" 
              className="copy-btn"
              onClick={() => handleCopy('tradeevolve', 'tradeevolve')}
            >
              {copiedKey === 'tradeevolve' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'tradeevolve' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

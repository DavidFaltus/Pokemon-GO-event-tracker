'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Swords, 
  Users, 
  CloudSun, 
  Sparkles, 
  Zap, 
  Target, 
  Check, 
  Copy, 
  Award, 
  HelpCircle,
  ShieldAlert,
  Flame
} from 'lucide-react';
import './RaidCountersInteractiveWidget.css';

interface RaidCountersInteractiveWidgetProps {
  lang: Language;
}

interface RaidBossData {
  id: string;
  name: string;
  dexId: number;
  types: string[];
  weather: Record<Language, string>;
  weatherKey: string;
  lvl20Min: number;
  lvl20Hundo: number;
  lvl25Min: number;
  lvl25Hundo: number;
  counters: {
    name: string;
    dexId: number;
    type: string;
    fastMove: string;
    chargedMove: string;
  }[];
}

const RAID_BOSSES: RaidBossData[] = [
  {
    id: 'rayquaza',
    name: 'Rayquaza',
    dexId: 384,
    types: ['Dragon', 'Flying'],
    weather: { cs: 'Větrno (Windy)', en: 'Windy', ja: '強風', ru: 'Ветрено' },
    weatherKey: 'windy',
    lvl20Min: 2102,
    lvl20Hundo: 2191,
    lvl25Min: 2627,
    lvl25Hundo: 2739,
    counters: [
      { name: 'Mamoswine', dexId: 473, type: 'Ice', fastMove: 'Powder Snow', chargedMove: 'Avalanche' },
      { name: 'Baxcalibur', dexId: 998, type: 'Ice', fastMove: 'Ice Fang', chargedMove: 'Avalanche' },
      { name: 'Glaceon', dexId: 471, type: 'Ice', fastMove: 'Frost Breath', chargedMove: 'Avalanche' }
    ]
  },
  {
    id: 'mewtwo',
    name: 'Mewtwo',
    dexId: 150,
    types: ['Psychic'],
    weather: { cs: 'Větrno (Windy)', en: 'Windy', ja: '強風', ru: 'Ветрено' },
    weatherKey: 'windy',
    lvl20Min: 2294,
    lvl20Hundo: 2387,
    lvl25Min: 2868,
    lvl25Hundo: 2984,
    counters: [
      { name: 'Tyranitar', dexId: 248, type: 'Dark', fastMove: 'Bite', chargedMove: 'Brutal Swing' },
      { name: 'Hydreigon', dexId: 635, type: 'Dark', fastMove: 'Bite', chargedMove: 'Brutal Swing' },
      { name: 'Giratina-Origin', dexId: 487, type: 'Ghost', fastMove: 'Shadow Claw', chargedMove: 'Shadow Force' }
    ]
  },
  {
    id: 'kyogre',
    name: 'Kyogre',
    dexId: 382,
    types: ['Water'],
    weather: { cs: 'Déšť (Rainy)', en: 'Rainy', ja: '雨', ru: 'Дождь' },
    weatherKey: 'rainy',
    lvl20Min: 2260,
    lvl20Hundo: 2351,
    lvl25Min: 2825,
    lvl25Hundo: 2939,
    counters: [
      { name: 'Kartana', dexId: 798, type: 'Grass', fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade' },
      { name: 'Zekrom', dexId: 644, type: 'Electric', fastMove: 'Charge Beam', chargedMove: 'Fusion Bolt' },
      { name: 'Raikou', dexId: 243, type: 'Electric', fastMove: 'Thunder Shock', chargedMove: 'Wild Charge' }
    ]
  },
  {
    id: 'groudon',
    name: 'Groudon',
    dexId: 383,
    types: ['Ground'],
    weather: { cs: 'Slunečno (Sunny)', en: 'Sunny', ja: '晴天', ru: 'Солнечно' },
    weatherKey: 'sunny',
    lvl20Min: 2260,
    lvl20Hundo: 2351,
    lvl25Min: 2825,
    lvl25Hundo: 2939,
    counters: [
      { name: 'Kyogre', dexId: 382, type: 'Water', fastMove: 'Waterfall', chargedMove: 'Origin Pulse' },
      { name: 'Swampert', dexId: 260, type: 'Water', fastMove: 'Water Gun', chargedMove: 'Hydro Cannon' },
      { name: 'Kartana', dexId: 798, type: 'Grass', fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade' }
    ]
  },
  {
    id: 'dialga-origin',
    name: 'Dialga (Origin)',
    dexId: 483,
    types: ['Steel', 'Dragon'],
    weather: { cs: 'Sníh / Větrno (Snow / Windy)', en: 'Snow / Windy', ja: '雪 / 強風', ru: 'Снег / Ветрено' },
    weatherKey: 'snow',
    lvl20Min: 2246,
    lvl20Hundo: 2337,
    lvl25Min: 2807,
    lvl25Hundo: 2921,
    counters: [
      { name: 'Terrakion', dexId: 639, type: 'Fighting', fastMove: 'Double Kick', chargedMove: 'Sacred Sword' },
      { name: 'Lucario', dexId: 448, type: 'Fighting', fastMove: 'Counter', chargedMove: 'Aura Sphere' },
      { name: 'Groudon', dexId: 383, type: 'Ground', fastMove: 'Mud Shot', chargedMove: 'Precipice Blades' }
    ]
  },
  {
    id: 'necrozma',
    name: 'Necrozma',
    dexId: 800,
    types: ['Psychic'],
    weather: { cs: 'Větrno (Windy)', en: 'Windy', ja: '強風', ru: 'Ветрено' },
    weatherKey: 'windy',
    lvl20Min: 2026,
    lvl20Hundo: 2104,
    lvl25Min: 2532,
    lvl25Hundo: 2630,
    counters: [
      { name: 'Tyranitar', dexId: 248, type: 'Dark', fastMove: 'Bite', chargedMove: 'Brutal Swing' },
      { name: 'Hydreigon', dexId: 635, type: 'Dark', fastMove: 'Bite', chargedMove: 'Brutal Swing' },
      { name: 'Chandelure', dexId: 609, type: 'Ghost', fastMove: 'Hex', chargedMove: 'Shadow Ball' }
    ]
  }
];

export const RaidCountersInteractiveWidget: React.FC<RaidCountersInteractiveWidgetProps> = ({ lang }) => {
  // Party Power & Damage Simulator State
  const [partySize, setPartySize] = useState<number>(2); // 1 = solo, 2, 3, 4
  const [friendshipTier, setFriendshipTier] = useState<number>(10); // 0, 3, 5, 7, 10 (%)
  const [weatherBoost, setWeatherBoost] = useState<boolean>(true); // +20%
  const [partyPowerActive, setPartyPowerActive] = useState<boolean>(true); // 2x charged move

  // Selected Raid Boss for Hundo Calculator
  const [selectedBossId, setSelectedBossId] = useState<string>('rayquaza');
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const selectedBoss = useMemo(() => {
    return RAID_BOSSES.find(b => b.id === selectedBossId) || RAID_BOSSES[0];
  }, [selectedBossId]);

  // Compute Total Damage Multiplier for Charged Move
  const computedMultiplier = useMemo(() => {
    let mult = 1.0;
    // Friendship
    mult *= (1 + friendshipTier / 100);
    // Weather Boost
    if (weatherBoost) {
      mult *= 1.20;
    }
    // Party Power (doubles charged move damage)
    if (partyPowerActive && partySize >= 2) {
      mult *= 2.0;
    }
    return mult.toFixed(2);
  }, [friendshipTier, weatherBoost, partyPowerActive, partySize]);

  const handleCopy = async (query: string, key: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedQuery(key);
      setTimeout(() => setCopiedQuery(null), 2500);
    } catch {
      setCopiedQuery(key);
      setTimeout(() => setCopiedQuery(null), 2500);
    }
  };

  return (
    <div className="raid-interactive-widget">
      {/* 1. PARTY POWER & MULTIPLIER SIMULATOR */}
      <div className="raid-calc-card">
        <div className="raid-calc-header">
          <Zap size={22} className="calc-header-icon" />
          <div>
            <h3>
              {lang === 'cs' ? 'Kalkulačka poškození: Party Power, Přátelé & Počasí' : 
               lang === 'ja' ? 'レイドダメージシミュレーター：チームコラボ・親友・天候' : 
               lang === 'ru' ? 'Калькулятор урона: Party Power, Дружба и Погода' : 
               'Raid Damage Calculator: Party Power, Friendship & Weather'}
            </h3>
            <p className="calc-header-desc">
              {lang === 'cs' ? 'Vyzkoušejte, jak se násobí síla vašich Charged útoků při kombinaci týmové mechaniky Party Play a bonusů:' : 
               'Test how your Charged Attack power multiplies when stacking Party Play and environmental boosts:'}
            </p>
          </div>
        </div>

        <div className="calc-controls-grid">
          {/* Party Size */}
          <div className="control-group">
            <label>
              <Users size={15} />
              <span>{lang === 'cs' ? 'Velikost party (Party Play):' : 'Party Size:'}</span>
            </label>
            <div className="pill-button-group">
              {[1, 2, 3, 4].map(size => (
                <button
                  key={size}
                  type="button"
                  className={`pill-btn ${partySize === size ? 'active' : ''}`}
                  onClick={() => setPartySize(size)}
                >
                  {size === 1 ? (lang === 'cs' ? 'Solo (1)' : 'Solo') : `${size} trenéři`}
                </button>
              ))}
            </div>
          </div>

          {/* Friendship Boost */}
          <div className="control-group">
            <label>
              <Award size={15} />
              <span>{lang === 'cs' ? 'Úroveň přátelství v raidu:' : 'Friendship Level:'}</span>
            </label>
            <div className="pill-button-group">
              <button
                type="button"
                className={`pill-btn ${friendshipTier === 0 ? 'active' : ''}`}
                onClick={() => setFriendshipTier(0)}
              >
                0%
              </button>
              <button
                type="button"
                className={`pill-btn ${friendshipTier === 3 ? 'active' : ''}`}
                onClick={() => setFriendshipTier(3)}
              >
                Good (+3%)
              </button>
              <button
                type="button"
                className={`pill-btn ${friendshipTier === 5 ? 'active' : ''}`}
                onClick={() => setFriendshipTier(5)}
              >
                Great (+5%)
              </button>
              <button
                type="button"
                className={`pill-btn ${friendshipTier === 7 ? 'active' : ''}`}
                onClick={() => setFriendshipTier(7)}
              >
                Ultra (+7%)
              </button>
              <button
                type="button"
                className={`pill-btn ${friendshipTier === 10 ? 'active' : ''}`}
                onClick={() => setFriendshipTier(10)}
              >
                Best (+10%)
              </button>
            </div>
          </div>

          {/* Toggles: Weather Boost & Party Power Button */}
          <div className="control-toggles-row">
            <button
              type="button"
              className={`toggle-action-btn ${weatherBoost ? 'toggled-on' : ''}`}
              onClick={() => setWeatherBoost(!weatherBoost)}
            >
              <CloudSun size={16} />
              <span>{lang === 'cs' ? 'Weather Boost (+20% damage)' : 'Weather Boost (+20%)'}</span>
            </button>

            <button
              type="button"
              className={`toggle-action-btn ${partyPowerActive && partySize >= 2 ? 'toggled-on party-active' : ''}`}
              onClick={() => setPartyPowerActive(!partyPowerActive)}
              disabled={partySize < 2}
            >
              <Zap size={16} />
              <span>
                {partySize < 2 ? 
                  (lang === 'cs' ? 'Party Power (Vyžaduje 2+ hráče)' : 'Party Power (Needs 2+ Players)') : 
                  (lang === 'cs' ? 'Party Power (2× Charged Damage)' : 'Party Power (2x Charged Damage)')}
              </span>
            </button>
          </div>
        </div>

        {/* Live Multiplier Result Card */}
        <div className="calc-result-box">
          <div className="multiplier-value-col">
            <span className="mult-label">{lang === 'cs' ? 'Celkový násobič Charged Move:' : 'Total Charged Move Multiplier:'}</span>
            <span className="mult-big-number">{computedMultiplier}×</span>
          </div>
          <div className="multiplier-explanation">
            {partySize >= 2 && partyPowerActive ? (
              <span className="expl-text text-green">
                ✨ {lang === 'cs' ? 
                  `Extrémní nárůst! Každý nabitý útok udělí ${computedMultiplier}× základního poškození. Díky tomu zvládnete 5★ Legendární bosse ve 2 lidech.` : 
                  `Lethal burst! Your Charged Move deals ${computedMultiplier}x base damage, allowing duos to easily conquer 5★ legendaries.`}
              </span>
            ) : (
              <span className="expl-text">
                💡 {lang === 'cs' ? 'Zapněte Party Play se 2+ hráči pro aktivaci 2× Party Power násobiče!' : 'Form a Party with 2+ trainers to unlock the 2x Party Power multiplier!'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. 100% IV (HUNDO) CATCH CP & COUNTER SELECTOR */}
      <div className="raid-hundo-card">
        <div className="hundo-header-row">
          <Target size={22} className="hundo-header-icon" />
          <div>
            <h3>
              {lang === 'cs' ? 'Rozpoznání 100% IV (Hundo) při chytání & S-Tier Countery' : 
               lang === 'ja' ? '捕獲時100% IV（個体値MAX）CP判別＆最適カウンター' : 
               lang === 'ru' ? 'Определение 100% IV при поимке и S-Tier контеры' : 
               '100% IV (Hundo) Catch CP Range & S-Tier Counters'}
            </h3>
            <p className="hundo-header-desc">
              {lang === 'cs' ? 'Vyberte bosse a okamžitě zjistěte, zda chytáte perfektního 100% IV (Level 20 i počasím boostnutý Level 25):' : 
               'Select a legendary boss to preview exact 100% IV CP values at both Level 20 and Level 25:'}
            </p>
          </div>
        </div>

        {/* Boss Selector Tabs */}
        <div className="boss-selector-pills">
          {RAID_BOSSES.map(b => (
            <button
              key={b.id}
              type="button"
              className={`boss-pill-btn ${selectedBossId === b.id ? 'active' : ''}`}
              onClick={() => setSelectedBossId(b.id)}
            >
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${b.dexId}.png`} 
                alt={b.name} 
                className="boss-mini-sprite"
              />
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Boss Display Deck */}
        <div className="boss-detail-deck">
          <div className="boss-identity-col">
            <div className="boss-art-wrap">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedBoss.dexId}.png`} 
                alt={selectedBoss.name} 
                className="boss-large-art"
              />
            </div>
            <span className="boss-name-big">{selectedBoss.name}</span>
            <div className="boss-weather-pill">
              <CloudSun size={14} />
              <span>{selectedBoss.weather[lang] || selectedBoss.weather.en}</span>
            </div>
          </div>

          <div className="boss-cp-stats-col">
            {/* Standard Level 20 Card */}
            <div className="cp-tier-card">
              <div className="cp-tier-title">
                <span>Level 20 (Standardní raid)</span>
                <span className="cp-iv-note">Min 10/10/10 • Max 15/15/15</span>
              </div>
              <div className="cp-values-row">
                <div className="cp-val-box">
                  <span className="cp-val-label">{lang === 'cs' ? 'Minimální CP (10/10/10)' : 'Min CP:'}</span>
                  <span className="cp-val-number">{selectedBoss.lvl20Min}</span>
                </div>
                <div className="cp-val-box val-box-hundo">
                  <span className="cp-val-label gold-label">100% IV Hundo (15/15/15)</span>
                  <span className="cp-val-number gold-number">{selectedBoss.lvl20Hundo} CP 🏆</span>
                </div>
              </div>
            </div>

            {/* Weather Boosted Level 25 Card */}
            <div className="cp-tier-card tier-card-boosted">
              <div className="cp-tier-title">
                <span className="boosted-title-text">⚡ Level 25 (Weather Boost)</span>
                <span className="cp-iv-note">{selectedBoss.weather[lang] || selectedBoss.weather.en}</span>
              </div>
              <div className="cp-values-row">
                <div className="cp-val-box">
                  <span className="cp-val-label">{lang === 'cs' ? 'Minimální CP (10/10/10)' : 'Min CP:'}</span>
                  <span className="cp-val-number">{selectedBoss.lvl25Min}</span>
                </div>
                <div className="cp-val-box val-box-hundo">
                  <span className="cp-val-label gold-label">100% IV Hundo (15/15/15)</span>
                  <span className="cp-val-number gold-number">{selectedBoss.lvl25Hundo} CP 🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimal S-Tier Counters for Selected Boss */}
        <div className="boss-counters-container">
          <h4 className="counters-heading">
            <Swords size={16} />
            <span>{lang === 'cs' ? `Doporučené S-Tier countery pro ${selectedBoss.name}:` : `Top S-Tier Counters for ${selectedBoss.name}:`}</span>
          </h4>
          <div className="counters-triad-grid">
            {selectedBoss.counters.map(c => (
              <div key={c.name} className="triad-counter-card">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c.dexId}.png`} 
                  alt={c.name} 
                  className="counter-poke-artwork"
                />
                <div className="counter-card-info">
                  <span className="counter-name">{c.name}</span>
                  <span className="counter-type-badge">{c.type}</span>
                  <span className="counter-moveset">
                    {c.fastMove} + <strong>{c.chargedMove}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CIRCLE LOCK TECHNIQUE VISUAL GUIDE */}
      <div className="circle-lock-guide-card">
        <div className="circle-lock-header">
          <Target size={20} className="circle-lock-icon" />
          <h3>
            {lang === 'cs' ? 'Technika Circle Lock: Jak dosáhnout 90%+ úspěšnosti chycení' : 
             lang === 'ja' ? 'サークル固定投法（Circle Lock）で捕獲率90%超えを実現' : 
             lang === 'ru' ? 'Техника Circle Lock: 90%+ шанс поимки легендарного босса' : 
             'Circle Lock Technique: Guaranteeing a 90%+ Catch Rate'}
          </h3>
        </div>
        <div className="circle-lock-steps">
          <div className="lock-step">
            <span className="lock-step-num">1</span>
            <div className="lock-step-content">
              <strong>{lang === 'cs' ? 'Uzamčení kruhu' : 'Lock the Circle'}</strong>
              <p>{lang === 'cs' ? 'Podržte Poké Ball, dokud se kruh nezmenší na velikost Excellent (menší než hlava bosse), a míček pusťte bez hození.' : 'Hold the ball until target ring shrinks to Excellent size, then let go without throwing.'}</p>
            </div>
          </div>
          <div className="lock-step">
            <span className="lock-step-num">2</span>
            <div className="lock-step-content">
              <strong>{lang === 'cs' ? 'Čekání na útok' : 'Wait for Attack'}</strong>
              <p>{lang === 'cs' ? 'Nesahejte na obrazovku a vyčkejte, až boss provede útočnou animaci (výpad, skok nebo zařvání).' : 'Do not touch screen until boss initiates an attack animation (lunge/strike).'}</p>
            </div>
          </div>
          <div className="lock-step">
            <span className="lock-step-num">3</span>
            <div className="lock-step-content">
              <strong>{lang === 'cs' ? 'Hod na 70 % animace' : 'Throw at 70%'}</strong>
              <p>{lang === 'cs' ? 'V 70 % animace roztočte míček a hoďte točený hod do středu. Kruh se uzamkne v přesné nastavené velikosti!' : 'Spin and throw curved ball at 70% of attack recovery. The ring remains locked at Excellent!'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ESSENTIAL SEARCH FILTERS */}
      <div className="raid-search-strings">
        <div className="strings-title">
          <Copy size={16} />
          <span>{lang === 'cs' ? 'Rychlé vyhledávací řetězce pro raidový tým:' : 'Quick Search Strings for Raid Teams:'}</span>
        </div>
        <div className="strings-pills-wrap">
          <div className="string-pill">
            <code>mega3&!shadow</code>
            <button 
              type="button" 
              onClick={() => handleCopy('mega3&!shadow', 'mega')}
              className={`string-btn ${copiedQuery === 'mega' ? 'copied' : ''}`}
            >
              {copiedQuery === 'mega' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedQuery === 'mega' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="string-pill">
            <code>@1ice&@2ice</code>
            <button 
              type="button" 
              onClick={() => handleCopy('@1ice&@2ice', 'ice')}
              className={`string-btn ${copiedQuery === 'ice' ? 'copied' : ''}`}
            >
              {copiedQuery === 'ice' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedQuery === 'ice' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="string-pill">
            <code>4*&legendary</code>
            <button 
              type="button" 
              onClick={() => handleCopy('4*&legendary', 'hundo')}
              className={`string-btn ${copiedQuery === 'hundo' ? 'copied' : ''}`}
            >
              {copiedQuery === 'hundo' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedQuery === 'hundo' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Clock, 
  Sparkles, 
  Zap, 
  Gift, 
  Award, 
  Copy, 
  Check, 
  HelpCircle, 
  Footprints, 
  Flame,
  Layers,
  Info
} from 'lucide-react';
import './EggHatchingInteractiveWidget.css';

interface EggHatchingInteractiveWidgetProps {
  lang: Language;
}

type EggTier = '2km' | '5km' | '7km' | '10km' | '12km' | 'sync50km';

interface EggDetails {
  distanceKm: number;
  color: string;
  name: Record<Language, string>;
  source: Record<Language, string>;
  baseDustRange: [number, number];
  candyRange: [number, number];
  keyChases: { name: string; dexId: number; note: Record<Language, string> }[];
}

const EGG_DATA: Record<EggTier, EggDetails> = {
  '2km': {
    distanceKm: 2,
    color: '#22c55e',
    name: { cs: '2km Zelené Vejce', en: '2km Green Egg', ja: '2km タマゴ（緑）', ru: '2км Зеленое яйцо' },
    source: { cs: 'PokéStopy & Gymy', en: 'PokéStops & Gyms', ja: 'ポケストップ＆ジム', ru: 'Покестопы и гимы' },
    baseDustRange: [400, 800],
    candyRange: [5, 15],
    keyChases: [
      { name: 'Pichu', dexId: 172, note: { cs: 'Baby Pokémon • 1/64 Shiny', en: 'Baby Pokémon • 1/64 Shiny', ja: 'ベイビィ • 色違い1/64', ru: 'Бэби • Шайни 1/64' } },
      { name: 'Togepi', dexId: 175, note: { cs: 'Togekiss evoluce do Master League', en: 'Togekiss Master League meta', ja: 'トゲキッス進化先', ru: 'Для Master League' } },
      { name: 'Larvesta', dexId: 636, note: { cs: 'Ultra vzácný drop (Tier 5)', en: 'Ultra rare hatch (Tier 5)', ja: 'メラルバ（超激レア）', ru: 'Ультраредкий дроп' } }
    ]
  },
  '5km': {
    distanceKm: 5,
    color: '#eab308',
    name: { cs: '5km Žluté Vejce', en: '5km Yellow Egg', ja: '5km タマゴ（黄）', ru: '5км Желтое яйцо' },
    source: { cs: 'PokéStopy & Gymy', en: 'PokéStops & Gyms', ja: 'ポケストップ＆ジム', ru: 'Покестопы и гимы' },
    baseDustRange: [800, 1600],
    candyRange: [10, 21],
    keyChases: [
      { name: 'Machop', dexId: 66, note: { cs: 'Machamp raidový útočník', en: 'Machamp top PvE fighter', ja: 'カイリキー用高個体値', ru: 'Топ PvE боец' } },
      { name: 'Gligar', dexId: 207, note: { cs: 'Gliscor do Great League', en: 'Gliscor Great League meta', ja: 'グライオン対戦用', ru: 'Для Great League' } },
      { name: 'Larvesta', dexId: 636, note: { cs: 'Volcarona evoluce (400 Candy)', en: 'Volcarona evolution (400 Candy)', ja: 'ウルガモス進化（アメ400個）', ru: 'Для Volcarona (400 конфет)' } }
    ]
  },
  '7km': {
    distanceKm: 7,
    color: '#ec4899',
    name: { cs: '7km Růžové Vejce (Dárky)', en: '7km Pink Gift Egg', ja: '7km タマゴ（フレンドギフト）', ru: '7км Розовое яйцо (Подарки)' },
    source: { cs: 'Dárky od přátel', en: 'Gifts from Friends', ja: 'フレンドのギフト限定', ru: 'Подарки друзей' },
    baseDustRange: [800, 1600],
    candyRange: [10, 21],
    keyChases: [
      { name: 'Vulpix-Alola', dexId: 37, note: { cs: 'Alolan Ninetales (PvP Great)', en: 'Alolan Ninetales (Great League)', ja: 'アローラロコン（PvP用）', ru: 'Alolan Ninetales для PvP' } },
      { name: 'Meowth-Galar', dexId: 52, note: { cs: 'Perrserker do raidů', en: 'Perrserker raid specialist', ja: 'ガラルニャース', ru: 'Perrserker для рейдов' } },
      { name: 'Riolu', dexId: 447, note: { cs: 'Lucario evoluce • 1/64 Shiny', en: 'Lucario evolution • 1/64 Shiny', ja: 'リオル • 色違い1/64', ru: 'Эволюция в Lucario • 1/64 Shiny' } }
    ]
  },
  '10km': {
    distanceKm: 10,
    color: '#a855f7',
    name: { cs: '10km Fialové Vejce', en: '10km Purple Egg', ja: '10km タマゴ（紫）', ru: '10км Фиолетовое яйцо' },
    source: { cs: 'PokéStopy & Gymy', en: 'PokéStops & Gyms', ja: 'ポケストップ＆ジム', ru: 'Покестопы и гимы' },
    baseDustRange: [1600, 3200],
    candyRange: [16, 32],
    keyChases: [
      { name: 'Frigibax', dexId: 996, note: { cs: 'Baxcalibur dračí monstrum', en: 'Baxcalibur pseudo-legendary', ja: 'セビエ（セグレイブ進化）', ru: 'Baxcalibur дракон' } },
      { name: 'Larvitar', dexId: 246, note: { cs: 'Tyranitar Mega/Rock/Dark', en: 'Tyranitar Mega/Rock/Dark', ja: 'ヨーギラス（バンギラス進化）', ru: 'Для Mega Tyranitar' } },
      { name: 'Carbink', dexId: 703, note: { cs: 'Great League #1 Tank', en: 'Great League #1 Bulk Anchor', ja: 'メレシー（スーパーリーグ壁役）', ru: 'Топ танк Great League' } },
      { name: 'Jangmo-o', dexId: 782, note: { cs: 'Kommo-o PvP bojovník', en: 'Kommo-o Master/Ultra fighter', ja: 'ジャラコ（ジャラランガ進化）', ru: 'Kommo-o боец' } }
    ]
  },
  '12km': {
    distanceKm: 12,
    color: '#ef4444',
    name: { cs: '12km Červené Strange Vejce', en: '12km Red Strange Egg', ja: '12km 12キロタマゴ（ロケット団）', ru: '12км Красное Strange яйцо' },
    source: { cs: 'Lídři Team GO Rocket', en: 'Team GO Rocket Leaders', ja: 'リーダー（クリフ/シエラ/アルロ）', ru: 'Лидеры Команды R' },
    baseDustRange: [3200, 6400],
    candyRange: [24, 64],
    keyChases: [
      { name: 'Salandit', dexId: 757, note: { cs: 'POUZE SAMICE (12,5 %) se vyvíjí v Salazzle!', en: 'FEMALE ONLY (12.5%) evolves to Salazzle!', ja: 'メス（12.5%）のみエンニュートへ進化！', ru: 'ТОЛЬКО САМКА (12.5%) эволюционирует в Salazzle!' } },
      { name: 'Varoom', dexId: 965, note: { cs: 'Revavroom evoluce (50 Candy)', en: 'Revavroom evolution (50 Candy)', ja: 'ブロロン（ブロロローム進化）', ru: 'Revavroom эволюция' } },
      { name: 'Pawniard', dexId: 624, note: { cs: 'Bisharp / Kingambit příprava', en: 'Bisharp / Kingambit prep', ja: 'コマタナ（ドドゲザン待機）', ru: 'Подготовка к Kingambit' } },
      { name: 'Sandile', dexId: 551, note: { cs: 'Krookodile Dark/Ground', en: 'Krookodile Dark/Ground', ja: 'メグロコ（ワルビアル進化）', ru: 'Krookodile Dark/Ground' } }
    ]
  },
  'sync50km': {
    distanceKm: 10,
    color: '#38bdf8',
    name: { cs: 'Adventure Sync 50km Vejce', en: 'Adventure Sync 50km Egg', ja: 'いつでも冒険モード50kmタマゴ', ru: 'Adventure Sync 50км яйцо' },
    source: { cs: 'Pondělní odměna v 9:00 za 50 km', en: 'Monday 9:00 AM reward for 50km', ja: '月曜朝9時の週間50km達成報酬', ru: 'Награда в понедельник в 9:00 за 50км' },
    baseDustRange: [1600, 3200],
    candyRange: [16, 32],
    keyChases: [
      { name: 'Riolu', dexId: 447, note: { cs: 'Exkluzivní 1/64 Shiny pool', en: 'Exclusive 1/64 Shiny pool', ja: 'リオル（色違い確率1/64）', ru: 'Шайни пул 1/64' } },
      { name: 'Dratini', dexId: 147, note: { cs: 'Dragonite do Master League', en: 'Dragonite Master League meta', ja: 'ミニリュウ（カイリュー用）', ru: 'Dragonite для Master League' } },
      { name: 'Beldum', dexId: 374, note: { cs: 'Metagross ocelový král', en: 'Metagross Steel king', ja: 'ダンバル（メタグロス用）', ru: 'Metagross топ сталь' } }
    ]
  }
};

export const EggHatchingInteractiveWidget: React.FC<EggHatchingInteractiveWidgetProps> = ({ lang }) => {
  const [selectedTier, setSelectedTier] = useState<EggTier>('12km');
  const [incubatorType, setIncubatorType] = useState<'standard' | 'super'>('super');
  const [eventDiscount, setEventDiscount] = useState<number>(1); // 1 = normal, 0.5 = 1/2, 0.25 = 1/4
  const [starPieceActive, setStarPieceActive] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const tierData = EGG_DATA[selectedTier];

  // Calculate required walking distance
  const calculatedDistance = useMemo(() => {
    const incubatorFactor = incubatorType === 'super' ? (2 / 3) : 1;
    const finalDist = tierData.distanceKm * incubatorFactor * eventDiscount;
    return finalDist.toFixed(2);
  }, [tierData, incubatorType, eventDiscount]);

  // Calculate Stardust on hatch
  const dustYield = useMemo(() => {
    const [minD, maxD] = tierData.baseDustRange;
    const factor = starPieceActive ? 1.5 : 1;
    return {
      min: Math.floor(minD * factor),
      max: Math.floor(maxD * factor)
    };
  }, [tierData, starPieceActive]);

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

  return (
    <div className="egg-hatching-widget-container">
      {/* Hero Header */}
      <div className="egg-widget-hero-header">
        <div className="egg-hero-title-group">
          <div className="egg-badge-pill">
            <Footprints size={16} />
            <span>INCUBATOR & HATCH ENGINE</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Líhnutí Vajec: Kalkulačka Vzdálenosti & Šance na Salandit' :
             lang === 'ja' ? 'タマゴ孵化攻略：距離短縮計算機＆ヤトウモリ厳選' :
             lang === 'ru' ? 'Высиживание яиц: Калькулятор дистанции и охота на Salandit' :
             'Egg Hatching Mastery: Distance Calculator & Salandit Chase Engine'}
          </h2>
          <p>
            {lang === 'cs' ? 'Optimalizace Super Inkubátorů, simulátor zkrácení vzdálenosti při eventech, výnosy Stardustu a šance na 12,5% samičku Salandita.' :
             lang === 'ja' ? 'スーパーふかそうちの倍率計算、イベント短縮重複シミュレータ、獲得すな計算、12.5%のメス限定ヤトウモリ厳選術。' :
             lang === 'ru' ? 'Оптимизация супер-инкубаторов, расчет сокращения дистанции на ивентах, награды пыли и охота на самку Salandit (12.5%).' :
             'Super Incubator efficiency math, event distance stacking simulator, Stardust yield ranges, and the 12.5% Female Salandit chase.'}
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="egg-tier-buttons-row">
          {(Object.keys(EGG_DATA) as EggTier[]).map((tierKey) => {
            const t = EGG_DATA[tierKey];
            return (
              <button
                key={tierKey}
                type="button"
                className={`egg-tier-btn ${selectedTier === tierKey ? 'selected' : ''}`}
                style={{ '--tier-accent': t.color } as React.CSSProperties}
                onClick={() => setSelectedTier(tierKey)}
              >
                <div className="tier-dot" style={{ backgroundColor: t.color }} />
                <span>{t.name[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Distance & Incubator Simulator Card */}
      <div className="egg-card-panel">
        <div className="panel-title-bar">
          <Zap size={20} color="#aa3bff" />
          <h3>
            {lang === 'cs' ? 'Kalkulačka Zkrácení Vzdálenosti & Odměn z Líhnutí' :
             lang === 'ja' ? '距離短縮＆孵化リワード計算シミュレータ' :
             lang === 'ru' ? 'Калькулятор дистанции и наград за высиживание' :
             'Distance Discount & Hatch Rewards Simulator'}
          </h3>
        </div>

        {/* Incubator & Event Controls */}
        <div className="incubator-controls-grid">
          <div className="control-group">
            <label>{lang === 'cs' ? 'Typ Inkubátoru:' : 'Incubator Type:'}</label>
            <div className="btn-toggle-row">
              <button
                type="button"
                className={`toggle-option ${incubatorType === 'standard' ? 'active' : ''}`}
                onClick={() => setIncubatorType('standard')}
              >
                <span>Standardní (1,0×)</span>
              </button>
              <button
                type="button"
                className={`toggle-option super ${incubatorType === 'super' ? 'active' : ''}`}
                onClick={() => setIncubatorType('super')}
              >
                <span>Super Inkubátor (0,67×)</span>
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>{lang === 'cs' ? 'Eventový Bonus na Vzdálenost:' : 'Event Hatch Distance Modifier:'}</label>
            <div className="btn-toggle-row">
              <button
                type="button"
                className={`toggle-option ${eventDiscount === 1 ? 'active' : ''}`}
                onClick={() => setEventDiscount(1)}
              >
                <span>Standard (1×)</span>
              </button>
              <button
                type="button"
                className={`toggle-option discount ${eventDiscount === 0.5 ? 'active' : ''}`}
                onClick={() => setEventDiscount(0.5)}
              >
                <span>1/2 Vzdálenost</span>
              </button>
              <button
                type="button"
                className={`toggle-option discount ${eventDiscount === 0.25 ? 'active' : ''}`}
                onClick={() => setEventDiscount(0.25)}
              >
                <span>1/4 Vzdálenost 🔥</span>
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>{lang === 'cs' ? 'Aktivní Star Piece (+50 % Stardust):' : 'Star Piece Active (+50% Stardust):'}</label>
            <button
              type="button"
              className={`toggle-option starpiece ${starPieceActive ? 'active' : ''}`}
              onClick={() => setStarPieceActive(!starPieceActive)}
            >
              <Sparkles size={16} />
              <span>{starPieceActive ? (lang === 'cs' ? 'Star Piece ZAPNUT' : 'Star Piece ON') : (lang === 'cs' ? 'Star Piece VYPNUT' : 'Star Piece OFF')}</span>
            </button>
          </div>
        </div>

        {/* Live Calculation Display Box */}
        <div className="hatch-results-box" style={{ borderColor: tierData.color }}>
          <div className="hatch-distance-metric">
            <span className="dist-label">{lang === 'cs' ? 'Potřebná Vzdálenost k Vylíhnutí:' : 'Required Walking Distance:'}</span>
            <div className="dist-val-row">
              <strong className="dist-val" style={{ color: tierData.color }}>{calculatedDistance} km</strong>
              {calculatedDistance !== tierData.distanceKm.toFixed(2) && (
                <span className="dist-original">z původních {tierData.distanceKm} km</span>
              )}
            </div>
          </div>

          <div className="hatch-rewards-grid">
            <div className="reward-item">
              <span className="reward-title">{lang === 'cs' ? 'Stardust z vylíhnutí:' : 'Stardust on Hatch:'}</span>
              <strong className="reward-val dust">
                +{dustYield.min.toLocaleString()} – {dustYield.max.toLocaleString()} Dust
              </strong>
            </div>

            <div className="reward-item">
              <span className="reward-title">{lang === 'cs' ? 'Garantované Candy:' : 'Guaranteed Candy:'}</span>
              <strong className="reward-val candy">
                +{tierData.candyRange[0]} – {tierData.candyRange[1]} Candy
              </strong>
            </div>

            <div className="reward-item">
              <span className="reward-title">{lang === 'cs' ? 'Garantovaná IV Podlaha:' : 'Guaranteed IV Floor:'}</span>
              <strong className="reward-val hundo">10 / 10 / 10 (Min 67 %)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Chase Species in This Tier */}
      <div className="egg-card-panel">
        <div className="panel-title-bar">
          <Award size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? `Nejcennější Pokémoni z ${tierData.name[lang]}` :
             lang === 'ja' ? `${tierData.name[lang]}の目玉レアポケモン` :
             lang === 'ru' ? `Главные покемоны из ${tierData.name[lang]}` :
             `Top Chase Species in ${tierData.name[lang]}`}
          </h3>
        </div>

        <div className="chase-species-grid">
          {tierData.keyChases.map((chase) => (
            <div key={chase.name} className="chase-card">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chase.dexId}.png`}
                alt={chase.name}
                className="chase-artwork"
                loading="lazy"
              />
              <div className="chase-info">
                <strong>{chase.name}</strong>
                <span className="chase-note">{chase.note[lang]}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedTier === '12km' && (
          <div className="salandit-callout-strip">
            <Flame size={18} color="#ef4444" />
            <div className="callout-content">
              <strong>{lang === 'cs' ? 'POZOR NA POHLAVÍ SALANDITA (12,5 % Samice):' : 'SALANDIT GENDER RATIO WARNING (12.5% Female):'}</strong>
              <span>
                {lang === 'cs' 
                  ? 'Pouze SAMICE Salandita se může vyvinout v mocného Salazzle! Samec (87,5 % šance na vylíhnutí) se vyvinout NEMŮŽE a slouží pouze k transferu za Candy.'
                  : 'Only FEMALE Salandit can evolve into the venomous Salazzle! Male Salandit (87.5% hatch rate) cannot evolve under any circumstances.'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Adventure Sync Weekly Strategy Card */}
      <div className="egg-card-panel">
        <div className="panel-title-bar">
          <Footprints size={20} color="#38bdf8" />
          <h3>
            {lang === 'cs' ? 'Adventure Sync: Pondělní Odměna v 9:00 & Star Piece Trik' :
             lang === 'ja' ? 'いつでも冒険モード：月曜朝9時の報酬＆ほしのかけら裏技' :
             lang === 'ru' ? 'Adventure Sync: Награды понедельника в 9:00 и трик со Star Piece' :
             'Adventure Sync: Monday 9:00 AM Reward Engine & Star Piece Trick'}
          </h3>
        </div>

        <div className="sync-milestones-row">
          <div className="sync-milestone-pill">
            <span className="km-badge">25 km</span>
            <div className="milestone-details">
              <strong>{lang === 'cs' ? '5km Vejce + 1 000 Dust' : '5km Egg + 1,000 Dust'}</strong>
              <span>+3 Rare Candies / Silver Pinap</span>
            </div>
          </div>

          <div className="sync-milestone-pill highlighted">
            <span className="km-badge gold">50 km 🏆</span>
            <div className="milestone-details">
              <strong>{lang === 'cs' ? 'Exkluzivní 10km Vejce + 16 000 Dust!' : 'Exclusive 10km Egg + 16,000 Dust!'}</strong>
              <span>+5 Rare Candies + 1/64 Riolu pool</span>
            </div>
          </div>

          <div className="sync-milestone-pill">
            <span className="km-badge purple">100 km</span>
            <div className="milestone-details">
              <strong>{lang === 'cs' ? '24 000 Stardustu!' : '24,000 Stardust!'}</strong>
              <span>Pro grinding maraton</span>
            </div>
          </div>
        </div>

        <div className="pro-tip-strip">
          <Sparkles size={16} />
          <span>
            {lang === 'cs' 
              ? 'PONDĚLNÍ STAR PIECE TRIK: Nezapínejte hru před 9:00 v pondělí ráno. Zapněte aplikaci v 8:58, okamžitě aktivujte Star Piece! V 9:00 naskočí popup Adventure Sync a získáte 24 000 Stardustu namísto 16 000 za 50 km!'
              : 'MONDAY STAR PIECE TRICK: Do not launch Pokémon GO before 9:00 AM on Monday. Boot the app at 8:58 AM, activate a Star Piece immediately! At 9:00 AM the Adventure Sync banner pops up, paying 24,000 Stardust instead of 16,000 for 50km!'}
          </span>
        </div>
      </div>

      {/* 1-Click Search Operators */}
      <div className="egg-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Filtry pro Vylíhnuté Pokémony' :
             lang === 'ja' ? 'タマゴ孵化ポケモン専用検索コマンド' :
             lang === 'ru' ? 'Поисковые фильтры для вылупившихся покемонов' :
             'One-Click Hatched Pokémon Search Operators'}
          </h3>
        </div>

        <div className="egg-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>hatched</strong>
              <span>{lang === 'cs' ? 'Všichni Pokémoni vylíhnutí z vajec' : 'All Pokémon hatched from eggs'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('hatched', 'hatched')}
            >
              {copiedKey === 'hatched' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'hatched' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>hatched & shiny</strong>
              <span>{lang === 'cs' ? 'Vzácné Shiny úlovky z vajec (1/64 baby odds)' : 'Rare Shiny egg hatches (1/64 baby odds)'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('hatched & shiny', 'hatchedshiny')}
            >
              {copiedKey === 'hatchedshiny' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'hatchedshiny' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>hatched & 4*</strong>
              <span>{lang === 'cs' ? '100% IV Hundo z vajec (1 z 216 šance)' : '100% IV Hundos hatched from eggs (1 in 216 chance)'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('hatched & 4*', 'hatchedhundo')}
            >
              {copiedKey === 'hatchedhundo' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'hatchedhundo' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>eggsonly</strong>
              <span>{lang === 'cs' ? 'Baby Pokémoni dostupní výhradně z vajec' : 'Baby Pokémon obtainable strictly through egg hatching'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('eggsonly', 'eggsonly')}
            >
              {copiedKey === 'eggsonly' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'eggsonly' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

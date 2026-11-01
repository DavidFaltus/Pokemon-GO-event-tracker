'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  Shield, 
  Heart, 
  Zap, 
  Copy, 
  Check, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import './MegaDynamaxInteractiveWidget.css';

interface MegaDynamaxInteractiveWidgetProps {
  lang: Language;
}

interface MegaBenchmark {
  name: string;
  dexId: number;
  types: string[];
  role: Record<Language, string>;
  isPrimal?: boolean;
}

const META_MEGAS: MegaBenchmark[] = [
  {
    name: 'Rayquaza',
    dexId: 384,
    types: ['Dragon', 'Flying', 'Psychic'],
    role: {
      cs: 'Mega Rayquaza / Dragon Ascent — Zvyšuje Dragon, Flying a Psychic i z pozadí party!',
      en: 'Mega Rayquaza / Dragon Ascent — Boosts Dragon, Flying & Psychic even from party backline!',
      ja: 'メガレックウザ／画竜点睛 — パーティ後方からでもドラゴン・ひこう・エスパーをブースト！',
      ru: 'Mega Rayquaza / Dragon Ascent — Бустит Dragon, Flying и Psychic даже из запаса пати!'
    },
    isPrimal: true
  },
  {
    name: 'Groudon',
    dexId: 383,
    types: ['Ground', 'Fire', 'Grass'],
    role: {
      cs: 'Primal Groudon — Desolate Land pasivně posiluje Ground, Fire a Grass odchyty.',
      en: 'Primal Groudon — Desolate Land passively boosts Ground, Fire & Grass catches.',
      ja: 'ゲンシグラードン — おわりの大地でじめん・ほのお・くさの捕獲飴をパッシブ強化。',
      ru: 'Primal Groudon — Пассивно бустит Ground, Fire и Grass даже не выходя на поле боя.'
    },
    isPrimal: true
  },
  {
    name: 'Kyogre',
    dexId: 382,
    types: ['Water', 'Electric', 'Bug'],
    role: {
      cs: 'Primal Kyogre — Primordial Sea pasivně posiluje Water, Electric a Bug odchyty.',
      en: 'Primal Kyogre — Primordial Sea passively boosts Water, Electric & Bug catches.',
      ja: 'ゲンシカイオーガ — はじまりのうみでみず・でんき・むしの捕獲飴を常時ブースト。',
      ru: 'Primal Kyogre — Primordial Sea пассивно бустит Water, Electric и Bug.'
    },
    isPrimal: true
  },
  {
    name: 'Tyranitar',
    dexId: 248,
    types: ['Rock', 'Dark'],
    role: {
      cs: 'Mega Tyranitar — Bezkonkurenční tank a top DPS pro Rock i Dark raidy.',
      en: 'Mega Tyranitar — Unrivaled tank and S-tier DPS for both Rock & Dark raids.',
      ja: 'メガバンギラス — いわ・あくレイドで圧倒的な耐久とトップDPSを誇る万能アタッカー。',
      ru: 'Mega Tyranitar — Непревзойденный танк и топ DPS для Rock и Dark рейдов.'
    }
  },
  {
    name: 'Gengar',
    dexId: 94,
    types: ['Ghost', 'Poison'],
    role: {
      cs: 'Mega Gengar — Absolutní Ghost DPS monstrum, excelentní pro Psychic a Ghost bossy.',
      en: 'Mega Gengar — Absolute glass-cannon Ghost DPS king, shreds Psychic & Ghost raid bosses.',
      ja: 'メガゲンガー — ゴースト屈指の超火力。エスパー・ゴースト系ボスを瞬殺。',
      ru: 'Mega Gengar — Стеклянная пушка колоссального урона против Psychic и Ghost боссов.'
    }
  },
  {
    name: 'Lucario',
    dexId: 448,
    types: ['Fighting', 'Steel'],
    role: {
      cs: 'Mega Lucario (Force Palm) — Král Fighting typu, drtí Normal, Rock a Steel raidy.',
      en: 'Mega Lucario (Force Palm) — Fighting-type DPS sovereign, obliterates Normal, Rock & Steel.',
      ja: 'メガルカリオ（はどうだん／はっけい） — かくとう最強格。ノーマル・いわ・はがねを圧倒。',
      ru: 'Mega Lucario (Force Palm) — Король Fighting урона, стирает Normal, Rock и Steel.'
    }
  }
];

export const MegaDynamaxInteractiveWidget: React.FC<MegaDynamaxInteractiveWidgetProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'mega' | 'dynamax'>('mega');
  const [megaLevel, setMegaLevel] = useState<number>(3); // 1, 2, 3
  const [evolutionDays, setEvolutionDays] = useState<number>(30); // 1 to 30
  const [dailySpotsVisited, setDailySpotsVisited] = useState<number>(4);
  const [walkedKm, setWalkedKm] = useState<number>(4);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mega Level Properties
  const megaData = useMemo(() => {
    switch (megaLevel) {
      case 1:
        return {
          title: lang === 'cs' ? 'Base Mega Level (1 den)' : lang === 'ja' ? 'ベースレベル（1日）' : lang === 'ru' ? 'Base Level (1 день)' : 'Base Level (1 Day)',
          badgeColor: '#94a3b8',
          candyBonus: '+1 Candy',
          xpBonus: '+50 XP',
          xlChance: '0% (Standard)',
          cooldown: lang === 'cs' ? '7 dní zdarma' : lang === 'ja' ? '無料待機 7日間' : lang === 'ru' ? '7 дней бесплатно' : '7 Days Free Cooldown',
          energyDiscount: '20% Mega Energy',
          summary: lang === 'cs' 
            ? 'Základní odemčení. Poskytuje +1 Candy ze stejného typu a 10% slevu na další Mega evoluce.'
            : lang === 'ja'
            ? '初回メガシンカで到達。同タイプ捕獲時にアメ+1個と、次回メガシンカ時の消費エナジーが微小割引されます。'
            : lang === 'ru'
            ? 'Базовый уровень. Дает +1 Candy за покемонов того же типа и небольшую скидку на энергию.'
            : 'Initial unlock. Grants +1 Catch Candy for matching types and a minor energy discount on subsequent evolutions.'
        };
      case 2:
        return {
          title: lang === 'cs' ? 'High Mega Level (7 dní)' : lang === 'ja' ? 'ハイレベル（7日間）' : lang === 'ru' ? 'High Level (7 дней)' : 'High Level (7 Days)',
          badgeColor: '#38bdf8',
          candyBonus: '+1 Candy',
          xpBonus: '+100 XP',
          xlChance: '+10% (Enhanced)',
          cooldown: lang === 'cs' ? '5 dní zdarma' : lang === 'ja' ? '無料待機 5日間' : lang === 'ru' ? '5 дней бесплатно' : '5 Days Free Cooldown',
          energyDiscount: '40% Mega Energy',
          summary: lang === 'cs'
            ? 'Střední úroveň po 7 dnech evolucí. Otevírá +10% zvýšenou šanci na zisk Candy XL při chytání!'
            : lang === 'ja'
            ? '7日間の進化で到達。捕獲時にアメXLのドロップ確率が+10%上昇し、待機時間が5日に短縮されます。'
            : lang === 'ru'
            ? 'Средний уровень после 7 дней. Открывает +10% к шансу выпадения Candy XL при ловле!'
            : 'Mid-tier reached after 7 daily evolutions. Unlocks a +10% boosted Candy XL catch probability and 5-day cooldown.'
        };
      case 3:
      default:
        return {
          title: lang === 'cs' ? 'Max Mega Level (30 dní) 🏆' : lang === 'ja' ? 'マックスレベル（30日間）🏆' : lang === 'ru' ? 'Max Level (30 дней) 🏆' : 'Max Level (30 Days) 🏆',
          badgeColor: '#facc15',
          candyBonus: '+2 Candy (+100%)',
          xpBonus: '+200 XP',
          xlChance: '+25% (EXCELLENT BONUS)',
          cooldown: lang === 'cs' ? '3 dny zdarma' : lang === 'ja' ? '無料待機 3日間' : lang === 'ru' ? '3 дня бесплатно' : '3 Days Free Cooldown',
          energyDiscount: '75% Mega Energy (Pouze 5–10 MP)',
          summary: lang === 'cs'
            ? 'Absolutní maximum po 30 dnech! Získáváte +2 Candy, +200 XP a astronomických +25 % na Candy XL. Nutnost pro Community Day a Raid Days!'
            : lang === 'ja'
            ? '30日間の進化で到達する最高峰！捕獲時アメ+2個、経験値+200、そしてアメXL確率が+25%跳ね上がります。コミュデイ必須！'
            : lang === 'ru'
            ? 'Максимальный уровень после 30 дней! Дает +2 Candy, +200 XP и +25% к шансу Candy XL. Обязателен для коса и рейдов!'
            : 'The pinnacle reached after 30 daily evolutions! Delivers +2 Catch Candy, +200 XP, and a massive +25% Candy XL boost.'
        };
    }
  }, [megaLevel, lang]);

  // Max Particle Daily Collection Math
  const calculatedMp = useMemo(() => {
    // Standard power spots: 120 MP each (300 MP for first of the day / walking 2km = 300 MP)
    // Daily cap is 800 MP, but can overflow up to 1080 MP if carefully sequenced!
    const spotMp = dailySpotsVisited * 120;
    const walkMp = Math.floor(walkedKm / 2) * 300;
    const totalGathered = spotMp + walkMp;
    const capped = Math.min(800, totalGathered);
    const overflowTrick = Math.min(1080, totalGathered);
    return {
      totalGathered,
      capped,
      overflowTrick,
      tier1Battles: Math.floor(capped / 250),
      tier3Battles: Math.floor(capped / 400),
      gmaxBattles: Math.floor(capped / 800)
    };
  }, [dailySpotsVisited, walkedKm]);

  const handleCopySearch = async (query: string, key: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="mega-dynamax-widget-container">
      {/* Header Banner */}
      <div className="mega-widget-hero-header">
        <div className="mega-hero-title-group">
          <div className="mega-badge-pill">
            <Trophy size={16} />
            <span>PVE COMBAT ENGINE</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Mega Evoluce, Primal Reversion & Dynamax Max Moves' :
             lang === 'ja' ? 'メガシンカ・ゲンシカイキ＆ダイマックス・キョダイマックス完全攻略' :
             lang === 'ru' ? 'Мега-Эволюции, Primal Reversion и Dynamax Бои' :
             'Mega Evolution, Primal Reversion & Dynamax Max Battles'}
          </h2>
          <p>
            {lang === 'cs' ? 'Interaktivní kalkulačka Mega Level bonusů, optimalizace sběru Candy XL a denní Max Particle engine pro Power Spoty.' :
             lang === 'ja' ? 'メガレベル3ボーナスの詳細シミュレータ、アメXLドロップ最大化、パワースポットでのMP収集計算機。' :
             lang === 'ru' ? 'Интерактивный калькулятор уровней Mega Level, максимизация Candy XL и расчет Max Particles на Power Spots.' :
             'Interactive Mega Level progression simulator, Candy XL yield optimizer, and daily Max Particle Power Spot calculator.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mega-tabs-switch-row">
          <button 
            type="button"
            className={`mega-tab-btn ${activeTab === 'mega' ? 'active' : ''}`}
            onClick={() => setActiveTab('mega')}
          >
            <Sparkles size={16} />
            <span>{lang === 'cs' ? 'Mega & Primal Evoluce' : lang === 'ja' ? 'メガ＆ゲンシカイキ' : lang === 'ru' ? 'Мега и Primal' : 'Mega & Primal'}</span>
          </button>
          <button 
            type="button"
            className={`mega-tab-btn ${activeTab === 'dynamax' ? 'active' : ''}`}
            onClick={() => setActiveTab('dynamax')}
          >
            <Flame size={16} />
            <span>{lang === 'cs' ? 'Dynamax & Max Battles' : lang === 'ja' ? 'ダイマックス＆マックスバトル' : lang === 'ru' ? 'Dynamax и Max Battles' : 'Dynamax & Max Battles'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'mega' && (
        <div className="mega-tab-content">
          {/* Level Progression Card */}
          <div className="mega-card-panel">
            <div className="panel-title-bar">
              <TrendingUp size={20} color="#aa3bff" />
              <h3>{lang === 'cs' ? 'Kalkulačka Mega Úrovní & Candy XL Bonusů' : lang === 'ja' ? 'メガレベル別ボーナス＆アメXL計算機' : lang === 'ru' ? 'Калькулятор Mega Level и Candy XL бонусов' : 'Mega Level Progression & Candy XL Calculator'}</h3>
            </div>

            <div className="mega-level-picker-grid">
              <button
                type="button"
                className={`level-btn ${megaLevel === 1 ? 'selected' : ''}`}
                onClick={() => { setMegaLevel(1); setEvolutionDays(1); }}
              >
                <div className="lvl-num">1</div>
                <div className="lvl-label">Base Level</div>
                <div className="lvl-sub">1 den / 1 evoluce</div>
              </button>
              <button
                type="button"
                className={`level-btn ${megaLevel === 2 ? 'selected' : ''}`}
                onClick={() => { setMegaLevel(2); setEvolutionDays(7); }}
              >
                <div className="lvl-num" style={{ color: '#38bdf8' }}>2</div>
                <div className="lvl-label">High Level</div>
                <div className="lvl-sub">7 dní (+10% XL)</div>
              </button>
              <button
                type="button"
                className={`level-btn ${megaLevel === 3 ? 'selected' : ''}`}
                onClick={() => { setMegaLevel(3); setEvolutionDays(30); }}
              >
                <div className="lvl-num" style={{ color: '#facc15' }}>3</div>
                <div className="lvl-label">Max Level 🏆</div>
                <div className="lvl-sub">30 dní (+25% XL)</div>
              </button>
            </div>

            {/* Live Level Stats Display */}
            <div className="mega-active-stats-card" style={{ borderColor: megaData.badgeColor }}>
              <div className="stats-header">
                <span className="stats-badge" style={{ backgroundColor: `${megaData.badgeColor}22`, color: megaData.badgeColor }}>
                  {megaData.title}
                </span>
                <span className="cooldown-pill">
                  <Clock size={14} />
                  {megaData.cooldown}
                </span>
              </div>

              <div className="mega-perks-grid">
                <div className="perk-box">
                  <span className="perk-label">{lang === 'cs' ? 'Bonus Candy' : lang === 'ja' ? '捕獲時アメ' : lang === 'ru' ? 'Бонус Candy' : 'Catch Candy'}</span>
                  <strong className="perk-val green">{megaData.candyBonus}</strong>
                </div>
                <div className="perk-box">
                  <span className="perk-label">{lang === 'cs' ? 'Bonus XP' : lang === 'ja' ? '捕獲時XP' : lang === 'ru' ? 'Бонус XP' : 'Catch XP'}</span>
                  <strong className="perk-val cyan">{megaData.xpBonus}</strong>
                </div>
                <div className="perk-box highlighted">
                  <span className="perk-label">{lang === 'cs' ? 'Šance na Candy XL' : lang === 'ja' ? 'アメXLドロップ率' : lang === 'ru' ? 'Шанс на Candy XL' : 'Candy XL Drop Chance'}</span>
                  <strong className="perk-val gold">{megaData.xlChance}</strong>
                </div>
                <div className="perk-box">
                  <span className="perk-label">{lang === 'cs' ? 'Sleva na Energy' : lang === 'ja' ? 'エナジー割引' : lang === 'ru' ? 'Скидка на энергию' : 'Energy Discount'}</span>
                  <strong className="perk-val purple">{megaData.energyDiscount}</strong>
                </div>
              </div>

              <p className="mega-summary-paragraph">
                <Info size={16} />
                <span>{megaData.summary}</span>
              </p>
            </div>

            {/* Daily Evolution Slider */}
            <div className="mega-slider-container">
              <div className="slider-label-row">
                <span>{lang === 'cs' ? 'Celkem dní Mega Evolucí (1x denně zdarma):' : lang === 'ja' ? 'メガシンカさせた日数（1日1回カウント）：' : lang === 'ru' ? 'Дней мега-эволюций (1 раз в день):' : 'Total Days Mega Evolved (1x daily free check):'}</span>
                <strong>{evolutionDays} / 30 {lang === 'cs' ? 'dní' : 'days'}</strong>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={evolutionDays} 
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setEvolutionDays(val);
                  if (val >= 30) setMegaLevel(3);
                  else if (val >= 7) setMegaLevel(2);
                  else setMegaLevel(1);
                }}
                className="mega-range-input"
              />
              <div className="slider-milestone-ticks">
                <span className={evolutionDays >= 1 ? 'achieved' : ''}>1d (Base)</span>
                <span className={evolutionDays >= 7 ? 'achieved' : ''}>7d (High Lv 2)</span>
                <span className={evolutionDays >= 30 ? 'achieved' : ''}>30d (Max Lv 3 🏆)</span>
              </div>
              {evolutionDays < 30 && (
                <div className="remaining-alert">
                  <Calendar size={15} />
                  <span>
                    {lang === 'cs' 
                      ? `Zbývá ${30 - evolutionDays} dní bezplatných denních evolucí pro dosažení Max Mega Level 3!` 
                      : `Only ${30 - evolutionDays} more daily free evolutions remaining to reach Max Mega Level 3!`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Top Meta Megas & Primal Showcase */}
          <div className="mega-card-panel">
            <div className="panel-title-bar">
              <Sparkles size={20} color="#38bdf8" />
              <h3>{lang === 'cs' ? 'S-Tier Mega Pokémoni & Primal Reversion' : lang === 'ja' ? '最強格のSランクメガ＆ゲンシカイキ' : lang === 'ru' ? 'S-Tier Мега-покемоны и Primal Reversion' : 'S-Tier Meta Megas & Primal Reversion'}</h3>
            </div>

            <div className="meta-megas-grid">
              {META_MEGAS.map((poke) => (
                <div key={poke.name} className="mega-poke-card">
                  <div className="poke-visual-col">
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.dexId}.png`}
                      alt={poke.name}
                      className="mega-artwork-img"
                      loading="lazy"
                    />
                    {poke.isPrimal && (
                      <span className="primal-pill">PRIMAL</span>
                    )}
                  </div>
                  <div className="poke-info-col">
                    <div className="poke-name-row">
                      <h4>{poke.name}</h4>
                      <div className="type-chips-list">
                        {poke.types.map(t => (
                          <span key={t} className={`type-mini-pill type-${t.toLowerCase()}`}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="poke-role-desc">{poke.role[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dynamax' && (
        <div className="dynamax-tab-content">
          {/* Max Particles Collector Panel */}
          <div className="mega-card-panel">
            <div className="panel-title-bar">
              <Zap size={20} color="#ec4899" />
              <h3>{lang === 'cs' ? 'Denní Max Particle (MP) Planner & Power Spot Engine' : lang === 'ja' ? 'デイリーマックス粒子（MP）収集プランナー' : lang === 'ru' ? 'Дневной планировщик Max Particles (MP)' : 'Daily Max Particle (MP) Planner & Power Spot Engine'}</h3>
            </div>

            <div className="mp-calculator-controls-grid">
              <div className="mp-control-box">
                <label>
                  <span>{lang === 'cs' ? 'Navštívených Power Spotů dnes (120 MP/spot):' : 'Power Spots visited today (120 MP/spot):'}</span>
                  <strong>{dailySpotsVisited} spotů ({dailySpotsVisited * 120} MP)</strong>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="7" 
                  value={dailySpotsVisited} 
                  onChange={(e) => setDailySpotsVisited(parseInt(e.target.value, 10))}
                  className="mega-range-input"
                />
              </div>

              <div className="mp-control-box">
                <label>
                  <span>{lang === 'cs' ? 'Nachozené kilometry dnes (300 MP / 2 km):' : 'Kilometers walked today (300 MP / 2 km):'}</span>
                  <strong>{walkedKm} km ({Math.floor(walkedKm / 2) * 300} MP)</strong>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="6" 
                  step="2"
                  value={walkedKm} 
                  onChange={(e) => setWalkedKm(parseInt(e.target.value, 10))}
                  className="mega-range-input"
                />
              </div>
            </div>

            {/* MP Results Breakdown */}
            <div className="mp-yield-card">
              <div className="mp-stat-item">
                <span className="mp-stat-title">{lang === 'cs' ? 'Získáno MP:' : 'Gathered MP:'}</span>
                <span className="mp-stat-value">{calculatedMp.totalGathered} MP</span>
              </div>
              <div className="mp-stat-item highlighted">
                <span className="mp-stat-title">{lang === 'cs' ? 'Denní limit (Standard):' : 'Daily Soft Cap:'}</span>
                <span className="mp-stat-value magenta">{calculatedMp.capped} / 800 MP</span>
              </div>
              <div className="mp-stat-item pro-trick">
                <span className="mp-stat-title">{lang === 'cs' ? 'Max Trick (Až 1080 MP!):' : 'Pro Overflow Trick:'}</span>
                <span className="mp-stat-value gold">{calculatedMp.overflowTrick} MP</span>
              </div>
            </div>

            {/* Max Battle Capacity */}
            <div className="battle-capacity-row">
              <div className="battle-cap-card tier1">
                <strong>{calculatedMp.tier1Battles}×</strong>
                <span>Tier 1 Max Battle (250 MP)</span>
              </div>
              <div className="battle-cap-card tier3">
                <strong>{calculatedMp.tier3Battles}×</strong>
                <span>Tier 3 Max Battle (400 MP)</span>
              </div>
              <div className="battle-cap-card gmax">
                <strong>{calculatedMp.gmaxBattles}×</strong>
                <span>Tier 6 Gigantamax (800 MP)</span>
              </div>
            </div>

            <div className="pro-tip-strip">
              <Zap size={16} />
              <span>
                {lang === 'cs' 
                  ? 'PRO TRIK: Posbírejte 720 MP (např. 6x Power Spot), a JAKO POSLEDNÍ vyzvedněte 300 MP za 2 km chůze! Tím překročíte denní limit 800 MP a dosáhnete až 1 020–1 080 MP za den!'
                  : 'PRO TRICK: Collect up to 720 MP first (e.g. 6x Power Spots), and claim your 300 MP 2 km walking task AS THE FINAL REWARD. This overflows the 800 soft cap up to 1,020–1,080 MP/day!'}
              </span>
            </div>
          </div>

          {/* Max Moves Breakdown */}
          <div className="mega-card-panel">
            <div className="panel-title-bar">
              <Layers size={20} color="#aa3bff" />
              <h3>{lang === 'cs' ? '3 Klíčové Max Moves a Náklady na vylepšení' : lang === 'ja' ? '3つのマックス技と強化コスト' : lang === 'ru' ? '3 Ключевых Max Moves и стоимость улучшения' : '3 Core Max Moves & Upgrade Costs'}</h3>
            </div>

            <div className="max-moves-grid">
              <div className="move-card attack">
                <div className="move-card-header">
                  <Flame size={20} color="#ef4444" />
                  <h4>Max Attack / Strike</h4>
                </div>
                <p>
                  {lang === 'cs' 
                    ? 'Způsobuje ničivý útok dynamaxové formy s elementárním typingem. Zvýšení na Lv 3 rapidně zvyšuje burst damage.'
                    : 'Unleashes devastating elemental Max damage. Upgrading to Lv 3 maximizes burst output during the Dynamax phase.'}
                </p>
                <div className="upgrade-cost-pill">
                  <span>Lv 1: 400 MP • Lv 2: 600 MP • Lv 3: 800 MP + 40 XL</span>
                </div>
              </div>

              <div className="move-card guard">
                <div className="move-card-header">
                  <Shield size={20} color="#38bdf8" />
                  <h4>Max Guard (Wall)</h4>
                </div>
                <p>
                  {lang === 'cs' 
                    ? 'Vytvoří ochranný štít pro celý tým, který snižuje poškození z boss útoků o 30 % až 60 %. Klíč pro přežití Gigantamax bossů.'
                    : 'Erects an impenetrable team barrier mitigating 30% to 60% incoming boss damage. Critical for Gigantamax raids.'}
                </p>
                <div className="upgrade-cost-pill">
                  <span>Lv 1: 400 MP • Lv 2: 600 MP • Lv 3: 800 MP + 40 XL</span>
                </div>
              </div>

              <div className="move-card spirit">
                <div className="move-card-header">
                  <Heart size={20} color="#22c55e" />
                  <h4>Max Spirit (Recovery)</h4>
                </div>
                <p>
                  {lang === 'cs' 
                    ? 'Léčí HP celého vašeho týmu o 15 % (Lv 1) až 45 % (Lv 3). Nejdůležitější Max Move pro sólování náročných Tier 3 bossů!'
                    : 'Restores entire team HP by 15% (Lv 1) up to 45% (Lv 3). The single most vital move for soloing Tier 3 Dynamax raids!'}
                </p>
                <div className="upgrade-cost-pill">
                  <span>Lv 1: 400 MP • Lv 2: 600 MP • Lv 3: 800 MP + 40 XL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Strings Panel */}
      <div className="mega-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>{lang === 'cs' ? 'Rychlé vyhledávací příkazy do hry' : lang === 'ja' ? 'ワンタップ検索コマンド' : lang === 'ru' ? 'Быстрые поисковые команды' : 'One-Click Search Operators'}</h3>
        </div>

        <div className="mega-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>mega3</strong>
              <span>{lang === 'cs' ? 'Všichni Pokémoni na Max Mega Level 3 (+25% XL)' : 'All Max Level 3 Megas (+25% XL drop rate)'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('mega3', 'mega3')}
            >
              {copiedKey === 'mega3' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'mega3' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>mega1-2</strong>
              <span>{lang === 'cs' ? 'Megas v procesu expení (vyžadují denní evoluci)' : 'Megas currently leveling up (need daily evolution)'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('mega1-2', 'mega12')}
            >
              {copiedKey === 'mega12' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'mega12' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>dynamax & !gigantamax</strong>
              <span>{lang === 'cs' ? 'Běžní Dynamax Pokémoni pro Power Spoty' : 'Standard Dynamax Pokémon for Power Spots'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('dynamax & !gigantamax', 'dmax')}
            >
              {copiedKey === 'dmax' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'dmax' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>gigantamax</strong>
              <span>{lang === 'cs' ? 'Všichni exkluzivní Gigantamax obři' : 'All exclusive Gigantamax titans'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopySearch('gigantamax', 'gmax')}
            >
              {copiedKey === 'gmax' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'gmax' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

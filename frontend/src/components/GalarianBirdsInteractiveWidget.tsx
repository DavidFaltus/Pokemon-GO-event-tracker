'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { Sparkles, Target, Zap, Swords, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Info, HelpCircle } from 'lucide-react';

interface GalarianBirdsInteractiveWidgetProps {
  lang: Language;
}

interface BirdData {
  id: 'articuno' | 'zapdos' | 'moltres';
  name: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  types: string[];
  baseAtk: number;
  baseDef: number;
  baseSta: number;
  maxCpL50: number;
  distance: string;
  weatherBoost: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  hundoCpL30: number;
  hundoCpL35: number;
  regularImage: string;
  shinyImage: string;
  shinyLore: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  circleLockTip: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
}

const BIRDS: BirdData[] = [
  {
    id: 'articuno',
    name: {
      cs: 'Galarian Articuno',
      en: 'Galarian Articuno',
      ja: 'ガラルフリーザー',
      ru: 'Galarian Articuno',
    },
    types: ['Psychic', 'Flying'],
    baseAtk: 250,
    baseDef: 197,
    baseSta: 207,
    maxCpL50: 4059,
    distance: '5.0 m (Střední vzdálenost)',
    weatherBoost: {
      cs: 'Větrno (Windy)',
      en: 'Windy',
      ja: '強風（Windy）',
      ru: 'Ветрено (Windy)',
    },
    hundoCpL30: 3077,
    hundoCpL35: 3334,
    regularImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10169.png',
    shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10169.png',
    shinyLore: {
      cs: 'Vzdává poctu původnímu Kanto Articunovi — magentové peří nahrazuje chladné ledově modré zbarvení.',
      en: 'Homages classic Kanto Articuno — swaps deep magenta plumage for crystalline pale ice-blue feathers.',
      ja: '初代カントーフリーザーへのオマージュ：紫の羽が淡いアイスブルーへと変化します。',
      ru: 'Отсылка к классическому Артикуно из Канто — глубокий пурпур сменяется ледяным голубым оперением.',
    },
    circleLockTip: {
      cs: 'Vznáší se ve vzduchu. Zamkněte kruh na 20 %, vyčkejte po útoku na pokles do spodní polohy a házejte na vrcholu máchnutí křídel.',
      en: 'Hovers in mid-air. Lock target circle to 20%, wait for lower resting recovery, and throw during peak wing sweep.',
      ja: '滞空型。サークルを20%で固定し、威嚇後の下降時に翼を大きく羽ばたかせた瞬間に投げてください。',
      ru: 'Парит в воздухе. Зафиксируйте круг на 20%, дождитесь опускания после атаки и бросайте на взмахе крыльев.',
    },
  },
  {
    id: 'zapdos',
    name: {
      cs: 'Galarian Zapdos',
      en: 'Galarian Zapdos',
      ja: 'ガラルサンダー',
      ru: 'Galarian Zapdos',
    },
    types: ['Fighting', 'Flying'],
    baseAtk: 252,
    baseDef: 189,
    baseSta: 207,
    maxCpL50: 4012,
    distance: '3.5 m (Velmi blízko!)',
    weatherBoost: {
      cs: 'Zataženo / Větrno (Cloudy / Windy)',
      en: 'Cloudy / Windy',
      ja: '曇り / 強風（Cloudy / Windy）',
      ru: 'Облачно / Ветрено (Cloudy / Windy)',
    },
    hundoCpL30: 3042,
    hundoCpL35: 3295,
    regularImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10170.png',
    shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10170.png',
    shinyLore: {
      cs: 'Odkaz na Kanto Zapdose — tmavé tělo běžce září elektricky žlutým peřím s jasně oranžovým zobákem a spáry.',
      en: 'Tribute to Kanto Zapdos — dark runner body transforms into vibrant electric yellow with bright orange beak and claws.',
      ja: '初代サンダーを再現：黒橙のボディが鮮やかなエレクトリックイエローと鮮烈なオレンジの嘴に輝きます。',
      ru: 'Дань уважения Канто Запдосу — темное оперение бегуна заменяется на ярко-желтое с оранжевым клювом и лапами.',
    },
    circleLockTip: {
      cs: 'Stojí na zemi velmi blízko kameře. Pozor na přehození! Vyžaduje krátký a rychlý švih ihned po jeho agresivním výpadu.',
      en: 'Ground runner extremely close to the camera. Do not overthrow! Requires a short, rapid flick right as its charge animation finishes.',
      ja: '手前接近型。奥に投げすぎると外れます！威嚇の突進モーション終了直後に短く鋭いフリックで投げましょう。',
      ru: 'Стоит очень близко к камере. Осторожно, не перебросьте! Нужен короткий резкий свайп сразу после выпада.',
    },
  },
  {
    id: 'moltres',
    name: {
      cs: 'Galarian Moltres',
      en: 'Galarian Moltres',
      ja: 'ガラルファイヤー',
      ru: 'Galarian Moltres',
    },
    types: ['Dark', 'Flying'],
    baseAtk: 202,
    baseDef: 231,
    baseSta: 207,
    maxCpL50: 3580,
    distance: '6.0 m (Nejvzdálenější)',
    weatherBoost: {
      cs: 'Mlha / Větrno (Fog / Windy)',
      en: 'Fog / Windy',
      ja: '霧 / 強風（Fog / Windy）',
      ru: 'Туман / Ветрено (Fog / Windy)',
    },
    hundoCpL30: 2715,
    hundoCpL35: 2941,
    regularImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10171.png',
    shinyImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10171.png',
    shinyLore: {
      cs: 'Nádherná zlatá pocta Kanto Moltresovi — purpurově černé tělo září zlatem a je obklopeno zářivě neonově růžovým plamenem.',
      en: 'Breathtaking golden tribute to Kanto Moltres — dark plumage turns radiant gold enveloped in hot-pink fiery aura.',
      ja: '初代ファイヤーの究極進化：黒紫の炎から黄金色のボディとネオンピンクの神々しいオーラへと一変します。',
      ru: 'Потрясающая золотая дань Канто Молтресу — золотое тело, окутанное неоново-розовым пламенем.',
    },
    circleLockTip: {
      cs: 'Nejvzdálenější cíl. Oheň na křídlech není hitbox! Hoďte vysoký a silný oblouk mířený přímo do středu trupu.',
      en: 'Deepest target model. Flaming plumage does not count toward hitbox! Throw a high, powerful arc straight at the chest core.',
      ja: '最遠距離。翼の炎には当たり判定がありません！胸の中心部を狙って、高く力強い大きなアークを描いて投げてください。',
      ru: 'Самая дальняя цель. Огонь на крыльях не входит в хитбокс! Бросайте высоким сильным полукругом точно в центр груди.',
    },
  },
];

const CPM_TABLE: Record<number, number> = {
  1: 0.094, 2: 0.16639787, 3: 0.21573247, 4: 0.25572005, 5: 0.29024988,
  6: 0.3210876, 7: 0.34921268, 8: 0.37523559, 9: 0.39956728, 10: 0.42250001,
  11: 0.44310755, 12: 0.46279839, 13: 0.48168495, 14: 0.49985844, 15: 0.51739395,
  16: 0.53435433, 17: 0.55079269, 18: 0.56674736, 19: 0.5822464, 20: 0.59740001,
  21: 0.61222447, 22: 0.62673994, 23: 0.6409657, 24: 0.65492161, 25: 0.667934,
  26: 0.6807686, 27: 0.69342087, 28: 0.7058957, 29: 0.71819777, 30: 0.7317,
  31: 0.73776948, 32: 0.74378947, 33: 0.74976104, 34: 0.75568551, 35: 0.76156384,
};

interface IvCombination {
  lvl: number;
  ivA: number;
  ivD: number;
  ivS: number;
  pct: number;
}

export const GalarianBirdsInteractiveWidget: React.FC<GalarianBirdsInteractiveWidgetProps> = ({ lang }) => {
  const [selectedBirdId, setSelectedBirdId] = useState<'articuno' | 'zapdos' | 'moltres'>('articuno');
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [inputCp, setInputCp] = useState<string>('2450');
  const [weatherBoosted, setWeatherBoosted] = useState<boolean>(false);
  const [showAllCombinations, setShowAllCombinations] = useState<boolean>(false);

  const currentBird = useMemo(() => {
    return BIRDS.find(b => b.id === selectedBirdId) || BIRDS[0];
  }, [selectedBirdId]);

  // Real-time IV combinations calculation
  const analysisResult = useMemo(() => {
    const cpNum = parseInt(inputCp, 10);
    if (isNaN(cpNum) || cpNum < 10 || cpNum > 4100) {
      return null;
    }

    const minLvl = weatherBoosted ? 6 : 1;
    const maxLvl = weatherBoosted ? 35 : 30;
    const minIv = weatherBoosted ? 4 : 0;

    const matches: IvCombination[] = [];

    for (let lvl = minLvl; lvl <= maxLvl; lvl++) {
      const mult = CPM_TABLE[lvl] * CPM_TABLE[lvl];
      for (let ivA = minIv; ivA <= 15; ivA++) {
        for (let ivD = minIv; ivD <= 15; ivD++) {
          for (let ivS = minIv; ivS <= 15; ivS++) {
            const calculatedCp = Math.max(
              10,
              Math.floor(((currentBird.baseAtk + ivA) * Math.sqrt(currentBird.baseDef + ivD) * Math.sqrt(currentBird.baseSta + ivS) * mult) / 10)
            );
            if (calculatedCp === cpNum) {
              matches.push({
                lvl,
                ivA,
                ivD,
                ivS,
                pct: Math.round(((ivA + ivD + ivS) / 45) * 1000) / 10,
              });
            }
          }
        }
      }
    }

    if (matches.length === 0) {
      return { valid: false, count: 0, minPct: 0, maxPct: 0, minLvl: 0, maxLvl: 0, isHundoPossible: false, matches: [] };
    }

    matches.sort((a, b) => b.pct - a.pct);
    const minPct = Math.min(...matches.map(m => m.pct));
    const maxPct = Math.max(...matches.map(m => m.pct));
    const minLevelFound = Math.min(...matches.map(m => m.lvl));
    const maxLevelFound = Math.max(...matches.map(m => m.lvl));
    const isHundoPossible = matches.some(m => m.pct === 100);

    // Calculate approximate single-throw catch probability (Ultra Ball + Golden Razz + Curved Excellent + Platinum Medals)
    const midLvl = Math.round((minLevelFound + maxLevelFound) / 2);
    const cpmVal = CPM_TABLE[midLvl] || 0.65;
    const bcr = 0.003;
    const multiplier = 2.0 * 2.5 * 1.7 * 2.0 * 1.4; // 23.8x
    const singleCatchOdds = Math.round((1 - Math.pow(1 - (bcr / (2 * cpmVal)), multiplier)) * 1000) / 10;

    return {
      valid: true,
      count: matches.length,
      minPct,
      maxPct,
      minLvl: minLevelFound,
      maxLvl: maxLevelFound,
      isHundoPossible,
      singleCatchOdds,
      matches,
    };
  }, [inputCp, currentBird, weatherBoosted]);

  return (
    <div className="galarian-interactive-showroom card" style={{
      background: 'linear-gradient(135deg, rgba(23, 25, 33, 0.95) 0%, rgba(15, 16, 22, 0.98) 100%)',
      border: '1px solid rgba(170, 59, 255, 0.3)',
      borderRadius: '20px',
      padding: '24px 22px',
      marginBottom: '28px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-20%',
        width: '450px',
        height: '450px',
        background: isShiny
          ? 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)'
          : selectedBirdId === 'articuno'
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)'
            : selectedBirdId === 'zapdos'
              ? 'radial-gradient(circle, rgba(249, 115, 22, 0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'all 0.5s ease',
      }} />

      {/* Header Deck: Bird Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap' }}>
          {BIRDS.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBirdId(b.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '0.86rem',
                fontWeight: 750,
                cursor: 'pointer',
                border: selectedBirdId === b.id ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                backgroundColor: selectedBirdId === b.id ? 'rgba(170, 59, 255, 0.25)' : 'var(--bg-card)',
                color: selectedBirdId === b.id ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: selectedBirdId === b.id ? '0 0 14px rgba(170, 59, 255, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {b.id === 'articuno' ? '❄️' : b.id === 'zapdos' ? '⚡' : '🔥'}
              {b.name[lang] || b.name.en}
            </button>
          ))}
        </div>

        {/* Normal vs Shiny Switcher */}
        <button
          type="button"
          onClick={() => setIsShiny(!isShiny)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 16px',
            borderRadius: '100px',
            fontSize: '0.84rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: isShiny ? '1px solid #facc15' : '1px solid var(--border-color)',
            background: isShiny
              ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.25) 0%, rgba(217, 119, 6, 0.35) 100%)'
              : 'var(--bg-card)',
            color: isShiny ? '#fef08a' : 'var(--text-muted)',
            boxShadow: isShiny ? '0 0 16px rgba(250, 204, 21, 0.35)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <Sparkles size={16} color={isShiny ? '#facc15' : '#94a3b8'} />
          {isShiny ? (lang === 'cs' ? '⭐ SHINY AKTIVNÍ (0% FLEE)' : '⭐ SHINY ACTIVE (0% FLEE)') : (lang === 'cs' ? 'Přepnout na Shiny' : 'Toggle Shiny')}
        </button>
      </div>

      {/* Main Grid: Bird Showcase Left, CP/IV Analyzer Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Left Card: High-Res Artwork & Species Field Intel */}
        <div style={{
          backgroundColor: 'rgba(23, 27, 44, 0.7)',
          border: isShiny ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          {/* Official Artwork Display with Glow */}
          <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 14px auto' }}>
            <img
              src={isShiny ? currentBird.shinyImage : currentBird.regularImage}
              alt={currentBird.name[lang] || currentBird.name.en}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: isShiny
                  ? 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))'
                  : 'drop-shadow(0 0 16px rgba(170, 59, 255, 0.35))',
                transition: 'all 0.35s ease',
              }}
            />
            {isShiny && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                backgroundColor: 'rgba(245, 158, 11, 0.95)',
                color: '#000000',
                padding: '3px 8px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                SHINY 0% FLEE
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '1.28rem', fontWeight: 850, margin: '0 0 6px 0', color: isShiny ? '#fef08a' : 'var(--text-primary)' }}>
            {currentBird.name[lang] || currentBird.name.en}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
            {currentBird.types.map(t => (
              <span key={t} style={{
                fontSize: '0.74rem',
                fontWeight: 750,
                padding: '3px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}>
                {t}
              </span>
            ))}
          </div>

          <p style={{
            fontSize: '0.84rem',
            color: isShiny ? '#fef08a' : 'var(--text-secondary)',
            lineHeight: 1.5,
            margin: '0 0 14px 0',
            fontStyle: 'italic',
          }}>
            {isShiny
              ? (currentBird.shinyLore[lang] || currentBird.shinyLore.en)
              : (lang === 'cs'
                  ? `Základní BCR činí 0,3 % s 90% Flee Rate po každém neúspěšném hodu.`
                  : `Features a 0.3% Base Catch Rate and 90% Flee Rate on every breakout.`)}
          </p>

          {/* Quick Specs Pill Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            textAlign: 'left',
            fontSize: '0.78rem',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            padding: '10px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Max CP (L50):</span>
              <strong style={{ color: 'var(--gold-hundo)' }}>{currentBird.maxCpL50} CP</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Vzdálenost hodu:</span>
              <strong style={{ color: '#38bdf8' }}>{currentBird.distance}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>L30 Hundo CP:</span>
              <strong style={{ color: '#4ade80' }}>{currentBird.hundoCpL30} CP</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>L35 WB Hundo:</span>
              <strong style={{ color: '#f59e0b' }}>{currentBird.hundoCpL35} CP</strong>
            </div>
          </div>
        </div>

        {/* Right Card: Instant CP & IV Analyzer Tool */}
        <div style={{
          backgroundColor: 'rgba(23, 27, 44, 0.7)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '20px',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Target size={20} color="#aa3bff" />
            <h4 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {lang === 'cs' ? 'Kalkulačka odchytu: Zadej CP z obrazovky' : 'Catch Calculator: Enter Wild CP'}
            </h4>
          </div>

          <p style={{ margin: '0 0 14px 0', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {lang === 'cs'
              ? 'Narazil jsi na Galarian ptáka při chůzi? Zadej jeho CP a zjisti jeho možný IV rozsah a doporučení, zda hodit Master Ball.'
              : 'Encountered a wild Galarian Bird? Enter its CP to evaluate its IV percentage range and Master Ball recommendation.'}
          </p>

          {/* CP Input Field & Weather Boost Toggle */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ flex: '1 1 140px', position: 'relative' }}>
              <input
                type="number"
                min="10"
                max="4100"
                value={inputCp}
                onChange={(e) => setInputCp(e.target.value)}
                placeholder="Např. 2450"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-body)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                CP
              </span>
            </div>

            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              userSelect: 'none',
            }}>
              <input
                type="checkbox"
                checked={weatherBoosted}
                onChange={(e) => setWeatherBoosted(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
              />
              <span>{lang === 'cs' ? 'Weather Boost' : 'Weather Boost'}</span>
            </label>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setInputCp('45')}
              style={{ padding: '4px 8px', fontSize: '0.74rem', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Level 1 (45 CP)
            </button>
            <button
              type="button"
              onClick={() => setInputCp('1480')}
              style={{ padding: '4px 8px', fontSize: '0.74rem', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Great League (1480 CP)
            </button>
            <button
              type="button"
              onClick={() => setInputCp(currentBird.hundoCpL30.toString())}
              style={{ padding: '4px 8px', fontSize: '0.74rem', borderRadius: '6px', backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', cursor: 'pointer' }}
            >
              L30 Hundo ({currentBird.hundoCpL30} CP)
            </button>
            <button
              type="button"
              onClick={() => { setInputCp(currentBird.hundoCpL35.toString()); setWeatherBoosted(true); }}
              style={{ padding: '4px 8px', fontSize: '0.74rem', borderRadius: '6px', backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24', cursor: 'pointer' }}
            >
              L35 WB ({currentBird.hundoCpL35} CP)
            </button>
          </div>

          {/* Result Output Card */}
          {analysisResult && analysisResult.valid ? (
            <div style={{
              backgroundColor: 'rgba(10, 12, 18, 0.65)',
              border: analysisResult.isHundoPossible
                ? '1px solid #facc15'
                : '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '14px',
            }}>
              {/* Strategic Catch Recommendation Alert */}
              {isShiny ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fef08a', fontSize: '0.84rem', fontWeight: 800, marginBottom: '10px' }}>
                  <CheckCircle2 size={18} color="#facc15" />
                  <span>{lang === 'cs' ? '⭐ SHINY: 0% FLEE RATE! NEHÁZEJ MASTER BALL — chytej v klidu Ultra Ballem!' : '⭐ SHINY: 0% FLEE RATE! DO NOT THROW MASTER BALL — use Ultra Balls safely!'}</span>
                </div>
              ) : analysisResult.isHundoPossible ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#facc15', fontSize: '0.84rem', fontWeight: 850, marginBottom: '10px' }}>
                  <AlertCircle size={18} color="#facc15" />
                  <span>{lang === 'cs' ? '🔥 MASTER BALL ALERT: Může to být 100% IV Hundo! Doporučeno hodit Master Ball!' : '🔥 MASTER BALL ALERT: Potential 100% IV Hundo! High recommendation for Master Ball!'}</span>
                </div>
              ) : parseInt(inputCp, 10) <= 50 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '0.84rem', fontWeight: 800, marginBottom: '10px' }}>
                  <CheckCircle2 size={18} color="#4ade80" />
                  <span>{lang === 'cs' ? '🎯 Level 1 pták: Šance na chycení Ultra Ballem je přes 30 % — Master Ball není potřeba.' : '🎯 Level 1 spawn: Ultra Ball catch rate exceeds 30% — save your Master Ball.'}</span>
                </div>
              ) : parseInt(inputCp, 10) <= 1500 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.84rem', fontWeight: 800, marginBottom: '10px' }}>
                  <Swords size={18} color="#38bdf8" />
                  <span>{lang === 'cs' ? '⚔️ Great League způsobilý (<1500 CP)! Zvaž Ultra Ball s Golden Razz.' : '⚔️ Great League eligible (<1500 CP)! Great candidate for PvP.'}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.84rem', fontWeight: 700, marginBottom: '10px' }}>
                  <Info size={18} color="#38bdf8" />
                  <span>{lang === 'cs' ? '👍 Běžné setkání: Zastav se, použij Golden Razz Berry + Ultra Ball.' : '👍 Standard encounter: Halt movement, feed Golden Razz Berry and throw curved Ultra Ball.'}</span>
                </div>
              )}

              {/* Data Metric Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '8px 4px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Možné IV</span>
                  <strong style={{ fontSize: '0.95rem', color: analysisResult.maxPct >= 90 ? '#facc15' : 'var(--text-primary)' }}>
                    {analysisResult.minPct}% – {analysisResult.maxPct}%
                  </strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '8px 4px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Možný Level</span>
                  <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>
                    L{analysisResult.minLvl} – L{analysisResult.maxLvl}
                  </strong>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '8px 4px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Šance 1 hodu</span>
                  <strong style={{ fontSize: '0.95rem', color: '#4ade80' }}>
                    ~{analysisResult.singleCatchOdds}%
                  </strong>
                </div>
              </div>

              {/* Toggle to view all combination details */}
              <button
                type="button"
                onClick={() => setShowAllCombinations(!showAllCombinations)}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span>{showAllCombinations ? (lang === 'cs' ? 'Skrýt detailní kombinace' : 'Hide Combinations') : (lang === 'cs' ? `Zobrazit všech ${analysisResult.count} kombinací IV` : `Show all ${analysisResult.count} IV combinations`)}</span>
                {showAllCombinations ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Dropdown list of matching IV combos */}
              {showAllCombinations && (
                <div style={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  marginTop: '8px',
                  padding: '6px',
                  backgroundColor: 'var(--bg-body)',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '4px',
                }}>
                  {analysisResult.matches.slice(0, 40).map((m, idx) => (
                    <div key={idx} style={{
                      padding: '3px 6px',
                      borderRadius: '4px',
                      backgroundColor: m.pct === 100 ? 'rgba(250, 204, 21, 0.2)' : 'rgba(255,255,255,0.04)',
                      border: m.pct === 100 ? '1px solid #facc15' : 'none',
                      color: m.pct === 100 ? '#facc15' : 'var(--text-secondary)',
                    }}>
                      L{m.lvl} • {m.ivA}/{m.ivD}/{m.ivS} (<strong>{m.pct}%</strong>)
                    </div>
                  ))}
                  {analysisResult.matches.length > 40 && (
                    <div style={{ color: 'var(--text-muted)', padding: '3px 6px', gridColumn: '1 / -1' }}>
                      + dalších {analysisResult.matches.length - 40} kombinací...
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '0.8rem',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <HelpCircle size={16} />
              <span>{lang === 'cs' ? 'Pro zadané CP neexistuje žádná platná kombinace pro divokého ptáka (Level 1–35).' : 'No valid wild level 1–35 combination exists for this CP value.'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

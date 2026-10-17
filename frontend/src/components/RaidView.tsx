'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './RaidView.css';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import { getPokemonName } from '../utils/pokemonTranslator';
import type { EventData } from './EventCard';
import { apiFetch } from '../config';
import { Sparkles, Trophy, BookOpen, ChevronRight, Swords } from 'lucide-react';
import { CounterItem, WeatherIcon } from './CounterItem';
import { getPokemonHubRating, getEvolutionInfo } from '../data/hubRatings';
import { findRaidCounters, raidCountersDb } from '../data/raidCounters';
import { resolveImage, handlePokemonImageError, SHADOW_ICON_URL, MEGA_ICON_URL, PRIMAL_ICON_URL, handleShadowIconError, handleMegaIconError, handlePrimalIconError } from '../utils/imageResolver';
import { DirectRaidFilterBox } from './DirectRaidFilterBox';
import { RaidDifficultyBox } from './RaidDifficultyBox';
import { detectUserRegion, isPokemonInUserRegion, getRegionalInfo } from '../utils/regionalHelper';

const ShadowIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <img
    src={SHADOW_ICON_URL}
    alt="Shadow"
    className={className}
    style={{
      width: '18px',
      height: '18px',
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }}
    onError={(e) => handleShadowIconError(e.target as HTMLImageElement)}
  />
);

const MegaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <img
    src={MEGA_ICON_URL}
    alt="Mega"
    className={className}
    style={{
      width: '18px',
      height: '18px',
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }}
    onError={(e) => handleMegaIconError(e.target as HTMLImageElement)}
  />
);

const PrimalIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <img
    src={PRIMAL_ICON_URL}
    alt="Primal"
    className={className}
    style={{
      width: '18px',
      height: '18px',
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }}
    onError={(e) => handlePrimalIconError(e.target as HTMLImageElement)}
  />
);

const HubRatingBadge: React.FC<{ rating: string; lang: Language }> = ({ rating, lang }) => {
  if (!rating) return null;
  
  const getRatingColor = (r: string) => {
    const rLower = r.toLowerCase();
    if (rLower === 's') return { bg: '#eab308', color: '#0c0d12' }; // Gold
    if (rLower.startsWith('a+')) return { bg: '#10b981', color: '#ffffff' }; // Emerald / Bright Green
    if (rLower.startsWith('a')) return { bg: '#22c55e', color: '#0c0d12' }; // Green
    if (rLower.startsWith('b')) return { bg: '#3b82f6', color: '#ffffff' }; // Blue
    return { bg: '#9ca3af', color: '#0c0d12' }; // Gray
  };
  
  const colors = getRatingColor(rating);
  
  return (
    <span 
      className="hub-rating-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: '2px 6px',
        fontSize: '0.65rem',
        fontWeight: 800,
        borderRadius: '4px',
        backgroundColor: colors.bg,
        color: colors.color,
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
      }}
    >
      <Trophy size={10} fill="currentColor" stroke="none" />
      {lang === 'ja' ? `${rating}ランク` : `${rating} Tier`}
    </span>
  );
};

interface RaidViewProps {
  events?: EventData[]; // Left for compatibility
  lang: Language;
  initialBosses?: RaidBoss[];
  initialExpandedBoss?: string;
  onOpenFilterGenerator?: (bossName?: string) => void;
  onOpenGuide?: (slug: string) => void;
}

export interface RaidBoss {
  name: string;
  tier: '1' | '3' | '5' | 'mega' | 'shadow-1' | 'shadow-3' | 'shadow-5';
  image: string;
  canBeShiny: boolean;
  cpRange?: string;
  boostedCpRange?: string;
  weatherBoosts?: string[];
  types?: string[];
  counters?: {
    bossName: string;
    weaknesses: string[];
    megaCounters: string[];
    advancedCounters: string[];
    budgetCounters: string[];
    minCp: number;
    maxCp: number;
    minBoostedCp: number;
    maxBoostedCp: number;
    weatherBoosts: string[];
  } | null;
}

const DEFAULT_FALLBACK_BOSS_SPECS: Array<{ key: string; name: string; tier: RaidBoss['tier'] }> = [
  { key: 'zekrom', name: 'Zekrom', tier: '5' },
  { key: 'reshiram', name: 'Reshiram', tier: '5' },
  { key: 'necrozma', name: 'Necrozma', tier: '5' },
  { key: 'rayquaza', name: 'Rayquaza', tier: '5' },
  { key: 'mewtwo', name: 'Mewtwo', tier: '5' },
  { key: 'kyurem', name: 'Kyurem', tier: '5' },
  { key: 'groudon', name: 'Groudon', tier: '5' },
  { key: 'kyogre', name: 'Kyogre', tier: '5' },
  { key: 'dialga', name: 'Dialga', tier: '5' },
  { key: 'palkia', name: 'Palkia', tier: '5' },
  { key: 'giratina', name: 'Giratina', tier: '5' },
  { key: 'zacian', name: 'Zacian', tier: '5' },
  { key: 'zamazenta', name: 'Zamazenta', tier: '5' },
  { key: 'mega rayquaza', name: 'Mega Rayquaza', tier: 'mega' },
  { key: 'mega lucario', name: 'Mega Lucario', tier: 'mega' },
  { key: 'mega tyranitar', name: 'Mega Tyranitar', tier: 'mega' },
  { key: 'mega garchomp', name: 'Mega Garchomp', tier: 'mega' },
  { key: 'mega gardevoir', name: 'Mega Gardevoir', tier: 'mega' },
  { key: 'mega charizard y', name: 'Mega Charizard Y', tier: 'mega' },
  { key: 'shadow mewtwo', name: 'Shadow Mewtwo', tier: 'shadow-5' },
  { key: 'shadow raikou', name: 'Shadow Raikou', tier: 'shadow-5' },
  { key: 'turtonator', name: 'Turtonator', tier: '3' },
  { key: 'drampa', name: 'Drampa', tier: '3' },
  { key: 'rockruff', name: 'Rockruff', tier: '1' },
  { key: 'frigibax', name: 'Frigibax', tier: '1' },
  { key: 'jangmo-o', name: 'Jangmo-o', tier: '1' },
  { key: 'shinx', name: 'Shinx', tier: '1' },
  { key: 'timburr', name: 'Timburr', tier: '1' },
];

export function buildFallbackRaidBosses(): RaidBoss[] {
  return DEFAULT_FALLBACK_BOSS_SPECS.map((spec) => {
    const counters = raidCountersDb[spec.key] || findRaidCounters(spec.name);
    return {
      name: spec.name,
      tier: spec.tier,
      image: resolveImage(undefined, 'raid', spec.name),
      canBeShiny: true,
      cpRange: counters ? `${counters.minCp} - ${counters.maxCp}` : undefined,
      boostedCpRange: counters ? `${counters.minBoostedCp} - ${counters.maxBoostedCp}` : undefined,
      weatherBoosts: counters?.weatherBoosts,
      counters,
    };
  });
}

export interface RegionalInfo {
  regionCode: 'EMEA' | 'Americas' | 'Asia' | 'North' | 'South';
  label: { cs: string; en: string; ja: string };
  shortLabel: { cs: string; en: string; ja: string };
}

export const REGIONAL_POKEMON: Record<string, RegionalInfo> = {
  'uxie': {
    regionCode: 'Asia',
    label: { cs: '🌏 Asie & Pacifik', en: '🌏 Asia-Pacific', ja: '🌏 アジア太平洋' },
    shortLabel: { cs: '🌏 Asie & Pacifik', en: '🌏 Asia-Pacific', ja: '🌏 アジア' },
  },
  'mesprit': {
    regionCode: 'EMEA',
    label: { cs: '🇪🇺 Evropa, Blízký východ, Afrika & Indie', en: '🇪🇺 Europe, Middle East, Africa & India (EMEA)', ja: '🇪🇺 欧州・中東・アフリカ・インド' },
    shortLabel: { cs: '🇪🇺 Evropa & EMEA', en: '🇪🇺 Europe / EMEA', ja: '🇪🇺 欧州・EMEA' },
  },
  'azelf': {
    regionCode: 'Americas',
    label: { cs: '🌎 Amerika & Grónsko', en: '🌎 Americas & Greenland', ja: '🌎 南北アメリカ・グリーンランド' },
    shortLabel: { cs: '🌎 Amerika', en: '🌎 Americas', ja: '🌎 アメリカ' },
  },
  'kartana': {
    regionCode: 'North',
    label: { cs: '🧭 Severní polokoule', en: '🧭 Northern Hemisphere', ja: '🧭 北半球' },
    shortLabel: { cs: '🧭 Severní polokoule', en: '🧭 Northern Hemisphere', ja: '🧭 北半球' },
  },
  'celesteela': {
    regionCode: 'South',
    label: { cs: '🧭 Jižní polokoule', en: '🧭 Southern Hemisphere', ja: '🧭 南半球' },
    shortLabel: { cs: '🧭 Jižní polokoule', en: '🧭 Southern Hemisphere', ja: '🧭 南半球' },
  }
};

type FilterTier = 'all' | '5' | 'mega' | '3' | '1';
type RegionFilter = 'all' | 'EMEA' | 'Asia' | 'Americas';

export function normalizeRaidTier(rawTier: any, bossName: string = ''): RaidBoss['tier'] {
  const lowerName = bossName.toLowerCase();
  const isShadow = lowerName.includes('shadow');

  if (!rawTier) {
    if (lowerName.includes('mega') || lowerName.includes('primal')) return 'mega';
    if (isShadow) return 'shadow-5';
    return '5';
  }

  const lower = String(rawTier).toLowerCase().trim();
  const hasShadowInTier = lower.includes('shadow') || isShadow;

  if (lower.includes('mega') || lower.includes('primal')) return 'mega';

  if (lower === '5' || lower.includes('5-star') || lower.includes('tier 5') || lower.includes('legendary') || lower.includes('5')) {
    return hasShadowInTier ? 'shadow-5' : '5';
  }
  if (lower === '3' || lower.includes('3-star') || lower.includes('tier 3') || lower.includes('3')) {
    return hasShadowInTier ? 'shadow-3' : '3';
  }
  if (lower === '1' || lower.includes('1-star') || lower.includes('tier 1') || lower.includes('1')) {
    return hasShadowInTier ? 'shadow-1' : '1';
  }
  return '1';
}

export function normalizeRaidBoss(raw: any): RaidBoss {
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const tier = normalizeRaidTier(raw.tier, name);

  // CP Range extraction
  let cpRange: string | undefined = raw.cpRange;
  if (!cpRange && raw.combatPower?.normal) {
    const { min, max } = raw.combatPower.normal;
    cpRange = min === max ? `${min}` : `${min} - ${max}`;
  }

  // Boosted CP Range extraction
  let boostedCpRange: string | undefined = raw.boostedCpRange;
  if (!boostedCpRange && raw.combatPower?.boosted) {
    const { min, max } = raw.combatPower.boosted;
    boostedCpRange = min === max ? `${min}` : `${min} - ${max}`;
  }

  // Weather boosts
  let weatherBoosts: string[] | undefined = Array.isArray(raw.weatherBoosts) ? raw.weatherBoosts : undefined;
  if (!weatherBoosts && Array.isArray(raw.boostedWeather)) {
    weatherBoosts = raw.boostedWeather.map((w: any) => typeof w === 'string' ? w : w?.name).filter(Boolean);
  }

  // Types
  let types: string[] | undefined = Array.isArray(raw.types)
    ? raw.types.map((t: any) => typeof t === 'string' ? t : t?.name).filter(Boolean)
    : undefined;

  // Counters
  const counters = raw.counters || findRaidCounters(name);

  // Image
  const image = raw.image || resolveImage(undefined, 'raid', name);

  return {
    name,
    tier,
    image,
    canBeShiny: Boolean(raw.canBeShiny),
    cpRange,
    boostedCpRange,
    weatherBoosts: weatherBoosts && weatherBoosts.length > 0 ? weatherBoosts : undefined,
    types: types && types.length > 0 ? types : undefined,
    counters,
  };
}

export const RaidView: React.FC<RaidViewProps> = ({ lang, initialBosses, initialExpandedBoss, onOpenFilterGenerator, onOpenGuide }) => {
  const initialResolvedBosses = React.useMemo(() => {
    const baseRaw = (initialBosses && initialBosses.length > 0) ? initialBosses : buildFallbackRaidBosses();
    const base = baseRaw.map(normalizeRaidBoss);
    if (initialExpandedBoss) {
      const cleanTarget = initialExpandedBoss.toLowerCase().trim();
      const exists = base.some(b => b.name.toLowerCase() === cleanTarget || b.name.toLowerCase().includes(cleanTarget));
      if (!exists) {
        const counters = findRaidCounters(initialExpandedBoss);
        const tier = normalizeRaidTier(undefined, initialExpandedBoss);
        return [
          {
            name: initialExpandedBoss,
            tier,
            image: resolveImage(undefined, 'raid', initialExpandedBoss),
            canBeShiny: true,
            cpRange: counters ? `${counters.minCp} - ${counters.maxCp}` : undefined,
            boostedCpRange: counters ? `${counters.minBoostedCp} - ${counters.maxBoostedCp}` : undefined,
            weatherBoosts: counters?.weatherBoosts,
            counters,
          },
          ...base,
        ];
      }
    }
    return base;
  }, [initialBosses, initialExpandedBoss]);

  const initialMatchedBossName = React.useMemo(() => {
    if (!initialExpandedBoss) return null;
    const cleanTarget = initialExpandedBoss.toLowerCase().trim();
    const match = initialResolvedBosses.find(
      b => b.name.toLowerCase() === cleanTarget || b.name.toLowerCase().includes(cleanTarget)
    );
    return match ? match.name : initialExpandedBoss;
  }, [initialExpandedBoss, initialResolvedBosses]);

  const [activeFilter, setActiveFilter] = useState<FilterTier>('all');
  const [expandedBoss, setExpandedBoss] = useState<string | null>(initialMatchedBossName);
  const [inlineBossName, setInlineBossName] = useState<string | null>(initialMatchedBossName);
  const [shinyBosses, setShinyBosses] = useState<Set<string>>(new Set());

  const toggleShinyBoss = (bossName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShinyBosses(prev => {
      const next = new Set(prev);
      if (next.has(bossName)) {
        next.delete(bossName);
      } else {
        next.add(bossName);
      }
      return next;
    });
  };
  const [bosses, setBosses] = useState<RaidBoss[]>(initialResolvedBosses);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang] || translations.cs;

  useEffect(() => {
    let isMounted = true;

    const fetchRaids = async (forceNoCache: boolean = false) => {
      setError(null);
      try {
        const url = `/api/raids${forceNoCache ? '?nocache=true' : ''}`;
        const response = await apiFetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch raids');
        const data = await response.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const normalizedData = data.map(normalizeRaidBoss);
          if (initialExpandedBoss) {
            const cleanTarget = initialExpandedBoss.toLowerCase().trim();
            const exists = normalizedData.some((b: RaidBoss) => b.name.toLowerCase() === cleanTarget || b.name.toLowerCase().includes(cleanTarget));
            if (!exists) {
              const targetEntry = initialResolvedBosses.find(b => b.name.toLowerCase().includes(cleanTarget));
              if (targetEntry) {
                setBosses([targetEntry, ...normalizedData]);
                return;
              }
            }
          }
          setBosses(normalizedData);
        }
      } catch (err) {
        console.error('Failed to load raids from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRaids();

    const handleFocus = () => {
      fetchRaids(true);
    };
    window.addEventListener('focus', handleFocus);

    const interval = setInterval(() => {
      fetchRaids(true);
    }, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [lang, initialExpandedBoss, initialResolvedBosses]);

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case '5': return '5★ Raid';
      case 'mega': return 'Mega Raid';
      case '3': return '3★ Raid';
      case '1': return '1★ Raid';
      case 'shadow-5': return 'Shadow 5★';
      case 'shadow-3': return 'Shadow 3★';
      case 'shadow-1': return 'Shadow 1★';
      default: return 'Raid';
    }
  };

  const userRegion = React.useMemo(() => detectUserRegion(), []);

  // Deduplicate and split composite boss names in frontend as safety fallback
  const processedBosses = React.useMemo(() => {
    const list: RaidBoss[] = [];
    const seen = new Set<string>();

    for (const b of bosses) {
      const normalizedB = normalizeRaidBoss(b);
      const subNames = normalizedB.name.split(/,|\sand\s|&/i).map(s => s.trim()).filter(Boolean);
      for (const name of subNames) {
        const normTier = normalizeRaidTier(normalizedB.tier, name);
        const key = `${name.toLowerCase()}-${normTier}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ ...normalizedB, name, tier: normTier });
        }
      }
    }
    return list;
  }, [bosses]);

  const filteredBosses = processedBosses.filter(boss => {
    // 1. Tier filter
    const normTier = normalizeRaidTier(boss.tier, boss.name);
    let tierMatch = true;
    if (activeFilter === '5') tierMatch = normTier === '5' || normTier === 'shadow-5';
    else if (activeFilter === 'mega') tierMatch = normTier === 'mega';
    else if (activeFilter === '3') tierMatch = normTier === '3' || normTier === 'shadow-3';
    else if (activeFilter === '1') tierMatch = normTier === '1' || normTier === 'shadow-1';
    else if (activeFilter !== 'all') tierMatch = normTier === activeFilter;

    if (!tierMatch) return false;

    // 2. Automatically filter regional Pokemon belonging to other regions
    return isPokemonInUserRegion(boss.name, userRegion);
  });
  const toggleExpandBoss = (name: string, targetEl?: HTMLElement | null) => {
    if (expandedBoss === name) {
      setExpandedBoss(null);
      setInlineBossName(null);
      return;
    }

    let isAlone = false;

    if (targetEl && targetEl.parentElement) {
      const cardEl = targetEl.closest('.raid-boss-card') as HTMLElement;
      if (cardEl && cardEl.parentElement) {
        const parent = cardEl.parentElement;
        const siblings = Array.from(parent.children) as HTMLElement[];
        const cardSiblings = siblings.filter(el => 
          el !== cardEl && 
          (el.classList.contains('event-card') || el.classList.contains('raid-boss-card')) &&
          el.offsetParent !== null
        );

        if (cardSiblings.length === 0) {
          isAlone = true;
        } else {
          const currentTop = cardEl.offsetTop;
          const hasSiblingInSameRow = cardSiblings.some(sibling => 
            Math.abs(sibling.offsetTop - currentTop) < 12
          );
          isAlone = !hasSiblingInSameRow;
        }
      }
    } else {
      isAlone = window.innerWidth < 600 || filteredBosses.length === 1;
    }

    if (isAlone) {
      setInlineBossName(name);
    } else {
      setInlineBossName(null);
    }

    setExpandedBoss(name);
  };

  useEffect(() => {
    if (expandedBoss && inlineBossName !== expandedBoss) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setExpandedBoss(null);
          setInlineBossName(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [expandedBoss, inlineBossName]);

  const renderRaidDetails = (boss: any, counters: any) => (
    <div className="raid-boss-expanded-details">
      <div className="expanded-divider"></div>
      
      {/* Raid Difficulty & Pokebattler Box (PLACED ABOVE WEAKNESSES AND COUNTERS) */}
      <RaidDifficultyBox
        bossName={boss.name}
        tier={boss.tier}
        playersRecommended={boss.playersRecommended || counters?.playersRecommended}
        difficultyTier={boss.difficultyTier || counters?.difficultyTier}
        difficultyNotes={boss.difficultyNotes || counters?.difficultyNotes}
        pokebattlerUrl={boss.pokebattlerUrl || counters?.pokebattlerUrl}
        lang={lang}
      />

      {counters ? (
        <div className="raid-boss-counters-card no-border" style={{ paddingBottom: 0 }}>
          <div className="counters-boss-header pad-none">
            <div className="weakness-list">
              {t.details_weaknesses}: <span className="type-badges-flex">{counters.weaknesses.map((w: string) => <TypeBadge key={w} typeStr={w} lang={lang} />)}</span>
            </div>
          </div>
          
          <div className="counters-levels-grid">
            {counters.megaCounters.length > 0 && (
              <div className="counter-level-col mega">
                <span className="level-badge mega">{t.details_level_mega}</span>
                <ul>
                  {counters.megaCounters.map((c: string) => <CounterItem key={c} counterStr={c} lang={lang} />)}
                </ul>
              </div>
            )}
            {counters.advancedCounters.length > 0 && (
              <div className="counter-level-col advanced">
                <span className="level-badge advanced">{t.details_level_advanced}</span>
                <ul>
                  {counters.advancedCounters.map((c: string) => <CounterItem key={c} counterStr={c} lang={lang} />)}
                </ul>
              </div>
            )}
            {counters.budgetCounters.length > 0 && (
              <div className="counter-level-col budget">
                <span className="level-badge budget">{t.details_level_budget}</span>
                <ul>
                  {counters.budgetCounters.map((c: string) => <CounterItem key={c} counterStr={c} lang={lang} />)}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-counters-found">
          <p style={{ margin: 0, padding: '8px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {lang === 'ja' 
              ? 'このボスの対策ポケモンとCP情報は現在利用できません。' 
              : lang === 'cs' 
              ? 'Doporučené counters a CP pro tohoto bossa momentálně nejsou k dispozici.' 
              : 'Recommended counters and CP for this boss are currently unavailable.'}
          </p>
        </div>
      )}

      {/* Direct copyable filter for recommended raid counters */}
      <DirectRaidFilterBox bossName={boss.name} lang={lang} onOpenFilterGenerator={onOpenFilterGenerator} />
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{lang === 'ja' ? 'サーバーからレイド情報を読み込み中...' : lang === 'cs' ? 'Načítání raidů ze serveru...' : 'Loading raids from server...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '40px', color: '#ff4d4d' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="raid-view-container">
      {/* Unified Header Card */}
      <header className="raid-header-card guides-header">
        <div className="guides-title-badge">
          <Swords size={16} />
          {lang === 'cs' ? 'Raid Boss Rotace & Countery' : lang === 'ja' ? 'レイドボス出現情報 & 対策' : lang === 'ru' ? 'Ротация рейд-боссов и контры' : 'Raid Bosses & Counters'}
        </div>
        <h1>{t.tabs_raid}</h1>
        <p>{(t as any).seo_raid_desc}</p>
        {/* Tier Filter Pills */}
        <div className="filter-pill-container font-small" style={{ marginTop: '4px' }}>
          <button 
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} 
            onClick={() => { setActiveFilter('all'); setExpandedBoss(null); }}
          >
            {lang === 'ja' ? 'すべて' : lang === 'cs' ? 'Vše' : 'All'}
          </button>
          <button 
            className={`filter-pill ${activeFilter === '5' ? 'active' : ''}`} 
            onClick={() => { setActiveFilter('5'); setExpandedBoss(null); }}
          >
            5★
          </button>
          <button 
            className={`filter-pill ${activeFilter === 'mega' ? 'active' : ''}`} 
            onClick={() => { setActiveFilter('mega'); setExpandedBoss(null); }}
          >
            Mega
          </button>
          <button 
            className={`filter-pill ${activeFilter === '3' ? 'active' : ''}`} 
            onClick={() => { setActiveFilter('3'); setExpandedBoss(null); }}
          >
            3★
          </button>
          <button 
            className={`filter-pill ${activeFilter === '1' ? 'active' : ''}`} 
            onClick={() => { setActiveFilter('1'); setExpandedBoss(null); }}
          >
            1★
          </button>
        </div>
      </header>

      {/* Grid of bosses */}
      <div className="raid-bosses-grid">
        {filteredBosses.length === 0 ? (
          <div className="no-bosses-found" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>
            <p>{lang === 'ja' ? 'このカテゴリのレイドはありません。' : lang === 'cs' ? 'Žádní aktivní bossové v této kategorii.' : 'No active bosses in this category.'}</p>
          </div>
        ) : (
          filteredBosses.map((boss, idx) => {
            const isExpanded = expandedBoss === boss.name;
            const counters = boss.counters || findRaidCounters(boss.name);
            const uniqueKey = `${boss.name}-${boss.tier}-${idx}`;
            const isInline = isExpanded && inlineBossName === boss.name;

            return (
              <React.Fragment key={uniqueKey}>
                <div 
                  className={`raid-boss-card tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier} ${isInline ? 'expanded' : ''}`}
                >
                  <div 
                    className="raid-boss-summary" 
                    onClick={(e) => toggleExpandBoss(boss.name, e.currentTarget)}
                  >
                    {(() => {
                      const isBossShiny = shinyBosses.has(boss.name);
                      return (
                        <div className="boss-img-wrapper" style={{ position: 'relative' }}>
                          {boss.canBeShiny && (
                            <button
                              className={`shiny-poke-toggle-btn ${isBossShiny ? 'active' : ''}`}
                              title={lang === 'cs' ? 'Přepnout Shiny náhled' : 'Toggle Shiny preview'}
                              onClick={(e) => toggleShinyBoss(boss.name, e)}
                              style={{
                                position: 'absolute',
                                top: '-6px',
                                left: '-6px',
                                background: isBossShiny ? 'rgba(245, 158, 11, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                                border: '1px solid rgba(251, 191, 36, 0.7)',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                zIndex: 6
                              }}
                            >
                              <Sparkles size={11} style={{ color: isBossShiny ? '#fff' : '#fbbf24' }} />
                            </button>
                          )}
                          {boss.name.toLowerCase().includes('primal') && (
                            <PrimalIcon 
                              style={{ 
                                position: 'absolute', 
                                top: '-4px', 
                                right: '-4px',
                                width: '18px',
                                height: '18px'
                              }} 
                            />
                          )}
                          {!boss.name.toLowerCase().includes('primal') && (boss.tier === 'mega' || boss.name.toLowerCase().includes('mega')) && (
                            <MegaIcon 
                              style={{ 
                                position: 'absolute', 
                                top: '-4px', 
                                right: '-4px',
                                width: '18px',
                                height: '18px'
                              }} 
                            />
                          )}
                          {!boss.name.toLowerCase().includes('primal') && boss.tier !== 'mega' && !boss.name.toLowerCase().includes('mega') && boss.tier.startsWith('shadow') && (
                            <ShadowIcon 
                              className="shadow-aura-effect" 
                              style={{ 
                                position: 'absolute', 
                                top: '-4px', 
                                right: '-4px',
                                width: '18px',
                                height: '18px'
                              }} 
                            />
                          )}
                          <img 
                            src={resolveImage(boss.image, 'raid', boss.name, isBossShiny)} 
                            alt={getPokemonName(boss.name, lang)}
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              handlePokemonImageError(e.target as HTMLImageElement, boss.name, isBossShiny);
                            }}
                            className="boss-avatar-img"
                          />
                        </div>
                      );
                    })()}
                    
                    <div className="boss-meta-info">
                       <span className={`boss-tier-badge tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier}`}>
                         {getTierLabel(boss.tier)}
                       </span>
                       <h3 className="boss-title-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                         <Link
                           href={`/${lang}/raids/${boss.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-counters`}
                           onClick={(e) => e.preventDefault()}
                           style={{ color: 'inherit', textDecoration: 'none' }}
                         >
                           {getPokemonName(boss.name, lang)}
                         </Link>
                         {/* PoGO Hub Rating & Evolution Info */}
                         {(() => {
                           const rating = getPokemonHubRating(boss.name);
                           const evoInfo = getEvolutionInfo(boss.name);
                           const showEvo = evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && boss.name.toLowerCase() !== evoInfo.evolution.toLowerCase();
                           
                           if (!rating && !showEvo) return null;
                           
                           return (
                             <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                               {rating && (
                                 <HubRatingBadge rating={rating} lang={lang} />
                               )}
                               {showEvo && (
                                 <span 
                                   style={{ 
                                     fontSize: '0.62rem', 
                                     color: '#34d399', 
                                     fontWeight: 600, 
                                     backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                     border: '1px solid rgba(16, 185, 129, 0.25)',
                                     padding: '1px 5px',
                                     borderRadius: '4px',
                                     display: 'inline-flex',
                                     alignItems: 'center',
                                     gap: '3px'
                                   }}
                                 >
                                   <span>➔ {boss.tier.startsWith('shadow') ? (lang === 'ja' ? 'シャドウ' : 'Shadow') : ''} {getPokemonName(evoInfo.evolution, lang)}</span>
                                   <span style={{ fontWeight: 800 }}>({evoInfo.rating})</span>
                                 </span>
                               )}
                             </span>
                           );
                         })()}
                       </h3>

                       {boss.canBeShiny && (
                         <div style={{ marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                           <span className="shiny-star-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '1px 5px', fontSize: '0.65rem', borderRadius: '4px', backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                             <Sparkles size={8} fill="currentColor" stroke="none" /> {lang === 'ja' ? 'ひかる' : 'Shiny'}
                           </span>
                           {(() => {
                             const regInfo = REGIONAL_POKEMON[boss.name.toLowerCase()];
                             if (!regInfo) return null;
                             return (
                               <span 
                                 className="regional-boss-badge"
                                 style={{
                                   display: 'inline-flex',
                                   alignItems: 'center',
                                   gap: '3px',
                                   padding: '1px 6px',
                                   fontSize: '0.65rem',
                                   fontWeight: 600,
                                   borderRadius: '4px',
                                   backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                   border: '1px solid rgba(96, 165, 250, 0.3)',
                                   color: '#93c5fd'
                                 }}
                               >
                                 {regInfo.shortLabel[lang] || regInfo.shortLabel.cs}
                               </span>
                             );
                           })()}
                         </div>
                       )}

                       {!boss.canBeShiny && (() => {
                         const regInfo = REGIONAL_POKEMON[boss.name.toLowerCase()];
                         if (!regInfo) return null;
                         return (
                           <div style={{ marginTop: '3px' }}>
                             <span 
                               className="regional-boss-badge"
                               style={{
                                 display: 'inline-flex',
                                 alignItems: 'center',
                                 gap: '3px',
                                 padding: '1px 6px',
                                 fontSize: '0.65rem',
                                 fontWeight: 600,
                                 borderRadius: '4px',
                                 backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                 border: '1px solid rgba(96, 165, 250, 0.3)',
                                 color: '#93c5fd'
                               }}
                             >
                               {regInfo.shortLabel[lang] || regInfo.shortLabel.cs}
                             </span>
                           </div>
                         );
                       })()}
                     </div>

                    <div className="boss-right-info" style={{ marginLeft: 'auto', marginRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', textAlign: 'right' }}>
                      {/* CP range */}
                      {counters && counters.maxCp > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {counters.minCp} – <strong className="hundo-label" style={{ fontWeight: 700 }}>{counters.maxCp} CP</strong>
                          </span>
                          {counters.maxBoostedCp > 0 && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <span style={{ color: '#60a5fa' }}>⚡</span> {counters.minBoostedCp} – <strong className="hundo-label-boost" style={{ fontWeight: 600 }}>{counters.maxBoostedCp} CP</strong>
                            </span>
                          )}
                        </div>
                      ) : boss.cpRange ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {boss.cpRange} CP
                          </span>
                          {boss.boostedCpRange && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              <span style={{ color: '#60a5fa' }}>⚡</span> {boss.boostedCpRange} CP
                            </span>
                          )}
                        </div>
                      ) : null}

                      {/* Weather Boosts */}
                      {counters && counters.weatherBoosts.length > 0 ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {counters.weatherBoosts.map((w: string) => <WeatherIcon key={w} weatherStr={w} />)}
                        </div>
                      ) : boss.weatherBoosts && boss.weatherBoosts.length > 0 ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {boss.weatherBoosts.map((w: string) => <WeatherIcon key={w} weatherStr={w} />)}
                        </div>
                      ) : null}
                    </div>

                    <div className="expand-chevron">
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>

                  {/* Inline expansion if single item in row */}
                  {isInline && renderRaidDetails(boss, counters)}
                </div>

                {/* Glassmorphic Modal Overlay if multi-column desktop grid */}
                {isExpanded && !isInline && (
                  <div className="event-modal-overlay" onClick={() => setExpandedBoss(null)}>
                    <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
                      <button className="modal-close-btn" onClick={() => setExpandedBoss(null)} aria-label="Close">
                        ✕
                      </button>

                      <div className="modal-header-section">
                        <div className="boss-img-wrapper" style={{ width: '80px', height: '80px' }}>
                          <img 
                            src={resolveImage(boss.image, 'raid', boss.name)} 
                            alt={getPokemonName(boss.name, lang)}
                            width={80}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              handlePokemonImageError(e.target as HTMLImageElement, boss.name);
                            }}
                            className="boss-avatar-img"
                          />
                        </div>
                        <div className="modal-header-info">
                          <span className={`boss-tier-badge tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier}`}>
                            {getTierLabel(boss.tier)}
                          </span>
                          <h3 className="boss-title-name" style={{ margin: 0 }}>
                            {getPokemonName(boss.name, lang)}
                          </h3>
                        </div>
                      </div>

                      {renderRaidDetails(boss, counters)}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

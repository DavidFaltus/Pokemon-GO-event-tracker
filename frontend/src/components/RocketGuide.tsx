'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import './RocketGuide.css';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import { CounterItem } from './CounterItem';
import { getPokemonName } from '../utils/pokemonTranslator';
import { apiFetch } from '../config';
import { Zap, Users, Gift, Flame, Swords, Shield, MessageSquare, Gem, Moon, Glasses, Trophy, BookOpen, ChevronRight } from 'lucide-react';
import { getPokemonHubRating, getEvolutionInfo } from '../data/hubRatings';
import { resolveImage, getPokemonIconUrl, handlePokemonImageError, SHADOW_ICON_URL, handleShadowIconError } from '../utils/imageResolver';

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

const getLeaderIcon = (name: string, size = 16) => {
  const cleanName = name.toLowerCase();
  if (cleanName === 'giovanni') {
    return (
      <svg 
        viewBox="0 0 64 64" 
        width={size} 
        height={size} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <path d="M12 56V32c0-6 4-10 10-10h20c6 0 10 4 10 10v24" />
        <path d="M22 22l10 16 10-16" />
        <path d="M26 22V14c0-3 2-5 6-5s6 2 6 5v8" />
        <path d="M32 26v16l-3 4 3 4 3-4-3-4" fill="currentColor" fillOpacity={0.15} />
      </svg>
    );
  }
  if (cleanName === 'cliff') {
    return (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'scaleX(-1)' }}
      >
        <path d="M6 20a5 5 0 0 1 5-5h1c2 0 3.5-1.5 3.5-3.5V8" />
        <path d="M15.5 8c1.2 0 2.2.8 2.2 2v2.5c0 2.5-2 4.5-4.5 4.5H6" />
        <circle cx="15.5" cy="7.5" r="2" fill="currentColor" fillOpacity={0.15} />
      </svg>
    );
  }
  if (cleanName === 'sierra') {
    return <Moon size={size} fill="currentColor" fillOpacity={0.15} style={{ display: 'inline-block', verticalAlign: 'middle' }} />;
  }
  if (cleanName === 'arlo') {
    return <Glasses size={size} fill="currentColor" fillOpacity={0.15} style={{ display: 'inline-block', verticalAlign: 'middle' }} />;
  }
  return null;
};

interface RocketGuideProps {
  lang: Language;
  initialRocketData?: { giovanni: RocketMember; leaders: RocketMember[]; grunts: GruntData[] } | null;
  initialLeader?: string;
  onOpenGuide?: (slug: string) => void;
}

interface LineupPokemon {
  name: string;
  types: string[];
  image: string;
}

export interface RocketMember {
  name: string;
  avatar: string;
  reward: {
    name: string;
    pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
    pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
    worthGrinding: boolean;
    reason: string;
    hubRating: string;
  };
  lineup: {
    // Backend may send string[] OR LineupPokemon[] — we normalise in renderLineupSlot
    slot1: (string | LineupPokemon)[];
    slot2: (string | LineupPokemon)[];
    slot3: (string | LineupPokemon)[];
  };
  counters: {
    megaCounters: string[];
    advancedCounters: string[];
    budgetCounters: string[];
  };
}

export interface GruntData {
  phraseCs: string;
  phraseEn: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  worthFighting: boolean;
  shadowPokemon: string[];
  counters: string[];
}

export const DEFAULT_ROCKET_DATA: { giovanni: RocketMember; leaders: RocketMember[]; grunts: GruntData[] } = {
  giovanni: {
    name: 'Giovanni',
    avatar: '👑',
    reward: {
      name: 'Heatran',
      pveRating: 'S',
      pvpRating: 'A',
      worthGrinding: true,
      reason: 'Shadow Heatran (Fire Spin + Magma Storm) patří mezi nejsilnější ohnivé PvE útočníky v Pokémon GO.',
      hubRating: 'S',
    },
    lineup: {
      slot1: [{ name: 'Persian', types: ['Normal'], image: '' }],
      slot2: [
        { name: 'Kingdra', types: ['Water', 'Dragon'], image: '' },
        { name: 'Rhyperior', types: ['Ground', 'Rock'], image: '' },
        { name: 'Nidoking', types: ['Poison', 'Ground'], image: '' },
      ],
      slot3: [{ name: 'Heatran', types: ['Fire', 'Steel'], image: '' }],
    },
    counters: {
      megaCounters: ['Primal Groudon (Mud Shot / Precipice Blades)', 'Mega Garchomp (Mud Shot / Earth Power)', 'Mega Lucario (Force Palm / Aura Sphere)'],
      advancedCounters: ['Terrakion (Double Kick / Sacred Sword)', 'Groudon (Mud Shot / Precipice Blades)', 'Shadow Rhyperior (Mud-Slap / Earthquake)'],
      budgetCounters: ['Machamp (Counter / Cross Chop)', 'Excadrill (Mud-Slap / Scorching Sands)', 'Swampert (Mud Shot / Hydro Cannon)'],
    },
  },
  leaders: [
    {
      name: 'Cliff',
      avatar: '💪',
      reward: {
        name: 'Lileep',
        pveRating: 'B',
        pvpRating: 'A',
        worthGrinding: true,
        reason: 'Shadow Cradily je výborný meta výběr do Great League a Ultra League.',
        hubRating: 'A',
      },
      lineup: {
        slot1: [{ name: 'Lileep', types: ['Rock', 'Grass'], image: '' }],
        slot2: [
          { name: 'Marowak', types: ['Ground'], image: '' },
          { name: 'Kingdra', types: ['Water', 'Dragon'], image: '' },
          { name: 'Machamp', types: ['Fighting'], image: '' },
        ],
        slot3: [
          { name: 'Tyranitar', types: ['Rock', 'Dark'], image: '' },
          { name: 'Aerodactyl', types: ['Rock', 'Flying'], image: '' },
          { name: 'Crobat', types: ['Poison', 'Flying'], image: '' },
        ],
      },
      counters: {
        megaCounters: ['Mega Lucario (Force Palm / Aura Sphere)', 'Mega Gardevoir (Charm / Triple Axel)', 'Primal Kyogre (Waterfall / Origin Pulse)'],
        advancedCounters: ['Terrakion (Double Kick / Sacred Sword)', 'Shadow Mamoswine (Powder Snow / Avalanche)', 'Mewtwo (Psycho Cut / Psystrike)'],
        budgetCounters: ['Machamp (Counter / Dynamic Punch)', 'Gardevoir (Charm / Dazzling Gleam)', 'Mamoswine (Powder Snow / Avalanche)'],
      },
    },
    {
      name: 'Sierra',
      avatar: '🧣',
      reward: {
        name: 'Trapinch',
        pveRating: 'B',
        pvpRating: 'A',
        worthGrinding: true,
        reason: 'Shadow Flygon vyniká v Great a Ultra League díky rychlému nabíjení Dragon Claw a Scorching Sands.',
        hubRating: 'A',
      },
      lineup: {
        slot1: [{ name: 'Trapinch', types: ['Ground'], image: '' }],
        slot2: [
          { name: 'Milotic', types: ['Water'], image: '' },
          { name: 'Sableye', types: ['Dark', 'Ghost'], image: '' },
          { name: 'Ferrothorn', types: ['Grass', 'Steel'], image: '' },
        ],
        slot3: [
          { name: 'Houndoom', types: ['Dark', 'Fire'], image: '' },
          { name: 'Victreebel', types: ['Grass', 'Poison'], image: '' },
          { name: 'Alakazam', types: ['Psychic'], image: '' },
        ],
      },
      counters: {
        megaCounters: ['Mega Rayquaza (Dragon Tail / Dragon Ascent)', 'Mega Swampert (Mud Shot / Hydro Cannon)', 'Mega Blaziken (Counter / Blaze Kick)'],
        advancedCounters: ['Shadow Mamoswine (Powder Snow / Avalanche)', 'Kartana (Razor Leaf / Leaf Blade)', 'Lucario (Force Palm / Aura Sphere)'],
        budgetCounters: ['Mamoswine (Powder Snow / Avalanche)', 'Machamp (Counter / Cross Chop)', 'Roserade (Razor Leaf / Grass Knot)'],
      },
    },
    {
      name: 'Arlo',
      avatar: '👓',
      reward: {
        name: 'Beldum',
        pveRating: 'S',
        pvpRating: 'A',
        worthGrinding: true,
        reason: 'Shadow Metagross (Meteor Mash) je absolutní S-Tier ocelový raid counter v celé hře!',
        hubRating: 'S',
      },
      lineup: {
        slot1: [{ name: 'Beldum', types: ['Steel', 'Psychic'], image: '' }],
        slot2: [
          { name: 'Hypno', types: ['Psychic'], image: '' },
          { name: 'Gyarados', types: ['Water', 'Flying'], image: '' },
          { name: 'Crobat', types: ['Poison', 'Flying'], image: '' },
        ],
        slot3: [
          { name: 'Scizor', types: ['Bug', 'Steel'], image: '' },
          { name: 'Snorlax', types: ['Normal'], image: '' },
          { name: 'magnezone', types: ['Electric', 'Steel'], image: '' },
        ],
      },
      counters: {
        megaCounters: ['Mega Tyranitar (Bite / Brutal Swing)', 'Mega Blaziken (Fire Spin / Blast Burn)', 'Primal Groudon (Mud Shot / Precipice Blades)'],
        advancedCounters: ['Hydreigon (Bite / Brutal Swing)', 'Reshiram (Fire Fang / Fusion Flare)', 'Terrakion (Double Kick / Sacred Sword)'],
        budgetCounters: ['Chandelure (Incinerate / Shadow Ball)', 'Excadrill (Mud-Slap / Drill Run)', 'Machamp (Counter / Dynamic Punch)'],
      },
    },
  ],
  grunts: [
    { phraseCs: 'Tihle dračí Pokémoni se jen tak nevzdají!', phraseEn: 'ROAR! ...How\'d that sound?', type: 'Dragon', difficulty: 'Hard', worthFighting: true, shadowPokemon: ['Bagon', 'Dratini', 'Gible'], counters: ['Mamoswine', 'Gardevoir', 'Togekiss'] },
    { phraseCs: 'Víš, jak horký může být pokémoní dech?', phraseEn: 'Do you know how hot Pokémon fire breath can get?', type: 'Fire', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Darumaka', 'Litwick', 'Torchic'], counters: ['Kyogre', 'Rhyperior', 'Swampert'] },
    { phraseCs: 'Tyto vody jsou zrádné!', phraseEn: 'These waters are treacherous!', type: 'Water', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Mudkip', 'Totodile', 'Magikarp'], counters: ['Kartana', 'Xurkitree', 'Roserade'] },
    { phraseCs: 'Země tě pohltí!', phraseEn: 'You\'ll be defeated into the ground!', type: 'Ground', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Drilbur', 'Swinub', 'Rhyhorn'], counters: ['Kyogre', 'Mamoswine', 'Kartana'] },
    { phraseCs: 'Tenhle svalnatý vzhled není jen na okrasu!', phraseEn: 'This buff physique isn\'t just for show!', type: 'Fighting', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Machop', 'Timburr', 'Makuhita'], counters: ['Mewtwo', 'Gardevoir', 'Rayquaza'] },
    { phraseCs: 'Kde je světlo, tam je i stín.', phraseEn: 'Wherever there is light, there is also shadow.', type: 'Dark', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Deino', 'Sneasel', 'Houndour'], counters: ['Machamp', 'Togekiss', 'Gardevoir'] },
    { phraseCs: 'Ke-ke-ke-ke-ke-ke!', phraseEn: 'Ke...ke...ke...ke...ke...ke!', type: 'Ghost', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Gastly', 'Litwick', 'Golett'], counters: ['Hydreigon', 'Tyranitar', 'Darkrai'] },
    { phraseCs: 'Proti mé železné vůli nemáš šanci!', phraseEn: 'You\'re no match for my iron will!', type: 'Steel', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Beldum', 'Aron', 'Ferroseed'], counters: ['Reshiram', 'Lucario', 'Groudon'] },
    { phraseCs: 'Pojďme do toho na plné pecky!', phraseEn: 'Let\'s rock and roll!', type: 'Rock', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Larvitar', 'Cranidos', 'Tyrunt'], counters: ['Machamp', 'Kyogre', 'Metagross'] },
    { phraseCs: 'Zmrzneš na kost!', phraseEn: 'You\'re gonna be frozen in your tracks.', type: 'Ice', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Swinub', 'Spheal', 'Snorunt'], counters: ['Metagross', 'Machamp', 'Reshiram'] },
    { phraseCs: 'Dávej pozor, ať nedostaneš ránu proudem!', phraseEn: 'Get ready to be shocked!', type: 'Electric', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Magnemite', 'Electabuzz', 'Shinx'], counters: ['Groudon', 'Garchomp', 'Excadrill'] },
    { phraseCs: 'Nezahrávej si s námi!', phraseEn: 'Don\'t tangle with us!', type: 'Grass', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Treecko', 'Turtwig', 'Bulbasaur'], counters: ['Reshiram', 'Charizard', 'Mamoswine'] },
    { phraseCs: 'Bojíš se psychické síly?', phraseEn: 'Are you scared of psychics that use unseen power?', type: 'Psychic', difficulty: 'Medium', worthFighting: true, shadowPokemon: ['Ralts', 'Abra', 'Beldum'], counters: ['Tyranitar', 'Hydreigon', 'Chandelure'] },
    { phraseCs: 'Podívej se na mého roztomilého Pokémona!', phraseEn: 'Check out my cute Pokémon!', type: 'Fairy', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Ralts', 'Snubbull', 'Mawile'], counters: ['Metagross', 'Nihilego', 'Roserade'] },
    { phraseCs: 'Bojuj s mým létajícím typem!', phraseEn: 'Battle my Flying-type Pokémon!', type: 'Flying', difficulty: 'Easy', worthFighting: true, shadowPokemon: ['Starly', 'Zubat', 'Gligar'], counters: ['Mamoswine', 'Raikou', 'Rampardos'] },
    { phraseCs: 'Jsem připraven tě otrávit!', phraseEn: 'Coiled and ready to strike!', type: 'Poison', difficulty: 'Easy', worthFighting: false, shadowPokemon: ['Nidoran', 'Zubat', 'Grimer'], counters: ['Mewtwo', 'Groudon', 'Excadrill'] },
    { phraseCs: 'Do toho, moji hmyzí Pokémoni!', phraseEn: 'Go, my super bug Pokémon!', type: 'Bug', difficulty: 'Easy', worthFighting: false, shadowPokemon: ['Scyther', 'Venipede', 'Weedle'], counters: ['Rampardos', 'Reshiram', 'Charizard'] },
    { phraseCs: 'Normální neznamená slabý!', phraseEn: 'Normal does not mean weak.', type: 'Normal', difficulty: 'Easy', worthFighting: false, shadowPokemon: ['Snorlax', 'Teddiursa', 'Porygon'], counters: ['Lucario', 'Machamp', 'Terrakion'] },
  ],
};

type ModeType = 'leaders' | 'grunts';

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

const getGruntPhrase = (grunt: GruntData, lang: Language): string => {
  if (lang === 'ja') {
    const jaPhrases: Record<string, string> = {
      "normal": "ノーマルタイプは よわくないぞ！",
      "fire": "ポケモンの ほのおのいきは あついぞ！",
      "water": "このみずは きけんだ！",
      "grass": "くさタイプと たたかおう！",
      "electric": "でんきショックに きをつけろ！",
      "ice": "こおらせて やるぞ！",
      "fighting": "このからだは かざりじゃないぞ！",
      "poison": "どくタイプが あいてだ！",
      "ground": "じめんに たたきつけてやる！",
      "flying": "ひこうタイプと たたかえ！",
      "psychic": "エスパーパワーが こわいのか？",
      "bug": "いけ、むしタイプポケモン！",
      "rock": "ロックンロール！",
      "ghost": "ケケケケケッ！",
      "dragon": "ドラゴンタイプは つよいぞ！",
      "steel": "はがねのいしには かてないぞ！",
      "fairy": "かわいいポケモンを みてくれ！",
      "dark": "ひかりがあれば かげもある。"
    };
    const key = grunt.type.toLowerCase();
    return jaPhrases[key] || grunt.phraseEn;
  }
  return lang === 'cs' ? grunt.phraseCs : grunt.phraseEn;
};

export const RocketGuide: React.FC<RocketGuideProps> = ({ lang, initialRocketData, initialLeader, onOpenGuide }) => {
  const normalizedLeader = (initialLeader || '').toLowerCase();
  const initialMode: ModeType = normalizedLeader === 'grunts' ? 'grunts' : 'leaders';
  const initialSelectedLeaderName =
    normalizedLeader === 'cliff'
      ? 'Cliff'
      : normalizedLeader === 'sierra'
      ? 'Sierra'
      : normalizedLeader === 'arlo'
      ? 'Arlo'
      : 'Giovanni';

  const [mode, setMode] = useState<ModeType>(initialMode);
  const [selectedLeader, setSelectedLeader] = useState<string>(initialSelectedLeaderName);
  
  const [rocketData, setRocketData] = useState<{ giovanni: RocketMember; leaders: RocketMember[]; grunts: GruntData[] } | null>(
    initialRocketData && initialRocketData.giovanni ? initialRocketData : DEFAULT_ROCKET_DATA
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang] || translations.cs;

  const getShadowPokemonScore = (pokemonName: string): number => {
    const baseRating = getPokemonHubRating(pokemonName);
    const evoInfo = getEvolutionInfo(pokemonName);
    const rating = evoInfo ? evoInfo.rating : baseRating;
    
    switch (rating) {
      case 'S': return 5;
      case 'A+': return 4.5;
      case 'A': return 4;
      case 'B': return 3;
      case 'C': return 2;
      default: return 1;
    }
  };

  const topDrops = useMemo(() => {
    if (!rocketData || !rocketData.grunts) return [];
    
    const drops: {
      pokemon: string;
      score: number;
      rating: string;
      evoName?: string;
      gruntType: string;
      gruntPhraseCs: string;
      gruntPhraseEn: string;
    }[] = [];
    
    rocketData.grunts.forEach(grunt => {
      grunt.shadowPokemon.forEach(p => {
        const score = getShadowPokemonScore(p);
        const baseRating = getPokemonHubRating(p);
        const evoInfo = getEvolutionInfo(p);
        const rating = evoInfo ? evoInfo.rating : baseRating;
        
        drops.push({
          pokemon: p,
          score,
          rating: rating || 'C',
          evoName: evoInfo?.evolution,
          gruntType: grunt.type,
          gruntPhraseCs: grunt.phraseCs,
          gruntPhraseEn: grunt.phraseEn
        });
      });
    });
    
    drops.sort((a, b) => b.score - a.score);
    
    const uniqueDrops: typeof drops = [];
    const seenPokemon = new Set<string>();
    
    for (const drop of drops) {
      if (!seenPokemon.has(drop.pokemon.toLowerCase())) {
        seenPokemon.add(drop.pokemon.toLowerCase());
        uniqueDrops.push(drop);
        if (uniqueDrops.length === 5) break;
      }
    }
    
    return uniqueDrops;
  }, [rocketData]);

  useEffect(() => {
    const fetchRocket = async () => {
      setError(null);
      try {
        const response = await apiFetch('/api/rocket?nocache=true');
        if (!response.ok) throw new Error('Failed to fetch rocket lineups');
        const data = await response.json();
        if (data && data.giovanni) {
          setRocketData(data);
        }
      } catch (err) {
        console.debug('Could not load live rocket lineups from API, using default data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [lang]);

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{lang === 'cs' ? 'Načítání Team GO Rocket z serveru...' : 'Loading Team GO Rocket from server...'}</p>
      </div>
    );
  }

  if (error || !rocketData) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '40px', color: '#ff4d4d' }}>
        <p>{error || 'Failed to load data.'}</p>
      </div>
    );
  }

  const getMember = (name: string): RocketMember => {
    if (name === 'Giovanni') return rocketData.giovanni;
    return rocketData.leaders.find(l => l.name === name) || rocketData.giovanni;
  };

  const currentMember = getMember(selectedLeader);

  const filteredGrunts = rocketData ? rocketData.grunts : [];

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'Easy') return t.rocket_difficulty_easy;
    if (diff === 'Medium') return t.rocket_difficulty_medium;
    return t.rocket_difficulty_hard;
  };

  const renderLineupSlot = (pokemon: (string | LineupPokemon)[], slotLabel: string) => {
    const normalised: LineupPokemon[] = pokemon.map(p =>
      typeof p === 'string'
        ? { name: p, types: [], image: '' }
        : p
    );

    return (
      <div className="lineup-column">
        <span className="slot-title">{slotLabel}</span>
        <div className="slot-items">
          {normalised.map((p, i) => (
            <React.Fragment key={p.name + i}>
              {i > 0 && (
                <span className="slot-or-separator">{t.rocket_or}</span>
              )}
              <div className={`slot-item-card-v2 ${slotLabel === t.rocket_slot_3 ? 'boss' : ''}`}>
                <img
                  src={p.image ? resolveImage(p.image, 'rocket', p.name) : getPokemonIconUrl(p.name)}
                  alt={p.name}
                  className="slot-pokemon-img"
                  onError={(e) => {
                    handlePokemonImageError(e.target as HTMLImageElement, p.name);
                  }}
                />
                <div className="slot-pokemon-info">
                  <span className="slot-pokemon-name">{getPokemonName(p.name, lang)}</span>
                  {p.types && p.types.length > 0 && (
                    <div className="slot-type-badges">
                      {p.types.map(type => (
                        <TypeBadge key={type} typeStr={type} lang={lang} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const activeRewardName = currentMember.reward.name;
  const activeRewardRating = currentMember.reward.hubRating || getPokemonHubRating(activeRewardName);

  return (
    <div className="rocket-guide">
      {/* Unified Header Card */}
      <header className="rocket-header-card guides-header">
        <div className="guides-title-badge">
          <Zap size={16} />
          {lang === 'cs' ? 'Team GO Rocket Databáze' : lang === 'ja' ? 'GOロケット団 対策ガイド' : lang === 'ru' ? 'База данных Team GO Rocket' : 'Team GO Rocket Hub'}
        </div>
        <h1 className="tab-seo-title">{t.tabs_rocket}</h1>
        <p className="tab-seo-description">{(t as any).seo_rocket_desc}</p>

        {/* Mode Switcher */}
        <div className="mode-switcher">
          <Link 
            href={`/${lang}/rocket/giovanni`}
            className={`mode-btn ${mode === 'leaders' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setMode('leaders'); }}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            <Zap size={14} style={{ marginRight: '6px' }} /> {t.rocket_tab_leaders}
          </Link>
          <Link 
            href={`/${lang}/rocket/grunts`}
            className={`mode-btn ${mode === 'grunts' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setMode('grunts'); }}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
          >
            <Users size={14} style={{ marginRight: '6px' }} /> {t.rocket_tab_grunts}
          </Link>
        </div>
      </header>

      {mode === 'leaders' ? (
        <>
          {/* Selector Tabs */}
          <div className="rocket-tabs">
            <Link
               href={`/${lang}/rocket/giovanni`}
               className={`rocket-tab-btn giovanni-btn ${selectedLeader === 'Giovanni' ? 'active' : ''}`}
               onClick={(e) => { e.preventDefault(); setSelectedLeader('Giovanni'); }}
               style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
             >
                <span className="emoji" style={{ display: 'inline-flex' }}>{getLeaderIcon('Giovanni', 14)}</span> {getPokemonName('Giovanni', lang)}
              </Link>
            {rocketData.leaders.filter(leader => leader.name.toLowerCase() !== 'giovanni').map(leader => (
              <Link
                key={leader.name}
                href={`/${lang}/rocket/${leader.name.toLowerCase()}`}
                className={`rocket-tab-btn leader-btn ${selectedLeader === leader.name ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setSelectedLeader(leader.name); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                <span className="emoji" style={{ display: 'inline-flex' }}>{getLeaderIcon(leader.name, 14)}</span> {getPokemonName(leader.name, lang)}
              </Link>
            ))}
          </div>

          {/* Main Info */}
          <div className="rocket-content-card">
            <div className="rocket-header">
              <div className="rocket-title-group">
                <span className="rocket-badge">
                  {selectedLeader === 'Giovanni' ? t.rocket_boss_badge : t.rocket_leader_badge}
                </span>
                <h2>{getPokemonName(selectedLeader, lang)}</h2>
              </div>
               <div className="member-avatar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                 {getLeaderIcon(currentMember.name, 40)}
               </div>
            </div>

            {/* Reward Alert */}
            <div className="rocket-reward-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-purple"><Gift size={16} /></span>
                 {t.rocket_active_reward}
               </h3>
              <div className="reward-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  className="reward-image-wrapper" 
                  style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    width: '74px',
                    height: '74px',
                    flexShrink: 0
                  }}
                >
                  <ShadowIcon 
                    style={{ 
                      position: 'absolute', 
                      top: '-4px', 
                      right: '-4px', 
                      width: '18px', 
                      height: '18px', 
                      filter: 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.75))' 
                    }} 
                  />
                  <img 
                    src={getPokemonIconUrl(activeRewardName)} 
                    alt={activeRewardName}
                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                    onError={(e) => {
                      handlePokemonImageError(e.target as HTMLImageElement, activeRewardName);
                    }}
                  />
                </div>
                <div className="reward-info" style={{ flex: 1 }}>
                  <h4>{getPokemonName(activeRewardName, lang)}</h4>
                  <div className="rating-badges">
                    {activeRewardRating && (
                      <HubRatingBadge rating={activeRewardRating} lang={lang} />
                    )}
                     {currentMember.reward.worthGrinding && (
                       <span className="grind-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                         <Flame size={12} fill="currentColor" stroke="none" /> {t.rocket_doporuceno}
                       </span>
                     )}
                  </div>
                  <p className="reward-reason">{currentMember.reward.reason}</p>
                  {(() => {
                    const evoInfo = getEvolutionInfo(activeRewardName);
                    if (evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && activeRewardName.toLowerCase() !== evoInfo.evolution.toLowerCase()) {
                      return (
                        <div style={{
                          marginTop: '8px',
                          padding: '6px 10px',
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#34d399',
                          fontWeight: 550
                        }}>
                          <span style={{ display: 'inline-block' }}>🔥</span>
                           <span>
                             {lang === 'cs' 
                               ? `Evoluuje na špičkového Shadow ${getPokemonName(evoInfo.evolution, lang)} (${evoInfo.rating} Tier)`
                               : lang === 'ja'
                               ? `超強力なシャドウ${getPokemonName(evoInfo.evolution, lang)}（${evoInfo.rating}ランク）に進化します`
                               : `Evolves into top-tier Shadow ${getPokemonName(evoInfo.evolution, lang)} (${evoInfo.rating} Tier)`
                             }
                           </span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>

            {/* Lineup with Pokemon images and types */}
            <div className="rocket-lineup-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-red"><Swords size={16} /></span>
                 {t.rocket_lineup}
               </h3>
              <div className="lineup-grid">
                {renderLineupSlot(currentMember.lineup.slot1, t.rocket_slot_1)}
                {renderLineupSlot(currentMember.lineup.slot2, t.rocket_slot_2)}
                {renderLineupSlot(currentMember.lineup.slot3, t.rocket_slot_3)}
              </div>
            </div>

            {/* Overall Lineup Counters - Primal/Advanced/Budget */}
            <div className="rocket-counters-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-orange"><Shield size={16} /></span>
                 {t.rocket_counters}
               </h3>
              
              <div className="counters-levels-grid">
                {currentMember.counters.megaCounters && currentMember.counters.megaCounters.length > 0 && (
                  <div className="counter-level-col mega">
                    <span className="level-badge mega">{t.details_level_mega}</span>
                    <ul>
                      {currentMember.counters.megaCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                    </ul>
                  </div>
                )}
                {currentMember.counters.advancedCounters && currentMember.counters.advancedCounters.length > 0 && (
                  <div className="counter-level-col advanced">
                    <span className="level-badge advanced">{t.details_level_advanced}</span>
                    <ul>
                      {currentMember.counters.advancedCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                    </ul>
                  </div>
                )}
                {currentMember.counters.budgetCounters && currentMember.counters.budgetCounters.length > 0 && (
                  <div className="counter-level-col budget">
                    <span className="level-badge budget">{t.details_level_budget}</span>
                    <ul>
                      {currentMember.counters.budgetCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Grunts List Mode */
        <div className="grunts-container">
          {/* Focus Section (Top 5 Drops) */}
          {topDrops.length > 0 && (
            <div className="grunts-focus-section">
              <h3>
                <span className="duotone-icon duotone-yellow"><Trophy size={16} fill="currentColor" stroke="none" /></span>
                {lang === 'cs' ? 'Doporučené cíle (Top 5 Shadow Pokémonů)' : lang === 'ja' ? '注目すべきしたっぱ (トップ5ドロップ)' : 'Target Priority (Top 5 Shadow Drops)'}
              </h3>
              <p className="focus-description">
                {lang === 'cs' 
                  ? 'Tito shadow Pokémoni se nejvíce vyplatí farmit na základě síly jejich evolucí v PvE.' 
                  : lang === 'ja' 
                  ? 'PvEの強さと進化先に基づいて、最も捕まえる価値が高いシャドウポケモンです。' 
                  : 'These shadow Pokémon are the most rewarding to hunt based on their PvE evolution strength.'}
              </p>
              <div className="focus-grid">
                {topDrops.map((drop, idx) => (
                  <div key={idx} className="focus-card">
                    <div className="focus-card-rank">#{idx + 1}</div>
                    <div className="focus-card-pokemon">
                      <div className="focus-pokemon-img-wrapper">
                        <ShadowIcon style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', filter: 'none', color: '#c084fc' }} />
                        <img 
                          src={getPokemonIconUrl(drop.pokemon)} 
                          alt={drop.pokemon} 
                          className="focus-pokemon-img"
                          onError={(e) => {
                            handlePokemonImageError(e.target as HTMLImageElement, drop.pokemon);
                          }}
                        />
                      </div>
                      <div className="focus-pokemon-meta">
                        <span className="focus-pokemon-name">{getPokemonName(drop.pokemon, lang)}</span>
                        {drop.evoName && (
                          <span className="focus-pokemon-evo">
                            ➔ {lang === 'ja' ? 'シャドウ' : 'Shadow'} {getPokemonName(drop.evoName, lang)} ({drop.rating} Tier)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="focus-card-grunt">
                      <div className="focus-grunt-phrase">
                        "{lang === 'cs' ? drop.gruntPhraseCs : lang === 'ja' ? getGruntPhrase({ phraseCs: drop.gruntPhraseCs, phraseEn: drop.gruntPhraseEn, type: drop.gruntType } as any, 'ja') : drop.gruntPhraseEn}"
                      </div>
                      <div className="focus-grunt-type">
                        <TypeBadge typeStr={drop.gruntType} lang={lang} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grunts-list">
            {filteredGrunts.map((grunt, idx) => (
              <div key={idx} className="grunt-card">
                 <div className="grunt-card-header">
                   <div className="phrase-box">
                     <span className="grunt-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <MessageSquare size={12} style={{ color: '#a78bfa' }} /> {t.rocket_grunt_phrase}
                     </span>
                     <p className="grunt-phrase">"{getGruntPhrase(grunt, lang)}"</p>
                   </div>
                   <TypeBadge typeStr={grunt.type} lang={lang} />
                 </div>
                 
                 <div className="grunt-card-body">
                   <div className="grunt-info-row">
                     <span className="info-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <Zap size={12} style={{ color: '#fbbf24' }} /> {t.rocket_grunt_difficulty}
                     </span>
                     <span className={`difficulty-badge ${grunt.difficulty.toLowerCase()}`}>
                       {getDifficultyLabel(grunt.difficulty)}
                     </span>
                   </div>
 
                   <div className="grunt-info-row">
                     <span className="info-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <Gem size={12} style={{ color: '#60a5fa' }} /> {t.rocket_grunt_worth}
                     </span>
                     <span className={`worth-badge ${grunt.worthFighting ? 'yes' : 'no'}`}>
                       {grunt.worthFighting ? t.rocket_yes : t.rocket_no}
                     </span>
                   </div>
 
                   <div className="grunt-reward-row">
                     <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                       <Gift size={12} style={{ color: '#c084fc' }} /> {t.rocket_grunt_reward}
                     </strong>
                     <div className="shadow-pokemon-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {grunt.shadowPokemon.map(p => {
                          const pRating = getPokemonHubRating(p);
                          const evoInfo = getEvolutionInfo(p);
                          const isTopEvo = evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && p.toLowerCase() !== evoInfo.evolution.toLowerCase();
                          return (
                            <div 
                              key={p} 
                              className="shadow-pokemon-tag-v2" 
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                padding: '4px 8px', 
                                borderRadius: '8px', 
                                border: isTopEvo ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)', 
                                backgroundColor: isTopEvo ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <div style={{ position: 'relative', display: 'inline-flex' }}>
                                <ShadowIcon style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', filter: 'none', color: '#c084fc' }} />
                                 <img 
                                   src={getPokemonIconUrl(p)} 
                                   alt={p} 
                                   style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                   onError={(e) => {
                                     handlePokemonImageError(e.target as HTMLImageElement, p);
                                   }}
                                 />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{getPokemonName(p, lang)}</span>
                                {isTopEvo && (
                                  <span style={{ fontSize: '0.58rem', color: '#34d399', fontWeight: 600 }}>
                                    ➔ {lang === 'ja' ? 'シャドウ' : 'Shadow'} {getPokemonName(evoInfo.evolution, lang)}
                                  </span>
                                )}
                              </div>
                              {pRating && (
                                <HubRatingBadge rating={pRating} lang={lang} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                   </div>
 
                   <div className="grunt-counters-row">
                     <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                       <Shield size={12} style={{ color: '#fb923c' }} /> {t.rocket_grunt_counters}
                     </strong>
                     <ul className="rocket-counter-grid">
                       {grunt.counters.map(c => (
                         <CounterItem key={c} counterStr={c} />
                       ))}
                     </ul>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

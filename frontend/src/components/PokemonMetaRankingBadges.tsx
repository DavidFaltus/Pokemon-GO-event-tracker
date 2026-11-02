'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '../data/translations';
import metaIndexData from '../data/pokedexMetaIndex.json';
import { getTypeSvgUrl, TYPE_COLORS } from '../utils/typeBadgeHelper';
import { useTheme } from '../context/ThemeContext';
import './PokemonMetaRankingBadges.css';

export interface PokemonMetaLeagueRank {
  rank: number;
  score: number;
  moveset: string[];
  isShadow?: boolean;
}

export interface PokemonMetaPvE {
  overallRank: number;
  typeRank: {
    type: string;
    rank: number;
  };
  typeRanks?: Array<{
    type: string;
    rank: number;
    dps: number;
  }>;
  score?: number;
  dps: number;
  bestMoveset: {
    fast: string;
    charged: string;
  };
}

export interface PokemonMetaMaxBattle {
  isMax: boolean;
  isGigantamax?: boolean;
  attackerRank?: {
    type: string;
    rank: number;
    score: number;
    maxMove: string;
  };
  tankRank?: {
    rank: number;
    score: number;
    isHealer?: boolean;
  };
}

export interface PokemonMetaEntry {
  slug: string;
  dexId: number;
  pvp: {
    great?: PokemonMetaLeagueRank | null;
    ultra?: PokemonMetaLeagueRank | null;
    master?: PokemonMetaLeagueRank | null;
    little?: PokemonMetaLeagueRank | null;
  };
  pve?: PokemonMetaPvE | null;
  maxBattle?: PokemonMetaMaxBattle | null;
}

const META_INDEX = metaIndexData as Record<string, PokemonMetaEntry>;

interface BadgeItem {
  id: string;
  category: 'pvp' | 'pve' | 'max';
  label: string;
  rankNum: number;
  tooltip: string;
  colorClass: string;
  style?: React.CSSProperties;
  href: string;
  icon: React.ReactNode;
}

interface PokemonMetaRankingBadgesProps {
  slug: string;
  lang: Language;
  maxItems?: number;
  className?: string;
  meta?: PokemonMetaEntry;
  size?: 'sm' | 'md';
}

export const PokemonMetaRankingBadges: React.FC<PokemonMetaRankingBadgesProps> = ({
  slug,
  lang,
  maxItems = 8,
  className = '',
  meta: explicitMeta,
  size = 'sm'
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const entry = explicitMeta || META_INDEX[slug.toLowerCase().trim()];

  if (!entry) return null;

  const badges: BadgeItem[] = [];

  // 1. Great League (1500)
  if (entry.pvp?.great && (entry.pvp.great.rank <= 150 || entry.pvp.great.score >= 70)) {
    badges.push({
      id: 'gl',
      category: 'pvp',
      label: `GL #${entry.pvp.great.rank}`,
      rankNum: entry.pvp.great.rank,
      tooltip: `Great League: Rank #${entry.pvp.great.rank} (Score ${entry.pvp.great.score})`,
      colorClass: 'meta-badge-gl',
      href: `/${lang}/rankings/great-league`,
      icon: <img src="/icons/leagues/great.png" alt="GL" className="meta-badge-league-img" />
    });
  }

  // 2. Ultra League (2500)
  if (entry.pvp?.ultra && (entry.pvp.ultra.rank <= 150 || entry.pvp.ultra.score >= 70)) {
    badges.push({
      id: 'ul',
      category: 'pvp',
      label: `UL #${entry.pvp.ultra.rank}`,
      rankNum: entry.pvp.ultra.rank,
      tooltip: `Ultra League: Rank #${entry.pvp.ultra.rank} (Score ${entry.pvp.ultra.score})`,
      colorClass: 'meta-badge-ul',
      href: `/${lang}/rankings/ultra-league`,
      icon: <img src="/icons/leagues/ultra.png" alt="UL" className="meta-badge-league-img" />
    });
  }

  // 3. Master League (Open)
  if (entry.pvp?.master && (entry.pvp.master.rank <= 150 || entry.pvp.master.score >= 70)) {
    badges.push({
      id: 'ml',
      category: 'pvp',
      label: `ML #${entry.pvp.master.rank}`,
      rankNum: entry.pvp.master.rank,
      tooltip: `Master League: Rank #${entry.pvp.master.rank} (Score ${entry.pvp.master.score})`,
      colorClass: 'meta-badge-ml',
      href: `/${lang}/rankings/master-league`,
      icon: <img src="/icons/leagues/master.png" alt="ML" className="meta-badge-league-img" />
    });
  }

  // 4. Little Cup (500)
  if (entry.pvp?.little && (entry.pvp.little.rank <= 100 || entry.pvp.little.score >= 70)) {
    badges.push({
      id: 'lc',
      category: 'pvp',
      label: `LC #${entry.pvp.little.rank}`,
      rankNum: entry.pvp.little.rank,
      tooltip: `Little Cup: Rank #${entry.pvp.little.rank} (Score ${entry.pvp.little.score})`,
      colorClass: 'meta-badge-lc',
      href: `/${lang}/rankings/little-cup`,
      icon: <img src="/icons/leagues/little.png" alt="LC" className="meta-badge-league-img" />
    });
  }

  // 5. PvE Raid Attacker - ALL types the Pokemon is ranked in!
  if (entry.pve) {
    const list = (entry.pve.typeRanks && entry.pve.typeRanks.length > 0)
      ? entry.pve.typeRanks
      : entry.pve.typeRank ? [entry.pve.typeRank] : [];

    for (const tr of list) {
      if (tr.rank <= 50) {
        const typeStr = tr.type;
        const typeCfg = TYPE_COLORS[typeStr] || TYPE_COLORS.Normal;
        badges.push({
          id: `pve-${typeStr.toLowerCase()}`,
          category: 'pve',
          label: `#${tr.rank} ${typeStr}`,
          rankNum: tr.rank,
          tooltip: `PvE Raid Attacker: Rank #${tr.rank} (${typeStr})`,
          colorClass: `meta-badge-type type-${typeStr.toLowerCase()}`,
          style: {
            background: isLight ? typeCfg.bg : `linear-gradient(135deg, ${typeCfg.accent}33, ${typeCfg.accent}14)`,
            borderColor: typeCfg.border,
            color: isLight ? '#0f172a' : typeCfg.accent
          },
          href: `/${lang}/rankings/attackers-${typeStr.toLowerCase()}`,
          icon: (
            <img
              src={getTypeSvgUrl(typeStr.toLowerCase(), isLight)}
              alt={typeStr}
              className="meta-badge-type-img"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('duiker101')) {
                  target.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeStr.toLowerCase()}.svg`;
                }
              }}
            />
          )
        });
      }
    }
  }

  // 6. Max Battles (Attacker or Tank)
  if (entry.maxBattle) {
    if (entry.maxBattle.attackerRank && entry.maxBattle.attackerRank.rank <= 15) {
      badges.push({
        id: 'max-atk',
        category: 'max',
        label: `Max #${entry.maxBattle.attackerRank.rank} ${entry.maxBattle.attackerRank.type}`,
        rankNum: entry.maxBattle.attackerRank.rank,
        tooltip: `Max Attacker #${entry.maxBattle.attackerRank.rank} (${entry.maxBattle.attackerRank.type})`,
        colorClass: 'meta-badge-max-atk',
        href: `/${lang}/rankings/max-battles`,
        icon: <img src="/icons/leagues/max.png" alt="Max" className="meta-badge-league-img" />
      });
    }

    if (entry.maxBattle.tankRank && entry.maxBattle.tankRank.rank <= 15) {
      badges.push({
        id: 'max-tank',
        category: 'max',
        label: `Max Tank #${entry.maxBattle.tankRank.rank}`,
        rankNum: entry.maxBattle.tankRank.rank,
        tooltip: `Max Tank #${entry.maxBattle.tankRank.rank}${entry.maxBattle.tankRank.isHealer ? ' (Healer)' : ''}`,
        colorClass: 'meta-badge-max-tank',
        href: `/${lang}/rankings/max-battles`,
        icon: <img src="/icons/leagues/max.png" alt="Max" className="meta-badge-league-img" />
      });
    }
  }

  if (badges.length === 0) return null;

  // Sort: Top ranks first
  badges.sort((a, b) => a.rankNum - b.rankNum);

  const displayedBadges = badges.slice(0, maxItems);

  return (
    <div className={`pokemon-meta-badges-container ${size} ${className}`}>
      {displayedBadges.map((b) => (
        <span
          key={b.id}
          className={`meta-ranking-badge ${b.colorClass}`}
          style={b.style}
          title={b.tooltip}
          onClick={(e) => {
            e.stopPropagation();
            router.push(b.href);
          }}
        >
          <span className="meta-badge-icon">{b.icon}</span>
          <span className="meta-badge-text">{b.label}</span>
        </span>
      ))}
    </div>
  );
};

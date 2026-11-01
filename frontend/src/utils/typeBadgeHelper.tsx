import React from 'react';
import type { PokemonType } from '../data/pokedexCatalog';
import type { Language } from '../data/translations';

export const TYPE_COLORS: Record<string, { accent: string; bg: string; border: string }> = {
  Normal:   { accent: '#cbd5e1', bg: 'rgba(203, 213, 225, 0.16)', border: 'rgba(203, 213, 225, 0.35)' },
  Fire:     { accent: '#f87171', bg: 'rgba(248, 113, 113, 0.18)', border: 'rgba(248, 113, 113, 0.38)' },
  Water:    { accent: '#38bdf8', bg: 'rgba(56, 189, 248, 0.18)',  border: 'rgba(56, 189, 248, 0.38)' },
  Grass:    { accent: '#4ade80', bg: 'rgba(74, 222, 128, 0.18)',  border: 'rgba(74, 222, 128, 0.38)' },
  Electric: { accent: '#facc15', bg: 'rgba(250, 204, 21, 0.18)',  border: 'rgba(250, 204, 21, 0.38)' },
  Ice:      { accent: '#67e8f9', bg: 'rgba(103, 232, 249, 0.18)', border: 'rgba(103, 232, 249, 0.38)' },
  Fighting: { accent: '#fb7185', bg: 'rgba(251, 113, 133, 0.18)', border: 'rgba(251, 113, 133, 0.38)' },
  Poison:   { accent: '#c084fc', bg: 'rgba(192, 132, 252, 0.18)', border: 'rgba(192, 132, 252, 0.38)' },
  Ground:   { accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.18)',  border: 'rgba(251, 191, 36, 0.38)' },
  Flying:   { accent: '#a5b4fc', bg: 'rgba(165, 180, 252, 0.18)', border: 'rgba(165, 180, 252, 0.38)' },
  Psychic:  { accent: '#f472b6', bg: 'rgba(244, 114, 182, 0.18)', border: 'rgba(244, 114, 182, 0.38)' },
  Bug:      { accent: '#a3e635', bg: 'rgba(163, 230, 53, 0.18)',  border: 'rgba(163, 230, 53, 0.38)' },
  Rock:     { accent: '#d97706', bg: 'rgba(217, 119, 6, 0.18)',   border: 'rgba(217, 119, 6, 0.38)' },
  Ghost:    { accent: '#c084fc', bg: 'rgba(192, 132, 252, 0.18)', border: 'rgba(192, 132, 252, 0.38)' },
  Dragon:   { accent: '#818cf8', bg: 'rgba(129, 140, 248, 0.18)', border: 'rgba(129, 140, 248, 0.38)' },
  Dark:     { accent: '#94a3b8', bg: 'rgba(148, 163, 184, 0.18)', border: 'rgba(148, 163, 184, 0.38)' },
  Steel:    { accent: '#cbd5e1', bg: 'rgba(203, 213, 225, 0.18)', border: 'rgba(203, 213, 225, 0.38)' },
  Fairy:    { accent: '#f472b6', bg: 'rgba(244, 114, 182, 0.18)', border: 'rgba(244, 114, 182, 0.38)' }
};

export const TYPE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  Normal:   { cs: 'Normal', en: 'Normal', ja: 'ノーマル', ru: 'Обычный' },
  Fire:     { cs: 'Fire', en: 'Fire', ja: 'ほのお', ru: 'Огненный' },
  Water:    { cs: 'Water', en: 'Water', ja: 'みず', ru: 'Водный' },
  Grass:    { cs: 'Grass', en: 'Grass', ja: 'くさ', ru: 'Травяной' },
  Electric: { cs: 'Electric', en: 'Electric', ja: 'でんき', ru: 'Электрический' },
  Ice:      { cs: 'Ice', en: 'Ice', ja: 'こおり', ru: 'Ледяной' },
  Fighting: { cs: 'Fighting', en: 'Fighting', ja: 'かくとう', ru: 'Боевой' },
  Poison:   { cs: 'Poison', en: 'Poison', ja: 'どく', ru: 'Ядовитый' },
  Ground:   { cs: 'Ground', en: 'Ground', ja: 'じめん', ru: 'Земляной' },
  Flying:   { cs: 'Flying', en: 'Flying', ja: 'ひこう', ru: 'Летающий' },
  Psychic:  { cs: 'Psychic', en: 'Psychic', ja: 'エスパー', ru: 'Психический' },
  Bug:      { cs: 'Bug', en: 'Bug', ja: 'むし', ru: 'Насекомый' },
  Rock:     { cs: 'Rock', en: 'Rock', ja: 'いわ', ru: 'Каменный' },
  Ghost:    { cs: 'Ghost', en: 'Ghost', ja: 'ゴースト', ru: 'Призрачный' },
  Dragon:   { cs: 'Dragon', en: 'Dragon', ja: 'ドラゴン', ru: 'Драконий' },
  Dark:     { cs: 'Dark', en: 'Dark', ja: 'あく', ru: 'Тёмный' },
  Steel:    { cs: 'Steel', en: 'Steel', ja: 'はがね', ru: 'Стальной' },
  Fairy:    { cs: 'Fairy', en: 'Fairy', ja: 'フェアリー', ru: 'Волшебный' }
};

export function getTypeSvgUrl(type: string): string {
  const clean = type.toLowerCase().trim();
  return `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${clean}.svg`;
}

export function getTypeStyle(type: string): React.CSSProperties {
  const norm = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  const cfg = TYPE_COLORS[norm] || TYPE_COLORS.Normal;
  return {
    backgroundColor: cfg.bg,
    borderColor: cfg.border,
    color: '#ffffff'
  };
}

interface UnifiedTypeBadgeProps {
  type: string;
  lang?: Language;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  active?: boolean;
  onClick?: () => void;
  className?: string;
  showIcon?: boolean;
}

export const UnifiedTypeBadge: React.FC<UnifiedTypeBadgeProps> = ({
  type,
  lang = 'en',
  size = 'sm',
  active = false,
  onClick,
  className = '',
  showIcon = true
}) => {
  const norm = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  const cfg = TYPE_COLORS[norm] || TYPE_COLORS.Normal;
  const typeClass = norm.toLowerCase();
  const label = TYPE_TRANSLATIONS[norm]?.[lang] || norm;

  const fontSizes = {
    xs: '0.68rem',
    sm: '0.74rem',
    md: '0.82rem',
    lg: '0.88rem'
  };

  const iconSizes = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17
  };

  const paddings = {
    xs: '2px 6px',
    sm: '3px 8px',
    md: '6px 12px',
    lg: '8px 14px'
  };

  return (
    <span
      onClick={onClick}
      className={`unified-type-badge type-${typeClass} ${active ? 'active' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'xs' ? '3px' : '5px',
        fontSize: fontSizes[size],
        fontWeight: 750,
        padding: paddings[size],
        borderRadius: '8px',
        backgroundColor: active ? cfg.accent : cfg.bg,
        border: `1px solid ${active ? cfg.accent : cfg.border}`,
        color: '#ffffff',
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
        transition: 'all 0.2s ease',
        boxShadow: active ? `0 0 12px ${cfg.border}` : 'none'
      }}
    >
      {showIcon && (
        <img
          src={getTypeSvgUrl(typeClass)}
          alt={norm}
          style={{
            width: iconSizes[size],
            height: iconSizes[size],
            objectFit: 'contain',
            verticalAlign: 'middle',
            filter: 'none'
          }}
          onError={(e) => {
            // Hide icon if fails to load
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
      )}
      <span>{label}</span>
    </span>
  );
};

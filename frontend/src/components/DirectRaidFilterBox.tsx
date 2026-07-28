import React, { useState } from 'react';
import { Copy, Check, Zap, Sliders } from 'lucide-react';
import { getTopCountersFilterString } from '../utils/pokemonCountersHelper';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import type { Language } from '../data/translations';
import './DirectRaidFilterBox.css';

interface DirectRaidFilterBoxProps {
  bossName: string;
  lang: Language;
  onOpenFilterGenerator?: (bossName?: string) => void;
  compact?: boolean;
}

export const DirectRaidFilterBox: React.FC<DirectRaidFilterBoxProps> = ({
  bossName,
  lang,
  onOpenFilterGenerator,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);
  const filterString = getTopCountersFilterString(bossName);

  if (!filterString) return null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(filterString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const titleText = lang === 'cs' 
    ? 'Filter doporučených Raid counterů' 
    : 'Recommended Raid Counters Filter';

  return (
    <div className={`direct-raid-filter-container ${compact ? 'compact' : ''}`}>
      <div className="direct-raid-filter-header">
        <div className="direct-raid-filter-title">
          <img
            src={getPokemonIconUrl(bossName)}
            alt={bossName}
            className="direct-boss-icon"
            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName)}
          />
          <Zap size={14} className="title-zap-icon" />
          <span>{titleText} ({getPokemonName(bossName, lang)})</span>
        </div>
        <div className="direct-raid-filter-actions">
          <button 
            type="button" 
            className={`direct-copy-btn ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
            title={lang === 'cs' ? 'Zkopírovat filtr do schránky' : 'Copy filter to clipboard'}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
          </button>
          {onOpenFilterGenerator && (
            <button
              type="button"
              className="direct-customize-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenFilterGenerator(bossName);
              }}
              title={lang === 'cs' ? 'Upravit v generátoru filtrů' : 'Customize in Filter Generator'}
            >
              <Sliders size={13} />
            </button>
          )}
        </div>
      </div>
      <div className="direct-filter-code-box" onClick={handleCopy}>
        <code>{filterString}</code>
      </div>
    </div>
  );
};

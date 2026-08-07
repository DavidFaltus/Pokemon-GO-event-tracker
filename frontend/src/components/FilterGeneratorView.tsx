import React, { useState, useEffect, useMemo } from 'react';
import './FilterGeneratorView.css';
import type { Language } from '../data/translations';
import type { EventData } from './EventCard';
import { getTopCountersByName, getCounterTypesForName } from '../utils/pokemonCountersHelper';
import { handlePokemonImageError, getPokemonIconUrl } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { pokemonRankings } from '../data/pokemonRankings';
import { getRecommendedMegaForEvents } from '../utils/megaFilterHelper';
import { Copy, Check, Search, Filter, Zap, Sparkles, Dna } from 'lucide-react';

interface FilterGeneratorViewProps {
  lang: Language;
  events?: EventData[];
  initialRaidBoss?: string;
}

export const FilterGeneratorView: React.FC<FilterGeneratorViewProps> = ({
  lang,
  events = [],
  initialRaidBoss = 'Palkia'
}) => {
  const [selectedBoss, setSelectedBoss] = useState<string>(initialRaidBoss);
  const [copiedRaid, setCopiedRaid] = useState<boolean>(false);
  const [copiedMega, setCopiedMega] = useState<boolean>(false);

  useEffect(() => {
    if (initialRaidBoss) {
      setSelectedBoss(initialRaidBoss);
    }
  }, [initialRaidBoss]);

  // Recommended Mega Evolution based on active events
  const recommendedMega = useMemo(() => {
    return getRecommendedMegaForEvents(events);
  }, [events]);

  // Dynamically extract ALL current & upcoming raid bosses from events list + popular legendaries
  const allRaidBosses = useMemo(() => {
    const set = new Set<string>();
    
    // Extract bosses from events (Raid Hours, Rotations, Spotlight, etc.)
    if (events && events.length > 0) {
      events.forEach(e => {
        const bosses = e.extraData?.raidbattles?.bosses;
        if (Array.isArray(bosses)) {
          bosses.forEach(b => {
            if (b.name) set.add(b.name.replace(/shadow|mega|primal/gi, '').trim());
          });
        }
        if (e.eventType === 'raid-hour' || e.eventType === 'raid-battles') {
          const clean = e.name.replace(/raid\s*(hour|battles|rotation|day)/gi, '').trim();
          if (clean && clean.length > 2) set.add(clean);
        }
      });
    }

    // Default popular legendaries and meta raid bosses
    const defaultPopular = [
      'Palkia', 'Dialga', 'Rayquaza', 'Salamence', 'Mewtwo', 'Giratina', 'Kyogre', 'Groudon',
      'Lucario', 'Tyranitar', 'Garchomp', 'Reshiram', 'Zekrom', 'Heatran', 'Darkrai',
      'Charizard', 'Baxcalibur', 'Kyurem', 'Dragonite', 'Metagross', 'Gardevoir'
    ];
    
    defaultPopular.forEach(b => set.add(b));
    if (initialRaidBoss) set.add(initialRaidBoss.replace(/shadow|mega|primal/gi, '').trim());

    return Array.from(set).filter(Boolean);
  }, [events, initialRaidBoss]);

  // Autocomplete suggestions for typed query matching 360+ species
  const autocompleteSuggestions = useMemo(() => {
    if (!selectedBoss || selectedBoss.trim().length < 2) return [];
    const q = selectedBoss.toLowerCase().trim();
    
    const allKnownNames = new Set<string>();
    pokemonRankings.forEach(p => allKnownNames.add(p.name.replace(/shadow|mega|primal/gi, '').trim()));
    allRaidBosses.forEach(b => allKnownNames.add(b));

    return Array.from(allKnownNames)
      .filter(name => name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [selectedBoss, allRaidBosses]);

  const topCounters = useMemo(() => {
    return getTopCountersByName(selectedBoss, 20);
  }, [selectedBoss]);

  const counterTypes = useMemo(() => {
    return getCounterTypesForName(selectedBoss);
  }, [selectedBoss]);

  const searchFilterString = useMemo(() => {
    if (topCounters.length === 0) return '';
    const uniqueIds = Array.from(new Set(topCounters.map(c => c.pokedexId)));
    const parts: string[] = ['3*,4*'];

    if (counterTypes.length > 0) {
      const moveTypesStr = counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
      parts.push(moveTypesStr);
    }

    parts.push(uniqueIds.join(','));
    return parts.join('&');
  }, [topCounters, counterTypes]);

  const handleCopyRaid = () => {
    if (!searchFilterString) return;
    navigator.clipboard.writeText(searchFilterString);
    setCopiedRaid(true);
    setTimeout(() => setCopiedRaid(false), 2500);
  };

  const handleCopyMega = () => {
    if (!recommendedMega.filterString) return;
    navigator.clipboard.writeText(recommendedMega.filterString);
    setCopiedMega(true);
    setTimeout(() => setCopiedMega(false), 2500);
  };

  const getText = (key: string) => {
    switch (key) {
      case 'title':
        if (lang === 'ja') return 'ポケモンGO 検索フィルタージェネレーター';
        if (lang === 'ru') return 'Генератор поискового фильтра для Pokémon GO';
        if (lang === 'en') return 'Pokémon GO Search Filter Generator';
        return 'Generátor vyhledávacího filtru do Pokémon GO';
      case 'desc':
        if (lang === 'ja') return 'ポケモンGOのボックス用検索文字列を自動生成します。対策ポケモンやメガシンカのフィルターを1タップでコピー！';
        if (lang === 'ru') return 'Генерирует поисковые фильтры для Pokémon GO. Быстро копируйте фильтры контр-покемонов и Мега-эволюций!';
        if (lang === 'en') return 'Generates exact search strings for Pokémon GO storage. Copy raid counters and Mega evolution filters with one tap!';
        return 'Vygeneruje přesný vyhledávací řetězec útoků, typů a Mega evolucí pro Pokémon GO inventář. Kopírujte filtry counterů i Mega evolucí jedním klepnutím!';
      case 'select_prompt':
        if (lang === 'ja') return 'レイドボスを選択または入力:';
        if (lang === 'ru') return 'Выберите или введите рейд-босса:';
        if (lang === 'en') return 'Select or type any Raid Boss:';
        return 'Vyberte nebo zadejte Raid Bosse:';
      case 'placeholder':
        if (lang === 'ja') return 'ポケモン名を入力（例: レックウザ, ギラティナ）...';
        if (lang === 'ru') return 'Введите имя босса (напр. Райкваза, Гиратина)...';
        if (lang === 'en') return 'Type boss name (e.g. Rayquaza, Giratina)...';
        return 'Napište jméno bosse (např. Rayquaza, Giratina)...';
      case 'suggestions':
        if (lang === 'ja') return '候補:';
        if (lang === 'ru') return 'Подсказки:';
        if (lang === 'en') return 'Suggestions:';
        return 'Našeptávač:';
      case 'bosses_header':
        if (lang === 'ja') return '近日のイベントレイドボス＆人気ポケモン:';
        if (lang === 'ru') return 'Рейд-боссы в предстоящих событиях:';
        if (lang === 'en') return 'Raid bosses in upcoming events & popular:';
        return 'Raid bossové v nadcházejících událostech & populární:';
      case 'filter_output':
        if (lang === 'ja') return 'レイド対策検索フィルター';
        if (lang === 'ru') return 'Фильтр контр-покемонов';
        if (lang === 'en') return 'Raid Counter Filter';
        return 'Vyhledávací filtr Raid Counterů';
      case 'mega_title':
        if (lang === 'ja') return '🧬 イベント向けおすすめメガシンカ (アメボーナス)';
        if (lang === 'ru') return '🧬 Рекомендуемая Мега-эволюция (бонус конфет)';
        if (lang === 'en') return '🧬 Recommended Mega Evolution (Candy Bonus)';
        return '🧬 Doporučená Mega Evoluce (Bonus Candy & XL)';
      case 'copy':
        if (lang === 'ja') return 'コピー';
        if (lang === 'ru') return 'Копировать';
        if (lang === 'en') return 'Copy';
        return 'Kopírovat';
      case 'copied':
        if (lang === 'ja') return 'コピー完了！';
        if (lang === 'ru') return 'Скопировано!';
        if (lang === 'en') return 'Copied!';
        return 'Zkopírováno!';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content filter-generator-view">
      <div className="filter-generator-header">
        <h1 className="tab-seo-title">
          <Filter size={24} style={{ color: 'var(--accent-purple, #a855f7)', verticalAlign: 'middle', marginRight: '8px' }} />
          {getText('title')}
        </h1>
        <p className="tab-seo-description">{getText('desc')}</p>
      </div>

      {/* Raid Counter Filter Generator Card */}
      <div className="filter-generator-card">
        <div className="filter-group-header">
          <Search size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{getText('select_prompt')}</span>
        </div>
        
        <div className="filter-search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="filter-search-input"
            value={selectedBoss}
            onChange={e => setSelectedBoss(e.target.value)}
            placeholder={getText('placeholder')}
          />
        </div>

        {autocompleteSuggestions.length > 0 && selectedBoss.trim().length >= 2 && (
          <div className="filter-autocomplete-bar">
            <span className="autocomplete-label">{getText('suggestions')}</span>
            <div className="autocomplete-chips">
              {autocompleteSuggestions.map(name => (
                <button
                  key={name}
                  type="button"
                  className="autocomplete-chip-btn"
                  onClick={() => setSelectedBoss(name)}
                >
                  <img
                    src={getPokemonIconUrl(name)}
                    alt={name}
                    className="chip-pokemon-sprite"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                  />
                  <span>{getPokemonName(name, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="filter-boss-section-header">
          <Sparkles size={14} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{getText('bosses_header')}</span>
        </div>
        
        <div className="filter-boss-chips-container">
          {allRaidBosses.map(boss => (
            <button
              key={boss}
              type="button"
              className={`filter-boss-chip-btn ${selectedBoss.toLowerCase() === boss.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedBoss(boss)}
            >
              <img
                src={getPokemonIconUrl(boss)}
                alt={boss}
                className="chip-pokemon-sprite"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss)}
              />
              <span>{getPokemonName(boss, lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-output-card">
        <div className="filter-output-header">
          <div className="filter-output-title-wrapper">
            {selectedBoss && selectedBoss.trim() ? (
              <img
                src={getPokemonIconUrl(selectedBoss)}
                alt={selectedBoss}
                className="header-pokemon-avatar"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, selectedBoss)}
              />
            ) : (
              <Zap size={18} style={{ color: 'var(--accent-purple, #a855f7)', filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.5))' }} />
            )}
            <span className="filter-output-title">
              {getText('filter_output')}
              {selectedBoss && selectedBoss.trim() ? ` (${getPokemonName(selectedBoss.trim(), lang)})` : ''}
            </span>
          </div>
          <button
            type="button"
            className={`filter-copy-action-btn ${copiedRaid ? 'copied' : ''}`}
            onClick={handleCopyRaid}
          >
            {copiedRaid ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedRaid ? getText('copied') : getText('copy')}</span>
          </button>
        </div>
        <div className="filter-code-display-box" onClick={handleCopyRaid}>
          <code>{searchFilterString}</code>
        </div>
      </div>

      {/* Recommended Mega Evolution Card */}
      <div className="filter-mega-card">
        <div className="filter-mega-header">
          <div className="filter-mega-title-group">
            <Dna size={20} className="mega-icon-glow" />
            <span className="filter-mega-title">{getText('mega_title')}</span>
          </div>
          <button
            type="button"
            className={`filter-copy-action-btn ${copiedMega ? 'copied' : ''}`}
            onClick={handleCopyMega}
          >
            {copiedMega ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedMega ? getText('copied') : getText('copy')}</span>
          </button>
        </div>

        <p className="filter-mega-reason">
          {lang === 'cs' ? recommendedMega.reasonCs : recommendedMega.reasonEn}
        </p>

        <div className="filter-mega-chips">
          {recommendedMega.megas.map(megaName => (
            <div key={megaName} className="filter-mega-chip">
              <img
                src={getPokemonIconUrl(megaName)}
                alt={megaName}
                className="chip-pokemon-sprite"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, megaName)}
              />
              <span>{getPokemonName(megaName, lang)}</span>
            </div>
          ))}
        </div>

        <div className="filter-code-display-box" onClick={handleCopyMega}>
          <code>{recommendedMega.filterString}</code>
        </div>
      </div>

    </div>
  );
};


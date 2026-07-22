import React, { useState, useMemo } from 'react';
import './PogoFilterGeneratorModal.css';
import { Language, translations } from '../data/translations';
import { pokemonRankings, PokemonRankData } from '../data/pokemonRankings';
import { getTopCountersByName, getCounterTypesForName } from '../utils/pokemonCountersHelper';
import { Copy, Check, Filter, Zap, Sparkles, Shield, Flame, X, Search, Award } from 'lucide-react';
import { EventData } from './EventCard';

interface PogoFilterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  events?: EventData[];
  initialRaidBoss?: string;
}

interface MegaInfo {
  name: string;
  pokedexId: number;
  types: string[];
}

const MEGA_POKEMON_LIST: MegaInfo[] = [
  { name: 'Mega Venusaur', pokedexId: 3, types: ['Grass', 'Poison'] },
  { name: 'Mega Charizard X', pokedexId: 6, types: ['Fire', 'Dragon'] },
  { name: 'Mega Charizard Y', pokedexId: 6, types: ['Fire', 'Flying'] },
  { name: 'Mega Blastoise', pokedexId: 9, types: ['Water'] },
  { name: 'Mega Beedrill', pokedexId: 15, types: ['Bug', 'Poison'] },
  { name: 'Mega Pidgeot', pokedexId: 18, types: ['Normal', 'Flying'] },
  { name: 'Mega Alakazam', pokedexId: 65, types: ['Psychic'] },
  { name: 'Mega Slowbro', pokedexId: 80, types: ['Water', 'Psychic'] },
  { name: 'Mega Gengar', pokedexId: 94, types: ['Ghost', 'Poison'] },
  { name: 'Mega Kangaskhan', pokedexId: 115, types: ['Normal'] },
  { name: 'Mega Pinsir', pokedexId: 127, types: ['Bug', 'Flying'] },
  { name: 'Mega Gyarados', pokedexId: 130, types: ['Water', 'Dark'] },
  { name: 'Mega Aerodactyl', pokedexId: 142, types: ['Rock', 'Flying'] },
  { name: 'Mega Mewtwo X', pokedexId: 150, types: ['Psychic', 'Fighting'] },
  { name: 'Mega Mewtwo Y', pokedexId: 150, types: ['Psychic'] },
  { name: 'Mega Ampharos', pokedexId: 181, types: ['Electric', 'Dragon'] },
  { name: 'Mega Steelix', pokedexId: 208, types: ['Steel', 'Ground'] },
  { name: 'Mega Scizor', pokedexId: 212, types: ['Bug', 'Steel'] },
  { name: 'Mega Heracross', pokedexId: 214, types: ['Bug', 'Fighting'] },
  { name: 'Mega Houndoom', pokedexId: 229, types: ['Dark', 'Fire'] },
  { name: 'Mega Tyranitar', pokedexId: 248, types: ['Rock', 'Dark'] },
  { name: 'Mega Sceptile', pokedexId: 254, types: ['Grass', 'Dragon'] },
  { name: 'Mega Blaziken', pokedexId: 257, types: ['Fire', 'Fighting'] },
  { name: 'Mega Swampert', pokedexId: 260, types: ['Water', 'Ground'] },
  { name: 'Mega Gardevoir', pokedexId: 282, types: ['Psychic', 'Fairy'] },
  { name: 'Mega Sableye', pokedexId: 302, types: ['Dark', 'Ghost'] },
  { name: 'Mega Mawile', pokedexId: 303, types: ['Steel', 'Fairy'] },
  { name: 'Mega Aggron', pokedexId: 306, types: ['Steel'] },
  { name: 'Mega Medicham', pokedexId: 308, types: ['Fighting', 'Psychic'] },
  { name: 'Mega Manectric', pokedexId: 310, types: ['Electric'] },
  { name: 'Mega Sharpedo', pokedexId: 319, types: ['Water', 'Dark'] },
  { name: 'Mega Camerupt', pokedexId: 323, types: ['Fire', 'Ground'] },
  { name: 'Mega Altaria', pokedexId: 334, types: ['Dragon', 'Fairy'] },
  { name: 'Mega Banette', pokedexId: 354, types: ['Ghost'] },
  { name: 'Mega Absol', pokedexId: 359, types: ['Dark'] },
  { name: 'Mega Glalie', pokedexId: 362, types: ['Ice'] },
  { name: 'Mega Salamence', pokedexId: 373, types: ['Dragon', 'Flying'] },
  { name: 'Mega Metagross', pokedexId: 376, types: ['Steel', 'Psychic'] },
  { name: 'Mega Latias', pokedexId: 380, types: ['Dragon', 'Psychic'] },
  { name: 'Mega Latios', pokedexId: 381, types: ['Dragon', 'Psychic'] },
  { name: 'Primal Kyogre', pokedexId: 382, types: ['Water'] },
  { name: 'Primal Groudon', pokedexId: 383, types: ['Ground', 'Fire'] },
  { name: 'Mega Rayquaza', pokedexId: 384, types: ['Dragon', 'Flying'] },
  { name: 'Mega Lopunny', pokedexId: 428, types: ['Normal', 'Fighting'] },
  { name: 'Mega Garchomp', pokedexId: 445, types: ['Dragon', 'Ground'] },
  { name: 'Mega Lucario', pokedexId: 448, types: ['Fighting', 'Steel'] },
  { name: 'Mega Abomasnow', pokedexId: 460, types: ['Grass', 'Ice'] },
  { name: 'Mega Gallade', pokedexId: 475, types: ['Psychic', 'Fighting'] },
  { name: 'Mega Audino', pokedexId: 531, types: ['Normal', 'Fairy'] },
  { name: 'Mega Diancie', pokedexId: 719, types: ['Rock', 'Fairy'] }
];

export const PogoFilterGeneratorModal: React.FC<PogoFilterGeneratorModalProps> = ({
  isOpen,
  onClose,
  lang,
  events = [],
  initialRaidBoss = 'Palkia'
}) => {
  const [activeTab, setActiveTab] = useState<'counters' | 'eventMega'>('counters');
  const [selectedBoss, setSelectedBoss] = useState<string>(initialRaidBoss);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Search filter options
  const [includeShadow, setIncludeShadow] = useState(true);
  const [includeMega, setIncludeMega] = useState(true);
  const [minIVStar, setMinIVStar] = useState(true); // 3*,4*

  // Popular Raid Bosses list
  const popularBosses = [
    'Palkia', 'Dialga', 'Rayquaza', 'Mewtwo', 'Giratina', 'Kyogre', 'Groudon',
    'Lucario', 'Tyranitar', 'Garchomp', 'Reshiram', 'Zekrom', 'Heatran', 'Darkrai'
  ];

  // ─── RAID COUNTERS FILTER LOGIC ──────────────────────────────────────────
  const topCounters = useMemo(() => {
    return getTopCountersByName(selectedBoss, 12);
  }, [selectedBoss]);

  const counterTypes = useMemo(() => {
    return getCounterTypesForName(selectedBoss);
  }, [selectedBoss]);

  // Generate Pokemon GO Pokedex ID search string (e.g. "483,484,384,644,150,257")
  const idSearchString = useMemo(() => {
    if (topCounters.length === 0) return '';
    const uniqueIds = Array.from(new Set(topCounters.map(c => c.pokedexId)));
    return uniqueIds.join(',');
  }, [topCounters]);

  // Generate full combined search string
  const fullSearchString = useMemo(() => {
    if (!idSearchString) return '';
    const parts: string[] = [];
    if (minIVStar) parts.push('3*,4*');
    
    let prefix = '';
    if (includeMega && includeShadow) prefix = 'mega,shadow&';
    else if (includeMega) prefix = 'mega&';
    else if (includeShadow) prefix = 'shadow&';

    return `${parts.length ? parts.join('&') + '&' : ''}${prefix}${idSearchString}`;
  }, [idSearchString, includeMega, includeShadow, minIVStar]);

  // Move types string (@dragon,@ice)
  const moveTypesString = useMemo(() => {
    if (counterTypes.length === 0) return '';
    return counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
  }, [counterTypes]);

  // ─── ACTIVE EVENT MEGA EVOLUTION LOGIC ─────────────────────────────────
  const activeEventsList = useMemo(() => {
    const now = new Date();
    return events.filter(e => new Date(e.start) <= now && new Date(e.end) >= now);
  }, [events]);

  const [selectedEventId, setSelectedEventId] = useState<string>(activeEventsList[0]?.eventID || '');

  const selectedEvent = useMemo(() => {
    return events.find(e => e.eventID === selectedEventId) || activeEventsList[0] || events[0];
  }, [events, selectedEventId, activeEventsList]);

  // Extract boosted types from active event name/description
  const eventBoostedTypes = useMemo(() => {
    if (!selectedEvent) return ['Dragon', 'Steel'];
    const eventNameStr = typeof selectedEvent.name === 'object' ? JSON.stringify(selectedEvent.name) : selectedEvent.name;
    const text = `${eventNameStr} ${selectedEvent.heading || ''} ${selectedEvent.eventType}`.toLowerCase();
    const allTypes = [
      'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting',
      'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
      'Dragon', 'Dark', 'Steel', 'Fairy'
    ];

    const detected = allTypes.filter(t => text.includes(t.toLowerCase()));
    return detected.length > 0 ? detected : ['Dragon', 'Steel'];
  }, [selectedEvent]);

  // Recommend Megas matching event boosted types
  const recommendedMegas = useMemo(() => {
    return MEGA_POKEMON_LIST.map(mega => {
      const matchCount = mega.types.filter(t => 
        eventBoostedTypes.some(ebt => ebt.toLowerCase() === t.toLowerCase())
      ).length;
      return { ...mega, matchCount };
    })
    .filter(m => m.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
  }, [eventBoostedTypes]);

  // Mega search string generator for POGO app
  const megaSearchString = useMemo(() => {
    if (recommendedMegas.length === 0) return 'mega,primal';
    const uniqueIds = Array.from(new Set(recommendedMegas.map(m => m.pokedexId)));
    return `mega,primal&${uniqueIds.join(',')}`;
  }, [recommendedMegas]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="pogo-filter-modal-overlay" onClick={onClose}>
      <div className="pogo-filter-modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="pogo-filter-modal-header">
          <div className="pogo-filter-modal-title">
            <Zap className="pogo-title-icon" size={24} />
            <div>
              <h3>{lang === 'cs' ? 'Generátor filtrů do Pokémon GO' : 'Pokémon GO Filter Generator'}</h3>
              <p>{lang === 'cs' ? 'Zkopírujte vygenerovaný filtr a vložte do vyhledávání v Pokémon GO' : 'Copy generated filter and paste into Pokémon GO search'}</p>
            </div>
          </div>
          <button className="pogo-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="pogo-filter-tabs">
          <button
            className={`pogo-filter-tab-btn ${activeTab === 'counters' ? 'active' : ''}`}
            onClick={() => setActiveTab('counters')}
          >
            <Shield size={16} />
            {lang === 'cs' ? 'Raidové Countery' : 'Raid Counters'}
          </button>
          <button
            className={`pogo-filter-tab-btn ${activeTab === 'eventMega' ? 'active' : ''}`}
            onClick={() => setActiveTab('eventMega')}
          >
            <Sparkles size={16} />
            {lang === 'cs' ? 'Mega pro Aktivní Event' : 'Mega for Active Event'}
          </button>
        </div>

        {/* Tab 1: Raid Counters String Generator */}
        {activeTab === 'counters' && (
          <div className="pogo-filter-tab-content">
            <div className="pogo-boss-select-group">
              <label><Search size={14} /> {lang === 'cs' ? 'Vyberte Raid Bossa:' : 'Select Raid Boss:'}</label>
              <div className="pogo-boss-chips">
                {popularBosses.map(boss => (
                  <button
                    key={boss}
                    className={`pogo-boss-chip ${selectedBoss.toLowerCase() === boss.toLowerCase() ? 'selected' : ''}`}
                    onClick={() => setSelectedBoss(boss)}
                  >
                    {boss}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Counters Preview */}
            <div className="pogo-counters-preview">
              <span className="pogo-preview-label">
                {lang === 'cs' ? `Top countery pro ${selectedBoss}:` : `Top counters for ${selectedBoss}:`}
              </span>
              <div className="pogo-counters-badges">
                {topCounters.slice(0, 6).map((c, i) => (
                  <span key={i} className="pogo-counter-mini-badge">
                    {c.isShadow && '🔮 '}{c.isMega && '🌀 '}{c.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Filter Options */}
            <div className="pogo-filter-options-grid">
              <label className="pogo-checkbox-label">
                <input
                  type="checkbox"
                  checked={minIVStar}
                  onChange={e => setMinIVStar(e.target.checked)}
                />
                <span>{lang === 'cs' ? 'Pouze dobré hodnocení (3*,4*)' : 'High IV only (3*,4*)'}</span>
              </label>
              <label className="pogo-checkbox-label">
                <input
                  type="checkbox"
                  checked={includeShadow}
                  onChange={e => setIncludeShadow(e.target.checked)}
                />
                <span>{lang === 'cs' ? 'Zahrnout Shadow (shadow&)' : 'Include Shadow (shadow&)'}</span>
              </label>
              <label className="pogo-checkbox-label">
                <input
                  type="checkbox"
                  checked={includeMega}
                  onChange={e => setIncludeMega(e.target.checked)}
                />
                <span>{lang === 'cs' ? 'Zahrnout Mega (mega&)' : 'Include Mega (mega&)'}</span>
              </label>
            </div>

            {/* Primary Output Box: Pokedex ID Search String */}
            <div className="pogo-string-output-card primary">
              <div className="pogo-output-header">
                <span className="pogo-output-title">
                  <Award size={16} />
                  {lang === 'cs' ? 'Hlavní Vyhledávací Filtr (Pokedex ID):' : 'Main Search Filter (Pokedex ID):'}
                </span>
                <span className="pogo-output-badge">{lang === 'cs' ? 'Doporučeno' : 'Recommended'}</span>
              </div>
              <div className="pogo-code-box">
                <code>{fullSearchString || '384,483,644,150'}</code>
                <button
                  className={`pogo-copy-btn ${copiedType === 'full' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(fullSearchString, 'full')}
                >
                  {copiedType === 'full' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedType === 'full' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}
                </button>
              </div>
            </div>

            {/* Secondary Output Box: Move Types String */}
            <div className="pogo-string-output-card">
              <div className="pogo-output-header">
                <span className="pogo-output-title">
                  <Filter size={14} />
                  {lang === 'cs' ? 'Filtr podle typů útoků:' : 'Move Types Filter:'}
                </span>
              </div>
              <div className="pogo-code-box">
                <code>{moveTypesString || '@dragon,@ice'}</code>
                <button
                  className={`pogo-copy-btn ${copiedType === 'moves' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(moveTypesString, 'moves')}
                >
                  {copiedType === 'moves' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedType === 'moves' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Active Event Mega Evolution Recommender */}
        {activeTab === 'eventMega' && (
          <div className="pogo-filter-tab-content">
            {events.length > 0 && (
              <div className="pogo-event-select-group">
                <label>{lang === 'cs' ? 'Vyberte událost:' : 'Select Event:'}</label>
                <select
                  value={selectedEventId}
                  onChange={e => setSelectedEventId(e.target.value)}
                  className="pogo-event-select"
                >
                  {events.map(ev => {
                    const displayName = typeof ev.name === 'object' && ev.name !== null
                      ? (lang === 'cs' ? (ev.name as any).cs : (ev.name as any).en)
                      : String(ev.name || '');
                    return (
                      <option key={ev.eventID} value={ev.eventID}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="pogo-boosted-types-bar">
              <span>{lang === 'cs' ? 'Zjištěné typy v eventu:' : 'Event Boosted Types:'}</span>
              <div className="pogo-type-chips">
                {eventBoostedTypes.map(t => (
                  <span key={t} className={`pogo-type-chip type-${t.toLowerCase()}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Megas List */}
            <div className="pogo-recommended-megas-section">
              <h4>{lang === 'cs' ? 'Doporučené Mega Evoluce pro maximální bonusem Sladkostí (+Candy & XL):' : 'Recommended Mega Evolutions for Maximum Bonus Candy & XL:'}</h4>
              <div className="pogo-megas-grid">
                {recommendedMegas.slice(0, 8).map(m => (
                  <div key={m.name} className="pogo-mega-card">
                    <div className="pogo-mega-card-header">
                      <span className="pogo-mega-icon">🌀</span>
                      <span className="pogo-mega-name">{m.name}</span>
                    </div>
                    <div className="pogo-mega-types">
                      {m.types.map(t => (
                        <span key={t} className={`pogo-mini-type type-${t.toLowerCase()}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy Mega Search Filter Box */}
            <div className="pogo-string-output-card primary">
              <div className="pogo-output-header">
                <span className="pogo-output-title">
                  <Sparkles size={16} />
                  {lang === 'cs' ? 'Filtr pro hledání Mega Pokémonů v Pokémon GO:' : 'Pokémon GO Mega Search Filter:'}
                </span>
              </div>
              <div className="pogo-code-box">
                <code>{megaSearchString}</code>
                <button
                  className={`pogo-copy-btn ${copiedType === 'mega' ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(megaSearchString, 'mega')}
                >
                  {copiedType === 'mega' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedType === 'mega' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './AdminPanelView.css';
import type { Language } from '../data/translations';
import { API_BASE_URL, apiFetch } from '../config';
import {
  ArrowLeft, Lock, Plus, Trash2, Save, AlertTriangle, CheckCircle,
  EyeOff, Search, Edit, Database, Upload, RefreshCw, Server,
  Image, PackageOpen, ChevronDown, ChevronUp, X, FileJson, Zap,
  Star, Egg, Swords, Gift, Download, FileText, Sparkles, ExternalLink,
  Share2, Send, Copy, Check, Filter, Calendar, RotateCcw
} from 'lucide-react';
import { EventCard } from './EventCard';
import type { EventData } from './EventCard';
import { MonthSummaryInfographic } from './MonthSummaryInfographic';
import { SpotlightInfographic } from './SpotlightInfographic';
import { CommunityDayInfographic } from './CommunityDayInfographic';
import { RaidInfographic } from './RaidInfographic';
import { RocketInfographic } from './RocketInfographic';
import { MaxInfographic } from './MaxInfographic';
import { EventInfographic } from './EventInfographic';
import { getPokemonIconUrl, resolveImage, setPokemonIconOverrides } from '../utils/imageResolver';

interface AdminPanelViewProps {
  lang: Language;
  onBack: () => void;
}

export const formatLocalizedString = (val: any, targetLang: Language = 'cs'): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    if (val[targetLang]) return String(val[targetLang]);
    if (val.cs) return String(val.cs);
    if (val.en) return String(val.en);
    return JSON.stringify(val);
  }
  return String(val);
};

interface CustomEventOverride {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  officialLink?: string;
  secondaryLink?: string;
  image: string;
  icon?: string;
  start: string;
  end: string;
  extraData?: any;
  isDeleted?: boolean;
  isCustom?: boolean;
}

// ---- Structured Extra Data ----
interface PokemonEntry {
  name: string;
  isShinyAvailable?: boolean;
  canBeShiny?: boolean;
  image?: string;
}
interface EggGroup {
  distance: string;
  contents: PokemonEntry[];
}
interface RaidBoss {
  name: string;
  canBeShiny?: boolean;
  image?: string;
}

const POPULAR_POKEMON_SUGGESTIONS = [
  'Pikachu', 'Necrozma', 'Zekrom', 'Frigibax', 'Charizard',
  'Lucario', 'Gengar', 'Rayquaza', 'Mewtwo', 'Groudon',
  'Beldum', 'Bagon', 'Larvitar', 'Jangmo-o', 'Ditto'
];

// ---- Inline Pokemon Icon Picker ----
const PokemonIconPicker: React.FC<{
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  onEditIcon?: (name: string) => void;
}> = ({ value, onChange, placeholder = 'Pokémon name...', onEditIcon }) => {
  const [showChips, setShowChips] = useState(false);
  const iconUrl = value.trim() ? getPokemonIconUrl(value.trim()) : null;

  return (
    <div className="poke-icon-picker-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
      <div className="poke-icon-picker" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {iconUrl && (
          <img
            src={iconUrl}
            alt={value}
            className="poke-picker-preview"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowChips(true)}
          placeholder={placeholder}
          className="poke-picker-input"
          style={{ flex: 1 }}
        />
        {value.trim() && onEditIcon && (
          <button
            type="button"
            onClick={() => onEditIcon(value)}
            style={{
              padding: '4px 8px',
              fontSize: '0.72rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap'
            }}
            title="Změnit ikonu/sprite tohoto Pokémona"
          >
            <Sparkles size={12} /> Změnit ikonu
          </button>
        )}
      </div>
      {showChips && (
        <div className="poke-chip-suggestions" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
          {POPULAR_POKEMON_SUGGESTIONS.slice(0, 7).map(name => (
            <button
              key={name}
              type="button"
              onClick={() => { onChange(name); setShowChips(false); }}
              style={{
                fontSize: '0.68rem',
                padding: '2px 6px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Structured Section Editor ----
const StructuredEditor: React.FC<{
  data: any;
  onChange: (data: any) => void;
  lang: Language;
  onEditIcon?: (name: string) => void;
}> = ({ data, onChange, lang, onEditIcon }) => {
  const safe = data || {};

  // Bonuses
  const bonuses: string[] = safe.bonuses || [];
  const setBonuses = (b: string[]) => onChange({ ...safe, bonuses: b });

  // Spawns
  const spawns: PokemonEntry[] = safe.spawns || [];
  const setSpawns = (s: PokemonEntry[]) => onChange({ ...safe, spawns: s });

  // Helper to extract raid bosses list from any format
  const getRawRaidBosses = (dataObj: any): RaidBoss[] => {
    if (!dataObj) return [];
    let list: any[] = [];
    if (Array.isArray(dataObj.raidbattles?.bosses)) {
      list = dataObj.raidbattles.bosses;
    } else if (Array.isArray(dataObj.raids)) {
      list = dataObj.raids;
    } else if (Array.isArray(dataObj.raidBosses)) {
      list = dataObj.raidBosses;
    } else if (Array.isArray(dataObj.bosses)) {
      list = dataObj.bosses;
    } else if (dataObj.raidbattles?.tiers && typeof dataObj.raidbattles.tiers === 'object') {
      Object.values(dataObj.raidbattles.tiers).forEach((tb: any) => {
        if (Array.isArray(tb)) list.push(...tb);
      });
    }

    const normalized: RaidBoss[] = [];
    list.forEach((item: any) => {
      if (typeof item === 'string') {
        if (item.includes(',')) {
          item.split(',').forEach(subName => {
            const trimmed = subName.trim();
            if (trimmed) normalized.push({ name: trimmed, canBeShiny: false });
          });
        } else {
          const trimmed = item.trim();
          if (trimmed) normalized.push({ name: trimmed, canBeShiny: false });
        }
      } else if (item && typeof item === 'object') {
        const nameVal = typeof item.name === 'object' ? (item.name.en || item.name.cs || '') : (item.name || '');
        if (typeof nameVal === 'string' && nameVal.includes(',') && !item.isSingle) {
          nameVal.split(',').forEach((subName: string) => {
            const trimmed = subName.trim();
            if (trimmed) normalized.push({ ...item, name: trimmed, canBeShiny: item.canBeShiny ?? false });
          });
        } else {
          normalized.push({ ...item, name: nameVal, canBeShiny: item.canBeShiny ?? false });
        }
      }
    });
    return normalized;
  };

  // Raids
  const raidBosses: RaidBoss[] = getRawRaidBosses(safe);
  const setRaidBosses = (r: RaidBoss[]) => onChange({
    ...safe,
    raidbattles: { ...(safe.raidbattles || {}), bosses: r },
    raids: r,
    bosses: r
  });

  // Eggs
  const eggGroups: EggGroup[] = safe.eggs || [];
  const setEggGroups = (e: EggGroup[]) => onChange({ ...safe, eggs: e });

  // Featured Pokémon
  const featured: PokemonEntry[] = safe.featured || [];
  const setFeatured = (f: PokemonEntry[]) => onChange({ ...safe, featured: f });

  return (
    <div className="structured-editor">
      {/* BONUSES */}
      <div className="se-section">
        <div className="se-section-header">
          <Gift size={14} />
          <span>{lang === 'cs' ? 'Bonusy' : 'Bonuses'}</span>
          <button
            type="button"
            className="se-add-btn"
            onClick={() => setBonuses([...bonuses, ''])}
          >
            <Plus size={12} /> {lang === 'cs' ? 'Přidat' : 'Add'}
          </button>
        </div>
        <div className="se-items-list">
          {bonuses.map((b, i) => (
            <div key={i} className="se-text-row">
              <input
                type="text"
                value={formatLocalizedString(b, lang)}
                onChange={(e) => {
                  const nb = [...bonuses];
                  nb[i] = e.target.value;
                  setBonuses(nb);
                }}
                placeholder={lang === 'cs' ? 'Popis bonusu...' : 'Bonus description...'}
                className="se-text-input"
              />
              <button type="button" className="se-remove-btn" onClick={() => setBonuses(bonuses.filter((_, j) => j !== i))}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WILD SPAWNS */}
      <div className="se-section">
        <div className="se-section-header">
          <Star size={14} />
          <span>{lang === 'cs' ? 'Divoké spawny' : 'Wild Spawns'}</span>
          <button type="button" className="se-add-btn" onClick={() => setSpawns([...spawns, { name: '', isShinyAvailable: false }])}>
            <Plus size={12} /> {lang === 'cs' ? 'Přidat' : 'Add'}
          </button>
        </div>
        <div className="se-items-list">
          {spawns.map((s, i) => (
            <div key={i} className="se-pokemon-row">
              <PokemonIconPicker
                value={formatLocalizedString(s.name, 'en')}
                onChange={(name) => { const ns = [...spawns]; ns[i] = { ...ns[i], name }; setSpawns(ns); }}
                onEditIcon={onEditIcon}
              />
              <label className="se-shiny-checkbox">
                <input
                  type="checkbox"
                  checked={s.isShinyAvailable || false}
                  onChange={(e) => { const ns = [...spawns]; ns[i] = { ...ns[i], isShinyAvailable: e.target.checked }; setSpawns(ns); }}
                />
                ✨ Shiny
              </label>
              <button type="button" className="se-remove-btn" onClick={() => setSpawns(spawns.filter((_, j) => j !== i))}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED POKEMON */}
      <div className="se-section">
        <div className="se-section-header">
          <Zap size={14} />
          <span>{lang === 'cs' ? 'Hlavní Pokémoni' : 'Featured Pokémon'}</span>
          <button type="button" className="se-add-btn" onClick={() => setFeatured([...featured, { name: '', isShinyAvailable: false }])}>
            <Plus size={12} /> {lang === 'cs' ? 'Přidat' : 'Add'}
          </button>
        </div>
        <div className="se-items-list">
          {featured.map((f, i) => (
            <div key={i} className="se-pokemon-row">
              <PokemonIconPicker
                value={formatLocalizedString(f.name, 'en')}
                onChange={(name) => { const nf = [...featured]; nf[i] = { ...nf[i], name }; setFeatured(nf); }}
                onEditIcon={onEditIcon}
              />
              <label className="se-shiny-checkbox">
                <input
                  type="checkbox"
                  checked={f.isShinyAvailable || false}
                  onChange={(e) => { const nf = [...featured]; nf[i] = { ...nf[i], isShinyAvailable: e.target.checked }; setFeatured(nf); }}
                />
                ✨ Shiny
              </label>
              <button type="button" className="se-remove-btn" onClick={() => setFeatured(featured.filter((_, j) => j !== i))}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RAID BOSSES */}
      <div className="se-section">
        <div className="se-section-header">
          <Swords size={14} />
          <span>{lang === 'cs' ? 'Raid bossové' : 'Raid Bosses'}</span>
          <button type="button" className="se-add-btn" onClick={() => setRaidBosses([...raidBosses, { name: '', canBeShiny: false }])}>
            <Plus size={12} /> {lang === 'cs' ? 'Přidat' : 'Add'}
          </button>
        </div>
        <div className="se-items-list">
          {raidBosses.map((r, i) => (
            <div key={i} className="se-pokemon-row">
              <PokemonIconPicker
                value={formatLocalizedString(r.name, 'en')}
                onChange={(name) => { const nr = [...raidBosses]; nr[i] = { ...nr[i], name }; setRaidBosses(nr); }}
                onEditIcon={onEditIcon}
              />
              <label className="se-shiny-checkbox">
                <input
                  type="checkbox"
                  checked={r.canBeShiny || false}
                  onChange={(e) => { const nr = [...raidBosses]; nr[i] = { ...nr[i], canBeShiny: e.target.checked }; setRaidBosses(nr); }}
                />
                ✨ Shiny
              </label>
              <button type="button" className="se-remove-btn" onClick={() => setRaidBosses(raidBosses.filter((_, j) => j !== i))}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EGGS */}
      <div className="se-section">
        <div className="se-section-header">
          <Egg size={14} />
          <span>{lang === 'cs' ? 'Vejce' : 'Eggs'}</span>
          <button type="button" className="se-add-btn" onClick={() => setEggGroups([...eggGroups, { distance: '2 km', contents: [] }])}>
            <Plus size={12} /> {lang === 'cs' ? 'Přidat skupinu' : 'Add Group'}
          </button>
        </div>
        <div className="se-items-list">
          {eggGroups.map((g, gi) => (
            <div key={gi} className="se-egg-group">
              <div className="se-egg-group-header">
                <input
                  type="text"
                  value={g.distance}
                  onChange={(e) => {
                    const ng = [...eggGroups];
                    ng[gi] = { ...ng[gi], distance: e.target.value };
                    setEggGroups(ng);
                  }}
                  placeholder="2 km"
                  className="se-egg-distance-input"
                />
                <button type="button" className="se-add-btn-sm" onClick={() => {
                  const ng = [...eggGroups];
                  ng[gi] = { ...ng[gi], contents: [...ng[gi].contents, { name: '', isShinyAvailable: false }] };
                  setEggGroups(ng);
                }}>
                  <Plus size={11} />
                </button>
                <button type="button" className="se-remove-btn" onClick={() => setEggGroups(eggGroups.filter((_, j) => j !== gi))}>
                  <X size={12} />
                </button>
              </div>
              {g.contents.map((c, ci) => (
                <div key={ci} className="se-pokemon-row se-egg-content-row">
                  <PokemonIconPicker
                    value={c.name}
                    onChange={(name) => {
                      const ng = [...eggGroups];
                      const nc = [...ng[gi].contents];
                      nc[ci] = { ...nc[ci], name };
                      ng[gi] = { ...ng[gi], contents: nc };
                      setEggGroups(ng);
                    }}
                  />
                  <label className="se-shiny-checkbox">
                    <input
                      type="checkbox"
                      checked={c.isShinyAvailable || false}
                      onChange={(e) => {
                        const ng = [...eggGroups];
                        const nc = [...ng[gi].contents];
                        nc[ci] = { ...nc[ci], isShinyAvailable: e.target.checked };
                        ng[gi] = { ...ng[gi], contents: nc };
                        setEggGroups(ng);
                      }}
                    />
                    ✨ Shiny
                  </label>
                  <button type="button" className="se-remove-btn" onClick={() => {
                    const ng = [...eggGroups];
                    ng[gi] = { ...ng[gi], contents: ng[gi].contents.filter((_, j) => j !== ci) };
                    setEggGroups(ng);
                  }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PRESET_BACKGROUNDS = [
  { label: '⚡ Raid Hour', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop' },
  { label: '🚀 GO Rocket', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop' },
  { label: '🎈 Community Day', url: 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=600&auto=format&fit=crop' },
  { label: '💡 Spotlight Hour', url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop' },
  { label: '✨ Mega / Primal', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
  { label: '⚔️ Max Battle', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop' },
];

const MONTH_OPTIONS_CS = [
  { value: '0', label: 'Leden' },
  { value: '1', label: 'Únor' },
  { value: '2', label: 'Březen' },
  { value: '3', label: 'Duben' },
  { value: '4', label: 'Květen' },
  { value: '5', label: 'Červen' },
  { value: '6', label: 'Červenec' },
  { value: '7', label: 'Srpen' },
  { value: '8', label: 'Září' },
  { value: '9', label: 'Říjen' },
  { value: '10', label: 'Listopad' },
  { value: '11', label: 'Prosinec' }
];

const MONTH_OPTIONS_EN = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' }
];

const generateSocialCaption = (event: EventData, lang: Language): string => {
  const nameStr = formatLocalizedString(event.name, lang);
  const typeStr = event.eventType || 'Event';
  const startStr = new Date(event.start).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const endStr = new Date(event.end).toLocaleString(lang === 'cs' ? 'cs-CZ' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const cleanType = typeStr.replace(/[^a-zA-Z0-9]/g, '');
  const cleanName = nameStr.replace(/[^a-zA-Z0-9]/g, '');

  if (lang === 'cs') {
    return `🎉 Událost: ${nameStr} v Pokémon GO! 📱\n\n📅 Trvání: ${startStr} – ${endStr}\n⚡ Typ události: ${typeStr}\n\n✨ Sleduj podrobného průvodce, bossy v raidech, bonusy a nejlepší counters přímo v naší aplikaci!\n👉 https://pogoevents.app\n\n#PokemonGO #PogoEvents #Pokemon #GottaCatchEmAll #${cleanType} #${cleanName} #PokemonGOCzech #PogoCS`;
  }

  return `🎉 Event: ${nameStr} in Pokémon GO! 📱\n\n📅 Date: ${startStr} – ${endStr}\n⚡ Category: ${typeStr}\n\n✨ Check full event guide, raid bosses, counters, and bonuses in our app!\n👉 https://pogoevents.app\n\n#PokemonGO #PogoEvents #Pokemon #GottaCatchEmAll #${cleanType} #${cleanName}`;
};

// ============================================================
// Main AdminPanelView component
// ============================================================

type AdminTab = 'events' | 'raids' | 'social' | 'icons' | 'scraper' | 'import' | 'cache';

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ lang, onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [adminTab, setAdminTab] = useState<AdminTab>('events');
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  // Raid management state
  const [liveRaidBosses, setLiveRaidBosses] = useState<any[]>([]);
  const [raidOverrides, setRaidOverrides] = useState<any[]>([]);
  const [raidsLoading, setRaidsLoading] = useState<boolean>(false);
  const [raidsRefreshing, setRaidsRefreshing] = useState<boolean>(false);
  const [raidMsg, setRaidMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Add Custom Raid modal state
  const [showRaidModal, setShowRaidModal] = useState<boolean>(false);
  const [raidFormName, setRaidFormName] = useState<string>('');
  const [raidFormTier, setRaidFormTier] = useState<string>('5');
  const [raidFormCanBeShiny, setRaidFormCanBeShiny] = useState<boolean>(true);
  const [raidFormCpRange, setRaidFormCpRange] = useState<string>('');
  const [raidFormBoostedCpRange, setRaidFormBoostedCpRange] = useState<string>('');
  const [raidFormWeather, setRaidFormWeather] = useState<string>('');
  const [raidFormTypes, setRaidFormTypes] = useState<string>('');
  const [raidFormPlayers, setRaidFormPlayers] = useState<string>('');

  // Social Media tab state
  const [socialSubTab, setSocialSubTab] = useState<'single' | 'summary'>('single');
  const [socialSelectedEventId, setSocialSelectedEventId] = useState<string>('');
  const [socialSearchQuery, setSocialSearchQuery] = useState<string>('');
  const [socialFilterMonth, setSocialFilterMonth] = useState<string>('all');
  const [socialFilterYear, setSocialFilterYear] = useState<string>('all');
  const [socialFilterType, setSocialFilterType] = useState<string>('all');
  const [socialFilterStatus, setSocialFilterStatus] = useState<'all' | 'upcoming' | 'active' | 'past'>('all');
  const [socialWebhookUrl, setSocialWebhookUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pogo_admin_social_webhook_url') || '';
    }
    return '';
  });
  const [socialCopied, setSocialCopied] = useState<boolean>(false);
  const [socialSending, setSocialSending] = useState<boolean>(false);
  const [socialSendStatus, setSocialSendStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [generatedSocialCaption, setGeneratedSocialCaption] = useState<string>('');

  // Pokemon Icons tab state
  const pokemonIconFileInputRef = useRef<HTMLInputElement | null>(null);
  const [iconOverrides, setIconOverrides] = useState<Record<string, string>>({});
  const [iconSearchQuery, setIconSearchQuery] = useState<string>('');
  const [editingPokemonName, setEditingPokemonName] = useState<string>('');
  const [editingPokemonUrl, setEditingPokemonUrl] = useState<string>('');
  const [iconsLoading, setIconsLoading] = useState<boolean>(false);
  const [iconsSaving, setIconsSaving] = useState<boolean>(false);
  const [iconsMsg, setIconsMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Events state
  const [scrapedEvents, setScrapedEvents] = useState<EventData[]>([]);
  const [customOverrides, setCustomOverrides] = useState<CustomEventOverride[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CustomEventOverride | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listFilter, setListFilter] = useState<'all' | 'custom' | 'hidden'>('all');

  // Event Icon state
  const eventIconFileInputRef = useRef<HTMLInputElement | null>(null);
  const [formIconUrl, setFormIconUrl] = useState<string>('');

  // Edit mode: 'visual' or 'json'
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual');
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

  // Form fields
  const [formEventID, setFormEventID] = useState<string>('');
  const [formName, setFormName] = useState<string>('');
  const [formEventType, setFormEventType] = useState<string>('other');
  const [formHeading, setFormHeading] = useState<string>('');
  const [formLink, setFormLink] = useState<string>('');
  const [formOfficialLink, setFormOfficialLink] = useState<string>('');
  const [formSecondaryLink, setFormSecondaryLink] = useState<string>('');
  const [formScrapedText, setFormScrapedText] = useState<string>('');
  const [showRawTextEditor, setShowRawTextEditor] = useState<boolean>(false);
  const [formImage, setFormImage] = useState<string>('');
  const [formStart, setFormStart] = useState<string>('');
  const [formEnd, setFormEnd] = useState<string>('');
  const [formIsDeleted, setFormIsDeleted] = useState<boolean>(false);
  const [formExtraData, setFormExtraData] = useState<any>({});
  const [formExtraDataJson, setFormExtraDataJson] = useState<string>('{}');

  // Scraper state
  const [scraperStatus, setScraperStatus] = useState<any>(null);
  const [scraperRunning, setScraperRunning] = useState(false);

  // Cache stats state
  const [cacheStats, setCacheStats] = useState<any>(null);

  // Import state
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importDragOver, setImportDragOver] = useState(false);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [importResult, setImportResult] = useState<any>(null);
  const [importLoading, setImportLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Rescrape state
  const [rescrapeUrl, setRescrapeUrl] = useState<string>('');
  const [rescrapeLoading, setRescrapeLoading] = useState(false);
  const [rescrapeMsg, setRescrapeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('pogo_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchAdminData(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('pogo_admin_token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        fetchAdminData(data.token);
      } else {
        setError(lang === 'cs' ? 'Nesprávné heslo' : 'Incorrect password');
      }
    } catch (err) {
      setError(lang === 'cs' ? 'Chyba připojení k serveru' : 'Failed to connect to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pogo_admin_token');
    setToken('');
    setIsLoggedIn(false);
    setSelectedEvent(null);
  };

  const fetchAdminData = async (authToken: string) => {
    try {
      const resPublic = await apiFetch('/api/events');
      if (resPublic.ok) {
        const eventsData = await resPublic.json();
        setScrapedEvents(eventsData);
      }

      const resAdmin = await apiFetch('/api/admin/events', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (resAdmin.ok) {
        const overrides = await resAdmin.json();
        setCustomOverrides(overrides);
      } else if (resAdmin.status === 401 || resAdmin.status === 403) {
        localStorage.removeItem('pogo_admin_token');
        setToken('');
        setIsLoggedIn(false);
      }
    } catch {
      /* silent fallback when offline/backend restarting */
    }
  };

  const fetchScraperStatus = useCallback(async () => {
    try {
      const res = await apiFetch('/api/scraper/status');
      if (res.ok) setScraperStatus(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchCacheStats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch('/api/admin/cache-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setCacheStats(await res.json());
    } catch { /* silent */ }
  }, [token]);

  const fetchIconOverrides = useCallback(async () => {
    setIconsLoading(true);
    try {
      const res = await apiFetch('/api/pokemon-icons');
      if (res.ok) {
        const data = await res.json();
        if (data && data.overrides) {
          setIconOverrides(data.overrides);
          setPokemonIconOverrides(data.overrides);
        }
      }
    } catch {
      /* silent fallback when offline/dev server starting */
    } finally {
      setIconsLoading(false);
    }
  }, []);

  const fetchRaidData = useCallback(async () => {
    setRaidsLoading(true);
    try {
      const res = await apiFetch('/api/admin/raids', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLiveRaidBosses(data.live || []);
        setRaidOverrides(data.overrides || []);
      }
    } catch (err: any) {
      setRaidMsg({ type: 'error', text: err.message });
    } finally {
      setRaidsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchScraperStatus();
      fetchCacheStats();
      fetchIconOverrides();
      fetchRaidData();
    }
  }, [isLoggedIn, fetchScraperStatus, fetchCacheStats, fetchIconOverrides, fetchRaidData]);

  useEffect(() => {
    if (adminTab === 'scraper' && isLoggedIn) fetchScraperStatus();
    if (adminTab === 'cache' && isLoggedIn) fetchCacheStats();
    if (adminTab === 'icons' && isLoggedIn) fetchIconOverrides();
    if (adminTab === 'raids' && isLoggedIn) fetchRaidData();
  }, [adminTab, isLoggedIn, fetchScraperStatus, fetchCacheStats, fetchIconOverrides, fetchRaidData]);

  const handleRefreshRaids = async () => {
    setRaidsRefreshing(true);
    setRaidMsg(null);
    try {
      const res = await apiFetch('/api/admin/raids/refresh', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLiveRaidBosses(data.live || []);
        setRaidMsg({ type: 'success', text: lang === 'cs' ? 'Raid bossové byli úspěšně aktualizováni!' : 'Raid bosses successfully refreshed!' });
      } else {
        setRaidMsg({ type: 'error', text: data.error || 'Failed to refresh raids' });
      }
    } catch (err: any) {
      setRaidMsg({ type: 'error', text: err.message });
    } finally {
      setRaidsRefreshing(false);
    }
  };

  const handleToggleHideRaid = async (boss: any, isCurrentlyDeleted: boolean) => {
    setRaidMsg(null);
    try {
      const res = await apiFetch('/api/admin/raids/override', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: boss.name,
          tier: boss.tier,
          image: boss.image,
          canBeShiny: boss.canBeShiny,
          cpRange: boss.cpRange,
          boostedCpRange: boss.boostedCpRange,
          weatherBoosts: boss.weatherBoosts,
          types: boss.types,
          isDeleted: !isCurrentlyDeleted,
          isCustom: false
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLiveRaidBosses(data.live || []);
        setRaidOverrides(data.overrides || []);
        setRaidMsg({
          type: 'success',
          text: !isCurrentlyDeleted
            ? (lang === 'cs' ? `Boss "${boss.name}" byl skryt.` : `Boss "${boss.name}" hidden.`)
            : (lang === 'cs' ? `Boss "${boss.name}" byl opět zobrazen.` : `Boss "${boss.name}" restored.`)
        });
      } else {
        setRaidMsg({ type: 'error', text: data.error || 'Operation failed' });
      }
    } catch (err: any) {
      setRaidMsg({ type: 'error', text: err.message });
    }
  };

  const handleDeleteRaidOverride = async (name: string, tier: string) => {
    setRaidMsg(null);
    try {
      const res = await apiFetch(`/api/admin/raids/override/${encodeURIComponent(name)}/${encodeURIComponent(tier)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLiveRaidBosses(data.live || []);
        setRaidOverrides(data.overrides || []);
        setRaidMsg({ type: 'success', text: lang === 'cs' ? 'Override byl odstraněn.' : 'Override removed.' });
      }
    } catch (err: any) {
      setRaidMsg({ type: 'error', text: err.message });
    }
  };

  const handleSaveCustomRaid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!raidFormName.trim()) return;

    setRaidMsg(null);
    try {
      const weatherArray = raidFormWeather.split(',').map(s => s.trim()).filter(Boolean);
      const typesArray = raidFormTypes.split(',').map(s => s.trim()).filter(Boolean);

      const res = await apiFetch('/api/admin/raids/override', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: raidFormName.trim(),
          tier: raidFormTier,
          canBeShiny: raidFormCanBeShiny,
          cpRange: raidFormCpRange.trim() || undefined,
          boostedCpRange: raidFormBoostedCpRange.trim() || undefined,
          weatherBoosts: weatherArray.length > 0 ? weatherArray : undefined,
          types: typesArray.length > 0 ? typesArray : undefined,
          playersRecommended: raidFormPlayers.trim() || undefined,
          isDeleted: false,
          isCustom: true
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLiveRaidBosses(data.live || []);
        setRaidOverrides(data.overrides || []);
        setShowRaidModal(false);
        setRaidFormName('');
        setRaidFormCpRange('');
        setRaidFormBoostedCpRange('');
        setRaidFormWeather('');
        setRaidFormTypes('');
        setRaidFormPlayers('');
        setRaidMsg({ type: 'success', text: lang === 'cs' ? `Raid boss "${raidFormName}" byl přidán!` : `Raid boss "${raidFormName}" added!` });
      } else {
        setRaidMsg({ type: 'error', text: data.error || 'Failed to save custom raid boss' });
      }
    } catch (err: any) {
      setRaidMsg({ type: 'error', text: err.message });
    }
  };

  const handleSaveIconOverrides = async (updatedMap?: Record<string, string>) => {
    const mapToSave = updatedMap || iconOverrides;
    setIconsSaving(true);
    setIconsMsg(null);
    try {
      const res = await apiFetch('/api/admin/pokemon-icons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ overrides: mapToSave })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIconOverrides(mapToSave);
        setPokemonIconOverrides(mapToSave);
        setIconsMsg({
          type: 'success',
          text: lang === 'cs' ? '✅ Změny ikon Pokémonů byly úspěšně uloženy!' : '✅ Pokémon icon changes saved successfully!'
        });
      } else {
        setIconsMsg({
          type: 'error',
          text: (lang === 'cs' ? '❌ Uložení selhalo: ' : '❌ Save failed: ') + (data.error || 'Unknown error')
        });
      }
    } catch (err: any) {
      setIconsMsg({
        type: 'error',
        text: (lang === 'cs' ? '❌ Chyba sítě: ' : '❌ Network error: ') + err.message
      });
    } finally {
      setIconsSaving(false);
    }
  };

  const handlePokemonIconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setIconsMsg({ type: 'error', text: lang === 'cs' ? 'Soubor je příliš velký (max 5 MB)' : 'File too large (max 5 MB)' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setEditingPokemonUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEventIconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(lang === 'cs' ? 'Soubor je příliš velký (max 5 MB)' : 'File too large (max 5 MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setFormIconUrl(ev.target.result as string);
        setSuccessMsg(lang === 'cs' ? 'Ikona události načtena ze souboru!' : 'Event icon loaded from file!');
      }
    };
    reader.readAsDataURL(file);
  };

  const selectEventForEditing = async (event: EventData | CustomEventOverride) => {
    setError('');
    setSuccessMsg('');
    setRescrapeUrl('');
    setRescrapeMsg(null);
    const override = customOverrides.find(o => o.eventID === event.eventID);
    const activeEvent = override || {
      eventID: event.eventID,
      name: event.name,
      eventType: event.eventType,
      heading: (event as any).heading || '',
      link: event.link || '',
      image: event.image || '',
      start: event.start,
      end: event.end,
      extraData: (event as any).extraData || null,
      isDeleted: false,
      isCustom: (event as any).isCustom || false
    };
    setSelectedEvent(activeEvent);
    setFormEventID(activeEvent.eventID);
    setFormName(activeEvent.name);
    setFormEventType(activeEvent.eventType);
    setFormHeading(activeEvent.heading);
    setFormLink(activeEvent.link);
    setFormOfficialLink((activeEvent as any).officialLink || (activeEvent.link && activeEvent.link.includes('pokemongolive.com') ? activeEvent.link : ''));
    setFormSecondaryLink((activeEvent as any).secondaryLink || (activeEvent.link && activeEvent.link.includes('leekduck.com') ? activeEvent.link : ''));
    const rawTxt = activeEvent.extraData?.rawDescription || activeEvent.extraData?.scrapedText || activeEvent.extraData?.description || activeEvent.heading || '';
    setFormScrapedText(typeof rawTxt === 'object' ? formatLocalizedString(rawTxt, 'cs') : String(rawTxt));
    setFormImage(activeEvent.image);
    setFormIconUrl((activeEvent as any).icon || activeEvent.extraData?.iconUrl || '');
    const fmt = (s: string) => s ? s.substring(0, 16) : '';
    setFormStart(fmt(activeEvent.start));
    setFormEnd(fmt(activeEvent.end));
    setFormIsDeleted(activeEvent.isDeleted || false);
    const extra = activeEvent.extraData || {};
    setFormExtraData(extra);
    setFormExtraDataJson(JSON.stringify(extra, null, 2));

    setDetailsLoading(true);
    try {
      let url = `/api/events/${activeEvent.eventID}/details`;
      const queryParams = [];
      if (activeEvent.link) queryParams.push(`link=${encodeURIComponent(activeEvent.link)}`);
      if (activeEvent.name) queryParams.push(`name=${encodeURIComponent(activeEvent.name)}`);
      if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

      const res = await apiFetch(url);
      if (res.ok) {
        const fetchedDetails = await res.json();
        setSelectedEvent(current => {
          if (current && current.eventID === activeEvent.eventID) {
            if (fetchedDetails && Object.keys(fetchedDetails).length > 0) {
              setFormExtraData(fetchedDetails);
              setFormExtraDataJson(JSON.stringify(fetchedDetails, null, 2));
              if (fetchedDetails.rawDescription || fetchedDetails.scrapedText) {
                const rawVal = fetchedDetails.rawDescription || fetchedDetails.scrapedText;
                setFormScrapedText(typeof rawVal === 'object' ? formatLocalizedString(rawVal, 'cs') : String(rawVal));
              }
              return { ...current, extraData: fetchedDetails };
            }
          }
          return current;
        });
      }
    } catch {
      /* silent fallback */
    } finally {
      setSelectedEvent(current => {
        if (current && current.eventID === activeEvent.eventID) {
          setDetailsLoading(false);
        }
        return current;
      });
    }
  };

  const handleCreateNewEvent = () => {
    setError('');
    setSuccessMsg('');
    setDetailsLoading(false);
    const randomId = 'custom_' + Date.now();
    const newEvent: CustomEventOverride = {
      eventID: randomId,
      name: lang === 'cs' ? 'Nová událost' : 'New Event',
      eventType: 'other',
      heading: 'Event',
      link: '',
      image: '',
      start: new Date().toISOString().substring(0, 16),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().substring(0, 16),
      isDeleted: false,
      isCustom: true,
      extraData: {}
    };
    setSelectedEvent(newEvent);
    setFormEventID(newEvent.eventID);
    setFormName(newEvent.name);
    setFormEventType(newEvent.eventType);
    setFormHeading(newEvent.heading);
    setFormLink(newEvent.link);
    setFormImage(newEvent.image);
    setFormStart(newEvent.start);
    setFormEnd(newEvent.end);
    setFormIsDeleted(false);
    setFormExtraData({});
    setFormExtraDataJson('{}');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!formEventID || !formName || !formStart || !formEnd) {
      setError(lang === 'cs' ? 'Vyplňte základní údaje (ID, Název, Začátek, Konec)' : 'Please fill in basic fields (ID, Name, Start, End)');
      return;
    }
    let parsedExtraData: any = formExtraData;
    if (editMode === 'json') {
      try {
        parsedExtraData = formExtraDataJson.trim() ? JSON.parse(formExtraDataJson) : {};
      } catch (err: any) {
        setError((lang === 'cs' ? 'Chybný JSON: ' : 'Invalid JSON: ') + err.message);
        return;
      }
    }
    let isoStart = formStart;
    let isoEnd = formEnd;
    try {
      const startDate = new Date(formStart);
      if (!isNaN(startDate.getTime())) isoStart = startDate.toISOString();
      const endDate = new Date(formEnd);
      if (!isNaN(endDate.getTime())) isoEnd = endDate.toISOString();
    } catch { /* keep original */ }

    const finalExtraData = {
      ...(parsedExtraData || {}),
      rawDescription: formScrapedText,
      iconUrl: formIconUrl
    };

    const eventPayload: CustomEventOverride = {
      eventID: formEventID,
      name: formName,
      eventType: formEventType,
      heading: formHeading || getHeadingForType(formEventType),
      link: formOfficialLink || formSecondaryLink || formLink,
      officialLink: formOfficialLink,
      secondaryLink: formSecondaryLink,
      image: formImage,
      icon: formIconUrl,
      start: isoStart,
      end: isoEnd,
      extraData: finalExtraData,
      isDeleted: formIsDeleted,
      isCustom: selectedEvent?.isCustom || false
    };
    try {
      const res = await apiFetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventPayload)
      });
      const data = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Událost uložena!' : 'Event saved!');
        localStorage.removeItem('pogo_events_cache');
        localStorage.removeItem('pogo_events_cache_time');
        localStorage.removeItem(`pogo_scraped_details_${formEventID}`);
        window.dispatchEvent(new CustomEvent('pogo_events_updated', { detail: { eventID: formEventID } }));
        fetchAdminData(token);
        setSelectedEvent(eventPayload);
      } else {
        setError(data.error || 'Failed to save');
      }
    } catch (err) {
      setError(lang === 'cs' ? 'Chyba sítě' : 'Network error');
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    const msg = lang === 'cs'
      ? `Odstranit/skrýt "${selectedEvent.name}"?`
      : `Delete/hide "${selectedEvent.name}"?`;
    if (!window.confirm(msg)) return;
    setError(''); setSuccessMsg('');
    try {
      const res = await apiFetch(`/api/admin/events/${selectedEvent.eventID}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Odstraněno!' : 'Deleted!');
        localStorage.removeItem('pogo_events_cache');
        localStorage.removeItem('pogo_events_cache_time');
        localStorage.removeItem(`pogo_scraped_details_${selectedEvent.eventID}`);
        window.dispatchEvent(new CustomEvent('pogo_events_updated', { detail: { eventID: selectedEvent.eventID } }));
        setSelectedEvent(null);
        fetchAdminData(token);
      } else {
        setError(data.error || 'Failed to delete');
      }
    } catch { setError(lang === 'cs' ? 'Chyba sítě' : 'Network error'); }
  };

  const handleExportScrapedData = (format: 'json' | 'txt') => {
    const dataStr = format === 'json'
      ? JSON.stringify(scrapedEvents, null, 2)
      : scrapedEvents.map(e => `[${e.eventID}] ${e.name} (${e.eventType})\n  Start: ${e.start}\n  End: ${e.end}\n  Link: ${e.link}\n  Image: ${e.image}\n  ExtraData: ${JSON.stringify((e as any).extraData || {})}\n`).join('\n----------------------------------------\n');
    
    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pogo_scraped_events_${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSingleEvent = (format: 'json' | 'txt') => {
    if (!selectedEvent) return;
    const dataStr = format === 'json'
      ? JSON.stringify(selectedEvent, null, 2)
      : `[${selectedEvent.eventID}] ${selectedEvent.name}\nType: ${selectedEvent.eventType}\nHeading: ${selectedEvent.heading}\nStart: ${selectedEvent.start}\nEnd: ${selectedEvent.end}\nLink: ${selectedEvent.link}\nImage: ${selectedEvent.image}\nIsDeleted: ${selectedEvent.isDeleted}\nIsCustom: ${selectedEvent.isCustom}\nExtraData:\n${JSON.stringify(selectedEvent.extraData || {}, null, 2)}`;
    
    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEvent.eventID}_scrape.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTriggerScraper = async (force: boolean = false) => {
    setScraperRunning(true);
    setError(''); setSuccessMsg('');
    try {
      const res = await apiFetch(`/api/admin/scrape${force ? '?force=true' : ''}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        setError(lang === 'cs' ? 'Relace vypršela. Prosím přihlaste se znovu.' : 'Session expired. Please log in again.');
        return;
      }
      const data = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Scraper spuštěn na pozadí!' : 'Scraper started in background!');
        setTimeout(fetchScraperStatus, 3000);
      } else {
        setError(data.message || (lang === 'cs' ? 'Chyba při spuštění scraperu' : 'Failed to start scraper'));
      }
    } catch { setError(lang === 'cs' ? 'Chyba sítě při připojení k serveru' : 'Network error'); }
    finally { setScraperRunning(false); }
  };

  const handleRescrapeEvent = async () => {
    if (!selectedEvent || !rescrapeUrl.trim()) return;
    const url = rescrapeUrl.trim();
    if (!url.startsWith('http')) {
      setRescrapeMsg({ type: 'error', text: lang === 'cs' ? 'URL musí začínat http(s)://' : 'URL must start with http(s)://' });
      return;
    }
    setRescrapeLoading(true);
    setRescrapeMsg(null);
    try {
      const res = await apiFetch(`/api/admin/events/${selectedEvent.eventID}/rescrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ url })
      });
      const data = await res.json().catch(() => ({ error: 'Failed to rescrape' }));
      if (res.ok && data.success) {
        // Update form with freshly scraped extra data
        setFormExtraData(data.details);
        setFormExtraDataJson(JSON.stringify(data.details, null, 2));
        if (data.details.rawDescription || data.details.scrapedText) {
          const rawVal = data.details.rawDescription || data.details.scrapedText;
          setFormScrapedText(typeof rawVal === 'object' ? formatLocalizedString(rawVal, 'cs') : String(rawVal));
        }
        setSelectedEvent(prev => prev ? { ...prev, extraData: data.details } : prev);
        // Also update official link if scraper found one
        if (data.details.officialLink && !formOfficialLink) {
          setFormOfficialLink(data.details.officialLink);
        }
        setRescrapeMsg({
          type: 'success',
          text: lang === 'cs'
            ? `✅ Znovuscrapování dokončeno! Data načtena ze: ${url}`
            : `✅ Re-scrape complete! Data loaded from: ${url}`
        });
        // Invalidate local cache
        localStorage.removeItem(`pogo_scraped_details_${selectedEvent.eventID}`);
      } else {
        setRescrapeMsg({
          type: 'error',
          text: (lang === 'cs' ? '❌ Chyba: ' : '❌ Error: ') + (data.error || 'Unknown error')
        });
      }
    } catch {
      setRescrapeMsg({ type: 'error', text: lang === 'cs' ? '❌ Chyba sítě' : '❌ Network error' });
    } finally {
      setRescrapeLoading(false);
    }
  };

  const handleFileImport = async () => {
    if (!importFile) return;
    setImportLoading(true);
    setImportResult(null);
    setError('');
    try {
      const text = await importFile.text();
      const parsed = JSON.parse(text);
      const eventsToImport = Array.isArray(parsed) ? parsed : (parsed.events || [parsed]);
      const res = await apiFetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ events: eventsToImport, mode: importMode })
      });
      const result = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && result.success) {
        setImportResult(result);
        localStorage.removeItem('pogo_events_cache');
        localStorage.removeItem('pogo_events_cache_time');
        window.dispatchEvent(new CustomEvent('pogo_events_updated'));
        fetchAdminData(token);
      } else {
        setError(result.error || 'Import failed');
      }
    } catch (err: any) {
      setError(`${lang === 'cs' ? 'Chyba importu' : 'Import error'}: ${err.message}`);
    } finally {
      setImportLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setImportDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.json') || file.name.endsWith('.txt'))) {
      setImportFile(file);
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(lang === 'cs' ? 'Soubor je příliš velký (max 5 MB)' : 'File too large (max 5 MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setFormImage(ev.target.result as string);
        setSuccessMsg(lang === 'cs' ? 'Fotka načtena ze souboru!' : 'Image loaded from file!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePickPokemonSprite = () => {
    const nameToUse = formName || selectedEvent?.name || '';
    if (!nameToUse) return;
    const spriteUrl = getPokemonIconUrl(nameToUse);
    setFormImage(spriteUrl);
    setSuccessMsg(lang === 'cs' ? `Načten sprite pro: ${nameToUse}` : `Loaded sprite for: ${nameToUse}`);
  };

  const socialAvailableYears = useMemo(() => {
    const years = new Set<string>();
    scrapedEvents.forEach(e => {
      if (e.start) {
        const y = new Date(e.start).getFullYear();
        if (!isNaN(y)) years.add(y.toString());
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [scrapedEvents]);

  const socialAvailableTypes = useMemo(() => {
    const types = new Set<string>();
    scrapedEvents.forEach(e => {
      if (e.eventType) types.add(e.eventType);
    });
    return Array.from(types).sort();
  }, [scrapedEvents]);

  const filteredSocialEvents = useMemo(() => {
    const now = new Date().getTime();
    return scrapedEvents.filter(e => {
      const startDate = new Date(e.start);
      const endDate = new Date(e.end);
      const startMs = startDate.getTime();
      const endMs = endDate.getTime();

      // Year filter
      if (socialFilterYear && socialFilterYear !== 'all') {
        if (startDate.getFullYear().toString() !== socialFilterYear) return false;
      }

      // Month filter (0-11)
      if (socialFilterMonth && socialFilterMonth !== 'all') {
        if (startDate.getMonth().toString() !== socialFilterMonth) return false;
      }

      // Type filter
      if (socialFilterType && socialFilterType !== 'all') {
        if (e.eventType !== socialFilterType) return false;
      }

      // Status filter
      if (socialFilterStatus === 'upcoming') {
        if (startMs <= now) return false;
      } else if (socialFilterStatus === 'active') {
        if (startMs > now || endMs < now) return false;
      } else if (socialFilterStatus === 'past') {
        if (endMs >= now) return false;
      }

      // Search query
      if (socialSearchQuery.trim()) {
        const query = socialSearchQuery.toLowerCase().trim();
        const name = formatLocalizedString(e.name, lang).toLowerCase();
        const type = (e.eventType || '').toLowerCase();
        if (!name.includes(query) && !type.includes(query) && !e.eventID.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [scrapedEvents, socialFilterYear, socialFilterMonth, socialFilterType, socialFilterStatus, socialSearchQuery, lang]);

  const socialSelectedEvent = scrapedEvents.find(e => e.eventID === socialSelectedEventId) || null;

  useEffect(() => {
    if (socialSelectedEvent) {
      const caption = generateSocialCaption(socialSelectedEvent, lang);
      setGeneratedSocialCaption(caption);
    } else {
      setGeneratedSocialCaption('');
    }
  }, [socialSelectedEvent, lang]);

  const handleSendSocialWebhook = async () => {
    if (!socialSelectedEvent || !socialWebhookUrl.trim()) return;
    setSocialSending(true);
    setSocialSendStatus(null);
    try {
      const payload = {
        eventId: socialSelectedEvent.eventID,
        title: formatLocalizedString(socialSelectedEvent.name, lang),
        eventType: socialSelectedEvent.eventType,
        start: socialSelectedEvent.start,
        end: socialSelectedEvent.end,
        caption: generatedSocialCaption,
        imageUrl: resolveImage(socialSelectedEvent.image, socialSelectedEvent.eventType, socialSelectedEvent.name),
        appUrl: 'https://pogoevents.app',
        timestamp: new Date().toISOString()
      };
      const res = await fetch(socialWebhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSocialSendStatus({
          type: 'success',
          text: lang === 'cs' ? '✅ Příspěvek byl úspěšně odeslán na Webhook!' : '✅ Post successfully sent to Webhook!'
        });
      } else {
        setSocialSendStatus({
          type: 'error',
          text: (lang === 'cs' ? '❌ Webhook vrátil chybu HTTP ' : '❌ Webhook returned HTTP error ') + res.status
        });
      }
    } catch (err: any) {
      setSocialSendStatus({
        type: 'error',
        text: (lang === 'cs' ? '❌ Chyba sítě při volání webhooku: ' : '❌ Network error calling webhook: ') + err.message
      });
    } finally {
      setSocialSending(false);
    }
  };

  const getHeadingForType = (type: string): string => {
    switch (type) {
      case 'community-day': return 'Community Day';
      case 'pokemon-spotlight-hour': return 'Spotlight Hour';
      case 'raid-hour': return 'Raid Hour';
      case 'raid-battles': return 'Raid Battles';
      case 'raid-day': return 'Raid Day';
      case 'rocket-takeover': return 'Rocket Takeover';
      case 'hatch-day': return 'Hatch Day';
      case 'limited-research': return 'Limited Research';
      case 'showcase': return 'PokéStop Showcase';
      case 'event': return 'Event';
      default: return 'Event';
    }
  };

  const filteredEvents = scrapedEvents.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.eventID.toLowerCase().includes(searchQuery.toLowerCase());
    const override = customOverrides.find(o => o.eventID === e.eventID);
    const isHidden = override?.isDeleted;
    const isCustom = (e as any).isCustom || override?.isCustom;
    if (listFilter === 'custom') return matchesSearch && isCustom;
    if (listFilter === 'hidden') return matchesSearch && isHidden;
    return matchesSearch;
  });

  // =================== LOGIN SCREEN ===================
  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-header">
            <Lock size={40} className="login-lock-icon" />
            <h2>{lang === 'cs' ? 'Vstup do Administrace' : 'Admin Portal'}</h2>
            <p>{lang === 'cs' ? 'Přístupné také přes /admin URL' : 'Also accessible via /admin URL'}</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="password"
                placeholder={lang === 'cs' ? 'Administrátorské heslo' : 'Administrator Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-password-input"
                autoFocus
              />
            </div>
            {error && (
              <div className="admin-form-error">
                <AlertTriangle size={16} /><span>{error}</span>
              </div>
            )}
            <div className="login-buttons-row">
              <button type="button" onClick={onBack} className="admin-btn btn-secondary">
                <ArrowLeft size={16} />{lang === 'cs' ? 'Zpět' : 'Back'}
              </button>
              <button type="submit" className="admin-btn btn-primary">
                {lang === 'cs' ? 'Přihlásit se' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =================== DASHBOARD ===================
  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="dashboard-title-section">
          <h2>{lang === 'cs' ? 'Administrace' : 'Administration'}</h2>
          <span className="admin-badge">Admin</span>
          <span className="admin-url-hint">/admin</span>
        </div>
        <div className="dashboard-header-buttons">
          <button onClick={handleLogout} className="admin-btn btn-secondary">
            {lang === 'cs' ? 'Odhlásit' : 'Log Out'}
          </button>
          <button onClick={onBack} className="admin-btn btn-primary">
            <ArrowLeft size={16} />{lang === 'cs' ? 'Zpět do aplikace' : 'Back to App'}
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="admin-nav-tabs">
        <button className={`admin-nav-btn ${adminTab === 'events' ? 'active' : ''}`} onClick={() => setAdminTab('events')}>
          <Edit size={15} />{lang === 'cs' ? 'Události' : 'Events'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'raids' ? 'active' : ''}`} onClick={() => setAdminTab('raids')}>
          <Swords size={15} />{lang === 'cs' ? 'Správa Raidů' : 'Raid Bosses'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'social' ? 'active' : ''}`} onClick={() => setAdminTab('social')}>
          <Share2 size={15} />{lang === 'cs' ? 'TikTok & IG Hub' : 'TikTok & IG Hub'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'icons' ? 'active' : ''}`} onClick={() => setAdminTab('icons')}>
          <Sparkles size={15} />{lang === 'cs' ? 'Ikony Pokémonů' : 'Pokémon Icons'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'scraper' ? 'active' : ''}`} onClick={() => setAdminTab('scraper')}>
          <RefreshCw size={15} />{lang === 'cs' ? 'Scraper' : 'Scraper'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'import' ? 'active' : ''}`} onClick={() => setAdminTab('import')}>
          <Upload size={15} />{lang === 'cs' ? 'Import' : 'Import'}
        </button>
        <button className={`admin-nav-btn ${adminTab === 'cache' ? 'active' : ''}`} onClick={() => setAdminTab('cache')}>
          <Server size={15} />{lang === 'cs' ? 'Cache' : 'Cache'}
        </button>
      </div>

      {/* ===== TAB: RAIDS ===== */}
      {adminTab === 'raids' && (
        <div className="admin-raids-layout" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Action Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Swords size={20} style={{ color: '#a855f7' }} />
                {lang === 'cs' ? 'Správa Raid Bossů & Rotací' : 'Raid Boss & Rotation Management'}
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {lang === 'cs'
                  ? 'Zde můžete okamžitě obnovit aktuální raid lineup, skrýt libovolného bosse nebo ručně přidat nového.'
                  : 'Manage active raid bosses, force refresh rotations, or override current lineups.'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="admin-btn btn-secondary"
                onClick={handleRefreshRaids}
                disabled={raidsRefreshing}
                title={lang === 'cs' ? 'Vynutit okamžitý re-scrape a pročištění keše raidů' : 'Force fresh scrape & clear raid cache'}
              >
                <RefreshCw size={15} className={raidsRefreshing ? 'spin' : ''} />
                {lang === 'cs' ? 'Pročistit & Obnovit Raidy' : 'Refresh & Clear Raids'}
              </button>
              <button
                className="admin-btn btn-primary"
                onClick={() => setShowRaidModal(true)}
              >
                <Plus size={15} />
                {lang === 'cs' ? 'Přidat Raid Bosse' : 'Add Raid Boss'}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {raidMsg && (
            <div className={`status-alert ${raidMsg.type}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', background: raidMsg.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: raidMsg.type === 'success' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)', color: raidMsg.type === 'success' ? '#4ade80' : '#f87171', fontSize: '0.85rem' }}>
              {raidMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
              <span>{raidMsg.text}</span>
            </div>
          )}

          {raidsLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px auto' }} />
              <p>{lang === 'cs' ? 'Načítání raid bossů...' : 'Loading raid bosses...'}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Live Active Raid Bosses */}
              <div>
                <h3 style={{ fontSize: '1rem', margin: '0 0 12px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={16} style={{ color: '#facc15' }} />
                  {lang === 'cs' ? 'Aktuálně Zobrazovaní Raid Bossové' : 'Currently Active Raid Bosses'}
                  <span style={{ fontSize: '0.75rem', background: 'rgba(168,85,247,0.2)', color: '#c084fc', padding: '2px 8px', borderRadius: '12px' }}>
                    {liveRaidBosses.length}
                  </span>
                </h3>

                {liveRaidBosses.length === 0 ? (
                  <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {lang === 'cs' ? 'Žádní raid bossové nebyly nalezeni. Klikněte na tlačítko Obnovit Raidy.' : 'No active raid bosses found. Click Refresh & Clear Raids.'}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                    {liveRaidBosses.map((boss: any, idx: number) => {
                      const iconUrl = boss.image || getPokemonIconUrl(boss.name);
                      return (
                        <div
                          key={`${boss.name}-${boss.tier}-${idx}`}
                          style={{
                            background: 'rgba(20, 24, 36, 0.75)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '16px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '10px',
                            backdropFilter: 'blur(12px)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '4px' }}>
                              <img
                                src={iconUrl}
                                alt={boss.name}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'; }}
                              />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{boss.name}</span>
                                {boss.canBeShiny && (
                                  <span title="Shiny available" style={{ fontSize: '0.75rem' }}>✨</span>
                                )}
                              </div>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '1px 7px', borderRadius: '6px', background: boss.tier === 'mega' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : boss.tier.includes('shadow') ? 'linear-gradient(135deg, #7c3aed, #4c1d95)' : 'rgba(56, 189, 248, 0.2)', color: boss.tier === 'mega' || boss.tier.includes('shadow') ? '#fff' : '#38bdf8' }}>
                                  Tier {String(boss.tier).toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {(boss.cpRange || boss.boostedCpRange) && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px' }}>
                              {boss.cpRange && <div><strong>CP:</strong> {boss.cpRange}</div>}
                              {boss.boostedCpRange && <div><strong>Weather Boosted:</strong> {boss.boostedCpRange}</div>}
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                            <button
                              className="admin-btn btn-secondary"
                              onClick={() => handleToggleHideRaid(boss, false)}
                              style={{ flex: 1, padding: '6px 10px', fontSize: '0.78rem' }}
                              title={lang === 'cs' ? 'Skrýt tohoto bosse z aplikace' : 'Hide this boss from app'}
                            >
                              <EyeOff size={13} />
                              {lang === 'cs' ? 'Skrýt' : 'Hide'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Custom Overrides & Blacklisted Bosses */}
              {raidOverrides.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1rem', margin: '16px 0 12px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <EyeOff size={16} style={{ color: '#ef4444' }} />
                    {lang === 'cs' ? 'Vlastní Úpravy a Skrytí (Blacklist)' : 'Custom Overrides & Hidden Bosses'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                    {raidOverrides.map((override: any, idx: number) => (
                      <div
                        key={`override-${override.name}-${override.tier}-${idx}`}
                        style={{
                          background: override.isDeleted ? 'rgba(239, 68, 68, 0.08)' : 'rgba(168, 85, 247, 0.08)',
                          border: override.isDeleted ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(168, 85, 247, 0.3)',
                          borderRadius: '16px',
                          padding: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={override.image || getPokemonIconUrl(override.name)}
                            alt={override.name}
                            style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'; }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{override.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Tier: {override.tier} • {override.isDeleted ? (lang === 'cs' ? 'SKRYTÝ' : 'HIDDEN') : (lang === 'cs' ? 'VLASTNÍ' : 'CUSTOM')}
                            </div>
                          </div>
                        </div>

                        <button
                          className="admin-btn btn-danger"
                          onClick={() => handleDeleteRaidOverride(override.name, override.tier)}
                          style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                          title={lang === 'cs' ? 'Odstranit toto pravidlo' : 'Remove rule'}
                        >
                          <Trash2 size={13} />
                          {lang === 'cs' ? 'Smazat' : 'Delete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Custom Raid Boss Modal */}
          {showRaidModal && (
            <div className="admin-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
              <div style={{ background: 'var(--bg-card, #0f172a)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '460px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} style={{ color: '#a855f7' }} />
                    {lang === 'cs' ? 'Přidat Vlastního Raid Bosse' : 'Add Custom Raid Boss'}
                  </h3>
                  <button onClick={() => setShowRaidModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveCustomRaid} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {lang === 'cs' ? 'Jméno Pokémona *' : 'Pokémon Name *'}
                    </label>
                    <input
                      type="text"
                      className="admin-password-input"
                      value={raidFormName}
                      onChange={(e) => setRaidFormName(e.target.value)}
                      placeholder="e.g. Rayquaza, Necrozma"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Tier *
                      </label>
                      <select
                        className="admin-password-input"
                        value={raidFormTier}
                        onChange={(e) => setRaidFormTier(e.target.value)}
                      >
                        <option value="1">Tier 1</option>
                        <option value="3">Tier 3</option>
                        <option value="5">Tier 5 (Legendary)</option>
                        <option value="mega">Mega Raid</option>
                        <option value="shadow-1">Shadow 1-Star</option>
                        <option value="shadow-3">Shadow 3-Star</option>
                        <option value="shadow-5">Shadow 5-Star</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
                      <input
                        type="checkbox"
                        id="canBeShinyCheck"
                        checked={raidFormCanBeShiny}
                        onChange={(e) => setRaidFormCanBeShiny(e.target.checked)}
                      />
                      <label htmlFor="canBeShinyCheck" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        Shiny ✨
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        CP Range (Normální)
                      </label>
                      <input
                        type="text"
                        className="admin-password-input"
                        value={raidFormCpRange}
                        onChange={(e) => setRaidFormCpRange(e.target.value)}
                        placeholder="e.g. 2100 - 2195"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        CP Range (Boosted)
                      </label>
                      <input
                        type="text"
                        className="admin-password-input"
                        value={raidFormBoostedCpRange}
                        onChange={(e) => setRaidFormBoostedCpRange(e.target.value)}
                        placeholder="e.g. 2625 - 2744"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Počasí (Weather Boosts, oddělené čárkou)
                    </label>
                    <input
                      type="text"
                      className="admin-password-input"
                      value={raidFormWeather}
                      onChange={(e) => setRaidFormWeather(e.target.value)}
                      placeholder="e.g. Windy, Dragon"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Typy (Types, oddělené čárkou)
                    </label>
                    <input
                      type="text"
                      className="admin-password-input"
                      value={raidFormTypes}
                      onChange={(e) => setRaidFormTypes(e.target.value)}
                      placeholder="e.g. Dragon, Flying"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {lang === 'cs' ? 'Doporučený počet hráčů (volitelné)' : 'Recommended Players (optional)'}
                    </label>
                    <input
                      type="text"
                      className="admin-password-input"
                      value={raidFormPlayers}
                      onChange={(e) => setRaidFormPlayers(e.target.value)}
                      placeholder="e.g. 1-2 hráči (Duo), 3-5 hráčů"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button type="button" className="admin-btn btn-secondary" onClick={() => setShowRaidModal(false)}>
                      {lang === 'cs' ? 'Zrušit' : 'Cancel'}
                    </button>
                    <button type="submit" className="admin-btn btn-primary">
                      <Save size={15} />
                      {lang === 'cs' ? 'Uložit Raid Bosse' : 'Save Raid Boss'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== TAB: EVENTS ===== */}
      {adminTab === 'events' && (
        <div className="admin-dashboard-layout">
          {/* Sidebar list */}
          <div className="admin-sidebar-list">
            <div className="sidebar-list-controls">
              <button onClick={handleCreateNewEvent} className="admin-btn btn-success add-event-btn">
                <Plus size={16} />{lang === 'cs' ? 'Nová Vlastní Událost' : 'New Custom Event'}
              </button>
              <div className="search-box-container">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder={lang === 'cs' ? 'Hledat...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <div className="admin-list-tabs">
                {(['all', 'custom', 'hidden'] as const).map(f => (
                  <button
                    key={f}
                    className={`list-tab-btn ${listFilter === f ? 'active' : ''}`}
                    onClick={() => setListFilter(f)}
                  >
                    {f === 'all' ? (lang === 'cs' ? 'Vše' : 'All') :
                     f === 'custom' ? (lang === 'cs' ? 'Vlastní' : 'Custom') :
                     (lang === 'cs' ? 'Skryté' : 'Hidden')}
                    {f === 'all' && ` (${scrapedEvents.length})`}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-events-scroller">
              {filteredEvents.length === 0 ? (
                <div className="no-events-found"><p>{lang === 'cs' ? 'Žádné výsledky' : 'No results'}</p></div>
              ) : (
                filteredEvents.map(event => {
                  const override = customOverrides.find(o => o.eventID === event.eventID);
                  const isHidden = override?.isDeleted;
                  const isCustom = (event as any).isCustom || override?.isCustom;
                  return (
                    <div
                      key={event.eventID}
                      className={`admin-event-item-card ${selectedEvent?.eventID === event.eventID ? 'selected' : ''} ${isHidden ? 'hidden-event' : ''}`}
                      onClick={() => selectEventForEditing(event)}
                    >
                      <div className="event-item-meta">
                        <span className={`event-type-badge-mini ${event.eventType}`}>{event.eventType}</span>
                        {isCustom && <span className="custom-indicator">vlastní</span>}
                        {isHidden && <span className="hidden-indicator"><EyeOff size={10} /> skrytý</span>}
                      </div>
                      <h4 className="event-item-name">{event.name}</h4>
                      <span className="event-item-dates">
                        {new Date(event.start).toLocaleDateString()} – {new Date(event.end).toLocaleDateString()}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Edit Form */}
          <div className="admin-form-container">
            {selectedEvent ? (
              <form onSubmit={handleSaveEvent} className="event-edit-form">
                <div className="form-header">
                  <h3><Edit size={18} />
                    {selectedEvent.isCustom
                      ? (lang === 'cs' ? 'Editovat Vlastní' : 'Edit Custom')
                      : (lang === 'cs' ? 'Přepsat Scrapovanou' : 'Override Scraped')}
                  </h3>
                  <span className="event-id-lbl">ID: <code>{formEventID}</code></span>
                </div>

                {error && <div className="admin-form-error"><AlertTriangle size={16} /><span>{error}</span></div>}
                {successMsg && <div className="admin-form-success"><CheckCircle size={16} /><span>{successMsg}</span></div>}

                {/* Basic Fields */}
                <div className="form-grid">
                  <div className="form-field">
                    <label>{lang === 'cs' ? 'Název' : 'Event Name'}</label>
                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} required />
                  </div>
                  <div className="form-field">
                    <label>{lang === 'cs' ? 'Kategorie' : 'Category'}</label>
                    <select value={formEventType} onChange={(e) => setFormEventType(e.target.value)}>
                      <option value="community-day">Community Day</option>
                      <option value="pokemon-spotlight-hour">Spotlight Hour</option>
                      <option value="raid-hour">Raid Hour</option>
                      <option value="raid-battles">Raid Battles</option>
                      <option value="raid-day">Raid Day</option>
                      <option value="rocket-takeover">Rocket Takeover</option>
                      <option value="hatch-day">Hatch Day</option>
                      <option value="limited-research">Limited Research</option>
                      <option value="showcase">PokéStop Showcase</option>
                      <option value="event">Event (velká událost)</option>
                      <option value="other">Ostatní (Major Event)</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Heading</label>
                    <input type="text" value={formHeading} onChange={(e) => setFormHeading(e.target.value)} />
                  </div>
                  
                  <div className="form-field full-width-field">
                    <label>{lang === 'cs' ? 'Oficiální odkaz (pokemongo.com)' : 'Official Link (pokemongo.com)'}</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="url"
                        value={formOfficialLink}
                        onChange={(e) => setFormOfficialLink(e.target.value)}
                        placeholder="https://pokemongolive.com/news/..."
                        style={{ flex: 1 }}
                      />
                      <a
                        href="https://pokemongo.com/news"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn btn-secondary"
                        style={{ whiteSpace: 'nowrap', fontSize: '0.75rem', padding: '6px 12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <ExternalLink size={12} /> {lang === 'cs' ? 'Novinky pokemongo.com' : 'Official News'}
                      </a>
                    </div>
                  </div>

                  <div className="form-field full-width-field">
                    <label>{lang === 'cs' ? 'Sekundární / Komunitní odkaz (Leek Duck)' : 'Secondary / Community Link (Leek Duck)'}</label>
                    <input
                      type="url"
                      value={formSecondaryLink}
                      onChange={(e) => setFormSecondaryLink(e.target.value)}
                      placeholder="https://leekduck.com/events/..."
                    />
                  </div>

                  {/* Re-scrape from URL */}
                  <div className="form-field full-width-field" style={{ marginTop: '4px' }}>
                    <div style={{
                      background: 'rgba(99, 102, 241, 0.08)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      padding: '14px 16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <RefreshCw size={15} style={{ color: '#818cf8' }} />
                        <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#e2e8f0' }}>
                          {lang === 'cs' ? 'Znovuscrapovat z nové URL' : 'Re-scrape from New URL'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {lang === 'cs'
                          ? 'Zadejte novou URL (pokemongolive.com, leekduck.com apod.) a klikněte na Scrapovat. Stávající cache bude vymazána a formulář se aktualizuje.'
                          : 'Enter a new URL (pokemongolive.com, leekduck.com, etc.) and click Scrape. Existing cache will be cleared and the form will be updated.'}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                        <input
                          id={`rescrape-url-${selectedEvent?.eventID}`}
                          type="url"
                          value={rescrapeUrl}
                          onChange={(e) => { setRescrapeUrl(e.target.value); setRescrapeMsg(null); }}
                          placeholder={formOfficialLink || formSecondaryLink || formLink || 'https://pokemongolive.com/post/...'}
                          style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#e2e8f0', padding: '8px 12px', fontSize: '0.85rem' }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleRescrapeEvent(); } }}
                        />
                        <button
                          type="button"
                          onClick={handleRescrapeEvent}
                          disabled={rescrapeLoading || !rescrapeUrl.trim()}
                          className="admin-btn btn-primary"
                          style={{ whiteSpace: 'nowrap', opacity: rescrapeLoading || !rescrapeUrl.trim() ? 0.6 : 1 }}
                        >
                          {rescrapeLoading
                            ? <><RefreshCw size={14} className="spin-icon" /> {lang === 'cs' ? 'Scrapuji...' : 'Scraping...'}</>
                            : <><RefreshCw size={14} /> {lang === 'cs' ? 'Scrapovat' : 'Scrape'}</>
                          }
                        </button>
                      </div>
                      {rescrapeMsg && (
                        <div style={{
                          marginTop: '10px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          lineHeight: 1.5,
                          background: rescrapeMsg.type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          border: `1px solid ${rescrapeMsg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                          color: rescrapeMsg.type === 'success' ? '#4ade80' : '#f87171',
                        }}>
                          {rescrapeMsg.text}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scraped Raw Text Section */}
                  <div className="form-field full-width-field" style={{ marginTop: '4px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ margin: 0, fontWeight: 600 }}>
                        <FileText size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                        {lang === 'cs' ? 'Celý scrapený text (Raw Text ze zdroje)' : 'Full Scraped Raw Text'}
                      </label>
                      <button
                        type="button"
                        className="se-add-btn-sm"
                        onClick={() => setShowRawTextEditor(prev => !prev)}
                        style={{ cursor: 'pointer', padding: '4px 10px' }}
                      >
                        {showRawTextEditor ? (lang === 'cs' ? 'Skrýt text' : 'Hide text') : (lang === 'cs' ? 'Zobrazit / Upravit text' : 'Show / Edit text')}
                      </button>
                    </div>
                    {showRawTextEditor && (
                      <textarea
                        value={formScrapedText}
                        onChange={(e) => setFormScrapedText(e.target.value)}
                        placeholder={lang === 'cs' ? 'Kompletní znění textu z LeekDuck / Niantic. Můžete doplňovat vlastní text...' : 'Complete raw text scraped. You can edit or append custom notes...'}
                        rows={8}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          background: 'rgba(0,0,0,0.35)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: '#e2e8f0',
                          fontFamily: 'monospace',
                          fontSize: '0.82rem',
                          resize: 'vertical'
                        }}
                      />
                    )}
                  </div>

                  {/* Image Management with Live Preview, File Upload, Sprites & Presets */}
                  <div className="form-field full-width-field image-management-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Image size={14} style={{ color: 'var(--accent-color)' }} />
                        {lang === 'cs' ? 'Správa a úprava fotky eventu' : 'Event Image Management'}
                      </label>
                      {formImage && (
                        <button
                          type="button"
                          onClick={() => setFormImage('')}
                          style={{ fontSize: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', color: '#f87171', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <X size={12} /> {lang === 'cs' ? 'Odstranit obrázek' : 'Remove image'}
                        </button>
                      )}
                    </div>

                    {/* Toolbar for Upload & Sprite Picker */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <input type="file" accept="image/*" ref={imageFileInputRef} onChange={handleImageFileUpload} style={{ display: 'none' }} />
                      <button
                        type="button"
                        className="admin-btn btn-secondary"
                        onClick={() => imageFileInputRef.current?.click()}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Upload size={13} /> {lang === 'cs' ? 'Nahrát soubor z PC/Mobilu' : 'Upload file from PC/Mobile'}
                      </button>
                      
                      <button
                        type="button"
                        className="admin-btn btn-secondary"
                        onClick={handlePickPokemonSprite}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        title={lang === 'cs' ? 'Načíst ikonu Pokémona podle názvu' : 'Get Pokémon sprite by name'}
                      >
                        <Sparkles size={13} /> {lang === 'cs' ? 'Použít Pokémon Sprite' : 'Use Pokémon Sprite'}
                      </button>
                    </div>

                    {/* Presets Bar */}
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        {lang === 'cs' ? 'Tématická pozadí z Unsplash:' : 'Themed Unsplash backgrounds:'}
                      </span>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {PRESET_BACKGROUNDS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormImage(preset.url)}
                            style={{
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: formImage === preset.url ? 'var(--accent-color)' : 'rgba(255,255,255,0.06)',
                              color: formImage === preset.url ? '#000' : 'var(--text-primary)',
                              cursor: 'pointer',
                              fontWeight: formImage === preset.url ? 'bold' : 'normal'
                            }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* URL Input & Live Preview */}
                    <div className="image-url-row">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                      />
                      {formImage && (
                        <img src={formImage} alt="preview" className="image-url-preview" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                      )}
                    </div>
                  </div>

                  {/* Event Icon Management */}
                  <div className="form-field full-width-field icon-management-box" style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={14} style={{ color: '#a855f7' }} />
                        {lang === 'cs' ? 'Správa ikony události (Event Icon)' : 'Event Icon Management'}
                      </label>
                      {formIconUrl && (
                        <button
                          type="button"
                          onClick={() => setFormIconUrl('')}
                          style={{ fontSize: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', color: '#f87171', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <X size={12} /> {lang === 'cs' ? 'Odstranit ikonu' : 'Remove icon'}
                        </button>
                      )}
                    </div>

                    {/* Toolbar for Uploading Event Icon & Presets */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input type="file" accept="image/*" ref={eventIconFileInputRef} onChange={handleEventIconFileUpload} style={{ display: 'none' }} />
                      <button
                        type="button"
                        className="admin-btn btn-secondary"
                        onClick={() => eventIconFileInputRef.current?.click()}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Upload size={13} /> {lang === 'cs' ? 'Nahrát ikonu z PC/Mobilu' : 'Upload icon from PC/Mobile'}
                      </button>

                      {/* Icon presets */}
                      <button type="button" className="preset-bg-chip" onClick={() => setFormIconUrl('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}>
                        🔴 Poké Ball
                      </button>
                      <button type="button" className="preset-bg-chip" onClick={() => setFormIconUrl('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/raid-pass.png')} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}>
                        🎟️ Raid Pass
                      </button>
                      <button type="button" className="preset-bg-chip" onClick={() => setFormIconUrl('https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Rocket/ic_rocket.png')} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer' }}>
                        🚀 Rocket R
                      </button>
                    </div>

                    <div className="image-url-row">
                      <input
                        type="text"
                        placeholder="https://... (URL ikony události)"
                        value={formIconUrl}
                        onChange={(e) => setFormIconUrl(e.target.value)}
                      />
                      {formIconUrl && (
                        <img src={formIconUrl} alt="icon preview" className="image-url-preview" style={{ width: '42px', height: '42px', objectFit: 'contain' }} onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label>{lang === 'cs' ? 'Začátek (lokální čas)' : 'Start (local time)'}</label>
                    <input type="datetime-local" value={formStart} onChange={(e) => setFormStart(e.target.value)} required />
                  </div>
                  <div className="form-field">
                    <label>{lang === 'cs' ? 'Konec (lokální čas)' : 'End (local time)'}</label>
                    <input type="datetime-local" value={formEnd} onChange={(e) => setFormEnd(e.target.value)} required />
                  </div>

                  <div className="form-field">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={formIsDeleted} onChange={(e) => setFormIsDeleted(e.target.checked)} />
                      <span className="checkbox-text">{lang === 'cs' ? 'Skrýt z aplikace' : 'Hide from app'}</span>
                    </label>
                  </div>
                </div>

                {/* Extra Data Editor */}
                <div className="extra-data-section">
                  {detailsLoading && (
                    <div className="admin-details-loader-overlay">
                      <RefreshCw size={18} className="spin-icon" />
                      <span>{lang === 'cs' ? 'Načítání detailů události...' : 'Loading event details...'}</span>
                    </div>
                  )}
                  <div className="extra-data-header">
                    <span className="extra-data-title">
                      <PackageOpen size={15} />
                      {lang === 'cs' ? 'Detaily události' : 'Event Details'}
                    </span>
                    <div className="edit-mode-toggle">
                      <button
                        type="button"
                        className={`mode-toggle-btn ${editMode === 'visual' ? 'active' : ''}`}
                        onClick={() => setEditMode('visual')}
                      >
                        {lang === 'cs' ? '🎨 Vizuální' : '🎨 Visual'}
                      </button>
                      <button
                        type="button"
                        className={`mode-toggle-btn ${editMode === 'json' ? 'active' : ''}`}
                        onClick={() => {
                          setFormExtraDataJson(JSON.stringify(formExtraData, null, 2));
                          setEditMode('json');
                        }}
                      >
                        <FileJson size={12} /> JSON
                      </button>
                    </div>
                  </div>

                  {editMode === 'visual' ? (
                    <StructuredEditor
                      data={formExtraData}
                      onChange={(d) => {
                        setFormExtraData(d);
                        setFormExtraDataJson(JSON.stringify(d, null, 2));
                      }}
                      lang={lang}
                      onEditIcon={(pokeName) => {
                        setEditingPokemonName(pokeName);
                        setAdminTab('icons');
                        if (typeof window !== 'undefined') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                    />
                  ) : (
                    <div className="json-editor-wrapper">
                      <textarea
                        value={formExtraDataJson}
                        onChange={(e) => {
                          setFormExtraDataJson(e.target.value);
                          try {
                            setFormExtraData(JSON.parse(e.target.value));
                          } catch { /* wait for valid json */ }
                        }}
                        rows={12}
                        className="json-textarea"
                        spellCheck={false}
                      />
                      <div className="json-preview-toggle" onClick={() => setJsonExpanded(!jsonExpanded)}>
                        {jsonExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {lang === 'cs' ? 'Náhled struktury' : 'Structure preview'}
                      </div>
                      {jsonExpanded && (
                        <pre className="json-structure-preview">
                          {JSON.stringify(formExtraData, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-action-row">
                  <button type="button" onClick={handleDeleteEvent} className="admin-btn btn-danger">
                    <Trash2 size={16} />
                    {selectedEvent.isCustom ? (lang === 'cs' ? 'Smazat' : 'Delete') : (lang === 'cs' ? 'Skrýt' : 'Hide')}
                  </button>
                  <button type="submit" className="admin-btn btn-success">
                    <Save size={16} />{lang === 'cs' ? 'Uložit' : 'Save'}
                  </button>
                </div>

                {/* Live Event Card Preview */}
                <div className="admin-card-preview-container" style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={16} style={{ color: '#fbbf24' }} />
                      {lang === 'cs' ? 'Živý Náhled Karty Události' : 'Live Event Card Preview'}
                    </span>
                    {selectedEvent && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button type="button" onClick={() => handleExportSingleEvent('json')} className="admin-btn-xs" style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Download size={12} /> JSON
                        </button>
                        <button type="button" onClick={() => handleExportSingleEvent('txt')} className="admin-btn-xs" style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FileText size={12} /> TXT
                        </button>
                      </div>
                    )}
                  </div>
                  <EventCard
                    event={{
                      eventID: formEventID || 'preview_id',
                      name: formName || 'Preview Event',
                      eventType: formEventType || 'other',
                      heading: formHeading || getHeadingForType(formEventType),
                      link: formLink || 'https://leekduck.com',
                      image: formImage || '',
                      start: formStart ? new Date(formStart).toISOString() : new Date().toISOString(),
                      end: formEnd ? new Date(formEnd).toISOString() : new Date().toISOString(),
                      extraData: editMode === 'json'
                        ? (() => { try { return JSON.parse(formExtraDataJson); } catch { return formExtraData; } })()
                        : formExtraData
                    }}
                    lang={lang}
                    defaultExpanded={true}
                  />
                </div>
              </form>
            ) : (
              <div className="admin-form-placeholder">
                <Database size={48} className="db-placeholder-icon" />
                <p>{lang === 'cs' ? 'Vyberte událost nebo vytvořte novou.' : 'Select an event or create a new one.'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== TAB: SOCIAL MEDIA HUB (TikTok & Instagram) ===== */}
      {adminTab === 'social' && (
        <div className="admin-social-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="admin-card-glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Share2 size={24} style={{ color: 'var(--accent-color, #38bdf8)' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {lang === 'cs' ? 'Generátor & Publikace pro TikTok a Instagram' : 'TikTok & Instagram Infographic Publisher'}
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {lang === 'cs'
                    ? 'Vyberte událost nebo vygenerujte kompletní týdenní a měsíční přehled pro vaše sociální sítě.'
                    : 'Generate individual event graphics or full weekly and monthly infographic summaries for social media.'}
                </p>
              </div>
            </div>

            {/* Sub-tab Navigation Bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setSocialSubTab('single')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: socialSubTab === 'single' ? 'var(--accent-color, #38bdf8)' : 'rgba(255, 255, 255, 0.06)',
                  color: socialSubTab === 'single' ? '#090d16' : '#94a3b8',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Share2 size={15} />
                {lang === 'cs' ? '📸 Infografika Události & Auto-Post' : '📸 Single Event & Auto-Post'}
              </button>
              <button
                type="button"
                onClick={() => setSocialSubTab('summary')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: socialSubTab === 'summary' ? 'var(--accent-color, #38bdf8)' : 'rgba(255, 255, 255, 0.06)',
                  color: socialSubTab === 'summary' ? '#090d16' : '#94a3b8',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={15} />
                {lang === 'cs' ? '📅 Týdenní & Měsíční Shrnutí' : '📅 Weekly & Monthly Summaries'}
              </button>
            </div>

            {socialSubTab === 'single' ? (
              <>
                {/* Search & Filter Controls for Single Event Generation */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {/* Search bar + Reset button */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        type="text"
                        value={socialSearchQuery}
                        onChange={(e) => setSocialSearchQuery(e.target.value)}
                        placeholder={lang === 'cs' ? 'Hledat událost podle názvu, Pokémona či typu...' : 'Search event by title, Pokémon or type...'}
                        className="admin-input"
                        style={{ width: '100%', paddingLeft: '36px', paddingRight: socialSearchQuery ? '36px' : '12px', boxSizing: 'border-box' }}
                      />
                      {socialSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setSocialSearchQuery('')}
                          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Reset filters button */}
                    {(socialSearchQuery || socialFilterMonth !== 'all' || socialFilterYear !== 'all' || socialFilterType !== 'all' || socialFilterStatus !== 'all') && (
                      <button
                        type="button"
                        onClick={() => {
                          setSocialSearchQuery('');
                          setSocialFilterMonth('all');
                          setSocialFilterYear('all');
                          setSocialFilterType('all');
                          setSocialFilterStatus('all');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '9px 14px',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <RotateCcw size={13} />
                        {lang === 'cs' ? 'Reset filtrů' : 'Reset Filters'}
                      </button>
                    )}
                  </div>

                  {/* Filter Selectors: Year, Month, Type, Status */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {/* Month Filter */}
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        {lang === 'cs' ? '📅 Měsíc:' : '📅 Month:'}
                      </label>
                      <select
                        value={socialFilterMonth}
                        onChange={(e) => setSocialFilterMonth(e.target.value)}
                        className="admin-select"
                        style={{ width: '100%', padding: '7px 10px', fontSize: '0.8rem' }}
                      >
                        <option value="all">{lang === 'cs' ? 'Všechny měsíce' : 'All Months'}</option>
                        {(lang === 'cs' ? MONTH_OPTIONS_CS : MONTH_OPTIONS_EN).map(m => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        {lang === 'cs' ? '🗓️ Rok:' : '🗓️ Year:'}
                      </label>
                      <select
                        value={socialFilterYear}
                        onChange={(e) => setSocialFilterYear(e.target.value)}
                        className="admin-select"
                        style={{ width: '100%', padding: '7px 10px', fontSize: '0.8rem' }}
                      >
                        <option value="all">{lang === 'cs' ? 'Všechny roky' : 'All Years'}</option>
                        {socialAvailableYears.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        {lang === 'cs' ? '⚡ Typ události:' : '⚡ Event Type:'}
                      </label>
                      <select
                        value={socialFilterType}
                        onChange={(e) => setSocialFilterType(e.target.value)}
                        className="admin-select"
                        style={{ width: '100%', padding: '7px 10px', fontSize: '0.8rem' }}
                      >
                        <option value="all">{lang === 'cs' ? 'Všechny typy' : 'All Types'}</option>
                        {socialAvailableTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        {lang === 'cs' ? '⏳ Stav:' : '⏳ Status:'}
                      </label>
                      <select
                        value={socialFilterStatus}
                        onChange={(e) => setSocialFilterStatus(e.target.value as any)}
                        className="admin-select"
                        style={{ width: '100%', padding: '7px 10px', fontSize: '0.8rem' }}
                      >
                        <option value="all">{lang === 'cs' ? 'Všechny stavy' : 'All Statuses'}</option>
                        <option value="upcoming">{lang === 'cs' ? '⏳ Nadcházející' : '⏳ Upcoming'}</option>
                        <option value="active">{lang === 'cs' ? '🟢 Probíhající' : '🟢 Active'}</option>
                        <option value="past">{lang === 'cs' ? '⌛ Uplynulé' : '⌛ Past'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Event Select Dropdown & Counter */}
                <div className="form-field" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      {lang === 'cs' ? '1. Vyberte událost ze seznamu:' : '1. Select Event:'}
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-color, #38bdf8)', fontWeight: 600 }}>
                      {lang === 'cs' ? `Nalezeno: ${filteredSocialEvents.length} událostí` : `Found: ${filteredSocialEvents.length} events`}
                    </span>
                  </div>
                  <select
                    value={socialSelectedEventId}
                    onChange={(e) => setSocialSelectedEventId(e.target.value)}
                    className="admin-select"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)' }}
                  >
                    <option value="">-- {lang === 'cs' ? `Vyberte událost (${filteredSocialEvents.length} dostupných)` : `Select an event (${filteredSocialEvents.length} available)`} --</option>
                    {filteredSocialEvents.map(e => (
                      <option key={e.eventID} value={e.eventID}>
                        [{e.eventType}] {formatLocalizedString(e.name, lang)} ({new Date(e.start).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                {socialSelectedEvent ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px', alignItems: 'start' }}>
                    {/* Left Column: Interactive Event Infographic Generator */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                          {lang === 'cs' ? '📸 Generátor & Náhled Infografiky Události (4:5)' : '📸 Live Event Infographic Generator (4:5)'}
                        </h4>
                      </div>
                      
                      {(() => {
                        const type = socialSelectedEvent.eventType;
                        const nameLower = typeof socialSelectedEvent.name === 'string' ? socialSelectedEvent.name.toLowerCase() : '';

                        if (type === 'pokemon-spotlight-hour') {
                          return <SpotlightInfographic event={socialSelectedEvent} lang={lang} isAdmin={true} />;
                        }
                        if (type === 'community-day' || type === 'hatch-day' || type === 'research-day') {
                          return <CommunityDayInfographic event={socialSelectedEvent} lang={lang} isAdmin={true} />;
                        }
                        if (type === 'max-mondays' || nameLower.includes('max') || nameLower.includes('dynamax')) {
                          return <MaxInfographic event={socialSelectedEvent} lang={lang} isAdmin={true} />;
                        }
                        if (type === 'raid-battles' || type === 'raid-day' || type === 'shadow-raid' || type === 'mega-raid' || type === 'raid-hour') {
                          return <RaidInfographic event={socialSelectedEvent} lang={lang} showTabs={true} isAdmin={true} />;
                        }
                        if (type === 'team-go-rocket' || nameLower.includes('rocket')) {
                          return <RocketInfographic event={socialSelectedEvent} lang={lang} isAdmin={true} />;
                        }

                        return <EventInfographic event={socialSelectedEvent} lang={lang} isAdmin={true} />;
                      })()}
                    </div>

                    {/* Right Column: Social Caption Generator & Webhook Publishing */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                            {lang === 'cs' ? '📝 Popisek pro Instagram / TikTok:' : '📝 IG / TikTok Caption:'}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedSocialCaption);
                              setSocialCopied(true);
                              setTimeout(() => setSocialCopied(false), 2000);
                            }}
                            className="admin-btn btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          >
                            {socialCopied ? <Check size={13} style={{ color: '#4ade80' }} /> : <Copy size={13} />}
                            {socialCopied ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Zkopírovat popisek' : 'Copy Caption')}
                          </button>
                        </div>
                        <textarea
                          rows={10}
                          value={generatedSocialCaption}
                          onChange={(e) => setGeneratedSocialCaption(e.target.value)}
                          style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '10px',
                            padding: '10px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontFamily: 'monospace',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      {/* Webhook Configuration & Auto-Post Trigger */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                        <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>
                          {lang === 'cs' ? '🔗 Webhook URL (Make.com / Zapier / Buffer):' : '🔗 Webhook URL (Make.com / Zapier / Buffer):'}
                        </label>
                        <input
                          type="text"
                          placeholder="https://hook.eu1.make.com/your-custom-webhook-id"
                          value={socialWebhookUrl}
                          onChange={(e) => {
                            setSocialWebhookUrl(e.target.value);
                            localStorage.setItem('pogo_admin_social_webhook_url', e.target.value);
                          }}
                          style={{ width: '100%', padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: '#fff', marginBottom: '10px' }}
                        />

                        {socialSendStatus && (
                          <div style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            marginBottom: '10px',
                            background: socialSendStatus.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                            color: socialSendStatus.type === 'success' ? '#4ade80' : '#f87171',
                            border: `1px solid ${socialSendStatus.type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
                          }}>
                            {socialSendStatus.text}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleSendSocialWebhook}
                          disabled={socialSending || !socialWebhookUrl.trim()}
                          className="admin-btn btn-primary"
                          style={{ width: '100%', padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          <Send size={15} />
                          {socialSending
                            ? (lang === 'cs' ? 'Odesílám...' : 'Sending...')
                            : (lang === 'cs' ? 'Odeslat na Webhook (Auto-post na IG / TikTok)' : 'Send to Webhook (Auto-post IG/TikTok)')}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {lang === 'cs' ? 'Vyberte událost ze seznamu výše pro generování popisku a podkladů.' : 'Select an event above to generate captions and media.'}
                  </div>
                )}
              </>
            ) : (
              /* Summary Infographics Tab (Weekly & Monthly Overview) */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <MonthSummaryInfographic events={scrapedEvents} lang={lang} isAdmin={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== TAB: POKEMON ICONS MANAGER ===== */}
      {adminTab === 'icons' && (
        <div className="admin-icons-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="admin-card-glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.25)', background: 'linear-gradient(135deg, rgba(20, 15, 35, 0.9), rgba(10, 10, 20, 0.9))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Sparkles size={24} style={{ color: '#a855f7' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                  {lang === 'cs' ? 'Globální správa ikonek Pokémonů' : 'Global Pokémon Icons Manager'}
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {lang === 'cs'
                    ? 'Zde můžete změnit ikonu nebo sprite jakéhokoliv Pokémona v celé aplikaci (raidy, spawny, líhnutí, žebříčky).'
                    : 'Change the icon or sprite for any Pokémon globally across the app (raids, spawns, eggs, rankings).'}
                </p>
              </div>
            </div>

            {iconsMsg && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                marginBottom: '16px',
                background: iconsMsg.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                color: iconsMsg.type === 'success' ? '#4ade80' : '#f87171',
                border: `1px solid ${iconsMsg.type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`
              }}>
                {iconsMsg.text}
              </div>
            )}

            {/* Form to Add/Edit a Pokémon Icon */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                {lang === 'cs' ? '✏️ Přidat / Upravit ikonu Pokémona' : '✏️ Add / Edit Pokémon Icon'}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {lang === 'cs' ? 'Název Pokémona:' : 'Pokémon Name:'}
                  </label>
                  <input
                    type="text"
                    placeholder="např. Pikachu, Mewtwo, Kyurem"
                    value={editingPokemonName}
                    onChange={(e) => setEditingPokemonName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {lang === 'cs' ? 'URL adresa vlastního obrázku / spritu:' : 'Custom Image / Sprite URL:'}
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={editingPokemonUrl}
                      onChange={(e) => setEditingPokemonUrl(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '0.85rem' }}
                    />
                    {editingPokemonUrl && (
                      <img
                        src={editingPokemonUrl}
                        alt="preview"
                        style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}
                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Presets */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                <input type="file" accept="image/*" ref={pokemonIconFileInputRef} onChange={handlePokemonIconFileUpload} style={{ display: 'none' }} />
                <button
                  type="button"
                  className="admin-btn btn-secondary"
                  onClick={() => pokemonIconFileInputRef.current?.click()}
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Upload size={13} /> {lang === 'cs' ? 'Nahrát fotku z PC/Mobilu' : 'Upload photo from PC/Mobile'}
                </button>

                {editingPokemonName && (
                  <>
                    <button
                      type="button"
                      className="admin-btn btn-secondary"
                      onClick={() => {
                        const nameClean = editingPokemonName.toLowerCase().trim();
                        setEditingPokemonUrl(`https://img.pokemondb.net/sprites/home/shiny/${nameClean}.png`);
                      }}
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      🌟 Shiny 3D Sprite
                    </button>

                    <button
                      type="button"
                      className="admin-btn btn-secondary"
                      onClick={() => {
                        const nameClean = editingPokemonName.toLowerCase().trim();
                        setEditingPokemonUrl(`https://img.pokemondb.net/artwork/large/${nameClean}.jpg`);
                      }}
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      🎨 Official Artwork
                    </button>
                  </>
                )}

                <button
                  type="button"
                  className="admin-btn btn-primary"
                  onClick={() => {
                    const key = editingPokemonName.toLowerCase().trim();
                    if (!key || !editingPokemonUrl.trim()) return;
                    const next = { ...iconOverrides, [key]: editingPokemonUrl.trim() };
                    handleSaveIconOverrides(next);
                    setEditingPokemonName('');
                    setEditingPokemonUrl('');
                  }}
                  disabled={!editingPokemonName.trim() || !editingPokemonUrl.trim() || iconsSaving}
                  style={{ padding: '6px 14px', fontSize: '0.78rem', marginLeft: 'auto' }}
                >
                  <Plus size={13} /> {lang === 'cs' ? 'Uložit ikonu Pokémona' : 'Save Pokémon Icon'}
                </button>
              </div>
            </div>

            {/* List of Current Overrides */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                  {lang === 'cs' ? '📋 Aktivní změněné ikony Pokémonů' : '📋 Active Custom Pokémon Icons'}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    ({Object.keys(iconOverrides).length})
                  </span>
                </h4>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder={lang === 'cs' ? 'Hledat v ikonách...' : 'Search icons...'}
                    value={iconSearchQuery}
                    onChange={(e) => setIconSearchQuery(e.target.value)}
                    style={{ padding: '5px 10px', fontSize: '0.78rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.4)', color: '#fff' }}
                  />
                </div>
              </div>

              {Object.keys(iconOverrides).length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {lang === 'cs' ? 'Zatím nebyly nastaveny žádné vlastní ikony Pokémonů.' : 'No custom Pokémon icon overrides set yet.'}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                  {Object.entries(iconOverrides)
                    .filter(([name]) => name.toLowerCase().includes(iconSearchQuery.toLowerCase()))
                    .map(([name, url]) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <img
                          src={url}
                          alt={name}
                          style={{ width: '40px', height: '40px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '2px' }}
                          onError={(e) => (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
                        />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'capitalize', color: '#fff' }}>{name}</div>
                          <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: '0.7rem', color: 'var(--accent-color)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                            {url}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = { ...iconOverrides };
                            delete next[name];
                            handleSaveIconOverrides(next);
                          }}
                          style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}
                          title={lang === 'cs' ? 'Smazat úpravu ikony' : 'Delete icon override'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB: SCRAPER ===== */}
      {adminTab === 'scraper' && (
        <div className="admin-scraper-panel">
          <div className="scraper-status-card">
            <div className="scraper-status-header">
              <RefreshCw size={20} className={scraperStatus?.isRunning ? 'spin-icon' : ''} />
              <h3>{lang === 'cs' ? 'Stav Scraperu' : 'Scraper Status'}</h3>
            </div>
            {scraperStatus ? (
              <div className="scraper-stats-grid">
                <div className="scraper-stat">
                  <span className="scraper-stat-label">{lang === 'cs' ? 'Poslední scrape' : 'Last scraped'}</span>
                  <span className="scraper-stat-val">
                    {scraperStatus.lastScrapedAt ? new Date(scraperStatus.lastScrapedAt).toLocaleString() : '—'}
                  </span>
                </div>
                <div className="scraper-stat">
                  <span className="scraper-stat-label">{lang === 'cs' ? 'Příští scrape' : 'Next scrape'}</span>
                  <span className="scraper-stat-val">
                    {scraperStatus.nextScrapeAt ? new Date(scraperStatus.nextScrapeAt).toLocaleString() : '—'}
                  </span>
                </div>
                <div className="scraper-stat">
                  <span className="scraper-stat-label">{lang === 'cs' ? 'Celkem eventů' : 'Total events'}</span>
                  <span className="scraper-stat-val scraper-stat-highlight">{scraperStatus.totalEvents}</span>
                </div>
                <div className="scraper-stat">
                  <span className="scraper-stat-label">{lang === 'cs' ? 'Stav' : 'Status'}</span>
                  <span className={`scraper-running-badge ${scraperStatus.isRunning ? 'running' : 'idle'}`}>
                    {scraperStatus.isRunning ? '🔄 Running' : '✅ Idle'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="scraper-no-data">{lang === 'cs' ? 'Načítám...' : 'Loading...'}</p>
            )}
            <div className="scraper-actions">
              {successMsg && <div className="admin-form-success"><CheckCircle size={14} /><span>{successMsg}</span></div>}
              {error && <div className="admin-form-error"><AlertTriangle size={14} /><span>{error}</span></div>}
              <button
                className="admin-btn btn-primary scraper-trigger-btn"
                onClick={() => handleTriggerScraper(false)}
                disabled={scraperRunning || scraperStatus?.isRunning}
              >
                <RefreshCw size={16} className={scraperRunning ? 'spin-icon' : ''} />
                {scraperRunning ? (lang === 'cs' ? 'Spouštím...' : 'Starting...') : (lang === 'cs' ? 'Spustit Scraper nyní' : 'Run Scraper Now')}
              </button>
              <button
                className="admin-btn btn-secondary"
                onClick={() => handleTriggerScraper(true)}
                disabled={scraperRunning}
                title={lang === 'cs' ? 'Vynutit opětovný sběr všech eventů' : 'Force re-scraping all events'}
              >
                ⚡ {lang === 'cs' ? 'Vynutit nový start' : 'Force Re-scrape'}
              </button>
              <button className="admin-btn btn-secondary" onClick={fetchScraperStatus}>
                {lang === 'cs' ? 'Obnovit stav' : 'Refresh Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB: IMPORT ===== */}
      {adminTab === 'import' && (
        <div className="admin-import-panel">
          <div className="import-info-card">
            <h3><Upload size={18} />{lang === 'cs' ? 'Import JSON souborů' : 'Import JSON Files'}</h3>
            <p className="import-desc">
              {lang === 'cs'
                ? 'Nahrajte JSON soubor se scraped daty (pole eventů nebo objekt s klíčem "events"). Každý event musí mít eventID a name.'
                : 'Upload a JSON file with scraped data (array of events or object with "events" key). Each event must have eventID and name.'}
            </p>
          </div>

          <div
            className={`import-drop-zone ${importDragOver ? 'drag-over' : ''} ${importFile ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setImportDragOver(true); }}
            onDragLeave={() => setImportDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt"
              style={{ display: 'none' }}
              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            />
            {importFile ? (
              <div className="import-file-ready">
                <FileJson size={32} className="import-file-icon" />
                <strong>{importFile.name}</strong>
                <span>{(importFile.size / 1024).toFixed(1)} KB</span>
                <button type="button" className="import-clear-btn" onClick={(e) => { e.stopPropagation(); setImportFile(null); setImportResult(null); }}>
                  <X size={14} />{lang === 'cs' ? 'Odebrat' : 'Remove'}
                </button>
              </div>
            ) : (
              <div className="import-drop-hint">
                <Upload size={32} />
                <strong>{lang === 'cs' ? 'Přetáhněte nebo klikněte' : 'Drag & Drop or Click'}</strong>
                <span>{lang === 'cs' ? '.json nebo .txt soubor' : '.json or .txt file'}</span>
              </div>
            )}
          </div>

          <div className="import-options">
            <label className="import-mode-label">{lang === 'cs' ? 'Režim importu:' : 'Import mode:'}</label>
            <div className="import-mode-btns">
              <button
                type="button"
                className={`mode-toggle-btn ${importMode === 'merge' ? 'active' : ''}`}
                onClick={() => setImportMode('merge')}
              >
                {lang === 'cs' ? '🔀 Sloučit (zachovat existující)' : '🔀 Merge (keep existing)'}
              </button>
              <button
                type="button"
                className={`mode-toggle-btn ${importMode === 'replace' ? 'active' : ''}`}
                onClick={() => setImportMode('replace')}
              >
                {lang === 'cs' ? '🔄 Přepsat (aktualizovat existující)' : '🔄 Replace (update existing)'}
              </button>
            </div>
          </div>

          {error && <div className="admin-form-error"><AlertTriangle size={16} /><span>{error}</span></div>}

          {importResult && (
            <div className="import-result-card">
              <CheckCircle size={20} className="import-success-icon" />
              <div className="import-result-stats">
                <span>✅ {lang === 'cs' ? 'Přidáno' : 'Added'}: <strong>{importResult.added}</strong></span>
                <span>🔄 {lang === 'cs' ? 'Aktualizováno' : 'Updated'}: <strong>{importResult.updated}</strong></span>
                <span>⏭ {lang === 'cs' ? 'Přeskočeno' : 'Skipped'}: <strong>{importResult.skipped}</strong></span>
                <span>📦 {lang === 'cs' ? 'Celkem v DB' : 'Total in DB'}: <strong>{importResult.total}</strong></span>
              </div>
            </div>
          )}

          <button
            className="admin-btn btn-success import-execute-btn"
            onClick={handleFileImport}
            disabled={!importFile || importLoading}
          >
            {importLoading ? (
              <><RefreshCw size={16} className="spin-icon" />{lang === 'cs' ? 'Importuji...' : 'Importing...'}</>
            ) : (
              <><Upload size={16} />{lang === 'cs' ? 'Spustit Import' : 'Execute Import'}</>
            )}
          </button>

          {/* Export Scraped Data & Text Files Section */}
          <div className="export-section-card" style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={16} />
              {lang === 'cs' ? 'Export Scrapovaných Dat (JSON & Textové soubory)' : 'Export Scraped Data (JSON & Text files)'}
            </h4>
            <p className="import-desc" style={{ marginBottom: '12px' }}>
              {lang === 'cs'
                ? 'Stáhněte si kompletní databázi scrapovaných událostí ve formátu JSON nebo jako strukturovaný textový soubor (.txt) se všemi detaily.'
                : 'Download full database of scraped events in JSON format or as structured text files (.txt) with all event details.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => handleExportScrapedData('json')} className="admin-btn btn-secondary">
                <Download size={14} /> Export Vše (JSON)
              </button>
              <button onClick={() => handleExportScrapedData('txt')} className="admin-btn btn-secondary">
                <FileText size={14} /> Export Vše (TXT Scrape)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB: CACHE ===== */}
      {adminTab === 'cache' && (
        <div className="admin-cache-panel">
          <div className="cache-stats-card">
            <h3><Server size={18} />{lang === 'cs' ? 'Statistiky Cache' : 'Cache Statistics'}</h3>
            {cacheStats ? (
              <div className="cache-stats-grid">
                <div className="cache-stat-item">
                  <span className="cache-stat-label">{lang === 'cs' ? 'Soubory v cache' : 'Cache files'}</span>
                  <span className="cache-stat-val">{cacheStats.cacheFileCount}</span>
                </div>
                <div className="cache-stat-item">
                  <span className="cache-stat-label">{lang === 'cs' ? 'Velikost cache' : 'Cache size'}</span>
                  <span className="cache-stat-val">{cacheStats.cacheSizeKB} KB</span>
                </div>
                <div className="cache-stat-item">
                  <span className="cache-stat-label">{lang === 'cs' ? 'Poslední scrape' : 'Last scraped'}</span>
                  <span className="cache-stat-val">
                    {cacheStats.scraperMeta?.lastScrapedAt
                      ? new Date(cacheStats.scraperMeta.lastScrapedAt).toLocaleString()
                      : '—'}
                  </span>
                </div>
                <div className="cache-stat-item">
                  <span className="cache-stat-label">{lang === 'cs' ? 'Stav scraperu' : 'Scraper status'}</span>
                  <span className={`scraper-running-badge ${cacheStats.isScraperRunning ? 'running' : 'idle'}`}>
                    {cacheStats.isScraperRunning ? '🔄 Running' : '✅ Idle'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="scraper-no-data">{lang === 'cs' ? 'Načítám...' : 'Loading...'}</p>
            )}
            <button className="admin-btn btn-secondary" onClick={fetchCacheStats}>
              <RefreshCw size={14} />{lang === 'cs' ? 'Obnovit' : 'Refresh'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

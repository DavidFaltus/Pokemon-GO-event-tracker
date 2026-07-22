import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AdminPanelView.css';
import type { Language } from '../data/translations';
import { API_BASE_URL } from '../config';
import {
  ArrowLeft, Lock, Plus, Trash2, Save, AlertTriangle, CheckCircle,
  EyeOff, Search, Edit, Database, Upload, RefreshCw, Server,
  Image, PackageOpen, ChevronDown, ChevronUp, X, FileJson, Zap,
  Star, Egg, Swords, Gift, Download, FileText, Sparkles, ExternalLink
} from 'lucide-react';
import { EventCard } from './EventCard';
import type { EventData } from './EventCard';
import { getPokemonIconUrl } from '../utils/imageResolver';

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
}> = ({ value, onChange, placeholder = 'Pokémon name...' }) => {
  const [showChips, setShowChips] = useState(false);
  const iconUrl = value.trim() ? getPokemonIconUrl(value.trim()) : null;

  return (
    <div className="poke-icon-picker-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
      <div className="poke-icon-picker">
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
        />
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
}> = ({ data, onChange, lang }) => {
  const safe = data || {};

  // Bonuses
  const bonuses: string[] = safe.bonuses || [];
  const setBonuses = (b: string[]) => onChange({ ...safe, bonuses: b });

  // Spawns
  const spawns: PokemonEntry[] = safe.spawns || [];
  const setSpawns = (s: PokemonEntry[]) => onChange({ ...safe, spawns: s });

  // Raids
  const raidBosses: RaidBoss[] = safe.raidbattles?.bosses || [];
  const setRaidBosses = (r: RaidBoss[]) => onChange({ ...safe, raidbattles: { ...(safe.raidbattles || {}), bosses: r } });

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

// ============================================================
// Main AdminPanelView component
// ============================================================

type AdminTab = 'events' | 'scraper' | 'import' | 'cache';

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ lang, onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [adminTab, setAdminTab] = useState<AdminTab>('events');

  // Events state
  const [scrapedEvents, setScrapedEvents] = useState<EventData[]>([]);
  const [customOverrides, setCustomOverrides] = useState<CustomEventOverride[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CustomEventOverride | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listFilter, setListFilter] = useState<'all' | 'custom' | 'hidden'>('all');

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
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
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
      const resPublic = await fetch(`${API_BASE_URL}/api/events`);
      const eventsData = await resPublic.json();
      setScrapedEvents(eventsData);

      const resAdmin = await fetch(`${API_BASE_URL}/api/admin/events`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (resAdmin.ok) {
        const overrides = await resAdmin.json();
        setCustomOverrides(overrides);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const fetchScraperStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/scraper/status`);
      if (res.ok) setScraperStatus(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchCacheStats = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/cache-stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setCacheStats(await res.json());
    } catch { /* silent */ }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchScraperStatus();
      fetchCacheStats();
    }
  }, [isLoggedIn, fetchScraperStatus, fetchCacheStats]);

  useEffect(() => {
    if (adminTab === 'scraper' && isLoggedIn) fetchScraperStatus();
    if (adminTab === 'cache' && isLoggedIn) fetchCacheStats();
  }, [adminTab, isLoggedIn, fetchScraperStatus, fetchCacheStats]);

  const selectEventForEditing = async (event: EventData | CustomEventOverride) => {
    setError('');
    setSuccessMsg('');
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
    const fmt = (s: string) => s ? s.substring(0, 16) : '';
    setFormStart(fmt(activeEvent.start));
    setFormEnd(fmt(activeEvent.end));
    setFormIsDeleted(activeEvent.isDeleted || false);
    const extra = activeEvent.extraData || {};
    setFormExtraData(extra);
    setFormExtraDataJson(JSON.stringify(extra, null, 2));

    // Fetch full details asynchronously to populate the form and prevent data loss
    setDetailsLoading(true);
    try {
      let url = `${API_BASE_URL}/api/events/${activeEvent.eventID}/details`;
      const queryParams = [];
      if (activeEvent.link) queryParams.push(`link=${encodeURIComponent(activeEvent.link)}`);
      if (activeEvent.name) queryParams.push(`name=${encodeURIComponent(activeEvent.name)}`);
      if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

      const res = await fetch(url);
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
    } catch (err) {
      console.error("Failed to fetch event details for editing:", err);
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
      rawDescription: formScrapedText
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
      start: isoStart,
      end: isoEnd,
      extraData: finalExtraData,
      isDeleted: formIsDeleted,
      isCustom: selectedEvent?.isCustom || false
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(eventPayload)
      });
      const data = await res.json();
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
      const res = await fetch(`${API_BASE_URL}/api/admin/events/${selectedEvent.eventID}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
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

  const handleTriggerScraper = async () => {
    setScraperRunning(true);
    setError(''); setSuccessMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/scrape`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Scraper spuštěn na pozadí!' : 'Scraper started in background!');
        setTimeout(fetchScraperStatus, 3000);
      } else {
        setError(data.message || 'Failed to start scraper');
      }
    } catch { setError('Network error'); }
    finally { setScraperRunning(false); }
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
      const res = await fetch(`${API_BASE_URL}/api/admin/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ events: eventsToImport, mode: importMode })
      });
      const result = await res.json();
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

  const getHeadingForType = (type: string): string => {
    switch (type) {
      case 'community-day': return 'Community Day';
      case 'pokemon-spotlight-hour': return 'Spotlight Hour';
      case 'raid-hour': return 'Raid Hour';
      case 'raid-battles': return 'Raid Battles';
      case 'rocket-takeover': return 'Rocket Takeover';
      case 'hatch-day': return 'Hatch Day';
      case 'limited-research': return 'Limited Research';
      case 'showcase': return 'PokéStop Showcase';
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
                      <option value="rocket-takeover">Rocket Takeover</option>
                      <option value="hatch-day">Hatch Day</option>
                      <option value="limited-research">Limited Research</option>
                      <option value="showcase">PokéStop Showcase</option>
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

                  {/* Image with live preview */}
                  <div className="form-field full-width-field">
                    <label><Image size={12} style={{ display: 'inline', marginRight: '4px' }} />{lang === 'cs' ? 'Obrázek (URL)' : 'Image URL'}</label>
                    <div className="image-url-row">
                      <input type="text" value={formImage} onChange={(e) => setFormImage(e.target.value)} />
                      {formImage && (
                        <img src={formImage} alt="preview" className="image-url-preview" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
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
                onClick={handleTriggerScraper}
                disabled={scraperRunning || scraperStatus?.isRunning}
              >
                <RefreshCw size={16} className={scraperRunning ? 'spin-icon' : ''} />
                {scraperRunning ? (lang === 'cs' ? 'Spouštím...' : 'Starting...') : (lang === 'cs' ? 'Spustit Scraper nyní' : 'Run Scraper Now')}
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import './EventCard.css';
import { findRaidCounters } from '../data/raidCounters';
import type { RaidCounters } from '../data/raidCounters';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { getSpecialEventDetails, getPokemonImage } from '../data/specialEvents';
import { findPokemonMeta } from '../data/pokemonMeta';
import { useDynamicEventDetails } from '../hooks/useDynamicEventDetails';
import { Calendar, ExternalLink, Star, Sparkles, Gift, Leaf, Search, Swords, Flame, RefreshCw, Plus, Check, Image as ImageIcon, LayoutList } from 'lucide-react';
import { CounterItem, WeatherIcon } from './CounterItem';
import { resolveImage, handlePokemonImageError, getBasePokemonName, getBasePokemonNames, getPokemonIconUrl } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { getRegionalInfo } from '../utils/regionalHelper';
import { DirectRaidFilterBox } from './DirectRaidFilterBox';
import { RaidDifficultyBox } from './RaidDifficultyBox';
import { CommunityDayInfographic } from './CommunityDayInfographic';
import { SpotlightInfographic } from './SpotlightInfographic';
import { RaidInfographic } from './RaidInfographic';
import { RocketInfographic } from './RocketInfographic';
import { MaxInfographic } from './MaxInfographic';
import { EventInfographic } from './EventInfographic';
import { MultiBossAvatar } from './MultiBossAvatar';

const EggIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill="currentColor" stroke="none"/>
  </svg>
);

export function shouldDisableExternalLinks(event?: EventData | null): boolean {
  if (!event) return false;
  const type = (event.eventType || '').toLowerCase();
  const id = (event.eventID || '').toLowerCase();
  const name = (event.name || '').toLowerCase();

  const disabledTypes = [
    'raid-hour',
    'raid-battles',
    'raid-rotation',
    'raid-day',
    'raid-weekend',
    'pokemon-spotlight-hour',
    'spotlight-hour',
    'max-monday',
    'max-mondays',
    'dynamax-monday',
    'dynamax-mondays',
    'go-battle-league',
    'pvp',
    'pvp-event'
  ];

  if (disabledTypes.includes(type)) return true;

  const disabledKeywords = [
    'raid hour',
    'raid rotation',
    'spotlight hour',
    'dynamax monday',
    'max monday',
    'great league',
    'master league',
    'ultra league',
    'little cup',
    'single type cup'
  ];

  if (disabledKeywords.some(kw => id.includes(kw) || name.includes(kw))) {
    return true;
  }

  return false;
}

export interface EventData {
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
  extraData?: {
    raidbattles?: {
      bosses?: { name: string; image: string; canBeShiny: boolean }[];
      shinies?: { name: string; image: string }[];
    };
    spotlight?: {
      name: string;
      canBeShiny: boolean;
      image: string;
      bonus: string;
      list?: { name: string; canBeShiny: boolean; image: string }[];
    };
    communityday?: {
      spawns?: { name: string; image: string }[];
      bonuses?: { text: string; image?: string }[];
      bonusDisclaimers?: string[];
      shinies?: { name: string; image: string }[];
      specialresearch?: {
        name?: string;
        step: number;
        tasks: { text: string; reward?: { text: string; image: string } }[];
        rewards?: { text: string; image?: string }[];
      }[];
    };
    generic?: {
      hasSpawns: boolean;
      hasFieldResearchTasks: boolean;
    };
  };
}

export interface LocalizedString {
  cs?: string;
  en?: string;
  ja?: string;
}

export function getLocalizedText(
  value: any,
  lang: Language = 'en'
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (lang === 'ja' && value.ja) return value.ja;
    if (lang === 'cs' && value.cs) return value.cs;
    return value.en || value.cs || value.ja || '';
  }
  return String(value);
}

function getBonusInfo(b: any, lang: Language): { text: string; icon: string; image?: string } {
  if (!b) return { text: '', icon: '🎁' };
  if (typeof b === 'string') return { text: b, icon: '🎁' };
  const icon = b.icon || '🎁';
  const image = b.image;
  const text = getLocalizedText(b.text, lang);
  return { text, icon, image };
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class CardErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("EventCard error caught by CardErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '16px',
          margin: '12px 0',
          borderRadius: '12px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          fontSize: '0.85rem'
        }}>
          ⚠️ {this.props.fallbackMessage || 'Chyba při zobrazení detailu události.'}
        </div>
      );
    }
    return this.props.children;
  }
}

const typeTranslations: Record<string, { cs: string; en: string; ja: string }> = {
  normal: { cs: "Normální", en: "Normal", ja: "ノーマル" },
  fire: { cs: "Ohnivý", en: "Fire", ja: "ほのお" },
  water: { cs: "Vodní", en: "Water", ja: "みず" },
  grass: { cs: "Travní", en: "Grass", ja: "くさ" },
  electric: { cs: "Elektrický", en: "Electric", ja: "でんき" },
  ice: { cs: "Ledový", en: "Ice", ja: "こおり" },
  fighting: { cs: "Bojový", en: "Fighting", ja: "かくとう" },
  poison: { cs: "Jedovatý", en: "Poison", ja: "どく" },
  ground: { cs: "Zemní", en: "Ground", ja: "じめん" },
  flying: { cs: "Létající", en: "Flying", ja: "ひこう" },
  psychic: { cs: "Psychický", en: "Psychic", ja: "エスパー" },
  bug: { cs: "Hmyzí", en: "Bug", ja: "むし" },
  rock: { cs: "Kamenný", en: "Rock", ja: "いわ" },
  ghost: { cs: "Duchovní", en: "Ghost", ja: "ゴースト" },
  dragon: { cs: "Dračí", en: "Dragon", ja: "ドラゴン" },
  steel: { cs: "Ocelový", en: "Steel", ja: "はがね" },
  dark: { cs: "Temný", en: "Dark", ja: "あく" },
  fairy: { cs: "Vílí", en: "Fairy", ja: "フェアリー" }
};

export const TypeBadge: React.FC<{ typeStr: string; lang?: Language }> = ({ typeStr, lang = 'en' }) => {
  const lower = typeStr.toLowerCase();
  let typeClass = 'normal';
  let label = 'Normal';

  if (lower.includes('ghost')) { typeClass = 'ghost'; }
  else if (lower.includes('dark')) { typeClass = 'dark'; }
  else if (lower.includes('bug')) { typeClass = 'bug'; }
  else if (lower.includes('fire')) { typeClass = 'fire'; }
  else if (lower.includes('ground')) { typeClass = 'ground'; }
  else if (lower.includes('dragon')) { typeClass = 'dragon'; }
  else if (lower.includes('ice')) { typeClass = 'ice'; }
  else if (lower.includes('fairy')) { typeClass = 'fairy'; }
  else if (lower.includes('fighting')) { typeClass = 'fighting'; }
  else if (lower.includes('psychic')) { typeClass = 'psychic'; }
  else if (lower.includes('flying') || lower.includes('fly')) { typeClass = 'flying'; }
  else if (lower.includes('poison')) { typeClass = 'poison'; }
  else if (lower.includes('steel')) { typeClass = 'steel'; }
  else if (lower.includes('water')) { typeClass = 'water'; }
  else if (lower.includes('grass')) { typeClass = 'grass'; }
  else if (lower.includes('rock')) { typeClass = 'rock'; }
  else if (lower.includes('electric')) { typeClass = 'electric'; }
  else if (lower.includes('normal')) { typeClass = 'normal'; }

  const trans = typeTranslations[typeClass];
  if (trans) {
    label = lang === 'ja' ? trans.ja : (lang === 'cs' ? trans.cs : trans.en);
  }

  // Support 2x indicator in label
  if (lower.includes('2x')) {
    label += ' (2x)';
  }

  return (
    <span className={`type-badge pogo-type-${typeClass}`}>
      <img
        src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`}
        alt={label}
        className="type-badge-icon"
      />
      <span className="type-badge-text">{label}</span>
    </span>
  );
};

interface EventCardProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  defaultExpanded?: boolean;
  useInline?: boolean;
  priority?: boolean;
  onOpenFilterGenerator?: (bossName?: string) => void;
  onToggleExpand?: (eventID: string, expanded: boolean) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  lang,
  timezone,
  defaultExpanded,
  useInline: propsUseInline,
  priority,
  onOpenFilterGenerator,
  onToggleExpand
}) => {
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [status, setStatus] = useState<'upcoming' | 'active' | 'ended'>('upcoming');
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded || false);

  useEffect(() => {
    if (defaultExpanded !== undefined) {
      setIsExpanded(defaultExpanded);
    }
  }, [defaultExpanded]);
  const [useInline, setUseInline] = useState<boolean>(propsUseInline ?? false);
  const [officialUrl, setOfficialUrl] = useState<string>('');
  const [showOfficial, setShowOfficial] = useState<boolean>(false);
  const [, setShowLeekDuck] = useState<boolean>(true);

  const t = translations[lang] || translations.cs;

  // Load special event guides (manual overlays/fallbacks)
  const staticDetails = getSpecialEventDetails(event.eventID, event.name);
  const { details: dynamicDetails, loading: dynamicLoading } = useDynamicEventDetails(event.eventID, event.link, isExpanded && !staticDetails, event.name);
  const specialDetails = staticDetails || dynamicDetails;




  // Check raid bosses (handling all possible formats: array of objects, array of strings, comma-separated string, or tier object)
  const getRaidBossesList = (extraData: any): any[] => {
    if (!extraData) return [];
    let list: any[] = [];
    if (Array.isArray(extraData.raidbattles?.bosses)) list = extraData.raidbattles.bosses;
    else if (Array.isArray(extraData.raids)) list = extraData.raids;
    else if (Array.isArray(extraData.raidBosses)) list = extraData.raidBosses;
    else if (Array.isArray(extraData.bosses)) list = extraData.bosses;
    else if (extraData.raidbattles?.tiers && typeof extraData.raidbattles.tiers === 'object') {
      Object.values(extraData.raidbattles.tiers).forEach((tb: any) => {
        if (Array.isArray(tb)) list.push(...tb);
      });
    }

    const flat: any[] = [];
    list.forEach(item => {
      if (typeof item === 'string' && item.includes(',')) {
        item.split(',').forEach(s => { if (s.trim()) flat.push({ name: s.trim() }); });
      } else if (typeof item === 'object' && item?.name && typeof item.name === 'string' && item.name.includes(',') && !item.isSingle) {
        item.name.split(',').forEach((s: string) => { if (s.trim()) flat.push({ ...item, name: s.trim() }); });
      } else {
        flat.push(item);
      }
    });
    return flat;
  };

  const bosses = getRaidBossesList(event.extraData);

  // Find raid counters
  const matchedRaidCounters: RaidCounters[] = [];
  const titleRaidMatch = findRaidCounters(event.name);
  if (titleRaidMatch) {
    matchedRaidCounters.push(titleRaidMatch);
  }
  bosses.forEach(boss => {
    const bossRaidMatch = findRaidCounters(boss.name);
    if (bossRaidMatch && !matchedRaidCounters.some(c => c.bossName === bossRaidMatch.bossName)) {
      matchedRaidCounters.push(bossRaidMatch);
    }
  });

  const getGoogleCalendarUrl = () => {
    const formatToGoogleCalendarUtc = (dateStr: string): string => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      const pad = (n: number) => n.toString().padStart(2, '0');
      const year = d.getUTCFullYear();
      const month = pad(d.getUTCMonth() + 1);
      const day = pad(d.getUTCDate());
      const hours = pad(d.getUTCHours());
      const minutes = pad(d.getUTCMinutes());
      const seconds = pad(d.getUTCSeconds());
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const utcStart = formatToGoogleCalendarUtc(event.start);
    const utcEnd = formatToGoogleCalendarUtc(event.end);

    // Build rich details text for Google Calendar
    const descriptionParts: string[] = [];
    
    // Event Type
    descriptionParts.push(`${lang === 'cs' ? 'Typ události' : 'Event Type'}: ${getEventTypeLabel(event.eventType)}`);
    
    // Raid Bosses
    if (bosses.length > 0) {
      const bossNames = bosses.map(b => b.name + (b.canBeShiny ? ' (✨ Shiny)' : '')).join(', ');
      descriptionParts.push(`${lang === 'cs' ? 'Raid Bossi' : 'Raid Bosses'}: ${bossNames}`);
    }
    
    // Counters Info
    if (matchedRaidCounters.length > 0) {
      const counterInfo = matchedRaidCounters.map(c => {
        return `- ${c.bossName}: Max CP ${c.maxCp} (100% IV), Boosted Max CP ${c.maxBoostedCp} (${c.weatherBoosts.join('/')})`;
      }).join('\n');
      descriptionParts.push(`${lang === 'cs' ? 'Přehled Bossů' : 'Boss Overview'}:\n${counterInfo}`);
    }
    
    // Link to details
    descriptionParts.push(`${lang === 'cs' ? 'Oficiální odkaz' : 'Official Link'}: ${event.link}`);
    descriptionParts.push(`--- \n${lang === 'cs' ? 'Exportováno z Pokemon GO Event Tracker' : 'Exported from Pokemon GO Event Tracker'}`);

    const details = descriptionParts.join('\n\n');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${utcStart}/${utcEnd}&details=${encodeURIComponent(details)}&sf=true&output=xml`;
  };

  const getOfficialEventLink = (): string => {
    const cleanId = event.eventID.toLowerCase();
    const cleanName = event.name.toLowerCase();
    const eventType = event.eventType;

    // Exclude types that do not have standalone news posts on the official blog
    if (
      eventType === "pokemon-spotlight-hour" ||
      eventType === "raid-hour" ||
      eventType === "raid-battles" ||
      eventType === "go-battle-league" ||
      eventType === "showcase" ||
      cleanId.includes("spotlight") ||
      cleanId.includes("raidhour") ||
      cleanId.includes("raid-battles")
    ) {
      return "";
    }

    // 1. Exact hardcoded mappings for known events
    if (cleanId.includes("go-fest-2026") || cleanName.includes("go fest 2026")) {
      return "https://gofest.pokemongolive.com/";
    }
    if (cleanId.includes("road-of-legends-2026") || cleanName.includes("road of legends")) {
      return "https://pokemongolive.com/post/road-of-legends-2026-global/";
    }
    if (cleanId.includes("flying-taxi-taken-over-2026") || cleanName.includes("taken over") || cleanName.includes("taken-over")) {
      return "https://pokemongolive.com/post/flying-taxi-taken-over-2026/";
    }
    if (cleanId.includes("flying-taxi-2026") || cleanId.includes("flying-taxi-squawkabilly-debut") || cleanName.includes("flying taxi")) {
      return "https://pokemongolive.com/post/flying-taxi-squawkabilly-debut/";
    }
    if (cleanId.includes("rocket-takeover-june-2026") || cleanName.includes("shadow landorus") || cleanName.includes("team go rocket takeover")) {
      return "https://pokemongolive.com/post/flying-taxi-squawkabilly-debut/";
    }
    if (cleanId.includes("go-pass-june-2026") || cleanName.includes("go pass")) {
      return "https://pokemongolive.com/seasons/forever-forward";
    }
    if (cleanId.includes("season-23-forever-forward") || cleanName.includes("forever forward")) {
      return "https://pokemongolive.com/seasons/forever-forward";
    }

    // 2. Community Days
    if (eventType === "community-day" || cleanId.includes("community-day") || cleanId.includes("communityday")) {
      let pokeName = "";
      if (cleanName.includes("frigibax")) pokeName = "frigibax";
      else if (cleanName.includes("bagon")) pokeName = "bagon";
      else if (cleanName.includes("beldum")) pokeName = "beldum";
      else if (cleanName.includes("goomy")) pokeName = "goomy";
      else if (cleanName.includes("litten")) pokeName = "litten";
      else if (cleanName.includes("rowlet")) pokeName = "rowlet";
      else if (cleanName.includes("popplio")) pokeName = "popplio";
      else if (cleanName.includes("bellsprout")) pokeName = "bellsprout";
      else if (cleanName.includes("chansey")) pokeName = "chansey";

      let year = "2026";
      if (event.start) {
        const matchYear = event.start.match(/^(\d{4})/);
        if (matchYear) year = matchYear[1];
      }

      let month = "june";
      if (event.start) {
        const dateObj = new Date(event.start);
        if (!isNaN(dateObj.getTime())) {
          const monthsEng = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
          month = monthsEng[dateObj.getMonth()];
        }
      }

      if (pokeName) {
        return `https://pokemongolive.com/post/${pokeName}-community-day-${month}-${year}/`;
      }
    }

    // 3. Heuristics fallback for other major/special events (like special Raid Days or Research Days)
    let slug = cleanName
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[-\s]+/g, '-');
    
    slug = slug
      .replace(/-june-\d{4}$/, '')
      .replace(/-july-\d{4}$/, '')
      .replace(/-august-\d{4}$/, '')
      .replace(/-september-\d{4}$/, '');

    let year = "2026";
    if (event.start) {
      const matchYear = event.start.match(/^(\d{4})/);
      if (matchYear) year = matchYear[1];
    }

    return `https://pokemongolive.com/post/${slug}-${year}/`;
  };

  // Calculate status and countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      if (now < startTime) {
        setStatus('upcoming');
        const diffMs = startTime.getTime() - now.getTime();
        setTimeLeftStr(formatTimeDiff(diffMs, t.status_starts_in));
      } else if (now >= startTime && now <= endTime) {
        setStatus('active');
        const diffMs = endTime.getTime() - now.getTime();
        setTimeLeftStr(formatTimeDiff(diffMs, t.status_ends_in));
      } else {
        setStatus('ended');
        setTimeLeftStr(t.status_ended_label);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [event, t]);

  // Check the validity of the official URL asynchronously and toggle visibility
  useEffect(() => {
    if (event.link && event.link.includes('pokemongolive.com')) {
      setOfficialUrl(event.link);
      setShowOfficial(true);
      setShowLeekDuck(false);
      return;
    }

    let active = true;
    
    const verifyLink = async () => {
      const link = getOfficialEventLink();
      const cleanId = event.eventID.toLowerCase();
      
      if (!link) {
        if (active) {
          setShowOfficial(false);
          setShowLeekDuck(true);
        }
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const proxyLink = `https://api.allorigins.win/raw?url=${encodeURIComponent(link)}`;
        const response = await fetch(proxyLink, { 
          method: 'GET', 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);

        if (response.status >= 200 && response.status < 400) {
          const text = await response.text();
          const lowerText = text.toLowerCase();
          const has404Text = lowerText.includes('404 not found') || 
                             lowerText.includes('page not found') || 
                             lowerText.includes("page you're looking for doesn't exist");
          
          if (!has404Text) {
            if (active) {
              setOfficialUrl(link);
              setShowOfficial(true);
              setShowLeekDuck(false); // Hide Leek Duck since official works!
            }
            return;
          }
        }
      } catch (err) {
        // Fallback for CORS block in desktop browser environment
        const error = err as any;
        const isCORS = err instanceof TypeError || (error && (error.message === "Failed to fetch" || error.name === "AbortError"));
        if (isCORS) {
          const isHardcodedOrCD = 
            link.includes("gofest.pokemongolive.com") || 
            link.includes("road-of-legends-2026-global") || 
            link.includes("flying-taxi-squawkabilly-debut") ||
            link.includes("flying-taxi-taken-over-2026") ||
            link.includes("seasons/forever-forward") ||
            ((event.eventType === "community-day" || cleanId.includes("community-day") || cleanId.includes("communityday")) && link.includes("community-day"));

          if (isHardcodedOrCD) {
            if (active) {
              setOfficialUrl(link);
              setShowOfficial(true);
              setShowLeekDuck(false);
            }
            return;
          }
        }
      }

      // If URL is invalid, 404, or checks failed
      if (active) {
        setShowOfficial(false);
        setShowLeekDuck(true); // Show Leek Duck since official is 404 / failed!
      }
    };

    verifyLink();

    return () => {
      active = false;
    };
  }, [event]);

  const formatTimeDiff = (diffMs: number, prefix: string): string => {
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${prefix}${diffDays}d ${diffHours % 24}h`;
    }
    if (diffHours > 0) {
      return `${prefix}${diffHours}h ${diffMins % 60}m`;
    }
    return `${prefix}${diffMins}m`;
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'pokemon-spotlight-hour': return 'Spotlight Hour';
      case 'raid-hour': return 'Raid Hour';
      case 'community-day': return 'Community Day';
      case 'raid-battles': return lang === 'cs' ? 'Raid Rotace' : 'Raid Rotation';
      case 'rocket-takeover': return 'Rocket Takeover';
      case 'go-battle-league': return 'GO Battle League';
      case 'max-mondays': return 'Max Mondays';
      case 'season': return lang === 'cs' ? 'Sezóna' : 'Season';
      default: return event.heading || 'Event';
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone || undefined
    });
  };

  // Translation helper for Spotlight Hour bonuses
  const translateSpotlightBonus = (bonus: string): string => {
    if (lang !== 'cs') return bonus;
    const lower = bonus.toLowerCase();
    if (lower.includes('transfer candy')) return '2× Candy za posílání (Transfer)';
    if (lower.includes('catch candy')) return '2× Candy za chycení';
    if (lower.includes('evolve xp')) return '2× XP za evoluci';
    if (lower.includes('catch stardust')) return '2× Stardust za chycení';
    if (lower.includes('catch xp')) return '2× XP za chycení';
    return bonus;
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
      onToggleExpand?.(event.eventID, false);
      return;
    }

    if (cardRef.current && cardRef.current.parentElement) {
      const parent = cardRef.current.parentElement;
      const siblings = Array.from(parent.children) as HTMLElement[];
      const cardSiblings = siblings.filter(el => 
        el !== cardRef.current && 
        (el.classList.contains('event-card') || el.classList.contains('raid-boss-card')) &&
        el.offsetParent !== null
      );

      if (cardSiblings.length === 0) {
        setUseInline(true);
        setIsExpanded(true);
        onToggleExpand?.(event.eventID, true);
        return;
      }

      const currentTop = cardRef.current.offsetTop;
      const hasSiblingInSameRow = cardSiblings.some(sibling => 
        Math.abs(sibling.offsetTop - currentTop) < 12
      );

      setUseInline(!hasSiblingInSameRow);
    } else {
      setUseInline(window.innerWidth < 600);
    }

    setIsExpanded(true);
    onToggleExpand?.(event.eventID, true);
  };

  useEffect(() => {
    if (isExpanded && !useInline) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsExpanded(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isExpanded, useInline]);

  const renderExpandedDetails = () => {
    const isLinkDisabled = shouldDisableExternalLinks(event);
    const officialTarget = event.officialLink || (showOfficial && officialUrl !== event.link ? officialUrl : '');
    const hasOfficial = !isLinkDisabled && Boolean(officialTarget);
    const secondaryTarget = event.secondaryLink || (!hasOfficial && !isLinkDisabled ? event.link : '');
    const hasSecondary = !isLinkDisabled && Boolean(secondaryTarget && secondaryTarget !== officialTarget);

    return (
      <CardErrorBoundary fallbackMessage={lang === 'cs' ? 'Chyba při zobrazení detailu události' : 'Error rendering event details'}>
        <div className="card-expanded-content">
          <div className="divider"></div>
          
          {/* Add to Calendar & Official Link Row */}
              <div className="expanded-row link-row">
                {hasOfficial && (
                  <a 
                    href={officialTarget} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="pogo-official-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ExternalLink size={14} />
                    {t.details_pokemongo_link}
                  </a>
                )}
                {hasSecondary && (
                  <a 
                    href={secondaryTarget} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="details-link-btn" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ExternalLink size={14} />
                    {secondaryTarget.includes('leekduck.com') 
                      ? t.details_official_link 
                      : (lang === 'cs' ? 'Průvodce / Odkaz' : 'Guide / Link')}
                  </a>
                )}
                <a 
                  href={getGoogleCalendarUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="google-calendar-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Calendar size={14} />
                  {t.details_add_to_calendar}
                </a>
            </div>

            {dynamicLoading && (
              <div className="dynamic-loading-indicator" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={14} className="animate-spin" />
                {lang === 'cs' ? 'Načítám podrobnosti z Leek Duck...' : 'Loading details from Leek Duck...'}
              </div>
            )}

            {/* Infographic Poster View (Exclusive Event View) */}
            <div className="expanded-row infographic-wrapper-row" style={{ marginTop: '12px' }}>
              {(() => {
                const type = (event.eventType || '').toLowerCase();
                const name = (event.name || '').toLowerCase();

                if (type === 'pokemon-spotlight-hour' || name.includes('spotlight')) {
                  return <SpotlightInfographic event={event} lang={lang} timezone={timezone} />;
                }
                if (type === 'community-day' || name.includes('community day')) {
                  return <CommunityDayInfographic event={event} lang={lang} timezone={timezone} />;
                }
                if (type.includes('raid') || name.includes('raid')) {
                  return <RaidInfographic event={event} lang={lang} timezone={timezone} />;
                }
                if (type.includes('rocket') || name.includes('rocket')) {
                  return <RocketInfographic event={event} lang={lang} timezone={timezone} />;
                }
                if (type.includes('max') || type.includes('dynamax') || name.includes('max monday') || name.includes('max battle') || name.includes('gigantamax')) {
                  return <MaxInfographic event={event} lang={lang} timezone={timezone} />;
                }
                return (
                  <EventInfographic
                    event={event}
                    lang={lang}
                    timezone={timezone}
                    specialDetails={specialDetails}
                  />
                );
              })()}
            </div>
          </div>
        </CardErrorBoundary>
    );
  };

  return (
    <>
      <div 
        ref={cardRef}
        className={`event-card status-${status} type-${event.eventType} ${isExpanded && useInline ? 'expanded-inline' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-top">
          <div className="event-img-wrapper">
            {(event.eventType?.toLowerCase().includes('spotlight') ||
              event.eventType?.toLowerCase().includes('community') ||
              event.eventType?.toLowerCase().includes('max-monday') ||
              event.eventType?.toLowerCase().includes('max-battle') ||
              event.name?.toLowerCase().includes('spotlight') ||
              event.name?.toLowerCase().includes('community') ||
              event.name?.toLowerCase().includes('max monday') ||
              event.name?.toLowerCase().includes('max battle') ||
              bosses.length > 1) ? (
              <MultiBossAvatar bosses={bosses} eventName={event.name} eventType={event.eventType} size={56} />
            ) : (
              <img 
                src={resolveImage(event.image, event.eventType, event.name)} 
                alt={event.name}
                width={100}
                height={100}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, event.name)}
              />
            )}
            <span className={`status-pill ${status}`}>
              {status === 'active' ? (lang === 'cs' ? '● Probíhá' : '● Active') : status === 'upcoming' ? (lang === 'cs' ? 'Připravuje se' : 'Upcoming') : (lang === 'cs' ? 'Ukončeno' : 'Ended')}
            </span>
          </div>
          
          <div className="event-details">
            <span className={`event-type-badge ${event.eventType}`}>
              {getEventTypeLabel(event.eventType)}
            </span>
            <h3 className="event-title">
              {shouldDisableExternalLinks(event) ? (
                <span style={{ color: 'inherit' }}>{event.name}</span>
              ) : (
                <a 
                  href={`/${lang}/events/${event.eventID}`} 
                  onClick={(e) => { e.preventDefault(); handleCardClick(); }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {event.name}
                </a>
              )}
            </h3>
            <div className="event-time-info">
              <span className="time-date" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {formatDate(event.start)} – {formatDate(event.end)}
              </span>
              <span className="time-countdown">{timeLeftStr}</span>
            </div>
          </div>

          <div className="expand-indicator">
            {isExpanded ? '▲' : '▼'}
          </div>
        </div>

        {/* Inline Expansion (single item in row / mobile) */}
        {isExpanded && useInline && renderExpandedDetails()}
      </div>

      {/* Glassmorphic Modal Overlay (multiple items in row) */}
      {isExpanded && !useInline && (
        <div className="event-modal-overlay" onClick={() => { setIsExpanded(false); onToggleExpand?.(event.eventID, false); }}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => { setIsExpanded(false); onToggleExpand?.(event.eventID, false); }} aria-label="Close">
              ✕
            </button>

            <div className="modal-header-section">
              <div className="event-img-wrapper large">
                <img 
                  src={resolveImage(event.image, event.eventType, event.name)} 
                  alt={event.name}
                  width={320}
                  height={180}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    handlePokemonImageError(e.target as HTMLImageElement, getBasePokemonName(event.name) || '');
                  }}
                />
                <span className={`status-pill ${status}`}>
                  {status === 'active' ? (lang === 'cs' ? '● Probíhá' : '● Active') : status === 'upcoming' ? (lang === 'cs' ? 'Připravuje se' : 'Upcoming') : (lang === 'cs' ? 'Ukončeno' : 'Ended')}
                </span>
              </div>
              
              <div className="modal-header-info">
                <span className={`event-type-badge ${event.eventType}`}>
                  {getEventTypeLabel(event.eventType)}
                </span>
                <h3 className="event-title">
                  {shouldDisableExternalLinks(event) ? (
                    <span style={{ color: 'inherit' }}>{event.name}</span>
                  ) : (
                    <a 
                      href={`/${lang}/events/${event.eventID}`} 
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {event.name}
                    </a>
                  )}
                </h3>
                <div className="event-time-info">
                  <span className="time-date" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {formatDate(event.start)} – {formatDate(event.end)}
                  </span>
                  <span className="time-countdown">{timeLeftStr}</span>
                </div>
              </div>
            </div>

            {renderExpandedDetails()}
          </div>
        </div>
      )}
    </>
  );
};

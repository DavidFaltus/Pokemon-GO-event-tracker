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
import { Calendar, ExternalLink, Star, Sparkles, Gift, Leaf, Search, Swords, Flame, RefreshCw, Plus, Check } from 'lucide-react';
import { CounterItem, WeatherIcon } from './CounterItem';
import { resolveImage, handlePokemonImageError, getBasePokemonName, getBasePokemonNames, getPokemonIconUrl } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';

const EggIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill="currentColor" stroke="none"/>
  </svg>
);

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
}

export const EventCard: React.FC<EventCardProps> = ({ event, lang, timezone, defaultExpanded }) => {
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [status, setStatus] = useState<'upcoming' | 'active' | 'ended'>('upcoming');
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded || false);
  const [officialUrl, setOfficialUrl] = useState<string>('');
  const [showOfficial, setShowOfficial] = useState<boolean>(false);
  const [showLeekDuck, setShowLeekDuck] = useState<boolean>(true);

  const t = translations[lang] || translations.cs;

  // Load special event guides (manual overlays/fallbacks)
  const staticDetails = getSpecialEventDetails(event.eventID, event.name);
  const { details: dynamicDetails, loading: dynamicLoading } = useDynamicEventDetails(event.eventID, event.link, isExpanded && !staticDetails, event.name);
  const specialDetails = staticDetails || dynamicDetails;

  // Spawns checklist tick tracker
  const [tickedSpawns, setTickedSpawns] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(`pogo_spawns_${event.eventID}`);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleSpawnTicked = (spawnName: string) => {
    let updated;
    if (tickedSpawns.includes(spawnName)) {
      updated = tickedSpawns.filter(name => name !== spawnName);
    } else {
      updated = [...tickedSpawns, spawnName];
    }
    setTickedSpawns(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pogo_spawns_${event.eventID}`, JSON.stringify(updated));
    }
  };


  // Check raid bosses
  const bosses = event.extraData?.raidbattles?.bosses || [];

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
  const [useInline, setUseInline] = useState<boolean>(false);

  const handleCardClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
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

  const renderExpandedDetails = () => (
    <CardErrorBoundary fallbackMessage={lang === 'cs' ? 'Chyba při zobrazení detailu události' : 'Error rendering event details'}>
      <div className="card-expanded-content">
        <div className="divider"></div>
        
        {/* Add to Calendar & Official Link Row */}
            <div className="expanded-row link-row">
              {(event.officialLink || (showOfficial && officialUrl !== event.link)) && (
                <a 
                  href={event.officialLink || officialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pogo-official-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={14} />
                  {t.details_pokemongo_link}
                </a>
              )}
              {(event.secondaryLink || event.link) && (
                <a 
                  href={event.secondaryLink || event.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="details-link-btn" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={14} />
                  {(event.secondaryLink || event.link).includes('leekduck.com') 
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

            {/* TEMPLATE 1: SPOTLIGHT HOUR TEMPLATE */}
            {event.eventType === 'pokemon-spotlight-hour' && event.extraData?.spotlight && (
              <div className="expanded-row spotlight-hour-details-box">
                <div className="spotlight-content-grid">
                  <div className="spotlight-pokemon-info">
                    <img 
                      src={resolveImage(event.extraData?.spotlight?.image || getPokemonImage(event.extraData?.spotlight?.name || ''), event.eventType, event.extraData?.spotlight?.name)} 
                      alt={event.extraData?.spotlight?.name || ''} 
                      className="spotlight-pokemon-img"
                      onError={(e) => {
                        handlePokemonImageError(e.target as HTMLImageElement, event.extraData?.spotlight?.name || '');
                      }}
                    />
                    <div className="spotlight-poke-meta">
                      <strong>{event.extraData.spotlight.name}</strong>
                      {event.extraData.spotlight.canBeShiny && (
                        <span className="shiny-indicator-badge">✨ Shiny</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="spotlight-bonus-info">
                    <div className="bonus-pill-large">
                      <span className="bonus-icon">🍬</span>
                      <div className="bonus-text-wrapper">
                        <span className="bonus-label">{lang === 'cs' ? 'Aktivní Bonus:' : 'Active Bonus:'}</span>
                        <strong className="bonus-val">
                          {translateSpotlightBonus(event.extraData.spotlight.bonus || '')}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meta recommendations */}
                {(() => {
                  const meta = findPokemonMeta(event.extraData?.spotlight?.name || '');
                  if (!meta) return null;
                  return (
                    <div className="spotlight-meta-recommendations">
                      <h5>📊 PvE & PvP Meta Analysis</h5>
                      <div className="meta-ratings-row">
                        <div className="rating-badge">PvE: <strong className={`rating-val val-${meta.pveRating}`}>{meta.pveRating}</strong></div>
                        <div className="rating-badge">PvP: <strong className={`rating-val val-${meta.pvpRating}`}>{meta.pvpRating}</strong></div>
                      </div>
                      <p className="meta-rank-desc"><strong>PvE:</strong> {lang === 'cs' ? meta.pveRankText.cs : meta.pveRankText.en}</p>
                      <p className="meta-rank-desc"><strong>PvP:</strong> {lang === 'cs' ? meta.pvpRankText.cs : meta.pvpRankText.en}</p>
                      <div className="meta-moves">
                        <strong>{lang === 'cs' ? 'Doporučené útoky:' : 'Best Moves:'}</strong> 
                        <code>{meta.bestFastMove} + {meta.bestChargedMove}</code>
                      </div>
                      <p className="meta-notes-text">💡 <em>{lang === 'cs' ? meta.notes.cs : meta.notes.en}</em></p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TEMPLATE 2: COMMUNITY DAY TEMPLATE */}
            {event.eventType === 'community-day' && (
              <div className="expanded-row community-day-details-box">
                {(() => {
                  const cd = event.extraData?.communityday;
                  const featuredPokemon = cd?.spawns?.[0]?.name || event.name.replace(/community\s*day/gi, "").replace(/classic/gi, "").trim();
                  const meta = findPokemonMeta(featuredPokemon);
                  const dexImage = cd?.spawns?.[0]?.image || getPokemonImage(featuredPokemon);
                  
                  const liveBonuses = cd?.bonuses || [];
                  let specialMove = "";
                  let localBonuses = specialDetails?.bonuses || [];
                  const moveBonus = localBonuses.find((b: any) => getBonusInfo(b, lang).icon === '⚔️');
                  if (moveBonus) {
                    specialMove = getBonusInfo(moveBonus, lang).text;
                  }

                  return (
                    <>
                      {/* Featured Spawns */}
                      <div className="cd-spawns-section">
                        <h5>{t.details_spawns}</h5>
                        <div className="cd-spawns-flex">
                          <div className="cd-spawn-card">
                            <img 
                              src={resolveImage(dexImage, event.eventType, featuredPokemon)} 
                              alt={featuredPokemon} 
                              className="cd-spawn-img" 
                              onError={(e) => {
                                handlePokemonImageError(e.target as HTMLImageElement, featuredPokemon);
                              }}
                            />
                            <span className="cd-spawn-name">{featuredPokemon}</span>
                            <span className="shiny-badge-mini">✨ Shiny Rate ~1:25</span>
                          </div>
                          {cd?.shinies && cd.shinies.length > 0 && (
                            <div className="cd-shiny-family">
                              <h6>{lang === 'cs' ? 'Evoluce a Shiny formy:' : 'Shiny Family:'}</h6>
                              <div className="shiny-family-flex">
                                {cd.shinies.map((s: any) => (
                                  <div key={s.name} className="shiny-family-item">
                                    <img 
                                      src={resolveImage(s.image, event.eventType, s.name)} 
                                      alt={getPokemonName(s.name, lang)} 
                                      onError={(e) => {
                                        handlePokemonImageError(e.target as HTMLImageElement, s.name);
                                      }}
                                    />
                                    <span>{getPokemonName(s.name, lang)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CD Bonuses */}
                      <div className="cd-bonuses-section">
                        <h5>{t.details_bonuses}</h5>
                        
                        {specialMove && (
                          <div className="cd-special-move-box">
                            <span className="move-icon">⚔️</span>
                            <div className="move-text">
                              <strong>{lang === 'cs' ? 'Exkluzivní útok:' : 'Exclusive Move:'}</strong>
                              <p>{specialMove}</p>
                            </div>
                          </div>
                        )}

                        <div className="cd-bonuses-grid">
                          {liveBonuses.map((b: any, idx: number) => {
                            const { text: bText, image: bImg } = getBonusInfo(b, lang);
                            return (
                              <div key={idx} className="cd-bonus-item">
                                {bImg ? <img src={bImg} alt="bonus" className="cd-bonus-icon-img" /> : <span className="cd-bonus-emoji">🎁</span>}
                                <span>{bText}</span>
                              </div>
                            );
                          })}
                          {liveBonuses.length === 0 && localBonuses.filter((b: any) => getBonusInfo(b, lang).icon !== '⚔️').map((b: any, idx: number) => {
                            const { text: bText, icon: bIcon } = getBonusInfo(b, lang);
                            return (
                              <div key={idx} className="cd-bonus-item">
                                <span className="cd-bonus-emoji">{bIcon}</span>
                                <span>{bText}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Special Research Steps */}
                      {cd?.specialresearch && cd.specialresearch.length > 0 && (
                        <div className="cd-research-section">
                          <h5>🏆 {lang === 'ja' ? 'スペシャルリサーチ:' : lang === 'cs' ? 'Úkoly speciálního výzkumu:' : 'Special Research:'}</h5>
                          {cd.specialresearch.map((step: any, sIdx: number) => {
                            const getStepName = (name: string) => {
                              if (lang === 'ja') {
                                let jaName = name;
                                jaName = jaName.replace(/Community Day/gi, 'コミュニティデイ');
                                const basePoke = getBasePokemonNames().find(p => jaName.toLowerCase().includes(p.toLowerCase()));
                                if (basePoke) {
                                  jaName = jaName.replace(new RegExp(basePoke, 'gi'), getPokemonName(basePoke, 'ja'));
                                }
                                return jaName;
                              }
                              return name;
                            };
                            const stepLabel = step.name ? getStepName(step.name) : `${lang === 'cs' ? 'Krok' : 'Step'} ${step.step}`;
                            return (
                              <div key={sIdx} className="cd-research-step-box">
                                <h6>{stepLabel}</h6>
                              <ul className="cd-tasks-list">
                                {step.tasks?.map((task: any, tIdx: number) => (
                                  <li key={tIdx} className="cd-task-item-li">
                                    <span>{getLocalizedText(task.text, lang)}</span>
                                    {task.reward && (
                                      <span className="cd-task-reward">
                                        🎁 {getLocalizedText(task.reward.text || task.reward, lang)}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )})}
                        </div>
                      )}

                      {/* Meta Analysis */}
                      {meta && (
                        <div className="cd-meta-section">
                          <h5>📊 {lang === 'ja' ? 'メタ分析（対戦＆レイド）' : 'PvE & PvP Meta Analysis'}</h5>
                          <div className="meta-ratings-row">
                            <div className="rating-badge">PvE: <strong className={`rating-val val-${meta.pveRating}`}>{meta.pveRating}</strong></div>
                            <div className="rating-badge">PvP: <strong className={`rating-val val-${meta.pvpRating}`}>{meta.pvpRating}</strong></div>
                          </div>
                          <p className="meta-rank-desc"><strong>PvE:</strong> {lang === 'cs' ? meta.pveRankText.cs : meta.pveRankText.en}</p>
                          <p className="meta-rank-desc"><strong>PvP:</strong> {lang === 'cs' ? meta.pvpRankText.cs : meta.pvpRankText.en}</p>
                          <div className="meta-moves">
                            <strong>{lang === 'cs' ? 'Doporučené útoky:' : 'Best Moveset:'}</strong> 
                            <code>{meta.bestFastMove} + {meta.bestChargedMove}</code>
                          </div>
                          <p className="meta-notes-text">💡 <em>{lang === 'cs' ? meta.notes.cs : meta.notes.en}</em></p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* TEMPLATE 3: GENERAL SPECIAL EVENT GUIDE (if loaded locally and not CD/Spotlight) */}
            {event.eventType !== 'pokemon-spotlight-hour' && event.eventType !== 'community-day' && specialDetails && (
              <div className="expanded-row special-event-guide-box">
                <div className="special-guide-header">
                  <h4 style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className="duotone-icon duotone-yellow"><Star size={18} fill="currentColor" /></span>
                    {t.details_special_event_title}
                  </h4>
                </div>

                {/* Debuts */}
                {specialDetails.debuts && specialDetails.debuts.length > 0 && (
                  <div className="special-subsection debuts">
                    <h5 style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span className="duotone-icon duotone-blue"><Sparkles size={16} /></span>
                      {t.details_debuts}
                    </h5>
                    <div className="debuts-flex">
                      {specialDetails.debuts.map((d: any, index: number) => {
                        const debutName = getLocalizedText(d?.name, lang);
                        const englishName = typeof d?.name === 'object' ? (d.name.en || d.name.cs || '') : (typeof d?.name === 'string' ? d.name : '');
                        const debutDesc = getLocalizedText(d?.description, lang);
                        return (
                          <div key={index} className="debut-item">
                            <img 
                              src={resolveImage(d?.image, event.eventType, englishName)} 
                              alt={debutName} 
                              className="debut-img" 
                              onError={(e) => {
                                handlePokemonImageError(e.target as HTMLImageElement, englishName);
                              }}
                            />
                            <div className="debut-info">
                              <strong className="debut-name">{debutName}</strong>
                              <p className="debut-desc">{debutDesc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bonuses */}
                {specialDetails.bonuses && specialDetails.bonuses.length > 0 && (
                  <div className="special-subsection bonuses">
                    <h5 style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span className="duotone-icon duotone-purple"><Gift size={16} /></span>
                      {t.details_bonuses}
                    </h5>
                    <div className="special-bonuses-grid">
                      {specialDetails.bonuses.map((b: any, idx: number) => {
                        const { text: bText, icon: bIcon } = getBonusInfo(b, lang);
                        return (
                          <div key={idx} className="special-bonus-card">
                            <span className="bonus-emoji">{bIcon}</span>
                            <p className="bonus-text-label">{bText}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Spawns */}
                {specialDetails.spawns && specialDetails.spawns.length > 0 && (
                  <div className="special-subsection spawns">
                    <h5 style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span className="duotone-icon duotone-green"><Leaf size={16} /></span>
                      {t.details_spawns}
                    </h5>
                    <div className="spawns-grid">
                      {specialDetails.spawns.map((s: any, idx: number) => {
                        const spawnName = typeof s === 'string' ? s : getLocalizedText(s?.name, lang);
                        const englishName = typeof s === 'object' && s?.name ? (typeof s.name === 'object' ? s.name.en : s.name) : (typeof s === 'string' ? s : '');
                        const isTicked = tickedSpawns.includes(spawnName);
                        const habitatText = s?.habitat ? getLocalizedText(s.habitat, lang) : '';
                        return (
                          <div 
                            key={spawnName || idx} 
                            className={`spawn-card ${isTicked ? 'ticked' : ''} ${s?.isHighPriority ? 'priority' : ''}`}
                            onClick={() => toggleSpawnTicked(spawnName)}
                          >
                            <div className="spawn-tick-indicator" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                              {isTicked ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                            </div>
                            <img 
                              src={resolveImage(s?.image, event.eventType, englishName || spawnName)} 
                              alt={getPokemonName(englishName || spawnName, lang)} 
                              className="spawn-img" 
                              onError={(e) => {
                                handlePokemonImageError(e.target as HTMLImageElement, englishName || spawnName);
                              }}
                            />
                            <span className="spawn-name">{getPokemonName(englishName || spawnName, lang)}</span>
                            {habitatText && (
                              <span className="spawn-habitat">{habitatText}</span>
                            )}
                            <div className="spawn-badges">
                              {s?.isHighPriority && (
                                <span className="spawn-priority-badge" title={t.details_priority_spawn} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <Star size={10} fill="currentColor" stroke="none" /> Meta
                                </span>
                              )}
                              {s?.isShinyAvailable && (
                                <span className="spawn-shiny-badge" title={t.details_shiny_short} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                  <Sparkles size={10} fill="currentColor" stroke="none" />
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Eggs */}
                {specialDetails.eggs && specialDetails.eggs.length > 0 && (
                  <div className="special-subsection eggs">
                    <h5 style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span className="duotone-icon duotone-orange"><EggIcon size={16} /></span>
                      {t.details_eggs}
                    </h5>
                    <div className="eggs-section-container">
                      {specialDetails.eggs.map((egg: any, eggIdx: number) => {
                        const dist = typeof egg?.distance === 'string' ? egg.distance : getLocalizedText(egg?.distance, lang);
                        return (
                          <div key={dist || eggIdx} className="egg-pool-row">
                            <div className="egg-pool-header" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              <span className="egg-icon-large" style={{ display: 'inline-flex', color: '#fb923c' }}><EggIcon size={24} /></span>
                              <h6>{lang === 'ja' ? `${dist} のプール` : `${dist} Pool`}</h6>
                            </div>
                            <div className="egg-contents-flex">
                              {egg.contents?.map((p: any, pIdx: number) => {
                                const pName = typeof p === 'string' ? p : (p?.name ? (typeof p.name === 'object' ? p.name.en : p.name) : '');
                                const localizedName = typeof p === 'object' && p?.name ? getLocalizedText(p.name, lang) : pName;
                                return (
                                  <div key={pName || pIdx} className="egg-pokemon-item">
                                    <img 
                                      src={resolveImage(p?.image, event.eventType, pName)} 
                                      alt={localizedName} 
                                      onError={(e) => {
                                        handlePokemonImageError(e.target as HTMLImageElement, pName);
                                      }}
                                    />
                                    <span className="egg-p-name">{getPokemonName(pName || localizedName, lang)}</span>
                                    {p?.isShinyAvailable && (
                                      <span className="shiny-star" style={{ display: 'inline-flex' }}>
                                        <Sparkles size={10} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Field Research */}
                {specialDetails.research && specialDetails.research.length > 0 && (
                  <div className="special-subsection research">
                    <h5 style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span className="duotone-icon duotone-blue"><Search size={16} /></span>
                      {t.details_research}
                    </h5>
                    <div className="research-tasks-list">
                      {specialDetails.research.map((r: any, idx: number) => {
                        const taskText = getLocalizedText(r?.task, lang);
                        const rewardText = getLocalizedText(r?.reward, lang);
                        return (
                          <div key={idx} className="research-task-item">
                            <div className="task-left" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              <span className="search-icon" style={{ display: 'inline-flex', color: '#60a5fa' }}><Search size={14} /></span>
                              <span className="task-text">{taskText}</span>
                            </div>
                            <div className="task-right" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              {rewardText && (
                                <span className="task-reward" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  <Gift size={12} style={{ color: '#c084fc' }} />
                                  {rewardText}
                                </span>
                              )}
                              {r?.isShinyAvailable && (
                                <span className="shiny-star-research" style={{ display: 'inline-flex' }}>
                                  <Sparkles size={10} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 4: RAID BOSSES & COUNTERS */}
            {bosses.length > 0 && (
              <div className="expanded-row raid-bosses-row">
                <h4 style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span className="duotone-icon duotone-red"><Swords size={18} /></span>
                  {t.details_raid_bosses}
                </h4>
                <div className="bosses-flex">
                  {bosses.map((boss: any, bIdx: number) => {
                    const bossName = typeof boss === 'string' ? boss : (boss?.name || '');
                    const englishName = typeof boss === 'object' && boss?.name ? boss.name : (typeof boss === 'string' ? boss : '');
                    const canBeShiny = typeof boss === 'object' ? !!boss?.canBeShiny : false;
                    return (
                      <div key={bossName || bIdx} className="boss-item">
                        <img 
                          src={resolveImage(typeof boss === 'object' ? boss?.image : undefined, event.eventType, englishName)} 
                          alt={getPokemonName(bossName, lang)} 
                          onError={(e) => {
                            handlePokemonImageError(e.target as HTMLImageElement, englishName);
                          }}
                        />
                        <span className="boss-name">{getPokemonName(bossName, lang)}</span>
                        {canBeShiny && (
                          <span className="shiny-indicator" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles size={10} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} /> Shiny
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {matchedRaidCounters.length > 0 && (
              <div className="expanded-row raid-counters-row">
                <h4 style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span className="duotone-icon duotone-orange"><Flame size={18} fill="none" /></span>
                  {t.details_recommended_counters}
                </h4>
                {matchedRaidCounters.map(counters => (
                  <div key={counters.bossName} className="raid-boss-counters-card">
                    <div className="counters-boss-header">
                      <h5>{getPokemonName(counters.bossName, lang)}</h5>
                      <div className="weakness-list">
                        {t.details_weaknesses}: <span className="type-badges-flex">{counters.weaknesses.map(w => <TypeBadge key={w} typeStr={w} lang={lang} />)}</span>
                      </div>
                    </div>
                    <div className="counters-levels-grid">
                      {counters.megaCounters.length > 0 && (
                        <div className="counter-level-col mega">
                          <span className="level-badge mega">{t.details_level_mega}</span>
                          <ul>
                            {counters.megaCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                          </ul>
                        </div>
                      )}
                      {counters.advancedCounters.length > 0 && (
                        <div className="counter-level-col advanced">
                          <span className="level-badge advanced">{t.details_level_advanced}</span>
                          <ul>
                            {counters.advancedCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                          </ul>
                        </div>
                      )}
                      {counters.budgetCounters.length > 0 && (
                        <div className="counter-level-col budget">
                          <span className="level-badge budget">{t.details_level_budget}</span>
                          <ul>
                            {counters.budgetCounters.map(c => <CounterItem key={c} counterStr={c} lang={lang} />)}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* CP & IV & Weather Boost info */}
                    <div className="counters-cp-info">
                      {counters.maxCp > 0 && (
                        <div className="cp-row">
                          <span className="cp-header-label">{t.details_standard_cp}</span>
                          <span className="cp-span">{counters.minCp} – <strong className="hundo-label">{counters.maxCp} CP (100% IV)</strong></span>
                        </div>
                      )}
                      {counters.maxBoostedCp > 0 && (
                        <div className="cp-row">
                          <span className="cp-header-label">{t.details_weather_cp}</span>
                          <span className="cp-span">{counters.minBoostedCp} – <strong className="hundo-label-boost">{counters.maxBoostedCp} CP (100% IV)</strong></span>
                        </div>
                      )}
                      {counters.weatherBoosts.length > 0 && (
                        <div className="cp-row">
                          <span className="cp-header-label">{t.details_boost_weather}</span>
                          <span className="cp-span" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {counters.weatherBoosts.map(w => <WeatherIcon key={w} weatherStr={w} />)}
                          </span>
                        </div>
                      )}
                      <div className="cp-row shiny-info">
                        <span className="cp-header-label">{t.details_shiny_version}</span>
                        <span className="cp-span highlight-shiny" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Sparkles size={12} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} /> {t.details_shiny_available}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardErrorBoundary>
  );

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
            <img 
              src={resolveImage(event.image, event.eventType, event.name)} 
              alt={event.name} 
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.onerror = null;
                const baseName = getBasePokemonName(event.name);
                const knownNames = getBasePokemonNames();
                const hasKnownPokemon = knownNames.some(kn => event.name.toLowerCase().includes(kn.toLowerCase()));
                if (hasKnownPokemon && baseName) {
                  img.src = getPokemonIconUrl(baseName);
                  img.onerror = () => {
                    img.onerror = null;
                    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                  };
                } else {
                  img.src = resolveImage(undefined, event.eventType);
                  img.onerror = () => {
                    img.onerror = null;
                    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                  };
                }
              }}
            />
            <span className={`status-pill ${status}`}>
              {status === 'active' ? (lang === 'cs' ? '● Probíhá' : '● Active') : status === 'upcoming' ? (lang === 'cs' ? 'Připravuje se' : 'Upcoming') : (lang === 'cs' ? 'Ukončeno' : 'Ended')}
            </span>
          </div>
          
          <div className="event-details">
            <span className={`event-type-badge ${event.eventType}`}>
              {getEventTypeLabel(event.eventType)}
            </span>
            <h3 className="event-title">{event.name}</h3>
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
        <div className="event-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsExpanded(false)} aria-label="Close">
              ✕
            </button>

            <div className="modal-header-section">
              <div className="event-img-wrapper large">
                <img 
                  src={resolveImage(event.image, event.eventType, event.name)} 
                  alt={event.name} 
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
                <h3 className="event-title">{event.name}</h3>
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

'use client';

import './index.css';
import './App.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useNotifications } from './hooks/useNotifications';
import { EventCard } from './components/EventCard';
import type { EventData } from './components/EventCard';
import { NotificationSettings } from './components/NotificationSettings';
import type { VisibleEventsPreference } from './components/NotificationSettings';
import { translations } from './data/translations';
import type { Language } from './data/translations';
import { API_BASE_URL } from './config';
import { AdContainer } from './components/AdContainer';
import { setPokemonIconOverrides } from './utils/imageResolver';
import { useAppNavigate } from './hooks/useAppNavigate';
import { Calendar, Swords, Shield, Settings, Play, Clock, Egg, Sparkles, Trophy, Filter, LayoutList, BookOpen } from 'lucide-react';
import { Footer, InstagramLogo, TikTokLogo } from './components/Footer';
import { LegalModals, type LegalModalType } from './components/LegalModals';

// Lazy-loaded tabs - loaded only when user navigates to them (reduces initial bundle ~40%)
const RaidView = lazy(() => import('./components/RaidView').then(m => ({ default: m.RaidView })));
const RocketGuide = lazy(() => import('./components/RocketGuide').then(m => ({ default: m.RocketGuide })));
const TimelineView = lazy(() => import('./components/TimelineView').then(m => ({ default: m.TimelineView })));
const DittoEggsView = lazy(() => import('./components/DittoEggsView').then(m => ({ default: m.DittoEggsView })));
const PokemonRankingsView = lazy(() => import('./components/PokemonRankingsView').then(m => ({ default: m.PokemonRankingsView })));
const FilterGeneratorView = lazy(() => import('./components/FilterGeneratorView').then(m => ({ default: m.FilterGeneratorView })));
const AdminPanelView = lazy(() => import('./components/AdminPanelView').then(m => ({ default: m.AdminPanelView })));
const MonthSummaryInfographic = lazy(() => import('./components/MonthSummaryInfographic').then(m => ({ default: m.MonthSummaryInfographic })));
import { PokeballLogo } from './components/PokeballLogo';

const GuidesView = lazy(() => import('./components/GuidesView').then(m => ({ default: m.GuidesView })));


type TabType = 'events' | 'guides' | 'raid' | 'rocket' | 'ditto' | 'eggs' | 'ranking' | 'filter' | 'settings' | 'admin';


// Calculate difference between target timezone and browser local timezone
const getTargetTimezoneOffsetMs = (timeZone: string): number => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
    });
    const parts = formatter.formatToParts(new Date());
    const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);
    
    const year = getPart('year');
    const month = getPart('month') - 1;
    const day = getPart('day');
    const hour = getPart('hour');
    const minute = getPart('minute');
    const second = getPart('second');
    
    const targetDateLocal = new Date(year, month, day, hour, minute, second);
    const nativeDateLocal = new Date();
    
    return targetDateLocal.getTime() - nativeDateLocal.getTime();
  } catch (e) {
    console.error("Failed to calculate timezone offset:", e);
    return 0;
  }
};

// Fallback Mock Data matching the user's local date (June 17, 2026)
const MOCK_EVENTS: EventData[] = [
  {
    eventID: "zekrom-in-5-star-raid-battles-june-2026",
    name: "Zekrom in 5-star Raid Battles",
    eventType: "raid-battles",
    heading: "Raid Battles",
    link: "https://leekduck.com/events/zekrom-in-5-star-raid-battles-june-2026/",
    image: "https://cdn.leekduck.com/assets/img/events/events-default-img.jpg",
    start: "2026-06-10T06:00:00.000",
    end: "2026-06-16T22:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Zekrom",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_644_00.png",
            canBeShiny: true
          }
        ]
      }
    }
  },
  {
    eventID: "mega-lopunny-in-mega-raids-june-2026",
    name: "Mega Lopunny in Mega Raids",
    eventType: "raid-battles",
    heading: "Raid Battles",
    link: "https://leekduck.com/events/mega-lopunny-in-mega-raids-june-2026/",
    image: "https://cdn.leekduck.com/assets/img/events/mega-default.jpg",
    start: "2026-06-10T06:00:00.000",
    end: "2026-06-17T22:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Mega Lopunny",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_428_51.png",
            canBeShiny: true
          }
        ]
      }
    }
  },
  {
    eventID: "raidhour20260617",
    name: "Necrozma Raid Hour",
    eventType: "raid-hour",
    heading: "Raid Hour",
    link: "https://leekduck.com/events/raidhour20260617/",
    image: "https://cdn.leekduck.com/assets/img/events/raidhour.jpg",
    start: "2026-06-17T18:00:00.000",
    end: "2026-06-17T19:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Necrozma (Dusk Mane)",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_800_12.png",
            canBeShiny: true
          },
          {
            name: "Necrozma (Dawn Wings)",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_800_13.png",
            canBeShiny: true
          }
        ]
      }
    }
  },
  {
    eventID: "pokemonspotlighthour2026-06-18",
    name: "Swinub Spotlight Hour",
    eventType: "pokemon-spotlight-hour",
    heading: "Pokémon Spotlight Hour",
    link: "https://leekduck.com/events/pokemonspotlighthour2026-06-18/",
    image: "https://cdn.leekduck.com/assets/img/events/pokemonspotlighthour.jpg",
    start: "2026-06-18T18:00:00.000",
    end: "2026-06-18T19:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Swinub",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_220_00.png",
            canBeShiny: true
          }
        ]
      }
    }
  },
  {
    eventID: "june-communityday2026",
    name: "Frigibax Community Day",
    eventType: "community-day",
    heading: "Community Day",
    link: "https://leekduck.com/events/june-communityday2026/",
    image: "https://cdn.leekduck.com/assets/img/events/article-images/2026/2026-06-20-june-communityday2026/frigibax-cd-placeholder.jpg",
    start: "2026-06-20T14:00:00.000",
    end: "2026-06-20T17:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Frigibax",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_996_00.png",
            canBeShiny: true
          }
        ]
      }
    }
  },
  {
    eventID: "rocket-takeover-june-2026",
    name: "Team GO Rocket Takeover: Shadow Landorus",
    eventType: "rocket-takeover",
    heading: "Rocket Takeover",
    link: "https://leekduck.com/events/rocket-takeover-june-2026/",
    image: "https://cdn.leekduck.com/assets/img/events/rocket-takeover.jpg",
    start: "2026-06-15T10:00:00.000",
    end: "2026-06-25T20:00:00.000",
    extraData: {
      raidbattles: {
        bosses: [
          {
            name: "Landorus",
            image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_645_00.png",
            canBeShiny: false
          }
        ]
      }
    }
  }
];

const sanitizeEvents = (eventList: EventData[]): EventData[] => {
  return eventList.filter(e => {
    const name = (e.name || '').toLowerCase();
    const id = (e.eventID || '').toLowerCase();
    return !name.includes('example') && !name.includes('vzor') && !name.includes('test') &&
           !id.includes('example') && !id.includes('vzor') && !id.includes('test');
  });
};

const trackGAEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};

const getLangFromPath = (path: string): Language | null => {
  const cleanPath = path.toLowerCase();
  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length > 0) {
    const first = parts[0];
    if (first === 'cs' || first === 'sk') return 'cs';
    if (first === 'ja' || first === 'jp') return 'ja';
    if (first === 'ru') return 'ru';
    if (first === 'en' || first === 'us') return 'en';
  }
  return null;
};

const getPathForLang = (l: Language): string => {
  return `/${l}`;
};

const detectUserLanguage = (): Language => {
  return 'en';
};

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try { localStorage.setItem(key, value); } catch {}
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try { localStorage.removeItem(key); } catch {}
  }
};

const getTabFromUrlPath = (pathname: string): TabType => {
  const segments = pathname.toLowerCase().split('/').filter(Boolean);
  // Skip language segment if present
  const tabSegments = (['cs', 'en', 'ja', 'ru', 'sk', 'jp', 'us'].includes(segments[0]))
    ? segments.slice(1)
    : segments;
  const first = tabSegments[0] || '';
  if (first === 'admin') return 'admin';
  if (first === 'guides' || first === 'guide' || first === 'pruvodce') return 'guides';
  if (first === 'raids' || first === 'raid') return 'raid';
  if (first === 'rocket') return 'rocket';
  if (first === 'rankings' || first === 'ranking') return 'ranking';
  if (first === 'ditto') return 'ditto';
  if (first === 'eggs') return 'eggs';
  if (first === 'filter') return 'filter';
  if (first === 'settings') return 'settings';
  return 'events';
};

const getEventIdFromUrlPath = (pathname: string): string | null => {
  const match = pathname.toLowerCase().match(/\/events\/([^/]+)/);
  return match && match[1] ? match[1] : null;
};

const getUrlPathForTab = (tab: TabType, l: Language, eventID?: string | null): string => {
  if (tab === 'admin') return '/admin';
  const prefix = `/${l}`;
  if (tab === 'events' && eventID) {
    return `${prefix}/events/${eventID}`;
  }
  switch (tab) {
    case 'guides': return `${prefix}/guides`;
    case 'raid': return `${prefix}/raids`;
    case 'rocket': return `${prefix}/rocket`;
    case 'ranking': return `${prefix}/rankings`;
    case 'ditto': return `${prefix}/ditto`;
    case 'eggs': return `${prefix}/eggs`;
    case 'filter': return `${prefix}/filter`;
    case 'settings': return `${prefix}/settings`;
    case 'events':
    default: return `${prefix}/events`;
  }
};

const TAB_TITLES: Record<TabType, Record<string, string>> = {
  events: { cs: 'Události', en: 'Events', ja: 'イベント', ru: 'События' },
  guides: { cs: 'Průvodce & Články', en: 'Guides & Articles', ja: 'ガイド & 記事', ru: 'Гайды и Статьи' },
  raid: { cs: 'Raid Bossi', en: 'Raid Bosses', ja: 'レイドボス', ru: 'Рейд-боссы' },
  rocket: { cs: 'Team GO Rocket', en: 'Team GO Rocket', ja: 'Team GO Rocket', ru: 'Team GO Rocket' },
  ditto: { cs: 'Ditto Přestrojení', en: 'Ditto Disguises', ja: 'メタモン変装', ru: 'Маскировки Дитто' },
  eggs: { cs: 'Líhnutí vajec', en: 'Egg Hatching', ja: 'タマゴ孵化', ru: 'Яйца' },
  ranking: { cs: 'PvP Žebříčky', en: 'PvP Rankings', ja: 'PvPランキング', ru: 'PvP Рейтинги' },
  filter: { cs: 'Vyhledávací Filtr', en: 'Search Filter', ja: '検索フィルター', ru: 'Фильтр поиска' },
  settings: { cs: 'Nastavení', en: 'Settings', ja: '設定', ru: 'Настройки' },
  admin: { cs: 'Admin', en: 'Admin', ja: 'Admin', ru: 'Admin' },
};

const getPageTitle = (tab: TabType, lang: string, eventName?: string | null): string => {
  const suffix = 'Pokémon GO Event Tracker';
  if (tab === 'events' && eventName) {
    return `${eventName} | ${suffix}`;
  }
  const tabTitle = TAB_TITLES[tab]?.[lang] || TAB_TITLES[tab]?.['en'] || 'Events';
  return `${tabTitle} | ${suffix}`;
};

const updateHeadMeta = (tab: TabType, lang: string, eventId?: string | null): void => {
  if (typeof window === 'undefined') return;
  const canonicalPath = getUrlPathForTab(tab, lang as Language, eventId);
  const canonicalUrl = `https://pogoevents.app${canonicalPath}`;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonicalUrl;
};

function App({ initialLang, initialTab, initialArticleSlug }: { initialLang?: Language; initialTab?: TabType; initialArticleSlug?: string } = {}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'events');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>(initialLang || 'en');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const navigate = useAppNavigate();
  // Set to true once AdSense approves the website to restore ad placements
  const ENABLE_ADS = false;
  const showAds = ENABLE_ADS && activeTab !== 'settings' && activeTab !== 'admin';

  const [events, setEvents] = useState<EventData[]>(() => sanitizeEvents(MOCK_EVENTS));
  const [filterType, setFilterType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'upcoming'>('active');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('timeline');
  const [showMonthSummary, setShowMonthSummary] = useState<boolean>(false);
  const [monthSummaryInitialOffset, setMonthSummaryInitialOffset] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [_apiStatus, setApiStatus] = useState<'success' | 'fallback'>('fallback');
  const [scraperStatus, setScraperStatus] = useState<{
    lastScrapedAt: string | null;
    nextScrapeAt: string | null;
    isRunning: boolean;
    totalEvents: number;
  }>({ lastScrapedAt: null, nextScrapeAt: null, isRunning: false, totalEvents: 0 });

  useEffect(() => {
    trackGAEvent('switch_tab', 'Navigation', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const saved = safeLocalStorage.getItem('pogo_tracker_view_mode');
    if (saved === 'list' || saved === 'timeline') {
      setViewMode(saved);
    }
  }, []);

  useEffect(() => {
    safeLocalStorage.setItem('pogo_tracker_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialLang) {
      setLang(initialLang);
      safeLocalStorage.setItem('pogo_tracker_lang', initialLang);
    }
  }, [initialLang]);

  // Synchronize language, tab and event ID from URL on mount & popstate
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const urlLang = getLangFromPath(path);
    const resolvedLang = urlLang || initialLang || (safeLocalStorage.getItem('pogo_tracker_lang') as Language) || detectUserLanguage();
    setLang(resolvedLang);
    safeLocalStorage.setItem('pogo_tracker_lang', resolvedLang);

    const urlTab = getTabFromUrlPath(path);
    if (urlTab) {
      setActiveTab(urlTab);
    }

    const urlEventId = getEventIdFromUrlPath(path);
    if (urlEventId) {
      setExpandedEventId(urlEventId);
    }

    // Set initial page title, <html lang> and canonical meta on mount
    document.title = getPageTitle(urlTab || activeTab, resolvedLang);
    document.documentElement.lang = resolvedLang;
    updateHeadMeta(urlTab || activeTab, resolvedLang, urlEventId);
  }, []);

  const changeTab = (newTab: TabType) => {
    setActiveTab(newTab);
    if (newTab !== 'events') {
      setExpandedEventId(null);
    }
    if (typeof window !== 'undefined') {
      const isCapacitor = !!(window as any).Capacitor || 
                          window.location.protocol === 'capacitor:' || 
                          window.location.protocol === 'file:';
      const eventId = newTab === 'events' ? expandedEventId : null;
      if (!isCapacitor) {
        const targetPath = getUrlPathForTab(newTab, lang, eventId);
        if (window.location.pathname !== targetPath) {
          navigate.push(targetPath);
        }
      }
      document.title = getPageTitle(newTab, lang);
      updateHeadMeta(newTab, lang, eventId);
    }
  };

  const handleEventToggleExpand = (eventID: string, expanded: boolean) => {
    const newExpandedId = expanded ? eventID : null;
    setExpandedEventId(newExpandedId);
    if (typeof window !== 'undefined') {
      const isCapacitor = !!(window as any).Capacitor || 
                          window.location.protocol === 'capacitor:' || 
                          window.location.protocol === 'file:';
      if (!isCapacitor) {
        const targetPath = getUrlPathForTab('events', lang, newExpandedId);
        if (window.location.pathname !== targetPath) {
          navigate.push(targetPath);
        }
      }
      const eventName = expanded ? events.find(e => e.eventID === eventID)?.name : null;
      document.title = getPageTitle('events', lang, eventName);
      updateHeadMeta('events', lang, newExpandedId);
    }
  };

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const newTab = getTabFromUrlPath(window.location.pathname);
      setActiveTab(newTab);
      const urlLang = getLangFromPath(window.location.pathname);
      if (urlLang && urlLang !== lang) {
        setLang(urlLang);
        safeLocalStorage.setItem('pogo_tracker_lang', urlLang);
      }
      const urlEventId = getEventIdFromUrlPath(window.location.pathname);
      setExpandedEventId(urlEventId);
      // Update title and meta on browser back/forward
      const effectiveLang = urlLang || lang;
      document.title = getPageTitle(newTab, effectiveLang);
      updateHeadMeta(newTab, effectiveLang, urlEventId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = safeLocalStorage.getItem('pogo_tracker_theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      safeLocalStorage.setItem('pogo_tracker_theme', theme);
    }
  }, [theme]);

  const [timezone, setTimezone] = useState<string>('Europe/Prague');

  useEffect(() => {
    const saved = safeLocalStorage.getItem('pogo_tracker_timezone');
    if (saved) {
      setTimezone(saved);
    } else if (typeof window !== 'undefined') {
      const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detectedTz) setTimezone(detectedTz);
    }
  }, []);

  const [filterModalInitialBoss, setFilterModalInitialBoss] = useState<string>('Palkia');

  const handleOpenFilterGenerator = (bossName?: string) => {
    if (bossName) {
      const cleanBoss = bossName.replace(/shadow|mega/gi, '').trim();
      setFilterModalInitialBoss(cleanBoss || bossName);
    }
    changeTab('filter');
  };

  const [visibleEvents, setVisibleEvents] = useState<VisibleEventsPreference>(() => {
    const defaults = {
      communityDays: true,
      spotlightHours: true,
      raidHours: true,
      raidBattles: true,
      rocketTakeovers: true,
      goBattleLeague: true,
      hatchDays: true,
      researchDays: true,
      showcases: true,
      maxMondays: true,
      majorEvents: true,
    };
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('pogo_tracker_visible_events', JSON.stringify(visibleEvents));
  }, [visibleEvents]);

  // Reactively track calendar filters and settings in Google Analytics
  useEffect(() => {
    if (activeTab === 'events') {
      trackGAEvent('change_filter_type', 'Calendar', filterType);
    }
  }, [filterType, activeTab]);

  useEffect(() => {
    if (activeTab === 'events') {
      trackGAEvent('change_status_filter', 'Calendar', statusFilter);
    }
  }, [statusFilter, activeTab]);

  useEffect(() => {
    trackGAEvent('change_language', 'Settings', lang);
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Sync page title when expanded event changes or event data loads (e.g. deep link)
  useEffect(() => {
    if (typeof window === 'undefined' || !expandedEventId || activeTab !== 'events') return;
    const event = events.find(e => e.eventID === expandedEventId);
    if (event) {
      document.title = getPageTitle('events', lang, event.name);
    }
  }, [expandedEventId, events, lang, activeTab]);

  const toggleVisibleEvent = (key: keyof VisibleEventsPreference) => {
    setVisibleEvents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isEventVisible = (eventType: string): boolean => {
    const cleanType = eventType.toLowerCase();
    if (cleanType.includes('community-day') && !visibleEvents.communityDays) return false;
    if (cleanType.includes('spotlight-hour') && !visibleEvents.spotlightHours) return false;
    if (cleanType.includes('raid-hour') && !visibleEvents.raidHours) return false;
    if (cleanType.includes('raid-battles') && !visibleEvents.raidBattles) return false;
    if (cleanType.includes('rocket-takeover') && !visibleEvents.rocketTakeovers) return false;
    if ((cleanType.includes('battle-league') || cleanType.includes('battle-day')) && !visibleEvents.goBattleLeague) return false;
    if ((cleanType.includes('hatch') || cleanType.includes('egg')) && !visibleEvents.hatchDays) return false;
    if ((cleanType.includes('research-day') || cleanType.includes('limited-research') || cleanType.includes('breakthrough')) && !visibleEvents.researchDays) return false;
    if (cleanType.includes('showcase') && !visibleEvents.showcases) return false;
    if ((cleanType.includes('max-monday') || cleanType.includes('max-mondays')) && !visibleEvents.maxMondays) return false;
    
    const specificTypes = [
      'community-day', 'pokemon-spotlight-hour', 'raid-hour', 'raid-battles', 'rocket-takeover',
      'go-battle-league', 'go-battle-day', 'hatch-day', 'egg-hatching', 'research-day', 'limited-research', 'showcase',
      'max-monday', 'max-mondays'
    ];
    const isSpecific = specificTypes.some(t => cleanType.includes(t));
    if (!isSpecific && !visibleEvents.majorEvents) return false;
    return true;
  };
  
  const notificationsHook = useNotifications();
  const { triggerNotification, notifyNewEvents, addInAppNotification } = notificationsHook;

  // Poll scraper status every 5 minutes to show last update time
  useEffect(() => {
    const fetchScraperStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/scraper/status`);
        if (res.ok) {
          const data = await res.json();
          setScraperStatus(data);
        }
      } catch {
        // Silently ignore — backend may be unavailable
      }
    };

    fetchScraperStatus(); // Fetch immediately on mount
    const interval = setInterval(fetchScraperStatus, 5 * 60 * 1000); // Then every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const t = translations[lang] ?? translations['en'];

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    safeLocalStorage.setItem('pogo_tracker_lang', newLang);

    if (typeof window !== 'undefined') {
      const isCapacitor = !!(window as any).Capacitor || 
                          window.location.protocol === 'capacitor:' || 
                          window.location.protocol === 'file:';
      const eventId = activeTab === 'events' ? expandedEventId : null;
      if (!isCapacitor) {
        const targetPath = getUrlPathForTab(activeTab, newLang, eventId);
        if (window.location.pathname !== targetPath) {
          navigate.push(targetPath);
        }
      }
      document.title = getPageTitle(activeTab, newLang);
      updateHeadMeta(activeTab, newLang, eventId);
    }
  };

  const getAdjustedEvents = (): EventData[] => {
    if (!timezone) return events;
    const offsetMs = getTargetTimezoneOffsetMs(timezone);
    if (offsetMs === 0) return events;
    
    const toLocalIsoString = (d: Date): string => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const year = d.getFullYear();
      const month = pad(d.getMonth() + 1);
      const day = pad(d.getDate());
      const hours = pad(d.getHours());
      const minutes = pad(d.getMinutes());
      const seconds = pad(d.getSeconds());
      const ms = d.getMilliseconds().toString().padStart(3, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}`;
    };

    return events.map(e => {
      const startObj = new Date(e.start);
      const endObj = new Date(e.end);
      const adjStart = toLocalIsoString(new Date(startObj.getTime() - offsetMs));
      const adjEnd = toLocalIsoString(new Date(endObj.getTime() - offsetMs));
      return { ...e, start: adjStart, end: adjEnd };
    });
  };

  // Load cached events on startup (Offline-First) and fetch updates from ScrapedDuck API
  useEffect(() => {
    const loadCachedDataAndFetch = async () => {
      let cachedEvents: EventData[] = [];
      let isCacheValid = false;

      const detectNewlyAddedEvents = (freshEvents: any[]) => {
        const seenEventsStr = localStorage.getItem('pogo_tracker_seen_event_ids');
        let seenEventIds: string[] = [];
        if (seenEventsStr) {
          try {
            seenEventIds = JSON.parse(seenEventsStr);
          } catch (e) {
            console.error("Failed to parse seen event IDs", e);
          }
        }

        // First launch: store all current IDs as seen to avoid spamming
        if (seenEventIds.length === 0) {
          const initialIds = freshEvents.map(e => e.eventID);
          localStorage.setItem('pogo_tracker_seen_event_ids', JSON.stringify(initialIds));
          return;
        }

        const now = new Date();
        const newEvents = freshEvents.filter(e => {
          const isNotSeen = !seenEventIds.includes(e.eventID);
          const isNotExpired = new Date(e.end) >= now;
          return isNotSeen && isNotExpired;
        });

        // Fire batched notification via the hook (handles native + in-app)
        if (newEvents.length > 0) {
          notifyNewEvents(newEvents, lang);
        }

        // Update seen list to full fresh list
        const updatedIds = freshEvents.map(e => e.eventID);
        localStorage.setItem('pogo_tracker_seen_event_ids', JSON.stringify(updatedIds));
      };

      fetch(`${API_BASE_URL}/api/pokemon-icons`)
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data && data.overrides) setPokemonIconOverrides(data.overrides);
        })
        .catch(() => {});

      // 1. Try to read from localStorage cache
      const cached = localStorage.getItem('pogo_events_cache');
      const cacheTime = localStorage.getItem('pogo_events_cache_time');
      
      if (cached) {
        try {
          cachedEvents = JSON.parse(cached);
          if (Array.isArray(cachedEvents) && cachedEvents.length > 0) {
            setEvents(sanitizeEvents(cachedEvents));
            setApiStatus('success');
            setLoading(false); // Render cache immediately
            
            // Check if cache is fresh (less than 8 hours old)
            if (cacheTime) {
              const ageHours = (Date.now() - parseInt(cacheTime, 10)) / (1000 * 60 * 60);
              if (ageHours < 8) {
                isCacheValid = true;
                console.log(`Cache is fresh (${ageHours.toFixed(1)} hours old). Skipping background fetch.`);
              }
            }
          }
        } catch (e) {
          console.error("Failed to parse cached events", e);
        }
      }

      // 2. If no cache or cache is older than 8 hours, fetch fresh data
      if (!isCacheValid) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/events`);
          if (!response.ok) throw new Error('API request failed');
          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            // Check for newly added events before updating state and cache
            detectNewlyAddedEvents(data);

            setEvents(sanitizeEvents(data));
            setApiStatus('success');
            localStorage.setItem('pogo_events_cache', JSON.stringify(data));
            localStorage.setItem('pogo_events_cache_time', Date.now().toString());
          } else if (cachedEvents.length === 0) {
            setEvents(sanitizeEvents(MOCK_EVENTS));
            setApiStatus('fallback');
          }
        } catch (e) {
          console.error("API Fetch failed, using fallback:", e);
          if (cachedEvents.length > 0) {
            // Keep using cached data, but toggle status to fallback (offline)
            setApiStatus('fallback');
          } else {
            setEvents(sanitizeEvents(MOCK_EVENTS));
            setApiStatus('fallback');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadCachedDataAndFetch();
  }, [lang]);

  // Listen for admin events update signal to re-fetch fresh events list
  useEffect(() => {
    const handleEventsUpdated = async () => {
      console.log("Re-fetching events after admin update...");
      localStorage.removeItem('pogo_events_cache');
      localStorage.removeItem('pogo_events_cache_time');
      try {
        const response = await fetch(`${API_BASE_URL}/api/events?nocache=true`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setEvents(sanitizeEvents(data));
            setApiStatus('success');
            localStorage.setItem('pogo_events_cache', JSON.stringify(data));
            localStorage.setItem('pogo_events_cache_time', Date.now().toString());
          }
        }
      } catch (err) {
        console.error("Failed to re-fetch events on update signal:", err);
      }
    };

    window.addEventListener('pogo_events_updated', handleEventsUpdated);
    return () => window.removeEventListener('pogo_events_updated', handleEventsUpdated);
  }, []);

  // Check for newly started events on load/refresh and trigger in-app notifications
  useEffect(() => {
    if (events.length === 0) return;

    const checkEventsForNotifications = () => {
      const now = new Date();
      const notificationLog = localStorage.getItem('pogo_tracker_notified_event_ids') || '[]';
      let notifiedIds: string[] = [];
      try { notifiedIds = JSON.parse(notificationLog); } catch(e) {}

      events.forEach(event => {
        const start = new Date(event.start);
        const end = new Date(event.end);

        // If event is active and has started in the last 24 hours
        // and we haven't notified yet
        if (now >= start && now <= end && !notifiedIds.includes(event.eventID)) {
          // Check if start is within the last 24h
          const timeSinceStartMs = now.getTime() - start.getTime();
          const oneDayMs = 24 * 60 * 60 * 1000;

          if (timeSinceStartMs < oneDayMs) {
            let bodyText = lang === 'cs'
              ? `Event ${event.name} právě probíhá! Otevřete aplikaci pro zobrazení meta doporučení.`
              : `Event ${event.name} is now active! Open the app to check raid counters and details.`;
            
            // Customize body based on event type
            if (event.eventType === 'pokemon-spotlight-hour') {
              bodyText = lang === 'cs'
                ? `Spotlight Hour pro ${event.name} právě běží! Rychle chytat!`
                : `Spotlight Hour for ${event.name} is running! Go catch 'em!`;
            } else if (event.eventType === 'raid-hour') {
              bodyText = lang === 'cs'
                ? `Raid Hour právě začíná! Připravte si Remote Passy.`
                : `Raid Hour has started! Get your Remote Passes ready.`;
            } else if (event.eventType === 'community-day') {
              bodyText = lang === 'cs'
                ? `${event.name} začíná! Získejte speciální evoluční útok!`
                : `${event.name} is starting! Evolve to get the special move!`;
            }

            addInAppNotification(
              lang === 'cs' ? `🔴 Začal event: ${event.name}` : `🔴 Active Event: ${event.name}`,
              bodyText,
              event.eventType
            );
            notifiedIds.push(event.eventID);
          }
        }
      });

      localStorage.setItem('pogo_tracker_notified_event_ids', JSON.stringify(notifiedIds));
    };

    // Delay checking slightly to allow state to settle
    const timeout = setTimeout(checkEventsForNotifications, 2000);
    return () => clearTimeout(timeout);
  }, [events, addInAppNotification, lang]);

  // Schedule native system notifications reactively
  useEffect(() => {
    if (events && events.length > 0) {
      notificationsHook.scheduleEventNotifications(events, lang);
    }
  }, [events, notificationsHook.permission, notificationsHook.preferences, lang]);

  // Category availability helper for current status tab events
  const getCurrentStatusEvents = () => {
    let list = getAdjustedEvents().filter(e => isEventVisible(e.eventType));
    const now = new Date();
    if (statusFilter === 'active') {
      return list.filter(e => now >= new Date(e.start) && now <= new Date(e.end));
    }
    return list.filter(e => now < new Date(e.start));
  };

  const currentStatusEvents = getCurrentStatusEvents();
  const specificCategoryTypes = ['community-day', 'pokemon-spotlight-hour', 'raid-hour'];

  const hasCommunityDay = visibleEvents.communityDays && currentStatusEvents.some(e => e.eventType === 'community-day');
  const hasSpotlightHour = visibleEvents.spotlightHours && currentStatusEvents.some(e => e.eventType === 'pokemon-spotlight-hour');
  const hasRaidHour = visibleEvents.raidHours && currentStatusEvents.some(e => e.eventType === 'raid-hour');
  const hasOtherCategory = visibleEvents.majorEvents && currentStatusEvents.some(e => !specificCategoryTypes.includes(e.eventType));

  const specificCategoryCount = (hasCommunityDay ? 1 : 0) +
                                (hasSpotlightHour ? 1 : 0) +
                                (hasRaidHour ? 1 : 0);

  const showFilterPills = specificCategoryCount > 0;

  useEffect(() => {
    if (filterType === 'all') return;
    const isCurrentVisible = 
      (filterType === 'community-day' && hasCommunityDay) ||
      (filterType === 'pokemon-spotlight-hour' && hasSpotlightHour) ||
      (filterType === 'raid-hour' && hasRaidHour) ||
      (filterType === 'other' && hasOtherCategory);

    if (!isCurrentVisible || !showFilterPills) {
      setFilterType('all');
    }
  }, [filterType, hasCommunityDay, hasSpotlightHour, hasRaidHour, hasOtherCategory, showFilterPills]);

  // Filter events by tab
  const getFilteredEvents = () => {
    let list = getAdjustedEvents();
    
    // Filter by user visibility settings first
    list = list.filter(e => isEventVisible(e.eventType));

    // Filter and sort by status (active vs upcoming)
    const now = new Date();
    if (statusFilter === 'active') {
      list = list.filter(e => now >= new Date(e.start) && now <= new Date(e.end));
      list.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
    } else {
      list = list.filter(e => now < new Date(e.start));
      list.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }

    // Filter by type if set
    if (filterType === 'all') {
      // Keep all events
    } else if (filterType === 'other') {
      const specificTypes = ['community-day', 'pokemon-spotlight-hour', 'raid-hour'];
      list = list.filter(e => !specificTypes.includes(e.eventType));
    } else {
      list = list.filter(e => e.eventType === filterType);
    }

    return list;
  };

  return (
    <div className="content-layout-wrapper">
      <main className="app-main">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>{t.loading_text}</p>
          </div>
        ) : (
          <Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}>
            <>
              {activeTab === 'events' && (
                <div className="tab-content events-tab">
                  <div className="events-header-bar">
                    <div className="events-header-text">
                      <h1 className="tab-seo-title">{t.tabs_events}</h1>
                      <p className="tab-seo-description">{t.seo_events_desc}</p>
                    </div>
                    <div className="events-view-switcher" role="radiogroup" aria-label={t.settings_layout_title}>
                      <button 
                        className={`view-switch-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title={t.settings_layout_list}
                        aria-label={t.settings_layout_list}
                      >
                        <LayoutList size={14} />
                        <span>{t.view_mode_list}</span>
                      </button>
                      <button 
                        className={`view-switch-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                        onClick={() => setViewMode('timeline')}
                        title={t.settings_layout_timeline}
                        aria-label={t.settings_layout_timeline}
                      >
                        <Calendar size={14} />
                        <span>{t.view_mode_timeline}</span>
                      </button>
                    </div>
                  </div>
                  {/* Active / Upcoming / Next Month Summary Status Tabs (Split in thirds) */}
                  {viewMode !== 'timeline' && (
                    <div className="status-tabs-container">
                      <button 
                        className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('active')}
                      >
                        <Play size={14} fill="currentColor" stroke="none" />
                        {lang === 'cs' ? 'Probíhá' : 'Active'}
                      </button>
                      <button 
                        className={`status-tab-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('upcoming')}
                      >
                        <Clock size={14} />
                        {lang === 'cs' ? 'Připravuje se' : 'Upcoming'}
                      </button>
                      <button 
                        className="status-tab-btn infographic-tab-btn"
                        onClick={() => {
                          setMonthSummaryInitialOffset(0);
                          setShowMonthSummary(true);
                        }}
                        title={lang === 'cs' ? 'Zobrazit souhrnnou infografiku na tento měsíc' : 'View this month summary infographic'}
                      >
                        <Sparkles size={14} />
                        {lang === 'cs' ? 'Souhrn na tento měsíc' : lang === 'ja' ? '今月のサマリー' : lang === 'ru' ? 'Сводка на этот месяц' : 'This Month Summary'}
                      </button>
                    </div>
                  )}

                  {/* Event Category Filters - Only shown if specific sub-categories exist */}
                  {viewMode !== 'timeline' && showFilterPills && (
                    <div className="filter-pill-container" style={{ marginTop: '12px' }}>
                      <button className={`filter-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>{t.filter_all}</button>
                      {hasCommunityDay && (
                        <button className={`filter-pill ${filterType === 'community-day' ? 'active' : ''}`} onClick={() => setFilterType('community-day')}>{t.filter_cd}</button>
                      )}
                      {hasSpotlightHour && (
                        <button className={`filter-pill ${filterType === 'pokemon-spotlight-hour' ? 'active' : ''}`} onClick={() => setFilterType('pokemon-spotlight-hour')}>{t.filter_spotlight}</button>
                      )}
                      {hasRaidHour && (
                        <button className={`filter-pill ${filterType === 'raid-hour' ? 'active' : ''}`} onClick={() => setFilterType('raid-hour')}>{t.filter_raid_hour}</button>
                      )}
                      {hasOtherCategory && (
                        <button className={`filter-pill ${filterType === 'other' ? 'active' : ''}`} onClick={() => setFilterType('other')}>{t.filter_other}</button>
                      )}
                    </div>
                  )}

                  {/* Event Feed List or Timeline */}
                  {viewMode === 'timeline' ? (
                    <TimelineView 
                      events={getAdjustedEvents().filter(e => isEventVisible(e.eventType))} 
                      lang={lang} 
                      timezone={timezone} 
                    />
                  ) : (
                    <div className="events-feed-list">
                      {getFilteredEvents().length === 0 ? (
                        <div className="empty-feed">
                          <p>{t.details_empty_category}</p>
                        </div>
                      ) : (
                        getFilteredEvents().map((event, index) => (
                          <EventCard 
                            key={event.eventID} 
                            event={event} 
                            lang={lang} 
                            timezone={timezone} 
                            defaultExpanded={event.eventID === expandedEventId}
                            priority={index === 0}
                            onOpenFilterGenerator={handleOpenFilterGenerator}
                            onToggleExpand={handleEventToggleExpand}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {showMonthSummary && (
                <Suspense fallback={null}>
                  <MonthSummaryInfographic
                    events={getAdjustedEvents()}
                    lang={lang}
                    initialOffset={monthSummaryInitialOffset}
                    onClose={() => setShowMonthSummary(false)}
                  />
                </Suspense>
              )}

              {activeTab === 'guides' && (
                <div className="tab-content guides-tab">
                  <GuidesView lang={lang} initialArticleSlug={initialArticleSlug} />
                </div>
              )}

              {activeTab === 'raid' && (
                <div className="tab-content raid-tab">
                  <RaidView events={getAdjustedEvents()} lang={lang} onOpenFilterGenerator={handleOpenFilterGenerator} onOpenGuide={() => changeTab('guides')} />
                </div>
              )}

              {activeTab === 'rocket' && (
                <div className="tab-content rocket-tab">
                  <RocketGuide lang={lang} onOpenGuide={() => changeTab('guides')} />
                </div>
              )}

              {activeTab === 'ditto' && (
                <div className="tab-content ditto-tab">
                  <DittoEggsView lang={lang} mode="ditto" />
                </div>
              )}

              {activeTab === 'eggs' && (
                <div className="tab-content eggs-tab">
                  <DittoEggsView lang={lang} mode="eggs" />
                </div>
              )}

              {activeTab === 'ranking' && (
                <div className="tab-content ranking-tab">
                  <PokemonRankingsView lang={lang} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="tab-content settings-tab">
                  <NotificationSettings 
                    notificationsHook={notificationsHook} 
                    lang={lang} 
                    setLang={handleSetLang}
                    timezone={timezone}
                    setTimezone={setTimezone}
                    visibleEvents={visibleEvents}
                    toggleVisibleEvent={toggleVisibleEvent}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    theme={theme}
                    setTheme={setTheme}
                  />
                </div>
              )}

              {activeTab === 'filter' && (
                <FilterGeneratorView lang={lang} initialRaidBoss={filterModalInitialBoss} />
              )}

              {activeTab === 'admin' && (
                <div className="tab-content admin-tab">
                  <AdminPanelView lang={lang} onBack={() => setActiveTab('events')} />
                </div>
              )}
            </>
          </Suspense>
        )}
      </main>

      {/* Desktop Right Sidebar (Rendered only when ads are enabled) */}
      {showAds && (
        <aside className="desktop-right-sidebar">
          <div className="sidebar-widget-container">
            <AdContainer type="sidebar" slot="4561558504" lang={lang} />
          </div>

          <div className="sidebar-widget-container">
            <AdContainer type="rectangle" slot="3032854416" lang={lang} />
          </div>
        </aside>
      )}

      {/* Legal Modals */}
      <LegalModals modalType={legalModal} lang={lang} onClose={() => setLegalModal(null)} />
    </div>
  );
}

export default App;

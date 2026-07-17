import { useState, useEffect } from 'react';
import { useNotifications } from './hooks/useNotifications';
import { EventCard } from './components/EventCard';
import type { EventData } from './components/EventCard';
import { RaidView } from './components/RaidView';
import { RocketGuide } from './components/RocketGuide';
import { NotificationSettings } from './components/NotificationSettings';
import type { VisibleEventsPreference } from './components/NotificationSettings';
import { translations } from './data/translations';
import type { Language } from './data/translations';
import { API_BASE_URL } from './config';
import { TimelineView } from './components/TimelineView';
import { AdContainer } from './components/AdContainer';
import { DittoEggsView } from './components/DittoEggsView';
import { PokemonRankingsView } from './components/PokemonRankingsView';
import { AdminPanelView } from './components/AdminPanelView';
import { Calendar, Swords, Shield, Settings, Play, Clock, Egg, Sparkles, Trophy } from 'lucide-react';

const PokeballLogo = ({ size = 24 }: { size?: number }) => {
  const uid = 'pbl';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ flexShrink: 0, marginRight: '8px' }}
      aria-label="PoGo Events logo"
    >
      <defs>
        <linearGradient id={`${uid}-top`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5a5a" />
          <stop offset="100%" stopColor="#c20000" />
        </linearGradient>
        <linearGradient id={`${uid}-bot`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <circle cx="50" cy="50" r="42" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" stroke="#ff4d4d" strokeWidth="1.5" strokeOpacity="0.45" fill="none" filter={`url(#${uid}-glow)`} />
      <circle cx="50" cy="50" r="42" fill={`url(#${uid}-bot)`} stroke="#1e293b" strokeWidth="1.5" />
      <g clipPath={`url(#${uid}-clip)`}>
        <path d="M 8,50 A 42,42 0 0,1 92,50 Z" fill={`url(#${uid}-top)`} />
      </g>
      <line x1="8" y1="50" x2="92" y2="50" stroke="#1e293b" strokeWidth="5.5" />
      <circle cx="50" cy="50" r="14" fill="#1e293b" />
      <circle cx="50" cy="50" r="10" fill="#ffffff" stroke="#ff4d4d" strokeWidth="2" />
      <circle cx="50" cy="50" r="4.5" fill="#ff4d4d" filter={`url(#${uid}-glow)`} />
      <circle cx="50" cy="50" r="3" fill="#ffffff" />
    </svg>
  );
};


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

type TabType = 'events' | 'raid' | 'rocket' | 'ditto' | 'eggs' | 'ranking' | 'settings' | 'admin';

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

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const showAds = activeTab !== 'settings' && activeTab !== 'admin';

  // Reactively track tab changes in Google Analytics
  useEffect(() => {
    trackGAEvent('switch_tab', 'Navigation', activeTab);
  }, [activeTab]);

  const [events, setEvents] = useState<EventData[]>(() => sanitizeEvents(MOCK_EVENTS));
  const [filterType, setFilterType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'upcoming'>('active');
  
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>(() => {
    const saved = localStorage.getItem('pogo_tracker_view_mode');
    return (saved === 'list' || saved === 'timeline') ? saved : 'list';
  });

  useEffect(() => {
    localStorage.setItem('pogo_tracker_view_mode', viewMode);
  }, [viewMode]);

  const [loading, setLoading] = useState<boolean>(true);
  const [_apiStatus, setApiStatus] = useState<'success' | 'fallback'>('fallback');
  const [scraperStatus, setScraperStatus] = useState<{
    lastScrapedAt: string | null;
    nextScrapeAt: string | null;
    isRunning: boolean;
    totalEvents: number;
  }>({ lastScrapedAt: null, nextScrapeAt: null, isRunning: false, totalEvents: 0 });
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('pogo_tracker_lang');
    if (saved === 'en' || saved === 'cs' || saved === 'ja') return saved;
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'cs') return 'cs';
    if (browserLang === 'ja') return 'ja';
    return 'en';
  });
  
  const [timezone, setTimezone] = useState<string>(() => {
    return localStorage.getItem('pogo_tracker_timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Prague';
  });

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
  }, [lang]);

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

  useEffect(() => {
    if (filterType === 'all') return;
    const isCurrentVisible = 
      (filterType === 'community-day' && visibleEvents.communityDays) ||
      (filterType === 'pokemon-spotlight-hour' && visibleEvents.spotlightHours) ||
      (filterType === 'raid-hour' && visibleEvents.raidHours) ||
      (filterType === 'other' && visibleEvents.majorEvents);

    if (!isCurrentVisible) {
      if (visibleEvents.communityDays) setFilterType('community-day');
      else if (visibleEvents.spotlightHours) setFilterType('pokemon-spotlight-hour');
      else if (visibleEvents.raidHours) setFilterType('raid-hour');
      else if (visibleEvents.majorEvents) setFilterType('other');
    }
  }, [visibleEvents, filterType]);
  
  const notificationsHook = useNotifications();
  const { triggerNotification } = notificationsHook;

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

  const t = translations[lang];

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('pogo_tracker_lang', newLang);
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

        // First time initializing seen list: store all current event IDs to avoid spamming
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

        if (newEvents.length > 0) {
          newEvents.forEach(event => {
            const title = lang === 'cs'
              ? `Nový event přidán: ${event.name}`
              : lang === 'ja'
              ? `新しいイベントが追加されました: ${event.name}`
              : `New event added: ${event.name}`;
            
            const startDateStr = new Date(event.start).toLocaleDateString(
              lang === 'cs' ? 'cs-CZ' : lang === 'ja' ? 'ja-JP' : 'en-US',
              { day: 'numeric', month: 'long' }
            );

            const bodyText = lang === 'cs'
              ? `Do kalendáře byl přidán nový event "${event.name}" (začíná ${startDateStr}).`
              : lang === 'ja'
              ? `カレンダーに新しいイベント「${event.name}」が追加されました（開始日: ${startDateStr}）。`
              : `A new event "${event.name}" has been added to the calendar (starts on ${startDateStr}).`;

            triggerNotification(
              title,
              bodyText,
              event.eventType || 'major',
              event.link
            );
          });
        }

        // Always save the full list of fresh IDs to keep seen list fully in sync
        const updatedIds = freshEvents.map(e => e.eventID);
        localStorage.setItem('pogo_tracker_seen_event_ids', JSON.stringify(updatedIds));
      };

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
          if (cachedEvents.length === 0) {
            setLoading(true); // Show loading spinner only if we have zero cached events
          }
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

            triggerNotification(
              lang === 'cs' ? `🔴 Začal event: ${event.name}` : `🔴 Active Event: ${event.name}`,
              bodyText,
              event.eventType,
              event.link
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
  }, [events, triggerNotification, lang]);

  // Schedule native system notifications reactively
  useEffect(() => {
    if (events && events.length > 0) {
      notificationsHook.scheduleEventNotifications(events, lang);
    }
  }, [events, notificationsHook.permission, notificationsHook.preferences, lang]);

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
    <div className="web-app-layout">
      {/* Desktop Left Sidebar Navigation */}
      <aside className="desktop-sidebar">
        <div className="sidebar-logo">
          <PokeballLogo size={28} />
          <h1>PoGo Events</h1>
        </div>
        <div className="sidebar-stats">
          {/* Scraper status: last update time */}
          {scraperStatus.lastScrapedAt && (
            <span
              title={scraperStatus.isRunning
                ? (lang === 'cs' ? 'Stahování dat...' : 'Fetching data...')
                : (lang === 'cs' ? `Příští aktualizace: ${new Date(scraperStatus.nextScrapeAt || '').toLocaleTimeString(lang === 'cs' ? 'cs-CZ' : 'en-US', { hour: '2-digit', minute: '2-digit' })}` : `Next update: ${new Date(scraperStatus.nextScrapeAt || '').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)}
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '2px'
              }}
            >
              {scraperStatus.isRunning ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'var(--accent-color)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  {lang === 'cs' ? 'Aktualizuji...' : 'Updating...'}
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={10} />
                  {lang === 'cs' ? 'Aktualizováno: ' : 'Updated: '}
                  {new Date(scraperStatus.lastScrapedAt).toLocaleTimeString(
                    lang === 'cs' ? 'cs-CZ' : 'en-US',
                    { hour: '2-digit', minute: '2-digit' }
                  )}
                </span>
              )}
            </span>
          )}
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-item ${activeTab === 'events' ? 'active' : ''}`} 
            onClick={() => setActiveTab('events')}
          >
            <span className="nav-icon"><Calendar size={20} /></span>
            <span className="nav-text">{t.tabs_events}</span>
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'raid' ? 'active' : ''}`} 
            onClick={() => setActiveTab('raid')}
          >
            <span className="nav-icon"><Swords size={20} /></span>
            <span className="nav-text">{t.tabs_raid}</span>
          </button>

          <button 
            className={`sidebar-nav-item ${activeTab === 'rocket' ? 'active' : ''}`} 
            onClick={() => setActiveTab('rocket')}
          >
            <span className="nav-icon"><Shield size={20} /></span>
            <span className="nav-text">{t.tabs_rocket}</span>
          </button>

          <button 
            className={`sidebar-nav-item ${activeTab === 'ditto' ? 'active' : ''}`} 
            onClick={() => setActiveTab('ditto')}
          >
            <span className="nav-icon"><Sparkles size={20} /></span>
            <span className="nav-text">{t.tabs_ditto}</span>
          </button>

          <button 
            className={`sidebar-nav-item ${activeTab === 'eggs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('eggs')}
          >
            <span className="nav-icon"><Egg size={20} /></span>
            <span className="nav-text">{t.tabs_eggs}</span>
          </button>

          <button 
            className={`sidebar-nav-item ${activeTab === 'ranking' ? 'active' : ''}`} 
            onClick={() => setActiveTab('ranking')}
          >
            <span className="nav-icon"><Trophy size={20} /></span>
            <span className="nav-text">{t.tabs_ranking}</span>
          </button>

          <button 
            className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon"><Settings size={20} /></span>
            <span className="nav-text">{t.tabs_settings}</span>
          </button>
        </nav>
        
        {/* Sidebar Native Ad Placeholder */}
        {showAds && (
          <div className="sidebar-ad-container">
            <AdContainer type="inline" slot="9193535711" lang={lang} />
          </div>
        )}

        {/* Desktop Sidebar Footer */}
        <div 
          className="sidebar-footer" 
          style={{ 
            marginTop: 'auto', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--border-color)', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
            {lang === 'cs' 
              ? 'Tato aplikace je neoficiální fanouškovský projekt. Nemá žádné přidružení ke společnostmi Niantic, Nintendo nebo The Pokémon Company.' 
              : 'This app is an unofficial fan project and has no affiliation with Niantic, Nintendo, or The Pokémon Company.'
            }
          </p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
            {lang === 'cs' ? 'Data událostí poskytuje ' : 'Event data powered by '}{' '}
            <a 
              href="https://leekduck.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-color)', fontWeight: 'bold', textDecoration: 'none' }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Leek Duck
            </a>.
          </p>
          <a 
            href="/privacy-policy.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              fontSize: '11px', 
              color: 'var(--text-muted)', 
              textDecoration: 'underline',
              transition: 'color 0.2s',
              fontWeight: '600',
              marginTop: '4px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {lang === 'cs' ? 'Ochrana soukromí & Právní info' : 'Privacy Policy & Disclaimer'}
          </a>
        </div>
      </aside>

      {/* Main Container */}
      <div className="app-container">
        {/* Mobile Top Header (Hidden on Desktop) */}
        <header className="app-header">
          <div className="header-logo-section">
            <PokeballLogo size={24} />
            <h1>PoGo Events</h1>
          </div>
          <div className="header-stats">
            {/* Scraper status in mobile header */}
            {scraperStatus.lastScrapedAt && (
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                {scraperStatus.isRunning ? (
                  <>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--accent-color)',
                      animation: 'pulse 1.5s ease-in-out infinite',
                      flexShrink: 0
                    }} />
                    {lang === 'cs' ? 'Aktualizuji...' : 'Updating...'}
                  </>
                ) : (
                  <>
                    <Clock size={10} />
                    {new Date(scraperStatus.lastScrapedAt).toLocaleTimeString(
                      lang === 'cs' ? 'cs-CZ' : 'en-US',
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </>
                )}
              </span>
            )}
          </div>
        </header>

        {/* Content Layout Wrapper for splitting Main Content and Ads Sidebar */}
        <div className="content-layout-wrapper">
          <main className="app-main">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>{t.loading_text}</p>
              </div>
            ) : (
              <>
                {activeTab === 'events' && (
                  <div className="tab-content events-tab">
                    {/* Active / Upcoming Status Tabs */}
                    {viewMode !== 'timeline' && (
                      <div className="status-tabs-container">
                        <button 
                          className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
                          onClick={() => setStatusFilter('active')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Play size={14} fill="currentColor" stroke="none" />
                          {lang === 'cs' ? 'Probíhá' : 'Active'}
                        </button>
                        <button 
                          className={`status-tab-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
                          onClick={() => setStatusFilter('upcoming')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Clock size={14} />
                          {lang === 'cs' ? 'Připravuje se' : 'Upcoming'}
                        </button>
                      </div>
                    )}

                    {/* Event Category Filters */}
                    {viewMode !== 'timeline' && (
                      <div className="filter-pill-container" style={{ marginTop: '12px' }}>
                        <button className={`filter-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>{t.filter_all}</button>
                        {visibleEvents.communityDays && (
                          <button className={`filter-pill ${filterType === 'community-day' ? 'active' : ''}`} onClick={() => setFilterType('community-day')}>{t.filter_cd}</button>
                        )}
                        {visibleEvents.spotlightHours && (
                          <button className={`filter-pill ${filterType === 'pokemon-spotlight-hour' ? 'active' : ''}`} onClick={() => setFilterType('pokemon-spotlight-hour')}>{t.filter_spotlight}</button>
                        )}
                        {visibleEvents.raidHours && (
                          <button className={`filter-pill ${filterType === 'raid-hour' ? 'active' : ''}`} onClick={() => setFilterType('raid-hour')}>{t.filter_raid_hour}</button>
                        )}
                        {visibleEvents.majorEvents && (
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
                          getFilteredEvents().map(event => (
                            <EventCard key={event.eventID} event={event} lang={lang} timezone={timezone} />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'raid' && (
                  <div className="tab-content raid-tab">
                    <RaidView events={getAdjustedEvents()} lang={lang} />
                  </div>
                )}

                {activeTab === 'rocket' && (
                  <div className="tab-content rocket-tab">
                    <RocketGuide lang={lang} />
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
                      onOpenAdmin={() => setActiveTab('admin')}
                    />
                  </div>
                )}

                {activeTab === 'admin' && (
                  <div className="tab-content admin-tab">
                    <AdminPanelView lang={lang} onBack={() => setActiveTab('settings')} />
                  </div>
                )}
              </>
            )}
          </main>

          {/* Desktop Right Sidebar (Advertisements & Active Bonuses Widget Removed) */}
          <aside className="desktop-right-sidebar">
            {showAds && (
              <>
                <div className="sidebar-widget-container">
                  <AdContainer type="sidebar" slot="4561558504" lang={lang} />
                </div>

                {/* Second Ad (Medium Rectangle) replacing the Active Bonuses Panel */}
                <div className="sidebar-widget-container">
                  <AdContainer type="rectangle" slot="3032854416" lang={lang} />
                </div>
              </>
            )}
          </aside>
        </div>

        {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
        <nav className="bottom-nav">
          <button className={`nav-item ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            <span className="nav-icon">📅</span>
            <span className="nav-text">{t.tabs_events}</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'raid' ? 'active' : ''}`} onClick={() => setActiveTab('raid')}>
            <span className="nav-icon">👾</span>
            <span className="nav-text">{t.tabs_raid}</span>
          </button>

          <button className={`nav-item ${activeTab === 'rocket' ? 'active' : ''}`} onClick={() => setActiveTab('rocket')}>
            <span className="nav-icon">🚀</span>
            <span className="nav-text">{t.tabs_rocket}</span>
          </button>

          <button className={`nav-item ${activeTab === 'ditto' ? 'active' : ''}`} onClick={() => setActiveTab('ditto')}>
            <span className="nav-icon">✨</span>
            <span className="nav-text">{t.tabs_ditto}</span>
          </button>

          <button className={`nav-item ${activeTab === 'eggs' ? 'active' : ''}`} onClick={() => setActiveTab('eggs')}>
            <span className="nav-icon">🥚</span>
            <span className="nav-text">{t.tabs_eggs}</span>
          </button>

          <button className={`nav-item ${activeTab === 'ranking' ? 'active' : ''}`} onClick={() => setActiveTab('ranking')}>
            <span className="nav-icon">🏆</span>
            <span className="nav-text">{t.tabs_ranking}</span>
          </button>

          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">{t.tabs_settings}</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;

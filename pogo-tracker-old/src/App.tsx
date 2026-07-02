import { useState, useEffect } from 'react';
import { useNotifications } from './hooks/useNotifications';
import { EventCard } from './components/EventCard';
import type { EventData } from './components/EventCard';
import { RaidView } from './components/RaidView';
import { RocketGuide } from './components/RocketGuide';
import { NotificationSettings } from './components/NotificationSettings';
import type { VisibleEventsPreference } from './components/NotificationSettings';
import { ActiveBonuses } from './components/ActiveBonuses';
import { translations } from './data/translations';
import type { Language } from './data/translations';

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

type TabType = 'events' | 'raid' | 'rocket' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [events, setEvents] = useState<EventData[]>(MOCK_EVENTS);
  const [filterType, setFilterType] = useState<string>('other');
  const [statusFilter, setStatusFilter] = useState<'active' | 'upcoming'>('active');
  const [loading, setLoading] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState<'success' | 'fallback'>('fallback');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('pogo_tracker_lang');
    if (saved === 'en' || saved === 'cs') return saved;
    const browserLang = navigator.language.substring(0, 2);
    return browserLang === 'cs' ? 'cs' : 'en';
  });
  const [showBonuses, setShowBonuses] = useState<boolean>(() => {
    const saved = localStorage.getItem('pogo_tracker_show_bonuses');
    return saved !== 'false';
  });
  const [timezone, setTimezone] = useState<string>(() => {
    return localStorage.getItem('pogo_tracker_timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Prague';
  });

  const [visibleEvents, setVisibleEvents] = useState<VisibleEventsPreference>(() => {
    const saved = localStorage.getItem('pogo_tracker_visible_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      communityDays: true,
      spotlightHours: true,
      raidHours: true,
      raidBattles: true,
      rocketTakeovers: true,
      majorEvents: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('pogo_tracker_visible_events', JSON.stringify(visibleEvents));
  }, [visibleEvents]);

  const toggleVisibleEvent = (key: keyof VisibleEventsPreference) => {
    setVisibleEvents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isEventVisible = (eventType: string): boolean => {
    if (eventType === 'community-day' && !visibleEvents.communityDays) return false;
    if (eventType === 'pokemon-spotlight-hour' && !visibleEvents.spotlightHours) return false;
    if (eventType === 'raid-hour' && !visibleEvents.raidHours) return false;
    if (eventType === 'raid-battles' && !visibleEvents.raidBattles) return false;
    if (eventType === 'rocket-takeover' && !visibleEvents.rocketTakeovers) return false;
    
    const specificTypes = ['community-day', 'pokemon-spotlight-hour', 'raid-hour', 'raid-battles', 'rocket-takeover'];
    if (!specificTypes.includes(eventType) && !visibleEvents.majorEvents) return false;
    return true;
  };

  useEffect(() => {
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

      // 1. Try to read from localStorage cache
      const cached = localStorage.getItem('pogo_events_cache');
      const cacheTime = localStorage.getItem('pogo_events_cache_time');
      
      if (cached) {
        try {
          cachedEvents = JSON.parse(cached);
          if (Array.isArray(cachedEvents) && cachedEvents.length > 0) {
            setEvents(cachedEvents);
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
          const response = await fetch('https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json');
          if (!response.ok) throw new Error('API request failed');
          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data);
            setApiStatus('success');
            localStorage.setItem('pogo_events_cache', JSON.stringify(data));
            localStorage.setItem('pogo_events_cache_time', Date.now().toString());
          } else if (cachedEvents.length === 0) {
            setEvents(MOCK_EVENTS);
            setApiStatus('fallback');
          }
        } catch (e) {
          console.error("API Fetch failed, using fallback:", e);
          if (cachedEvents.length > 0) {
            // Keep using cached data, but toggle status to fallback (offline)
            setApiStatus('fallback');
          } else {
            setEvents(MOCK_EVENTS);
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
    
    // Sort events by start date descending
    list.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    // Filter by user visibility settings first
    list = list.filter(e => isEventVisible(e.eventType));

    // Filter by status (active vs upcoming)
    const now = new Date();
    if (statusFilter === 'active') {
      list = list.filter(e => now >= new Date(e.start) && now <= new Date(e.end));
    } else {
      list = list.filter(e => now < new Date(e.start));
    }

    // Filter by type if set
    if (filterType === 'other') {
      const specificTypes = ['community-day', 'pokemon-spotlight-hour', 'raid-hour'];
      list = list.filter(e => !specificTypes.includes(e.eventType));
    } else {
      list = list.filter(e => e.eventType === filterType);
    }

    return list;
  };

  const activeEventsCount = getAdjustedEvents().filter(e => {
    const now = new Date();
    return now >= new Date(e.start) && now <= new Date(e.end) && isEventVisible(e.eventType);
  }).length;

  return (
    <div className="app-container">
      {/* Mobile Top Header */}
      <header className="app-header">
        <div className="header-logo-section">
          <span className="pokeball-icon">🔴</span>
          <h1>PokeGO Tracker</h1>
        </div>
        <div className="header-stats">
          <span className="status-indicator-tag success">
            {apiStatus === 'success' ? t.header_live : t.header_offline}
          </span>
          <span className="active-badge">
            {activeEventsCount} {t.header_active}
          </span>
        </div>
      </header>

      {/* Main Tab Container */}
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
                {/* Active Bonuses Panel */}
                {showBonuses ? (
                  <ActiveBonuses 
                    events={getAdjustedEvents()} 
                    lang={lang} 
                    onClose={() => {
                      setShowBonuses(false);
                      localStorage.setItem('pogo_tracker_show_bonuses', 'false');
                    }} 
                  />
                ) : (
                  <div className="show-bonuses-container">
                    <button 
                      className="show-bonuses-btn" 
                      onClick={() => {
                        setShowBonuses(true);
                        localStorage.setItem('pogo_tracker_show_bonuses', 'true');
                      }}
                    >
                      {t.bonuses_show_btn}
                    </button>
                  </div>
                )}

                {/* Active / Upcoming Status Tabs */}
                <div className="status-tabs-container">
                  <button 
                    className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    🟢 {lang === 'cs' ? 'Probíhá' : 'Active'}
                  </button>
                  <button 
                    className={`status-tab-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('upcoming')}
                  >
                    📅 {lang === 'cs' ? 'Připravuje se' : 'Upcoming'}
                  </button>
                </div>

                {/* Event Category Filters */}
                <div className="filter-pill-container">
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

                {/* Event Feed List */}
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
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
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

        <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">{t.tabs_settings}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;

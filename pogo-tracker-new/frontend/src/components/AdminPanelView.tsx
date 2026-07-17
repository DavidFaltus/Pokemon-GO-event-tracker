import React, { useState, useEffect } from 'react';
import './AdminPanelView.css';
import type { Language } from '../data/translations';
import { API_BASE_URL } from '../config';
import { ArrowLeft, Lock, Plus, Trash2, Save, AlertTriangle, CheckCircle, EyeOff, Search, Edit, Database } from 'lucide-react';
import type { EventData } from './EventCard';

interface AdminPanelViewProps {
  lang: Language;
  onBack: () => void;
}

interface CustomEventOverride {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  extraData?: any;
  isDeleted?: boolean;
  isCustom?: boolean;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ lang, onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  
  // Events state
  const [scrapedEvents, setScrapedEvents] = useState<EventData[]>([]);
  const [customOverrides, setCustomOverrides] = useState<CustomEventOverride[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CustomEventOverride | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listFilter, setListFilter] = useState<'all' | 'custom' | 'hidden'>('all');

  // Form fields
  const [formEventID, setFormEventID] = useState<string>('');
  const [formName, setFormName] = useState<string>('');
  const [formEventType, setFormEventType] = useState<string>('other');
  const [formHeading, setFormHeading] = useState<string>('');
  const [formLink, setFormLink] = useState<string>('');
  const [formImage, setFormImage] = useState<string>('');
  const [formStart, setFormStart] = useState<string>('');
  const [formEnd, setFormEnd] = useState<string>('');
  const [formIsDeleted, setFormIsDeleted] = useState<boolean>(false);
  const [formExtraDataJson, setFormExtraDataJson] = useState<string>('{\n  "bonuses": []\n}');

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
      // 1. Fetch scraped/merged events from public API
      const resPublic = await fetch(`${API_BASE_URL}/api/events`);
      const eventsData = await resPublic.json();
      setScrapedEvents(eventsData);

      // 2. Fetch custom overrides list
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

  const selectEventForEditing = (event: EventData | CustomEventOverride) => {
    setError('');
    setSuccessMsg('');
    
    // Find if there is an existing override in customOverrides
    const override = customOverrides.find(o => o.eventID === event.eventID);
    
    const activeEvent = override || {
      eventID: event.eventID,
      name: event.name,
      eventType: event.eventType,
      heading: event.heading || '',
      link: event.link || '',
      image: event.image || '',
      start: event.start,
      end: event.end,
      extraData: event.extraData || null,
      isDeleted: false,
      isCustom: (event as any).isCustom || false
    };

    setSelectedEvent(activeEvent);
    setFormEventID(activeEvent.eventID);
    setFormName(activeEvent.name);
    setFormEventType(activeEvent.eventType);
    setFormHeading(activeEvent.heading);
    setFormLink(activeEvent.link);
    setFormImage(activeEvent.image);
    
    // Format dates to datetime-local input format (YYYY-MM-DDTHH:mm)
    const formatToInputDate = (isoStr: string) => {
      if (!isoStr) return '';
      return isoStr.substring(0, 16);
    };
    
    setFormStart(formatToInputDate(activeEvent.start));
    setFormEnd(formatToInputDate(activeEvent.end));
    setFormIsDeleted(activeEvent.isDeleted || false);
    
    const extraDataObj = activeEvent.extraData || { bonuses: [] };
    setFormExtraDataJson(JSON.stringify(extraDataObj, null, 2));
  };

  const handleCreateNewEvent = () => {
    setError('');
    setSuccessMsg('');
    
    // Generate new unique ID
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
      extraData: { bonuses: [] }
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
    setFormExtraDataJson(JSON.stringify(newEvent.extraData, null, 2));
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formEventID || !formName || !formStart || !formEnd) {
      setError(lang === 'cs' ? 'Vyplňte prosím základní údaje (ID, Název, Začátek, Konec)' : 'Please fill in basic fields (ID, Name, Start, End)');
      return;
    }

    // Validate JSON
    let parsedExtraData: any = null;
    try {
      if (formExtraDataJson.trim()) {
        parsedExtraData = JSON.parse(formExtraDataJson);
      }
    } catch (err: any) {
      setError((lang === 'cs' ? 'Chybný formát JSON detailů: ' : 'Invalid details JSON format: ') + err.message);
      return;
    }

    const eventPayload: CustomEventOverride = {
      eventID: formEventID,
      name: formName,
      eventType: formEventType,
      heading: formHeading || getHeadingForType(formEventType),
      link: formLink,
      image: formImage,
      start: new Date(formStart).toISOString(),
      end: new Date(formEnd).toISOString(),
      extraData: parsedExtraData,
      isDeleted: formIsDeleted,
      isCustom: selectedEvent?.isCustom || false
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventPayload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Událost byla úspěšně uložena!' : 'Event saved successfully!');
        fetchAdminData(token);
        // Update selection reference
        setSelectedEvent(eventPayload);
      } else {
        setError(data.error || 'Failed to save event');
      }
    } catch (err) {
      setError(lang === 'cs' ? 'Chyba při komunikaci se serverem' : 'Failed to save due to network error');
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    const confirmMsg = lang === 'cs' 
      ? `Opravdu chcete odstranit/skrýt událost "${selectedEvent.name}"?` 
      : `Are you sure you want to delete/hide the event "${selectedEvent.name}"?`;
      
    if (!window.confirm(confirmMsg)) return;

    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/events/${selectedEvent.eventID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(lang === 'cs' ? 'Událost byla odstraněna/skryta' : 'Event deleted/hidden successfully');
        setSelectedEvent(null);
        fetchAdminData(token);
      } else {
        setError(data.error || 'Failed to delete event');
      }
    } catch (err) {
      setError(lang === 'cs' ? 'Chyba při komunikaci se serverem' : 'Network error deleting event');
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

  const insertTemplate = (templateType: 'bonuses' | 'spawns' | 'raids' | 'eggs') => {
    let templateObj: any = {};
    if (templateType === 'bonuses') {
      templateObj = {
        bonuses: [
          "2× XP za chytání Pokémonů (2x Catch XP)",
          "Lure moduly vydrží 3 hodiny (3-hour Lures)"
        ]
      };
    } else if (templateType === 'spawns') {
      templateObj = {
        spawns: [
          { name: "Bulbasaur", image: "", isShinyAvailable: true },
          { name: "Charmander", image: "", isShinyAvailable: true }
        ]
      };
    } else if (templateType === 'raids') {
      templateObj = {
        raidbattles: {
          bosses: [
            { name: "Mewtwo", image: "", canBeShiny: true }
          ]
        }
      };
    } else if (templateType === 'eggs') {
      templateObj = {
        eggs: [
          {
            distance: "7 km",
            contents: [
              { name: "Riolu", image: "", isShinyAvailable: true }
            ]
          }
        ]
      };
    }
    setFormExtraDataJson(JSON.stringify(templateObj, null, 2));
  };

  // Filter list
  const filteredEvents = scrapedEvents.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.eventID.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if it's hidden/deleted override
    const override = customOverrides.find(o => o.eventID === e.eventID);
    const isHidden = override?.isDeleted;
    const isCustom = (e as any).isCustom || override?.isCustom;

    if (listFilter === 'custom') return matchesSearch && isCustom;
    if (listFilter === 'hidden') return matchesSearch && isHidden;
    return matchesSearch;
  });

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-header">
            <Lock size={40} className="login-lock-icon" />
            <h2>{lang === 'cs' ? 'Vstup do Administrace' : 'Admin Portal Access'}</h2>
            <p>{lang === 'cs' ? 'Zadejte přístupové heslo pro úpravu eventů' : 'Enter access password to edit events'}</p>
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
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="login-buttons-row">
              <button type="button" onClick={onBack} className="admin-btn btn-secondary">
                <ArrowLeft size={16} />
                {lang === 'cs' ? 'Zpět' : 'Back'}
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

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div className="dashboard-title-section">
          <h2>{lang === 'cs' ? 'Administrace Událostí' : 'Event Administration'}</h2>
          <span className="admin-badge">Admin Mode</span>
        </div>
        <div className="dashboard-header-buttons">
          <button onClick={handleLogout} className="admin-btn btn-secondary">
            {lang === 'cs' ? 'Odhlásit se' : 'Log Out'}
          </button>
          <button onClick={onBack} className="admin-btn btn-primary">
            <ArrowLeft size={16} />
            {lang === 'cs' ? 'Zpět do aplikace' : 'Back to App'}
          </button>
        </div>
      </div>

      <div className="admin-dashboard-layout">
        {/* Left Side: Events List */}
        <div className="admin-sidebar-list">
          <div className="sidebar-list-controls">
            <button onClick={handleCreateNewEvent} className="admin-btn btn-success add-event-btn">
              <Plus size={16} />
              {lang === 'cs' ? 'Nová Vlastní Událost' : 'New Custom Event'}
            </button>
            
            <div className="search-box-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat událost...' : 'Search events...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <div className="admin-list-tabs">
              <button 
                className={`list-tab-btn ${listFilter === 'all' ? 'active' : ''}`}
                onClick={() => setListFilter('all')}
              >
                {lang === 'cs' ? 'Vše' : 'All'} ({scrapedEvents.length})
              </button>
              <button 
                className={`list-tab-btn ${listFilter === 'custom' ? 'active' : ''}`}
                onClick={() => setListFilter('custom')}
              >
                {lang === 'cs' ? 'Vlastní' : 'Custom'}
              </button>
              <button 
                className={`list-tab-btn ${listFilter === 'hidden' ? 'active' : ''}`}
                onClick={() => setListFilter('hidden')}
              >
                {lang === 'cs' ? 'Skryté' : 'Hidden'}
              </button>
            </div>
          </div>

          <div className="admin-events-scroller">
            {filteredEvents.length === 0 ? (
              <div className="no-events-found">
                <p>{lang === 'cs' ? 'Žádné události neodpovídají filtrům' : 'No events matching filters'}</p>
              </div>
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
                      <span className={`event-type-badge-mini ${event.eventType}`}>
                        {event.eventType}
                      </span>
                      {isCustom && <span className="custom-indicator">vlastní</span>}
                      {isHidden && <span className="hidden-indicator"><EyeOff size={10} /> skrytý</span>}
                    </div>
                    <h4 className="event-item-name">{event.name}</h4>
                    <span className="event-item-dates">
                      {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Edit Form */}
        <div className="admin-form-container">
          {selectedEvent ? (
            <form onSubmit={handleSaveEvent} className="event-edit-form">
              <div className="form-header">
                <h3>
                  <Edit size={18} />
                  {selectedEvent.isCustom 
                    ? (lang === 'cs' ? 'Editovat Vlastní Událost' : 'Edit Custom Event') 
                    : (lang === 'cs' ? 'Upravit / Přepsat Událost' : 'Override Scraped Event')
                  }
                </h3>
                <span className="event-id-lbl">ID: <code>{formEventID}</code></span>
              </div>

              {error && (
                <div className="admin-form-error">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="admin-form-success">
                  <CheckCircle size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="form-grid">
                <div className="form-field">
                  <label>{lang === 'cs' ? 'Název Události' : 'Event Name'}</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Např. Garchomp Raid Day"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Typ Události (Kategorie)' : 'Event Category'}</label>
                  <select
                    value={formEventType}
                    onChange={(e) => setFormEventType(e.target.value)}
                  >
                    <option value="community-day">Community Day</option>
                    <option value="pokemon-spotlight-hour">Spotlight Hour</option>
                    <option value="raid-hour">Raid Hour</option>
                    <option value="raid-battles">Raid Battles</option>
                    <option value="rocket-takeover">Rocket Takeover</option>
                    <option value="hatch-day">Hatch Day / Egg hatching</option>
                    <option value="limited-research">Limited/Special Research</option>
                    <option value="showcase">PokéStop Showcase</option>
                    <option value="other">Ostatní (Major Event)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Hlavička (Heading)' : 'Heading'}</label>
                  <input
                    type="text"
                    value={formHeading}
                    onChange={(e) => setFormHeading(e.target.value)}
                    placeholder="Např. Raid Battles (předvyplní se podle typu)"
                  />
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Odkaz (Link)' : 'Link / URL'}</label>
                  <input
                    type="url"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    placeholder="https://leekduck.com/events/..."
                  />
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Obrázek (Image URL)' : 'Image URL'}</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://cdn.leekduck.com/assets/... nebo Unsplash"
                  />
                </div>

                <div className="form-field">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formIsDeleted}
                      onChange={(e) => setFormIsDeleted(e.target.checked)}
                    />
                    <span className="checkbox-text">
                      {lang === 'cs' ? 'Skrýt tuto událost z aplikace (isDeleted)' : 'Hide this event from the application'}
                    </span>
                  </label>
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Datum a čas začátku (Lokální)' : 'Start Date & Time (Local)'}</label>
                  <input
                    type="datetime-local"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>{lang === 'cs' ? 'Datum a čas konce (Lokální)' : 'End Date & Time (Local)'}</label>
                  <input
                    type="datetime-local"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* JSON Editor for extraData details */}
              <div className="form-field full-width-field text-area-field">
                <div className="textarea-header-row">
                  <label>
                    {lang === 'cs' ? 'Detaily události (JSON extraData)' : 'Event Details (JSON extraData)'}
                  </label>
                  <div className="template-buttons">
                    <button type="button" onClick={() => insertTemplate('bonuses')} className="template-btn">
                      + Bonusy
                    </button>
                    <button type="button" onClick={() => insertTemplate('spawns')} className="template-btn">
                      + Spawny
                    </button>
                    <button type="button" onClick={() => insertTemplate('raids')} className="template-btn">
                      + Raidy
                    </button>
                    <button type="button" onClick={() => insertTemplate('eggs')} className="template-btn">
                      + Vejce
                    </button>
                  </div>
                </div>
                <textarea
                  value={formExtraDataJson}
                  onChange={(e) => setFormExtraDataJson(e.target.value)}
                  placeholder='{\n  "bonuses": []\n}'
                  rows={8}
                  className="json-textarea"
                />
                <span className="textarea-help">
                  {lang === 'cs' 
                    ? 'Zadejte validní JSON objekt. Zde můžete definovat bonusy, divoké spawny (spawns), líhnutí z vajec (eggs) nebo raid bosse (raidbattles).'
                    : 'Provide a valid JSON object. Customize bonuses, wild spawns, egg hatches, or raid bosses.'
                  }
                </span>
              </div>

              <div className="form-action-row">
                <button 
                  type="button" 
                  onClick={handleDeleteEvent}
                  className="admin-btn btn-danger"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Trash2 size={16} />
                  {selectedEvent.isCustom 
                    ? (lang === 'cs' ? 'Smazat' : 'Delete') 
                    : (lang === 'cs' ? 'Skrýt / Zrušit' : 'Hide / Revert')
                  }
                </button>
                <button 
                  type="submit" 
                  className="admin-btn btn-success"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={16} />
                  {lang === 'cs' ? 'Uložit Změny' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="admin-form-placeholder">
              <Database size={48} className="db-placeholder-icon" />
              <p>
                {lang === 'cs' 
                  ? 'Vyberte událost ze seznamu vlevo k úpravě nebo klikněte na "Nová Vlastní Událost".' 
                  : 'Select an event from the list on the left to edit or click "New Custom Event".'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

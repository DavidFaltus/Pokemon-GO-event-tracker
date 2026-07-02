import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import type { NotificationPreference } from '../hooks/useNotifications';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

export interface VisibleEventsPreference {
  communityDays: boolean;
  spotlightHours: boolean;
  raidHours: boolean;
  raidBattles: boolean;
  rocketTakeovers: boolean;
  majorEvents: boolean;
}

interface NotificationSettingsProps {
  notificationsHook: ReturnType<typeof useNotifications>;
  lang: Language;
  setLang: (lang: Language) => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  visibleEvents: VisibleEventsPreference;
  toggleVisibleEvent: (key: keyof VisibleEventsPreference) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notificationsHook,
  lang,
  setLang,
  timezone,
  setTimezone,
  visibleEvents,
  toggleVisibleEvent,
}) => {
  const [gpsSyncing, setGpsSyncing] = React.useState(false);
  const [syncStatus, setSyncStatus] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    permission,
    preferences,
    requestPermission,
    togglePreference,
    triggerNotification
  } = notificationsHook;

  const t = translations[lang];

  const syncTimezoneWithGps = () => {
    if (!navigator.geolocation) {
      setSyncStatus({
        type: 'error',
        text: lang === 'cs' ? 'Geolokace není tímto prohlížečem podporována.' : 'Geolocation is not supported by this browser.'
      });
      return;
    }

    setGpsSyncing(true);
    setSyncStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`);
          if (!response.ok) throw new Error('Timezone API request failed');
          const data = await response.json();
          if (data && data.timeZone) {
            const detectedTz = data.timeZone;
            localStorage.setItem('pogo_tracker_timezone', detectedTz);
            setTimezone(detectedTz);
            setSyncStatus({
              type: 'success',
              text: `${t.gps_success}${detectedTz}`
            });
          } else {
            throw new Error('No timezone in API response');
          }
        } catch (error) {
          console.error("GPS Sync failed:", error);
          setSyncStatus({
            type: 'error',
            text: t.gps_error
          });
        } finally {
          setGpsSyncing(false);
        }
      },
      (error) => {
        console.error("Geolocation failed:", error);
        setSyncStatus({
          type: 'error',
          text: t.gps_error
        });
        setGpsSyncing(false);
      },
      { timeout: 10000 }
    );
  };

  const isEnabled = permission === 'granted';

  const testNotification = () => {
    triggerNotification(
      lang === 'cs' ? "🎯 Testovací notifikace" : "🎯 Test Notification",
      lang === 'cs' 
        ? "Vše funguje! Budeme vás upozorňovat na začátky Pokémon GO eventů s meta radami." 
        : "Everything works! We will notify you when Pokemon GO events start with helpful tips.",
      "general"
    );
  };

  const getPrefLabel = (key: keyof NotificationPreference) => {
    switch(key) {
      case 'all': return t.pref_all;
      case 'communityDays': return t.pref_cd;
      case 'spotlightHours': return t.pref_spotlight;
      case 'raidHours': return t.pref_raid_hour;
      case 'majorEvents': return t.pref_major;
      case 'rocketTakeovers': return t.pref_rocket;
    }
  };

  const getVisibleEventLabel = (key: keyof VisibleEventsPreference) => {
    switch(key) {
      case 'communityDays': return t.pref_cd;
      case 'spotlightHours': return t.pref_spotlight;
      case 'raidHours': return t.pref_raid_hour;
      case 'raidBattles': return t.pref_raid_battles;
      case 'rocketTakeovers': return t.pref_rocket;
      case 'majorEvents': return t.pref_major;
    }
  };

  const getStatusLabel = (perm: NotificationPermission) => {
    if (perm === 'granted') return t.settings_granted;
    if (perm === 'denied') return t.settings_denied;
    return t.settings_default;
  };

  return (
    <div className="notification-settings-panel">
      {/* Language Picker */}
      <div className="settings-card language-picker-card">
        <h3>🌐 {t.settings_language}</h3>
        <div className="language-selector-wrapper">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="language-select"
          >
            <option value="cs">Čeština (Czech)</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* GPS Timezone Synchronization */}
      <div className="settings-card gps-sync-card">
        <h3>{t.gps_title}</h3>
        <div className="gps-sync-box">
          <div className="timezone-display">
            <span className="tz-label">{t.gps_current_tz}</span>
            <code className="tz-code">{timezone}</code>
          </div>
          
          <button 
            className="primary-btn gps-btn" 
            onClick={syncTimezoneWithGps}
            disabled={gpsSyncing}
          >
            {gpsSyncing ? t.gps_syncing : t.gps_sync_btn}
          </button>
          
          {syncStatus && (
            <div className={`sync-status-msg ${syncStatus.type}`}>
              {syncStatus.type === 'success' ? '✅ ' : '❌ '}{syncStatus.text}
            </div>
          )}
        </div>
      </div>

      {/* Native Browser Notification Request */}
      <div className="settings-card permission-card">
        <h3>🔔 {t.settings_push_title}</h3>
        <div className="permission-status-box">
          <div className="status-indicator">
            {t.settings_status} <span className={`status-badge ${permission}`}>{getStatusLabel(permission)}</span>
          </div>
          {!isEnabled && (
            <button className="primary-btn" onClick={requestPermission}>
              {t.settings_enable_btn}
            </button>
          )}
          {isEnabled && (
            <button className="secondary-btn" onClick={testNotification}>
              {t.settings_test_btn}
            </button>
          )}
        </div>
        <p className="help-text">{t.settings_help}</p>
      </div>

      {/* Preferences Toggles */}
      <div className="settings-card preferences-card">
        <h3>⚙️ {t.settings_filter_title}</h3>
        <div className="checkbox-list">
          {(Object.keys(preferences) as Array<keyof NotificationPreference>).map(key => (
            <label key={key} className="checkbox-item">
              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={() => togglePreference(key)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">{getPrefLabel(key)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Event Visibility Toggles */}
      <div className="settings-card preferences-card">
        <h3>📅 {t.settings_visibility_title}</h3>
        <div className="checkbox-list">
          {(Object.keys(visibleEvents) as Array<keyof VisibleEventsPreference>).map(key => (
            <label key={key} className="checkbox-item">
              <input
                type="checkbox"
                checked={visibleEvents[key]}
                onChange={() => toggleVisibleEvent(key)}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">{getVisibleEventLabel(key)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

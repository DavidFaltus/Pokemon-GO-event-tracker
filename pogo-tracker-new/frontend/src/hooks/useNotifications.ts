import { useState, useEffect } from 'react';

export interface NotificationPreference {
  all: boolean;
  communityDays: boolean;
  spotlightHours: boolean;
  raidHours: boolean;
  majorEvents: boolean;
  rocketTakeovers: boolean;
  goBattleLeague: boolean;
  maxMondays: boolean;
}

export interface InAppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  type: string;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  const [preferences, setPreferences] = useState<NotificationPreference>(() => {
    const saved = localStorage.getItem('pogo_tracker_notif_prefs');
    const defaults = {
      all: true,
      communityDays: true,
      spotlightHours: true,
      raidHours: true,
      majorEvents: true,
      rocketTakeovers: true,
      goBattleLeague: true,
      maxMondays: true,
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      } catch (e) { /* ignore */ }
    }
    return defaults;
  });

  const [inAppNotifications, setInAppNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem('pogo_tracker_in_app_notifs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
      } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Sync permissions on load
  useEffect(() => {
    const checkNotificationPermission = async () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        setPermission(Notification.permission);
      }
    };
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    localStorage.setItem('pogo_tracker_notif_prefs', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('pogo_tracker_in_app_notifs', JSON.stringify(inAppNotifications));
  }, [inAppNotifications]);

  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Tento prohlížeč nepodporuje push notifikace.');
      return false;
    }
    
    try {
      const resp = await Notification.requestPermission();
      setPermission(resp);
      return resp === 'granted';
    } catch (e) {
      console.error("Chyba při žádosti o povolení notifikací", e);
      return false;
    }
  };

  // Helper to determine if an event type is enabled by user preferences
  const shouldNotifyForType = (type: string): boolean => {
    if (!preferences.all) return false;
    if (type === 'community-day' && !preferences.communityDays) return false;
    if (type === 'pokemon-spotlight-hour' && !preferences.spotlightHours) return false;
    if (type === 'raid-hour' && !preferences.raidHours) return false;
    if (type === 'rocket-takeover' && !preferences.rocketTakeovers) return false;
    if ((type === 'go-battle-league' || type === 'go-battle-day') && !preferences.goBattleLeague) return false;
    if ((type === 'max-mondays' || type === 'max-monday') && !preferences.maxMondays) return false;
    if (type === 'major' && !preferences.majorEvents) return false;
    return true;
  };

  const triggerNotification = (title: string, body: string, type: string, eventLink?: string) => {
    if (!shouldNotifyForType(type)) return;

    // 1. Add to In-App Notification Center
    const newNotif: InAppNotification = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      body,
      timestamp: new Date(),
      read: false,
      type
    };
    setInAppNotifications(prev => [newNotif, ...prev].slice(0, 50)); // Keep last 50

    // 2. Trigger web notification
    if (permission === 'granted') {
      try {
        const options: NotificationOptions = {
          body,
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: newNotif.id,
          requireInteraction: false
        };
        const n = new Notification(title, options);
        if (eventLink) {
          n.onclick = (e) => {
            e.preventDefault();
            window.open(eventLink, '_blank');
          };
        }
      } catch (e) {
        console.error("Webová notifikace selhala", e);
      }
    }
  };

  // Web scheduling placeholder (not supported standardly in browsers without service workers)
  const scheduleEventNotifications = async (_events: any[], _lang: 'cs' | 'en') => {
    // Standard web push notifications are scheduled from the backend.
    // In frontend-only web app we just log that we would schedule notifications.
    console.log("Browser notifications are active in real-time.");
  };

  const markAllAsRead = () => {
    setInAppNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setInAppNotifications([]);
  };

  const togglePreference = (key: keyof NotificationPreference) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    permission,
    preferences,
    inAppNotifications,
    requestPermission,
    triggerNotification,
    scheduleEventNotifications,
    markAllAsRead,
    clearNotifications,
    togglePreference
  };
}

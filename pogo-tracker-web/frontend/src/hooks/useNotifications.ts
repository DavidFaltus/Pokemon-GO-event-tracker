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

const isNative = typeof window !== 'undefined' && !!(window as any).Capacitor;
const CAPACITOR_NOTIF_PKG = '@capacitor/local-notifications';

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
      if (isNative) {
        try {
          // @ts-ignore
          const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
          const perm = await LocalNotifications.checkPermissions();
          const mapped = perm.display === 'granted' ? 'granted' : perm.display === 'denied' ? 'denied' : 'default';
          setPermission(mapped);
        } catch (e) {
          console.error("Capacitor checkPermissions failed:", e);
        }
      } else {
        // Web version: disabled
        setPermission('default');
      }
    };
    checkNotificationPermission();
  }, []);

  // Listen for native notification actions (clicks)
  useEffect(() => {
    if (isNative) {
      // @ts-ignore
      import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG).then(({ LocalNotifications }) => {
        LocalNotifications.addListener('localNotificationActionPerformed', (action: any) => {
          const eventLink = action.notification.extra?.eventLink;
          if (eventLink) {
            window.open(eventLink, '_blank');
          }
        });
      }).catch(e => console.error("Failed to register notification action listener:", e));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pogo_tracker_notif_prefs', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('pogo_tracker_in_app_notifs', JSON.stringify(inAppNotifications));
  }, [inAppNotifications]);

  const requestPermission = async () => {
    if (!isNative) {
      return false; // Web version: no notifications
    }
    
    try {
      // @ts-ignore
      const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
      const resp = await LocalNotifications.requestPermissions();
      const mapped = resp.display === 'granted' ? 'granted' : resp.display === 'denied' ? 'denied' : 'default';
      setPermission(mapped);
      return resp.display === 'granted';
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

  const triggerNotification = async (title: string, body: string, type: string, eventLink?: string) => {
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

    // 2. Trigger native notification
    if (isNative && permission === 'granted') {
      try {
        // @ts-ignore
        const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Math.floor(Math.random() * 1000000),
              schedule: { at: new Date(Date.now() + 500) },
              extra: { eventLink }
            }
          ]
        });
      } catch (e) {
        console.error("Local notification failed", e);
      }
    }
  };

  const scheduleEventNotifications = async (_events: any[], _lang: 'cs' | 'en') => {
    // Real-time notification checks are run client-side on event list changes.
    console.log("Real-time notifications check run on client.");
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

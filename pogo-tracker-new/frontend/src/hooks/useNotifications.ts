import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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

// Helper to generate a unique 32-bit positive integer from a string ID
const getNotificationId = (eventId: string): number => {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = (hash << 5) - hash + eventId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % 2147483647; // Ensure positive 32-bit integer
};

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
      if (Capacitor.isNativePlatform()) {
        try {
          const status = await LocalNotifications.checkPermissions();
          setPermission(status.display === 'granted' ? 'granted' : 'default');
        } catch (e) {
          console.error("Failed to check Capacitor local notification permissions", e);
        }
      } else if (typeof window !== 'undefined' && 'Notification' in window) {
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
    if (Capacitor.isNativePlatform()) {
      try {
        const status = await LocalNotifications.requestPermissions();
        const isGranted = status.display === 'granted';
        setPermission(isGranted ? 'granted' : 'denied');
        return isGranted;
      } catch (e) {
        console.error("Chyba při žádosti o povolení nativních notifikací", e);
        return false;
      }
    }

    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Tento prohlížeč nepodporuje nativní push notifikace.');
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

    // 2. Trigger native/web notification
    if (permission === 'granted') {
      if (Capacitor.isNativePlatform()) {
        LocalNotifications.schedule({
          notifications: [
            {
              id: getNotificationId(newNotif.id),
              title,
              body,
              schedule: { at: new Date(Date.now() + 500) }, // Trigger almost immediately (0.5s)
              extra: eventLink ? { url: eventLink } : null
            }
          ]
        }).catch(err => console.error("Native notification trigger failed", err));
      } else {
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
          console.error("Nativní webová notifikace selhala", e);
        }
      }
    }
  };

  // Schedule all future events as local notifications on the device
  const scheduleEventNotifications = async (events: any[], lang: 'cs' | 'en') => {
    if (!Capacitor.isNativePlatform()) return;
    if (permission !== 'granted') return;

    try {
      // 1. Cancel all previously scheduled notifications to start fresh
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({
          notifications: pending.notifications.map(n => ({ id: n.id }))
        });
      }

      // 2. Filter events starting in the future
      const now = new Date();
      const upcomingEvents = events.filter(event => {
        const startTime = new Date(event.start);
        return startTime > now && shouldNotifyForType(event.eventType);
      });

      if (upcomingEvents.length === 0) return;

      // 3. Map events to Local Notification schedule format (up to a limit, e.g. 50 upcoming events)
      const notificationsToSchedule = upcomingEvents.slice(0, 50).map(event => {
        const startTime = new Date(event.start);
        const id = getNotificationId(event.eventID);

        let bodyText = lang === 'cs'
          ? `Event ${event.name} právě začíná! Otevřete aplikaci pro zobrazení meta doporučení.`
          : `Event ${event.name} is now active! Open the app to check raid counters and details.`;

        // Customize body text
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
            : `${event.name} is starting! Evolve for the exclusive featured move!`;
        }

        const title = lang === 'cs' ? `🔔 Pokémon GO: Event začíná!` : `🔔 Pokémon GO: Event active!`;

        return {
          id,
          title,
          body: `${event.name}\n${bodyText}`,
          schedule: { at: startTime },
          extra: { eventID: event.eventID, link: event.link }
        };
      });

      // 4. Schedule native notifications
      await LocalNotifications.schedule({
        notifications: notificationsToSchedule
      });

      console.log(`Scheduled ${notificationsToSchedule.length} native event notifications.`);
    } catch (e) {
      console.error("Failed to schedule local notifications:", e);
    }
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

import { useState, useEffect, useCallback } from 'react';
import type { Language } from '../data/translations';

export interface NotificationPreference {
  all: boolean;
  communityDays: boolean;
  spotlightHours: boolean;
  raidHours: boolean;
  majorEvents: boolean;
  rocketTakeovers: boolean;
  goBattleLeague: boolean;
  maxMondays: boolean;
  newEvents: boolean; // Notify when new events are added to the calendar
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

// localStorage key for scheduled notification IDs (Record<eventID, notifId[]>)
const STORAGE_SCHEDULED_IDS = 'pogo_tracker_scheduled_notif_ids';

/**
 * Generates a stable numeric notification ID from an event ID string.
 * Capacitor LocalNotifications requires integer IDs.
 * suffix=0 → event start notification
 * suffix=1 → 30-minute reminder
 */
function makeNotifId(eventId: string, suffix: number = 0): number {
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = ((hash << 5) - hash + eventId.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % 2000000) + suffix;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  const [preferences, setPreferences] = useState<NotificationPreference>(() => {
    const defaults: NotificationPreference = {
      all: true,
      communityDays: true,
      spotlightHours: true,
      raidHours: true,
      majorEvents: true,
      rocketTakeovers: true,
      goBattleLeague: true,
      maxMondays: true,
      newEvents: true,
    };
    if (typeof window === 'undefined') return defaults;
    const saved = localStorage.getItem('pogo_tracker_notif_prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      } catch (e) { /* ignore */ }
    }
    return defaults;
  });

  const [inAppNotifications, setInAppNotifications] = useState<InAppNotification[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('pogo_tracker_in_app_notifs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
      } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Check notification permission on load
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
        setPermission('default');
      }
    };
    checkNotificationPermission();
  }, []);

  // Listen for notification tap → open event link
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
    if (!isNative) return false;
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

  // Returns true if user wants notifications for this event type
  const shouldNotifyForType = useCallback((type: string): boolean => {
    if (!preferences.all) return false;
    if (type === 'community-day' && !preferences.communityDays) return false;
    if (type === 'pokemon-spotlight-hour' && !preferences.spotlightHours) return false;
    if (type === 'raid-hour' && !preferences.raidHours) return false;
    if (type === 'rocket-takeover' && !preferences.rocketTakeovers) return false;
    if ((type === 'go-battle-league' || type === 'go-battle-day') && !preferences.goBattleLeague) return false;
    if ((type === 'max-mondays' || type === 'max-monday') && !preferences.maxMondays) return false;
    if (type === 'major' && !preferences.majorEvents) return false;
    if (type === 'new-event' && !preferences.newEvents) return false;
    return true;
  }, [preferences]);

  /**
   * Fires an immediate notification (in-app + native).
   * Used for "event just started" checks while app is open.
   */
  const triggerNotification = useCallback(async (
    title: string,
    body: string,
    type: string,
    eventLink?: string
  ) => {
    if (!shouldNotifyForType(type)) return;

    // In-app notification center entry
    const newNotif: InAppNotification = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      body,
      timestamp: new Date(),
      read: false,
      type
    };
    setInAppNotifications(prev => [newNotif, ...prev].slice(0, 50));

    // Native immediate notification
    if (isNative && permission === 'granted') {
      try {
        // @ts-ignore
        const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
        await LocalNotifications.schedule({
          notifications: [{
            title,
            body,
            id: Math.floor(Math.random() * 1000000),
            schedule: { at: new Date(Date.now() + 500) },
            extra: { eventLink }
          }]
        });
      } catch (e) {
        console.error("Local notification failed", e);
      }
    }
  }, [shouldNotifyForType, permission]);

  /**
   * Sends an immediate notification for newly discovered events.
   * Batches multiple new events into a single summary notification.
   * Called by App.tsx detectNewlyAddedEvents().
   */
  const notifyNewEvents = useCallback(async (newEvents: any[], lang: Language) => {
    if (!preferences.all || !preferences.newEvents) return;
    if (newEvents.length === 0) return;

    const filtered = newEvents.filter(e => shouldNotifyForType(e.eventType || 'major'));
    if (filtered.length === 0) return;

    let title: string;
    let body: string;

    if (filtered.length === 1) {
      const ev = filtered[0];
      const startStr = new Date(ev.start).toLocaleDateString(
        lang === 'cs' ? 'cs-CZ' : 'en-US',
        { day: 'numeric', month: 'long' }
      );
      title = lang === 'cs'
        ? `🆕 Nový event: ${ev.name}`
        : `🆕 New event: ${ev.name}`;
      body = lang === 'cs'
        ? `Do kalendáře přibyl event „${ev.name}" (začíná ${startStr}).`
        : `"${ev.name}" was added to the calendar (starts ${startStr}).`;
    } else {
      title = lang === 'cs'
        ? `🆕 ${filtered.length} nové eventy přidány`
        : `🆕 ${filtered.length} new events added`;
      const names = filtered.slice(0, 3).map(e => e.name).join(', ');
      const suffix = filtered.length > 3 ? (lang === 'cs' ? ' a další...' : ' and more...') : '';
      body = lang === 'cs'
        ? `Přibyly nové eventy: ${names}${suffix}`
        : `New events added: ${names}${suffix}`;
    }

    // In-app
    setInAppNotifications(prev => [{
      id: Math.random().toString(36).substring(2, 9),
      title,
      body,
      timestamp: new Date(),
      read: false,
      type: 'new-event'
    }, ...prev].slice(0, 50));

    // Native
    if (isNative && permission === 'granted') {
      try {
        // @ts-ignore
        const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
        await LocalNotifications.schedule({
          notifications: [{
            title,
            body,
            id: Math.floor(Math.random() * 1000000),
            schedule: { at: new Date(Date.now() + 800) },
            channelId: 'new-events',
            extra: { eventLink: filtered[0]?.link }
          }]
        });
      } catch (e) {
        console.error("New event native notification failed:", e);
      }
    }
  }, [preferences, shouldNotifyForType, permission]);

  /**
   * Pre-schedules LocalNotifications for ALL upcoming events at their exact start times
   * AND 30 minutes before. These fire even when the app is COMPLETELY CLOSED on Android.
   *
   * Flow:
   *  1. Cancel all previously scheduled notifications (to avoid duplicates).
   *  2. For each upcoming event the user cares about, schedule:
   *     - A "30 min before" reminder
   *     - A "starting now" notification at event start
   *  3. Persist the scheduled IDs to localStorage for future cancellation.
   *
   * Called every time the events list is refreshed from the server.
   */
  const scheduleEventNotifications = useCallback(async (events: any[], lang: Language) => {
    if (!isNative || permission !== 'granted') return;
    if (!preferences.all) return;

    try {
      // @ts-ignore
      const { LocalNotifications } = await import(/* @vite-ignore */ CAPACITOR_NOTIF_PKG);
      const now = new Date();

      // Step 1: Cancel previously scheduled notifications
      let oldScheduledMap: Record<string, number[]> = {};
      try {
        const stored = localStorage.getItem(STORAGE_SCHEDULED_IDS);
        if (stored) oldScheduledMap = JSON.parse(stored);
      } catch { /* ignore */ }

      const allOldIds = Object.values(oldScheduledMap).flat();
      if (allOldIds.length > 0) {
        try {
          await LocalNotifications.cancel({ notifications: allOldIds.map(id => ({ id })) });
        } catch { /* ignore cancel errors */ }
      }

      // Step 2: Build new notification list
      const toSchedule: any[] = [];
      const newScheduledMap: Record<string, number[]> = {};

      for (const event of events) {
        const start = new Date(event.start);
        const end = new Date(event.end);

        // Skip expired events
        if (end <= now) continue;
        // Skip types user disabled
        if (!shouldNotifyForType(event.eventType || 'major')) continue;

        const scheduledIds: number[] = [];
        const type = event.eventType || 'major';

        // ── Build localized messages ──
        let startTitle: string;
        let startBody: string;

        switch (type) {
          case 'community-day':
            startTitle = lang === 'cs' ? '🔴 Community Day začíná!' : '🔴 Community Day starting!';
            startBody = lang === 'cs'
              ? `${event.name} právě začal – evolujte pro speciální útok!`
              : `${event.name} has started – evolve for the special move!`;
            break;
          case 'pokemon-spotlight-hour':
            startTitle = lang === 'cs' ? '⭐ Spotlight Hour začíná!' : '⭐ Spotlight Hour starting!';
            startBody = lang === 'cs'
              ? `${event.name} – rychle chytejte!`
              : `${event.name} – go catch 'em!`;
            break;
          case 'raid-hour':
            startTitle = lang === 'cs' ? '⚔️ Raid Hour začíná!' : '⚔️ Raid Hour starting!';
            startBody = lang === 'cs'
              ? 'Připravte Remote Passy – raidy jsou aktivní!'
              : 'Get your Remote Passes ready – raids are active!';
            break;
          case 'rocket-takeover':
            startTitle = lang === 'cs' ? '🚀 Team GO Rocket útočí!' : '🚀 Team GO Rocket Takeover!';
            startBody = lang === 'cs'
              ? 'Porazte Rocketáky a zachraňte Pokémony!'
              : 'Defeat Team GO Rocket and rescue Pokémon!';
            break;
          case 'hatch-day':
            startTitle = lang === 'cs' ? '🥚 Hatch Day začíná!' : '🥚 Hatch Day starting!';
            startBody = lang === 'cs'
              ? `${event.name} – líhněte vejce!`
              : `${event.name} – hatch those eggs!`;
            break;
          default:
            startTitle = lang === 'cs' ? `📅 Event začíná: ${event.name}` : `📅 Event live: ${event.name}`;
            startBody = lang === 'cs'
              ? 'Nový event v Pokémon GO je právě aktivní!'
              : 'A new Pokémon GO event is now live!';
        }

        // ── Schedule "starts now" notification ──
        if (start > now) {
          const startId = makeNotifId(event.eventID, 0);
          toSchedule.push({
            title: startTitle,
            body: startBody,
            id: startId,
            schedule: { at: start },
            channelId: 'events',
            extra: { eventLink: event.link, eventID: event.eventID }
          });
          scheduledIds.push(startId);
        }

        // ── Schedule "30 minutes before" reminder ──
        const thirtyBefore = new Date(start.getTime() - 30 * 60 * 1000);
        if (thirtyBefore > now) {
          const reminderId = makeNotifId(event.eventID, 1);
          const reminderTitle = lang === 'cs'
            ? `⏰ Brzy začíná: ${event.name}`
            : `⏰ Starting soon: ${event.name}`;
          const reminderBody = lang === 'cs'
            ? 'Event začne za 30 minut. Připravte se!'
            : 'Event starts in 30 minutes. Get ready!';
          toSchedule.push({
            title: reminderTitle,
            body: reminderBody,
            id: reminderId,
            schedule: { at: thirtyBefore },
            channelId: 'events',
            extra: { eventLink: event.link, eventID: event.eventID }
          });
          scheduledIds.push(reminderId);
        }

        if (scheduledIds.length > 0) {
          newScheduledMap[event.eventID] = scheduledIds;
        }
      }

      // Step 3: Schedule batch
      if (toSchedule.length > 0) {
        await LocalNotifications.schedule({ notifications: toSchedule });
        console.log(
          `[Notifications] Scheduled ${toSchedule.length} notifications` +
          ` for ${Object.keys(newScheduledMap).length} upcoming events`
        );
      }

      // Step 4: Persist new schedule map for future cancellation
      localStorage.setItem(STORAGE_SCHEDULED_IDS, JSON.stringify(newScheduledMap));

    } catch (e) {
      console.error("scheduleEventNotifications failed:", e);
    }
  }, [permission, preferences, shouldNotifyForType]);

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
    notifyNewEvents,
    scheduleEventNotifications,
    markAllAsRead,
    clearNotifications,
    togglePreference
  };
}

import type { EventData } from '../components/EventCard';

export interface InfographicCategory {
  title: string;
  colorTheme: 'green' | 'blue' | 'orange' | 'red' | 'gold' | 'default';
  events: EventData[];
}

export interface CategorizedEvents {
  communityDays: InfographicCategory;
  raids: InfographicCategory;
  spotlights: InfographicCategory;
  raidHours: InfographicCategory;
  dynamax: InfographicCategory;
  goPass: InfographicCategory;
  other: InfographicCategory;
}

export interface DayTimeline {
  date: Date;
  dayName: string;
  event: EventData | null;
}

const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Removes redundant suffix / prefix text from event names to clean them up.
 */
export const cleanEventName = (name: string): string => {
  return name
    .replace(/\s+in\s+5-Star\s+Raid\s+Battles/gi, '')
    .replace(/\s+in\s+Mega\s+Raids/gi, '')
    .replace(/\s+in\s+Shadow\s+Raids/gi, '')
    .replace(/\s+during\s+Max\s+Monday/gi, '')
    .replace(/\s+Spotlight\s+Hour/gi, '')
    .replace(/\s+Raid\s+Hour/gi, '')
    .trim();
};

/**
 * Extracts featured Spotlight Hour bonus text if available.
 */
export const getSpotlightBonus = (item: EventData): string | null => {
  if (!item) return null;
  const spotlightExtra = (item.extraData as any)?.spotlight;
  if (spotlightExtra?.bonus && typeof spotlightExtra.bonus === 'string') {
    return spotlightExtra.bonus;
  }
  
  const textToSearch = `${item.name} ${item.heading || ''}`;
  if (/2[x×]\s*catch\s*stardust/i.test(textToSearch)) return '2× Catch Stardust';
  if (/2[x×]\s*catch\s*xp/i.test(textToSearch)) return '2× Catch XP';
  if (/2[x×]\s*catch\s*candy/i.test(textToSearch)) return '2× Catch Candy';
  if (/2[x×]\s*transfer\s*candy/i.test(textToSearch)) return '2× Transfer Candy';
  if (/2[x×]\s*evolve\s*xp/i.test(textToSearch)) return '2× Evolve XP';
  if (/2[x×]\s*hatch\s*stardust/i.test(textToSearch)) return '2× Hatch Stardust';
  if (/2[x×]\s*hatch\s*xp/i.test(textToSearch)) return '2× Hatch XP';

  return null;
};

/**
 * Calculates the full Monday to Sunday calendar week range for a given week number.
 */
export const getWeekMondayToSundayRange = (
  weekNum: number,
  monthIndex: number,
  year: number
): { monday: Date; sunday: Date } => {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const dayOfWeek = firstOfMonth.getDay();
  let firstMondayDate = 1;
  if (dayOfWeek !== 1) {
    firstMondayDate = 1 + ((8 - (dayOfWeek === 0 ? 7 : dayOfWeek)) % 7);
  }
  const firstMonday = new Date(year, monthIndex, firstMondayDate);

  const monday = new Date(firstMonday.getFullYear(), firstMonday.getMonth(), firstMonday.getDate() + (weekNum - 1) * 7);
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);

  return { monday, sunday };
};

/**
 * Filter events for a given month and year.
 * Excludes Ultra League (PvP) events.
 */
export const filterEventsForMonth = (events: EventData[], monthIndex: number, year: number): EventData[] => {
  const startOfMonth = new Date(year, monthIndex, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

  return events.filter((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    
    const overlaps = start <= endOfMonth && end >= startOfMonth;
    if (!overlaps) return false;

    const nameLower = e.name.toLowerCase();
    const isPvP = (e.extraData as any)?.isPvP || e.eventType === 'gbl' || nameLower.includes('ultra league') || nameLower.includes('master league') || nameLower.includes('great league') || nameLower.includes('fantasy cup');
    
    return !isPvP;
  });
};

/**
 * Categorize events for Monthly Infographics and assign appropriate theme colors.
 */
export const categorizeMonthlyEvents = (events: EventData[]): CategorizedEvents => {
  const communityDays: EventData[] = [];
  const raids: EventData[] = [];
  const spotlights: EventData[] = [];
  const raidHours: EventData[] = [];
  const dynamax: EventData[] = [];
  const goPass: EventData[] = [];
  const other: EventData[] = [];

  events.forEach((e) => {
    const nameLower = e.name.toLowerCase();
    const type = e.eventType;

    if (type === 'ticket-event' || nameLower.includes('ticket') || nameLower.includes('pass') || nameLower.includes('bounty')) {
      goPass.push(e);
    }
    else if (type === 'max-mondays' || nameLower.includes('dynamax') || nameLower.includes('gigantamax') || nameLower.includes('max battle') || type.startsWith('max-')) {
      dynamax.push(e);
    }
    else if (
      type === 'community-day' ||
      type === 'hatch-day' ||
      type === 'research-day' ||
      type === 'wild-area' ||
      type === 'go-fest' ||
      type === 'safari-zone' ||
      nameLower.includes('community day')
    ) {
      communityDays.push(e);
    }
    else if (type === 'raid-hour' || nameLower.includes('raid hour')) {
      raidHours.push(e);
    }
    else if (
      type.includes('raid') ||
      nameLower.includes('raid rotation') ||
      nameLower.includes('mega raid') ||
      nameLower.includes('primal raid')
    ) {
      raids.push(e);
    }
    else if (type === 'pokemon-spotlight-hour' || nameLower.includes('spotlight hour')) {
      spotlights.push(e);
    }
    else {
      other.push(e);
    }
  });

  return {
    communityDays: { title: 'Community Days & Major', colorTheme: 'green', events: communityDays },
    raids: { title: 'Legendary & Mega Raids', colorTheme: 'blue', events: raids },
    spotlights: { title: 'Spotlight Hours', colorTheme: 'orange', events: spotlights },
    raidHours: { title: 'Raid Hours', colorTheme: 'blue', events: raidHours },
    dynamax: { title: 'Dynamax Battles', colorTheme: 'red', events: dynamax },
    goPass: { title: 'Monthly Go Pass & Tickets', colorTheme: 'gold', events: goPass },
    other: { title: 'Other Events', colorTheme: 'default', events: other }
  };
};

/**
 * Generate a weekly timeline from Monday to Sunday for the specified week number.
 * Skip days with no active/starting events.
 */
export const generateWeeklyTimeline = (
  events: EventData[],
  weekNum: number,
  monthIndex: number,
  year: number
): DayTimeline[] => {
  const { monday } = getWeekMondayToSundayRange(weekNum, monthIndex, year);
  const timeline: DayTimeline[] = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const dayStart = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), 0, 0, 0, 0);
    const dayEnd = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), 23, 59, 59, 999);

    const activeEvents = events.filter((e) => {
      const s = new Date(e.start);
      const end = new Date(e.end);

      const nameLower = e.name.toLowerCase();
      if (nameLower.includes('ultra league') || nameLower.includes('master league') || nameLower.includes('gbl') || nameLower.includes('fantasy cup')) {
        return false;
      }

      const isActiveToday = s <= dayEnd && end >= dayStart;
      if (!isActiveToday) return false;

      const durationMs = end.getTime() - s.getTime();
      const isLongTerm = durationMs > (1.5 * 24 * 60 * 60 * 1000);
      if (isLongTerm) {
        const startDay = s.getDate();
        const startMonth = s.getMonth();
        const startYear = s.getFullYear();
        
        const isStartToday = startDay === dayDate.getDate() && startMonth === dayDate.getMonth() && startYear === dayDate.getFullYear();
        return isStartToday;
      }

      return true;
    });

    if (activeEvents.length > 0) {
      const getPriority = (ev: EventData) => {
        const type = ev.eventType;
        const nameLower = ev.name.toLowerCase();
        
        if (type === 'community-day' || type === 'go-fest' || type === 'wild-area') return 100;
        if (type === 'raid-day' || type === 'hatch-day' || type === 'research-day') return 90;
        if (type === 'raid-hour' || type === 'pokemon-spotlight-hour' || type === 'max-mondays') return 80;
        if (type === 'ticket-event' || nameLower.includes('ticket') || nameLower.includes('pass')) return 30;
        if (type.includes('raid')) return 70;
        if (type === 'other-event' || type === 'season') return 10;
        return 50;
      };

      activeEvents.sort((a, b) => getPriority(b) - getPriority(a));

      timeline.push({
        date: dayDate,
        dayName: DAY_NAMES_EN[dayDate.getDay()],
        event: activeEvents[0]
      });
    }
  }

  return timeline;
};

import React, { useState, useMemo } from 'react';
import { EventCard } from './EventCard';
import type { EventData } from './EventCard';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

interface TimelineViewProps {
  events: EventData[];
  lang: Language;
  timezone?: string;
}

// Localized Czech/English month names
const MONTH_NAMES = {
  cs: [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
};

const WEEKDAY_NAMES = {
  cs: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

export const TimelineView: React.FC<TimelineViewProps> = ({ events, lang, timezone }) => {
  const [activeModalEvent, setActiveModalEvent] = useState<EventData | null>(null);
  
  const t = translations[lang];

  // 1. Find the earliest start date among events to focus the calendar on the active month
  const initialDate = useMemo(() => {
    if (events.length > 0) {
      const earliest = new Date(events[0].start);
      return new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    }
    return new Date();
  }, [events]);

  const [viewDate, setViewDate] = useState<Date>(initialDate);

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();

  // Navigation handlers
  const handlePrevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Helper to extract pokemon icon
  const getEventIcon = (event: EventData): string | null => {
    if (event.eventType === 'pokemon-spotlight-hour' && event.extraData?.spotlight?.image) {
      return event.extraData.spotlight.image;
    }
    if (event.eventType === 'community-day' && event.extraData?.communityday?.spawns?.[0]?.image) {
      return event.extraData.communityday.spawns[0].image;
    }
    if ((event.eventType === 'raid-hour' || event.eventType === 'raid-battles') && event.extraData?.raidbattles?.bosses?.[0]?.image) {
      return event.extraData.raidbattles.bosses[0].image;
    }
    return null;
  };

  // Formats time to HH:MM
  const formatEventTime = (startStr: string) => {
    const d = new Date(startStr);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 2. Build the 6-week (42 days) calendar grid starting on Sunday
  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0 = Sunday, 1 = Monday ...
    
    // First Sunday of the grid
    const gridStart = new Date(year, month, 1 - startOffset);
    const tempDate = new Date(gridStart);
    
    const calculatedWeeks = [];

    for (let w = 0; w < 6; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        weekDays.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
      }

      const weekStart = weekDays[0];
      const weekEnd = new Date(weekDays[6]);
      weekEnd.setHours(23, 59, 59, 999);

      // Find all events overlapping with this week
      const allWeekEvents = events.filter(e => {
        const start = new Date(e.start);
        const end = new Date(e.end);
        return start <= weekEnd && end >= weekStart;
      });

      // Split into multi-day and single-day events (multi-day = duration >= 24h)
      const multiDayEvents = allWeekEvents.filter(e => {
        const duration = new Date(e.end).getTime() - new Date(e.start).getTime();
        return duration >= 24 * 60 * 60 * 1000;
      });

      const singleDayEvents = allWeekEvents.filter(e => {
        const duration = new Date(e.end).getTime() - new Date(e.start).getTime();
        return duration < 24 * 60 * 60 * 1000;
      });

      // Sort multi-day events by start date, then duration (longest first)
      const sortedMulti = [...multiDayEvents].sort((a, b) => {
        const startDiff = new Date(a.start).getTime() - new Date(b.start).getTime();
        if (startDiff !== 0) return startDiff;
        const durA = new Date(a.end).getTime() - new Date(a.start).getTime();
        const durB = new Date(b.end).getTime() - new Date(b.start).getTime();
        return durB - durA;
      });

      // Assign vertical tracks for multi-day overlapping bars
      const tracks: (EventData | null)[][] = [];
      const multiLayout = sortedMulti.map(event => {
        const eStart = new Date(event.start);
        const eEnd = new Date(event.end);

        const startCol = Math.max(0, Math.floor((eStart.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)));
        const endCol = Math.min(6, Math.floor((eEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)));
        const span = endCol - startCol + 1;

        let trackIdx = 0;
        while (true) {
          if (!tracks[trackIdx]) {
            tracks[trackIdx] = Array(7).fill(null);
          }

          let isFree = true;
          for (let c = startCol; c <= endCol; c++) {
            if (tracks[trackIdx][c] !== null) {
              isFree = false;
              break;
            }
          }

          if (isFree) {
            for (let c = startCol; c <= endCol; c++) {
              tracks[trackIdx][c] = event;
            }
            break;
          }
          trackIdx++;
        }

        return {
          event,
          startCol,
          span,
          trackIdx
        };
      });

      calculatedWeeks.push({
        weekDays,
        multiLayout,
        numTracks: tracks.length,
        singleDayEvents
      });
    }

    return calculatedWeeks;
  }, [year, month, events]);

  if (events.length === 0) {
    return (
      <div className="empty-feed" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{t.details_empty_category}</p>
      </div>
    );
  }

  return (
    <div className="calendar-month-wrapper">
      
      {/* Calendar Header with Month/Year Navigation */}
      <div className="calendar-header">
        <div className="calendar-title-nav">
          <button className="calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">‹</button>
          <h2>{MONTH_NAMES[lang][month]} {year}</h2>
          <button className="calendar-nav-btn" onClick={handleNextMonth} aria-label="Next Month">›</button>
        </div>
        
        {/* Simple Legend for Event Categories */}
        <div className="calendar-legend" style={{ display: 'flex', gap: '12px', fontSize: '0.65rem' }}>
          <span style={{ color: 'var(--community-green)', fontWeight: 'bold' }}>● CD</span>
          <span style={{ color: 'var(--spotlight-blue)', fontWeight: 'bold' }}>● Spotlight</span>
          <span style={{ color: 'var(--raid-orange)', fontWeight: 'bold' }}>● Raids</span>
          <span style={{ color: 'var(--rocket-purple)', fontWeight: 'bold' }}>● Rocket</span>
        </div>
      </div>

      {/* Weekday Labels (Sun-Sat) */}
      <div className="calendar-grid-header">
        {WEEKDAY_NAMES[lang].map((wDay, idx) => (
          <div key={idx} className="calendar-header-day">{wDay}</div>
        ))}
      </div>

      {/* Weeks Grid */}
      <div className="calendar-weeks-container">
        {weeks.map((week, wIdx) => {
          // Calculate grid-template-rows size dynamically based on layout tracks
          const trackHeight = 24;
          const multiHeight = week.numTracks * (trackHeight + 4);
          
          return (
            <div key={wIdx} className="calendar-week-row" style={{ minHeight: `${80 + multiHeight}px` }}>
              
              {/* Background Grid Cells */}
              <div className="calendar-bg-grid">
                {week.weekDays.map((day, idx) => {
                  const isToday = new Date().toDateString() === day.toDateString();
                  return (
                    <div 
                      key={idx} 
                      className={`calendar-bg-cell ${isToday ? 'today-bg' : ''}`} 
                    />
                  );
                })}
              </div>

              {/* 1. Day Numbers Row (at the top of the week) */}
              <div className="calendar-numbers-row">
                {week.weekDays.map((day, dIdx) => {
                  const isCurrentMonth = day.getMonth() === month;
                  const isToday = new Date().toDateString() === day.toDateString();
                  return (
                    <div 
                      key={dIdx} 
                      className={`calendar-number-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}`}
                    >
                      <span className="calendar-day-number">{day.getDate()}</span>
                    </div>
                  );
                })}
              </div>

              {/* 2. Multi-day Event Banners Grid Overlay */}
              {week.numTracks > 0 && (
                <div 
                  className="calendar-multi-overlay" 
                  style={{ 
                    height: `${multiHeight}px`,
                    gridTemplateRows: `repeat(${week.numTracks}, ${trackHeight}px)` 
                  }}
                >
                  {week.multiLayout.map(({ event, startCol, span, trackIdx }, eIdx) => {
                    const cleanType = event.eventType.toLowerCase();
                    let colorClass = 'other-event';
                    if (cleanType.includes('community-day')) colorClass = 'community-day';
                    else if (cleanType.includes('spotlight-hour')) colorClass = 'spotlight-hour';
                    else if (cleanType.includes('raid-hour')) colorClass = 'raid-hour';
                    else if (cleanType.includes('raid-battles')) colorClass = 'raid-battles';
                    else if (cleanType.includes('rocket-takeover')) colorClass = 'rocket-takeover';

                    return (
                      <div
                        key={eIdx}
                        className={`calendar-multi-bar ${colorClass}`}
                        style={{
                          gridColumnStart: startCol + 1,
                          gridColumnEnd: startCol + 1 + span,
                          gridRowStart: trackIdx + 1,
                          gridRowEnd: trackIdx + 2
                        }}
                        onClick={() => setActiveModalEvent(event)}
                        title={`${event.name} (${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleString()})`}
                      >
                        {getEventIcon(event) && (
                          <img src={getEventIcon(event)!} className="short-event-icon" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} alt="" />
                        )}
                        <span className="bar-text">{event.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Short single-day / hourly events (at the bottom) */}
              <div className="calendar-short-events-row">
                {week.weekDays.map((day, dIdx) => {
                  const isCurrentMonth = day.getMonth() === month;
                  
                  // Filter short single-day events starting on this day
                  const dayEvents = week.singleDayEvents.filter(e => {
                    const sDate = new Date(e.start);
                    return sDate.toDateString() === day.toDateString();
                  });

                  return (
                    <div 
                      key={dIdx} 
                      className={`calendar-short-events-cell ${isCurrentMonth ? '' : 'other-month'}`}
                    >
                      <div className="calendar-day-events-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                        {dayEvents.map((e, idx) => {
                          const cleanType = e.eventType.toLowerCase();
                          let colorClass = 'other-event';
                          if (cleanType.includes('community-day')) colorClass = 'community-day';
                          else if (cleanType.includes('spotlight-hour')) colorClass = 'spotlight-hour';
                          else if (cleanType.includes('raid-hour')) colorClass = 'raid-hour';
                          else if (cleanType.includes('raid-battles')) colorClass = 'raid-battles';
                          else if (cleanType.includes('rocket-takeover')) colorClass = 'rocket-takeover';

                          return (
                            <div 
                              key={idx} 
                              className={`calendar-short-event ${colorClass}`}
                              onClick={() => setActiveModalEvent(e)}
                              title={`${e.name} (${formatEventTime(e.start)} - ${formatEventTime(e.end)})`}
                            >
                              <span className="short-event-dot" />
                              {getEventIcon(e) && (
                                <img src={getEventIcon(e)!} className="short-event-icon" alt="" />
                              )}
                              <span className="short-event-time">{formatEventTime(e.start)}</span>
                              <span className="short-event-name">{e.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Expanded Modal Popup with Event Card Details */}
      {activeModalEvent && (
        <div className="calendar-modal-overlay" onClick={() => setActiveModalEvent(null)}>
          <div className="calendar-modal-content" onClick={e => e.stopPropagation()}>
            <button className="calendar-modal-close" onClick={() => setActiveModalEvent(null)}>✕</button>
            <EventCard event={activeModalEvent} lang={lang} timezone={timezone} defaultExpanded={true} />
          </div>
        </div>
      )}

      {/* Tooltip help label */}
      <div className="timeline-tip" style={{ padding: '8px 12px', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        💡 {lang === 'cs' ? 'Kliknutím na pruh nebo krátkou událost v kalendáři otevřete podrobného průvodce, bossy a bonusy.' : 'Click on any calendar banner or short event to view detailed guide, counters, and bonuses.'}
      </div>
    </div>
  );
};

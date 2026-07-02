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

export const TimelineView: React.FC<TimelineViewProps> = ({ events, lang, timezone }) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const t = translations[lang];

  // 1. Calculate the start and end of the timeline
  const { timelineStart, timelineEnd, days } = useMemo(() => {
    if (events.length === 0) {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10);
      const dayArray: Date[] = [];
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dayArray.push(new Date(d));
      }
      return { timelineStart: start, timelineEnd: end, days: dayArray };
    }

    // Find min start date and max end date
    let minMs = Infinity;
    let maxMs = -Infinity;

    events.forEach(e => {
      const startMs = new Date(e.start).getTime();
      const endMs = new Date(e.end).getTime();
      if (startMs < minMs) minMs = startMs;
      if (endMs > maxMs) maxMs = endMs;
    });

    const start = new Date(minMs);
    // Align to start of day
    start.setHours(0, 0, 0, 0);
    // Subtract 1 day buffer
    start.setDate(start.getDate() - 1);

    const end = new Date(maxMs);
    // Align to end of day
    end.setHours(23, 59, 59, 999);
    // Add 1 day buffer
    end.setDate(end.getDate() + 1);

    // Limit range to maximum 45 days to prevent huge performance penalty
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 45) {
      end.setTime(start.getTime() + 45 * 24 * 60 * 60 * 1000);
    }

    const dayArray: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dayArray.push(new Date(d));
    }

    return { timelineStart: start, timelineEnd: end, days: dayArray };
  }, [events]);

  const totalDurationMs = timelineEnd.getTime() - timelineStart.getTime();

  // Get day labels
  const getDayLabel = (date: Date) => {
    const weekdaysCs = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const wday = lang === 'cs' ? weekdaysCs[date.getDay()] : weekdaysEn[date.getDay()];
    return {
      wday,
      dateStr: `${date.getDate()}. ${date.getMonth() + 1}.`
    };
  };

  const getEventBarStyles = (event: EventData) => {
    const startMs = new Date(event.start).getTime();
    const endMs = new Date(event.end).getTime();

    // Calculate left & width percentage
    const leftPercent = ((startMs - timelineStart.getTime()) / totalDurationMs) * 100;
    const widthPercent = ((endMs - startMs) / totalDurationMs) * 100;

    // Constrain percentages
    const left = Math.max(0, Math.min(100, leftPercent));
    const width = Math.max(0.5, Math.min(100 - left, widthPercent));

    return {
      left: `${left}%`,
      width: `${width}%`
    };
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'community-day': return 'community-day';
      case 'pokemon-spotlight-hour': return 'spotlight-hour';
      case 'raid-hour': return 'raid-hour';
      case 'raid-battles': return 'raid-battles';
      case 'rocket-takeover': return 'rocket-takeover';
      default: return 'other-event';
    }
  };

  const toggleExpandEvent = (eventId: string) => {
    setExpandedEventId(prev => (prev === eventId ? null : eventId));
  };

  if (events.length === 0) {
    return (
      <div className="empty-feed" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{t.details_empty_category}</p>
      </div>
    );
  }

  const columnWidth = 85; // 85px per column for compact horizontal scroll
  const timelineContentWidth = days.length * columnWidth;

  return (
    <div className="timeline-view-wrapper">
      <div className="timeline-container">
        
        {/* Horizontal scrollable area */}
        <div className="timeline-scroll-area">
          
          {/* Header Row */}
          <div className="timeline-row header-row" style={{ width: `${timelineContentWidth + 180}px` }}>
            <div className="timeline-label-col header-label">
              <span>{lang === 'cs' ? 'Událost' : 'Event'}</span>
            </div>
            
            <div className="timeline-bars-col" style={{ width: `${timelineContentWidth}px` }}>
              <div className="day-grid-headers">
                {days.map((day, idx) => {
                  const label = getDayLabel(day);
                  const isToday = new Date().toDateString() === day.toDateString();
                  return (
                    <div 
                      key={idx} 
                      className={`day-header-cell ${isToday ? 'today' : ''}`}
                      style={{ width: `${columnWidth}px` }}
                    >
                      <span className="wday">{label.wday}</span>
                      <span className="date-num">{label.dateStr}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="timeline-body">
            {events.map((event) => {
              const isExpanded = expandedEventId === event.eventID;
              const barStyle = getEventBarStyles(event);
              const typeClass = getEventTypeClass(event.eventType);

              return (
                <div key={event.eventID} style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Event Row */}
                  <div 
                    className={`timeline-row event-row ${isExpanded ? 'expanded' : ''}`}
                    style={{ width: `${timelineContentWidth + 180}px` }}
                    onClick={() => toggleExpandEvent(event.eventID)}
                  >
                    
                    {/* Left Sticky Label Column */}
                    <div className="timeline-label-col">
                      <div className="timeline-event-info">
                        <span className="event-name-text" title={event.name}>{event.name}</span>
                        <span className={`event-type-dot ${event.eventType}`}></span>
                      </div>
                    </div>

                    {/* Right Bars Column */}
                    <div className="timeline-bars-col" style={{ width: `${timelineContentWidth}px` }}>
                      {/* Grid background lines */}
                      <div className="grid-background-lines">
                        {days.map((day, dIdx) => {
                          const isToday = new Date().toDateString() === day.toDateString();
                          return (
                            <div 
                              key={dIdx} 
                              className={`grid-line-cell ${isToday ? 'today' : ''}`}
                              style={{ width: `${columnWidth}px` }}
                            ></div>
                          );
                        })}
                      </div>

                      {/* Absolute Duration Bar */}
                      <div 
                        className={`timeline-bar ${typeClass}`} 
                        style={barStyle}
                        title={`${event.name} (${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleString()})`}
                      >
                        <span className="bar-text">{event.name}</span>
                      </div>
                    </div>

                  </div>

                  {/* Expanded Event Card Block */}
                  {isExpanded && (
                    <div 
                      className="timeline-expanded-card-wrapper"
                      style={{ width: `${timelineContentWidth + 180}px` }}
                    >
                      <div className="timeline-expanded-card-container">
                        <EventCard event={event} lang={lang} timezone={timezone} />
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
      
      {/* Help tooltip below the timeline */}
      <div className="timeline-tip" style={{ padding: '8px 12px', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        💡 {lang === 'cs' ? 'Kliknutím na řádek nebo pruh události zobrazíte kompletní průvodce a bonusy.' : 'Click on any event row or bar to display full guides and bonuses.'}
      </div>
    </div>
  );
};

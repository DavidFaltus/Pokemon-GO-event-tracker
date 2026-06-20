import React, { useState } from 'react';
import { EventCard } from './EventCard';
import type { EventData } from './EventCard';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';

interface CalendarViewProps {
  events: EventData[];
  lang: Language;
  timezone?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, lang, timezone }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 17)); // Target June 2026
  const [selectedDayEvents, setSelectedDayEvents] = useState<EventData[]>([]);
  const [selectedDayLabel, setSelectedDayLabel] = useState<string>('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNamesCs = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthNames = lang === 'cs' ? monthNamesCs : monthNamesEn;

  // Get first day of the month and total days
  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday is 0, Monday is 1...
  // Convert Sunday index from 0 to 6, and Monday from 1 to 0 (European standard)
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Get previous month's total days
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayEvents([]);
    setSelectedDayLabel('');
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayEvents([]);
    setSelectedDayLabel('');
  };

  const getEventsForDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    // Return events that overlap with targetDate
    return events.filter(event => {
      const start = new Date(event.start);
      // Remove hours for date comparison
      const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const end = new Date(event.end);
      const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      return targetDate >= startDate && targetDate <= endDate;
    });
  };

  const handleDayClick = (day: number) => {
    const dayEvents = getEventsForDay(day);
    setSelectedDayEvents(dayEvents);
    setSelectedDayLabel(
      lang === 'cs' 
        ? `${day}. ${monthNames[month]} ${year}` 
        : `${monthNames[month]} ${day}, ${year}`
    );
  };

  // Generate calendar days
  const daysArray = [];

  // Previous month trailing days
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    daysArray.push({
      day: prevMonthTotalDays - i,
      isCurrentMonth: false,
      events: []
    });
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push({
      day: d,
      isCurrentMonth: true,
      events: getEventsForDay(d)
    });
  }

  // Next month leading days
  const totalSlots = 42; // 6 rows of 7 days
  const remainingSlots = totalSlots - daysArray.length;
  for (let n = 1; n <= remainingSlots; n++) {
    daysArray.push({
      day: n,
      isCurrentMonth: false,
      events: []
    });
  }

  const weekdays = lang === 'cs' 
    ? ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const t = translations[lang];

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={handlePrevMonth}>◀</button>
        <h3>{monthNames[month]} {year}</h3>
        <button className="cal-nav-btn" onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {/* Weekday headers */}
        {weekdays.map(wd => (
          <div key={wd} className="weekday-header">{wd}</div>
        ))}

        {/* Days */}
        {daysArray.map((cell, idx) => {
          const hasEvents = cell.events.length > 0;
          const isSelected = selectedDayLabel.includes(`${cell.day}. ${monthNames[month]}`) || 
                             selectedDayLabel.includes(`${monthNames[month]} ${cell.day}`) && cell.isCurrentMonth;
          
          return (
            <div
              key={idx}
              className={`calendar-cell ${cell.isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
              onClick={() => cell.isCurrentMonth && handleDayClick(cell.day)}
            >
              <span className="day-number">{cell.day}</span>
              
              {/* Event indicators */}
              <div className="cell-indicators">
                {cell.events.slice(0, 3).map((e, eidx) => (
                  <span
                    key={eidx}
                    className={`indicator-dot ${e.eventType}`}
                    title={e.name}
                  ></span>
                ))}
                {cell.events.length > 3 && (
                  <span className="indicator-plus">+{cell.events.length - 3}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected day events list */}
      <div className="selected-day-events">
        {selectedDayLabel && (
          <div className="selected-day-header">
            <h4>{t.details_events_for} {selectedDayLabel}</h4>
          </div>
        )}

        {selectedDayEvents.length === 0 ? (
          selectedDayLabel ? (
            <div className="no-events-day">
              <p>{t.details_no_events_day}</p>
            </div>
          ) : (
            <div className="no-events-day">
              <p>{t.details_select_day}</p>
            </div>
          )
        ) : (
          <div className="selected-events-list">
            {selectedDayEvents.map(event => (
              <EventCard key={event.eventID} event={event} lang={lang} timezone={timezone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

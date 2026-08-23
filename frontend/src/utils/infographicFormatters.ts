import type { Language } from '../data/translations';

/** Format event date range for infographic display */
export function formatEventDateRange(
  startInput: string | Date, 
  endInput: string | Date, 
  lang: Language
): { dateStr: string; timeStr: string; isMultiDay: boolean } {
  const start = new Date(startInput);
  const end = new Date(endInput);

  const isSameDay = start.getFullYear() === end.getFullYear() &&
                    start.getMonth() === end.getMonth() &&
                    start.getDate() === end.getDate();

  const isMultiDay = !isSameDay;

  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNamesCs = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
  const months = lang === 'cs' ? monthNamesCs : monthNamesEn;

  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];

  let dateStr = "";
  if (isSameDay) {
    const dayOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][start.getDay()];
    const dayOfWeekCs = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'][start.getDay()];
    const dow = lang === 'cs' ? dayOfWeekCs : dayOfWeekEn;
    dateStr = `${dow}, ${startDay} ${startMonth} ${start.getFullYear()}`;
  } else {
    if (start.getMonth() === end.getMonth()) {
      dateStr = `${startDay} – ${endDay} ${startMonth} ${start.getFullYear()}`;
    } else {
      dateStr = `${startDay} ${startMonth} – ${endDay} ${endMonth} ${start.getFullYear()}`;
    }
  }

  // Format Hours cleanly (e.g., 6:00 PM – 7:00 PM)
  const formatTimePart = (d: Date) => {
    let hrs = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    return `${hrs}:${mins} ${ampm}`;
  };

  const timeStr = `${formatTimePart(start)} – ${formatTimePart(end)}`;

  return { dateStr, timeStr, isMultiDay };
}

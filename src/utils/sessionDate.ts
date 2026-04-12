/**
 * Shared session date/time formatting utilities.
 * Consolidated from 5+ component-level duplicates.
 *
 * Uses dynamic Stockholm offset detection for correct CET/CEST handling.
 */

import { getStockholmOffset } from '@/hooks/useScheduleData';

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

/**
 * Format a YYYY-MM-DD date string as "March 31st"
 */
export const formatSessionDate = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split('-');
    const dayNum = parseInt(day);
    const date = new Date(parseInt(year), parseInt(month) - 1, dayNum);

    if (isNaN(date.getTime())) return 'TBD';

    const monthName = date.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC'
    });

    return `${monthName} ${dayNum}${getOrdinalSuffix(dayNum)}`;
  } catch {
    return 'TBD';
  }
};

/**
 * Format a YYYY-MM-DD date string in uppercase: "MARCH 31ST"
 */
export const formatSessionDateUpper = (dateString: string): string => {
  const formatted = formatSessionDate(dateString);
  return formatted.replace(/(\d+)(st|nd|rd|th)/i, (_, num, suffix) =>
    `${num}${suffix.toUpperCase()}`
  ).replace(/^[a-z]+/i, (month) => month.toUpperCase());
};

/**
 * Format a HH:MM time string as "6:30 PM"
 */
export const formatSessionTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour24 = parseInt(hours);
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minutes} ${ampm}`;
};

/**
 * Format both date and time: "March 31st 6:30 pm"
 */
export const formatSessionDateTime = (dateString: string, timeString: string): string => {
  const datePart = formatSessionDate(dateString);
  const [hours, minutes] = timeString.split(':');
  const hour24 = parseInt(hours);
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
  const ampm = hour24 >= 12 ? 'pm' : 'am';
  return `${datePart} ${hour12}:${minutes} ${ampm}`;
};

/**
 * Create a Date object for a session in Stockholm timezone.
 * Uses dynamic offset detection to handle CET (+01:00) / CEST (+02:00).
 */
export const getStockholmSessionDate = (isoDate: string, time = '18:30'): Date => {
  const offset = getStockholmOffset(isoDate);
  return new Date(`${isoDate}T${time}:00${offset}`);
};

/**
 * ============================================================================
 * SHARED SCHEDULE DATA — Single source of truth
 * ============================================================================
 * All schedule-related components import from here.
 * When the schedule changes, update ONLY this file.
 *
 * To add a new month: append entries to `classDates` below.
 * To remove past months: delete the block and remove its month from `SCHEDULE_MONTHS`.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Dynamic Stockholm UTC offset helper
// ---------------------------------------------------------------------------

/**
 * Returns the correct UTC offset string for Europe/Stockholm on a given date.
 * Handles CET (+01:00) vs CEST (+02:00) automatically for any date/year.
 *
 * @param isoDate - ISO date string, e.g. "2026-04-07"
 * @returns Offset string like "+01:00" or "+02:00"
 */
export const getStockholmOffset = (isoDate: string): string => {
  const probe = new Date(`${isoDate}T12:00:00Z`);
  const utcHour = probe.getUTCHours();
  const stockholmHour = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Stockholm',
      hour: 'numeric',
      hour12: false,
    }).format(probe),
  );
  const offsetHours = stockholmHour - utcHour;
  return `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`;
};

/**
 * Returns a proper Date object representing 18:30 Stockholm time on a given date,
 * correctly accounting for CET/CEST.
 */
export const getStockholmSessionDate = (isoDate: string, time = '18:30'): Date => {
  const offset = getStockholmOffset(isoDate);
  return new Date(`${isoDate}T${time}:00${offset}`);
};

// ---------------------------------------------------------------------------
// Schedule data types
// ---------------------------------------------------------------------------

export interface ClassDate {
  /** Display label, e.g. "Tuesday, 7th April" */
  date: string;
  /** Display time string */
  time: string;
  /** Month name used for grouping / filtering */
  month: string;
  /** ISO date for computation, e.g. "2026-04-07" */
  isoDate: string;
  /** Whether a guest teacher is present */
  hasGuest: boolean;
  /** Guest teacher name (empty string if none) */
  guestName: string;
}

// ---------------------------------------------------------------------------
// The schedule — EDIT HERE when months change
// ---------------------------------------------------------------------------

export const classDates: ClassDate[] = [
  // April 2026
  { date: "Tuesday, 7th April", time: "6:30pm – 8:00pm Sweden time", month: "April", isoDate: "2026-04-07", hasGuest: false, guestName: "" },
  { date: "Tuesday, 14th April", time: "6:30pm – 8:00pm Sweden time", month: "April", isoDate: "2026-04-14", hasGuest: true, guestName: "Fredrik Haglund" },
  { date: "Tuesday, 28th April", time: "6:30pm – 8:00pm Sweden time", month: "April", isoDate: "2026-04-28", hasGuest: false, guestName: "" },
  // May 2026
  { date: "Tuesday, 5th May", time: "6:30pm – 8:00pm Sweden time", month: "May", isoDate: "2026-05-05", hasGuest: false, guestName: "" },
  { date: "Thursday, 14th May", time: "6:30pm – 8:00pm Sweden time", month: "May", isoDate: "2026-05-14", hasGuest: true, guestName: "Elinor Hedlund" },
  { date: "Tuesday, 19th May", time: "6:30pm – 8:00pm Sweden time", month: "May", isoDate: "2026-05-19", hasGuest: false, guestName: "" },
  // June 2026
  { date: "Thursday, 4th June", time: "6:30pm – 8:00pm Sweden time", month: "June", isoDate: "2026-06-04", hasGuest: true, guestName: "Eva Schartner" },
  { date: "Tuesday, 16th June", time: "6:30pm – 8:00pm Sweden time", month: "June", isoDate: "2026-06-16", hasGuest: false, guestName: "" },
  { date: "Tuesday, 23rd June", time: "6:30pm – 8:00pm Sweden time", month: "June", isoDate: "2026-06-23", hasGuest: false, guestName: "" },
];

/** Ordered list of months currently in the schedule — used by modals and grouped views */
export const SCHEDULE_MONTHS = ["April", "May", "June"];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

/**
 * Returns schedule data grouped by month, for components like ScheduleSection
 * and FaqSection that render month-by-month.
 */
export const getScheduleByMonth = () =>
  SCHEDULE_MONTHS.map(month => ({
    month: `${month} 2026`,
    monthShort: month,
    sessions: classDates.filter(c => c.month === month),
  }));

/**
 * Returns fallback Date objects for the countdown timer.
 * Each date is correctly offset for CET/CEST.
 */
export const getFallbackSessionDates = (): Date[] =>
  classDates.map(c => getStockholmSessionDate(c.isoDate));


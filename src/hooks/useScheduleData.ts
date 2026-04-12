/**
 * useScheduleData — DB-driven schedule for public pages
 * 
 * Calls `get_public_schedule()` RPC (no Zoom links).
 * Falls back to the static `scheduleData.ts` until the migration is applied
 * or if the DB is unreachable.
 * 
 * Every public schedule consumer should import from this hook instead of
 * directly from `src/config/scheduleData.ts`.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  classDates,
  getStockholmOffset,
  getStockholmSessionDate,
  getScheduleByMonth as getStaticScheduleByMonth,
  getFallbackSessionDates as getStaticFallbackDates,
  SCHEDULE_MONTHS as STATIC_SCHEDULE_MONTHS,
  type ClassDate,
} from '@/config/scheduleData';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DbSession {
  id: string;
  title: string;
  description: string | null;
  date: string;       // ISO date, e.g. "2026-04-07"
  time: string;       // e.g. "18:30:00"
  datetime_sweden: string;
  hasGuest: boolean;
  guestName: string | null;
}

interface PublicScheduleResponse {
  success: boolean;
  sessions: DbSession[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Turn a DB session row into the ClassDate shape used by all public components */
function toClassDate(s: DbSession): ClassDate {
  const d = new Date(`${s.date}T12:00:00Z`);
  const month = d.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = d.getUTCDate();
  const weekday = d.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th';

  return {
    date: `${weekday}, ${day}${suffix} ${month}`,
    time: '6:30pm – 8:00pm Sweden time',
    month,
    isoDate: s.date,
    hasGuest: s.hasGuest ?? false,
    guestName: s.guestName ?? '',
  };
}

/** Group ClassDate[] by month in display order */
function groupByMonth(dates: ClassDate[]) {
  const months: string[] = [];
  const map = new Map<string, ClassDate[]>();
  for (const d of dates) {
    if (!map.has(d.month)) {
      months.push(d.month);
      map.set(d.month, []);
    }
    map.get(d.month)!.push(d);
  }
  return months.map(m => ({
    month: `${m} ${new Date().getFullYear()}`,
    monthShort: m,
    sessions: map.get(m)!,
  }));
}

// ─── Query ───────────────────────────────────────────────────────────────────

function usePublicScheduleQuery() {
  return useQuery({
    queryKey: ['public-schedule'],
    queryFn: async (): Promise<ClassDate[]> => {
      const { data, error } = await supabase.rpc('get_public_schedule');
      if (error) throw error;

      const response = data as unknown as PublicScheduleResponse;
      const sessions = response?.sessions ?? [];
      if (sessions.length === 0) throw new Error('empty');

      return sessions.map(toClassDate);
    },
    staleTime: 5 * 60 * 1000,   // 5 min — schedule rarely changes mid-session
    gcTime: 30 * 60 * 1000,     // keep in cache 30 min
    retry: 1,                    // one retry then fall back to static
  });
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Primary hook — returns the same ClassDate[] shape as the old static array */
export function useScheduleData() {
  const { data: dbDates, isLoading, isError } = usePublicScheduleQuery();

  // Use DB data when available, otherwise static fallback
  const dates: ClassDate[] = (!isLoading && !isError && dbDates && dbDates.length > 0)
    ? dbDates
    : classDates;

  const scheduleByMonth = groupByMonth(dates);
  const months = scheduleByMonth.map(b => b.monthShort);
  const fallbackSessionDates = dates.map(c => getStockholmSessionDate(c.isoDate));

  return {
    /** Flat list of sessions — drop-in replacement for `classDates` */
    classDates: dates,
    /** Sessions grouped by month — replacement for `getScheduleByMonth()` */
    scheduleByMonth,
    /** Month names in order — replacement for `SCHEDULE_MONTHS` */
    months,
    /** Date objects for countdown timer — replacement for `getFallbackSessionDates()` */
    fallbackSessionDates,
    /** Whether the hook is still loading from DB */
    isLoading,
    /** Whether DB failed and we're using static fallback */
    isUsingFallback: isError || (!isLoading && (!dbDates || dbDates.length === 0)),
  };
}

// Re-export helpers that consumers still need
export { getStockholmOffset, getStockholmSessionDate } from '@/config/scheduleData';
export type { ClassDate } from '@/config/scheduleData';


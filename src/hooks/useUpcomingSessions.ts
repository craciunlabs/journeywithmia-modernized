/**
 * Standalone stub — returns static session data.
 * Replace with your Supabase/API call when wiring up the backend.
 */

interface Session {
  id: string;
  date: string;
  time: string;
  datetime_sweden?: string;
  title?: string;
  guest_teacher?: string;
}

const STATIC_SESSIONS: Session[] = [
  { id: '1', date: '2026-03-31', time: '18:30', datetime_sweden: '2026-03-31T18:30:00+02:00' },
  { id: '2', date: '2026-04-07', time: '18:30', datetime_sweden: '2026-04-07T18:30:00+02:00' },
  { id: '3', date: '2026-04-14', time: '18:30', datetime_sweden: '2026-04-14T18:30:00+02:00', guest_teacher: 'Fredrik Haglund' },
  { id: '4', date: '2026-04-28', time: '18:30', datetime_sweden: '2026-04-28T18:30:00+02:00' },
  { id: '5', date: '2026-05-05', time: '18:30', datetime_sweden: '2026-05-05T18:30:00+02:00' },
  { id: '6', date: '2026-05-14', time: '18:30', datetime_sweden: '2026-05-14T18:30:00+02:00', guest_teacher: 'Elinor Hedlund' },
  { id: '7', date: '2026-05-19', time: '18:30', datetime_sweden: '2026-05-19T18:30:00+02:00' },
  { id: '8', date: '2026-06-04', time: '18:30', datetime_sweden: '2026-06-04T18:30:00+02:00', guest_teacher: 'Eva Schartner' },
  { id: '9', date: '2026-06-16', time: '18:30', datetime_sweden: '2026-06-16T18:30:00+02:00' },
  { id: '10', date: '2026-06-23', time: '18:30', datetime_sweden: '2026-06-23T18:30:00+02:00' },
];

export function useUpcomingSessions() {
  // Filter to only future sessions
  const now = new Date();
  const data = STATIC_SESSIONS.filter(s => {
    const dt = s.datetime_sweden ? new Date(s.datetime_sweden) : new Date(`${s.date}T${s.time}:00+02:00`);
    return dt > now;
  });

  return {
    data,
    isLoading: false,
    error: null,
  };
}

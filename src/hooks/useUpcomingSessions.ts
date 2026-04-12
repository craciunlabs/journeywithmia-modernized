/**
 * useUpcomingSessions — fetches live session data from Supabase RPC.
 *
 * Calls `get_upcoming_sessions()` which returns session metadata
 * (title, date, time, guest teacher info). Zoom links are only
 * returned for active/trial members or admins (April 2026 security fix).
 *
 * For public pages this is used mainly by CountdownSection and
 * MobileAnnouncementBanner to find the next upcoming session.
 */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UpcomingSession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  zoomLink: string;
  datetime_sweden?: string;
  hasGuest?: boolean;
  guestName?: string;
}

interface SessionsResponse {
  success: boolean;
  sessions: UpcomingSession[];
}

export const useUpcomingSessions = () => {
  return useQuery({
    queryKey: ['upcoming-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_upcoming_sessions');

      if (error) throw error;

      // Type guard to ensure data has the expected structure
      const response = data as unknown as SessionsResponse;
      return response?.sessions || [];
    },
    staleTime: 5 * 60 * 1000,   // 5 min
    gcTime: 30 * 60 * 1000,     // keep in cache 30 min
    retry: 1,
  });
};

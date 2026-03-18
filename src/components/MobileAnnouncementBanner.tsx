import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUpcomingSessions } from '@/hooks/useUpcomingSessions';
import { trackCTAClick } from '@/utils/analytics';

const STORAGE_KEY = 'mobileBannerDismissed';
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

function getInitialVisibility(): boolean {
  try {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISS_DURATION) {
        return false;
      }
    }
  } catch { /* SSR / private-browsing guard */ }
  return true;
}

const MobileAnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });
  const { data: upcomingSessions = [] } = useUpcomingSessions();
  const location = useLocation();

  // Hide on certain pages
  const hideOnPages = ['/prep-materials-xk9m', '/member-portal', '/try-for-free'];
  const shouldHide = hideOnPages.some(page => location.pathname.startsWith(page));

  // Find next upcoming session
  const nextSession = useMemo(() => {
    const now = new Date();
    const futureSessions = upcomingSessions
      .map(session => {
        let sessionDateTime;
        if (session.datetime_sweden) {
          sessionDateTime = new Date(session.datetime_sweden);
        } else {
          sessionDateTime = new Date(`${session.date}T${session.time}:00+01:00`);
        }
        return { ...session, dateTime: sessionDateTime };
      })
      .filter(session => session.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    return futureSessions.length > 0 ? futureSessions[0] : null;
  }, [upcomingSessions]);

  // Update countdown
  useEffect(() => {
    if (!nextSession) return;

    const updateCountdown = () => {
      const now = new Date();
      const difference = nextSession.dateTime.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextSession]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsVisible(false);
  };

  // Don't show if dismissed, no session, or on hidden pages
  if (!isVisible || !nextSession || shouldHide) return null;

  const countdownText = timeRemaining.days > 0
    ? `${timeRemaining.days}d ${timeRemaining.hours}h`
    : `${timeRemaining.hours}h ${timeRemaining.minutes}m`;

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-[45]">
      {/* Minimal floating banner */}
      <div className="bg-[#1a1025]/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl shadow-black/20">
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Message */}
          <p className="text-xs text-white/70 flex-1">
            <span className="text-amber-400">Try a free class</span> — next session in <span className="font-medium text-white">{countdownText}</span>
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/try-for-free"
              onClick={() => trackCTAClick('Try Free', 'mobile-banner')}
              className="py-1.5 px-3 text-xs font-medium text-white/90 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
            >
              Try Free
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1 text-white/40 hover:text-white/70 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAnnouncementBanner;


import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUpcomingSessions } from '@/hooks/useUpcomingSessions';
import { useScheduleData, getStockholmOffset } from '@/hooks/useScheduleData';
import { formatSessionDate, formatSessionTime } from '@/utils/sessionDate';

const CountdownSection = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const { data: upcomingSessions = [], isLoading: sessionsLoading } = useUpcomingSessions();
  const { fallbackSessionDates } = useScheduleData();

  const nextSession = useMemo(() => {
    const now = new Date();
    const futureSessions = upcomingSessions
      .map(session => {
        let sessionDateTime;
        if (session.datetime_sweden) {
          sessionDateTime = new Date(session.datetime_sweden);
        } else {
          // Fallback: construct from date and time with dynamic Stockholm offset
          const offset = getStockholmOffset(session.date);
          sessionDateTime = new Date(`${session.date}T${session.time}:00${offset}`);
        }
        return { ...session, dateTime: sessionDateTime };
      })
      .filter(session => session.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    return futureSessions.length > 0 ? futureSessions[0] : null;
  }, [upcomingSessions]);

  useEffect(() => {
    let targetDate: Date;

    if (nextSession?.date && nextSession?.time) {
      targetDate = nextSession.dateTime;
    } else {
      // Fallback to the shared schedule — dynamically offset for CET/CEST
      const now = new Date();
      const nextFallbackDate = fallbackSessionDates.find(date => date > now);

      if (nextFallbackDate) {
        targetDate = nextFallbackDate;
      } else {
        // If all fallback dates have passed, use a date 7 days from now
        targetDate = new Date(now.getTime() + 7 * 86400000);
      }
    }

    if (isNaN(targetDate.getTime())) {
      targetDate = new Date(Date.now() + 7 * 86400000);
    }

    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeRemaining({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nextSession]);

  const units = [
    { label: 'Days', value: timeRemaining.days },
    { label: 'Hrs', value: timeRemaining.hours },
    { label: 'Min', value: timeRemaining.minutes },
    { label: 'Sec', value: timeRemaining.seconds },
  ];

  return (
    <section className="py-6 sm:py-8 bg-[var(--jwm-purple-900)] relative overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Left: text */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <Clock className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Next Live Session</span>
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              {nextSession
                ? <>{formatSessionDate(nextSession.date)} at {formatSessionTime(nextSession.time)} Sweden</>
                : <>6:30 PM Sweden time</>
              }
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-white/20" />

          {/* Center: countdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {units.map((unit, i) => (
              <React.Fragment key={unit.label}>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-2.5 py-1.5 sm:px-3.5 sm:py-2 min-w-[48px] sm:min-w-[56px]">
                    <div className="text-lg sm:text-2xl font-bold text-white tabular-nums leading-none">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-white/40 text-[10px] sm:text-xs font-medium mt-1">
                    {unit.label}
                  </div>
                </div>
                {i < units.length - 1 && (
                  <span className="text-white/30 text-lg font-light -mt-3">:</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-white/20" />

          {/* Right: schedule link */}
          <Link
            to="/schedule"
            className="inline-flex items-center gap-1.5 text-white/70 text-xs sm:text-sm font-medium hover:text-white transition-colors bg-white/10 rounded-full px-4 py-2 border border-white/15"
          >
            <Calendar className="w-3.5 h-3.5" />
            Full Schedule →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;

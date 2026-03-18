import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUpcomingSessions } from '@/hooks/useUpcomingSessions';
import { formatSessionDate, formatSessionTime } from '@/utils/sessionDate';

const CountdownSection = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const { data: upcomingSessions = [] } = useUpcomingSessions();

  const nextSession = useMemo(() => {
    const now = new Date();
    const futureSessions = upcomingSessions
      .map(session => {
        let sessionDateTime;
        if (session.datetime_sweden) {
          sessionDateTime = new Date(session.datetime_sweden);
        } else {
          sessionDateTime = new Date(`${session.date}T${session.time}:00+02:00`);
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
      const fallbackDates = [
        new Date('2026-03-31T18:30:00+02:00'),
        new Date('2026-04-07T18:30:00+02:00'),
        new Date('2026-04-14T18:30:00+02:00'),
        new Date('2026-04-28T18:30:00+02:00'),
        new Date('2026-05-05T18:30:00+02:00'),
        new Date('2026-05-14T18:30:00+02:00'),
        new Date('2026-05-19T18:30:00+02:00'),
        new Date('2026-06-04T18:30:00+02:00'),
        new Date('2026-06-16T18:30:00+02:00'),
        new Date('2026-06-23T18:30:00+02:00'),
      ];
      const now = new Date();
      targetDate = fallbackDates.find(d => d > now) || new Date(now.getTime() + 7 * 86400000);
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

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const units = [
    { label: 'Days', value: timeRemaining.days },
    { label: 'Hours', value: timeRemaining.hours },
    { label: 'Min', value: timeRemaining.minutes },
    { label: 'Sec', value: timeRemaining.seconds },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-br from-[var(--jwm-purple-900)] via-indigo-900 to-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        {/* Top bar */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-5">
            <Clock className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm font-medium">Live from Sweden</span>
            <span className="text-white/40 mx-1">|</span>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-1 text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Schedule →</span>
            </Link>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Next Class Starts In
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
            {nextSession
              ? <>Join us {formatSessionDate(nextSession.date)} at {formatSessionTime(nextSession.time)} Sweden time</>
              : <>Join us for a transformative spiritual journey at 6:30 PM Sweden time</>
            }
          </p>
        </div>

        {/* Countdown — compact grid */}
        <div className="flex justify-center items-center gap-3 sm:gap-5 mb-10">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[68px] sm:min-w-[90px]">
                <div className="text-2xl sm:text-4xl font-bold text-white tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-white/50 text-xs sm:text-sm font-medium mt-1.5">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg min-h-[48px]"
          >
            Reserve Your Spot
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;

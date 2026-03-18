import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Globe,
  Star,
  ArrowRight,
  Sparkles,
  Video,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useUpcomingSessions } from "@/hooks/useUpcomingSessions";

/* ------------------------------------------------------------------ */
/* Session formatting                                                  */
/* ------------------------------------------------------------------ */

interface FormattedSession {
  id: string;
  dateObj: Date;
  localDateStr: string;
  localTimeStr: string;
  swedenDateStr: string;
  swedenTimeStr: string;
  weekday: string;
  dayNum: number;
  monthShort: string;
  monthLong: string;
  guestTeacher?: string;
  isPast: boolean;
  isNext: boolean;
}

function useFormattedSchedule() {
  const { data: rawSessions = [] } = useUpcomingSessions();
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return useMemo(() => {
    const now = new Date();

    const sessions: FormattedSession[] = rawSessions
      .map((s) => {
        const dt = s.datetime_sweden
          ? new Date(s.datetime_sweden)
          : new Date(`${s.date}T${s.time}:00+02:00`);

        const isPast = dt < now;

        const localDateStr = dt.toLocaleDateString("en-US", {
          timeZone: userTz,
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const localTimeStr = dt.toLocaleTimeString("en-US", {
          timeZone: userTz,
          hour: "numeric",
          minute: "2-digit",
        });
        const swedenDateStr = dt.toLocaleDateString("en-US", {
          timeZone: "Europe/Stockholm",
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const swedenTimeStr = dt.toLocaleTimeString("en-US", {
          timeZone: "Europe/Stockholm",
          hour: "numeric",
          minute: "2-digit",
        });
        const weekday = dt.toLocaleDateString("en-US", {
          timeZone: userTz,
          weekday: "short",
        });
        const dayNum = parseInt(
          dt.toLocaleDateString("en-US", { timeZone: userTz, day: "numeric" })
        );
        const monthShort = dt.toLocaleDateString("en-US", {
          timeZone: userTz,
          month: "short",
        });
        const monthLong = dt.toLocaleDateString("en-US", {
          timeZone: userTz,
          month: "long",
        });

        return {
          id: s.id,
          dateObj: dt,
          localDateStr,
          localTimeStr,
          swedenDateStr,
          swedenTimeStr,
          weekday,
          dayNum,
          monthShort,
          monthLong,
          guestTeacher: s.guest_teacher,
          isPast,
          isNext: false,
        };
      })
      .filter((s) => !s.isPast);

    // Mark the first session as "next"
    if (sessions.length > 0) sessions[0].isNext = true;

    // Group by month
    const grouped: Record<string, FormattedSession[]> = {};
    for (const s of sessions) {
      const key = s.monthLong;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(s);
    }

    return { sessions, grouped, userTz };
  }, [rawSessions, userTz]);
}

/* ------------------------------------------------------------------ */
/* Page component                                                      */
/* ------------------------------------------------------------------ */

const Schedule = () => {
  const { sessions, grouped, userTz } = useFormattedSchedule();
  const monthKeys = Object.keys(grouped);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO
        title="Full Schedule — Journey with Mia"
        description="See all upcoming live mediumship sessions with Mia Ottosson. Times shown in your local timezone and Sweden time."
        canonical="https://start.journeywithmia.com/schedule"
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-b from-[var(--jwm-purple-700)] via-[var(--jwm-purple-600)] to-[var(--jwm-purple-500)] pt-28 sm:pt-32 pb-14 sm:pb-18 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-5 sm:px-6 relative z-10 text-center max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Calendar size={14} className="text-amber-300" />
              <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                Full Schedule
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Upcoming Sessions
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
              Live on Zoom, ~90 minutes each. All times converted to your
              timezone automatically.
            </p>

            {/* Timezone pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80">
              <Globe size={14} className="text-white/60" />
              <span>
                Your timezone:{" "}
                <span className="font-medium text-white">{userTz.replace(/_/g, " ")}</span>
              </span>
            </div>
          </div>
        </section>

        {/* ─── Quick Stats ─── */}
        <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Video, stat: "3×/month", label: "Live sessions" },
                { icon: Clock, stat: "~90 min", label: "Per session" },
                { icon: Users, stat: "50+", label: "Active members" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <item.icon
                    size={18}
                    className="text-[var(--jwm-purple-400)] mb-1.5"
                  />
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {item.stat}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Session List ─── */}
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
            {sessions.length === 0 ? (
              <div className="text-center py-16">
                <Calendar
                  size={40}
                  className="text-gray-300 mx-auto mb-4"
                />
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  No Upcoming Sessions
                </h3>
                <p className="text-gray-500 text-sm">
                  New sessions will be announced soon. Stay tuned.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {monthKeys.map((month) => (
                  <div key={month}>
                    {/* Month header */}
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                        {month}
                      </h2>
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 font-medium">
                        {grouped[month].length} session
                        {grouped[month].length > 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Session cards */}
                    <div className="space-y-3">
                      {grouped[month].map((session) => (
                        <div
                          key={session.id}
                          className={`rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${
                            session.isNext
                              ? "border-amber-300 bg-amber-50/30 shadow-sm"
                              : session.guestTeacher
                              ? "border-purple-200 bg-white"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Date block */}
                            <div
                              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center ${
                                session.isNext
                                  ? "bg-amber-400 text-gray-900"
                                  : "bg-gray-100 text-gray-700"
                              } transition-colors`}
                            >
                              <span className="text-[10px] font-bold uppercase leading-none">
                                {session.monthShort}
                              </span>
                              <span className="text-xl sm:text-2xl font-bold leading-tight">
                                {session.dayNum}
                              </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                  {session.localDateStr}
                                </span>
                                {session.isNext && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                    Next up
                                  </span>
                                )}
                              </div>

                              {/* Times */}
                              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs sm:text-sm text-gray-500">
                                <span className="inline-flex items-center gap-1">
                                  <Clock size={12} className="text-gray-400" />
                                  {session.localTimeStr} your time
                                </span>
                                <span className="inline-flex items-center gap-1 text-gray-400">
                                  <Globe size={12} />
                                  {session.swedenTimeStr} Sweden
                                </span>
                              </div>

                              {/* Guest teacher */}
                              {session.guestTeacher && (
                                <div className="mt-1.5 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                  <Star
                                    size={11}
                                    className="fill-amber-400 text-amber-400"
                                  />
                                  Guest: {session.guestTeacher}
                                </div>
                              )}
                            </div>

                            {/* Zoom badge */}
                            <div className="flex-shrink-0 self-center hidden sm:block">
                              <div className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 rounded-full px-3 py-1.5">
                                <Video size={12} />
                                Zoom
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── How to Join ─── */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-[var(--jwm-purple-600)] to-[var(--jwm-purple-700)]">
          <div className="container mx-auto px-5 sm:px-6 text-center max-w-2xl">
            <Sparkles size={24} className="text-amber-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Join?
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-4 max-w-md mx-auto">
              Members get access to all live sessions, recordings, and the
              community. Or try one session free first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" }) ||
                  (window.location.href = "/#pricing")
                }
                className="gold-button px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                See Membership Plans <ArrowRight size={16} />
              </button>
              <Link
                to="/try-for-free"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                Try a Session Free
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Schedule;

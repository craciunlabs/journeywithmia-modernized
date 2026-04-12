import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Clock,
  Globe,
  User,
  Mail,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  ArrowRight,
  Play,
  Users,
  Shield,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { CardTestimonial } from "@/components/RotatingTestimonial";
import { useScheduleData, getStockholmSessionDate } from "@/hooks/useScheduleData";
import { supabase } from "@/integrations/supabase/client";
import { trackCTAClick } from "@/utils/analytics";

/* ------------------------------------------------------------------ */
/* Session helpers                                                     */
/* ------------------------------------------------------------------ */

interface FormattedSession {
  id: string;
  date: string;
  dateObj: Date;
  swedenDateStr: string;
  localDateStr: string;
  swedenTimeStr: string;
  localTimeStr: string;
  weekday: string;
  dayNum: number;
  monthShort: string;
  guestTeacher?: string;
  isEligible: boolean;
  isNext: boolean;
}

function useFormattedSessions() {
  const { classDates } = useScheduleData();
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const twoHoursOut = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  return useMemo(() => {
    const sessions: FormattedSession[] = classDates
      .map((cd) => {
        const dt = getStockholmSessionDate(cd.isoDate);

        if (dt < now) return null;

        const isEligible = dt > twoHoursOut;

        const swedenDateStr = dt.toLocaleDateString("en-US", {
          timeZone: "Europe/Stockholm",
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const localDateStr = dt.toLocaleDateString("en-US", {
          timeZone: userTz,
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const swedenTimeStr = dt.toLocaleTimeString("en-US", {
          timeZone: "Europe/Stockholm",
          hour: "numeric",
          minute: "2-digit",
        });
        const localTimeStr = dt.toLocaleTimeString("en-US", {
          timeZone: userTz,
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

        return {
          id: cd.isoDate,
          date: cd.isoDate,
          dateObj: dt,
          swedenDateStr,
          localDateStr,
          swedenTimeStr,
          localTimeStr,
          weekday,
          dayNum,
          monthShort,
          guestTeacher: cd.hasGuest ? cd.guestName : undefined,
          isEligible,
          isNext: false,
        } as FormattedSession;
      })
      .filter(Boolean) as FormattedSession[];

    // Mark the first eligible session as "next"
    const firstEligible = sessions.find((s) => s.isEligible);
    if (firstEligible) firstEligible.isNext = true;

    return sessions;
  }, [classDates, userTz]);
}

/* ------------------------------------------------------------------ */
/* Main page component                                                 */
/* ------------------------------------------------------------------ */

const TryForFree = () => {
  const sessions = useFormattedSessions();
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", howHeard: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleSessions = showAllSessions ? sessions : sessions.slice(0, 4);
  const hiddenCount = sessions.length - 4;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectSession = (id: string) => {
    setSelectedSessionId(id === selectedSessionId ? null : id);
    setFormSubmitted(false);
    // Scroll the form into view after a short delay
    setTimeout(() => {
      document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    setIsSubmitting(true);
    trackCTAClick("Register Free Session", "try-for-free");

    try {
      // Check eligibility first
      const { data: eligible, error: eligErr } = await supabase.rpc(
        'check_try_for_free_eligibility',
        { check_email: formData.email, check_session_id: selectedSession.id }
      );

      if (eligErr) throw new Error(eligErr.message);

      const result = eligible as unknown as { eligible: boolean; reason?: string };
      if (!result.eligible) {
        throw new Error(result.reason || 'You are not eligible for this session.');
      }

      // Insert registration
      const { error: insertErr } = await supabase
        .from('try_for_free_registrations')
        .insert({
          full_name: formData.name,
          email: formData.email,
          how_heard_about_us: formData.howHeard || null,
          session_id: selectedSession.id,
          session_date: selectedSession.dateObj.toISOString(),
          session_title: selectedSession.swedenDateStr,
          ip_address: null,
          user_agent: navigator.userAgent,
        });

      if (insertErr) throw new Error(insertErr.message);

      // Trigger email notifications
      await supabase.functions.invoke('send-try-for-free-emails', {
        body: { email: formData.email, type: 'confirmation' },
      });

      setFormSubmitted(true);
      setFormData({ name: "", email: "", howHeard: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  return (
    <>
      <SEO
        title="Try One Session Free — Journey with Mia"
        description="Experience a live mediumship session with Mia Ottosson for free. No credit card, no commitment. Pick a date and join."
        canonical="https://start.journeywithmia.com/try-for-free"
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-b from-[var(--jwm-purple-700)] via-[var(--jwm-purple-600)] to-[var(--jwm-purple-500)] pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-5 sm:px-6 relative z-10 text-center max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-amber-300" />
              <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                Free — No Credit Card
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Experience a Session
              <br className="hidden sm:block" />
              <span className="text-amber-300"> — On Me</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              One session is all it takes to feel the difference. Pick a date,
              show up on Zoom, and see why 50+ members chose to stay.
            </p>

            {/* Scroll anchor */}
            <button
              onClick={() =>
                document.getElementById("sessions")?.scrollIntoView({ behavior: "smooth" })
              }
              className="gold-button px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Choose Your Date <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* ─── 3 Steps ─── */}
        <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
              Three Simple Steps
            </h2>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Calendar,
                  num: "1",
                  title: "Pick a date",
                  desc: "Choose any upcoming session that fits your schedule.",
                },
                {
                  icon: Mail,
                  num: "2",
                  title: "Register free",
                  desc: "Your name and email — that's it. No card needed.",
                },
                {
                  icon: Play,
                  num: "3",
                  title: "Join on Zoom",
                  desc: "We'll send your link. Show up and experience it yourself.",
                },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-[var(--jwm-purple-600)]" />
                  </div>
                  <div className="text-xs font-bold text-[var(--jwm-purple-400)] tracking-widest uppercase mb-1">
                    Step {step.num}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Session Picker ─── */}
        <section id="sessions" className="py-12 sm:py-16 scroll-mt-20">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Upcoming Sessions
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                All sessions are live on Zoom — 6:30 PM Sweden time, ~90 minutes
              </p>
            </div>

            {/* Session cards */}
            <div className="space-y-3">
              {visibleSessions.map((session) => {
                const isSelected = selectedSessionId === session.id;

                return (
                  <div key={session.id}>
                    {/* Session card */}
                    <button
                      onClick={() => session.isEligible && handleSelectSession(session.id)}
                      disabled={!session.isEligible}
                      className={`w-full text-left rounded-xl border-2 transition-all duration-200 p-4 sm:p-5 group ${
                        isSelected
                          ? "border-[var(--jwm-purple-500)] bg-purple-50/50 shadow-md"
                          : session.isEligible
                          ? "border-gray-200 bg-white hover:border-[var(--jwm-purple-300)] hover:shadow-sm"
                          : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Date block */}
                        <div
                          className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center ${
                            session.isNext
                              ? "bg-amber-400 text-gray-900"
                              : isSelected
                              ? "bg-[var(--jwm-purple-600)] text-white"
                              : "bg-gray-100 text-gray-700 group-hover:bg-purple-100 group-hover:text-[var(--jwm-purple-700)]"
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
                          <div className="flex items-center gap-2 mb-1">
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
                              <Star size={11} className="fill-amber-400 text-amber-400" />
                              Guest: {session.guestTeacher}
                            </div>
                          )}
                        </div>

                        {/* Right side action hint */}
                        <div className="flex-shrink-0 self-center">
                          {session.isEligible ? (
                            isSelected ? (
                              <div className="w-8 h-8 rounded-full bg-[var(--jwm-purple-600)] flex items-center justify-center">
                                <Check size={16} className="text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-[var(--jwm-purple-400)] transition-colors" />
                            )
                          ) : (
                            <span className="text-xs text-gray-400 font-medium">Closed</span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Inline registration form */}
                    {isSelected && (
                      <div
                        id="register-form"
                        className="mt-2 rounded-xl border-2 border-[var(--jwm-purple-200)] bg-white p-5 sm:p-6 shadow-sm animate-fadeIn"
                      >
                        {formSubmitted ? (
                          /* Success state */
                          <div className="text-center py-4">
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                              <Check size={28} className="text-green-600" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                              You're In
                            </h3>
                            <p className="text-gray-600 text-sm max-w-sm mx-auto mb-1">
                              Check your inbox for a confirmation email. Your Zoom link will arrive within 24 hours.
                            </p>
                            <p className="text-gray-400 text-xs">
                              Don't see it? Check your spam folder.
                            </p>
                          </div>
                        ) : (
                          /* Registration form */
                          <form onSubmit={handleSubmit}>
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                              Register for{" "}
                              <span className="text-[var(--jwm-purple-600)]">
                                {selectedSession?.localDateStr}
                              </span>
                            </h3>
                            <p className="text-gray-400 text-xs mb-4">
                              Takes 10 seconds. No payment info required.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="sr-only" htmlFor="reg-name">
                                  Full name
                                </label>
                                <div className="relative">
                                  <User
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                  />
                                  <input
                                    id="reg-name"
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData((d) => ({ ...d, name: e.target.value }))
                                    }
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="sr-only" htmlFor="reg-email">
                                  Email
                                </label>
                                <div className="relative">
                                  <Mail
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                  />
                                  <input
                                    id="reg-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                      setFormData((d) => ({ ...d, email: e.target.value }))
                                    }
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* How did you find us — optional */}
                            <div className="mb-4">
                              <label className="sr-only" htmlFor="reg-how-heard">
                                How did you find us?
                              </label>
                              <div className="relative">
                                <Globe
                                  size={16}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />
                                <select
                                  id="reg-how-heard"
                                  value={formData.howHeard}
                                  onChange={(e) =>
                                    setFormData((d) => ({ ...d, howHeard: e.target.value }))
                                  }
                                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent bg-white appearance-none text-gray-500"
                                  style={{
                                    color: formData.howHeard ? '#111827' : undefined,
                                  }}
                                >
                                  <option value="">How did you find us? (optional)</option>
                                  <option value="google">Google Search</option>
                                  <option value="instagram">Instagram</option>
                                  <option value="facebook">Facebook</option>
                                  <option value="youtube">YouTube</option>
                                  <option value="friend">Friend or Family</option>
                                  <option value="other">Other</option>
                                </select>
                                <ChevronDown
                                  size={16}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full gold-button py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="animate-spin w-4 h-4 border-2 border-gray-900/20 border-t-gray-900 rounded-full" />
                                  Registering…
                                </>
                              ) : (
                                <>
                                  Reserve My Free Spot <ArrowRight size={15} />
                                </>
                              )}
                            </button>

                            <p className="text-[11px] text-gray-400 text-center mt-3">
                              One free session per person. Registration closes 2 hours before the session.
                            </p>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Show more / less */}
            {sessions.length > 4 && (
              <button
                onClick={() => setShowAllSessions(!showAllSessions)}
                className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] py-3 transition-colors"
              >
                {showAllSessions ? (
                  <>
                    Show fewer <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show {hiddenCount} more session{hiddenCount > 1 ? "s" : ""}{" "}
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </section>

        {/* ─── Social Proof Strip ─── */}
        <section className="py-10 sm:py-14 bg-white border-y border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: Users,
                  stat: "50+",
                  label: "Active members",
                },
                {
                  icon: Heart,
                  stat: "30+ years",
                  label: "Mia's experience",
                },
                {
                  icon: Shield,
                  stat: "€0",
                  label: "No card required",
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <item.icon
                    size={20}
                    className="text-[var(--jwm-purple-400)] mb-2"
                  />
                  <span className="text-2xl font-bold text-gray-900">
                    {item.stat}
                  </span>
                  <span className="text-sm text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Rotating testimonial */}
            <CardTestimonial className="mt-8" />
          </div>
        </section>

        {/* ─── What to Expect ─── */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              What to Expect
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What happens during the session?",
                  a: "Mia guides a 90-minute live session on Zoom. You'll practice connecting with your intuitive talents alongside other members in a safe, supportive space. It's interactive — not a lecture.",
                },
                {
                  q: "Do I need any experience?",
                  a: "None at all. Complete beginners are welcome. Mia meets you where you are and guides you at your own pace.",
                },
                {
                  q: "What do I need to prepare?",
                  a: "A quiet space, a notebook, and an open mind. Join 5 minutes early to test your Zoom connection. That's it.",
                },
                {
                  q: "When do I get my Zoom link?",
                  a: "Within 24 hours of registering. Check your spam folder if you don't see it, and add mia@start.journeywithmia.com to your contacts.",
                },
                {
                  q: "What happens after the free session?",
                  a: "No pressure. If you loved it, membership starts at €20/month (yearly) or €35/month. If it's not for you, no hard feelings.",
                },
              ].map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-[var(--jwm-purple-600)] to-[var(--jwm-purple-700)]">
          <div className="container mx-auto px-5 sm:px-6 text-center max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Your Next Session Is Waiting
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-6 max-w-md mx-auto">
              No payment, no commitment. Just show up and see what happens.
            </p>
            <button
              onClick={() =>
                document.getElementById("sessions")?.scrollIntoView({ behavior: "smooth" })
              }
              className="gold-button px-8 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              Choose Your Date <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm sm:text-base pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
}

export default TryForFree;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  Info,
  User,
  Mail,
  MessageSquare,
  Check,
  Video,
  Shield,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trackCTAClick } from "@/utils/analytics";

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

const PrivateSittings = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
    agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Toggle this to control availability
  const sittingsAvailable = true;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !formData.agreedToTerms) return;

    setIsSubmitting(true);
    trackCTAClick("Book Private Sitting", "private-sittings");

    // Stub — replace with Supabase insert + Stripe redirect when wiring
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const scrollToForm = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <SEO
        title="Private Sittings with Mia — Journey with Mia"
        description="Book a personal 30-minute mediumship session with Mia Ottosson. Evidential mediumship or spiritual assessment. €150 per session."
        canonical="https://start.journeywithmia.com/private-sittings"
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        {/* ─── Hero ─── */}
        <section className="bg-gradient-to-b from-[var(--jwm-purple-700)] to-[var(--jwm-purple-600)] pt-28 sm:pt-32 pb-14 sm:pb-18 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-5 sm:px-6 max-w-3xl relative z-10 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Private Sittings
              <span className="block text-amber-300">with Mia</span>
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
              A deeply personal 30-minute session — evidential mediumship or
              spiritual assessment tailored to your needs.
            </p>

            {/* Price + duration */}
            <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-white">€150</span>
                <span className="block text-white/60 text-xs mt-0.5">EUR</span>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock size={16} />
                <span>30 minutes via Zoom</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Content ─── */}
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl py-10 sm:py-14 space-y-8">
          {/* Availability notice */}
          {sittingsAvailable ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <Calendar size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 text-sm">Currently Available</p>
                <p className="text-green-800 text-xs mt-0.5">
                  Limited availability — first come, first served.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
              <Info size={18} className="text-[var(--jwm-purple-600)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-900 text-sm">Currently Unavailable</p>
                <p className="text-purple-800 text-xs mt-0.5">
                  Private sittings are not available right now. Sign up for the newsletter to be notified.
                </p>
              </div>
            </div>
          )}

          {/* ─── Sitting types ─── */}
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Choose Your Sitting Type
            </h2>

            <div className="space-y-3">
              {/* Evidential Mediumship */}
              <button
                onClick={() => {
                  setSelectedType("evidential");
                  setFormSubmitted(false);
                  setTimeout(scrollToForm, 100);
                }}
                className={`w-full text-left rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${
                  selectedType === "evidential"
                    ? "border-[var(--jwm-purple-500)] bg-purple-50/50 shadow-md"
                    : "border-gray-200 bg-white hover:border-[var(--jwm-purple-300)] hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Evidential Mediumship</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Connecting with spirit through evidence — who they were, their work,
                      hobbies, relationships, and shared memories. Mia conveys what the
                      spirit wants to communicate.
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    {selectedType === "evidential" ? (
                      <div className="w-7 h-7 rounded-full bg-[var(--jwm-purple-600)] flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
                    )}
                  </div>
                </div>
              </button>

              {/* Spiritual Assessment */}
              <button
                onClick={() => {
                  setSelectedType("spiritual");
                  setFormSubmitted(false);
                  setTimeout(scrollToForm, 100);
                }}
                className={`w-full text-left rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${
                  selectedType === "spiritual"
                    ? "border-[var(--jwm-purple-500)] bg-purple-50/50 shadow-md"
                    : "border-gray-200 bg-white hover:border-[var(--jwm-purple-300)] hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Spiritual Assessment</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Aura reading revealing your nature, abilities, strengths, and growth
                      areas. Guidance on your personal and mediumistic development journey.
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    {selectedType === "spiritual" ? (
                      <div className="w-7 h-7 rounded-full bg-[var(--jwm-purple-600)] flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
                    )}
                  </div>
                </div>
              </button>
            </div>

            <p className="text-xs text-gray-500 italic text-center mt-3">
              These sittings are of an experimental nature. Mia will always do her
              best, but cannot guarantee specific outcomes.
            </p>
          </div>

          {/* ─── Inline booking form ─── */}
          {selectedType && (
            <div
              id="booking-form"
              className="rounded-xl border-2 border-[var(--jwm-purple-200)] bg-white p-5 sm:p-6 shadow-sm animate-fadeIn"
            >
              {formSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                    Booking Request Received
                  </h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto mb-1">
                    Mia will review your request and send a confirmation with your
                    Zoom link and payment details within 48 hours.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Check your spam folder if you don't see it.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    Book Your{" "}
                    <span className="text-[var(--jwm-purple-600)]">
                      {selectedType === "evidential" ? "Evidential Mediumship" : "Spiritual Assessment"}
                    </span>{" "}
                    Sitting
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    €150 EUR — 30 minutes via Zoom
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="sr-only" htmlFor="ps-name">Full name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          id="ps-name"
                          type="text"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="ps-email">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          id="ps-email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="mb-3">
                    <label className="sr-only" htmlFor="ps-info">Additional info</label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        id="ps-info"
                        rows={3}
                        placeholder="Anything you'd like Mia to know? (optional)"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData((d) => ({ ...d, additionalInfo: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--jwm-purple-300)] focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData((d) => ({ ...d, agreedToTerms: e.target.checked }))}
                      required
                      className="mt-0.5 accent-[var(--jwm-purple-600)]"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      I have read the description and agree with the terms, including the
                      48-hour cancellation policy and €150 EUR payment.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreedToTerms}
                    className="w-full gold-button py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin w-4 h-4 border-2 border-gray-900/20 border-t-gray-900 rounded-full" />
                        Processing…
                      </>
                    ) : (
                      <>
                        Book & Pay €150 <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    Your Zoom link and confirmation will be sent to the email above.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* ─── Important Information ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-5 sm:p-6">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Info size={20} className="text-[var(--jwm-purple-500)]" />
                Important Information
              </h2>

              {/* Quick summary */}
              <div className="bg-purple-50 border-l-4 border-[var(--jwm-purple-500)] rounded-r-lg p-4 mb-5">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">Quick Summary:</strong> 30-minute
                  session via Zoom — €150 EUR — 48-hour cancellation policy — Meeting
                  link sent after booking
                </p>
              </div>

              <div className="space-y-5">
                {/* Booking process */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Calendar size={15} className="text-[var(--jwm-purple-500)]" />
                    Booking Process
                  </h3>
                  <ol className="text-sm text-gray-600 space-y-1.5 ml-6 list-decimal">
                    <li>Select your sitting type above</li>
                    <li>Enter your contact information</li>
                    <li>Complete secure payment via Stripe (€150 EUR)</li>
                    <li>Receive Zoom link and confirmation via email</li>
                  </ol>
                </div>

                {/* Cancellation */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Shield size={15} className="text-[var(--jwm-purple-500)]" />
                    Cancellation Policy
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1.5 ml-6 list-disc">
                    <li>48-hour notice required to cancel</li>
                    <li>No alternative dates due to limited availability</li>
                    <li>No-shows forfeit session and payment</li>
                    <li>You may transfer your session to someone else (notify us first)</li>
                  </ul>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <Video size={15} className="text-[var(--jwm-purple-500)]" />
                    Availability
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed ml-6">
                    Private sittings are offered on a first-come, first-served basis
                    when announced. Due to Mia's schedule, availability is very limited.
                    Sign up for the newsletter to be notified when new dates open.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivateSittings;

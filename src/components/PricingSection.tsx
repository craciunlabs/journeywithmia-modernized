import React, { useState } from "react";
import { Check, Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpcomingSessions } from '@/hooks/useUpcomingSessions';
import { trackCheckoutClick, trackCTAClick } from '@/utils/analytics';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { formatSessionDateUpper } from '@/utils/sessionDate';

const PricingSection = () => {
  const navigate = useNavigate();
  const { data: upcomingSessions = [] } = useUpcomingSessions();
  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;
  const { startCheckout, isLoading } = useStripeCheckout();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);

  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    setLoadingPlan(plan);
    trackCheckoutClick(plan, `stripe_checkout_${plan}`);
    await startCheckout(plan);
    setLoadingPlan(null);
  };

  const sharedFeatures = [
    "3 Live Sessions Monthly",
    "Access to All Recordings",
    "Community Access",
  ];

  const monthlyExtras = [
    "Gift 1-month free to a friend",
    "Cancel Anytime",
  ];

  const yearlyExtras = [
    "Everything in Monthly",
    "3 Gift Invites (30-day trials)",
    "Priority During Q&A",
    "Lock in Current Pricing",
    "10% off Mia's Services*",
  ];

  return (
    <section className="bg-gray-50 section-padding" id="pricing">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Next class badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 bg-purple-primary/90 text-white font-semibold px-4 py-2 rounded-full shadow-sm border border-amber-400/60 text-xs sm:text-sm tracking-wide uppercase">
            <span className="block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            NEXT CLASS <span className="ml-1 font-bold text-amber-300">{nextSession ? formatSessionDateUpper(nextSession.date) : 'TBD'}</span>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-serif text-purple-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Choose Your Plan
          </h2>
          <p className="text-gray-500 text-sm">
            Not sure?{" "}
            <button
              onClick={() => {
                trackCTAClick('Try For Free', 'pricing_section');
                navigate('/try-for-free');
              }}
              className="text-purple-600 font-medium underline underline-offset-2 hover:text-purple-700"
            >
              Try one session free
            </button>
          </p>
        </div>

        {/* Two cards side-by-side (stacked on mobile, yearly first) */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">

          {/* ── Yearly Plan (shown first on mobile, recommended) ── */}
          <div className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-purple-200 order-1 md:order-2">
            {/* Best value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-purple-600 text-white text-xs px-4 py-1.5 rounded-full font-semibold tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Star size={12} className="fill-current" />
                BEST VALUE
              </span>
            </div>

            <div className="text-center mb-5 mt-3">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Yearly Membership</h3>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-gray-400 line-through text-sm">€420</span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  Save €180
                </span>
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">€240</span>
                <span className="text-gray-500 ml-1">/year</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                That's only <span className="font-semibold text-purple-600">€20/month</span>
              </p>
            </div>

            <ul className="space-y-2.5 mb-6 text-sm">
              {yearlyExtras.map((item, i) => (
                <li key={item} className={`flex items-center gap-3 ${i === 0 ? 'p-2.5 bg-purple-50 rounded-lg' : ''}`}>
                  <div className={`w-5 h-5 ${i === 0 ? 'bg-purple-600' : 'bg-green-500'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Check className="text-white" size={12} />
                  </div>
                  <span className={i === 0 ? 'font-medium text-gray-900' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout('yearly')}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm text-base disabled:opacity-70 min-h-[48px]"
            >
              {loadingPlan === 'yearly' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                'Get Yearly Access'
              )}
            </button>
            <p className="text-xs text-center mt-3 text-gray-400">
              One payment · Instant access · Best deal
            </p>
          </div>

          {/* ── Monthly Plan ── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 order-2 md:order-1">
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Monthly Membership</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">€35</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Billed monthly · Cancel anytime</p>
            </div>

            <ul className="space-y-2.5 mb-6 text-sm">
              {[...sharedFeatures, ...monthlyExtras].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout('monthly')}
              disabled={isLoading}
              className="primary-button w-full text-base py-3 flex items-center justify-center gap-2 disabled:opacity-70 min-h-[48px]"
            >
              {loadingPlan === 'monthly' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                'Join Monthly'
              )}
            </button>
            <p className="text-xs text-center mt-3 text-gray-400">No long-term commitment</p>
          </div>
        </div>

        {/* Quick comparison callout (mobile-friendly) */}
        <div className="max-w-3xl mx-auto mt-6">
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="text-sm font-semibold text-purple-800">Why yearly?</p>
                <p className="text-xs text-purple-700 mt-0.5">
                  Save 42% — pay €20/mo instead of €35/mo, plus get priority Q&A and 3 gift invites.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-block bg-white text-purple-700 text-xs font-bold px-4 py-2 rounded-full border border-purple-200 shadow-sm">
                  €20/mo vs €35/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Value stack — below cards as supporting info */}
        <div className="max-w-lg mx-auto mt-8 bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <h3 className="text-center font-semibold text-purple-primary text-sm sm:text-base mb-3">
            What You're Getting:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            {[
              ["36 Live Sessions Per Year", "€300+ value"],
              ["Direct Q&A with 30-Year Expert", ""],
              ["Full Recording Library", ""],
              ["Private Community Access", ""],
              ["BONUS: Masterclass Recording", "€199 value"],
              ["BONUS: 10% Off Workshops", ""],
            ].map(([text, value]) => (
              <div key={text} className="flex items-start gap-2">
                <Check className="text-green-500 mt-0.5 flex-shrink-0" size={14} />
                <span>{text}{value && <span className="text-gray-400 ml-1">({value})</span>}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discount notice */}
        <div className="max-w-lg mx-auto mt-5">
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
            <p className="text-xs text-purple-700">
              <strong>*How to claim your 10% discount:</strong> Contact Mia at{" "}
              <a href="mailto:mia@miaottosson.se" className="underline hover:text-purple-800 font-medium">
                mia@miaottosson.se
              </a>{" "}
              <strong>before</strong> purchasing. Discounts cannot be applied retroactively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

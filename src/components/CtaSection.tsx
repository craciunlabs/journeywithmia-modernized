import React from "react";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";
import { useUpcomingSessions } from "@/hooks/useUpcomingSessions";
import { formatSessionDate } from "@/utils/sessionDate";

const CtaSection = () => {
  const { data: upcomingSessions = [] } = useUpcomingSessions();
  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;

  const scrollToPricing = () => {
    trackCTAClick('Join Before Next Session', 'cta_section');
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="purple-gradient section-padding">
      <div className="container mx-auto px-5 text-center">
        <span className="inline-block bg-white/15 text-white px-3 py-1 rounded-full text-xs sm:text-sm mb-4 backdrop-blur-sm border border-white/20">
          Your Transformation Starts Here
        </span>
        <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
          Your Next Session Is {nextSession ? formatSessionDate(nextSession.date) : 'Coming Soon'}
          <span className="block mt-1 sm:mt-2">Will You Be There?</span>
        </h2>
        <p className="text-white/85 max-w-xl mx-auto mb-4 text-sm sm:text-base leading-relaxed">
          50+ members have already taken this step. They stopped wondering "what if" and started trusting what they feel.
        </p>
        <p className="text-white/70 font-medium mb-6 text-xs sm:text-sm">
          Monthly: €35 (cancel anytime) | Yearly: €240 (save €180)
        </p>
        <button
          onClick={scrollToPricing}
          className="gold-button tap-scale flex items-center justify-center mx-auto gap-2 text-base w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {nextSession ? `Join Before ${formatSessionDate(nextSession.date)}` : 'Join Now'} <ArrowRight size={18} />
        </button>
        <div className="text-white/60 text-xs mt-3">
          No risk — cancel anytime
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

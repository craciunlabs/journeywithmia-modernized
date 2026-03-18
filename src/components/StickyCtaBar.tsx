import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~500px (past hero)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPricing = () => {
    trackCTAClick('Join Now', 'sticky_cta_bar');
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[45]
        transition-all duration-300
        ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      {/* Desktop: minimal bar */}
      <div className="hidden sm:block backdrop-blur-md border-t border-white/10" style={{ backgroundColor: 'rgba(61, 37, 99, 0.95)' }}>
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-white/80 text-sm">
            <span className="font-medium text-white">Join Journey with Mia</span>
            <span className="hidden md:inline"> — from €20/month with yearly plan</span>
          </p>
          <button
            onClick={scrollToPricing}
            className="gold-button text-sm px-5 py-2 rounded-full flex items-center gap-1.5"
          >
            See Plans <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Mobile: compact floating pill */}
      <div className="sm:hidden px-3 pb-3 safe-area-bottom">
        <button
          onClick={scrollToPricing}
          className="
            w-full bg-[var(--jwm-purple-700)] hover:bg-[var(--jwm-purple-800)]
            text-white font-semibold text-sm py-3.5 px-6 rounded-2xl
            flex items-center justify-center gap-2
            shadow-[0_4px_20px_rgba(90,55,140,0.4)]
            transition-all duration-200 min-h-[48px]
          "
        >
          Join Now — from €20/mo <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default StickyCtaBar;

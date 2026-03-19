import React from "react";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";
import { HeroTestimonial } from "@/components/RotatingTestimonial";

const SplitHeroImg = "/lovable-uploads/hero-optimized.webp";

const HeroSection = () => {
  const scrollToPricing = () => {
    trackCTAClick('Start Your Journey', 'hero_section');
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="purple-gradient relative overflow-hidden">
      {/* Mobile: full-bleed image with overlay */}
      <div className="lg:hidden relative">
        {/* Image background — auto height, no clipping */}
        <div className="relative">
          <img
            src={SplitHeroImg}
            alt="Joyful group engaged together - Journey with Mia"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* Gradient overlay — inline styles for reliable opacity with CSS vars */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(55, 30, 90, 0.97) 0%, rgba(75, 45, 115, 0.85) 35%, rgba(90, 55, 140, 0.5) 65%, transparent 100%)'
            }}
          />

          {/* Content over image */}
          <div className="relative flex flex-col justify-end px-5 pb-6 pt-[140px] sm:pt-[160px]">
            <h1
              className="font-serif font-bold text-white text-[28px] sm:text-[34px] leading-[1.15] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              You've Felt Spirit Your Whole Life.
              <span className="block mt-1">I'll Help You Finally Trust It.</span>
            </h1>

            <p className="text-white/90 text-[15px] sm:text-lg max-w-lg leading-relaxed mb-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
              Awaken your own intuitive <span className="font-semibold text-white">talents</span>, in your own way.
              Mia guides you, but you're always in the driver's seat.
            </p>

            <button
              onClick={scrollToPricing}
              className="gold-button tap-scale flex items-center justify-center gap-2 text-base w-full sm:w-auto"
            >
              Start Your Journey <ArrowRight size={18} />
            </button>

            <p className="text-white/60 text-xs mt-3 text-center sm:text-left">
              No pressure — cancel anytime. Everyone is welcome.
            </p>

            {/* Social proof quote — mobile (rotating, fixed height) */}
            <HeroTestimonial size="sm" className="mt-4" />
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side layout */}
      <div className="hidden lg:block pt-28 pb-16">
        <div className="container mx-auto px-6 flex flex-row items-center justify-between gap-16">
          <div className="w-1/2 flex flex-col items-start gap-5">
            <h1
              className="font-serif font-bold text-white text-4xl lg:text-5xl leading-tight max-w-xl"
            >
              You've Felt Spirit Your Whole Life.
              <span className="block mt-1">I'll Help You Finally Trust It.</span>
            </h1>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-white/90 text-sm font-medium">
                <span className="font-semibold">50+</span> Members · Free Session · No Credit Card
              </span>
            </div>

            <p className="text-white/85 text-lg max-w-lg leading-relaxed">
              Awaken your own intuitive <span className="font-semibold text-white">talents</span>, in your own way.
              Mia guides you, but you're always in the driver's seat.
            </p>

            <button
              onClick={scrollToPricing}
              className="gold-button tap-scale flex items-center justify-center gap-2 text-lg"
            >
              Start Your Journey <ArrowRight size={18} />
            </button>

            <p className="text-white/70 text-sm">
              No pressure — cancel anytime. Everyone is welcome.
            </p>

            {/* Social proof quote — desktop (rotating) */}
            <HeroTestimonial size="md" className="max-w-md mt-1" />
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <img
              src={SplitHeroImg}
              alt="Joyful group engaged together - Journey with Mia"
              className="rounded-2xl object-cover w-full max-w-[480px] aspect-[4/3] border border-white/30 shadow-2xl"
              style={{ background: "#f6f4fa" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";

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
        {/* Image background */}
        <div className="relative h-[540px] sm:h-[560px]">
          <img
            src={SplitHeroImg}
            alt="Joyful group engaged together - Journey with Mia"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--jwm-purple-700)]/95 via-[var(--jwm-purple-600)]/60 to-transparent" />

          {/* Content over image */}
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 pt-20">
            <h1
              className="font-serif font-bold text-white text-[28px] sm:text-[34px] leading-[1.15] mb-4"
            >
              You've Felt Spirit Your Whole Life.
              <span className="block mt-1">I'll Help You Finally Trust It.</span>
            </h1>

            <p className="text-white/85 text-base sm:text-lg max-w-lg leading-relaxed mb-5">
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

            {/* Social proof quote — mobile */}
            <div className="mt-4 flex items-start gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/15">
              <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/80 text-xs leading-relaxed italic">
                "Mia helped me believe in myself. She's genuine, warm and caring."
                <span className="block text-white/50 not-italic mt-1">— Inger, member since 2024</span>
              </p>
            </div>
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

            {/* Social proof quote — desktop */}
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/15 max-w-md mt-1">
              <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic">
                "Mia helped me believe in myself. She's genuine, warm and caring."
                <span className="block text-white/50 not-italic mt-1">— Inger, member since 2024</span>
              </p>
            </div>
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

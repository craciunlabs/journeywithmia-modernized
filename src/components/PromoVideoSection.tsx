import React from "react";
import MeetMiaSection from "./MeetMiaSection";
import ModernVideoPlayer from "./ModernVideoPlayer";
import { useIsMobile } from "@/hooks/use-mobile";

const videoSrc = "https://journeywithmia.s3.eu-west-2.amazonaws.com/journey+with+mia+welcome.mp4";
const posterImg = "/lovable-uploads/video-poster-optimized.webp";
const MiaImage = "/lovable-uploads/mia-avatar-optimized.webp";

const PromoVideoSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 lg:py-20 bg-gray-50" id="meet-mia">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--jwm-purple-400)] mb-2">
            Your Guide
          </p>
          <h2 className="font-serif text-[var(--jwm-purple-700)] text-2xl sm:text-3xl md:text-4xl font-bold">
            Meet Mia Ottosson
          </h2>
        </div>

        {/* Video — full-width cinematic presentation */}
        <div className="mb-10 lg:mb-14">
          <ModernVideoPlayer
            videoSrc={videoSrc}
            posterImg={posterImg}
          />
        </div>

        {/* Bio card below */}
        <div className="max-w-3xl mx-auto">
          <MeetMiaSection MiaImage={MiaImage} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
};

export default PromoVideoSection;

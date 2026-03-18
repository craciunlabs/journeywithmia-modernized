import React from "react";
import VideoSection from "./video/VideoSection";
import MeetMiaSection from "./MeetMiaSection";
import { useVideoPlayer } from "@/hooks/video/useVideoPlayer";
import { useIsMobile } from "@/hooks/use-mobile";

const videoSrc = "https://journeywithmia.s3.eu-west-2.amazonaws.com/journey+with+mia+welcome.mp4";
const posterImg = "/lovable-uploads/video-poster-optimized.webp";
const MiaImage = "/lovable-uploads/mia-avatar-optimized.webp";

const PromoVideoSection = () => {
  const isMobile = useIsMobile();
  const {
    videoRef,
    isPlaying,
    videoError,
    handleManualPlay,
    handlePlay,
    handlePause,
    handleVideoError,
    handleLoadStart,
    handleCanPlay,
    handleLoadedData
  } = useVideoPlayer();

  return (
    <section className="py-10 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Responsive: stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:flex-shrink-0 lg:w-auto flex justify-center">
            <VideoSection
              videoRef={videoRef}
              videoSrc={videoSrc}
              posterImg={posterImg}
              isPlaying={isPlaying}
              videoError={videoError}
              onPlay={handlePlay}
              onPause={handlePause}
              onError={handleVideoError}
              onLoadStart={handleLoadStart}
              onCanPlay={handleCanPlay}
              onLoadedData={handleLoadedData}
              onManualPlay={handleManualPlay}
              isMobile={isMobile}
            />
          </div>

          <div className="flex-1 min-w-0 w-full">
            <MeetMiaSection MiaImage={MiaImage} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoVideoSection;

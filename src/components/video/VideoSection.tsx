
import React from "react";
import VideoPlayer from "../VideoPlayer";
import VideoControls from "./VideoControls";
import PlayPrompt from "../PlayPrompt";

interface VideoSectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoSrc: string;
  posterImg: string;
  isPlaying: boolean;
  videoError: boolean;
  onPlay: () => void;
  onPause: () => void;
  onError: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onLoadStart: () => void;
  onCanPlay: () => void;
  onLoadedData: () => void;
  onManualPlay: () => void;
  isMobile: boolean;
}

const VideoSection = ({
  videoRef,
  videoSrc,
  posterImg,
  isPlaying,
  videoError,
  onPlay,
  onPause,
  onError,
  onLoadStart,
  onCanPlay,
  onLoadedData,
  onManualPlay,
  isMobile
}: VideoSectionProps) => {
  const containerClasses = `
    relative w-full
    ${isMobile 
      ? 'max-w-[280px] sm:max-w-[320px] md:max-w-[400px]' 
      : 'max-w-[520px] xl:max-w-[560px]'
    }
    aspect-square flex justify-center items-center
  `;

  return (
    <div className={containerClasses}>
      <PlayPrompt isMobile={isMobile} />
      
      <VideoPlayer
        ref={videoRef}
        videoSrc={videoSrc}
        posterImg={posterImg}
        onPlay={onPlay}
        onPause={onPause}
        onError={onError}
        onLoadStart={onLoadStart}
        onCanPlay={onCanPlay}
        onLoadedData={onLoadedData}
      />
      
      <VideoControls
        isPlaying={isPlaying}
        videoError={videoError}
        onManualPlay={onManualPlay}
        isMobile={isMobile}
      />
    </div>
  );
};

export default VideoSection;

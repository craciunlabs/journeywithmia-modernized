
import React, { useRef, useState } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  posterImg: string;
  onPlay: () => void;
  onPause: () => void;
  onError: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onLoadStart: () => void;
  onCanPlay: () => void;
  onLoadedData: () => void;
  className?: string;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ 
    videoSrc, 
    posterImg, 
    onPlay, 
    onPause, 
    onError, 
    onLoadStart, 
    onCanPlay, 
    onLoadedData,
    className = ""
  }, ref) => {
    return (
      <video
        ref={ref}
        poster={posterImg}
        controls
        className={`rounded-2xl shadow-2xl border-2 border-purple-light w-full h-full object-cover bg-[#ebe6fa] brightness-[1.39] contrast-115 ${className}`}
        style={{ aspectRatio: "1 / 1" }}
        preload="metadata"
        onPlay={onPlay}
        onPause={onPause}
        onError={onError}
        onLoadStart={onLoadStart}
        onCanPlay={onCanPlay}
        onLoadedData={onLoadedData}
        tabIndex={0}
        crossOrigin="anonymous"
        playsInline
        muted
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;

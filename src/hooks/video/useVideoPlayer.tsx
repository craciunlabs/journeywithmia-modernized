
import { useRef, useState } from "react";

export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleManualPlay = async () => {
    if (videoRef.current) {
      try {
        if (videoRef.current.readyState < 3) {
          videoRef.current.load();
          
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Video load timeout"));
            }, 10000);
            
            const handleCanPlay = () => {
              clearTimeout(timeout);
              videoRef.current?.removeEventListener('canplay', handleCanPlay);
              videoRef.current?.removeEventListener('error', handleError);
              resolve(void 0);
            };
            
            const handleError = () => {
              clearTimeout(timeout);
              videoRef.current?.removeEventListener('canplay', handleCanPlay);
              videoRef.current?.removeEventListener('error', handleError);
              reject(new Error("Video load error"));
            };
            
            videoRef.current?.addEventListener('canplay', handleCanPlay);
            videoRef.current?.addEventListener('error', handleError);
          });
        }
        
        await videoRef.current.play();
        setIsPlaying(true);
        setVideoError(false);
      } catch {
        setVideoError(true);
        setIsPlaying(false);
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setVideoError(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setVideoError(true);
    setIsPlaying(false);
  };

  const handleLoadStart = () => {
    setIsVideoReady(false);
  };

  const handleCanPlay = () => {
    setVideoError(false);
    setIsVideoReady(true);
  };

  const handleLoadedData = () => {
    setIsVideoReady(true);
  };

  return {
    videoRef,
    isPlaying,
    videoError,
    isVideoReady,
    handleManualPlay,
    handlePlay,
    handlePause,
    handleVideoError,
    handleLoadStart,
    handleCanPlay,
    handleLoadedData
  };
};

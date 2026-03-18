
import React from "react";

interface VideoControlsProps {
  isPlaying: boolean;
  videoError: boolean;
  onManualPlay: () => void;
  isMobile: boolean;
}

const VideoControls = ({ isPlaying, videoError, onManualPlay, isMobile }: VideoControlsProps) => {
  if (isPlaying || videoError) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl">
      <button
        onClick={onManualPlay}
        className={`
          bg-white bg-opacity-90 text-purple-600 
          ${isMobile ? 'p-4' : 'p-6'} 
          rounded-full shadow-lg hover:bg-opacity-100 
          transition-all duration-300 transform hover:scale-110
        `}
        aria-label="Play video"
      >
        <svg
          className={isMobile ? 'w-8 h-8' : 'w-12 h-12'}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default VideoControls;

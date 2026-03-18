
import React from "react";
import { Play } from "lucide-react";

interface PlayPromptProps {
  isMobile?: boolean;
}

const PlayPrompt = ({ isMobile = false }: PlayPromptProps) => {
  return (
    <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-10 w-[90%] md:w-[84%] flex justify-center animate-fade-in pointer-events-none select-none">
      <div
        className="
          bg-black/80 backdrop-blur-sm
          px-3 py-1.5 sm:px-4 sm:py-2 md:py-3 rounded-lg
          shadow-2xl border border-white/20
          flex gap-2 sm:gap-3 items-center
        "
      >
        <span className="bg-white/95 rounded-full p-1 sm:p-1.5 shadow-lg mr-0.5 sm:mr-1 hidden sm:inline-flex">
          <Play size={16} className="sm:hidden text-black" />
          <Play size={18} className="hidden sm:block text-black" />
        </span>
        <span className="text-white font-medium leading-tight font-sans text-xs sm:text-sm md:text-base">
          <span className="block">
            <span className="font-semibold text-white">Hit Play &amp; Unmute</span>{" "}
            to <span className="text-gold font-serif font-semibold">meet Mia</span>
          </span>
          <span className="block text-xs font-light opacity-90 mt-0.5">Your Guide</span>
        </span>
      </div>
    </div>
  );
};

export default PlayPrompt;

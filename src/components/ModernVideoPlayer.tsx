import React, { useRef, useState, useCallback } from "react";
import { Play, Volume2, VolumeX, Maximize, Pause } from "lucide-react";

interface ModernVideoPlayerProps {
  videoSrc: string;
  posterImg: string;
}

const ModernVideoPlayer = ({ videoSrc, posterImg }: ModernVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleFirstPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setState("loading");
    try {
      video.muted = false;
      setIsMuted(false);
      video.load();

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("timeout")), 12000);
        const onReady = () => {
          clearTimeout(timeout);
          video.removeEventListener("canplay", onReady);
          video.removeEventListener("error", onErr);
          resolve();
        };
        const onErr = () => {
          clearTimeout(timeout);
          video.removeEventListener("canplay", onReady);
          video.removeEventListener("error", onErr);
          reject(new Error("load error"));
        };
        video.addEventListener("canplay", onReady);
        video.addEventListener("error", onErr);
      });

      await video.play();
      setState("playing");
      setShowControls(true);
      scheduleHide();
    } catch {
      // Autoplay with sound blocked — try muted
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setState("playing");
        setShowControls(true);
        scheduleHide();
      } catch {
        setError(true);
        setState("idle");
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (state === "playing") {
      video.pause();
      setState("paused");
      setShowControls(true);
    } else if (state === "paused") {
      video.play();
      setState("playing");
      scheduleHide();
    }
  }, [state]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }, []);

  const scheduleHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleMouseMove = () => {
    if (state === "playing" || state === "paused") {
      setShowControls(true);
      if (state === "playing") scheduleHide();
    }
  };

  const handleVideoEnd = () => {
    setState("paused");
    setShowControls(true);
  };

  const controlsVisible = state === "paused" || showControls;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden bg-[var(--jwm-neutral-900)] shadow-2xl group cursor-pointer"
      style={{ aspectRatio: "16 / 9" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (state === "playing") setShowControls(false); }}
      onClick={() => {
        if (state === "idle") handleFirstPlay();
        else if (state === "playing" || state === "paused") togglePlay();
      }}
    >
      {/* Video element — hidden until first play */}
      <video
        ref={videoRef}
        poster={posterImg}
        className="absolute inset-0 w-full h-full object-cover"
        preload="none"
        playsInline
        onEnded={handleVideoEnd}
        onError={() => { setError(true); setState("idle"); }}
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ── Idle state: poster + big play button ── */}
      {state === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

          {/* Play button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleFirstPlay(); }}
            className="relative z-10 group/btn flex items-center justify-center"
            aria-label="Play video"
          >
            <div className="
              w-20 h-20 sm:w-24 sm:h-24 
              rounded-full bg-white/95 backdrop-blur-sm
              flex items-center justify-center
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              transition-all duration-300
              group-hover/btn:scale-110 group-hover/btn:bg-white
            ">
              <Play
                className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--jwm-purple-700)] ml-1"
                fill="currentColor"
              />
            </div>
          </button>

          {/* Label under play button */}
          <p className="relative z-10 mt-4 text-white/90 text-sm sm:text-base font-medium tracking-wide">
            Watch Mia's welcome message
          </p>

          {error && (
            <p className="relative z-10 mt-2 text-red-300 text-xs">
              Video couldn't load. Please try again.
            </p>
          )}
        </div>
      )}

      {/* ── Loading spinner ── */}
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* ── Playback controls overlay ── */}
      {(state === "playing" || state === "paused") && (
        <div
          className={`
            absolute inset-0 z-10 flex items-end
            transition-opacity duration-300
            ${controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* Gradient at bottom for control readability */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* Control bar */}
          <div className="relative w-full px-4 sm:px-6 pb-4 sm:pb-5 flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label={state === "playing" ? "Pause" : "Play"}
            >
              {state === "playing" ? (
                <Pause className="w-5 h-5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>

            <div className="flex-1" />

            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Center pause/play indicator (brief flash) */}
      {state === "paused" && (
        <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-7 h-7 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernVideoPlayer;

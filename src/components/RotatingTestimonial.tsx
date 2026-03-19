import React, { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Testimonial data                                                    */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  since?: string;
}

export const HERO_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Mia helped me believe in myself. She's genuine, warm and caring.",
    name: "Inger",
    since: "2024",
  },
  {
    quote: "I felt in full confidence, I felt supported, I felt carried…",
    name: "Gael",
    since: "2024",
  },
  {
    quote: "She never puts herself on a pedestal… I can be who I am and grow from my inner strength.",
    name: "Katharina",
    since: "2024",
  },
  {
    quote: "She is very good at creating confidence for those who do not have that.",
    name: "Valerie",
    since: "2024",
  },
  {
    quote: "I always felt uplifted and inspired to keep developing after joining Mia's courses.",
    name: "Anna",
    since: "2025",
  },
];

/* ------------------------------------------------------------------ */
/* Hook — rotates through testimonials                                 */
/* ------------------------------------------------------------------ */

export function useRotatingTestimonial(
  testimonials: Testimonial[] = HERO_TESTIMONIALS,
  intervalMs = 5000,
) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * testimonials.length));
  const [visible, setVisible] = useState(true);

  const advance = useCallback(() => {
    // Fade out
    setVisible(false);

    // After fade-out completes, swap and fade in
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setVisible(true);
    }, 400); // matches CSS transition duration
  }, [testimonials.length]);

  useEffect(() => {
    const id = setInterval(advance, intervalMs);
    return () => clearInterval(id);
  }, [advance, intervalMs]);

  return { testimonial: testimonials[index], visible };
}

/* ------------------------------------------------------------------ */
/* Variant: Hero (translucent card on purple background)               */
/* ------------------------------------------------------------------ */

interface HeroVariantProps {
  testimonials?: Testimonial[];
  intervalMs?: number;
  /** mobile uses smaller text + stars */
  size?: "sm" | "md";
  className?: string;
}

export function HeroTestimonial({
  testimonials = HERO_TESTIMONIALS,
  intervalMs = 5000,
  size = "md",
  className = "",
}: HeroVariantProps) {
  const { testimonial, visible } = useRotatingTestimonial(testimonials, intervalMs);
  const starSize = size === "sm" ? 10 : 12;

  const containerClass =
    size === "sm"
      ? "flex items-start gap-2.5 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/15"
      : "flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/15";

  const textClass = size === "sm" ? "text-xs" : "text-sm";

  // Fixed height prevents layout shift when testimonials rotate.
  // Sized for the longest quote (~2.5 lines on small, ~2 lines on medium).
  const fixedH = size === "sm" ? "4.5rem" : "5rem";

  return (
    <div className={`${containerClass} ${className}`} style={{ overflow: 'hidden' }}>
      <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={starSize} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <div style={{ height: fixedH, overflow: 'hidden' }}>
        <p
          className={`${textClass} leading-relaxed italic text-white/80`}
          style={{
            transition: "opacity 400ms ease-in-out",
            opacity: visible ? 1 : 0,
          }}
        >
          "{testimonial.quote}"
          <span className="block text-white/50 not-italic mt-1">
            — {testimonial.name}
            {testimonial.since ? `, member since ${testimonial.since}` : ""}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Variant: Card (light bg, for TryForFree social proof section)       */
/* ------------------------------------------------------------------ */

interface CardVariantProps {
  testimonials?: Testimonial[];
  intervalMs?: number;
  className?: string;
}

export function CardTestimonial({
  testimonials = HERO_TESTIMONIALS,
  intervalMs = 5000,
  className = "",
}: CardVariantProps) {
  const { testimonial, visible } = useRotatingTestimonial(testimonials, intervalMs);

  return (
    <div className={`bg-purple-50/60 rounded-xl p-5 sm:p-6 text-center max-w-lg mx-auto ${className}`}>
      <div className="flex justify-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <blockquote
        className="font-serif italic text-gray-700 text-sm sm:text-base leading-relaxed mb-2"
        style={{
          transition: "opacity 400ms ease-in-out",
          opacity: visible ? 1 : 0,
          minHeight: "3rem",
        }}
      >
        "{testimonial.quote}"
      </blockquote>
      <cite
        className="not-italic text-xs text-gray-500"
        style={{
          transition: "opacity 400ms ease-in-out",
          opacity: visible ? 1 : 0,
        }}
      >
        — {testimonial.name}
        {testimonial.since ? `, member since ${testimonial.since}` : ""}
      </cite>
    </div>
  );
}

export default HeroTestimonial;

import React, { useState } from "react";

const TESTIMONIALS = [
  {
    header: "I used to think I was making everything up...",
    name: "Valerie",
    quote: "She is very good in creating confidence for those who do not have that, because of her own experience."
  },
  {
    header: "I finally felt safe to be myself...",
    name: "Gael",
    quote: "I felt in full confidence, I felt supported, I felt carried..."
  },
  {
    header: "Every session leaves me inspired...",
    name: "Anna",
    quote: "I always felt uplifted and inspired to keep developing after joining Mia's courses."
  },
  {
    header: "No ego, no judgment...",
    name: "Katharina",
    quote: "She never puts herself on a pedestal... I can be who I am and grow from my inner strength."
  },
  {
    header: "I knew I could trust her...",
    name: "Alice",
    quote: "You can trust her. She's genuine, warm and caring."
  },
  {
    header: "She helped me believe in myself...",
    name: "Inger",
    quote: "Mia helped me believe in myself."
  },
];

const TESTIMONIALS_TO_URL = "https://testimonial.to/miaottosson/all";

const MainTestimonialGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleOnMobile = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  return (
    <section className="bg-white section-padding">
      <div className="text-center mb-6 sm:mb-8">
        <span className="inline-block bg-purple-50 text-purple-primary px-4 py-1 rounded-full text-xs sm:text-sm mb-3">
          What Our Members Say
        </span>
        <h2 className="font-serif text-purple-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Real Transformations, Real People
        </h2>
      </div>

      {/* Mobile: show 3 + expand */}
      <div className="sm:hidden space-y-3 max-w-md mx-auto">
        {visibleOnMobile.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full text-center text-sm text-purple-600 font-medium py-2 hover:text-purple-700 transition-colors"
          >
            Show {TESTIMONIALS.length - 3} more testimonials ↓
          </button>
        )}
      </div>

      {/* Desktop: 2-col grid */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>

      <div className="flex justify-center mt-6 sm:mt-8">
        <a
          href={TESTIMONIALS_TO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button text-sm px-6 py-2.5 flex items-center gap-2"
        >
          Read More Member Stories <span className="text-base">↗</span>
        </a>
      </div>
    </section>
  );
};

const TestimonialCard = ({ header, name, quote }: { header: string; name: string; quote: string }) => (
  <div className="bg-gray-50 rounded-xl p-5 flex flex-col hover:-translate-y-0.5 transition-transform duration-200">
    <p className="text-purple-primary font-semibold text-xs sm:text-sm mb-2">{header}</p>
    <blockquote className="italic text-gray-700 font-serif text-sm sm:text-base flex-1 leading-relaxed">"{quote}"</blockquote>
    <div className="text-right text-gray-400 text-xs sm:text-sm font-semibold mt-2">— {name}</div>
  </div>
);

export default MainTestimonialGrid;

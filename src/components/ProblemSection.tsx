import React from "react";

const struggles = [
  {
    label: "Experiences You Can't Explain",
    quote: "You've had experiences you can't explain... but when you try to tell anyone, they think you're crazy."
  },
  {
    label: "You've Learned to Stay Quiet",
    quote: "You sense things before they happen, but you've learned to stay quiet about it."
  },
  {
    label: "Courses That Didn't Fit You",
    quote: "You've spent hundreds (maybe thousands) on courses that taught you their system—not how to trust YOUR way."
  },
  {
    label: "Persistent Self-Doubt",
    quote: "My God, can I really do this?"
  },
  {
    label: "Energy Management Struggle",
    quote: "I'm so tired after readings. It's so difficult to catch spirit."
  },
  {
    label: "The Confidence Dilemma",
    quote: "I secretly lowered my price... glad no customers are coming yet."
  }
];

const ProblemSection = () => (
  <section className="bg-white section-padding">
    <div className="max-w-2xl mx-auto text-center mb-8">
      <h2 className="text-purple-primary text-2xl sm:text-3xl font-bold font-serif mb-3">
        Does This Sound Familiar?
      </h2>
      <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
        You want to connect—but you keep second-guessing if what you sense is real.
        <span className="hidden sm:inline">
          {" "}Maybe you've been told to follow someone else's "method," but it never feels like you.
        </span>
      </p>
    </div>

    {/* Mobile: horizontal snap carousel */}
    <div className="sm:hidden snap-carousel">
      {struggles.map((s) => (
        <div
          key={s.label}
          className="bg-gray-50 rounded-xl px-5 py-5 shadow-sm w-[280px] flex flex-col"
        >
          <span className="text-sm font-semibold text-purple-primary mb-2">{s.label}</span>
          <span className="text-sm text-[var(--jwm-purple-700)] font-serif italic leading-relaxed">"{s.quote}"</span>
        </div>
      ))}
    </div>

    {/* Desktop: grid */}
    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
      {struggles.map((s) => (
        <div
          key={s.label}
          className="bg-gray-50 rounded-xl px-5 py-5 shadow-sm flex flex-col"
        >
          <span className="text-sm font-semibold text-purple-primary mb-2">{s.label}</span>
          <span className="text-sm text-[var(--jwm-purple-700)] font-serif italic leading-relaxed">"{s.quote}"</span>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemSection;

import React from "react";
import { UserPlus, Video, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "1",
    title: "Join & Get Access",
    desc: "Pick monthly or yearly. No credit card needed for your free trial session.",
  },
  {
    icon: Video,
    number: "2",
    title: "Attend Live Sessions",
    desc: "3 interactive sessions per month with Mia. Can't make it? Watch the recording anytime.",
  },
  {
    icon: Sparkles,
    number: "3",
    title: "Grow at Your Pace",
    desc: "Practice with a supportive community. Ask questions. Trust your own way of connecting.",
  },
];

const HowItWorksSection = () => (
  <section className="bg-white py-10 sm:py-14 px-5 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-[var(--jwm-purple-700)] text-2xl sm:text-3xl font-bold mb-2">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Three simple steps to start your journey
        </p>
      </div>

      {/* Steps — horizontal on desktop, vertical on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
        {/* Connecting line — desktop only */}
        <div className="hidden sm:block absolute top-10 left-[16.6%] right-[16.6%] h-px bg-purple-200 z-0" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative z-10 flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 sm:text-center">
              {/* Number circle */}
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--jwm-purple-100)] flex items-center justify-center sm:mb-4 border-4 border-white shadow-sm">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--jwm-purple-600)]" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:justify-center mb-1">
                  <span className="text-[10px] font-bold text-[var(--jwm-purple-400)] uppercase tracking-widest">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;

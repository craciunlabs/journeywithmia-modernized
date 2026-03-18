import React from "react";
import { HandHeart, Users, Leaf } from "lucide-react";

const benefits = [
  {
    icon: HandHeart,
    title: "Stop Asking 'Am I Making This Up?'",
    desc: "Within weeks, you'll feel the difference between imagination and genuine connection. Mia's gentle guidance helps you recognize YOUR unique way of receiving—no more second-guessing."
  },
  {
    icon: Leaf,
    title: "Finally Learn YOUR Way",
    desc: "Every course taught you THEIR system. Here, you'll discover what feels natural to YOU—and why that's exactly how Spirit wants to work with you."
  },
  {
    icon: Users,
    title: "People Who Finally Get You",
    desc: "No more explaining yourself. No more 'you're crazy' looks. Just people who've felt exactly what you feel—and celebrate every breakthrough with you."
  }
];

const BenefitsSection = () => (
  <section className="bg-white section-padding" id="benefits">
    <div className="text-center mb-8 sm:mb-10">
      <span className="inline-block bg-purple-50 text-purple-primary px-4 py-1 rounded-full text-xs sm:text-sm mb-3">
        Why This Membership Works
      </span>
      <h2 className="font-serif text-purple-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
        What Changes When You Join
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
        Real transformation happens here—emotional safety, personalized guidance, and a community that understands.
      </p>
    </div>

    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-5">
      {benefits.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={i}
            className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center bg-gray-50 rounded-xl p-5 sm:p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-shrink-0 p-2.5 rounded-xl bg-amber-50 sm:mb-1">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2 leading-tight">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default BenefitsSection;

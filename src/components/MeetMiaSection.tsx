import React from "react";

interface MeetMiaSectionProps {
  MiaImage: string;
  isMobile?: boolean;
}

const MeetMiaSection = ({ MiaImage, isMobile = false }: MeetMiaSectionProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center ${
      isMobile ? 'p-5' : 'p-8'
    } gap-4`}>
      {/* Mia image */}
      <img
        src={MiaImage}
        alt="Mia Ottosson"
        className={`${isMobile ? 'h-20 w-20' : 'h-28 w-28'} border-4 border-[var(--jwm-purple-100)] shadow rounded-full object-cover`}
        loading="lazy"
        decoding="async"
      />

      <div className="w-full text-center">
        <h2 className={`text-[var(--jwm-purple-700)] ${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 font-serif`}>
          Meet Your Guide: Mia Ottosson
        </h2>

        <p className={`mb-3 text-[var(--jwm-purple-600)] ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed font-serif italic max-w-xl mx-auto`}>
          "I know exactly what it feels like to doubt your talents. I spent decades thinking I was 'too sensitive' or wondering if I was good enough—and honestly, I still ask myself that sometimes. It wasn't until I found the right guidance that everything clicked."
        </p>

        <p className={`mb-3 text-[var(--jwm-purple-800)] ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed max-w-xl mx-auto`}>
          Mia Ottosson taught for decades at many prestigious international institutions.
          <br />
          <strong>30+ years</strong> of experience as a professional medium and teacher, guiding more than <strong>5,000 intuitive talents</strong> worldwide.
          <span className="block mt-2 text-[var(--jwm-purple-400)] font-medium">
            Expect warmth, encouragement, honest feedback, and real mentorship every step of your journey.
          </span>
        </p>

        {/* Stats */}
        <div className={`flex flex-row ${isMobile ? 'gap-4' : 'gap-10'} mt-4 justify-center`}>
          {[
            { value: "30+", label: "Years Experience" },
            { value: "International", label: "Tutor" },
            { value: "5000+", label: "Talents Guided" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className={`block ${isMobile ? 'text-base' : 'text-lg'} font-bold text-[var(--jwm-purple-700)]`}>{value}</strong>
              <span className="block text-xs text-[var(--jwm-purple-400)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetMiaSection;

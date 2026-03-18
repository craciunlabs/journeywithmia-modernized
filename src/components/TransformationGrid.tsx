import React from "react";

const BA = [
  {
    name: "Sarah",
    before: "I had a lady who asked me to do a reading and I sort of chickened out.",
    after: "I always believe if you come for a sitting for me, that person in spirit will be there. 100%. And they've never failed me."
  },
  {
    name: "David",
    before: "My biggest fear was that the audience would say afterwards, that was a shitty medium.",
    after: "I pretend I'm the best medium I can be, even if I feel nervous. I pretend I know what I'm doing every time."
  },
  {
    name: "Lisa",
    before: "How many of you when you start doing sitting was doing more than half an hour? You say half an hour and you're doing one and a half hour.",
    after: "When you're working as a medium, you're not allowed to give away your power... you are in charge of the sitting."
  },
];

const TransformationGrid = () => (
  <section className="bg-gray-50 section-padding">
    <div className="max-w-3xl mx-auto text-center mb-8">
      <h2 className="font-serif text-purple-primary text-2xl sm:text-3xl font-bold mb-3">
        Real Student Transformations
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Before &amp; After: The difference personalized guidance makes
      </p>
    </div>

    {/* Mobile: horizontal snap carousel */}
    <div className="sm:hidden snap-carousel">
      {BA.map((t, idx) => (
        <TransformationCard key={idx} {...t} />
      ))}
    </div>

    {/* Desktop: grid */}
    <div className="hidden sm:grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {BA.map((t, idx) => (
        <TransformationCard key={idx} {...t} />
      ))}
    </div>
  </section>
);

const TransformationCard = ({ name, before, after }: { name: string; before: string; after: string }) => (
  <div className="rounded-2xl bg-white shadow-sm flex flex-col p-5 w-[300px] sm:w-auto min-h-[240px]">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-[var(--jwm-purple-100)] flex items-center justify-center text-xs font-bold text-[var(--jwm-purple-600)]">
        {name[0]}
      </div>
      <span className="text-sm font-medium text-gray-800">{name}'s Journey</span>
    </div>
    <div className="text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-700 mb-2 font-semibold uppercase tracking-wide w-fit">
      Before
    </div>
    <blockquote className="italic font-serif text-gray-500 mb-3 text-sm leading-relaxed">"{before}"</blockquote>
    <div className="text-xs px-2.5 py-1 rounded-md bg-green-50 text-green-700 mb-2 font-semibold uppercase tracking-wide w-fit">
      After
    </div>
    <blockquote className="italic font-serif text-gray-800 text-sm leading-relaxed">"{after}"</blockquote>
  </div>
);

export default TransformationGrid;

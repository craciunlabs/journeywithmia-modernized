import React from "react";
import { CheckCircle2, Shield, Users } from "lucide-react";

const badges = [
  {
    icon: CheckCircle2,
    title: "Try Free Session",
    description: "Experience live with Mia first",
  },
  {
    icon: Shield,
    title: "No Credit Card",
    description: "Start completely risk-free",
  },
  {
    icon: Users,
    title: "50+ Active Members",
    description: "Growing community",
  },
];

const TrustBadges = () => {
  return (
    <section className="bg-white py-5 border-b border-gray-100 md:hidden">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-purple-50/60 border border-purple-100/60"
              >
                <div className="mb-2 p-1.5 rounded-full bg-white shadow-sm">
                  <Icon className="w-4 h-4 text-purple-600" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-purple-900 text-xs leading-tight mb-0.5">
                  {badge.title}
                </h3>
                <p className="text-[10px] text-purple-600/70 leading-tight">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

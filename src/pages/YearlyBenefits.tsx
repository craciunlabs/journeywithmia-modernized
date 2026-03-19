import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  Star,
  Palette,
  User,
  Sparkles,
  ArrowRight,
  Check,
  Info,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

/* ------------------------------------------------------------------ */
/* Service data                                                        */
/* ------------------------------------------------------------------ */

const YEARLY_SERVICES = [
  {
    id: "soul-pictures",
    name: "Soul Pictures",
    icon: Palette,
    description:
      "A unique artistic interpretation of your soul's energy, channeled by Mia. Each picture captures your spiritual essence in a beautiful, personalized artwork.",
    originalPrice: "€300",
    discountedPrice: "€270",
    savings: "€30",
    learnMoreUrl: "",
    bookUrl: "",
    available: true,
    features: [
      "Personalized digital artwork",
      "Channeled interpretation included",
      "High-resolution file delivered",
    ],
  },
  {
    id: "personal-sessions",
    name: "Personal Sessions",
    icon: User,
    description:
      "One-on-one extended private sessions with Mia for deeper spiritual guidance, evidential mediumship, or personal development work tailored to your needs.",
    originalPrice: "€300",
    discountedPrice: "€270",
    savings: "€30",
    learnMoreUrl: "https://personal-sessions.vercel.app",
    bookUrl: "",
    available: true,
    features: [
      "Up to 90-minute private session",
      "Evidential mediumship or spiritual guidance",
      "Personalized in-depth support",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Service card                                                        */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }: { service: (typeof YEARLY_SERVICES)[0] }) {
  const hasLearnMore = !!service.learnMoreUrl;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <service.icon size={22} className="text-[var(--jwm-purple-600)]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm text-gray-400 line-through">{service.originalPrice}</div>
            <div className="text-xl font-bold text-[var(--jwm-purple-700)]">
              {service.discountedPrice}
            </div>
            <div className="text-xs text-green-600 font-medium">Save {service.savings}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-3">
          {hasLearnMore ? (
            <a
              href={service.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Learn More <ExternalLink size={13} />
            </a>
          ) : (
            <button
              disabled
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed"
            >
              Learn More
            </button>
          )}
          <button
            disabled
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
            style={{ backgroundColor: "rgba(55, 30, 90, 0.1)" }}
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

const YearlyBenefits = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SEO
        title="Yearly Member Benefits — Journey with Mia"
        description="Exclusive 10% discount on Mia's services for yearly members. Soul pictures, personal sessions, and more."
        canonical="https://start.journeywithmia.com/yearly-benefits"
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        {/* ─── Hero ─── */}
        <section className="bg-gradient-to-b from-[var(--jwm-purple-700)] to-[var(--jwm-purple-600)] pt-28 sm:pt-32 pb-14 sm:pb-18 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-300/10 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-5 sm:px-6 max-w-3xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-5">
              <Crown size={14} className="text-amber-300" />
              <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                Yearly Exclusive
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your Yearly
              <span className="text-amber-300"> Member Benefits</span>
            </h1>

            <p className="text-white/75 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              As a yearly member, you receive an exclusive 10% discount on Mia's
              personal services. Here's what's available.
            </p>
          </div>
        </section>

        {/* ─── Discount badge ─── */}
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
              <Star size={22} className="text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                10% Discount on All Listed Services
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                Your discount is already reflected in the prices below. Contact Mia before purchasing.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Services ─── */}
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl py-8 sm:py-12">
          <div className="space-y-4">
            {YEARLY_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Coming soon */}
          <div className="mt-6 bg-white border border-dashed border-purple-200 rounded-2xl p-6 text-center">
            <Sparkles size={24} className="text-[var(--jwm-purple-400)] mx-auto mb-2" />
            <p className="font-medium text-gray-800 text-sm">More Services Coming Soon</p>
            <p className="text-gray-500 text-xs mt-1">
              Selected workshops and programs will be added when available
            </p>
          </div>

          {/* Info note */}
          <div className="mt-6 flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4">
            <Info size={16} className="text-[var(--jwm-purple-600)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              Your 10% discount is already applied in the pricing shown. If you have
              questions about any service, contact Mia at{" "}
              <a
                href="mailto:mia@miaottosson.se"
                className="text-[var(--jwm-purple-600)] underline"
              >
                mia@miaottosson.se
              </a>{" "}
              before booking.
            </p>
          </div>

          {/* Back CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] transition-colors"
            >
              <ArrowRight size={15} className="rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default YearlyBenefits;

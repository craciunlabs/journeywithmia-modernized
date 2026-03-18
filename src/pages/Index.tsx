
import React, { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import CountdownSection from "@/components/CountdownSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import TransformationGrid from "@/components/TransformationGrid";
import MainTestimonialGrid from "@/components/MainTestimonialGrid";
import PromoVideoSection from "@/components/PromoVideoSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import StickyCtaBar from "@/components/StickyCtaBar";
import { initScrollDepthTracking } from "@/utils/analytics";
import SEO from "@/components/SEO";
import MobileAnnouncementBanner from "@/components/MobileAnnouncementBanner";

const Index = () => {
  // Initialize scroll depth tracking
  useEffect(() => {
    const cleanup = initScrollDepthTracking();
    return cleanup;
  }, []);

  // Course schema for home page
  const courseSchema = {
    "@type": "Course",
    "name": "Journey with Mia - Mediumship Development Program",
    "description": "Develop your mediumship abilities with personalized guidance, live interactive sessions, and a supportive community. Learn to trust your intuition and connect with spirit.",
    "provider": {
      "@type": "Person",
      "name": "Mia Ottosson",
      "url": "https://start.journeywithmia.com"
    },
    "offers": [
      {
        "@type": "Offer",
        "price": "35",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://start.journeywithmia.com",
        "priceValidUntil": "2026-12-31",
        "category": "Monthly Membership"
      },
      {
        "@type": "Offer",
        "price": "240",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://start.journeywithmia.com",
        "priceValidUntil": "2026-12-31",
        "category": "Yearly Membership"
      }
    ],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT90M"
    }
  };

  // Organization schema
  const organizationSchema = {
    "@type": "Organization",
    "name": "Journey with Mia",
    "url": "https://start.journeywithmia.com",
    "logo": "https://start.journeywithmia.com/lovable-uploads/daca819d-8c9e-4e92-a1d1-698e401e9106.png",
    "description": "Spiritual mediumship development platform offering live interactive sessions and personalized guidance.",
    "founder": {
      "@type": "Person",
      "name": "Mia Ottosson"
    }
  };

  // FAQ schema for rich snippets (only plain-text FAQs included)
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between your Progressive Course and this new membership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Progressive Course is an intensive, small-group program (8-14 students) focused exclusively on mental mediumship development. It includes longer sessions, one-on-one mentorship, personalized feedback on recordings, and deep, structured learning. This yearly and monthly subscription is a broader exploration of various spiritual practices including mediumship, trance, healing, tarot, and more in shorter 60-minute group sessions. The Progressive Course offers specialized depth and personal attention, while this membership provides general spiritual exploration at an introductory level with a larger student community and no group size limitations."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the membership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The membership includes 3 live interactive sessions per month, access to all session recordings, a supportive community forum, and direct access to Mia during Q&A portions. Yearly members also receive priority during Q&A sessions and a 10% discount on select offerings including personal sessions, soul portraits, and selected online workshops and programs."
        }
      },
      {
        "@type": "Question",
        "name": "What if I can't attend the live sessions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All sessions are recorded and made available to members within 72 hours. You can watch them at your convenience and still participate in the exercises on your own time. Many members achieve great results through the recordings alone."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a refund policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Due to the exceptional quality of Mia's work and the already low membership fee, there are no refunds for any membership. However, you can always start with a monthly subscription and simply cancel the renewal at any time with no questions asked. You're encouraged to experience a session first before upgrading to yearly for maximum value."
        }
      },
      {
        "@type": "Question",
        "name": "Is this suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! The membership is designed for all levels, from complete beginners to those with some experience. Mia provides clear guidance and exercises appropriate for wherever you are on your journey. Many beginners have found this to be the perfect starting point."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel my subscription?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, monthly memberships can be canceled at any time. For yearly memberships, you receive the full year's access upfront at the discounted rate, so they are non-refundable but will not auto-renew unless you choose to continue."
        }
      },
      {
        "@type": "Question",
        "name": "Why should I choose the yearly option?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The yearly membership offers tremendous value with a 42% discount compared to paying monthly, and includes exclusive bonuses such as the 'Secrets to Mediumship Masterclass' (60-min recording). Yearly members receive priority during Q&A sessions, a 10% discount on Mia's online offerings (personal sessions, soul portraits, and selected programs - contact required to claim), and lock in the current pricing for the entire year."
        }
      }
    ]
  };

  // Review/Rating schema for testimonials
  const reviewSchema = {
    "@type": "Product",
    "name": "Journey with Mia Membership",
    "description": "Spiritual mediumship development membership program",
    "brand": {
      "@type": "Brand",
      "name": "Journey with Mia"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "50",
      "reviewCount": "3"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah L."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Mia's guidance was a beacon. I've unlocked intuitive abilities I never knew I possessed. This journey has been profoundly life-changing."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David R."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The community Mia has built is so supportive. Learning alongside others on the same path has been invaluable. I feel truly connected."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Anna K."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I was skeptical at first, but Mia's authentic approach and deep wisdom have helped me connect with spirit in ways I couldn't imagine. Highly recommended!"
      }
    ]
  };

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [courseSchema, organizationSchema, faqSchema, reviewSchema]
  };

  return (
    <>
      <SEO
        title="Spiritual Mediumship Development"
        description="Discover your spiritual talents and develop your mediumship abilities with personalized guidance, live interactive sessions, and a supportive community."
        canonical="https://start.journeywithmia.com"
        schema={combinedSchema}
      />

      <MobileAnnouncementBanner />
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main>
          <HeroSection />
          {/* Trust Badges - Mobile only, 3 compact squares */}
          <TrustBadges />
          <CountdownSection />
          <ProblemSection />
          <HowItWorksSection />
          <BenefitsSection />
          <TransformationGrid />
          <MainTestimonialGrid />
          {/* Combined promo video and about section */}
          <PromoVideoSection />
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
        <StickyCtaBar />
      </div>
    </>
  );
};

export default Index;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Mail,
  ArrowRight,
  Users,
  UserPlus,
  Headphones,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const CheckoutSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SEO
        title="Welcome to the Journey! — Journey with Mia"
        description="Your membership is now active. Here's what happens next."
        canonical="https://start.journeywithmia.com/checkout-success"
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        <div className="container mx-auto px-5 sm:px-6 max-w-lg pt-32 sm:pt-36 pb-16">
          {/* Success card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Welcome to the Journey
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-8">
              Your payment was successful and your membership is now active.
            </p>

            {/* What's next */}
            <div className="bg-purple-50 rounded-xl p-5 sm:p-6 mb-8 text-left">
              <h2 className="font-semibold text-[var(--jwm-purple-800)] mb-4 flex items-center gap-2 text-sm">
                <Mail size={18} />
                What happens next?
              </h2>
              <ol className="space-y-4">
                {[
                  {
                    num: 1,
                    icon: Mail,
                    text: "Check your email for a welcome message with instructions",
                  },
                  {
                    num: 2,
                    icon: UserPlus,
                    text: "Create your member account using the same email",
                  },
                  {
                    num: 3,
                    icon: Headphones,
                    text: "Access your dashboard with sessions, recordings, and more",
                  },
                ].map((step) => (
                  <li key={step.num} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-[var(--jwm-purple-200)] text-[var(--jwm-purple-800)] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {step.num}
                    </span>
                    <span className="text-sm text-gray-700 pt-0.5">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                to="/member-portal"
                className="w-full gold-button py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                Create Your Account <ArrowRight size={15} />
              </Link>

              <a
                href="https://www.facebook.com/groups/599284349871570"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Users size={16} />
                Join Facebook Community
              </a>
            </div>

            {/* Support */}
            <p className="text-xs text-gray-500 mt-8">
              Questions? Email us at{" "}
              <a
                href="mailto:mia@miaottosson.se"
                className="text-[var(--jwm-purple-600)] underline"
              >
                mia@miaottosson.se
              </a>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CheckoutSuccess;

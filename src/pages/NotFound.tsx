import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found — Journey with Mia"
        description="The page you're looking for doesn't exist."
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        <div className="container mx-auto px-5 sm:px-6 max-w-lg pt-32 sm:pt-40 pb-20 text-center">
          {/* Large 404 */}
          <div className="mb-6">
            <span className="text-8xl sm:text-9xl font-serif font-bold text-[var(--jwm-purple-200)]">
              404
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Navigation options */}
          <div className="space-y-3 max-w-xs mx-auto">
            <Link
              to="/"
              className="w-full gold-button py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Go to Homepage
            </Link>

            <Link
              to="/try-for-free"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Try a Free Session <ArrowRight size={15} />
            </Link>

            <Link
              to="/schedule"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Schedule <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;

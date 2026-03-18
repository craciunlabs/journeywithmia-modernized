import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const hideJoinButton = location.pathname === '/prep-materials-xk9m';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleTryForFreeClick = (e: React.MouseEvent) => {
    trackCTAClick('Try For Free', 'header');
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToPricing();
    }
  };

  const handleJoinNowClick = (e: React.MouseEvent) => {
    trackCTAClick('Join Now', 'header');
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToPricing();
    }
  };

  const scrolledBg = "bg-white/95 backdrop-blur-md shadow-sm";
  const transparentBg = "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full py-2 sm:py-2.5 transition-all duration-300 z-50 ${
          isScrolled ? scrolledBg : transparentBg
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="py-0">
            <h1
              className={`font-serif text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-purple-primary" : "text-white"
              }`}
            >
              Journey with Mia
            </h1>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/member-portal"
              className={`${
                isScrolled
                  ? "text-purple-primary border border-purple-200 hover:bg-purple-50"
                  : "text-white border border-white/30 hover:bg-white/10"
              } transition-all duration-200 text-sm font-medium px-4 py-2 rounded-full min-h-[40px] inline-flex items-center`}
            >
              Member Login
            </Link>
            {!hideJoinButton && (
              <>
                <Link
                  to="/try-for-free"
                  onClick={handleTryForFreeClick}
                  className={`${
                    isScrolled
                      ? "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
                      : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                  } transition-all duration-200 text-sm font-medium px-4 py-2 rounded-full min-h-[40px] inline-flex items-center backdrop-blur-sm`}
                >
                  🎁 Try Free
                </Link>
                <button
                  onClick={handleJoinNowClick}
                  className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 min-h-[40px]"
                >
                  Join Now
                </button>
              </>
            )}
          </div>

          {/* Mobile: primary CTA + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            {!hideJoinButton && (
              <button
                onClick={handleJoinNowClick}
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-xs px-4 py-2 rounded-full shadow-sm min-h-[40px]"
              >
                Join Now
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors ${
                isScrolled ? "text-purple-primary hover:bg-purple-50" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute top-14 left-3 right-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-3">
              <Link
                to="/member-portal"
                className="text-purple-primary font-medium py-3 px-4 rounded-xl hover:bg-purple-50 transition-colors text-center border border-purple-100"
              >
                Member Login
              </Link>
              {!hideJoinButton && (
                <Link
                  to="/try-for-free"
                  onClick={handleTryForFreeClick}
                  className="text-purple-700 font-medium py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors text-center"
                >
                  🎁 Try a Free Session
                </Link>
              )}
              <Link
                to="/schedule"
                className="text-gray-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                View Schedule
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

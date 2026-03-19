import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const hideGetStartedButton = location.pathname === '/prep-materials-xk9m';

  return (
    <footer className="bg-[var(--jwm-neutral-900)] text-white pt-10 sm:pt-14 !pb-[180px] sm:!pb-[160px] lg:!pb-24 safe-area-bottom">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Top row: brand + links + CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          {/* Brand + tagline */}
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-xl font-bold mb-1">
              <span style={{ wordSpacing: '0.05em' }}>Journey with Mia</span>
            </h2>
            <p className="text-gray-400 text-xs max-w-[220px]">
              Helping you trust your intuitive talents since 1996.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/member-portal"
              className="hover:text-amber-400 transition-colors text-sm"
            >
              Member Portal
            </Link>
            <Link
              to="/schedule"
              className="hover:text-amber-400 transition-colors text-sm"
            >
              Schedule
            </Link>
            <Link
              to="/terms"
              className="hover:text-amber-400 transition-colors text-sm"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-amber-400 transition-colors text-sm"
            >
              Privacy
            </Link>
            <a href="mailto:mia@miaottosson.se" className="hover:text-amber-400 transition-colors text-sm">
              Contact
            </a>
          </div>

          {/* CTA — hidden on mobile since sticky bar covers it */}
          {!hideGetStartedButton && (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="gold-button px-5 py-2 text-sm rounded-full !hidden sm:!inline-flex"
            >
              Get Started Now ✨
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/mia_ottosson_medium/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@MiaOttosson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="mailto:mia@miaottosson.se"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 Journey with Mia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const hideGetStartedButton = location.pathname === '/prep-materials-xk9m';

  return (
    <footer className="bg-[var(--jwm-neutral-900)] text-white py-10 safe-area-bottom">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
          {/* Brand */}
          <h2 className="font-serif text-xl font-bold">Journey with Mia</h2>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/member-portal"
              className="hover:text-amber-400 transition-colors text-sm"
            >
              Member Portal
            </Link>
            <a href="/terms#terms" className="hover:text-amber-400 transition-colors text-sm">
              Terms
            </a>
            <a href="/terms#privacy" className="hover:text-amber-400 transition-colors text-sm">
              Privacy
            </a>
            <a href="mailto:mia@miaottosson.se" className="hover:text-amber-400 transition-colors text-sm">
              Contact
            </a>
          </div>

          {/* CTA — hidden on mobile since floating banner covers it */}
          {!hideGetStartedButton && (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:inline-flex gold-button px-5 py-2 text-sm rounded-full"
            >
              Get Started Now ✨
            </a>
          )}
        </div>

        <div className="text-center text-xs text-gray-500">
          © 2026 Journey with Mia. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

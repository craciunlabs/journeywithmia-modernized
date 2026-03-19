import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Scale, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

/* ------------------------------------------------------------------ */
/* Shared section wrapper                                              */
/* ------------------------------------------------------------------ */
function LegalSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
          <Icon size={20} className="text-[var(--jwm-purple-600)]" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Individual clause component                                         */
/* ------------------------------------------------------------------ */
function Clause({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-full bg-[var(--jwm-purple-100)] text-[var(--jwm-purple-700)] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{title}</h3>
          <div className="text-gray-600 text-sm leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const EMAIL = "mia@miaottosson.se";
const EmailLink = () => (
  <a
    href={`mailto:${EMAIL}`}
    className="text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] underline underline-offset-2"
  >
    {EMAIL}
  </a>
);

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */
const TermsAndPrivacy = () => {
  const location = useLocation();

  useEffect(() => {
    // If URL has #privacy or #terms, scroll to that section
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  // Determine which section is primary based on route
  const isPrivacy = location.pathname === "/privacy";

  return (
    <>
      <SEO
        title={isPrivacy ? "Privacy Policy — Journey with Mia" : "Terms & Conditions — Journey with Mia"}
        description="Terms of service and privacy policy for Journey with Mia membership."
        canonical={`https://start.journeywithmia.com${isPrivacy ? "/privacy" : "/terms"}`}
      />

      <div className="min-h-screen bg-[#faf8f6]">
        <Header />

        {/* ─── Hero ─── */}
        <section className="bg-gradient-to-b from-[var(--jwm-purple-700)] to-[var(--jwm-purple-600)] pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="container mx-auto px-5 sm:px-6 max-w-3xl text-center">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
              Last updated: March 2026
            </p>

            {/* Quick nav pills */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("terms")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isPrivacy
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
                }`}
              >
                Terms & Conditions
              </a>
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("privacy")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isPrivacy
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
                }`}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </section>

        {/* ─── Content ─── */}
        <div className="container mx-auto px-5 sm:px-6 max-w-3xl py-12 sm:py-16 space-y-16">
          {/* ─── Terms ─── */}
          <LegalSection id="terms" icon={Scale} title="Terms & Conditions">
            <Clause number={1} title="Membership & Sessions">
              <p>
                <strong>Session Duration:</strong> All live sessions last approximately
                60 to 90 minutes. The exact length may vary based on group needs.
              </p>
              <p>
                <strong>Recordings:</strong> Recordings of live sessions are made available
                to members within 72 hours after the session ends.
              </p>
              <p>
                <strong>Session Scheduling:</strong> The membership includes three (3) live
                sessions per month. Specific days may change month to month with at least 30
                days advance notice. All sessions are recorded and available in the portal.
              </p>
              <p>
                <strong>Membership Perks:</strong> Active members may be entitled to certain
                perks, such as the "Gift a Month" program. Yearly members receive a 10%
                discount on select offerings including personal sessions, soul portraits,
                and selected online workshops and programs (excludes private sittings). To
                claim, contact Mia at <EmailLink /> before making a purchase — discounts
                cannot be applied retroactively. All perks are subject to change.
              </p>
            </Clause>

            <Clause number={2} title="Payments & Refunds">
              <p>
                <strong>Payment:</strong> Membership fees are billed according to the plan
                you select (monthly or yearly). Access is granted upon successful payment.
              </p>
              <p>
                <strong>No Refund Policy:</strong> All payments are non-refundable for both
                monthly and yearly plans. Monthly members may cancel renewal anytime for
                future cycles, but no refunds are given for active billing periods.
              </p>
              <p>
                <strong>Price Protection:</strong> As long as your subscription remains
                active, your original rate is locked in. If you cancel and rejoin later,
                current pricing applies.
              </p>
            </Clause>

            <Clause number={3} title="Contact & Support">
              <p>
                For questions, technical issues, or support, contact Mia at{" "}
                <EmailLink />. We aim to respond within 48 hours.
              </p>
            </Clause>

            <Clause number={4} title="Member Conduct">
              <p>
                Please treat all members and instructors with kindness and respect.
                Disruptive or inappropriate behavior may result in removal from sessions
                and/or termination of membership, without refund.
              </p>
            </Clause>

            <Clause number={5} title="Recordings & Privacy">
              <p>
                <strong>Consent to Record:</strong> By participating in live sessions, you
                consent to the session being recorded and shared within the private member
                portal.
              </p>
              <p>
                <strong>Opting Out:</strong> You may participate with camera and/or
                microphone off if you prefer not to appear in recordings.
              </p>
            </Clause>

            <Clause number={6} title="Changes to Terms">
              <p>
                These Terms may be updated periodically. Significant changes will be
                communicated by email or through the member portal. Continued use
                constitutes acceptance.
              </p>
            </Clause>

            <Clause number={7} title="Member Responsibility">
              <p>
                <strong>Device & Internet:</strong> Members are responsible for their own
                devices and internet connections. We cannot resolve technical issues on
                your end.
              </p>
              <p>
                <strong>Environment:</strong> It is your responsibility to create a quiet,
                distraction-free space for sessions.
              </p>
              <p>
                <strong>Missed Sessions:</strong> If you cannot attend a live session,
                recordings are available. Refunds, credits, or extra sessions cannot be
                offered for missed sessions.
              </p>
            </Clause>

            <Clause number={8} title="Copyright & Intellectual Property">
              <p>
                All content is the intellectual property of Mia Ottosson. Materials are
                for personal, non-commercial use only and may not be shared, distributed,
                or sold without express written permission.
              </p>
            </Clause>

            <Clause number={9} title="Disclaimer">
              <p>
                <strong>Educational Purpose:</strong> All teachings and guidance are for
                educational and personal development purposes only.
              </p>
              <p>
                <strong>No Guarantees:</strong> No guarantees of specific personal,
                spiritual, or financial results are made. Your progress depends on your
                own commitment and practice.
              </p>
              <p>
                <strong>Not Professional Advice:</strong> This membership is not a
                substitute for professional medical, psychological, legal, or financial
                advice. Please consult licensed professionals for those needs.
              </p>
              <p>
                <strong>Assumption of Risk:</strong> You participate voluntarily and accept
                full responsibility for the consequences of your use of the information
                provided.
              </p>
            </Clause>

            <Clause number={10} title="Acceptance of Terms">
              <p>
                By purchasing a membership, you confirm that you have read, understood, and
                agree to be bound by these Terms & Conditions. Questions? Reach out to Mia
                at <EmailLink /> before purchasing.
              </p>
            </Clause>
          </LegalSection>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* ─── Privacy ─── */}
          <LegalSection id="privacy" icon={Shield} title="Privacy Policy">
            <Clause number={1} title="Information We Collect">
              <p>
                <strong>Provided Information:</strong> We collect information you provide
                when registering — your name, email address, and payment details. We may
                also collect data about session participation and activity.
              </p>
              <p>
                <strong>"Gift a Month" Program:</strong> If you gift a membership, we
                collect the recipient's name and email solely to send their access
                invitation.
              </p>
            </Clause>

            <Clause number={2} title="How We Use Your Information">
              <p>
                <strong>Core Services:</strong> Managing your membership, granting access
                to sessions and materials, processing payments, and providing support.
              </p>
              <p>
                <strong>Communication:</strong> Sending important updates, session
                reminders, and service changes.
              </p>
              <p>
                <strong>Improvement:</strong> Aggregated, non-identifiable data may be used
                to improve our services.
              </p>
            </Clause>

            <Clause number={3} title="Sharing Your Information">
              <p>
                <strong>No Sale of Data:</strong> We do not sell or rent your personal
                information to third parties.
              </p>
              <p>
                <strong>Trusted Providers:</strong> Information may be shared with trusted
                service providers (payment processors, email services) solely as needed to
                operate the membership.
              </p>
            </Clause>

            <Clause number={4} title="Session Recordings & Privacy">
              <p>
                Recordings are available only to members within the private portal. You may
                participate with camera/microphone off if you prefer not to appear.
              </p>
            </Clause>

            <Clause number={5} title="Data Security">
              <p>
                We take reasonable technical and administrative measures to protect your
                information from unauthorized access, loss, or misuse.
              </p>
            </Clause>

            <Clause number={6} title="Your Rights">
              <p>
                You can request access to, correction of, or deletion of your personal
                information at any time by contacting Mia at <EmailLink />.
              </p>
            </Clause>

            <Clause number={7} title="Changes to This Policy">
              <p>
                This Privacy Policy may be updated from time to time. Significant changes
                will be communicated by email or through the member portal.
              </p>
            </Clause>

            <Clause number={8} title="Questions?">
              <p>
                If you have any questions or concerns about your privacy, contact Mia
                at <EmailLink />.
              </p>
            </Clause>
          </LegalSection>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TermsAndPrivacy;

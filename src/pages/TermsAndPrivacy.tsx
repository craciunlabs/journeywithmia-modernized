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
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

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
              Last updated: March 19, 2026
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

          {/* ══════════════════════════════════════════════════════════ */}
          {/*  TERMS & CONDITIONS                                       */}
          {/* ══════════════════════════════════════════════════════════ */}
          <LegalSection id="terms" icon={Scale} title="Terms & Conditions">

            {/* Introductory paragraph */}
            <div className="text-gray-600 text-sm leading-relaxed space-y-2 -mt-2">
              <p>
                These Terms & Conditions ("Terms") govern your use of the Journey with Mia
                membership platform operated by Mia Ottosson, sole proprietor, based in
                Sweden ("we", "us", "Mia"). By purchasing a membership or using our
                services, you agree to these Terms. If you do not agree, please do not
                subscribe.
              </p>
            </div>

            <Clause number={1} title="Service Description">
              <p>
                Journey with Mia is an online membership community for spiritual and
                mediumship development. The membership provides access to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Live group sessions via Zoom (approximately 60–90 minutes each)</li>
                <li>Recordings of live sessions within the member portal</li>
                <li>A private community of fellow members</li>
                <li>Additional content, workshops, and resources as made available</li>
              </ul>
              <p>
                <strong>Session Scheduling:</strong> The membership includes approximately
                three (3) live sessions per month. Specific dates may change month to month
                with at least 30 days' advance notice. All sessions are recorded and made
                available in the member portal.
              </p>
              <p>
                <strong>Recordings:</strong> Recordings of live sessions are made available
                to members within 72 hours after the session ends.
              </p>
            </Clause>

            <Clause number={2} title="Membership Plans & Pricing">
              <p>
                We offer two membership plans:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Monthly Membership:</strong> Billed monthly, cancel renewal anytime.</li>
                <li><strong>Yearly Membership:</strong> Billed annually at a discounted rate.</li>
              </ul>
              <p>
                <strong>Price Protection:</strong> As long as your subscription remains
                active, your original rate is locked in. If you cancel and rejoin later,
                the current pricing at the time of re-subscription applies.
              </p>
              <p>
                <strong>Membership Perks:</strong> Active members may be entitled to
                certain perks, such as the "Gift a Month" program. Yearly members receive
                a 10% discount on select offerings including personal sessions, soul
                portraits, and selected online workshops and programs (excludes private
                sittings). To claim, contact Mia at <EmailLink /> before making a purchase
                — discounts cannot be applied retroactively. All perks are subject to
                change with 30 days' notice.
              </p>
            </Clause>

            <Clause number={3} title="Payments, Refunds & Cancellation">
              <p>
                <strong>Payment Processing:</strong> All payments are processed securely
                through Stripe. We do not store your full payment card details on our
                servers. By subscribing, you authorize recurring charges according to
                your selected plan.
              </p>
              <p>
                <strong>Refund Policy:</strong> All payments are non-refundable for both
                monthly and yearly plans. Monthly members may cancel renewal at any time
                for future billing cycles, but no refunds are given for the active billing
                period. Yearly members may cancel to prevent automatic renewal but are not
                entitled to a pro-rata refund for the remaining months.
              </p>
              <p>
                <strong>Cancellation:</strong> You may cancel your subscription at any time
                through the member portal or by contacting us at <EmailLink />. Cancellation
                takes effect at the end of your current billing period, and you will retain
                access until that date.
              </p>
            </Clause>

            <Clause number={4} title="Right of Withdrawal (EU Consumers)">
              <p>
                Under the EU Consumer Rights Directive (2011/83/EU), you have a 14-day
                right of withdrawal ("cooling-off period") starting from the date
                your subscription contract is concluded, during which you may cancel
                without providing a reason.
              </p>
              <p>
                <strong>Waiver for Immediate Access:</strong> Because our membership grants
                immediate access to digital content (live sessions, recordings, community),
                you will be asked during checkout to expressly consent to the service
                beginning immediately and to acknowledge that you thereby waive your
                right of withdrawal once the service has begun. If you do not consent,
                your access may be delayed until the cooling-off period has elapsed.
              </p>
              <p>
                <strong>Exercising Your Right:</strong> To withdraw within the 14-day
                period (if you have not waived it), contact us at <EmailLink /> or use any
                unambiguous written statement. We will process your refund within 14 days
                of receiving your withdrawal notice.
              </p>
              <p>
                <strong>Withdrawal Function (from June 19, 2026):</strong> In compliance
                with EU Directive 2023/2673, a clearly labelled electronic withdrawal
                function will be available through the member portal for the duration
                of any applicable withdrawal period.
              </p>
            </Clause>

            <Clause number={5} title="Member Conduct">
              <p>
                All members and instructors are expected to treat each other with kindness
                and respect. The following are not permitted:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Disruptive, abusive, or inappropriate behavior during sessions</li>
                <li>Sharing, redistributing, or reselling any membership content</li>
                <li>Recording sessions outside the official recording provided</li>
                <li>Harassment or discrimination of any kind</li>
              </ul>
              <p>
                Violation may result in removal from sessions and/or termination of
                membership, without refund.
              </p>
            </Clause>

            <Clause number={6} title="Recordings, Consent & Privacy">
              <p>
                <strong>Consent to Record:</strong> By participating in live sessions, you
                consent to the session being recorded and shared within the private member
                portal for the benefit of all members.
              </p>
              <p>
                <strong>Opting Out:</strong> You may participate with your camera and/or
                microphone turned off if you prefer not to appear in recordings. We will
                never use session recordings for marketing without separate explicit
                consent.
              </p>
              <p>
                <strong>Confidentiality:</strong> What is shared during sessions by members
                is considered confidential. Members should not disclose other members'
                personal information or experiences outside the group.
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
                distraction-free space for sessions to ensure the best experience for
                yourself and others.
              </p>
              <p>
                <strong>Missed Sessions:</strong> If you cannot attend a live session,
                recordings are available in the portal. Refunds, credits, or extra sessions
                cannot be offered for missed sessions.
              </p>
              <p>
                <strong>Account Security:</strong> You are responsible for maintaining the
                confidentiality of your login credentials. Do not share your account access
                with others. If you suspect unauthorized access, contact us immediately.
              </p>
            </Clause>

            <Clause number={8} title="Intellectual Property">
              <p>
                All content — including session recordings, written materials, guided
                exercises, artwork, and any other resources — is the intellectual property
                of Mia Ottosson and is protected by copyright and applicable intellectual
                property laws.
              </p>
              <p>
                Content is licensed for your personal, non-commercial use only during
                your active membership. You may not copy, reproduce, distribute, share,
                sell, or create derivative works from any content without prior written
                permission from Mia.
              </p>
              <p>
                Unauthorized use may result in termination of membership and legal action.
              </p>
            </Clause>

            <Clause number={9} title="Disclaimer & Limitation of Liability">
              <p>
                <strong>Educational Purpose Only:</strong> All teachings, guidance, and
                content are for educational and personal development purposes only. Nothing
                provided constitutes medical, psychological, legal, or financial advice.
              </p>
              <p>
                <strong>No Guarantees:</strong> We make no guarantees of specific personal,
                spiritual, or financial results. Your progress depends on your own
                commitment and practice.
              </p>
              <p>
                <strong>Not Professional Advice:</strong> This membership is not a
                substitute for professional medical, psychological, legal, or financial
                advice. Please consult licensed professionals for those needs.
              </p>
              <p>
                <strong>Assumption of Risk:</strong> You participate voluntarily and accept
                full responsibility for the consequences of your use of the information and
                services provided.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> To the fullest extent permitted
                by applicable law, our total liability to you for any claims arising from
                or related to your membership shall not exceed the amount you paid for the
                membership in the 12 months preceding the claim. We are not liable for
                any indirect, incidental, special, or consequential damages.
              </p>
            </Clause>

            <Clause number={10} title="Changes to Terms">
              <p>
                We may update these Terms from time to time to reflect changes in our
                services or applicable law. Significant changes will be communicated by
                email and/or through the member portal at least 30 days before they take
                effect. Continued use of the membership after changes take effect
                constitutes acceptance of the updated Terms.
              </p>
              <p>
                If you do not agree with the updated Terms, you may cancel your membership
                before the changes take effect.
              </p>
            </Clause>

            <Clause number={11} title="Governing Law & Disputes">
              <p>
                These Terms are governed by the laws of Sweden. Any dispute arising from
                or in connection with these Terms that cannot be resolved amicably shall
                be settled by the competent courts of Sweden.
              </p>
              <p>
                <strong>EU Online Dispute Resolution:</strong> As an EU consumer, you may
                also submit a complaint through the European Commission's Online Dispute
                Resolution platform at{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] underline underline-offset-2"
                >
                  ec.europa.eu/consumers/odr
                </a>.
              </p>
            </Clause>

            <Clause number={12} title="Contact & Support">
              <p>
                For questions, technical issues, or support, contact Mia at{" "}
                <EmailLink />. We aim to respond within 48 hours on business days.
              </p>
            </Clause>

            <Clause number={13} title="Acceptance of Terms">
              <p>
                By purchasing a membership, you confirm that you have read, understood, and
                agree to be bound by these Terms & Conditions and our{" "}
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("privacy")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] underline underline-offset-2"
                >
                  Privacy Policy
                </a>. If you have questions, please reach out to Mia at <EmailLink /> before
                purchasing.
              </p>
            </Clause>
          </LegalSection>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* ══════════════════════════════════════════════════════════ */}
          {/*  PRIVACY POLICY                                           */}
          {/* ══════════════════════════════════════════════════════════ */}
          <LegalSection id="privacy" icon={Shield} title="Privacy Policy">

            {/* Introductory paragraph */}
            <div className="text-gray-600 text-sm leading-relaxed space-y-2 -mt-2">
              <p>
                This Privacy Policy explains how Journey with Mia, operated by Mia
                Ottosson ("we", "us", "Mia"), collects, uses, shares, and protects your
                personal data in connection with our membership platform and services. This
                policy is provided in accordance with Articles 13 and 14 of the EU General
                Data Protection Regulation (GDPR, Regulation 2016/679).
              </p>
            </div>

            <Clause number={1} title="Data Controller">
              <p>
                The data controller responsible for your personal data is:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1 not-prose">
                <p><strong>Mia Ottosson</strong></p>
                <p>Journey with Mia</p>
                <p>Based in Sweden</p>
                <p>Email: <EmailLink /></p>
              </div>
              <p>
                For all privacy-related inquiries, including exercising your data rights,
                please contact us at the email above.
              </p>
            </Clause>

            <Clause number={2} title="Personal Data We Collect">
              <p>We collect the following categories of personal data:</p>
              <p><strong>Information you provide directly:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name and email address (registration)</li>
                <li>Payment information (processed by Stripe — we do not store full card details)</li>
                <li>Any information you voluntarily share during sessions or in messages to us</li>
                <li>"How did you find us?" responses (optional, for marketing analysis)</li>
              </ul>
              <p><strong>Information collected automatically:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Session participation data (attendance, Zoom usage)</li>
                <li>Device and browser information (via cookies and similar technologies)</li>
                <li>IP address and approximate location (country level)</li>
                <li>Pages visited, time spent, and interactions on our website</li>
              </ul>
              <p><strong>"Gift a Month" Program:</strong> If you gift a membership, we
                collect the recipient's name and email solely to deliver their access
                invitation. We process the recipient's data on the basis of your instruction
                and the recipient's subsequent acceptance.</p>
            </Clause>

            <Clause number={3} title="How & Why We Use Your Data (Lawful Bases)">
              <p>
                Under the GDPR, we must have a lawful basis for each processing activity.
                Here is how we use your data and the legal basis for each:
              </p>
              <div className="overflow-x-auto -mx-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Lawful Basis (GDPR Art. 6)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 px-3">Providing membership access, sessions, and recordings</td>
                      <td className="py-2 px-3">Performance of contract (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Processing payments via Stripe</td>
                      <td className="py-2 px-3">Performance of contract (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Session reminders and important service updates</td>
                      <td className="py-2 px-3">Performance of contract (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Responding to your questions or support requests</td>
                      <td className="py-2 px-3">Performance of contract (Art. 6(1)(b))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Marketing emails (newsletters, offers, new content)</td>
                      <td className="py-2 px-3">Consent (Art. 6(1)(a)) — you can unsubscribe at any time</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Website analytics and service improvement</td>
                      <td className="py-2 px-3">Legitimate interest (Art. 6(1)(f)) — improving our services</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Fraud prevention and account security</td>
                      <td className="py-2 px-3">Legitimate interest (Art. 6(1)(f))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Compliance with legal and tax obligations</td>
                      <td className="py-2 px-3">Legal obligation (Art. 6(1)(c))</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Recording live sessions (with opt-out for camera/mic)</td>
                      <td className="py-2 px-3">Legitimate interest (Art. 6(1)(f)) — providing replays to members</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Clause>

            <Clause number={4} title="Sharing Your Data">
              <p>
                <strong>We do not sell, rent, or trade your personal data.</strong> We
                share data only with the following trusted service providers ("data
                processors") who process data on our behalf and under our instructions:
              </p>
              <div className="overflow-x-auto -mx-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Provider</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 px-3">Stripe</td>
                      <td className="py-2 px-3">Payment processing</td>
                      <td className="py-2 px-3">USA (EU-US Data Privacy Framework)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Supabase</td>
                      <td className="py-2 px-3">Database and authentication</td>
                      <td className="py-2 px-3">EU (Frankfurt)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Zoom</td>
                      <td className="py-2 px-3">Live session hosting and recording</td>
                      <td className="py-2 px-3">USA (EU-US Data Privacy Framework)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Vercel</td>
                      <td className="py-2 px-3">Website hosting</td>
                      <td className="py-2 px-3">Global CDN (EU-US Data Privacy Framework)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Email service provider</td>
                      <td className="py-2 px-3">Transactional and marketing emails</td>
                      <td className="py-2 px-3">EU/USA (with appropriate safeguards)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Each provider operates under a Data Processing Agreement (DPA) and is
                contractually bound to process your data only as instructed by us and in
                compliance with the GDPR.
              </p>
            </Clause>

            <Clause number={5} title="International Data Transfers">
              <p>
                Some of our service providers are based in the United States. Where personal
                data is transferred outside the EU/EEA, we ensure adequate protection
                through one or more of the following mechanisms:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>EU-US Data Privacy Framework (DPF):</strong> Providers certified under the DPF adequacy decision (as upheld by the General Court in September 2025)</li>
                <li><strong>Standard Contractual Clauses (SCCs):</strong> EU-approved model clauses as a supplementary or alternative safeguard</li>
                <li><strong>Adequacy decisions:</strong> Where the European Commission has determined that a country offers adequate protection</li>
              </ul>
            </Clause>

            <Clause number={6} title="Data Retention">
              <p>
                We retain your personal data only for as long as necessary to fulfill the
                purposes described in this policy:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Account data</strong> (name, email): Retained while your membership is active, plus 30 days after cancellation to allow for re-activation</li>
                <li><strong>Payment records:</strong> Retained for 7 years as required by Swedish tax and accounting law (Bokföringslag 1999:1078)</li>
                <li><strong>Session recordings:</strong> Available in the portal for the duration of your membership; archived recordings may be retained for up to 24 months</li>
                <li><strong>Marketing consent records:</strong> Retained for as long as you remain subscribed to marketing communications, plus 3 years for audit purposes</li>
                <li><strong>Website analytics:</strong> Aggregated and anonymized within 26 months</li>
                <li><strong>Support correspondence:</strong> Retained for up to 24 months after your last interaction</li>
              </ul>
              <p>
                After the retention period expires, your data is securely deleted or
                irreversibly anonymized.
              </p>
            </Clause>

            <Clause number={7} title="Cookies & Tracking Technologies">
              <p>
                Our website uses cookies and similar technologies. Cookies are small text
                files stored on your device that help us provide and improve our services.
              </p>
              <p><strong>Types of cookies we use:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Strictly necessary cookies:</strong> Required for the website to function (login sessions, security tokens). These do not require consent.</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (e.g., page views, traffic sources). Set only with your consent.</li>
                <li><strong>Marketing cookies:</strong> Used for advertising relevance (if applicable). Set only with your consent.</li>
              </ul>
              <p>
                Non-essential cookies are not loaded until you give explicit consent via
                our cookie banner. You may withdraw consent at any time by clearing your
                cookies or adjusting your browser settings. The "Reject" option on our
                cookie banner is presented with equal prominence to "Accept", in line
                with current EDPB guidance.
              </p>
            </Clause>

            <Clause number={8} title="Session Recordings & Privacy">
              <p>
                Live sessions are recorded and made available to active members within the
                private portal. Recordings are accessible only to members with valid login
                credentials and are not shared publicly.
              </p>
              <p>
                You may participate with your camera and/or microphone off if you prefer
                not to appear or be heard in recordings. We recommend notifying the host
                before the session if you have specific privacy concerns.
              </p>
            </Clause>

            <Clause number={9} title="Data Security">
              <p>
                We implement appropriate technical and organizational measures to protect
                your personal data against unauthorized access, alteration, disclosure, or
                destruction. These include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Secure authentication with hashed passwords</li>
                <li>Access controls limiting data access to authorized personnel only</li>
                <li>Regular security reviews of our infrastructure and providers</li>
              </ul>
              <p>
                While we take data security seriously, no system is 100% secure. If we
                become aware of a data breach that poses a risk to your rights and freedoms,
                we will notify the Swedish Authority for Privacy Protection (IMY) within
                72 hours and inform you without undue delay, as required by GDPR Articles
                33 and 34.
              </p>
            </Clause>

            <Clause number={10} title="Your Rights Under the GDPR">
              <p>
                As a data subject, you have the following rights under the GDPR. You may
                exercise any of these by contacting us at <EmailLink />:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right of access</strong> (Art. 15): Obtain a copy of the personal data we hold about you</li>
                <li><strong>Right to rectification</strong> (Art. 16): Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to erasure</strong> (Art. 17): Request deletion of your personal data ("right to be forgotten"), subject to legal retention obligations</li>
                <li><strong>Right to restriction</strong> (Art. 18): Request that we restrict processing of your data in certain circumstances</li>
                <li><strong>Right to data portability</strong> (Art. 20): Receive your data in a structured, machine-readable format and transfer it to another controller</li>
                <li><strong>Right to object</strong> (Art. 21): Object to processing based on legitimate interests, including direct marketing</li>
                <li><strong>Right to withdraw consent</strong> (Art. 7(3)): Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing</li>
                <li><strong>Right to lodge a complaint</strong>: You have the right to complain to a supervisory authority — in Sweden, this is the <strong>Integritetsskyddsmyndigheten (IMY)</strong> at <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-[var(--jwm-purple-600)] hover:text-[var(--jwm-purple-800)] underline underline-offset-2">imy.se</a></li>
              </ul>
              <p>
                We will respond to data subject access requests (DSARs) within 30 days. If
                a request is complex or we receive a high volume, we may extend this by up
                to 60 additional days with notice.
              </p>
            </Clause>

            <Clause number={11} title="Children's Privacy">
              <p>
                Our services are not directed at children under 16 years of age. We do not
                knowingly collect personal data from anyone under 16. If you believe we have
                inadvertently collected such data, please contact us immediately at{" "}
                <EmailLink /> and we will delete it promptly.
              </p>
            </Clause>

            <Clause number={12} title="Changes to This Policy">
              <p>
                This Privacy Policy may be updated from time to time to reflect changes in
                our practices, technology, legal requirements, or regulatory guidance.
                Significant changes will be communicated by email and/or through the member
                portal at least 30 days before they take effect.
              </p>
              <p>
                The "Last updated" date at the top of this page indicates the most recent
                revision. We encourage you to review this policy periodically.
              </p>
            </Clause>

            <Clause number={13} title="Questions?">
              <p>
                If you have any questions or concerns about your privacy or this policy,
                contact Mia at <EmailLink />. We are committed to resolving any concerns
                promptly and transparently.
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

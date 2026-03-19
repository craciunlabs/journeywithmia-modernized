# Journey with Mia — Modernized

A premium, mobile-first landing site for [Journey with Mia](https://start.journeywithmia.com), Mia Ottosson's spiritual mediumship development membership. This standalone repo is a complete redesign of the original `craciunlabs/journeywithmia` frontend, built for easy deployment on Vercel.

**Live preview:** [journeywithmia-modernized.vercel.app](https://journeywithmia-modernized.vercel.app/)

---

## Tech Stack

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Framework     | React 19 + TypeScript                            |
| Bundler       | Vite 7                                           |
| Styling       | Tailwind CSS 3 + CSS custom properties           |
| UI primitives | Radix UI (Accordion, Dialog)                     |
| Icons         | Lucide React                                     |
| Routing       | React Router 7                                   |
| Fonts         | Inter (body) + Playfair Display (headings) — Google Fonts |

**No backend dependencies.** Supabase, Stripe, and analytics are stubbed out and ready for wiring. The site builds to a static bundle that can be served anywhere.

---

## Quick Start

```bash
# Clone
git clone https://github.com/craciunlabs/journeywithmia-modernized.git
cd journeywithmia-modernized

# Install
npm install

# Dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. No environment variables needed for the static version

---

## Pages & Routes

| Route              | Page              | Description                                      |
| ------------------ | ----------------- | ------------------------------------------------ |
| `/`                | Index             | Main landing page — hero, social proof, pricing, FAQ |
| `/try-for-free`    | TryForFree        | Free session registration — session picker + inline form |
| `/schedule`        | Schedule          | Full upcoming session calendar grouped by month  |
| `/terms`           | TermsAndPrivacy   | Terms of Service (nav pills to switch sections)  |
| `/privacy`         | TermsAndPrivacy   | Privacy Policy (shared page, different default tab) |
| `/yearly-benefits` | YearlyBenefits    | Yearly membership benefits + savings breakdown   |
| `/private-sittings`| PrivateSittings   | Private sittings info + booking form (stubbed)   |
| `/checkout-success`| CheckoutSuccess   | Post-payment confirmation with next steps        |
| `*`                | NotFound          | Branded 404 page with navigation options         |

---

## Project Structure

```
src/
├── pages/
│   ├── Index.tsx                 # Main landing page
│   ├── TryForFree.tsx            # Free trial registration page
│   ├── Schedule.tsx              # Full schedule page
│   ├── TermsAndPrivacy.tsx       # Terms & Privacy (nav pills, numbered clauses)
│   ├── YearlyBenefits.tsx        # Yearly benefits with service cards + savings
│   ├── PrivateSittings.tsx       # Private sittings info + booking form (stub)
│   ├── CheckoutSuccess.tsx       # Post-payment welcome with next steps
│   └── NotFound.tsx              # Branded 404 page
│
├── components/
│   ├── Header.tsx                # Sticky header with nav + CTA buttons
│   ├── Footer.tsx                # Site footer with links + social
│   ├── HeroSection.tsx           # Hero with image, CTA, rotating testimonial
│   ├── RotatingTestimonial.tsx   # Shared testimonial carousel (crossfade)
│   ├── TrustBadges.tsx           # Mobile-only trust badges
│   ├── CountdownSection.tsx      # Next session countdown timer
│   ├── ProblemSection.tsx        # "Do you feel this?" collapsible section
│   ├── HowItWorksSection.tsx     # 3-step visual flow
│   ├── BenefitsSection.tsx       # Membership benefits grid
│   ├── TransformationGrid.tsx    # Before/after transformation cards
│   ├── MainTestimonialGrid.tsx   # Full testimonial grid (6 members)
│   ├── PromoVideoSection.tsx     # Video section wrapper
│   ├── ModernVideoPlayer.tsx     # Custom 16:9 video player with controls
│   ├── PricingSection.tsx        # Side-by-side monthly/yearly cards
│   ├── FaqSection.tsx            # Accordion FAQ
│   ├── CtaSection.tsx            # Bottom call-to-action
│   ├── StickyCtaBar.tsx          # Fixed bottom CTA bar
│   ├── MobileAnnouncementBanner.tsx  # Scroll-triggered "Try a free class" banner (mobile)
│   ├── SEO.tsx                   # Meta tags + JSON-LD schema
│   ├── ErrorBoundary.tsx         # React error boundary
│   └── ui/                       # Radix UI primitives (button, dialog, accordion)
│
├── hooks/
│   ├── useUpcomingSessions.ts    # Session data (static stub → wire to API)
│   ├── useStripeCheckout.ts      # Stripe checkout (stub → wire to Stripe)
│   └── use-mobile.tsx            # Mobile breakpoint detection
│
├── utils/
│   ├── analytics.ts              # Analytics event stubs
│   └── sessionDate.ts            # Date formatting helpers
│
├── index.css                     # Global styles + CSS custom properties
├── App.tsx                       # Router setup
└── main.tsx                      # Entry point
```

---

## Design System

### Brand Colors (CSS Custom Properties)

```css
--jwm-purple-50:  #f3eefa    /* Lightest tint */
--jwm-purple-100: #e3d2fa
--jwm-purple-200: #d4c1e9
--jwm-purple-300: #b89cd8
--jwm-purple-400: #9d7fc4
--jwm-purple-500: #7c5caa    /* Primary */
--jwm-purple-600: #6a4c93
--jwm-purple-700: #5b3a82    /* Hero/header gradient */
--jwm-purple-800: #4f3579
--jwm-purple-900: #3d2563    /* Darkest */

--jwm-gold-400:   #f8b400    /* CTA buttons */
--jwm-gold-500:   #e6a800
```

### Typography
- **Headings:** Playfair Display (serif) — loaded via Google Fonts
- **Body:** Inter (sans-serif) — loaded via Google Fonts
- **Touch targets:** 44px minimum on all interactive elements

### Key CSS Classes
- `.gold-button` — Gold CTA button with hover effect
- `.purple-gradient` — Brand purple gradient background
- `.tap-scale` — Scale-down feedback on tap (mobile)
- `.section-padding` — Consistent section spacing

### CSS Variables + Tailwind Caveat

Tailwind opacity modifiers (`bg-[var(--jwm-purple-700)]/95`) do **not** work reliably with CSS custom properties. Use inline styles instead:

```tsx
// ❌ Won't work
<div className="bg-[var(--jwm-purple-700)]/95" />

// ✅ Works
<div style={{ backgroundColor: 'rgba(55, 30, 90, 0.95)' }} />
```

---

## What Was Built (Changelog)

### Session 1 — Foundation
1. **Standalone repo setup** — Extracted from original Lovable-managed repo into clean Vite + React project. No Supabase dependency, no TanStack Query, no Lovable tooling.
2. **Mobile-first landing page** — Complete responsive rewrite of the homepage.

### Session 2 — Component Upgrades
3. **Pricing redesign** — Replaced confusing monthly/yearly toggle with clear side-by-side cards showing both plans at once.
4. **Video modernization** — Replaced square 1:1 player with cinematic 16:9 custom video player with styled controls.

### Session 3 — Landing Page Polish
5. **8 landing page improvements:**
   - Sticky CTA bar (mobile + desktop)
   - Social proof strip in hero
   - "How It Works" 3-step visual section
   - Named transformations with real member stories
   - Collapsible problem section
   - Compact countdown timer with "Full Schedule" link
   - Rich footer with links, social icons, brand tagline
   - Logo spacing and alignment fixes

### Session 4 — QA & Fixes
6. **Multi-device QA** — Tested across 7 device sizes (iPhone SE 320px → Desktop 1600px)
7. **Footer fixes** — Corrected bottom padding for sticky bars, fixed gold-button display conflict on mobile
8. **Terminology** — Changed "gifts" to "talents" (Mia's preferred term)

### Session 5 — Try for Free + Header
9. **Try for Free page** (`/try-for-free`) — Complete new page:
   - Warm purple hero ("Experience a Session — On Me")
   - 3-step visual flow (Pick → Register → Join)
   - Smart session picker (4 shown, expand for more, "Next Up" badge)
   - Inline registration form (no modal popup)
   - Social proof strip + testimonial
   - "What to Expect" FAQ accordion
   - Bottom CTA
10. **Header button modernization** — Replaced 🎁 emoji with Sparkles icon, renamed "Try Free" → "Try a Session"

### Session 6 — Form Enhancement + Schedule + Testimonials
11. **"How did you find us?" field** — Optional dropdown added to the Try for Free registration form (Google, Instagram, Facebook, YouTube, Friend/Family, Other)
12. **Rotating testimonials** — Hero testimonials on homepage and Try for Free page now cycle through 5 member quotes every 5 seconds with smooth crossfade. Random start quote on each visit.
13. **Schedule page** (`/schedule`) — Premium full-page session calendar:
    - Purple gradient hero with auto-detected timezone
    - Quick stats (3x/month, ~90 min, 50+ members)
    - Sessions grouped by month with dividers
    - Session cards with local + Sweden time, guest teacher badges
    - "Ready to Join?" CTA with dual buttons

### Session 7 — Comprehensive QA + Hero Stability
14. **70+ device QA screenshots** — Tested all 3 pages across 14 device/viewport combinations:
    - iPhones: SE (320px), 12 (390px), 13 (390px), 14 Pro Max (430px)
    - Android: Pixel 7 (412px), Galaxy S9 (360px)
    - Tablets: iPad Mini (768px), iPad Air (820px), iPad Pro 11" (834px), iPad Pro 12.9" (1024px)
    - Desktop: 1280px, 1440px, 1920px, 2560px
15. **Mobile announcement banner** — "Try a free class" banner now only appears after scrolling past 500px, preventing it from covering hero content on load.
16. **Hero testimonial stability** — Fixed layout shift caused by rotating testimonials of different lengths. Testimonial container now uses a fixed height (`4.5rem` / `5rem`) with `overflow: hidden` so the hero never bounces.
17. **Hero readability improvements:**
    - Replaced fixed-height hero (`h-[540px]`) with content-driven layout using padding, preventing content clipping
    - Replaced broken Tailwind gradient with inline `linear-gradient` for a stronger, more reliable dark overlay
    - Added `drop-shadow` to hero heading and body text
    - Increased body text opacity from 85% to 90%

### Session 8 — Five New Pages
18. **Terms & Privacy page** (`/terms`, `/privacy`) — Combined legal page with purple hero, nav pills to toggle between Terms of Service and Privacy Policy sections. Clean numbered clauses, readable typography.
19. **Yearly Benefits page** (`/yearly-benefits`) — Showcases yearly membership perks: service cards for each benefit (group sessions, private sittings, recordings, community), yearly savings badge (save 17%), crown-themed hero.
20. **Private Sittings page** (`/private-sittings`) — Information about private 1-on-1 sittings with Mia. Includes sitting type selector (Standard/Extended/Package), inline booking form (stubbed), what-to-expect section, and FAQ.
21. **Checkout Success page** (`/checkout-success`) — Post-payment confirmation with checkmark animation, numbered "What happens next?" steps, CTA buttons for account creation and Facebook community.
22. **404 Not Found page** — Branded 404 with large watermark numeral, friendly copy, and navigation buttons (Homepage, Try a Free Session, View Schedule). Responsive from mobile to desktop.
23. **Route updates** — App.tsx expanded from 3 to 8 routes (plus wildcard 404 catch-all).

### Session 9 — Legal Compliance (March 2026) + Social Links Fix
24. **Terms & Conditions rewrite** — Expanded from 10 to 13 clauses with 2026 best practices:
    - Introductory paragraph identifying data controller (Mia Ottosson, Sweden)
    - Right of Withdrawal (EU Consumers) — 14-day cooling-off, waiver for immediate digital access, EU Directive 2023/2673 withdrawal button reference (effective June 19, 2026)
    - Limitation of Liability — 12-month payment cap, no consequential damages
    - Governing Law & Disputes — Swedish law, EU Online Dispute Resolution link
    - Stripe payment processor disclosure
    - 30-day advance notice for Terms changes
25. **Privacy Policy rewrite** — Expanded from 8 to 13 clauses, fully GDPR Articles 13–14 compliant:
    - Data Controller identification with contact details
    - Lawful Bases table mapping every processing activity to GDPR Art. 6
    - Data Processors table — Stripe, Supabase, Zoom, Vercel with locations
    - International Data Transfers — EU-US DPF, SCCs, adequacy decisions
    - Data Retention schedule with specific timeframes per data type
    - Cookies & Tracking Technologies — categories, consent-first, reject/accept parity
    - Comprehensive GDPR rights (Arts. 15–21) with DSAR response timeline
    - Swedish supervisory authority (IMY) complaint right
    - Children's Privacy (under-16 protection)
    - Breach notification per GDPR Arts. 33–34
26. **Social links corrected** — Instagram updated to `@miaottossonofficial`, YouTube updated to `@JourneyWithMia` in footer (affects all pages).

---

## Stubs to Wire Up

These are ready for backend integration. Each has clear TODO comments in the code. See [MIGRATION.md](./MIGRATION.md) for the complete migration playbook.

### 1. Supabase — Session Data
**File:** `src/hooks/useUpcomingSessions.ts`

Currently returns static session data. Replace with a Supabase query:

```typescript
// Replace the static array with:
const { data, error } = await supabase
  .from('sessions')
  .select('*')
  .gte('datetime_sweden', new Date().toISOString())
  .order('datetime_sweden', { ascending: true });
```

### 2. Supabase — Free Trial Registration
**File:** `src/pages/TryForFree.tsx` (line ~152, `handleSubmit`)

Currently simulates submission with `setTimeout`. Replace with:

```typescript
const { error } = await supabase
  .from('free_trial_registrations')
  .insert({
    name: formData.name,
    email: formData.email,
    how_heard: formData.howHeard,
    session_id: selectedSessionId,
  });
```

### 3. Stripe — Checkout
**File:** `src/hooks/useStripeCheckout.ts`

Currently shows an alert. Replace with Stripe Checkout Session redirect:

```typescript
const { data } = await supabase.functions.invoke('create-checkout-session', {
  body: { plan }
});
window.location.href = data.url;
```

### 4. Analytics
**File:** `src/utils/analytics.ts`

Currently logs to console. Replace with your analytics provider (Plausible, GA4, PostHog, etc.):

```typescript
export const trackCTAClick = (label: string, location: string) => {
  plausible('CTA Click', { props: { label, location } });
};
```

---

## Environment Variables (When Wiring Backend)

Create a `.env` file when connecting Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

---

## Important Notes

- **Original repo untouched** — `craciunlabs/journeywithmia` (main branch) was never modified. This is a clean standalone project.
- **Mia's terminology** — She says "talents", not "gifts". This is reflected throughout the site.
- **Session times** — All sessions are 6:30 PM Sweden time. The site auto-detects visitor timezone and shows both.
- **Member Portal** — Links to `https://start.journeywithmia.com/member-portal` (external, managed by original app).
- **Images** — All assets are in `public/lovable-uploads/`. The hero image, Mia's avatar, and video poster are optimized WebP.
- **Form submission is a stub** — The Try for Free form shows a success screen but does not send emails or write to a database. The production site (`start.journeywithmia.com`) handles actual registrations with Supabase + email notifications.
- **Private Sittings form is a stub** — Booking form on `/private-sittings` shows a success screen but is not wired to any backend.
- **Legal pages are production-ready** — Terms & Privacy content is written for March 2026 compliance (GDPR, EU Consumer Rights Directive, DSA). Have a legal professional review before relying on it as binding legal documentation.
- **Social links** — Instagram: [@miaottossonofficial](https://www.instagram.com/miaottossonofficial/), YouTube: [@JourneyWithMia](https://www.youtube.com/@JourneyWithMia)

---

## Repository

- **GitHub:** [craciunlabs/journeywithmia-modernized](https://github.com/craciunlabs/journeywithmia-modernized)
- **Original:** [craciunlabs/journeywithmia](https://github.com/craciunlabs/journeywithmia) (do not modify)
- **License:** Private

# Migration Guide: Original → Modernized

A complete playbook for migrating from `craciunlabs/journeywithmia` (the Lovable-managed original) to `craciunlabs/journeywithmia-modernized` (the clean standalone redesign).

**Status:** The modernized repo is a full design/UX upgrade with 9 pages built (8 routes + wildcard 404). All public-facing pages have been redesigned, plus new pages for Terms & Privacy (2026-compliant), Yearly Benefits, Private Sittings, and Checkout Success. Backend integrations (Supabase, Stripe, email notifications) are stubbed and ready for wiring. Member-only pages (portal, auth, admin) have not yet been ported.

---

## Table of Contents

1. [Architecture Comparison](#architecture-comparison)
2. [Page-by-Page Migration Map](#page-by-page-migration-map)
3. [What's New in Modernized](#whats-new-in-modernized)
4. [What Needs Porting](#what-needs-porting)
5. [Step-by-Step Migration](#step-by-step-migration)
6. [Supabase Integration](#supabase-integration)
7. [Stripe Integration](#stripe-integration)
8. [Email Notifications](#email-notifications)
9. [Authentication & Member Portal](#authentication--member-portal)
10. [DNS & Domain Cutover](#dns--domain-cutover)

---

## Architecture Comparison

| Aspect | Original (`journeywithmia`) | Modernized (`journeywithmia-modernized`) |
|---|---|---|
| **Built with** | Lovable (AI-managed) | Hand-built React + Vite |
| **Framework** | React 19, Vite, React Router 7 | React 19, Vite 7, React Router 7 |
| **Styling** | Tailwind CSS 3, shadcn/ui (40+ components), tailwindcss-animate | Tailwind CSS 3, CSS custom properties, minimal Radix UI |
| **State/data** | TanStack React Query, Supabase client | Static stubs (ready for Supabase) |
| **Auth** | Supabase Auth (email + password) | Not yet implemented |
| **Payments** | Stripe via Supabase Edge Functions | Stub (alert placeholder) |
| **Forms** | react-hook-form + zod validation | Native React state + HTML validation |
| **Analytics** | Custom events (console stubs) | Custom events (console stubs) |
| **Emails** | Supabase Edge Functions → notification emails | Not connected (stub shows success UI) |
| **UI library** | Full shadcn/ui (40+ Radix primitives) | Minimal (Accordion, Dialog only) |
| **Dependencies** | ~35 production deps | ~12 production deps |
| **Code complexity** | ~150 files, many admin/security modules | ~30 files, focused on public pages |

### Key Simplifications

The modernized version intentionally dropped:
- **TanStack React Query** — replaced with simple hooks returning static data (wire Supabase directly when ready)
- **react-hook-form + zod** — replaced with native React form state + HTML5 validation (simpler, fewer deps)
- **40+ shadcn/ui components** — replaced with 2-3 Radix primitives + custom Tailwind components
- **sonner toast library** — not needed until backend integration
- **Security modules** — `SecurityLogger`, `enhancedRateLimiter`, `securityMonitor`, etc. — not needed for static frontend (add at backend layer)
- **Lovable tooling** — no `.lovable/` config, no auto-generated client file

---

## Page-by-Page Migration Map

### Public Pages (Redesigned ✅)

| Route | Original | Modernized | Status |
|---|---|---|---|
| `/` | `Index.tsx` — Hero, pricing, FAQ, testimonials | `Index.tsx` — Completely redesigned with modern hero, rotating testimonials, video player, "How It Works", transformation grid, improved pricing cards | ✅ Redesigned |
| `/try-for-free` | `TryForFree.tsx` — Multi-step modal registration form, hardcoded session dates | `TryForFree.tsx` — Inline session picker, single-step form, "How did you find us?", FAQ accordion | ✅ Redesigned |
| `/schedule` | `Schedule.tsx` — Basic session list | `Schedule.tsx` — Premium calendar with month grouping, timezone auto-detection, guest teacher badges, countdown stats | ✅ Redesigned |
| `/terms`, `/privacy` | Basic legal pages | `TermsAndPrivacy.tsx` — Combined page with nav pills, 13-clause Terms + 13-clause Privacy Policy, fully GDPR 2026-compliant | ✅ Built (Session 8–9) |
| `/yearly-benefits` | Yearly plan benefits page | `YearlyBenefits.tsx` — Service cards, savings badge, crown hero | ✅ Built (Session 8) |
| `/private-sittings` | Private sitting bookings | `PrivateSittings.tsx` — Sitting type selector, booking form (stubbed), important info | ✅ Built (Session 8) |
| `/checkout-success` | Post-Stripe-checkout confirmation | `CheckoutSuccess.tsx` — Checkmark animation, numbered next steps, CTA buttons | ✅ Built (Session 8) |
| `*` (404) | N/A | `NotFound.tsx` — Branded 404 with navigation options | ✅ Built (Session 8) |

### Member/Auth Pages (Not Yet Ported)

| Route | Original | Modernized | Priority |
|---|---|---|---|
| `/member-portal` | Full member dashboard — schedule, recordings, invitations, account status, admin panel | Not ported | High — port when wiring Supabase |
| `/reset-password` | Password reset flow via Supabase Auth | Not ported | High — needed for auth |
| `/invite/:token` | Member invitation acceptance page | Not ported | Medium |
| `/session-recordings` | Session recording access (member-only) | Not ported | Medium |

### Admin Pages (Not Yet Ported)

| Route | Original | Notes |
|---|---|---|
| `/admin/subscriptions` | Subscription management | Admin-only, port last |
| `/members109881` | Hidden member management page | Admin-only |
| `/yearly71994` | Hidden yearly plan page | Admin-only |
| `/test-checkout-mia9k2` | Stripe test checkout | Dev tool |
| `/prep-materials-xk9m` | Course video management | Admin-only |
| `/recorded-courses-admin-xk2p` | Recorded courses admin | Admin-only |
| `/mia-ai` | Mia AI chat interface | Separate feature |
| `/private-sittings` | Private sitting bookings | Separate feature |

---

## What's New in Modernized

These features exist only in the modernized repo and were not in the original:

1. **Rotating hero testimonials** — 5 member quotes auto-cycling every 5s with smooth crossfade (homepage + Try for Free page)
2. **Fixed-height testimonial containers** — Prevents layout shift when quotes of different lengths rotate
3. **Modern video player** — 16:9 cinematic ratio with custom play/pause/mute controls (original was 1:1 square)
4. **Side-by-side pricing** — Monthly and yearly shown simultaneously (original used a confusing toggle)
5. **"How It Works" section** — 3-step visual flow explaining the membership
6. **Transformation grid** — Before/after cards with real member stories
7. **Collapsible problem section** — "Do you feel this?" expandable content
8. **Sticky CTA bar** — Fixed bottom bar on all devices
9. **Scroll-triggered announcement banner** — "Try a free class" only appears after 500px scroll
10. **"How did you find us?" field** — Source attribution on the registration form
11. **Session picker UX** — Visual date blocks with "Next Up" badge, local + Sweden time display
12. **Content-driven hero layout** — No fixed heights, hero grows with content, drop-shadow text for readability
13. **CSS custom properties** — Full brand color system (`--jwm-purple-50` through `--jwm-purple-900`, `--jwm-gold-400/500`)
14. **SEO component** — Structured JSON-LD schema on every page
15. **GDPR 2026-compliant Terms & Privacy** — 13-clause Terms (with EU withdrawal rights, limitation of liability, governing law) + 13-clause Privacy Policy (lawful bases table, data processors table, retention schedule, international transfers, cookie policy, DSAR process, IMY complaint right, children's privacy)
16. **Yearly Benefits page** — Service cards with pricing, 10% discount badge, "Coming Soon" placeholders for future services
17. **Private Sittings page** — Sitting type selector (Evidential Mediumship / Spiritual Assessment), pricing badge, booking info, cancellation policy
18. **Checkout Success page** — Post-payment welcome flow with numbered next steps
19. **Branded 404 page** — Large watermark numeral, friendly copy, navigation buttons

---

## What Needs Porting

Before the modernized repo can fully replace the original, these need to be wired up:

### Critical (Must-Have for Launch)

- [ ] **Supabase client** — Install `@supabase/supabase-js`, configure with env vars
- [ ] **Session data API** — Replace static array in `useUpcomingSessions.ts` with Supabase query
- [ ] **Try for Free form submission** — Wire `handleSubmit` in `TryForFree.tsx` to insert into Supabase + trigger notification emails
- [ ] **Stripe checkout** — Wire `useStripeCheckout.ts` to call Supabase Edge Function
- [ ] **Email notifications** — Ensure Supabase Edge Functions send registration emails to admin + confirmation to client
- [ ] **Member portal** — Port `/member-portal` with dashboard, schedule, recordings, account management

### Important (Soon After Launch)

- [ ] **Authentication** — Port Supabase Auth (email/password login, signup, reset)
- [ ] **Invitation system** — Port `/invite/:token` and member invitation components
- [ ] **Analytics** — Replace console stubs with real provider (Plausible recommended)
- [ ] **Cookie consent banner** — Implement CMP with prior-blocking for non-essential cookies (referenced in Privacy Policy)
- [ ] **Wire Private Sittings form** — Connect `/private-sittings` booking form to Stripe + email notification

### Nice to Have (Later)

- [ ] Admin dashboard pages
- [ ] Session recordings access
- [ ] Recorded courses
- [ ] Mia AI chat

### Already Done ✅

- [x] Checkout success page (`/checkout-success`) — Session 8
- [x] Legal pages (`/terms`, `/privacy`) — Session 8, updated to 2026 compliance in Session 9
- [x] Yearly benefits page (`/yearly-benefits`) — Session 8
- [x] Private sittings page (`/private-sittings`) — Session 8 (form stubbed)
- [x] 404 page — Session 8

---

## Step-by-Step Migration

### Phase 1: Wire Supabase (No Downtime)

This can be done while the original site is still live. No DNS changes needed.

```bash
cd journeywithmia-modernized

# 1. Install Supabase client
npm install @supabase/supabase-js

# 2. Create the client file
mkdir -p src/integrations/supabase
```

Create `src/integrations/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

Create `.env`:
```env
VITE_SUPABASE_URL=https://wjhqauxjaxywafbiuxik.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Phase 2: Wire Session Data

Replace the static array in `src/hooks/useUpcomingSessions.ts`:

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useUpcomingSessions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')
        .gte('datetime_sweden', new Date().toISOString())
        .order('datetime_sweden', { ascending: true });

      if (!error && sessions) setData(sessions);
      setLoading(false);
    }
    fetch();
  }, []);

  return { data, loading };
}
```

### Phase 3: Wire Form Submission

In `src/pages/TryForFree.tsx`, replace the `handleSubmit` function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  trackCTAClick("Register Free Session", "try-for-free");

  try {
    // Insert registration into Supabase
    const { error } = await supabase
      .from('free_trial_registrations')
      .insert({
        name: formData.name,
        email: formData.email,
        how_heard: formData.howHeard || null,
        session_id: selectedSessionId,
      });

    if (error) throw error;

    setFormSubmitted(true);
    setFormData({ name: "", email: "", howHeard: "" });
  } catch (err) {
    console.error('Registration failed:', err);
    // Add error toast or inline error message here
  } finally {
    setIsSubmitting(false);
  }
};
```

> **Note:** The original repo uses a Supabase Edge Function that sends email notifications to the admin (`mia@start.journeywithmia.com`) and a confirmation email to the client. Make sure those Edge Functions remain active — they trigger on database inserts.

### Phase 4: Wire Stripe

In `src/hooks/useStripeCheckout.ts`:

```typescript
import { supabase } from '@/integrations/supabase/client';

export function useStripeCheckout() {
  const checkout = async (plan: 'monthly' | 'yearly') => {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { plan }
    });

    if (error) {
      console.error('Checkout error:', error);
      return;
    }

    window.location.href = data.url;
  };

  return { checkout };
}
```

### Phase 5: Port Member Portal

This is the largest piece. The original member portal includes:

- **Dashboard layout** (`DashboardLayout.tsx`, `DashboardHeader.tsx`)
- **Account status** — Subscription tier, renewal date, trial status
- **Session schedule** — Upcoming sessions with Zoom links
- **Session recordings** — Video playback for past sessions
- **Invitations** — Invite friends, track invitation status
- **Admin panel** — Subscription management, trial debugging, email actions

Recommended approach:
1. Copy the `components/member/` directory from the original
2. Copy the auth hooks (`hooks/auth/`)
3. Copy the member data hooks (`hooks/member/`, `pages/hooks/`)
4. Adapt imports from shadcn/ui to either port the needed primitives or replace with Tailwind equivalents
5. Add the `/member-portal` route to `App.tsx`

### Phase 6: DNS Cutover

Once all critical features are wired and tested:

1. Deploy modernized repo to Vercel with custom domain
2. Update DNS for `start.journeywithmia.com` to point to the new Vercel deployment
3. Keep the original repo's Vercel deployment alive temporarily as a rollback
4. Monitor for 1-2 weeks, then decommission the original deployment

---

## Supabase Integration

### Tables Used by the Original

Based on the original codebase, these Supabase tables are referenced:

| Table | Used By | Purpose |
|---|---|---|
| `sessions` | Session picker, schedule, countdown | Upcoming session dates/times |
| `free_trial_registrations` | Try for Free form | Trial registration records |
| `profiles` | Member portal | User profile data |
| `subscriptions` | Pricing, member dashboard | Subscription status |
| `session_recordings` | Member recordings page | Video recording links |
| `invitations` | Member invite system | Invitation tokens + status |

### Edge Functions

The original uses Supabase Edge Functions for:
- `create-checkout-session` — Creates Stripe checkout sessions
- Email notifications on new trial registrations (admin + client confirmation)
- Subscription status management
- Invitation email sending

These Edge Functions live in the Supabase project and are **not** in the Git repo. They will continue to work once the modernized frontend connects to the same Supabase project.

---

## Stripe Integration

The original uses Stripe for membership payments:

| Plan | Price | Stripe Price ID |
|---|---|---|
| Monthly | €35/month | Set in Supabase Edge Function |
| Yearly | €20/month (€240/year) | Set in Supabase Edge Function |

The checkout flow is:
1. User clicks "Join" on pricing card
2. Frontend calls Supabase Edge Function `create-checkout-session`
3. Edge Function creates a Stripe Checkout Session
4. User is redirected to Stripe's hosted checkout page
5. After payment, Stripe redirects to `/checkout-success`
6. Stripe webhook updates the Supabase `subscriptions` table

No changes needed on the Stripe or Supabase side — just wire the frontend.

---

## Email Notifications

The original site sends these emails:

| Trigger | Recipient | Content |
|---|---|---|
| New trial registration | Admin (Mia) | Name, email, session, source, "Add to Zoom" action |
| New trial registration | Client | Confirmation + "Zoom link within 24h" |
| Subscription created | Client | Welcome + access details |
| Subscription cancelled | Admin | Cancellation notice |

These are handled by Supabase Edge Functions triggered by database events. They will work automatically once the modernized frontend writes to the same Supabase tables.

---

## Authentication & Member Portal

The original uses Supabase Auth with:
- Email + password signup/login
- Password reset via email
- Session-based auth with JWT tokens
- Email whitelist for admin access
- Security monitoring (rate limiting, suspicious activity detection)

For the modernized repo, the recommended approach is:
1. Install `@supabase/supabase-js` (same client handles auth)
2. Port the `SecureAuthComponent.tsx` from the original (or build a simpler version)
3. Add protected route wrapper for `/member-portal`
4. Port member dashboard components

---

## DNS & Domain Cutover

### Current Setup
- **Domain:** `start.journeywithmia.com`
- **Hosted on:** Vercel (original repo)
- **Supabase project:** `wjhqauxjaxywafbiuxik.supabase.co`

### Migration Steps
1. Add `start.journeywithmia.com` as a custom domain in the modernized repo's Vercel project
2. Update Vercel DNS settings to point the domain to the new project
3. Vercel handles SSL automatically
4. No Supabase changes needed — same project, same database

### Rollback Plan
Keep the original Vercel deployment running for 2 weeks after cutover. If issues arise:
1. Revert DNS back to the original Vercel project
2. Takes effect in minutes (Vercel DNS propagation is fast)

---

## File Mapping Reference

Quick reference for finding where original functionality lives in the modernized repo:

| Original File | Modernized Equivalent | Notes |
|---|---|---|
| `integrations/supabase/client.ts` | Not yet created | Create when wiring |
| `hooks/useUpcomingSessions.ts` | `hooks/useUpcomingSessions.ts` | Static stub → wire to Supabase |
| `hooks/useStripeCheckout.ts` | `hooks/useStripeCheckout.ts` | Alert stub → wire to Stripe |
| `components/MultiStepRegistrationForm.tsx` | Inline in `pages/TryForFree.tsx` | Simplified from multi-step to single form |
| `components/HeroSection.tsx` | `components/HeroSection.tsx` | Complete redesign with rotating testimonials |
| `components/PricingSection.tsx` | `components/PricingSection.tsx` | Redesigned as side-by-side cards |
| `components/VideoPlayer.tsx` | `components/ModernVideoPlayer.tsx` | 16:9 cinematic player |
| `components/Header.tsx` | `components/Header.tsx` | Modernized with Sparkles icon |
| `components/Footer.tsx` | `components/Footer.tsx` | Rich footer with social + tagline |
| `utils/analytics.ts` | `utils/analytics.ts` | Same pattern, console stubs |
| `components/admin/*` | Not ported | Admin-only, port last |
| `components/auth/*` | Not ported | Port with member portal |
| `components/member/*` | Not ported | Port with member portal |

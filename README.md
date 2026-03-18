# Journey with Mia — Modernized Landing Page

Mobile-first redesign of the Journey with Mia landing page. Standalone, Vercel-ready.

## Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

That's it. No environment variables needed for the landing page.

## What's Included

- **Full index landing page** with all sections (Hero, Countdown, Benefits, Testimonials, Pricing, FAQ, etc.)
- **Mobile-first design** — full-bleed hero, snap carousels, 44px touch targets, hamburger nav
- **Static session data** — no Supabase dependency. Edit `src/hooks/useUpcomingSessions.ts` to update dates
- **Stripe stub** — checkout buttons log to console. Wire up your Stripe when ready

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- Radix UI (Accordion, Dialog)
- Lucide Icons
- React Router 7

## Wiring Up the Backend

### Sessions (Supabase)
Replace `src/hooks/useUpcomingSessions.ts` with a real Supabase query. The hook just needs to return `{ data: Session[], isLoading, error }`.

### Payments (Stripe)
Replace `src/hooks/useStripeCheckout.ts` with your Stripe checkout session creation flow.

### Analytics
Replace `src/utils/analytics.ts` stubs with your analytics provider (GA4, Plausible, etc.).

## Dev

```bash
npm install
npm run dev     # → http://localhost:5173
npm run build   # → dist/
```

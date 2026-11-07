# معاون — Moawen Landing Page

Official landing page for **Moawen (معاون)** — the platform connecting clients
and freelance specialists across the Arab world.
Built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 +
motion**.

## Quick start

```bash
npm install
cp .env.example .env      # fill in real values (never commit .env)
npm run dev               # development
npm run build             # production build
npm run start             # production server
npm run lint              # ESLint
npm run typecheck         # TypeScript
npm run db:push           # sync Drizzle schema to PostgreSQL
```

## Environment variables

See `.env.example`. Highlights:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL (contact messages + optional legal-doc CMS) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata, sitemap, robots |
| `ADMIN_SECRET` | **Required** for the `/admin` console — no default, fails closed |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Server-side contact-email delivery |
| `RESEND_API_KEY` / `RESEND_FROM` | Alternative contact-email delivery |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics |

## Official contact email

The **only** official contact address is **support@moawen.sa**.

- Every visible email link uses `mailto:support@moawen.sa`
  (contact section + footer).
- Every contact-form submission is delivered to `support@moawen.sa` through a
  server-side provider (SMTP or Resend). The recipient is hardcoded in
  `src/lib/mailer.ts` and can never be overridden by visitors.
- Success feedback is shown **only** after the provider accepts the message;
  otherwise the API responds 502/503 and the UI shows an honest error.
- Spam protection: honeypot field, per-IP rate limiting (5 messages / 10 min),
  server-side validation with length caps and header-injection sanitization.

## Launch announcement popups (informational only)

The "coming soon" dialogs (app launch + service categories) are **strictly
informational**: they announce that the Moawen customer & service-provider
apps are coming soon to Google Play and the App Store. They collect **no**
data — no inputs, no waitlist, no newsletter, no tracking of personal details.
Store names appear as plain labels (never as download links) until the real
store listings exist.

## Accessibility & performance notes

- Dialogs trap focus, restore focus on close, lock background scroll, close
  with Escape, and are wired with `aria-modal` / `aria-labelledby`.
- Auto-playing slider respects `prefers-reduced-motion` and pauses in hidden
  tabs; the custom cursor is disabled under reduced motion.
- App screenshots ship as optimized WebP (~55–75 KB each) instead of the
  original SVGs (up to 11.3 MB each). The hero center screen loads eager with
  `fetchpriority=high`; slider screens are lazy.
- Full metadata: canonical URLs, Open Graph + Twitter cards with a branded
  OG image, JSON-LD (`Organization`, `WebSite`, `WebPage`, `FAQPage`).

## Legal pages (temporary static mode)

`/privacy` and `/terms` are currently **decoupled from the database** and
render the built-in documents in `src/db/seed.ts`
(`DEFAULT_PRIVACY_DOC` / `DEFAULT_TERMS_DOC`) — the admin dashboard that will
manage them is not finished yet.

➜ **To restore the live admin binding later:** flip
`LEGAL_DB_SYNC_ENABLED` to `true` in `src/db/seed.ts`. No other file needs
to change; the DB read/write path (seed + `PUT /api/legal/[slug]`) is kept
fully intact behind the flag.

## Admin console (`/admin`)

A small CMS for legal documents + incoming contact messages. Authorization
requires the `ADMIN_SECRET` environment variable — there is no default value
and no key hint on the page; without the variable the API fails closed
(HTTP 503). Login attempts are rate-limited. The console is `noindex` and
disallowed in `robots.txt`.

## Structure

```
src/
├── app/            # layout, page, globals.css (design system), API routes, SEO
├── components/
│   ├── sections/   # Hero, Audience, TwoWays, Categories, ProductExperience, …
│   ├── shared/     # PhoneMockup, StoreButtons, info modals, custom cursor
│   ├── core/       # Dialog (accessible), TextEffect, InView helpers
│   └── legal/      # Legal document view
├── config/         # mockups & brand assets (optimized WebP screens)
├── context/        # AppPreferences (theme / locale / modals)
├── i18n/           # dictionary.ts (ar + en)
├── lib/            # mailer (support@moawen.sa), rate limiter, admin auth
└── db/             # Drizzle schema, static legal seed
```

# Danika Plumbing & Electric: Website Redesign

A fast, accessible, mobile-first homepage redesign for **Danika Plumbing & Electric**, a licensed plumbing and electrical contractor in Everett, WA serving Snohomish County and North King County since 2009.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)

> **Headline:** *Powering Your Home. Keeping Things Flowing.*
> Your trusted local experts for dependable plumbing and electrical services in Everett, WA.

---

## Table of contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Getting started](#getting-started)
5. [Scripts](#scripts)
6. [Environment variables](#environment-variables)
7. [Project structure](#project-structure)
8. [Content and data](#content-and-data)
9. [Images](#images)
10. [Lead form and help widget](#lead-form-and-help-widget)
11. [Design system](#design-system)
12. [SEO and structured data](#seo-and-structured-data)
13. [Accessibility and performance](#accessibility-and-performance)
14. [Deployment](#deployment)
15. [Pre-launch checklist](#pre-launch-checklist)
16. [Changelog](#changelog)

---

## Overview

This project redesigns the homepage of [danikaplumbing.com](https://danikaplumbing.com/). It presents plumbing and electrical services as equal, one-call offerings and keeps phone and quote actions within reach on every screen size.

Scope: **homepage only.** Service, blog and other inner-page links point to the existing pages on the original site. Every business fact (phone, address, licence, services, reviews, projects, FAQs, service cities) comes from the live site and is kept in `src/data/`.

## Features

- **Homepage sections:** hero with Plumbing and Electrical entry points, trust bar, "What's going on at your place?" problem cards, services showcase (*Plumbing and Electrical, One Call*), why choose us, projects, about, testimonials, 25 service areas, FAQ and final call to action.
- **Testimonials:** one review at a time with auto-rotation. It pauses on hover or focus, supports arrow, Home and End keys, and honours reduced-motion settings. Reviews are shown **anonymously**: tabs are labelled by job type, not customer name.
- **Contact popup and "Need help?" widget:** quote, schedule, callback, message and call actions in one place.
- **Sticky mobile call bar** and click-to-call buttons throughout.
- **Honest imagery:** non-company photos carry an "Illustrative image · not a Danika project" badge, and a branded placeholder appears if an image file is missing, so there are no broken images.
- **SEO:** metadata, Open Graph image, `sitemap.xml`, `robots.txt` and LocalBusiness JSON-LD.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS 3 |
| Icons | Lucide React |
| Fonts | Bricolage Grotesque and Inter, self-hosted through Fontsource |
| Images | `next/image`, `sharp` for optimisation scripts |

## Getting started

**Requirements:** Node.js 18.18 or newer (20 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run Next.js linting |
| `npm run typecheck` | Run the TypeScript compiler with no output |
| `npm run images:fetch` | Download original-site photos into `public/images/` for self-hosting |
| `npm run images:stock` | Crop and optimise originals from `assets/stock-originals/` into `public/images/stock/` |

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, Open Graph, sitemap and JSON-LD. Keep `https://danikaplumbing.com` if this replaces the current site. |
| `NEXT_PUBLIC_LOCAL_IMAGES` | Set to `1` after `npm run images:fetch` to serve self-hosted images instead of loading them from the original site. |
| `LEAD_WEBHOOK_URL` | Endpoint that receives quote requests as JSON (CRM, Zapier or Make, Formspree, email service). |

## Project structure

```
src/
  app/              layout (metadata), page, sitemap.ts, robots.ts, icons, globals.css
    api/lead/       form endpoint (POST)
  components/       Header, MobileNavigation, Hero, TrustBar, ProblemCards, ServiceCards,
                    Statement, WhyChooseUs, AboutSection, ProjectsSection, Testimonials,
                    ServiceAreas, FAQ, QuoteForm, FinalCTA, Footer, MobileCallBar, JsonLd,
                    StockImage, CarouselControls, ui/, help/
  data/             site, nav, services, reviews, projects, faqs, areas, images.json, stock.json
  lib/              utils, brand, validation, images
public/
  brand/            logos (transparent PNG)
  images/stock/     optimised illustrative images (webp)
  og.png            social share image
assets/stock-originals/   source files for stock images
scripts/                  image fetch and optimise scripts
tailwind.config.ts        design tokens
```

## Content and data

All copy and facts live in `src/data/`, so most edits need no component changes.

| File | Contents |
|---|---|
| `site.ts` | Name, phone, address, licence, founding year, social links, rating |
| `services.ts` | Plumbing and electrical services, problem cards, process steps |
| `reviews.ts` | Customer reviews (job, date, text; no names) |
| `projects.ts` | Genuine, dated project photos |
| `faqs.ts`, `areas.ts`, `nav.ts` | FAQ, service cities, navigation |

**Home page hero copy** is in `src/components/Hero.tsx`.

**Reviews** are genuine Google reviews as posted, with light punctuation tidy-up and ellipses where trimmed. Customer names are intentionally not stored or shown. To add a review, append `{ date, job, text }` to `src/data/reviews.ts`.

## Images

- **Company photos** (water heater, drain cleaning, van and project photos) load from danikaplumbing.com by default. For production, run `npm run images:fetch` and set `NEXT_PUBLIC_LOCAL_IMAGES=1`.
- **Illustrative images** use the `StockImage` component and slots in `src/data/stock.json`:

  | Slot | Used in |
  |---|---|
  | `plumberUnderSink` | Plumbing band, *Plumbing and Electrical, One Call* |
  | `electricianWiring` | Electrical band, *Plumbing and Electrical, One Call* |
  | `electricalPanel` | Spare electrical image (breaker panel) |

  Each slot defines its file, alt text, `label` and optional `credit`. The badge text is generated from these fields. To replace an image, drop a new file in `public/images/stock/` (or run `npm run images:stock`) and update the slot.
- **Never** use illustrative images in the Projects section. That section is reserved for genuine Danika jobs.
- See `STOCK_IMAGES.md` for sourcing and licensing guidance.

## Lead form and help widget

Every contact, quote and schedule button opens one popup form (`src/components/help/HelpProvider.tsx`). The floating **Need help?** button (`HelpWidget.tsx`) offers: Start Quote Online, Schedule Service, Request a Call, Call Contractor and Message Us.

- Request types: `help | quote | schedule | callback | message`, validated in `src/lib/validation.ts`.
- `POST /api/lead` validates input, applies a honeypot field, then forwards JSON (`type`, `source`, optional preferred date and time) to `LEAD_WEBHOOK_URL`.
- Responses: `200` delivered, `422` validation errors, `502` delivery failed, `503` webhook not configured. When delivery isn't possible the UI says so and shows the phone number, so a request is never silently dropped.

## Design system

Brand colours are CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`.

| Token | Value | Use |
|---|---|---|
| `brand-700` | `#920009` | Primary red: header, key bands, headings on light backgrounds, primary buttons |
| `brand-800` | `#6F0007` | Deep burgundy: footer, top bar, hover/pressed states |
| `brand-500` | `#B5121B` | Secondary red: accents, lighter dividers on red, focus ring on light surfaces |
| `brand-50` / `paper` | `#FCEEEF` | Soft blush section background |
| `line` | `#E8C9CC` | Subtle borders |
| `ink` | `#292323` | Charcoal: text and image overlays only |

Yellow is not a UI colour: it appears only inside the logo artwork. Alternate white, blush and red bands; use the `light` button variant on red/photo surfaces and `primary` on light ones (see `src/components/ui/Button.tsx`).

Measured contrast for the main text/background pairs is at least 6.7:1 (WCAG AA needs 4.5:1 for body text). Logos are in `public/brand/`; favicons in `src/app/icon.png` and `apple-icon.png`.

## SEO and structured data

- Per-page metadata and canonical URL from `NEXT_PUBLIC_SITE_URL`.
- `sitemap.xml` and `robots.txt` generated in `src/app/`.
- LocalBusiness JSON-LD in `JsonLd.tsx`. It deliberately omits `aggregateRating`, opening hours and `priceRange` until the business confirms them.
- Add a Google Search Console verification tag in `layout.tsx` metadata.

## Accessibility and performance

- Skip link, keyboard-operable menus (Esc closes), ARIA tabs and accordion, labelled form fields with inline errors.
- `prefers-reduced-motion` respected and 44px minimum touch targets.
- Content is visible without JavaScript.
- Self-hosted fonts; only the hero image is prioritised and everything else lazy-loads.
- About 118 kB first-load JavaScript. Run Lighthouse on the deployed URL to confirm Core Web Vitals with final images.

## Deployment

**Vercel (recommended)**
1. Push the repository to GitHub.
2. In Vercel choose **Add New Project** and import the repo (Next.js is auto-detected).
3. Add the variables from `.env.example`.
4. Deploy, attach the domain, and submit `/sitemap.xml` to Search Console.

Any Node host that supports Next.js (`npm run build && npm start`) also works.

## Pre-launch checklist

- [ ] Set `LEAD_WEBHOOK_URL` and test every form type end to end.
- [ ] Add CAPTCHA (for example Cloudflare Turnstile) and rate limiting to `/api/lead`.
- [ ] Run `npm run images:fetch` and set `NEXT_PUBLIC_LOCAL_IMAGES=1`.
- [ ] Replace illustrative plumbing and electrical images with real Danika photos when available.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Confirm copy decisions: "Request a Quote" is used because the original site does not state that quotes are free.
- [ ] Confirm the displayed rating (4.7, 690+ Google reviews) and the review text, which still mentions some staff first names.
- [ ] Add Search Console verification and submit the sitemap.
- [ ] Run Lighthouse and an accessibility audit on the live URL.

## Changelog

**v4**
- Reviews now display without customer names; tabs are labelled by job type.
- New plumbing and electrical images in the *Plumbing and Electrical, One Call* section.
- New hero headline and intro: *Powering Your Home. Keeping Things Flowing.*
- `StockImage` accepts a `position` prop to control cropping.

---

Business details: Danika Plumbing & Electric, 11015 Airport Road, Everett, WA 98204 · (425) 374-1557 · WA licence DANIKPL839PF.

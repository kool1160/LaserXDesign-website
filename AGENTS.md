# LaserX Design Website — Repository Instructions

## Source of truth

This GitHub repository and its `main` branch are the authoritative source for the LaserX Design website. Do not claim a change exists unless it is committed here.

## Product direction

Build a fast, modern, mobile-first industrial website for LaserX Design in Muskegon, Michigan. The site should present custom welding, CNC plasma cutting, fabrication, fixtures, prototypes, and practical metal design work.

## Technology

- Astro
- TypeScript in strict mode
- Static output for Cloudflare Pages
- Semantic HTML and accessible interactions
- Minimal client-side JavaScript

## Brand foundation

- Deep navy: `#142131`
- Steel blue: `#3A6E8C`
- Ice blue: `#67B8DC`
- Near black: `#0B131D`
- White: `#F7F9FB`

## Rules

1. Preserve user-provided project photos. Never regenerate, alter, or replace them without explicit permission.
2. Do not publish personal phone numbers or a home street address without explicit approval.
3. Do not invent certifications, capabilities, testimonials, customer names, project results, or service guarantees.
4. Keep copy direct, industrial, and grounded in actual LaserX Design work.
5. Optimize images before production use and include meaningful alt text.
6. Validate desktop and mobile layouts before merging substantial changes.
7. Keep Cloudflare deployment configuration documented and reproducible.

## Required checks

Run before production changes are merged:

```bash
npm ci
npm run check
npm run build
```

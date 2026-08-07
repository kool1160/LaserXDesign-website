# LaserX Design Studio website rebuild

## Direction

LaserX Design Studio is the primary public product. LaserX Design is the parent identity and fabrication/engineering credibility behind it.

Primary positioning:

> From idea to cut-ready design.

Primary distinction:

> LaserX creates the product. Your machine software cuts it.

## Source of truth

Public claims must stay grounded in the live `kool1160/LaserXdesign-Studio` repository, especially:

1. `README.md`
2. `docs/PRODUCT_REQUIREMENTS.md`
3. Issue #44
4. Issue #37
5. `docs/status/CURRENT.md`
6. completed milestone evidence for any feature shown as current

## Release state

Website release state starts at `development` in `src/config/product.ts`.

Do not publish Download, Buy, Trial, public pricing, signing, or public-availability claims until the product repository authorizes them.

## G0 / G1 first review slice

This branch intentionally starts with one reviewable slice:

- product-first navigation;
- release-state-aware CTA configuration;
- software-first metadata and schema;
- a complete new homepage story;
- prominent manufacturing-repair and physical-3D sections;
- companion-workflow positioning;
- clear non-AI-required positioning;
- existing fabrication photography moved to origin/credibility;
- responsive/mobile treatment.

It does **not** attempt to rebuild every route yet.

Draft PR #2 is the visual-review boundary for this first slice. Do not merge it until the owner approves the new direction.

## Media rule

The first homepage uses a deliberately abstract product-workflow illustration rather than fabricated application screenshots. Before public launch, replace product illustrations with screenshots/video captured from an exact current Windows build.

The existing real shop/project images remain useful for origin and credibility.

## Brand asset note

The uploaded high-resolution LaserX Design logo in the website repository is used for the first shell. The official LaserX Design Studio logo package should be imported and selected as the durable brand source before merge if it is not already present as individual repository assets.

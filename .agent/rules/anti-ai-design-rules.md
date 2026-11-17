---
description: Strict UI/UX and visual design rules to eliminate generic AI clichés and enforce industrial craftsmanship
globs: ["**/*.tsx", "**/*.jsx", "**/*.html", "**/*.css", "src/**/*"]
alwaysApply: true
---

# ANTI-AI DESIGN RULES & INDUSTRIAL CEA CRAFTSMANSHIP

When creating or modifying any front-end UI, component, layout, or copy for this project:

## 1. Zero AI Tropes (STRICT BAN)
- **NO NEON BORDER GLOW:** Absolutely no luminous `box-shadow` glows or bright neon green/purple borders on cards. Use 1px matte hairline dividers (`rgba(255,255,255,0.08)`) and chamfered bevels.
- **NO 3-COLUMN ICON CARDS:** Never generate a repetitive 3-column row of cards with centered text and an icon trapped inside a colored square box. Break layouts into asymmetric split panels, technical specification grids, and interactive blueprints.
- **NO BUZZWORD FLUFF:** Avoid generic marketing phrases (*"Smart solution for a better tomorrow"*). Use factual commercial CEA engineering specifications (*"±0.05 EC dosing"*, *"RS485 Daisy-chain up to 1000m"*, *"DIN-rail mount IP66"*).
- **NO FLOATING AMBIENT ORBS:** Do not scatter blurry radial gradient color orbs across backgrounds. Use disciplined, matte dark carbon surfaces (`#070B08`, `#0E1410`).

## 2. Hardware Physicality & Tactility
- Present equipment like real physical hardware: show model serial tags, RJ12/RJ45 connector ports, screw terminal breakout legends, and IP66 enclosure ratings.
- Style badges like physical machine silkscreen decals (monospaced uppercase, tight letter spacing, high contrast).

## 3. Typography & Data
- Display numbers and metrics using `font-variant-numeric: tabular-nums` in a monospace font (`IBM Plex Mono`) to ensure data stability without horizontal jitter.
- Use extreme scale contrast: massive industrial display headlines (Rajdhani) paired with whisper-quiet, ultra-refined 10px–11px technical metadata.

## 4. Verification Before Output
Always audit code against `DESIGN_RULEBOOK.md`. If a component looks like an off-the-shelf template or AI demo, redesign it with mechanical weight, asymmetry, and industrial authority.

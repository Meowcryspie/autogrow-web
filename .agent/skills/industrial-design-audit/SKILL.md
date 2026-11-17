---
name: industrial-design-audit
description: Audits and refactors front-end web components against the Anti-AI Design Rulebook, eliminating neon glows, 3-column card traps, and generic marketing copy while applying matte carbon materials, hairline rules, and authentic CEA engineering data. Use whenever the user asks to review, audit, improve, or de-slop the UI/UX design.
---

# Industrial CEA Design Audit & Refactor Skill

This skill guides the agent through an automated, 5-phase procedure to inspect front-end files, identify generic AI templates or clichés, and refactor them into studio-grade industrial interfaces based on `DESIGN_RULEBOOK.md`.

---

## Workflow Steps

### Phase 1: Automated Slop Detection
Scan target component files (`.tsx`, `.jsx`, `.css`) for the following blacklisted patterns:
1. **Neon & Glowing Borders:** Search for `box-shadow: 0 0`, glowing borders (`border-glow`), or bright green/purple border outlines.
2. **Blurry Background Blobs:** Search for `radial-gradient` color orbs or fuzzy ambient backdrops.
3. **The 3-Card Trap:** Identify rows of 3 identical rectangular cards with centered icons trapped inside rounded squares.
4. **Marketing Buzzwords:** Check for words like *"seamless"*, *"elevate"*, *"unlock"*, *"smart solution"*, or *"next-gen"*.
5. **Jittering Telemetry:** Check if live updating numbers lack `font-variant-numeric: tabular-nums`.

### Phase 2: Material & Token Transformation
Replace identified anti-patterns using the exact tokens from `DESIGN_RULEBOOK.md`:
* Backgrounds: Set to non-reflective matte carbon `#070B08`.
* Surfaces: Convert card boxes to `.panel-chassis` (`#0E1410` surface, `1px solid rgba(255,255,255,0.08)` hairline dividers, `border-top: 1px solid rgba(255,255,255,0.16)` chamfer bevel).
* Accents: Strip decorative green borders; use signal green `#00E575` *only* for active system state indicators or verified telemetry.

### Phase 3: Layout Asymmetry & Visual Tension
Refactor repetitive symmetrical card rows:
* Convert centered heroes into asymmetric 60/40 or 70/30 split consoles.
* Replace generic feature boxes with technical specification matrices, terminal block breakouts, or crop steering profile tabs.
* Ensure generous section breathing room (`96px` to `128px` vertical padding).

### Phase 4: Factual Agricultural Copywriting
Rewrite all placeholder text:
* Insert concrete engineering tolerances (e.g. `±0.03 mS/cm EC`, `±0.05 pH`).
* Add hardware ratings (`IP66 / NEMA 4X`, `2.5 kV galvanic isolation`, `100 m³/hr flow rate`).
* Ground all biological claims in crop steering reality (canopy VPD in kPa, volumetric water content VWC%, daily generative dryback %).

### Phase 5: Verification & Production Build
1. Run `npm.cmd run build` to verify zero TypeScript errors or broken imports.
2. Verify that mechanical button states depress on click (`transform: translateY(1px)`).
3. Confirm that all numbers render with monospaced tabular figures.


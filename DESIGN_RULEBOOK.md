# AUTOGROW INDUSTRIAL CEA · DESIGN RULEBOOK
## Anti-AI Cliche Manifesto & Actionable Implementation Guide

> **Core Philosophy:** Treat the website like a multi-million-dollar physical industrial machine console engineered in New Zealand. Every pixel must reflect precision manufacturing, data density, and operational reliability—not generic web templates.

---

## 1. THE COMPLETE "AVOID vs. DO" SPECIFICATION MATRIX

| Category | ❌ What to AVOID (The AI Cliche) | ✅ What to DO INSTEAD (Studio Industrial Craft) | Exact Specification / Actionable Token |
| :--- | :--- | :--- | :--- |
| **Color & Lighting** | **Neon Glows & Ambient Orbs:**<br>• Glowing borders (`box-shadow: 0 0 20px #00ff88`)<br>• Blurry radial color blobs floating in backgrounds<br>• Purple/indigo/cyan neon gradients (`from-purple-500 to-indigo-600`) | **Matte Non-Reflective Materials:**<br>• Matte obsidian carbon & anodized titanium<br>• 1px mechanical hairline rules<br>• Top chamfer bevel highlights simulating CNC-milled 45° edges<br>• Accents used *strictly* for active system state (10% rule) | • Background: `#070B08`<br>• Panel Surface: `#0E1410`<br>• Elevated Bay: `#161F19`<br>• Hairline Rule: `1px solid rgba(255,255,255,0.08)`<br>• Chamfer Bevel: `border-top: 1px solid rgba(255,255,255,0.16)`<br>• Signal Green: `#00E575` (active relay only) |
| **Layout & Structure** | **The Symmetrical Card Grid:**<br>• Centered hero with 3 identical rectangular cards below<br>• Equal 20px padding on every container<br>• Floating cards with heavy drop-shadows | **Editorial Asymmetry & Machine Blueprint:**<br>• Split consoles (60/40 or 70/30 ratios)<br>• Left-aligned anchor headers with offset viewports<br>• Edge-to-edge full-bleed split panels<br>• High-density spec tables alternating with spacious photographic breathing room | • Hero: 55% editorial narrative + 45% live interactive machine console<br>• Section Spacing: `96px` to `128px` vertical breathing room<br>• Layout Grid: 12-column asymmetric with hairline dividing rules |
| **Typography** | **Default Fonts & Weak Hierarchy:**<br>• Standard fonts (Inter, Roboto, Arial)<br>• Uniform font sizes without tension<br>• Centered headlines and subheads | **The Tri-Font Industrial Architecture:**<br>• Machine Display font for model codes and headers<br>• Humanist editorial sans for reading comfort<br>• Monospaced font with tabular numbers for all data | • Display: `'Rajdhani'` / `'Chakra Petch'`, 700/800 Bold, uppercase, `letter-spacing: 0.04em`<br>• Body: `'Plus Jakarta Sans'` / `'DM Sans'`, 400 Regular, `line-height: 1.65`, max `64ch`<br>• Data: `'IBM Plex Mono'`, uppercase, `10px–12px`, with `font-variant-numeric: tabular-nums` |
| **Data & Telemetry** | **Vague Gimmick Numbers:**<br>• "Smart Score: 99%"<br>• "10x Productivity Boost"<br>• Jittering numbers that shift card widths on update | **Verified Horticultural Telemetry:**<br>• Canopy Vapor Pressure Deficit (VPD in kPa)<br>• Electrical Conductivity (EC in mS/cm)<br>• Solution pH with temperature compensation<br>• Substrate Volumetric Water Content (VWC%) | • `VPD: 1.18 kPa`<br>• `EC: 2.24 mS/cm (±0.03 mS/cm)`<br>• `pH: 5.82 (±0.05 pH)`<br>• `Flow: Up to 100 m³/hr`<br>• `Dryback: -12.0% daily generative` |
| **Media & Assets** | **Generic Stock & Icon Boxes:**<br>• 48×48px Lucide/Heroicon icons trapped in colorful pastel/neon rounded boxes<br>• Cheesy 3D clay illustrations<br>• Generic stock business people | **Physical Hardware & Schematics:**<br>• Real terminal block legends (`TB1`, `TB2`, `TB3`)<br>• Actual connector breakouts (`RJ12 CAN-BUS`, `24VAC SOLENOIDS`)<br>• DIN-rail mounting specs and IP66 enclosure ratings<br>• Authentic greenhouse vine crop & hydroponic photography | • Laser-etched zinc silkscreen decals (`.decal-badge`)<br>• Interactive CAD terminal breakouts<br>• High-resolution photography filtered with high contrast (`contrast(1.15) brightness(0.8)`) |
| **Interactions** | **Floaty Spring Physics:**<br>• Bouncy card hover zooms (`scale-105` with spring ease)<br>• Floating continuous hover bobbing<br>• Slow sluggish transitions | **Mechanical Relay Snappiness:**<br>• Physical button depression (`translateY(1px)`)<br>• Instant hairline border highlight on click<br>• Crisp deceleration with zero overshoot | • Duration: `120ms` to `160ms`<br>• Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (crisp industrial snap)<br>• Active state: `transform: translateY(1px); border-color: var(--color-green)` |
| **Copywriting** | **AI Marketing Slop:**<br>• "Unlock the power of seamless synergy"<br>• "Next-gen intelligent future"<br>• "Revolutionize your agricultural journey" | **Unvarnished Engineering Reality:**<br>• Direct, factual, verifiable engineering specs<br>• Stated tolerances, voltages, bus distances, and hardware fail-safes | • *"30+ years of New Zealand agricultural engineering. Autonomous multi-compartment environmental control and closed-loop proportional fertigation deployed across 45+ countries."* |

---

## 2. COMPONENT-BY-COMPONENT BLUEPRINT

### A. The Hero Section
* ❌ **DO NOT:** Center the title, subtitle, and buttons over an ambient green blur with 3 cards underneath.
* ✅ **DO:** Build an asymmetric split-screen console:
  * **Left (55%):** Left-aligned display headline (`AUTOGROW MGC-PRO`), NZ engineering decal badge, factual summary, and mechanical action buttons.
  * **Right (45%):** An interactive **Machine Diagnostic Console** showing real-time multi-bay telemetry, active relay states (`RIDGE VENT 1: 45% OPEN`, `BOILER: CLOSED`, `FERTIX: INJECTING`), and live compartment switching.
  * **Bottom:** A continuous 4-column hairline data strip with tabular numbers (`32 ZONES`, `100 m³/hr`, `±0.03 EC`, `IP66 DIE-CAST`).

### B. Hardware & Dosing Product Panels
* ❌ **DO NOT:** Use rounded-2xl cards with colorful icons, drop shadows, and fluffy bullet points.
* ✅ **DO:** Style each item as an industrial chassis panel (`.panel-chassis`):
  * Crisp 3px–4px radius corners with top surface chamfer (`border-top: 1px solid rgba(255,255,255,0.16)`).
  * Laser-etched silkscreen model tags in monospace (`[MGC-Pro]`, `[SGF-100]`, `[IDC-4]`).
  * High-density 2x2 specification matrix with tabular figures.
  * Direct action link: "WIRING & PINOUTS" that opens authentic terminal block schematics (`TB1 RS-485`, `TB2 Analog`, `TB3 Relays`).

### C. The Phone Scaling Studio (`IntelliGrow™ Mobile`)
* ❌ **DO NOT:** Drop a generic screenshot inside a flat rounded box.
* ✅ **DO:** Create a true device laboratory mimicking TrolMaster's showcase:
  * **Top Toolbar:** Viewport presets (Compact 340px, Standard 380px, Pro Max 420px) + dynamic scale slider ($75\% - 115\%$) + instant reset.
  * **Titanium Chassis:** Precision bezel with speaker slit, Dynamic Island status indicator, and home bar.
  * **Interactive App Simulation:** Functional tabs (Sensors, Dosing, Substrate, Alarms) with an **interactive pulse dosing button** that recalculates live reservoir EC/pH in real time.

### D. Plant-Centric Crop Steering Section
* ❌ **DO NOT:** Display generic icons for "plants".
* ✅ **DO:** Provide an interactive agronomic steering matrix:
  * Tabs for High-Wire Vine Crops, Tabletop Berries, Leafy Greens NFT, and Indoor Vertical CEA.
  * Display crop-specific biological targets: VPD bandwidth (kPa), target EC, solution pH, and daily generative/vegetative dryback percentages.
  * Direct clickable hardware badges that open the recommended controller or skid.

### E. Commercial Economic Model (ROI Calculator)
* ❌ **DO NOT:** Write "Save money with our smart solution".
* ✅ **DO:** Provide an interactive calculator with real input sliders:
  * Facility scale (Hectares / m²).
  * Annual fertilizer expenditure ($).
  * Annual water supply cost ($).
  * Real-time calculation of fertilizer recapture (~22%), water conserved (~26%), and cumulative 5-year commercial ROI with hardware amortization timeline.

---

## 3. PRE-FLIGHT VERIFICATION AUDIT CHECKLIST

Before approving any front-end code or component, run this strict 7-point audit:

- [ ] **1. Glow Check:** Are there any glowing borders or blurry radial ambient blobs? *Must be replaced with 1px hairline rules and chamfer bevels.*
- [ ] **2. Card Trap Check:** Is the layout just repetitive 3-column boxes with icons? *Must be redesigned as an asymmetric split panel or data table.*
- [ ] **3. Icon Check:** Are icons trapped in colorful rounded boxes? *Must be converted into silkscreen decal badges or instrument labels.*
- [ ] **4. Copywriting Check:** Are there buzzwords like "seamless", "elevate", or "smart"? *Must be rewritten with concrete engineering metrics and tolerances.*
- [ ] **5. Typography Check:** Are numbers jumping/jittering when updated? *Must use monospace font with `font-variant-numeric: tabular-nums`.*
- [ ] **6. Hardware Reality Check:** Are terminal blocks, pinouts, DIN-rail mounting, or enclosure ratings shown? *Ensure tangible physical details are visible.*
- [ ] **7. Interaction Check:** Do buttons and toggles feel snappy and mechanical? *Ensure 120ms–160ms ease-out transitions with active depression.*

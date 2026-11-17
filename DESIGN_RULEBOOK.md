# AUTOGROW INDUSTRIAL CEA · DESIGN RULEBOOK
## Anti-Generic / Anti-AI Design System Manifesto & Technical Specification

> **Mission**: To permanently eliminate the "AI-generated template" aesthetic and enforce authentic, human-crafted, high-end industrial engineering design across all Autogrow digital experiences.

---

## 1. THE FORBIDDEN BLACKLIST (NEVER DO THIS)

Every design implementation must strictly avoid these classic AI hallmarks:

| Forbidden AI Trope | Why It Fails | What To Do Instead |
| :--- | :--- | :--- |
| **Neon Cyber Glow** | Glowing green/purple borders (`0 0 20px #00ff88`) and ambient radial blur blobs look like a cheap crypto landing page or gamer gear. | **Matte industrial surfaces.** Use machined hairline dividers (`rgba(255,255,255,0.08)`), subtle 1px surface bevels, and matte dark slate/titanium palettes. |
| **The 3-Card Icon Grid** | Three identical rectangular cards with a centered icon in a colored rounded box. It is the #1 tell of an automated template. | **Asymmetric editorial layouts.** Split screens, technical schematics, multi-tier data tables, exploded product diagrams, and offset modular panels. |
| **Icon-in-a-Box Fetish** | Trapping every icon in a 48×48px pastel/neon rounded square. | **Functional instrumentation symbols.** Treat icons as technical indicators or silkscreen badges directly adjacent to text, or replace with actual hardware schematics. |
| **Marketing Buzzword Soup** | *"Unlock next-gen intelligent seamless agricultural synergy."* | **Concrete engineering facts.** State tolerances, pinouts, voltages, flow rates, and biological metrics (e.g., *"±0.05 EC closed-loop dosing"*, *"2.5 kV galvanic isolation"*). |
| **Centered Everything** | Centered hero headline, centered subhead, centered cards, centered footer. | **Left-aligned architectural structure.** Ground the eye with strong left-aligned margins, asymmetrical focal points, and deliberate vertical pacing. |
| **Uniform Padding & Scale** | Every card and section having identical 20px padding and 16px font sizes. | **Extreme scale tension.** Pair massive 80px industrial display type with ultra-refined 10px monospaced technical metadata. Balance dense telemetry with spacious photographic breathing room. |
| **Toy / Cartoon Mockups** | Generic CSS pill-shaped boxes pretending to be phones or controllers. | **Photorealistic tangible hardware.** Highlight physical DIN-rail clips, RJ12 ports, tactile silicone bumpers, screw terminals, and real industrial enclosures. |

---

## 2. CORE VISUAL DNA: INDUSTRIAL TACTILITY

The Autogrow aesthetic is inspired by the intersection of **TrolMaster**, **Teenage Engineering**, **Siemens Industrial Automation**, and **Swiss Editorial Design**.

```
[ Precision Engineered in New Zealand · Harsh CEA Operating Environments · IP66 / NEMA 4X ]
```

### A. Surface Palette & Materiality
* **Primary Void (`#070B08`):** Deep, non-reflective obsidian carbon. Not pure pitch `#000000`, but a rich, warm graphite that absorbs glare.
* **Surface Tier 1 (`#0E1410`):** Anodized chassis dark green-gray. Used for main chassis panels and structural containers.
* **Surface Tier 2 (`#151D18`):** Machined metal slate. Used for elevated interactive modules and sensor bays.
* **Hairline Rule (`rgba(255, 255, 255, 0.08)`):** 1px mechanical partition lines. Clean, discrete, zero blur.
* **Bevel Highlight (`rgba(255, 255, 255, 0.12)`):** Top border highlight simulating a 45° CNC chamfer edge.

### B. Functional Telemetry Accents (The 60-30-10 Rule)
* **60% Carbon Void:** Keeps the eye rested and eliminates visual clutter.
* **30% Structural Slate:** Establishes hierarchy and container boundaries.
* **10% Purposeful Signal Color:** Accents are reserved **strictly** for functional system states:
  * **Phosphor Green (`#00E575`):** Normal running status, optimal VPD bandwidth, live MQTT socket link.
  * **Cyan Telemetry (`#00C8FF`):** Sensor probes, bus communications, firmware diagnostics.
  * **Amber Caution (`#FFB703`):** High-temperature alarm threshold, nutrient reservoir low-level warning.
  * **Signal Red (`#FF3B30`):** Emergency watchdog trip, pump lock-out, pH critical limit.
  * **NEVER** use these colors as ambient decorative gradients or fuzzy card backdrops.

---

## 3. TYPOGRAPHY SYSTEM

Real engineering interfaces prioritize data legibility and hierarchy over novelty fonts.

### The Tri-Font Architecture
1. **The Display Headline (`Rajdhani` or `Chakra Petch`):**
   * Weight: 700 / 800 Bold
   * Transform: Uppercase, tracking `+0.04em` to `+0.08em`
   * Purpose: Authoritative industrial headers, equipment model names, section titles.
2. **The Editorial Body (`Inter` or `Geist Sans`):**
   * Weight: 400 Regular / 500 Medium
   * Line-height: 1.6 to 1.7
   * Color: `#A2B3A7` (Muted high-contrast zinc; never pure white to prevent eye strain).
3. **The Machine Monospace (`IBM Plex Mono` or `JetBrains Mono`):**
   * Feature: `font-variant-numeric: tabular-nums` (numbers always align vertically across rows).
   * Transform: Uppercase for labels (`STATUS: ACTIVE`, `BUS: RS485-CH02`).
   * Size: 10px – 12px for technical micro-metadata.

---

## 4. LAYOUT RHYTHM & PACING RULES

### Rule 1: The Asymmetry Mandate
* No section may be composed solely of three equal cards.
* Use **Split Hero Layouts**: 55% editorial narrative / 45% interactive physical hardware view.
* Use **Data-Density Shifts**: Follow an expansive, cinematic photographic section with an ultra-dense, monospaced specification table.

### Rule 2: Hardware Physicality
* When displaying controllers (MultiGrow, IntelliClimate, IntelliDose), always represent their physical reality:
  * Show actual port labels: `RJ12 CAN-BUS`, `24VAC SOLENOID BANK`, `PT100 RTD INPUT`.
  * Display authentic technical pinouts and wiring schematics alongside product imagery.
  * Show real commercial mounting: Wall bracket, DIN-rail 35mm, or stainless steel rack enclosures.

### Rule 3: Authentic Plant-Centric Telemetry
* Do not invent generic stats like "Smart Score: 98%".
* Use verified commercial horticultural measurements:
  * **Vapor Pressure Deficit (VPD):** `1.15 kPa`
  * **Electrical Conductivity (EC):** `2.24 mS/cm (24°C temp compensated)`
  * **Acidity / Alkalinity (pH):** `5.82 pH`
  * **Photosynthetic Photon Flux Density (PPFD):** `850 µmol/m²/s`
  * **Substrate Volumetric Water Content (VWC):** `62.4%`
  * **Daily Generative Dryback Target:** `-12.0%`

---

## 5. MICRO-INTERACTION & PHYSICS STANDARDS

* **No Bouncy Springs:** Do not use elastic, playful UI animations (`cubic-bezier(0.68, -0.55, 0.27, 1.55)`). They feel like social media apps.
* **Mechanical Snappiness:** Transitions should mimic physical relays and optical switches:
  * Duration: `120ms` to `180ms`.
  * Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (crisp deceleration with zero overshoot).
* **Tactile State Confirmation:** Buttons must visibly depress (`transform: translateY(1px)`) and change border tone instantly upon click.
* **Tabular Figure Stability:** When numbers update (e.g., live telemetry), the container must never jitter or resize horizontally.

---

## 6. PRE-FLIGHT VERIFICATION CHECKLIST

Before any page or component is committed or deployed, audit against this checklist:

- [ ] **Are there glowing ambient neon borders?** *If yes, remove them and replace with 1px hairline rules.*
- [ ] **Is there a 3-column card row with icons in colored boxes?** *If yes, redesign as an asymmetric layout or interactive spec table.*
- [ ] **Are headlines filled with marketing fluff?** *If yes, rewrite with concrete technical specifications and engineering metrics.*
- [ ] **Is everything centered?** *If yes, ground the layout with deliberate left-alignment and asymmetric tension.*
- [ ] **Does the hardware look real and tangible?** *If no, add mechanical details, port labels, silkscreen typography, and enclosure specs.*
- [ ] **Do numerical readouts use monospace tabular numbers?** *If no, apply tabular formatting to prevent layout shifts.*
- [ ] **Is negative space generous and confident?** *If no, let key elements breathe and eliminate cramped clutter.*


# BRALARMSEG Design System

## Company Overview

**BRALARMSEG — Segurança e Emergência** is a B2B specialist in industrial LED and emergency lighting, headquartered in Curitiba, PR, Brazil. Founded in 2007 (~20 years in the market), the company serves clients in industrial warehouses, cold storage facilities, logistics centers, parking lots, ports, airports, supermarkets, and sports courts.

**Business model:** B2B, direct sales + WhatsApp-based quote requests.  
**Main differentiators:** IP65–IP68 protection grade, energy savings up to 70–80%, lifespan >50,000 hours, technical project consulting.

### Sources
- **Logo file:** `uploads/logo_upload-1777832545504.png` (PNG, 1280×786)
- **Website:** https://www.bralarmseg.com.br/lp/ (scraped May 2026)
- No Figma link provided. No codebase attached.

---

## Products

| Product Line | Models | Key Specs |
|---|---|---|
| Highbay Magna | BR-HBM150 | 150W, IP66 |
| Highbay Classic | BR-HighbayClassic | 100/150W, IP20, 140lm/W |
| Highbay Industrial | BR-HBI | 100/150/200W, IP65, aluminum body |
| Luminária Lumo Emergência | BR-Lumo | 50W, IP20, 130lm/W |
| Projetor UFO Luxi | BR-UFO | 100/150/200W, IP65, 25,000h |
| Projetor UFO Elite | BR-UFO Elite | 100/150/200W, IP65, 160lm/W, 50,000h |
| Projetor Sport | BR-Sport Plus | 50–200W, IP66, adjustable angle |
| Projetor Vegas | BR-Vegas | 50–200W, IP66 |
| Projetor Faros24 | BR-Faros24 Plus | 50/100W, IP66, 24Vdc (solar towers) |
| Projetor Fox IR | BR-FoxIR | 35/50W, IP66, infrared 850/940nm |

**Segments served:** Galpões industriais, frigoríficos, centros logísticos, estacionamentos, portos, aeroportos, supermercados, quadras esportivas.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Technical and authoritative** — the brand speaks to engineers, facility managers, operations directors, not consumers.
- **Direct and factual** — copy leads with specs: watts, IP rating, lumens/W, lifespan hours.
- **Action-oriented** — every section ends with a CTA (SOLICITAR ORÇAMENTO, ENTRAR EM CONTATO, VER PRODUTOS).
- **Confident but not aggressive** — metrics do the selling ("65% economia", "50.000 horas"), no hyperbole.

### Language
- **Brazilian Portuguese** throughout. No English UI labels.
- **ALL CAPS** for section headings and product names (e.g. "LUMINÁRIA HIGHBAY MAGNA").
- **Sentence case** for body text and descriptions.
- **"Você" / "Seu"** register — addresses the B2B buyer directly but formally.
- No emoji. No informal slang.

### Copy patterns
- Tech spec inline: `150W, IP66, ideal para galpões e fábricas com pé-direito elevado.`
- Stat callouts as large isolated numbers: `+50.000 HORAS DE VIDA ÚTIL`, `80% MENOS CONSUMO`
- Testimonials are attributed with name + title + company.
- WhatsApp CTA messages are pre-filled with product context.

---

## VISUAL FOUNDATIONS

### Color System
| Token | Value | Usage |
|---|---|---|
| `--brand-orange` | `#E35106` | Primary accent — CTAs, highlights, active states (orange-shifted per client brief) |
| `--brand-blue` | `#003DA5` | Secondary — headings, trust signals, nav |
| `--brand-black` | `#111111` | Logo wordmark, primary text |
| `--fg-1` | `#111111` | Primary text |
| `--fg-2` | `#4A4A4A` | Secondary/body text |
| `--fg-3` | `#7A7A7A` | Captions, meta |
| `--bg-white` | `#FFFFFF` | Primary background |
| `--bg-light` | `#F5F5F5` | Alternate section bg |
| `--bg-dark` | `#0A1628` | Dark sections, footer |
| `--border` | `#DCDCDC` | Card/table borders |
| `--success` | `#1A8A4A` | Positive states |
| `--warning` | `#F59E0B` | Caution |
| `--danger` | `#DC2626` | Error/alert |

### Typography
- **Primary sans-serif:** Barlow Condensed (Google Fonts) — headings, product names, stat callouts. Industrial, condensed, German-influenced. Closest match to brands like Trilux/Zumtobel.
- **Secondary sans-serif:** Barlow — body text, navigation, form labels.
- **Monospace:** JetBrains Mono — technical specs, IP ratings, part numbers.
- Font sizes: 12/14/16/18/20/24/28/32/40/48/56/64px scale.

### Spacing
- Base unit: 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Section padding: 80–96px vertical on desktop, 48px on mobile.
- Card padding: 24px.

### Backgrounds
- **Predominantly white** — clean, airy, technical.
- Dark navy (`#0A1628`) for footer and full-bleed "hero" alternative sections.
- Photography: real industrial environments (cold storage, warehouses, factories), cool-toned, high-contrast. No gradients over images — semi-transparent dark overlays max 60% opacity.
- No decorative gradients. No texture fills. No hand-drawn elements.

### Cards
- `border-radius: 4px` — very subtle, almost square corners.
- Thin border: `1px solid #DCDCDC` on light bg.
- Subtle shadow: `0 2px 8px rgba(0,0,0,0.08)` — elevation system is minimal.
- On hover: border brightens slightly, shadow deepens `0 4px 16px rgba(0,0,0,0.14)`, slight Y translate `-2px`.

### Animation
- **Minimal** — functional, not decorative.
- Transitions: `200ms ease-out` for hovers, color changes, state changes.
- No bounces. No spring physics. No auto-playing animations.
- Fade-in on scroll for section reveals (opacity 0→1, translateY 16→0px).

### Iconography
- No proprietary icon font — CDN Lucide icons (stroke, 1.5–2px weight, clean geometric).
- Icons used functionally: contact types, feature bullets, nav arrows.
- No icon fills/backgrounds. Icons at 20–24px most contexts.

### Borders & Radius
- Cards: `border-radius: 4px`
- Buttons: `border-radius: 3px` (almost square — industrial feel)
- Inputs: `border-radius: 3px`
- Badges/pills: `border-radius: 2px`
- No large radius (no "pill" style except chips/tags)

### Hover & Press States
- Buttons: background darkens ~10%, no scale change.
- Links: color shifts to `--brand-orange`, underline appears.
- Cards: shadow deepens, -2px translate.
- Nav items: orange underline indicator appears.

### Imagery
- Cool-toned industrial photography. High contrast. Real environments.
- Product photos on white/neutral background — no lifestyle staging.
- No illustrations or icons used as imagery substitutes.
- Images always carry meaningful alt text with product model + environment context.

### Layout Rules
- Max content width: 1280px, centered.
- Sticky nav header: white bg, `box-shadow: 0 1px 4px rgba(0,0,0,0.10)`.
- Section alternation: white → light gray → white. Dark used sparingly for footer/CTA.
- Grid: 12-column. Cards typically span 4 cols (3-up) or 3 cols (4-up).

---

## ICONOGRAPHY

BRALARMSEG's own website uses no custom icon font or SVG sprite system. This design system uses **Lucide Icons** (CDN: https://unpkg.com/lucide@latest) as the standard icon set.

- **Style:** Stroke icons, 2px stroke weight, rounded joins.
- **Sizes:** 16px (inline/dense), 20px (default UI), 24px (feature bullets), 32px (section icons).
- **Color:** Inherits text color, or explicitly `--brand-orange` for emphasis icons.
- **Emoji:** Never used in UI.
- **Unicode as icons:** Not used.

Logo file: `assets/logo.png` (PNG, 1280×786, white background).

---

## FILE INDEX

```
README.md                    ← This file
SKILL.md                     ← Agent skill definition
colors_and_type.css          ← CSS custom properties (tokens + semantic)
assets/
  logo.png                   ← Primary logo (PNG, white bg, 1280×786)
preview/
  01-brand-colors.html       ← Brand + neutral color swatches
  02-semantic-colors.html    ← Semantic/functional color tokens
  03-type-scale.html         ← Display + body type scale
  04-type-specimens.html     ← Real copy specimens
  05-spacing-tokens.html     ← Spacing scale visualization
  06-elevation-radius.html   ← Shadow / border-radius system
  07-buttons.html            ← Button variants & states
  08-form-inputs.html        ← Input, select, textarea, checkbox, radio
  09-cards.html              ← Product card, stat card, feature card
  10-badges-tags.html        ← IP rating badges, spec tags, status
  11-nav-header.html         ← Navigation header component
  12-data-table.html         ← Spec table / technical comparison
  13-alerts-modals.html      ← Alert banners, modal dialog
  14-logo-usage.html         ← Logo lockups and clear space
ui_kits/
  website/
    README.md
    index.html               ← Full institutional website prototype
    Header.jsx
    Hero.jsx
    ProductCard.jsx
    ProductGrid.jsx
    ApplicationsSection.jsx
    StatsSection.jsx
    TestimonialsSection.jsx
    Footer.jsx
```

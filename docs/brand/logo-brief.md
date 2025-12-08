# AI Deck Logo Design Brief

## Brand Overview

**Brand Name:** AI Deck
**Tagline:** (TBD - options being explored)
**Industry:** AI Tools Directory / Discovery Platform
**Target Audience:** Professionals, creators, developers, marketers - anyone looking for AI tools

---

## Concept Direction

### Core Metaphor: Deck of Cards + Grid

The logo should combine two concepts:

1. **Deck of Cards** - Each AI tool is like a card you can "play" to solve a problem
2. **Grid/Dashboard** - Organized, accessible, structured way to find tools

### Visual Interpretation

A **grid of rounded squares/cards** arranged in a pattern that suggests:
- Organization and structure
- Multiple options available
- Easy access and discoverability

**Example configurations:**
```
Option A: 2x2 grid (4 cards)
┌──┐ ┌──┐
│  │ │  │
└──┘ └──┘
┌──┐ ┌──┐
│  │ │  │
└──┘ └──┘

Option B: 3x3 grid (9 cards, some offset)
┌──┐ ┌──┐ ┌──┐
│  │ │  │ │  │
└──┘ └──┘ └──┘
┌──┐ ┌──┐ ┌──┐
│  │ │  │ │  │
└──┘ └──┘ └──┘

Option C: Staggered/dynamic grid
    ┌──┐ ┌──┐
    │  │ │  │
┌──┐└──┘ └──┘
│  │ ┌──┐
└──┘ │  │
     └──┘
```

---

## Design Requirements

### Priority #1: Simple and Comfortable

The logo MUST be:
- **Simple** - Clean lines, no clutter
- **Comfortable** - Approachable, not intimidating
- **Modern** - Contemporary feel without being trendy
- **Scalable** - Works at 16px (favicon) to billboard size

### Style Guidelines

| Do | Don't |
|----|-------|
| Clean geometric shapes | Complex illustrations |
| Rounded corners (soft) | Sharp, aggressive corners |
| Minimal elements | Too many details |
| Balanced composition | Asymmetric chaos |
| Professional yet friendly | Cold and corporate |

---

## Color Palette

Use the **Genesis Design System** colors:

### Primary Option: Gradient
```css
/* Purple to Blue to Pink flow */
--gradient: linear-gradient(135deg,
  oklch(0.55 0.22 280) /* purple */,
  oklch(0.55 0.22 260) /* blue */,
  oklch(0.55 0.22 320) /* pink */
);
```

### Solid Option: Primary Purple
```css
--primary: oklch(0.55 0.22 260);
/* Hex approximate: #7c3aed */
```

### Monochrome Option
For single-color contexts (dark backgrounds, print):
- White (#ffffff)
- Dark slate (#2d3a52)

---

## Logo Variants Needed

### 1. Icon Only (Logomark)
- Square format
- Grid of cards only, no text
- Used for: Favicon, app icon, social profile

**Sizes:**
- 16x16px (browser favicon)
- 32x32px (high-res favicon)
- 180x180px (Apple touch icon)
- 192x192px (Android icon)
- 512x512px (PWA icon)
- 400x400px (social profile)

### 2. Horizontal (Icon + Text)
- Icon on left, "AI DECK" text on right
- Used for: Header, email signature, documents

**Text specifications:**
- Font: Plus Jakarta Sans (Bold or ExtraBold)
- Letter spacing: 0.05-0.15em
- All caps: "AI DECK"

### 3. Stacked (Icon above Text)
- Icon centered above text
- Used for: Square formats, loading screens

### 4. Text Only (Wordmark)
- Just "AI DECK" styled
- Used for: When icon doesn't fit

---

## Usage Contexts

| Context | Variant | Size | Notes |
|---------|---------|------|-------|
| Browser favicon | Icon only | 16x16, 32x32 | Must be recognizable tiny |
| Header nav | Horizontal | 40px height | With brand name |
| Social profile | Icon only | 400x400 | Centered, padded |
| OG image | Horizontal | Large | Centered in 1200x630 |
| App icon | Icon only | 512x512 | With safe zone |
| Print (business card) | Horizontal | Variable | Vector format |
| Dark backgrounds | Monochrome | Variable | White version |

---

## Background Compatibility

The logo must work on:
- White backgrounds
- Dark backgrounds (#0a0a0a)
- Gradient backgrounds (Genesis spheres)
- Photo backgrounds (with container)

---

## Files to Deliver

```
public/
├── logo.svg              # Main horizontal (icon + text)
├── logo-icon.svg         # Icon only
├── logo-stacked.svg      # Stacked version
├── logo-white.svg        # White monochrome
├── favicon.ico           # Multi-size favicon
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png  # 180x180
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── og-logo.png           # For OG images (transparent)
```

---

## Inspiration References

**Style inspiration (not to copy, just mood):**
- Notion (clean, minimal)
- Linear (modern, professional)
- Vercel (geometric, bold)
- Stripe (approachable, premium)

**Avoid looking like:**
- Gaming/esports logos
- Crypto/blockchain logos
- Generic tech startups

---

## Prompts for AI Design Tools

### Midjourney / DALL-E Prompt
```
Minimal logo design for "AI Deck", a modern AI tools directory.
Grid of rounded square cards arranged in a 2x2 or 3x3 pattern.
Purple and blue gradient colors.
Clean geometric shapes, no text in the image.
Simple, professional, approachable.
White background, flat design, vector style.
--style raw --v 6
```

### Alternative prompt (more abstract)
```
Abstract logo mark made of overlapping rounded rectangles.
Suggesting organization, structure, and accessibility.
Purple-blue color scheme with subtle gradient.
Minimal, modern, tech startup aesthetic.
Suitable for favicon and app icon.
--style raw --v 6
```

---

## Notes

- The logo will appear alongside an AI influencer avatar project in the future - keep it flexible
- Avoid trends that will look dated in 2 years
- Test the icon at 16x16 to ensure it's still recognizable
- Consider animated version for loading states (optional future)

---

## Contact

Questions about this brief: hello@aideck.io

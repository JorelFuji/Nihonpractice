---
name: Kawaii Logic Workspace
colors:
  surface: '#1b110a'
  surface-dim: '#1b110a'
  surface-bright: '#43372e'
  surface-container-lowest: '#150c06'
  surface-container-low: '#241912'
  surface-container: '#281d15'
  surface-container-high: '#33281f'
  surface-container-highest: '#3f3229'
  on-surface: '#f3dfd1'
  on-surface-variant: '#ddc1ae'
  inverse-surface: '#f3dfd1'
  inverse-on-surface: '#3a2e25'
  outline: '#a58c7b'
  outline-variant: '#564334'
  surface-tint: '#ffb77f'
  primary: '#ffb77f'
  on-primary: '#4e2600'
  primary-container: '#ff8a00'
  on-primary-container: '#613100'
  inverse-primary: '#914c00'
  secondary: '#c1c1ff'
  on-secondary: '#1200a9'
  secondary-container: '#312ec5'
  on-secondary-container: '#b0b1ff'
  tertiary: '#e9c400'
  on-tertiary: '#3a3000'
  tertiary-container: '#c7a600'
  on-tertiary-container: '#4a3d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb77f'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6f3900'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c1c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2e2bc2'
  tertiary-fixed: '#ffe170'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#1b110a'
  on-background: '#f3dfd1'
  surface-variant: '#3f3229'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.0'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 80px
---

## Brand & Style

This design system blends the precision of a technical workspace with the vibrant, high-energy charm of Japanese "Kawaii" culture. It is designed for language learners who seek a structured environment that doesn't sacrifice playfulness.

The aesthetic follows an **Immersive Structured Workspace** model: a dark, disciplined grid acts as the foundation, while interactive elements pop with saturated gradients, heavy borders, and bold typography. The emotional response is one of "Serious Fun"—encouraging focus through organization while rewarding progress with delightful, high-contrast visual feedback.

Key stylistic pillars include:
- **Grid-Centricity:** Visible or implied 8px grid lines that ground all components.
- **Vibrant Functionalism:** Using bright colors not just for decoration, but to categorize game states and difficulty levels.
- **Bilingual Harmony:** Balanced visual weight between Latin and Japanese scripts.

## Colors

The palette is rooted in a deep "Midnight Carbon" to maximize the luminosity of the vibrant accent colors. 

- **Primary (Sunset Orange):** Used for main actions, active word chains, and "Shiritori" branding.
- **Secondary (Electric Blue):** Dedicated to player indicators, local multiplayer, and technical metadata.
- **Tertiary (Cyber Yellow):** High-alert indicators, score multipliers, and "New" badges.
- **Accent (Neon Purple):** Used for achievements, special game modes, and decorative flourishes.
- **Surface Strategy:** The background utilizes a subtle grid pattern (`#262626` lines on `#0D0D0D`). Containers use a solid `#1A1A1A` with high-contrast borders to separate them from the grid.

## Typography

The typography system prioritizes clarity and character. **Plus Jakarta Sans** is the primary typeface for its friendly, open apertures which translate well to a playful game environment. For Japanese text, a matching high-quality Gothic typeface should be used to ensure weight consistency with the English headers.

**JetBrains Mono** is employed for "Technical Metadata"—labels like "FIG. 01", player scores, and word counts. This reinforces the "Workspace" aesthetic and provides a sharp contrast to the rounded, friendly nature of the primary font.

Large headings should often be paired: a large Japanese character string supported by a smaller English translation in `label-caps` or `body-md` style.

## Layout & Spacing

The design system utilizes a **12-column Fixed Grid** for desktop and a **4-column Fluid Grid** for mobile. All spacing is derived from an 8px base unit to ensure alignment with the background grid pattern.

- **The Canvas:** Elements are placed on a dark workspace. Content is grouped into "Modules" (Cards) that snap to the grid.
- **Gutters:** A consistent 16px gutter is maintained between modules to allow the background grid to "breathe" through the gaps.
- **Bilingual Stack:** When displaying English and Japanese together, use a `4px` (xs) gap for tight associations and `12px` (sm) for distinct sections.
- **Safe Areas:** On mobile, a 20px margin is enforced. On desktop, content is capped at a 1200px max-width to maintain readability.

## Elevation & Depth

This system avoids soft, blurry shadows in favor of **Structural Stacking** and **High-Contrast Outlines**.

- **Z-Axis Hierarchy:** Depth is conveyed through border thickness and brightness. 
- **Level 0 (Background):** The dark grid.
- **Level 1 (Modules/Cards):** `#1A1A1A` background with a 1px or 2px solid border (White or Primary Color).
- **Level 2 (Pop-overs/Modals):** These use a thicker 3px border and a slight "Hard Shadow"—a solid offset fill (4px down, 4px right) in a darker shade or black to simulate a physical, layered workspace.
- **Interaction:** Hovering over a card should increase the border thickness or change the border color to a vibrant accent, rather than adding a glow.

## Shapes

The shape language is **Soft-Technical**. We use a consistent `0.25rem` (4px) corner radius for most containers. This is sharp enough to feel "architectural" and grid-aligned, but soft enough to remain approachable.

- **Standard Elements:** 4px radius (Buttons, Input Fields, Cards).
- **Interactive Tags:** 8px radius (`rounded-lg`) for chips and difficulty badges to make them feel more "tactile."
- **Avatars:** Circular (Pill-shaped) to provide a organic break from the rigid grid.

## Components

### Game Cards
Modules that represent a game mode or a word in the chain. They feature a solid 2px border. If the card is "Active," the border should be the Primary Orange. Top-right corners of cards can feature "Technical Labels" using `label-sm` in JetBrains Mono.

### Action Buttons
Buttons are high-contrast blocks. 
- **Primary:** Gradient fill (Orange to Yellow) with white text.
- **Secondary:** Solid black fill with a 2px white border.
- **Feedback:** Upon press, the button should shift 2px down and right, simulating a physical mechanical press.

### Player Scoreboard
A horizontal or vertical strip using JetBrains Mono for the numerals. Each player is assigned a color (Blue vs. Purple). The active player's nameplate should have a pulsing border in their respective color.

### Bilingual Rulebook
A layout component that side-by-sides Japanese and English text. Use `headline-sm` for the Japanese term and `label-caps` for the English equivalent directly above it.

### Input Fields
Dark backgrounds (`#000000`) with a 1px white border. When focused, the border changes to Primary Orange and the background grid lines behind the input become more prominent.

### Leaderboard
A clean list where rows are separated by the background grid lines. Use `label-caps` for column headers and alternating row highlights (subtle 5% opacity white) for readability.
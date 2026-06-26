---
name: Kawaii Nihongo Guide
colors:
  surface: '#f7f9ff'
  surface-dim: '#d2dbe6'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e6effa'
  surface-container-high: '#e0e9f5'
  surface-container-highest: '#dae3ef'
  on-surface: '#141c25'
  on-surface-variant: '#544245'
  inverse-surface: '#29313a'
  inverse-on-surface: '#e9f2fd'
  outline: '#877275'
  outline-variant: '#dac0c4'
  surface-tint: '#9c3f59'
  primary: '#9c3f59'
  on-primary: '#ffffff'
  primary-container: '#ff8eaa'
  on-primary-container: '#79233e'
  inverse-primary: '#ffb1c2'
  secondary: '#006c52'
  on-secondary: '#ffffff'
  secondary-container: '#79f9ce'
  on-secondary-container: '#007258'
  tertiary: '#0d6683'
  on-tertiary: '#ffffff'
  tertiary-container: '#73b9d9'
  on-tertiary-container: '#004960'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c2'
  on-primary-fixed: '#3f0018'
  on-primary-fixed-variant: '#7d2742'
  secondary-fixed: '#79f9ce'
  secondary-fixed-dim: '#5adcb3'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#00513d'
  tertiary-fixed: '#bee9ff'
  tertiary-fixed-dim: '#8ad0f1'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#004d65'
  background: '#f7f9ff'
  on-background: '#141c25'
  surface-variant: '#dae3ef'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Quicksand
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  card-gap: 12px
---

## Brand & Style

The brand personality is energetic, encouraging, and deeply rooted in the "Kawaii" aesthetic. It targets English speakers who find traditional language learning intimidating, offering instead a "character game-like" experience that feels like play rather than study. The emotional response should be one of "Aisatsu" (warm greeting) — making the user feel welcomed and rewarded at every interaction.

The design style is a hybrid of **Minimalist-Kawaii** and **Tactile Playfulness**. It utilizes large, soft UI elements, a vibrant but cohesive palette, and "bouncy" physics for transitions to evoke the feeling of a modern Japanese mobile game. Whitespace is used generously to keep the interface legible despite the high-energy colors.

## Colors

The palette is built on "Mochi Tones"—soft, delicious, and high-vibrancy. 
- **Primary (Sakura Pink):** Used for primary actions, progress highlights, and celebratory states.
- **Secondary (Mint Green):** Used for "Correct" feedback, navigation accents, and secondary buttons.
- **Tertiary (Sky Blue):** Used for information callouts, passive UI elements, and water-themed UI decorations.
- **Neutrals:** Soft charcoals and warm grays replace pure black to maintain a friendly, low-stress environment. 
- **Backgrounds:** Off-white with a slight pink tint to reduce eye strain and feel more "paper-like."

## Typography

This design system exclusively uses **Quicksand** for its rounded terminals and open apertures, which perfectly mirror the "kawaii" shape language. 
- **Headlines:** Always Bold (700) to ensure high legibility against colorful backgrounds.
- **Body Text:** Medium (500) weight is preferred over Regular to ensure the rounded edges remain visible and legible on mobile screens.
- **Japanese Characters:** When displaying Kanji, Hiragana, or Katakana, use a rounded Gothic typeface (like Zen Maru Gothic) to maintain visual consistency with Quicksand.

## Layout & Spacing

The layout follows a **Fluid Mobile-First** model. Because this is a game-like experience, the design prioritizes "thumb-zone" ergonomics. 
- **Grid:** A simple 4-column layout for mobile.
- **Safe Areas:** Generous 20px side margins to prevent UI elements from feeling "cramped" against the device edge.
- **Rhythm:** Spacing follows a 4px base unit. Interaction targets (buttons, cards) should always have a minimum of 12px internal padding to maintain the "pillowy" look.

## Elevation & Depth

Depth is achieved through **Soft Tactility** rather than traditional shadows.
- **Shadows:** Use extremely low-opacity (10-15%) blurs with a hint of the primary color (e.g., a faint pink shadow for a pink button) to create a "glowing" or "floating" effect.
- **Press States:** Instead of simple color changes, use "squish" physics—elements should scale down slightly (0.95x) when pressed.
- **Layers:** Use subtle tonal layering (e.g., a slightly darker pink border on a light pink button) to give items a 3D, sticker-like quality.

## Shapes

The shape language is strictly **Pill-shaped (3)**. There are no sharp corners in this design system. 
- **Buttons and Inputs:** Should use full radius (pill-shaped) ends.
- **Cards:** Should use `rounded-xl` (24px - 32px) to feel soft and approachable.
- **Progress Trackers:** Must have rounded caps on both the container and the fill indicator to maintain the "candy-bar" aesthetic.

## Components

### Buttons
Primary buttons feature a "thick bottom border" (2-4px) in a slightly darker shade of the button color to simulate a physical arcade button. On tap, the button shifts down 2px to hide this border, creating a satisfying click feel.

### Progression Bars
Outer tracks are semi-transparent versions of the primary color. The inner "fill" should have a glossy gradient and a white "sparkle" icon at the leading edge to emphasize growth.

### Level Badges
Circular or hexagonal with thick white outlines (3px). Use vibrant gradients and include a "star" or "crown" motif.

### Character Avatars
Avatars are always encased in a "squircle" or circular frame with a thick colorful border that indicates the user's current level or "mood."

### Input Fields
Inputs use a thick 2px border in a soft gray, which turns into the primary color when focused. Use large, rounded placeholder text.

### Cards (Lesson Tiles)
Cards should feel like physical "tiles." Use a white background with a subtle colorful border and a soft drop shadow. Icons within cards should be "chibi" style—large heads, expressive eyes, and simplified shapes.
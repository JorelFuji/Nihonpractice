---
name: Midnight Kawaii
colors:
  surface: '#12131d'
  surface-dim: '#12131d'
  surface-bright: '#383844'
  surface-container-lowest: '#0c0d18'
  surface-container-low: '#1a1b26'
  surface-container: '#1e1f2a'
  surface-container-high: '#282935'
  surface-container-highest: '#333440'
  on-surface: '#e2e1f1'
  on-surface-variant: '#d4c2c7'
  inverse-surface: '#e2e1f1'
  inverse-on-surface: '#2f303b'
  outline: '#9d8c92'
  outline-variant: '#504348'
  surface-tint: '#fab2d0'
  primary: '#ffe0ea'
  on-primary: '#502038'
  primary-container: '#ffb7d5'
  on-primary-container: '#7c445e'
  inverse-primary: '#854d67'
  secondary: '#73d9b5'
  on-secondary: '#003829'
  secondary-container: '#008263'
  on-secondary-container: '#e2fff1'
  tertiary: '#e1e6ff'
  on-tertiary: '#182e60'
  tertiary-container: '#b9caff'
  on-tertiary-container: '#405488'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd8e6'
  primary-fixed-dim: '#fab2d0'
  on-primary-fixed: '#360a22'
  on-primary-fixed-variant: '#6a364f'
  secondary-fixed: '#8ff6d0'
  secondary-fixed-dim: '#73d9b5'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#00513d'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b2c5ff'
  on-tertiary-fixed: '#001847'
  on-tertiary-fixed-variant: '#314578'
  background: '#12131d'
  on-background: '#e2e1f1'
  surface-variant: '#333440'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  character-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system translates the playful, inviting essence of Japanese language learning into a high-contrast dark environment. The brand personality is "Studious Nocturnal," blending the focus required for education with the whimsical charm of *kawaii* culture. 

The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**, utilizing deep indigo canvases to make vibrant pastel accents pop. The emotional response should be one of "cozy focus"—reducing eye strain for late-night study sessions while maintaining a sense of joy through soft shapes and bubbly interactions. We prioritize clarity and accessibility without sacrificing the rounded, friendly character of the original identity.

## Colors

The palette shifts from light pastels to "neon-pastels" set against a deep obsidian and indigo backdrop.

- **Primary (Sakura Pink):** Used for primary actions, progress indicators, and celebratory states. It is desaturated slightly from the light mode version to prevent vibrating against dark backgrounds.
- **Secondary (Mint Soda):** Used for success states, "correct" indicators in quizzes, and secondary highlights.
- **Tertiary (Periwinkle):** Used for informational accents and vocabulary categories.
- **Neutral/Surface:** The base is a deep charcoal-indigo (`#1A1B26`). Elevated surfaces use lighter shades of this navy to create hierarchy.
- **Text:** Primary text is a warm off-white to reduce the harshness of pure white-on-black contrast.

## Typography

The typography leverages the soft, rounded terminals of **Plus Jakarta Sans** to maintain the "Kawaii" feel. It is approachable and modern, with a high x-height for legibility in dark mode. 

**Space Grotesk** is used sparingly for labels and technical data (like stroke counts or progress percentages) to provide a subtle "tech-learning" edge. For Japanese characters (Hiragana/Katakana/Kanji), use a weight that matches the surrounding English text to maintain visual balance.

## Layout & Spacing

The system uses a **Fluid Grid** with generous inner padding to give content room to breathe, which is essential for complex character recognition.

- **Mobile:** 4-column grid, 16px margins. Components are usually full-width or side-by-side tiles.
- **Tablet/Desktop:** 12-column grid, 24px margins. Lessons and quizzes are centered in a maximum 800px container to reduce eye travel.
- **Rhythm:** An 8px base unit governs all padding and margins. Vertical rhythm is relaxed (`stack-md`) to ensure the rounded shapes of containers don't feel cluttered.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Glassmorphism**, avoiding traditional drop shadows which can look muddy on dark backgrounds.

1.  **Level 0 (Base):** Deep Indigo (`#1A1B26`).
2.  **Level 1 (Cards/Containers):** A slightly lighter navy (`#24283B`) with a 1px soft border in a subtle pink or blue tint (10% opacity).
3.  **Level 2 (Modals/Popovers):** Semi-transparent surfaces with a `20px` backdrop blur, creating a "frosted glass" effect that allows the vibrant background colors to peek through.
4.  **Interactive:** Buttons use a "Squishy" effect—rather than moving "up" with shadows, they physically depress or scale slightly when tapped.

## Shapes

The shape language is consistently **Rounded**. 

- Standard components (Buttons, Inputs, Cards) use a **16px (1rem)** corner radius.
- Small elements (Chips, Tags) use **Pill-shaped** radii for maximum friendliness.
- This design system avoids sharp corners entirely to reinforce the soft, non-intimidating nature of the learning experience.

## Components

- **Buttons:** Primary buttons are pill-shaped, filled with Sakura Pink, using dark navy text for high contrast. Secondary buttons use a thick 2px Mint border with no fill.
- **Character Cards:** Large, rounded squares with a subtle inner glow. The Japanese character is centered and uses the Primary color.
- **Progress Bars:** Thick, rounded tracks. The unfilled portion is a dark translucent grey; the filled portion is a vibrant Mint-to-Pink gradient.
- **Input Fields:** Darker than the card background to create a "inset" look. The focus state uses a 2px Sakura Pink glow.
- **Chips/Badges:** Small, pill-shaped markers for difficulty levels (N5, N4, etc.). Use Tertiary (Periwinkle) backgrounds with high-contrast white text.
- **Lists:** Clean rows separated by subtle dividers (10% white opacity). Each list item should have a trailing "chevron" icon for navigability.
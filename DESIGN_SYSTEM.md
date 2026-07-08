# CodeKraft v1 Design System

Version: 2026
Goal: Build one of the most beautiful software company websites.

## Principles

- CodeKraft should feel like an operating system, not a brochure.
- Each page behaves like opening a module or source file.
- Every component has one responsibility.
- No component should define raw brand colors. Use tokens from `styles/theme.ts` and CSS variables in `app/globals.css`.
- Desktop is designed first, but every breakpoint must feel intentional.

## Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#050816` | App background |
| `surface` | `#070B18` | Elevated panels |
| `surfaceSoft` | `#0B1022` | Code cards, nav glass |
| `primary` | `#4F8CFF` | Active links, primary glow |
| `secondary` | `#6B5CFF` | Gradient accent |
| `cyan` | `#00D9FF` | Technical highlights |
| `violet` | `#8B5CFF` | Hero emphasis |
| `text` | `#F8F9FC` | Main text |
| `muted` | `#8B95A7` | Body copy |
| `border` | `rgba(111, 140, 255, 0.28)` | Hairline borders |

## Typography

- Heading: Geist or system fallback until local font files are added.
- Body: Inter or system fallback until local font files are added.
- Code: JetBrains Mono or `Cascadia Code`, `SFMono-Regular`, Consolas fallback.

Scale:

- Hero: `clamp(3rem, 6vw, 6rem)`
- H1: `clamp(2.5rem, 5vw, 5rem)`
- H2: `clamp(2rem, 3vw, 3.5rem)`
- Body: `1rem`
- Small: `0.875rem`
- Micro/code: `0.75rem`

## Spacing

- Page padding desktop: `4rem`
- Page padding tablet: `2rem`
- Page padding mobile: `1.25rem`
- Section gap: `6rem`
- Component gap: `1.5rem`
- Tight gap: `0.75rem`

## Radius

- Buttons: `0.5rem`
- Cards: `0.75rem`
- Large visual panels: `1rem`
- Logo mark: `0.625rem`

## Shadows And Glow

- Primary glow: cyan/blue outer glow, subtle and directional.
- Violet glow: used only for hero emphasis and holographic visuals.
- Cards should use border plus low opacity background, not heavy shadows.

## Motion

- Standard duration: `220ms`
- Slow reveal: `700ms`
- Hero visual drift: `12s+`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Breakpoints

- 1920: cinematic desktop composition.
- 1440: default desktop.
- 1024: preserve hero split layout.
- 768: stack hero copy and visual.
- 480: simplify labels, keep primary CTA visible.

## Interaction Patterns

- Navigation labels use file/module syntax: `<home>`.
- Active nav uses underline plus blue text.
- Buttons use code-like lowercase copy.
- Hero tags use slash syntax: `< clean code />`.
- Contact and CTA language remains concise and technical.

## Build Order

1. Project Setup
2. Design System
3. Navbar
4. Hero
5. About
6. Services
7. Portfolio
8. Process
9. Technology
10. Testimonials
11. Contact
12. Footer
13. Loading Screen
14. Animations
15. SEO
16. Deployment

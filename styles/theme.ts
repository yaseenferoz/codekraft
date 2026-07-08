export const colors = {
  background: "#050816",
  surface: "#070B18",
  surfaceSoft: "#0B1022",
  primary: "#4F8CFF",
  secondary: "#6B5CFF",
  cyan: "#00D9FF",
  violet: "#8B5CFF",
  text: "#F8F9FC",
  muted: "#8B95A7",
  border: "rgba(111, 140, 255, 0.28)",
} as const;

export const typography = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
  code: "var(--font-code)",
} as const;

export const spacing = {
  pageDesktop: "4rem",
  pageTablet: "2rem",
  pageMobile: "1.25rem",
  section: "6rem",
  component: "1.5rem",
  tight: "0.75rem",
} as const;

export const motion = {
  fast: "160ms",
  standard: "220ms",
  reveal: "700ms",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

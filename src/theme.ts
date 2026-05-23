export const colors = {
  background: "#0f0f0f",
  backgroundEnd: "#1a1816",
  surface: "#242220",
  surfaceElevated: "#2e2b28",
  foreground: "#f5f0e8",
  muted: "#a39e94",
  textSubtle: "#807b72",
  accent: "#c9a227",
  accentBright: "#e8b84a",
  accentMuted: "rgba(201, 162, 39, 0.40)",
  gcash: "#007dfe",
  accentGlow: "rgba(201, 162, 39, 0.35)",
  borderSubtle: "rgba(46, 43, 40, 0.60)",
  error: "#e85d5d",
  success: "#5de88a",
  warning: "#f0a030",
  info: "#5da5e8",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  fontSans: "DMSans",
  fontDisplay: "Fraunces",
  sizes: {
    xs: { fontSize: 11, lineHeight: 16 },
    sm: { fontSize: 13, lineHeight: 18 },
    base: { fontSize: 15, lineHeight: 22 },
    lg: { fontSize: 17, lineHeight: 24 },
    xl: { fontSize: 20, lineHeight: 28 },
    "2xl": { fontSize: 24, lineHeight: 32 },
    "3xl": { fontSize: 32, lineHeight: 40 },
  },
} as const;

export const durations = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const easings = {
  standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
  accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
  spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

export const shadows = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.45), 0 4px 8px rgba(0, 0, 0, 0.3)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)",
  glow: "0 0 40px rgba(201, 162, 39, 0.35)",
  glowLg: "0 0 56px rgba(201, 162, 39, 0.45)",
} as const;

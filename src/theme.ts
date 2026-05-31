// ─────────────────────────────────────────────────────────────────────────────
// ChairFlow design tokens — single source of truth.
//
// Layering:
//   1. `colors`        — raw palette primitives (hex / rgba).
//   2. `themes.dark`   — semantic role layer (bg / text / border / interactive …).
//                        Structured so a future `themes.light` is purely additive.
//   3. `spacing` / `radii` / `typeScale` / `shadowTokens` / `motion` / `fonts`
//                        — canonical scales consumed by web + mobile.
//
// `build-tokens.ts` reads these to emit `dist/tokens.css` for the Next apps; the
// mobile theme re-exports them directly. No app should hand-copy these values.
// ─────────────────────────────────────────────────────────────────────────────

/** Raw palette primitives. The only place literal brand hex values may live. */
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
  borderStrong: "rgba(201, 162, 39, 0.28)",
  error: "#e85d5d",
  success: "#5de88a",
  warning: "#f0a030",
  info: "#5da5e8",
} as const;

// ── Semantic role layer ──────────────────────────────────────────────────────
// Dark-only ships now. The shape is intentionally theme-keyed so `themes.light`
// can be added later without touching consumers (`themes.dark.surface.raised`).

export type SemanticTheme = {
  bg: { base: string; end: string; surface: string; raised: string };
  text: { primary: string; muted: string; subtle: string; onAccent: string };
  border: { subtle: string; strong: string };
  interactive: {
    primary: string;
    primaryHover: string;
    focusRing: string;
  };
  feedback: {
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  /** Brand cues — distinct from semantic feedback. GCash blue is a brand color. */
  brand: { gcash: string };
};

export const themes = {
  dark: {
    bg: {
      base: colors.background,
      end: colors.backgroundEnd,
      surface: colors.surface,
      raised: colors.surfaceElevated,
    },
    text: {
      primary: colors.foreground,
      muted: colors.muted,
      subtle: colors.textSubtle,
      onAccent: colors.background,
    },
    border: {
      subtle: colors.borderSubtle,
      strong: colors.borderStrong,
    },
    interactive: {
      primary: colors.accent,
      primaryHover: colors.accentBright,
      focusRing: colors.accentBright,
    },
    feedback: {
      error: colors.error,
      success: colors.success,
      warning: colors.warning,
      info: colors.info,
    },
    brand: {
      gcash: colors.gcash,
    },
  } satisfies SemanticTheme,
} as const;

/** The theme that ships today. */
export const semantic = themes.dark;

// ── Spacing & radii — canonical scale for ALL apps ──────────────────────────

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

// ── Typography ──────────────────────────────────────────────────────────────
// Font family names + the web CSS-var ↔ RN font-name mapping, centralized.

export const fonts = {
  /** RN font family name (loaded via expo-font). */
  sans: "DMSans",
  /** RN font family name (loaded via expo-font). */
  display: "Fraunces",
  /** CSS custom property next/font assigns for the sans face. */
  webSansVar: "--font-dm-sans",
  /** CSS custom property next/font assigns for the display face. */
  webDisplayVar: "--font-fraunces",
  /** Web fallback stacks. */
  webSansStack: "system-ui, sans-serif",
  webDisplayStack: "Georgia, serif",
} as const;

export type TypeStep = {
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  fontWeight?: number;
};

/**
 * Canonical type scale (px). Web converts px→rem at consume time; mobile uses px
 * directly. Existing keys (xs…3xl) are preserved; display steps are additive.
 */
export const typeScale = {
  xs: { fontSize: 11, lineHeight: 16, letterSpacing: 0.2 },
  sm: { fontSize: 13, lineHeight: 18 },
  base: { fontSize: 15, lineHeight: 22 },
  lg: { fontSize: 17, lineHeight: 24 },
  xl: { fontSize: 20, lineHeight: 28, letterSpacing: -0.2 },
  "2xl": { fontSize: 24, lineHeight: 32, letterSpacing: -0.3, fontWeight: 600 },
  "3xl": { fontSize: 32, lineHeight: 40, letterSpacing: -0.5, fontWeight: 600 },
  "4xl": { fontSize: 40, lineHeight: 46, letterSpacing: -0.6, fontWeight: 600 },
  "5xl": { fontSize: 52, lineHeight: 56, letterSpacing: -0.8, fontWeight: 600 },
} as const satisfies Record<string, TypeStep>;

/**
 * Semantic typography presets pairing a type step with a font family. Mobile
 * `<Display>`/`<Title>`/`<Body>`/`<Caption>` and web headings consume these.
 */
export const typePresets = {
  display: { step: "5xl", family: "display" },
  displaySm: { step: "4xl", family: "display" },
  title: { step: "3xl", family: "display" },
  titleSm: { step: "2xl", family: "display" },
  heading: { step: "xl", family: "sans" },
  body: { step: "base", family: "sans" },
  bodyLg: { step: "lg", family: "sans" },
  caption: { step: "sm", family: "sans" },
  overline: { step: "xs", family: "sans" },
} as const satisfies Record<string, { step: keyof typeof typeScale; family: "sans" | "display" }>;

/** @deprecated Use `typeScale` + `fonts`. Kept for backward compatibility. */
export const typography = {
  fontSans: fonts.sans,
  fontDisplay: fonts.display,
  sizes: typeScale,
} as const;

// ── Motion ───────────────────────────────────────────────────────────────────

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

/**
 * Named motion presets. Web maps `variants`/`durations` to Framer Motion; mobile
 * maps `spring`/`press` to Reanimated `withSpring`/`withTiming`. All motion must
 * degrade under `prefers-reduced-motion` / Reduce Motion at the consumer.
 */
export const motion = {
  durations,
  easings,
  /** Reanimated-style spring configs (also usable as Framer `transition`). */
  spring: {
    press: { damping: 18, stiffness: 220, mass: 0.7 },
    enter: { damping: 22, stiffness: 180, mass: 0.9 },
    gentle: { damping: 26, stiffness: 120, mass: 1 },
  },
  /** Press affordance shared web↔mobile. */
  press: { scale: 0.97 },
  /** Framer Motion variant library. */
  variants: {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 },
    },
    /** Apply to a list container; children use `fadeInUp`. */
    staggerContainer: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
    },
  },
} as const;

// ── Shadows — single source → CSS strings + RN native objects ────────────────

type ShadowLayer = { x: number; y: number; blur: number; color: string };

type NativeShadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

type ShadowToken = { css: ShadowLayer[]; native: NativeShadow };

/** The one shadow source. Both `shadows` (CSS) and `nativeShadows` derive from it. */
export const shadowTokens = {
  sm: {
    css: [
      { x: 0, y: 1, blur: 3, color: "rgba(0, 0, 0, 0.4)" },
      { x: 0, y: 1, blur: 2, color: "rgba(0, 0, 0, 0.3)" },
    ],
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
  },
  md: {
    css: [
      { x: 0, y: 4, blur: 12, color: "rgba(0, 0, 0, 0.4)" },
      { x: 0, y: 2, blur: 4, color: "rgba(0, 0, 0, 0.3)" },
    ],
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  lg: {
    css: [
      { x: 0, y: 8, blur: 24, color: "rgba(0, 0, 0, 0.45)" },
      { x: 0, y: 4, blur: 8, color: "rgba(0, 0, 0, 0.3)" },
    ],
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  xl: {
    css: [
      { x: 0, y: 16, blur: 48, color: "rgba(0, 0, 0, 0.5)" },
      { x: 0, y: 8, blur: 16, color: "rgba(0, 0, 0, 0.3)" },
    ],
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 12,
    },
  },
  glowSm: {
    css: [{ x: 0, y: 0, blur: 20, color: "rgba(201, 162, 39, 0.22)" }],
    native: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
      elevation: 4,
    },
  },
  glow: {
    css: [{ x: 0, y: 0, blur: 40, color: "rgba(201, 162, 39, 0.35)" }],
    native: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 8,
    },
  },
  glowLg: {
    css: [{ x: 0, y: 0, blur: 56, color: "rgba(201, 162, 39, 0.45)" }],
    native: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.45,
      shadowRadius: 28,
      elevation: 10,
    },
  },
} as const satisfies Record<string, ShadowToken>;

function layerToCss(layer: ShadowLayer): string {
  return `${layer.x}px ${layer.y}px ${layer.blur}px ${layer.color}`;
}

function toCssShadow(token: ShadowToken): string {
  return token.css.map(layerToCss).join(", ");
}

type ShadowKey = keyof typeof shadowTokens;

/** CSS `box-shadow` strings derived from `shadowTokens`. */
export const shadows = Object.fromEntries(
  (Object.keys(shadowTokens) as ShadowKey[]).map((key) => [
    key,
    toCssShadow(shadowTokens[key]),
  ]),
) as Record<ShadowKey, string>;

/** React Native shadow objects derived from `shadowTokens`. */
export const nativeShadows = Object.fromEntries(
  (Object.keys(shadowTokens) as ShadowKey[]).map((key) => [
    key,
    shadowTokens[key].native,
  ]),
) as Record<ShadowKey, NativeShadow>;

/**
 * Scissors-cut loader tokens — timing + geometry shared across admin (CSS
 * keyframes) and stylist (Reanimated). CSS can't import TS, so the web loader
 * hardcodes the matching numeric values; they MUST stay in sync with this
 * source of truth.
 *
 * Not every token is consumed identically on both platforms: the web loader
 * drives clipping cadence from `durations.clippingFall`, while the mobile loader
 * intentionally derives clipping cadence from its snip sequence and does not
 * read `clippingFall`. The token remains the source of truth for web.
 */
export const scissorsLoader = {
  /** Pixel diameter of the loader by size variant. */
  sizes: {
    sm: 28,
    md: 48,
    lg: 72,
  },
  /** Animation phase durations in milliseconds. */
  durations: {
    /** Full strand-cut cycle (scissors travel from top to bottom). */
    cutLoop: 2000,
    /** Scissor blades opening before a snip. */
    snipOpen: 110,
    /** Scissor blades closing on a snip. */
    snipClose: 110,
    /** Pause between snip bursts within the cut loop. */
    snipHold: 520,
    /** Time for a cut clipping to fall and fade out. */
    clippingFall: 760,
  },
  /** Geometry ratios expressed as a fraction of the loader size. */
  ratios: {
    /** Hair strand column height. */
    hairHeight: 0.85,
    /** Width of a single strand. */
    strandWidth: 0.06,
    /** Vertical distance the scissors travel (fraction of hairHeight). */
    scissorsTravel: 0.72,
    /** Scissors glyph size. */
    scissorsSize: 0.55,
  },
} as const;

export type ScissorsLoaderTokens = typeof scissorsLoader;

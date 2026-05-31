/** Animation timing aligned across admin (CSS) and stylist (Animated). */
export const skeletonDurations = {
  shimmer: 1800,
  pulse: 900,
} as const;

/** Layout recipe dimensions (px) — per-platform components mirror these. */
export const skeletonLayouts = {
  statCard: {
    labelHeight: 12,
    valueHeight: 32,
    hintHeight: 12,
    padding: 20,
    borderRadius: 16,
  },
  ticketRow: {
    titleHeight: 14,
    metaHeight: 10,
    badgeHeight: 18,
    padding: 12,
    borderRadius: 10,
  },
  tableRow: {
    cellHeight: 14,
    rowHeight: 48,
    rowCount: 6,
  },
  pageHeader: {
    titleHeight: 28,
    descriptionHeight: 14,
    descriptionWidthPercent: 70,
  },
  ticketDetail: {
    headerHeight: 32,
    lineItemHeight: 44,
    lineItemCount: 4,
    chipHeight: 56,
    chipCount: 3,
  },
} as const;

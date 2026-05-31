import type { EarningsPeriod } from "./types.js";

/** TanStack Query key factory — scope with shopSlug where data is shop-specific. */
export const queryKeys = {
  me: (shopSlug?: string | null) =>
    shopSlug ? (["me", shopSlug] as const) : (["me"] as const),

  tickets: (shopSlug?: string | null, status?: string) =>
    status
      ? (["tickets", shopSlug ?? "", status] as const)
      : shopSlug
        ? (["tickets", shopSlug] as const)
        : (["tickets"] as const),

  ticket: (id: string, shopSlug?: string | null) =>
    shopSlug
      ? (["ticket", id, shopSlug] as const)
      : (["ticket", id] as const),

  services: (shopSlug?: string | null) =>
    shopSlug
      ? (["services", shopSlug] as const)
      : (["services"] as const),

  earnings: (period: EarningsPeriod, shopSlug?: string | null) =>
    shopSlug
      ? (["earnings", period, shopSlug] as const)
      : (["earnings", period] as const),

  payouts: (shopSlug?: string | null) =>
    shopSlug
      ? (["payouts", shopSlug] as const)
      : (["payouts"] as const),

  stylistShops: (token?: string) =>
    token
      ? (["stylist-shops", token] as const)
      : (["stylist-shops"] as const),

  invitePreview: (token: string) => ["invite-preview", token] as const,
} as const;

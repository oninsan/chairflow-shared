// ─────────────────────────────────────────────────────────────────────────────
// Status / badge taxonomy — cross-platform contract.
//
// Maps every domain status/plan/priority/payment enum to `{ label, tone }` so the
// web `Badge` and the mobile `Badge` render identical semantics. Tones map to the
// semantic feedback roles (`themes.dark.feedback`) plus neutral/accent/brand.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Plan,
  ShopStatus,
  StylistStatus,
  PosTicketStatus,
  PayoutBatchStatus,
  PaymentMethod,
} from "./types.js";

/** Visual tone for a badge/pill. Consumers map this to colors via semantic tokens. */
export type BadgeTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "brand";

export type BadgeDescriptor = { label: string; tone: BadgeTone };

const FALLBACK: BadgeDescriptor = { label: "Unknown", tone: "neutral" };

function titleCase(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function posTicketStatusBadge(status: PosTicketStatus): BadgeDescriptor {
  switch (status) {
    case "draft":
      return { label: "Draft", tone: "neutral" };
    case "ready_for_payment":
      return { label: "Ready for payment", tone: "info" };
    case "paid":
      return { label: "Paid", tone: "success" };
    case "voided":
      return { label: "Voided", tone: "danger" };
    default:
      return FALLBACK;
  }
}

export function planBadge(plan: Plan): BadgeDescriptor {
  switch (plan) {
    case "starter":
      return { label: "Starter", tone: "neutral" };
    case "growth":
      return { label: "Growth", tone: "info" };
    case "pro":
      return { label: "Pro", tone: "accent" };
    default:
      return FALLBACK;
  }
}

/** Accepts the shared `ShopStatus` and core's extra `pending` state. */
export function shopStatusBadge(status: ShopStatus | "pending"): BadgeDescriptor {
  switch (status) {
    case "pending":
      return { label: "Pending", tone: "warning" };
    case "active":
      return { label: "Active", tone: "success" };
    case "suspended":
      return { label: "Suspended", tone: "danger" };
    default:
      return FALLBACK;
  }
}

export function stylistStatusBadge(status: StylistStatus): BadgeDescriptor {
  switch (status) {
    case "active":
      return { label: "Active", tone: "success" };
    case "inactive":
      return { label: "Inactive", tone: "neutral" };
    case "invited":
      return { label: "Invited", tone: "info" };
    default:
      return FALLBACK;
  }
}

export function payoutBatchStatusBadge(
  status: PayoutBatchStatus,
): BadgeDescriptor {
  switch (status) {
    case "draft":
      return { label: "Draft", tone: "neutral" };
    case "completed":
      return { label: "Completed", tone: "success" };
    default:
      return FALLBACK;
  }
}

export type BillingStatus = "draft" | "invoiced" | "paid";

export function billingStatusBadge(status: BillingStatus): BadgeDescriptor {
  switch (status) {
    case "draft":
      return { label: "Draft", tone: "neutral" };
    case "invoiced":
      return { label: "Invoiced", tone: "info" };
    case "paid":
      return { label: "Paid", tone: "success" };
    default:
      return FALLBACK;
  }
}

export type SupportTicketStatus = "open" | "closed";

export function supportTicketStatusBadge(
  status: SupportTicketStatus,
): BadgeDescriptor {
  switch (status) {
    case "open":
      return { label: "Open", tone: "info" };
    case "closed":
      return { label: "Closed", tone: "neutral" };
    default:
      return FALLBACK;
  }
}

export type SupportPriority = "low" | "normal" | "high" | "urgent";

export function supportPriorityBadge(priority: string): BadgeDescriptor {
  switch (priority) {
    case "low":
      return { label: "Low", tone: "neutral" };
    case "normal":
      return { label: "Normal", tone: "info" };
    case "high":
      return { label: "High", tone: "warning" };
    case "urgent":
      return { label: "Urgent", tone: "danger" };
    default:
      return { label: titleCase(priority), tone: "neutral" };
  }
}

export function paymentMethodBadge(method: PaymentMethod): BadgeDescriptor {
  switch (method) {
    case "gcash":
      return { label: "GCash", tone: "brand" };
    case "cash":
      return { label: "Cash", tone: "neutral" };
    default:
      return FALLBACK;
  }
}

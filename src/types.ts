export type Plan = "starter" | "growth" | "pro";
export type ShopStatus = "active" | "suspended";

export type PosTicketStatus =
  | "draft"
  | "ready_for_payment"
  | "paid"
  | "voided";

export type PaymentMethod = "cash" | "gcash";

export type AllocationType =
  | "stylist_commission"
  | "stylist_tip"
  | "shop_share"
  | "platform_fee";

export type StylistStatus = "active" | "inactive" | "invited";

export type PayoutBatchStatus = "draft" | "completed";

export type EarningsPeriod = "today" | "week" | "month";

export type ShopDto = {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  status: ShopStatus;
  stylistLimit: number;
  gcashDisplayName: string | null;
  gcashMobile: string | null;
  ownerEmail: string | null;
  createdAt: string;
};

export type StylistDto = {
  id: string;
  shopId: string;
  name: string;
  commissionPercent: string;
  gcashMobile: string | null;
  phone: string | null;
  userId: string | null;
  status: StylistStatus;
  invitedAt: string | null;
  inviteExpiresAt: string | null;
  createdAt: string;
};

export type StylistMembership = {
  stylistId: string;
  shopSlug: string;
  shopName: string;
  stylistName: string;
  status: StylistStatus;
};

export type StylistShopsResponse = {
  shops: StylistMembership[];
};

export type RedeemInviteResponse = {
  stylistId: string;
  shopSlug: string;
  shopName: string;
  stylistName: string;
};

export type CreateStylistInviteResponse = {
  stylist: StylistDto;
  inviteToken: string;
};

export type ServiceDto = {
  id: string;
  shopId: string;
  name: string;
  priceCents: number;
  defaultCommissionPercent: string | null;
  isActive: boolean;
  createdAt: string;
};

export type PosLineItemDto = {
  id: string;
  ticketId: string;
  serviceId: string | null;
  description: string;
  quantity: number;
  unitPriceCents: number;
  commissionPercent: string;
};

export type PosTipDto = {
  id: string;
  ticketId: string;
  stylistId: string;
  amountCents: number;
};

export type PosPaymentDto = {
  id: string;
  ticketId: string;
  method: PaymentMethod;
  amountCents: number;
  gcashRef: string | null;
  createdAt: string;
};

export type PosAllocationDto = {
  id: string;
  ticketId: string;
  stylistId: string | null;
  type: AllocationType;
  amountCents: number;
};

export type PosTicketDto = {
  id: string;
  shopId: string;
  stylistId: string;
  stylistName: string;
  status: PosTicketStatus;
  subtotalCents: number;
  discountCents: number;
  tipTotalCents: number;
  platformFeePercent: string | null;
  platformFeeCents: number;
  lineItems: PosLineItemDto[];
  tips: PosTipDto[];
  payments: PosPaymentDto[];
  allocations: PosAllocationDto[];
  createdAt: string;
  paidAt: string | null;
  voidedAt: string | null;
};

export type PayoutBatchLineDto = {
  id: string;
  batchId: string;
  stylistId: string;
  stylistName: string;
  amountCents: number;
  markedPaidAt: string | null;
};

export type PayoutBatchDto = {
  id: string;
  shopId: string;
  status: PayoutBatchStatus;
  periodStart: string;
  periodEnd: string;
  lines: PayoutBatchLineDto[];
  createdAt: string;
};

export type StylistPayable = {
  stylistId: string;
  stylistName: string;
  commissionCents: number;
  tipCents: number;
  totalCents: number;
  paidCents: number;
  owedCents: number;
};

export type StylistMeResponse = {
  stylist: StylistDto;
  shop: Pick<ShopDto, "id" | "name" | "slug">;
};

export type EarningsSummary = {
  period: EarningsPeriod;
  commissionCents: number;
  tipCents: number;
  totalCents: number;
  ticketCount: number;
};

export type TipHistoryItem = {
  ticketId: string;
  amountCents: number;
  paidAt: string | null;
  paymentMethod: PaymentMethod | null;
};

export type StylistPayoutsResponse = {
  payable: StylistPayable;
  history: PayoutBatchLineDto[];
};

export type CreateTicketInput = {
  shopId: string;
  stylistId: string;
};

export type AddLineItemInput = {
  ticketId: string;
  serviceId?: string;
  description: string;
  quantity: number;
  unitPriceCents: number;
  commissionPercent: string;
};

export type AddTipInput = {
  ticketId: string;
  stylistId: string;
  amountCents: number;
};

export const DEMO_SHOP_ID = "00000000-0000-4000-8000-000000000001";
export const DEMO_SHOP_SLUG = "demo-shop";

export const SLUG_REGEX = /^[a-z0-9-]+$/;

export const slugErrorMessage =
  "Use lowercase letters, numbers, and hyphens only";

export const PH_MOBILE_REGEX = /^(\+63|0)9\d{9}$/;

export const phMobileErrorMessage =
  "Enter a valid PH mobile number (e.g. 09XXXXXXXXX)";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ERROR_MESSAGES = {
  invalidEmail: "Enter a valid email address",
  invalidTip: "Enter a valid tip amount",
  invalidPrice: "Enter a valid price",
  negativeAmount: "Amount cannot be negative",
  priceRequired: "Price is required",
} as const;

export function parsePesoInput(
  value: string,
): { ok: true; cents: number } | { ok: false; message: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: false, message: ERROR_MESSAGES.priceRequired };
  }
  if (trimmed.includes("-")) {
    return { ok: false, message: ERROR_MESSAGES.negativeAmount };
  }

  const cleaned = trimmed.replace(/[^0-9.]/g, "");
  if (!cleaned || cleaned === ".") {
    return { ok: false, message: ERROR_MESSAGES.invalidPrice };
  }

  const num = Number.parseFloat(cleaned);
  if (Number.isNaN(num)) {
    return { ok: false, message: ERROR_MESSAGES.invalidPrice };
  }
  if (num < 0) {
    return { ok: false, message: ERROR_MESSAGES.negativeAmount };
  }

  return { ok: true, cents: Math.round(num * 100) };
}

export function normalizePhMobile(value: string): string {
  return value.replace(/\s/g, "");
}

export function isValidPhMobile(value: string): boolean {
  return PH_MOBILE_REGEX.test(normalizePhMobile(value));
}

/** Normalize PH mobile to E.164 (+63…) for storage and Supabase OTP. */
export function toE164PhMobile(value: string): string {
  const normalized = normalizePhMobile(value);
  if (normalized.startsWith("+63")) return normalized;
  if (normalized.startsWith("0")) return `+63${normalized.slice(1)}`;
  return normalized;
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return EMAIL_REGEX.test(trimmed);
}

/** Normalize invite email for storage and comparison. */
export function normalizeInviteEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Practical RFC subset for stylist invite emails. */
export function isValidInviteEmail(value: string): boolean {
  return isValidEmail(value);
}

/** Mask email for invite preview UI (e.g. j••••@gmail.com). */
export function maskEmail(email: string): string {
  const normalized = normalizeInviteEmail(email);
  const atIndex = normalized.indexOf("@");
  if (atIndex <= 0) return "••••";
  const local = normalized.slice(0, atIndex);
  const domain = normalized.slice(atIndex);
  const maskedLocal = local.length <= 1 ? "••••" : `${local[0]}••••`;
  return `${maskedLocal}${domain}`;
}

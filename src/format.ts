import { parsePesoInput } from "./validation.js";

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPeso(cents: number): string {
  return pesoFormatter.format(cents / 100);
}

/** Parse peso text to cents; returns 0 when input is empty or invalid. */
export function parsePesoToCents(value: string): number {
  const result = parsePesoInput(value);
  return result.ok ? result.cents : 0;
}

export function formatPercent(decimal: string): string {
  const value = Number.parseFloat(decimal);
  if (Number.isNaN(value)) return "—";
  return `${Math.round(value * 100)}%`;
}

export function formatTicketStatus(status: string): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "ready_for_payment":
      return "Ready for payment";
    case "paid":
      return "Paid";
    case "voided":
      return "Voided";
    default:
      return status;
  }
}

export function formatPaymentLabel(
  method: "cash" | "gcash" | null,
): string {
  if (!method) return "";
  return method === "gcash" ? "GCash" : "Cash";
}

export function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

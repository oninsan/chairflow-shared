import { describe, expect, it } from "vitest";
import {
  formatPaymentLabel,
  formatPercent,
  formatPeso,
  formatTicketStatus,
  greetingForHour,
  parsePesoToCents,
} from "./format.js";

describe("formatPeso", () => {
  it("formats cents as PHP currency", () => {
    expect(formatPeso(15000)).toContain("150");
    expect(formatPeso(15000)).toMatch(/₱|PHP/);
  });
});

describe("parsePesoToCents", () => {
  it("parses peso strings to integer cents", () => {
    expect(parsePesoToCents("150")).toBe(15000);
    expect(parsePesoToCents("₱1,234.56")).toBe(123456);
  });

  it("returns 0 for invalid input", () => {
    expect(parsePesoToCents("")).toBe(0);
    expect(parsePesoToCents("abc")).toBe(0);
  });
});

describe("formatPercent", () => {
  it("converts decimal string to whole percent", () => {
    expect(formatPercent("0.6")).toBe("60%");
  });

  it("returns em dash for invalid input", () => {
    expect(formatPercent("not-a-number")).toBe("—");
  });
});

describe("formatTicketStatus", () => {
  it("maps known statuses", () => {
    expect(formatTicketStatus("ready_for_payment")).toBe("Ready for payment");
    expect(formatTicketStatus("paid")).toBe("Paid");
  });
});

describe("formatPaymentLabel", () => {
  it("labels payment methods", () => {
    expect(formatPaymentLabel("gcash")).toBe("GCash");
    expect(formatPaymentLabel("cash")).toBe("Cash");
    expect(formatPaymentLabel(null)).toBe("");
  });
});

describe("greetingForHour", () => {
  it("picks time-of-day greeting", () => {
    expect(greetingForHour(8)).toBe("Good morning");
    expect(greetingForHour(14)).toBe("Good afternoon");
    expect(greetingForHour(20)).toBe("Good evening");
  });
});

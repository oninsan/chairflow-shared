import { describe, expect, it } from "vitest";
import {
  ERROR_MESSAGES,
  isValidEmail,
  isValidPhMobile,
  normalizePhMobile,
  parsePesoInput,
  SLUG_REGEX,
} from "./validation.js";

describe("parsePesoInput", () => {
  it("parses peso strings to cents", () => {
    expect(parsePesoInput("350")).toEqual({ ok: true, cents: 35000 });
    expect(parsePesoInput("₱1,234.56")).toEqual({ ok: true, cents: 123456 });
  });

  it("rejects empty and invalid values", () => {
    expect(parsePesoInput("")).toEqual({
      ok: false,
      message: ERROR_MESSAGES.priceRequired,
    });
    expect(parsePesoInput("abc")).toEqual({
      ok: false,
      message: ERROR_MESSAGES.invalidPrice,
    });
  });

  it("rejects negative amounts", () => {
    expect(parsePesoInput("-50")).toEqual({
      ok: false,
      message: ERROR_MESSAGES.negativeAmount,
    });
  });

  it("allows zero", () => {
    expect(parsePesoInput("0")).toEqual({ ok: true, cents: 0 });
  });
});

describe("normalizePhMobile", () => {
  it("strips spaces", () => {
    expect(normalizePhMobile("09 12 345 6789")).toBe("09123456789");
  });
});

describe("isValidPhMobile", () => {
  it("accepts 09XXXXXXXXX and +639XXXXXXXXX", () => {
    expect(isValidPhMobile("09123456789")).toBe(true);
    expect(isValidPhMobile("+639123456789")).toBe(true);
  });

  it("rejects invalid numbers", () => {
    expect(isValidPhMobile("08123456789")).toBe(false);
    expect(isValidPhMobile("09123")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("validates basic email shape", () => {
    expect(isValidEmail("you@shop.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("SLUG_REGEX", () => {
  it("matches lowercase slugs", () => {
    expect(SLUG_REGEX.test("my-shop-1")).toBe(true);
    expect(SLUG_REGEX.test("My Shop")).toBe(false);
  });
});

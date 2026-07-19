import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, formatStatus } from "@/lib/formatters";

describe("formatters", () => {
  it("formats hyphenated and underscored statuses", () => {
    expect(formatStatus("ready-for_review")).toBe("Ready For Review");
  });

  it("formats currency values", () => {
    expect(formatCurrency(25000, "USD")).toBe("$25,000");
  });

  it("returns a fallback for missing dates", () => {
    expect(formatDate()).toBe("Not available");
  });

  it("formats valid dates for display", () => {
    expect(formatDate("2027-08-15T00:00:00.000Z")).toMatch(/Aug 15, 2027/);
  });
});

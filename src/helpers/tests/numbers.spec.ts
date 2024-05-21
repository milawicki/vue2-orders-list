import { formatLocalCurrency } from "@/helpers/number";

describe("formatLocalCurrency", () => {
  it("should format number to local currency", () => {
    expect(formatLocalCurrency(100, "PLN")).toBe("PLN 100.00");
  });
});

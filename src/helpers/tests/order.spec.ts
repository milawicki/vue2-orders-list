import { getStatus } from "@/helpers/order";

describe("helpers -> order", () => {
  describe("getStatus", () => {
    it("should return correct status", () => {
      expect(getStatus("active")).toBe("Aktywne");
      expect(getStatus("finished")).toBe("Zrealizowane");
      expect(getStatus("canceled")).toBe("Anulowane");
    });
  });
});

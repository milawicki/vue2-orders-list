import { includes, filterObjectArray } from "../objects";

describe("helpers -> objects", () => {
  describe("includes", () => {
    it("should check if object includes values", () => {
      const object = { a: 1, b: 2, c: 3 };
      const values = { a: 1 };
      expect(includes(object, values)).toBe(true);
    });

    it("should check if object includes nested values", () => {
      const object = { a: { b: 1, c: 2 }, d: 3 };
      const values = { a: { b: 1 } };
      expect(includes(object, values)).toBe(true);
    });

    it("should skip empty values", () => {
      const object = { a: "abc", b: 2, c: 3 };
      const values = { a: "", b: undefined };
      expect(includes(object, values)).toBe(true);
    });

    it("should check if object includes values in non-strict mode and return true if value is a present", () => {
      const object = { a: "abc" };
      const values = { a: "ab" };
      expect(includes(object, values, false)).toBe(true);
    });

    it("should check if object includes values in non-strict mode and return false if value is not a present", () => {
      const object = { a: "aaaaa" };
      const values = { a: "ab" };
      expect(includes(object, values, false)).toBe(false);
    });

    it("should check if object includes values (case insensitive) in non-strict mode", () => {
      const object = { a: "AAAAA" };
      const values = { a: "aa" };
      expect(includes(object, values, false)).toBe(true);
    });
  });

  describe("filterObjectArray", () => {
    it("should filter object array based on provided filters", () => {
      const orders = [
        { id: "1", value: 100, status: "active" },
        { id: "2", value: 200, status: "finished" },
        { id: "3", value: 300, status: "canceled" },
      ];
      const filters = { status: "finished" };

      const filteredOrders = filterObjectArray(orders, filters);

      expect(filteredOrders).toEqual([{ id: "2", value: 200, status: "finished" }]);
    });

    it("should filter object array based on provided filters in non-strict mode", () => {
      const orders = [
        { id: "1", value: 100, status: "active" },
        { id: "2", value: 200, status: "finished" },
        { id: "3", value: 300, status: "canceled" },
      ];
      const filters = { status: "fin" };

      const filteredOrders = filterObjectArray(orders, filters, false);

      expect(filteredOrders).toEqual([{ id: "2", value: 200, status: "finished" }]);
    });
  });
});

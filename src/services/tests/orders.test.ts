import { getOrders } from "../orders";
import fakeOrders from "../data/orders.json";
import type { DeepPartial, Order } from "@/types";

describe("getOrders", () => {
  it("should return first 10 orders when no filters are provided", () => {
    const orders = getOrders();

    expect(orders).toEqual({
      items: fakeOrders.slice(0, 10),
      totalItems: 50,
      currentPage: 1,
      itemsPerPage: 10,
    });
  });

  it("should return order from page 2", () => {
    const orders = getOrders(2);

    expect(orders).toEqual({
      items: fakeOrders.slice(10, 20),
      totalItems: 50,
      currentPage: 2,
      itemsPerPage: 10,
    });
  });

  describe("should return filtered orders", () => {
    it("by status", () => {
      const filters: DeepPartial<Order> = { status: "finished" };
      const orders = getOrders(undefined, filters);

      const filteredOrders = fakeOrders.filter((order) => order.status === "finished").slice(0, 10);

      expect(orders).toEqual({
        items: filteredOrders,
        totalItems: 17,
        currentPage: 1,
        itemsPerPage: 10,
      });
    });

    it("by client lastname", () => {
      const filters: DeepPartial<Order> = { client: { lastname: "Last11" } };
      const orders = getOrders(undefined, filters);

      expect(orders).toEqual({
        items: [
          {
            id: "ad315e3b-6b9d-4dc0-b3a4-b6d4ae1cc0f5",
            createdAt: "2024-01-11T00:00:00Z",
            value: 105.34,
            client: {
              id: "26dd6fa0-c631-41ad-9e22-e5adba9b6d36",
              email: "client11@example.com",
              firstname: "First11",
              lastname: "Last11",
            },
            status: "active",
          },
          ,
        ],
        totalItems: 1,
        currentPage: 1,
        itemsPerPage: 10,
      });
    });

    it("by id", () => {
      const filters: DeepPartial<Order> = { id: "d340b640-d330-431f-9c32-410d28b75ff8" };
      const orders = getOrders(undefined, filters);

      expect(orders).toEqual({
        items: [
          {
            id: "d340b640-d330-431f-9c32-410d28b75ff8",
            createdAt: "2024-01-10T00:00:00Z",
            value: 160.78,
            client: {
              id: "00b42df1-08d7-41af-9115-007d1f1b0534",
              email: "client10@example.com",
              firstname: "First10",
              lastname: "Last10",
            },
            status: "canceled",
          },
        ],
        totalItems: 1,
        currentPage: 1,
        itemsPerPage: 10,
      });
    });
  });
});

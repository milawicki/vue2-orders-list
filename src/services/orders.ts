import { filterObjectArray } from "@/helpers/objects";
import type { DeepPartial, Order } from "@/types";

import fakeOrders from "./data/orders.json";
import type { PaginatedItems } from "@/types/paginated-items";

const ITEMS_PER_PAGE = 10;

export function getOrders(page = 1, filters?: DeepPartial<Order>): PaginatedItems<Order> {
  let orders = fakeOrders as Order[];

  if (filters) {
    orders = filterObjectArray(orders, filters, false);
  }

  const totalItems = orders.length;

  if (page) {
    orders = paginateOrders(orders, page);
  }

  return {
    items: orders,
    totalItems,
    currentPage: page || 1,
    itemsPerPage: ITEMS_PER_PAGE,
  };
}

function paginateOrders(orders: Order[], page: number): Order[] {
  return orders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
}

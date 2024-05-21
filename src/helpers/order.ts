import type { OrderStatus } from "@/types";

export function getStatus(status: OrderStatus): string {
  const statuses = {
    active: "Aktywne",
    finished: "Zrealizowane",
    canceled: "Anulowane",
  };

  return statuses[status];
}

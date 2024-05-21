import type { DeepPartial } from "@/types";

export function includes<T>(object: T, values: DeepPartial<T>, strict: boolean = true): boolean {
  return Object.entries(values).every(([key, value]) => {
    if (!value) {
      return true;
    }

    if (typeof value === "object" && value !== null) {
      return includes(object[key as keyof T], value, strict);
    } else {
      return strict
        ? object[key as keyof T] === value
        : String(object[key as keyof T])
            ?.toLocaleLowerCase()
            .includes(String(value)?.toLocaleLowerCase());
    }
  });
}

export function filterObjectArray<T>(orders: T[], filters: DeepPartial<T>, strict: boolean = true): T[] {
  return orders.filter((order) => includes(order, filters, strict));
}

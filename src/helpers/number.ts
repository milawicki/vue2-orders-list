export function formatLocalCurrency(value: number, currency: string): string {
  return value.toLocaleString(undefined, { style: "currency", currency });
}

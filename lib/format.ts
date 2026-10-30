const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** Format a naira amount, e.g. 30000 -> "₦30,000". */
export function formatPrice(value: number): string {
  return naira.format(Number.isFinite(value) ? value : 0);
}

export function formatQuantity(value: number): string {
  return `${value} ${value === 1 ? "item" : "items"}`;
}

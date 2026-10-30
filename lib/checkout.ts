export const SHIPPING_FEE = 5_000;
export const FREE_SHIPPING_THRESHOLD = 200_000;
export const MAX_CART_QUANTITY = 10;

/** Flat nationwide shipping, free above the threshold. */
export function getShippingFee(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
}

export function getOrderTotal(subtotal: number): number {
  return subtotal + getShippingFee(subtotal);
}

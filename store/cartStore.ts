import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct, type Product } from "@/lib/data/products";
import { MAX_CART_QUANTITY } from "@/lib/checkout";

export type CartItem = {
  key: string;
  id: number;
  category: Product["category"];
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

export function cartItemKey(item: Pick<CartItem, "category" | "id" | "size">): string {
  return `${item.category}:${item.id}:${item.size}`;
}

/**
 * Always use the current catalog price. The stored price is only a fallback
 * for products that have since been removed from the catalog.
 */
export function getCartItemPrice(
  item: Pick<CartItem, "category" | "id" | "price">,
): number {
  return getProduct(item.category, item.id)?.price ?? item.price;
}

function clampQuantity(quantity: number): number {
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(quantity)));
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, quantity = 1) => {
        const resolvedSize = product.sizes.includes(size) ? size : product.sizes[0] ?? "One size";
        const key = cartItemKey({ category: product.category, id: product.id, size: resolvedSize });

        set((state) => {
          const existing = state.items.find((item) => item.key === key);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                key,
                id: product.id,
                category: product.category,
                name: product.name,
                price: product.price,
                image: product.image,
                size: resolvedSize,
                quantity: clampQuantity(quantity),
              },
            ],
          };
        });
      },

      removeItem: (key) => {
        set((state) => ({ items: state.items.filter((item) => item.key !== key) }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set((state) => ({ items: state.items.filter((item) => item.key !== key) }));
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "haven-cart-v2" },
  ),
);

export const selectCartCount = (state: CartStore): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state: CartStore): number =>
  state.items.reduce((total, item) => total + getCartItemPrice(item) * item.quantity, 0);

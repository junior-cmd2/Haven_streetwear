import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type cartProduct = {
    id: number;
    image: string;
    name: string;
    price: number | string;
    description: string
    quantity: number
    category: string;
}

type cartStore = {
    cartItem: cartProduct[]
    cartCount: number;
    addToCart: (product: Omit<cartProduct, "quantity">) => void;
    removeFromCart: (productId: number, category: string) => void;
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void;
    cartTotal: () => number
}

export const usecartStore = create<cartStore>()(
    persist((set, get) => ({
        cartItem: [],
        cartCount: 0,

        addToCart: (product) => {
            set((state) => {
                const existing = state.cartItem.find((item) => item.id === product.id)
                let updatedItems: cartProduct[];

                if (existing) {
                    updatedItems = state.cartItem.map((item) => item.id === product.id && item.category === product.category ? { ...item, quantity: item.quantity + 1 } : item)
                } else {
                    updatedItems = [...state.cartItem, { ...product, quantity: 1 }]
                }

                const newCount = updatedItems.reduce((sum, items) => sum + items.quantity, 0)

                return { cartItem: updatedItems, cartCount: newCount }
            })
        },

        removeFromCart: (productId, category) => {
            set((state) => {
                console.log("Trying to remove:", productId, category);
                console.log("Current cart:", state.cartItem);
                const updatedItems = state.cartItem.filter((item) => item.id !== productId || item.category !== category)
                const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)

                return { cartItem: updatedItems, cartCount: newCount }
            })
        },

        updateQuantity: (productId, quantity) => {
            set((state) => {
                
                let updatedItems: cartProduct[];
                if (quantity <= 0) {
                    updatedItems = state.cartItem.filter((item) => item.id !== productId);
                } else {
                    updatedItems = state.cartItem.map((item) => item.id === productId ? { ...item, quantity } : item)
                }
                const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

                return { cartItem: updatedItems, cartCount: newCount }
            })
        },

        clearCart: () => {
            set({ cartItem: [], cartCount: 0 })
        },

        cartTotal: () => {
            const { cartItem } = get();
            return cartItem.reduce(
                (sum, item) => sum + Number(item.price) * item.quantity, 0
            )
        },


    }), { name: "cart-storage" })
)
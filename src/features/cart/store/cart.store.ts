import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { clamp } from "@/lib/utils";
import type { CartItem, CartStore } from "../types";

export const CART_STORAGE_KEY = "storefront-cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        if (product.stock <= 0 || quantity <= 0) return;
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            const nextQty = clamp(
              existing.quantity + quantity,
              1,
              existing.maxQuantity,
            );
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: nextQty } : i,
              ),
            };
          }
          const item: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            unitPrice: product.price,
            currency: product.currency,
            imageUrl: product.imageUrl,
            quantity: clamp(quantity, 1, product.stock),
            maxQuantity: product.stock,
          };
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: clamp(quantity, 1, i.maxQuantity) }
                : i,
            ),
          };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      // Rehydrated manually on the client (see StoreProvider) to avoid SSR
      // hydration mismatches.
      skipHydration: true,
    },
  ),
);

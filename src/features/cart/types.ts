import type { CurrencyCode, Product } from "@/features/products/types";

export interface CartItem {
  readonly productId: string;
  readonly slug: string;
  readonly name: string;
  /** Unit price in minor units (cents). */
  readonly unitPrice: number;
  readonly currency: CurrencyCode;
  readonly imageUrl: string;
  readonly quantity: number;
  /** Upper bound taken from stock at the time the item was added. */
  readonly maxQuantity: number;
}

export interface CartState {
  readonly items: readonly CartItem[];
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export type CartStore = CartState & CartActions;

import type { CartStore } from "../types";

export const selectItems = (state: CartStore) => state.items;

export const selectItemCount = (state: CartStore): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

/** Subtotal in minor units (cents). */
export const selectSubtotal = (state: CartStore): number =>
  state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

export const selectActions = (state: CartStore) => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clear: state.clear,
});

"use client";

import { useShallow } from "zustand/react/shallow";
import type { CartItem } from "../types";
import {
  selectActions,
  selectItemCount,
  selectItems,
  selectSubtotal,
} from "../store/cart.selectors";
import { useCartStore } from "../store/cart.store";
import { useCartHydrated } from "./useCartHydrated";

const NO_ITEMS: readonly CartItem[] = [];

/**
 * Business-logic facade over the cart store. Values read as empty until the
 * persisted state has hydrated so server and client markup match.
 */
export function useCart() {
  const hydrated = useCartHydrated();
  const items = useCartStore(selectItems);
  const itemCount = useCartStore(selectItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const actions = useCartStore(useShallow(selectActions));

  return {
    hydrated,
    items: hydrated ? items : NO_ITEMS,
    itemCount: hydrated ? itemCount : 0,
    subtotal: hydrated ? subtotal : 0,
    ...actions,
  };
}

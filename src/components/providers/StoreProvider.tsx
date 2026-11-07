"use client";

import { useEffect, type ReactNode } from "react";
import { useCartStore } from "@/features/cart/store/cart.store";

/** Rehydrates persisted stores on the client after the first render. */
export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store/cart.store";

/** True once the persisted cart has been read from localStorage. */
export function useCartHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    if (useCartStore.persist.hasHydrated()) setHydrated(true);
    return unsubscribe;
  }, []);

  return hydrated;
}

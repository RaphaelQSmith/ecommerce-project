"use client";

import { BagIcon } from "@/components/ui/icons";
import { useUiStore } from "@/store/ui.store";
import { useCart } from "../hooks/useCart";

export function CartButton() {
  const { itemCount } = useCart();
  const openCart = useUiStore((s) => s.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-haspopup="dialog"
      aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100"
    >
      <BagIcon width={24} height={24} />
      {itemCount > 0 ? (
        <span
          // Changing the key remounts the badge and replays the pop animation.
          key={itemCount}
          aria-hidden="true"
          className="absolute right-0 top-0 flex h-5 min-w-5 animate-badge-pop items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white motion-reduce:animate-none"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}

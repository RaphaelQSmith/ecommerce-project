"use client";

import Link from "next/link";
import { useRef } from "react";
import { BagIcon, CloseIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn, formatPrice } from "@/lib/utils";
import { useUiStore } from "@/store/ui.store";
import { useCart } from "../hooks/useCart";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const isOpen = useUiStore((s) => s.isCartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, { active: isOpen, onEscape: closeCart });

  const currency = items[0]?.currency ?? "EUR";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-[visibility] duration-300",
        isOpen ? "visible" : "invisible",
      )}
    >
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-slate-900/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl outline-none transition-transform duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2
            id="cart-drawer-title"
            className="text-lg font-semibold text-slate-900"
          >
            Your cart{" "}
            <span className="text-sm font-normal text-slate-600">
              ({itemCount})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <EmptyState
            className="flex-1"
            icon={<BagIcon width={40} height={40} />}
            title="Your cart is empty"
            description="Add something you love and it will show up here."
            action={<Button onClick={closeCart}>Continue shopping</Button>}
          />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-200 overflow-y-auto px-5">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>

            <footer className="space-y-3 border-t border-slate-200 px-5 py-4">
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <p className="text-xs text-slate-600">
                Shipping and taxes are calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 text-base font-medium text-white transition-colors hover:bg-slate-700"
              >
                Checkout
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

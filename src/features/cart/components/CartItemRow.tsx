"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const STEP_BUTTON =
  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300";

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  return (
    <li className="flex gap-4 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={item.imageUrl}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-900">{item.name}</p>
          <p className="text-sm font-semibold text-slate-900">
            {formatPrice(item.unitPrice * item.quantity, item.currency)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div
            role="group"
            aria-label={`Quantity for ${item.name}`}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              className={STEP_BUTTON}
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() =>
                onUpdateQuantity(item.productId, item.quantity - 1)
              }
            >
              <MinusIcon width={16} height={16} />
            </button>
            <span
              className="w-6 text-center text-sm tabular-nums"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              className={STEP_BUTTON}
              aria-label={`Increase quantity of ${item.name}`}
              disabled={item.quantity >= item.maxQuantity}
              onClick={() =>
                onUpdateQuantity(item.productId, item.quantity + 1)
              }
            >
              <PlusIcon width={16} height={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name} from cart`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon width={18} height={18} />
          </button>
        </div>
      </div>
    </li>
  );
}

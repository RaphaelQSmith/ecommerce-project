"use client";

import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { CheckIcon, PlusIcon } from "@/components/ui/icons";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "../types";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCardBase({ product, onAddToCart }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soldOut = product.stock <= 0;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleAdd = (): void => {
    onAddToCart(product);
    setJustAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transform-none",
            soldOut && "opacity-60 grayscale",
          )}
        />
        {soldOut ? (
          <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
            Sold out
          </span>
        ) : product.stock <= 10 ? (
          <span className="absolute left-2 top-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900">
            Only {product.stock} left
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="text-base font-semibold text-slate-900">
            {formatPrice(product.price, product.currency)}
          </p>
          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            aria-label={
              soldOut
                ? `${product.name} is sold out`
                : `Add ${product.name} to cart`
            }
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500",
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-white hover:bg-slate-700",
            )}
          >
            {justAdded ? (
              <CheckIcon width={16} height={16} />
            ) : (
              <PlusIcon width={16} height={16} />
            )}
            {justAdded ? "Added" : "Add"}
          </button>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {justAdded ? `${product.name} added to cart` : ""}
        </span>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardBase);

"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchIcon } from "@/components/ui/icons";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  products: readonly Product[];
  isLoading: boolean;
  errorMessage?: string;
  hasActiveFilters: boolean;
  onAddToCart: (product: Product) => void;
  onRetry: () => void;
  onClearFilters: () => void;
}

export function ProductGrid({
  products,
  isLoading,
  errorMessage,
  hasActiveFilters,
  onAddToCart,
  onRetry,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />;

  if (errorMessage) {
    return (
      <EmptyState
        role="alert"
        title="We couldn't load the products"
        description={errorMessage}
        action={<Button onClick={onRetry}>Try again</Button>}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        role="status"
        icon={<SearchIcon width={40} height={40} />}
        title={hasActiveFilters ? "No products match your filters" : "No products yet"}
        description={
          hasActiveFilters
            ? "Try a different search term or clear the filters."
            : "Check back soon for new arrivals."
        }
        action={
          hasActiveFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="animate-fade-in motion-reduce:animate-none">
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}

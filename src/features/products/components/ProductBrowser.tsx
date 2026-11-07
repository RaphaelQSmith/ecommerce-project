"use client";

import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useCart } from "@/features/cart/hooks/useCart";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProducts } from "../hooks/useProducts";
import { hasActiveFilters } from "../lib/filter-params";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

const EMPTY: never[] = [];

function ProductBrowserContent() {
  const { state, retry } = useProducts();
  const { filters, queryInput, setQueryInput, setCategory, setSort, reset } =
    useProductFilters();
  const { addItem } = useCart();

  const products = state.status === "success" ? state.data : EMPTY;
  const { visible, categoryCounts } = useFilteredProducts(products, filters);

  return (
    <div className="space-y-6">
      <ProductFilters
        filters={filters}
        queryInput={queryInput}
        categoryCounts={categoryCounts}
        totalCount={products.length}
        onQueryChange={setQueryInput}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      <p className="text-sm text-slate-600" role="status" aria-live="polite">
        {state.status === "success"
          ? `${visible.length} ${visible.length === 1 ? "product" : "products"}`
          : " "}
      </p>

      <ProductGrid
        products={visible}
        isLoading={state.status === "loading"}
        errorMessage={state.status === "error" ? state.message : undefined}
        hasActiveFilters={hasActiveFilters(filters)}
        onAddToCart={addItem}
        onRetry={retry}
        onClearFilters={reset}
      />
    </div>
  );
}

export function ProductBrowser() {
  return (
    <ErrorBoundary>
      <ProductBrowserContent />
    </ErrorBoundary>
  );
}

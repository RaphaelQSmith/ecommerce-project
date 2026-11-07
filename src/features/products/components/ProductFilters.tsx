"use client";

import { SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  PRODUCT_CATEGORIES,
  SORT_KEYS,
  SORT_LABELS,
  isSortKey,
  type ProductCategory,
  type ProductFilters as Filters,
  type SortKey,
} from "../types";

interface ProductFiltersProps {
  filters: Filters;
  queryInput: string;
  categoryCounts: Record<ProductCategory, number>;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (category: Filters["category"]) => void;
  onSortChange: (sort: SortKey) => void;
}

const CHIP =
  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors";

export function ProductFilters({
  filters,
  queryInput,
  categoryCounts,
  totalCount,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <section aria-label="Product filters" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="product-search"
            type="search"
            value={queryInput}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products, categories, tags..."
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="product-sort" className="text-sm text-slate-700">
            Sort by
          </label>
          <select
            id="product-sort"
            value={filters.sort}
            onChange={(e) => {
              const value = e.target.value;
              if (isSortKey(value)) onSortChange(value);
            }}
            className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
          >
            {SORT_KEYS.map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <button
          type="button"
          aria-pressed={filters.category === "all"}
          onClick={() => onCategoryChange("all")}
          className={cn(
            CHIP,
            filters.category === "all"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
          )}
        >
          All ({totalCount})
        </button>
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filters.category === category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              CHIP,
              filters.category === category
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
            )}
          >
            {category} ({categoryCounts[category]})
          </button>
        ))}
      </div>
    </section>
  );
}

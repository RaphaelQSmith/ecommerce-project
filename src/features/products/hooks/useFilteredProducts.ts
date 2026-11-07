"use client";

import { useMemo } from "react";
import { filterAndSortProducts } from "../lib/filter-products";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
  type ProductFilters,
} from "../types";

/** Memoised filtering/sorting plus per-category counts for the filter UI. */
export function useFilteredProducts(
  products: readonly Product[],
  filters: ProductFilters,
) {
  const visible = useMemo(
    () => filterAndSortProducts(products, filters),
    [products, filters],
  );

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(
      PRODUCT_CATEGORIES.map((c) => [c, 0]),
    ) as Record<ProductCategory, number>;
    for (const product of products) counts[product.category] += 1;
    return counts;
  }, [products]);

  return { visible, categoryCounts };
}

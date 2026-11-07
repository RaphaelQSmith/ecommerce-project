import {
  DEFAULT_FILTERS,
  isProductCategory,
  isSortKey,
  type ProductFilters,
} from "../types";

interface ParamReader {
  get(name: string): string | null;
}

/** Parses and validates filters from URL search params. Invalid values fall back to defaults. */
export function parseFilters(params: ParamReader): ProductFilters {
  const category = params.get("category");
  const sort = params.get("sort");
  return {
    query: (params.get("q") ?? DEFAULT_FILTERS.query).trim(),
    category:
      category !== null && isProductCategory(category)
        ? category
        : DEFAULT_FILTERS.category,
    sort: sort !== null && isSortKey(sort) ? sort : DEFAULT_FILTERS.sort,
  };
}

/** Serialises filters, omitting defaults to keep URLs clean. */
export function serializeFilters(filters: ProductFilters): string {
  const params = new URLSearchParams();
  const query = filters.query.trim();
  if (query) params.set("q", query);
  if (filters.category !== DEFAULT_FILTERS.category) {
    params.set("category", filters.category);
  }
  if (filters.sort !== DEFAULT_FILTERS.sort) params.set("sort", filters.sort);
  return params.toString();
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.query !== DEFAULT_FILTERS.query ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.sort !== DEFAULT_FILTERS.sort
  );
}

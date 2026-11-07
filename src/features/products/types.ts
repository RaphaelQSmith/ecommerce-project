export const PRODUCT_CATEGORIES = [
  "electronics",
  "apparel",
  "home",
  "outdoors",
  "accessories",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const SORT_KEYS = [
  "popularity",
  "rating",
  "price-asc",
  "price-desc",
] as const;

export type SortKey = (typeof SORT_KEYS)[number];

export type CurrencyCode = "EUR" | "USD" | "GBP";

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** Price in minor units (cents) to avoid floating point errors. */
  readonly price: number;
  readonly currency: CurrencyCode;
  readonly category: ProductCategory;
  /** Average rating, 0 - 5. */
  readonly rating: number;
  readonly reviewCount: number;
  /** Relative popularity score, higher is more popular. */
  readonly popularity: number;
  readonly imageUrl: string;
  readonly stock: number;
  readonly tags: readonly string[];
}

export interface ProductFilters {
  readonly query: string;
  readonly category: ProductCategory | "all";
  readonly sort: SortKey;
}

export const DEFAULT_FILTERS: ProductFilters = {
  query: "",
  category: "all",
  sort: "popularity",
};

export const SORT_LABELS: Record<SortKey, string> = {
  popularity: "Most popular",
  rating: "Highest rated",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

export function isSortKey(value: string): value is SortKey {
  return (SORT_KEYS as readonly string[]).includes(value);
}

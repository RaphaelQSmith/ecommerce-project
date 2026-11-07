import type { Product, ProductFilters } from "../types";

export function filterAndSortProducts(
  products: readonly Product[],
  filters: ProductFilters,
): Product[] {
  const query = filters.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    if (!query) return true;
    const haystack = [
      product.name,
      product.description,
      product.category,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "popularity":
      sorted.sort((a, b) => b.popularity - a.popularity);
      break;
  }
  return sorted;
}

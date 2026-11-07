import { MOCK_PRODUCTS } from "./data/mock-products";
import type { Product } from "./types";

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/** Mock network call. Replace with a real fetch to your catalogue API. */
export async function fetchProducts(
  signal?: AbortSignal,
): Promise<readonly Product[]> {
  await delay(700, signal);
  return MOCK_PRODUCTS;
}

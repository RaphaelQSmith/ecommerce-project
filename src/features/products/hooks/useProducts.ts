"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../api";
import type { Product } from "../types";

export type ProductsState =
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: readonly Product[] }
  | { readonly status: "error"; readonly message: string };

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    fetchProducts(controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Failed to load products.",
        });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { state, retry };
}

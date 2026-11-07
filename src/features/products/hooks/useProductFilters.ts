"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { DEFAULT_FILTERS, type ProductFilters } from "../types";
import { parseFilters, serializeFilters } from "../lib/filter-params";

/**
 * Filter state backed by the URL. The search box is debounced before it is
 * written to the URL; category and sort update immediately.
 */
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const writeFilters = useCallback(
    (next: ProductFilters) => {
      const qs = serializeFilters(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  // Latest values for effects that must not re-run when these change.
  const latest = useRef({ filters, writeFilters });
  useEffect(() => {
    latest.current = { filters, writeFilters };
  });

  const [queryInput, setQueryInput] = useState(filters.query);
  const debouncedQuery = useDebounce(queryInput.trim(), 300);

  // Local input -> URL (after debounce).
  useEffect(() => {
    const { filters: current, writeFilters: write } = latest.current;
    if (debouncedQuery !== current.query) {
      write({ ...current, query: debouncedQuery });
    }
  }, [debouncedQuery]);

  // URL -> local input (back/forward navigation, clear filters).
  useEffect(() => {
    if (filters.query !== debouncedQuery) setQueryInput(filters.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.query]);

  const setCategory = useCallback((category: ProductFilters["category"]) => {
    const { filters: current, writeFilters: write } = latest.current;
    write({ ...current, category });
  }, []);

  const setSort = useCallback((sort: ProductFilters["sort"]) => {
    const { filters: current, writeFilters: write } = latest.current;
    write({ ...current, sort });
  }, []);

  const reset = useCallback(() => {
    setQueryInput(DEFAULT_FILTERS.query);
    latest.current.writeFilters(DEFAULT_FILTERS);
  }, []);

  return { filters, queryInput, setQueryInput, setCategory, setSort, reset };
}

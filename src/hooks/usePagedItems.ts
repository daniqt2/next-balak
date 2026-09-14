'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePagedItemsOptions<T> {
  /** Items rendered on the server for the first paint. */
  initialItems: T[];
  /** How many items exist upstream overall. */
  total: number;
  /** Items per page — batches are fetched two pages at a time. */
  pageSize: number;
  /** Endpoint accepting ?skip=&limit= and returning { items, total }. */
  endpoint: string;
  /** Stable identity, used to drop duplicates across batches. */
  idOf: (item: T) => string;
}

interface BatchResponse<T> {
  items: T[];
  total: number;
}

/**
 * Keeps every loaded item in memory so page changes are instant, and pulls the
 * next batch in the background before it is needed.
 *
 * Filters run over the loaded array, so the remaining batches are also fetched
 * on idle after the first paint — otherwise filtering would silently only
 * search the first page.
 */
export function usePagedItems<T>({
  initialItems,
  total,
  pageSize,
  endpoint,
  idOf,
}: UsePagedItemsOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  /** Guards against firing the same skip twice (StrictMode double-effect included). */
  const requestedSkips = useRef(new Set<number>([0]));

  const hasAll = items.length >= total;

  const loadNextBatch = useCallback(async () => {
    const skip = items.length;
    if (skip >= total || requestedSkips.current.has(skip)) return;

    requestedSkips.current.add(skip);
    setIsLoadingMore(true);

    try {
      const response = await fetch(
        `${endpoint}?skip=${skip}&limit=${pageSize * 2}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const batch: BatchResponse<T> = await response.json();
      if (!batch.items?.length) return;

      setItems((current) => {
        const seen = new Set(current.map(idOf));
        return [...current, ...batch.items.filter((i) => !seen.has(idOf(i)))];
      });
    } catch (error) {
      // A failed prefetch is not fatal: the user still has every loaded page.
      // Drop the guard so a later attempt can retry this skip.
      requestedSkips.current.delete(skip);
      console.error(`[usePagedItems] prefetch failed for ${endpoint}`, error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [items.length, total, pageSize, endpoint, idOf]);

  // Pull the rest in once the first paint is done, one batch at a time.
  useEffect(() => {
    if (hasAll) return;

    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);

    const handle = schedule(() => {
      void loadNextBatch();
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, [hasAll, loadNextBatch]);

  return { items, hasAll, isLoadingMore, loadNextBatch };
}

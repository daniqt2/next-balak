'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { RouteGroup } from '@/contentful-types';

interface UseRouteGroupPagesOptions {
  /** Groups rendered on the server for the first paint. */
  initialGroups: RouteGroup[];
  /** How many groups exist in Contentful overall. */
  total: number;
  /** Groups per page. */
  pageSize: number;
}

interface BatchResponse {
  items: RouteGroup[];
  total: number;
}

/**
 * Keeps every loaded route group in memory so page changes are instant, and
 * pulls the next batch in the background before it is needed.
 *
 * Filters run over the loaded array, so the remaining batches are also fetched
 * on idle after the first paint — otherwise filtering would silently only
 * search the first page.
 */
export function useRouteGroupPages({
  initialGroups,
  total,
  pageSize,
}: UseRouteGroupPagesOptions) {
  const [groups, setGroups] = useState<RouteGroup[]>(initialGroups);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  /** Guards against firing the same skip twice (StrictMode double-effect included). */
  const requestedSkips = useRef(new Set<number>([0]));

  const hasAll = groups.length >= total;

  const loadNextBatch = useCallback(async () => {
    const skip = groups.length;
    if (skip >= total || requestedSkips.current.has(skip)) return;

    requestedSkips.current.add(skip);
    setIsLoadingMore(true);

    try {
      const response = await fetch(
        `/api/route-groups?skip=${skip}&limit=${pageSize * 2}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const batch: BatchResponse = await response.json();
      if (!batch.items?.length) return;

      setGroups((current) => {
        const seen = new Set(current.map((g) => g.sys.id));
        return [...current, ...batch.items.filter((g) => !seen.has(g.sys.id))];
      });
    } catch (error) {
      // A failed prefetch is not fatal: the user still has every loaded page.
      // Drop the guard so a later attempt can retry this skip.
      requestedSkips.current.delete(skip);
      console.error('[useRouteGroupPages] prefetch failed', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [groups.length, total, pageSize]);

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

  return { groups, hasAll, isLoadingMore, loadNextBatch };
}

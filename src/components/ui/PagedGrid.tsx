'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Keep in sync with the page-fade animation duration in tailwind.config.js. */
const TRANSITION_MS = 550;

interface PagedGridProps<T> {
  items: T[];
  pageSize: number;
  /** Reset back to page 1 whenever this changes (e.g. the active filter). */
  resetKey: string;
  /** Tailwind grid classes for the item layout. */
  gridClassName: string;
  keyFor: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Accessible label for the pagination nav. */
  label: string;
}

/**
 * Client-side pager: slices an in-memory list into pages and slides the new
 * page in horizontally. Paging never waits on the network, so the animation
 * cannot stutter — callers are responsible for having the items loaded.
 */
export default function PagedGrid<T>({
  items,
  pageSize,
  resetKey,
  gridClassName,
  keyFor,
  renderItem,
  label,
}: PagedGridProps<T>) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  /**
   * Height of a full page, held on the container so a short last page cannot
   * collapse it. Without this the document shrinks, the browser scrolls up to
   * compensate, and paging back leaves you at the wrong offset.
   */
  const [minHeight, setMinHeight] = useState<number>();
  const gridRef = useRef<HTMLDivElement>(null);
  /** The page being animated away; rendered on top until the slide finishes. */
  const [outgoing, setOutgoing] = useState<{
    items: T[];
    direction: 'next' | 'prev';
    id: number;
  } | null>(null);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);

  const visible = useMemo(
    () => items.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [items, currentPage, pageSize]
  );

  useEffect(() => {
    setPage(0);
    setDirection('next');
    setOutgoing(null);
    setMinHeight(undefined);
  }, [resetKey]);

  // Measure only full pages; a short one would lock in too small a height.
  // Images settle after mount, so keep watching via ResizeObserver.
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el || visible.length !== pageSize) return;

    const measure = () => {
      const height = el.offsetHeight;
      setMinHeight((current) =>
        current === undefined || height > current ? height : current
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, pageSize]);

  // A locked-in height from a wider viewport would leave a gap after resizing,
  // so drop it and let the next full page re-measure.
  useEffect(() => {
    const onResize = () => setMinHeight(undefined);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Drop the outgoing page once its slide has played out.
  useEffect(() => {
    if (!outgoing) return;
    const timer = window.setTimeout(() => setOutgoing(null), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  const goTo = (next: number) => {
    if (next === currentPage || next < 0 || next >= pageCount) return;
    const nextDirection = next > currentPage ? 'next' : 'prev';
    setDirection(nextDirection);
    setOutgoing({ items: visible, direction: nextDirection, id: currentPage });
    setPage(next);
  };

  return (
    <div className="space-y-8">
      {/* Both pages are on screen during the change: the outgoing one is
          layered on top and dissolves away, revealing the incoming page. */}
      <div className="relative overflow-hidden" style={{ minHeight }}>
        {outgoing && (
          <div
            aria-hidden="true"
            className={`${gridClassName} absolute inset-x-0 top-0 pointer-events-none animate-page-fade-out`}
          >
            {outgoing.items.map((item, index) => (
              <div key={`out-${keyFor(item, index)}`}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        )}

        <div
          ref={gridRef}
          key={`${resetKey}-${currentPage}`}
          className={`${gridClassName} animate-page-fade-in`}
        >
          {visible.map((item, index) => (
            <div key={keyFor(item, index)}>{renderItem(item, index)}</div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label={label}>
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label="Página anterior"
            className="pagination-arrow"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Página ${index + 1}`}
              aria-current={index === currentPage ? 'page' : undefined}
              className={`pagination-dot ${
                index === currentPage ? 'pagination-dot--active' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
            aria-label="Página siguiente"
            className="pagination-arrow"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}

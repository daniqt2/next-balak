'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { RouteGroup } from '@/contentful-types';
import RouteGroupDisplay from '@/components/lists/RouteGroupDisplay';

interface RouteGroupPagedGridProps {
  groups: RouteGroup[];
  pageSize: number;
  /** Reset back to page 1 whenever this changes (e.g. the active filter). */
  resetKey: string;
}

export default function RouteGroupPagedGrid({
  groups,
  pageSize,
  resetKey,
}: RouteGroupPagedGridProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const gridRef = useRef<HTMLDivElement>(null);

  const pageCount = Math.max(1, Math.ceil(groups.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);

  const visible = useMemo(
    () => groups.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [groups, currentPage, pageSize]
  );

  useEffect(() => {
    setPage(0);
    setDirection('next');
  }, [resetKey]);

  const goTo = (next: number) => {
    if (next === currentPage || next < 0 || next >= pageCount) return;
    setDirection(next > currentPage ? 'next' : 'prev');
    setPage(next);
  };

  return (
    <div className="space-y-8">
      {/* overflow-hidden clips the incoming page while it slides in */}
      <div className="overflow-hidden">
        <div
          ref={gridRef}
          key={`${resetKey}-${currentPage}`}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${
            direction === 'next' ? 'animate-page-in-right' : 'animate-page-in-left'
          }`}
        >
          {visible.map((routeGroup) => (
            <RouteGroupDisplay
              key={routeGroup.sys.id}
              routeGroup={routeGroup}
              revealOnScroll={false}
            />
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <nav
          className="flex items-center justify-center gap-2"
          aria-label="Paginación de colecciones"
        >
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

'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useRef, useEffect } from 'react';
import { Coffee, ChevronDown, X } from 'lucide-react';

import type { InterestSpot } from '@/contentful-types';
import CoffeeStopCard from '@/components/cards/CoffeeStopCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHeader from '@/components/headers/pageHeader';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const AreaMap = dynamic(() => import('@/components/map/AreaMap'), {
  ssr: false,
  loading: () => (
    <div className="py-12">
      <div className="h-[400px] w-full bg-charcoal-800 rounded-xl flex items-center justify-center">
        <div className="text-gray-400">Cargando mapa...</div>
      </div>
    </div>
  ),
});

const PAGE_SIZE = 10;

interface CoffeeSpotsClientProps {
  coffeeSpots: InterestSpot[];
}

export default function CoffeeSpotsClient({
  coffeeSpots,
}: CoffeeSpotsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive unique tags from all spots
  const allTags = useMemo(() => {
    const map = new Map<string, string>();
    coffeeSpots.forEach(spot => {
      spot.contentfulMetadata?.tags?.forEach(tag => {
        if (tag?.id && tag?.name) map.set(tag.id, tag.name);
      });
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [coffeeSpots]);

  const hasTags = allTags.length > 0;

  // Filter spots by selected tags (OR logic — match any selected)
  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return coffeeSpots;
    return coffeeSpots.filter(spot =>
      spot.contentfulMetadata?.tags?.some(
        tag => tag?.id && selectedTags.includes(tag.id)
      )
    );
  }, [coffeeSpots, selectedTags]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedTags]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggleTag(id: string) {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  return (
    <div className="min-h-screen mt-6 md:mt-10" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Cafés' }]} backHref="/" />
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Dónde Parar"
          description="Descubre los mejores lugares para tomar café durante tus rutas de ciclismo"
        />

        <AreaMap coffeePoints={coffeeSpots} />

        <AnimatedSection delay={300}>
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold text-charcoal-900 uppercase">
                Nuestras ultimas paradas
              </h2>

              {hasTags && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(o => !o)}
                    className="inline-flex items-center gap-2 rounded-lg border border-charcoal-300 bg-white px-4 py-2 text-sm font-medium text-charcoal-800 hover:bg-gray-50 transition-colors"
                  >
                    <span>
                      Áreas
                      {selectedTags.length > 0 && (
                        <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-balak-500 text-xs font-semibold text-charcoal-900">
                          {selectedTags.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-charcoal-200 bg-white shadow-lg py-2">
                      {allTags.map(({ id, name }) => (
                        <label
                          key={id}
                          className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-charcoal-800"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(id)}
                            onChange={() => toggleTag(id)}
                            className="h-4 w-4 rounded accent-balak-500"
                          />
                          {name}
                        </label>
                      ))}
                      {selectedTags.length > 0 && (
                        <>
                          <div className="my-1 border-t border-charcoal-100" />
                          <button
                            type="button"
                            onClick={clearTags}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-charcoal-800 hover:bg-gray-50"
                          >
                            <X className="w-3.5 h-3.5" />
                            Limpiar filtros
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {visible.length > 0 ? (
              <>
                <div
                  key={selectedTags.join(',')}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {visible.map((coffeeSpot, index) => (
                    <div
                      key={coffeeSpot?.sys.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${Math.min(index * 40, 160)}ms` }}
                    >
                      <CoffeeStopCard coffeeStop={coffeeSpot} index={index} />
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                      className="rounded-lg bg-balak-500 px-8 py-3 font-semibold text-charcoal-900 hover:bg-balak-400 transition-colors"
                    >
                      Cargar más ({filtered.length - visibleCount} restantes)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Coffee className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-400 text-lg">
                  No se encontraron puntos de café
                </h3>
                <p className="text-gray-500">
                  Prueba con otros filtros o vuelve más tarde
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

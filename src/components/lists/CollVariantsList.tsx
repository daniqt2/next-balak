'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import CollVariantCard from '@/components/cards/CollVariantCard';

interface CollVariantsListProps {
  variants: any[];
}

export default function CollVariantsList({ variants }: CollVariantsListProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="coll-variants-section rounded-xl bg-charcoal-700 p-4 md:p-5">
      <h2 className="text-lg md:text-xl font-bold text-white mb-4 uppercase">
        Puertos en ruta
      </h2>
      <div className="relative -mx-1 px-1">
        <div className="flex flex-nowrap items-stretch gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
          {variants.map((variant, index) => (
            <React.Fragment key={variant?.sys?.id ?? index}>
              <div className="flex-shrink-0 w-fit min-w-0 snap-start">
                <CollVariantCard variant={variant} index={index} />
              </div>
              {index < variants.length - 1 && (
                <div
                  className="flex-shrink-0 flex items-center px-1 text-charcoal-300"
                  aria-hidden
                >
                  <ChevronRight
                    className="w-6 h-6 md:w-7 md:h-7"
                    strokeWidth={2}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Fade overlay on the right to hint more content when scrollable */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-charcoal-100 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}

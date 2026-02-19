import React from 'react';
import Link from 'next/link';
import { Mountain, TrendingUp, BarChart3, Percent } from 'lucide-react';
import { formatMetric } from '@/lib/route-utils';

type CollVariantCardProps = {
  variant: any;
  index?: number;
};

function getDifficultyDotClass(difficulty?: string | null): string {
  if (!difficulty) return 'bg-gray-400';
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return 'bg-balak-500';
  if (d.includes('medium') || d.includes('intermediate'))
    return 'bg-balak-orange-500';
  if (d.includes('hard') || d.includes('difficult')) return 'bg-balak-red-500';
  return 'bg-gray-400';
}

function getParentColl(variant: any): { id?: string; name?: string } {
  const items = variant?.linkedFrom?.entryCollection?.items;
  if (!Array.isArray(items)) return {};
  const coll = items.find((it: any) => it?.__typename === 'Coll');
  return {
    id: coll?.sys?.id,
    name: coll?.name,
  };
}

export default function CollVariantCard({
  variant,
  index = 0,
}: CollVariantCardProps) {
  if (!variant) return null;

  const parent = getParentColl(variant);
  const title = parent.name || variant.startLocation || `Puerto ${index + 1}`;
  const href = parent.id ? `/puerto/${parent.id}` : undefined;

  const content = (
    <div className="bg-white rounded-xl shadow-sm p-5 transition-all duration-300 cursor-pointer hover:shadow-md w-full">
      <div className="flex items-start gap-4">
        <div
          className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 ${getDifficultyDotClass(
            variant.difficulty
          )}`}
        >
          <Mountain size={24} strokeWidth={2} color="white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-1 truncate">
            {title}
          </h3>

          {variant.startLocation && (
            <p className="text-charcoal-500 text-sm mb-2 truncate">
              Ascenso desde: {variant.startLocation}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-charcoal-500 text-sm">
            {variant.length != null && (
              <span className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                {formatMetric(variant.length)}km
              </span>
            )}
            {variant.accumulatedHeight != null && (
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {formatMetric(variant.accumulatedHeight)}mD+
              </span>
            )}
            {variant.slopePercentage != null && (
              <span className="flex items-center gap-1">
                <Percent className="w-4 h-4" />
                {formatMetric(variant.slopePercentage)}%
              </span>
            )}
            {variant.difficulty && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full  text-charcoal-700 text-xs font-medium">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${getDifficultyDotClass(
                    variant.difficulty
                  )}`}
                />
                <span className="sr-only">{variant.difficulty}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="group block">
      {content}
    </Link>
  );
}

import Link from 'next/link';
import { formatMetric } from '@/lib/route-utils';

interface CollVariantsListProps {
  variants: any[];
}

function getDifficultyColor(difficulty?: string | null): string {
  if (!difficulty) return 'bg-gray-300';
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return 'bg-balak-500';
  if (d.includes('medium') || d.includes('intermediate')) return 'bg-balak-orange-500';
  if (d.includes('hard') || d.includes('difficult')) return 'bg-balak-red-500';
  return 'bg-gray-300';
}

function getParentColl(variant: any): { id?: string; name?: string } {
  const items = variant?.linkedFrom?.entryCollection?.items;
  if (!Array.isArray(items)) return {};
  const coll = items.find((it: any) => it?.__typename === 'Coll');
  return { id: coll?.sys?.id, name: coll?.name };
}

export default function CollVariantsList({ variants }: CollVariantsListProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 mb-6 uppercase">
        Puertos en ruta
      </h2>

      <div className="divide-y divide-charcoal-100">
        {variants.map((variant, index) => {
          if (!variant) return null;
          const parent = getParentColl(variant);
          const title = parent.name || variant.startLocation || `Puerto ${index + 1}`;
          const href = parent.id ? `/puerto/${parent.id}` : undefined;

          const inner = (
            <div className="flex items-center gap-4 py-4 px-2 group-hover:bg-charcoal-50 rounded-lg transition-colors">
              {/* Difficulty dot */}
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getDifficultyColor(variant.difficulty)}`} />

              {/* Name + location */}
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-charcoal-900 group-hover:text-charcoal-700 transition-colors">
                  {title}
                </span>
                {variant.startLocation && (
                  <span className="text-sm text-charcoal-400 ml-2">
                    desde {variant.startLocation}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-3 md:gap-6 text-sm text-charcoal-500 flex-shrink-0 tabular-nums">
                {variant.length != null && (
                  <span>{formatMetric(variant.length)} km</span>
                )}
                {variant.accumulatedHeight != null && (
                  <span>{formatMetric(variant.accumulatedHeight)} m+</span>
                )}
                {variant.slopePercentage != null && (
                  <span>{formatMetric(variant.slopePercentage)}%</span>
                )}
              </div>
            </div>
          );

          return href ? (
            <Link key={variant?.sys?.id ?? index} href={href} className="group block">
              {inner}
            </Link>
          ) : (
            <div key={variant?.sys?.id ?? index}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

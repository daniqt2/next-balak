'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mountain } from 'lucide-react';

import type { Coll } from '@/contentful-types';
import '@/styles/collDisplay.css';

interface CollDisplayProps {
  coll: Coll;
  index?: number;
  featured?: boolean;
}

function getDifficultyDotClass(difficulty?: string | null): string {
  if (!difficulty) return 'bg-gray-400';
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return 'bg-balak-500';
  if (d.includes('medium') || d.includes('intermediate'))
    return 'bg-balak-orange-500';
  if (d.includes('hard') || d.includes('difficult')) return 'bg-balak-red-500';
  return 'bg-gray-400';
}

export default function CollDisplay({
  coll,
  index = 0,
  featured = false,
}: CollDisplayProps) {
  const name = coll.name || `Puerto ${index + 1}`;

  const variants = Array.isArray((coll as any).variantsCollection?.items)
    ? ((coll as any).variantsCollection.items.filter(Boolean) as any[])
    : [];

  return (
    <Link href={`/puerto/${coll.sys.id}`} className="coll-display">
      <div className="coll-display__card group">
        <div className="coll-display__image-container">
          {featured && (
            <span className="coll-display__badge">Destacado</span>
          )}
          {coll.header?.url ? (
            <Image
              src={coll.header.url}
              alt={coll.header.title || name}
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="coll-display__image"
            />
          ) : (
            <div className="coll-display__image-placeholder">
              <div className="coll-display__image-placeholder-overlay" />
              <Mountain
                size={48}
                className="coll-display__image-placeholder-icon"
              />
            </div>
          )}
          <div className="coll-display__overlay" />
        </div>

        <div className="coll-display__content">
          <h3 className="coll-display__title">{name}</h3>
          {variants.length > 0 && (
            <div className="coll-display__variants">
              <span className="coll-display__variants-label">Variantes:</span>
              {variants.slice(0, 2).map((v, i) => (
                <div
                  key={v?.sys?.id || i}
                  className="coll-display__variant-row"
                >
                  <span
                    className={`coll-display__variant-dot ${getDifficultyDotClass(
                      v?.difficulty
                    )}`}
                    aria-hidden
                  />
                  <span>
                    {v?.startLocation ? `${v.startLocation}:` : 'Variante:'}{' '}
                    {v?.length != null ? `${v.length}km` : '—'}
                    {v?.slopePercentage != null
                      ? ` · ${v.slopePercentage}%`
                      : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

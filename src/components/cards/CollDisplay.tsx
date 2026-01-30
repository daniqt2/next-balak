'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mountain } from 'lucide-react';

import type { Coll } from '@/contentful-types';
import '@/styles/collDisplay.css';

interface CollDisplayProps {
  coll: Coll;
  index?: number;
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

function extractPlainText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  // Contentful rich text JSON has nodes like { nodeType, content: [...] }
  if (Array.isArray(value)) {
    return value.map(extractPlainText).join(' ');
  }

  if (typeof value === 'object') {
    if (value.nodeType === 'text' && typeof value.value === 'string') {
      return value.value;
    }
    if (Array.isArray(value.content)) {
      return extractPlainText(value.content);
    }
  }

  return '';
}

export default function CollDisplay({ coll, index = 0 }: CollDisplayProps) {
  const name = coll.name || `Puerto ${index + 1}`;
  const descriptionText = extractPlainText(coll.description?.json || '');

  const variants = Array.isArray((coll as any).variantsCollection?.items)
    ? ((coll as any).variantsCollection.items.filter(Boolean) as any[])
    : [];

  return (
    <Link href={`/puerto/${coll.sys.id}`} className="coll-display">
      <div className="coll-display__card">
        <div className="coll-display__image-container">
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
          <div className="coll-display__gradient-overlay" />
        </div>

        <div className="coll-display__content">
          <h3 className="coll-display__title">{name}</h3>
          {variants.length > 0 && (
            <div className="mt-2 flex flex-col gap-1 text-gray-300 text-sm">
              <p className="text-white/80">Variantes:</p>
              {variants.slice(0, 2).map((v, i) => (
                <div key={v?.sys?.id || i} className="flex gap-2">
                  <span className="inline-flex items-center gap-2 text-white/80 font-bold pl-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${getDifficultyDotClass(
                        v?.difficulty
                      )}`}
                      aria-hidden="true"
                    />
                    <span>
                      {v?.startLocation ? `${v.startLocation}:` : 'Variante:'}
                    </span>
                  </span>
                  <span>
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

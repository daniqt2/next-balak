import React from 'react';
import Link from 'next/link';
import { Mountain } from 'lucide-react';
import { InterestSpot } from '@/contentful-types';

interface MountainCardProps {
  mountain: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function MountainCard({
  mountain,
  index = 0,
  compact = false,
}: MountainCardProps) {
  if (!mountain) return null;

  const mountainName = mountain.title || `Puerto ${index + 1}`;

  return (
    <Link href={`/puerto/${mountain.sys.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm p-5 transition-all duration-300 cursor-pointer hover:shadow-md w-full">
        <div className="flex items-start gap-4">
          {/* Circular Icon */}
          <div className="bg-balak-orange-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
            <Mountain size={24} strokeWidth={2} color="white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mountain Name */}
            <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-2">
              {mountainName}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

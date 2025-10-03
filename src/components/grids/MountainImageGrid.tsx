import React from 'react';
import AssetGrid from './AssetGrid';
import { Camera } from 'lucide-react';

interface MountainImageGridProps {
  routes: Array<{
    sys: {
      id: string;
    };
    title?: string | null;
    slug?: string | null;
    mainCarouselCollection?: {
      items: Array<{
        sys: {
          id: string;
        };
        title?: string | null;
        description?: string | null;
        url?: string | null;
        width?: number | null;
        height?: number | null;
        contentType?: string | null;
      }>;
    } | null;
  }>;
}

export default function MountainImageGrid({ routes }: MountainImageGridProps) {
  // Collect all carousel images from related routes
  const allImages = routes
    .filter(route => route.mainCarouselCollection?.items)
    .flatMap(route => 
      route.mainCarouselCollection!.items.map(image => ({
        ...image,
        routeTitle: route.title,
        routeSlug: route.slug
      }))
    )
    .filter(Boolean);

  if (allImages.length === 0) return null;

  return (
    <AssetGrid
      assets={allImages}
      icon={<Camera className="w-6 h-6 text-balak-400" />}
      showRouteAttribution={true}
    />
  );
}

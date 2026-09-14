import { getCoffeeSpotsCached } from '@/lib/contentful-cache';
import CoffeeSpotsClient from '@/components/coffee-spots/CoffeeSpotsClient';
import type { InterestSpot } from '@/contentful-types';

/** Revalidate every 10 min so new content appears without redeploy */
export const revalidate = 600;

/** Two pages worth, so page 2 is already in memory on first paint. */
const INITIAL_BATCH = 18;

export default async function CoffeeSpotsPage() {
  // Two fetches: a small first batch for the grid, and the full set for the
  // map so every pin is on screen from the first paint.
  const [gridData, mapData] = await Promise.all([
    getCoffeeSpotsCached({ limit: INITIAL_BATCH }),
    getCoffeeSpotsCached({ limit: 100 }),
  ]);

  const coffeeSpots =
    gridData?.interestSpotCollection?.items?.filter(
      (item): item is InterestSpot => item !== null
    ) ?? [];

  const mapSpots =
    mapData?.interestSpotCollection?.items?.filter(
      (item): item is InterestSpot => item !== null
    ) ?? [];

  const total = gridData?.interestSpotCollection?.total ?? coffeeSpots.length;

  return (
    <CoffeeSpotsClient
      coffeeSpots={coffeeSpots}
      mapSpots={mapSpots}
      total={total}
    />
  );
}

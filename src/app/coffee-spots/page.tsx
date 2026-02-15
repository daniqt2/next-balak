import { getCoffeeSpotsCached } from '@/lib/contentful-cache';
import CoffeeSpotsClient from '@/components/coffee-spots/CoffeeSpotsClient';
import type { InterestSpot } from '@/contentful-types';

export default async function CoffeeSpotsPage() {
  const data = await getCoffeeSpotsCached({ limit: 10 });
  const coffeeSpots =
    data?.interestSpotCollection?.items?.filter(
      (item): item is InterestSpot => item !== null
    ) ?? [];

  return <CoffeeSpotsClient coffeeSpots={coffeeSpots} />;
}

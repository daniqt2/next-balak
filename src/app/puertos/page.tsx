import { getCollsCached, getCollsForMapCached } from '@/lib/contentful-cache';
import PuertosClient from '@/components/puertos/PuertosClient';
import type { Coll } from '@/contentful-types';

/** Revalidate every 10 min so new content appears without redeploy */
export const revalidate = 600;

/** Two pages worth, so page 2 is already in memory on first paint. */
const INITIAL_BATCH = 16;

export default async function MountainsPage() {
  const [gridData, mapData] = await Promise.all([
    getCollsCached({ limit: INITIAL_BATCH }),
    getCollsForMapCached(),
  ]);

  const colls =
    gridData?.collCollection?.items?.filter((item): item is Coll => item !== null) ?? [];

  const mapColls =
    mapData?.collCollection?.items?.filter((item): item is Coll => item !== null) ?? [];

  const total = gridData?.collCollection?.total ?? colls.length;

  return (
    <PuertosClient colls={colls} mapColls={mapColls} total={total} />
  );
}

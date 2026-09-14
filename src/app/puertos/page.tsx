import { getCollsCached, getCollsForMapCached } from '@/lib/contentful-cache';
import PuertosClient from '@/components/puertos/PuertosClient';
import type { Coll } from '@/contentful-types';

/** Revalidate every 10 min so new content appears without redeploy */
export const revalidate = 600;

export default async function MountainsPage() {
  const [gridData, mapData] = await Promise.all([
    getCollsCached({ limit: 20 }),
    getCollsForMapCached(),
  ]);

  const colls =
    gridData?.collCollection?.items?.filter((item): item is Coll => item !== null) ?? [];

  const mapColls =
    mapData?.collCollection?.items?.filter((item): item is Coll => item !== null) ?? [];

  return <PuertosClient colls={colls} mapColls={mapColls} />;
}

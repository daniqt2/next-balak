import { getCollsCached, getCollsForMapCached } from '@/lib/contentful-cache';
import PuertosClient from '@/components/puertos/PuertosClient';
import type { Coll } from '@/contentful-types';

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

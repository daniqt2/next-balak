import { getCollsCached } from '@/lib/contentful-cache';
import PuertosClient from '@/components/puertos/PuertosClient';
import type { Coll } from '@/contentful-types';

export default async function MountainsPage() {
  const data = await getCollsCached({ limit: 10 });
  const colls =
    data?.collCollection?.items?.filter((item): item is Coll => item !== null) ??
    [];

  return <PuertosClient colls={colls} />;
}

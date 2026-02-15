/**
 * Server-side Contentful fetchers. Call these from Server Components only.
 * Uses Next.js unstable_cache so one cached result is shared for all users (5 min revalidate).
 * Return values are JSON-serialized so the cache can store them.
 */
import { unstable_cache } from 'next/cache';
import { collService } from '@/services/coll-service';
import { coffeeService } from '@/services/coffee-service';
import { routeGroupService } from '@/services/route-group-service';
import { routeService } from '@/services/route-service';
import type { CollServiceOptions } from '@/services/coll-service';
import type { CoffeeServiceOptions } from '@/services/coffee-service';
import type { RouteGroupServiceOptions } from '@/services/route-group-service';

const REVALIDATE_SECONDS = 300; // 5 minutes – shared across all users on Vercel Data Cache

function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export async function getCollsCached(options: CollServiceOptions = {}) {
  const { limit = 10, skip = 0 } = options;
  return unstable_cache(
    async () => serialize(await collService.getColls(options)),
    ['contentful', 'colls', String(limit), String(skip)],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'colls'] }
  )();
}

export async function getCollByIdCached(id: string) {
  return unstable_cache(
    async () => serialize(await collService.getCollById(id)),
    ['contentful', 'coll', id],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'coll', id] }
  )();
}

export async function getCoffeeSpotsCached(options: CoffeeServiceOptions = {}) {
  const { limit = 10, skip = 0 } = options;
  return unstable_cache(
    async () => serialize(await coffeeService.getCoffeeSpots(options)),
    ['contentful', 'coffee-spots', String(limit), String(skip)],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'coffee-spots'] }
  )();
}

export async function getCoffeeSpotByIdCached(id: string) {
  return unstable_cache(
    async () => serialize(await coffeeService.getCoffeeSpotById(id)),
    ['contentful', 'coffee', id],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'coffee', id] }
  )();
}

export async function getRouteGroupsCached(
  options: RouteGroupServiceOptions = {}
) {
  const { limit = 20, skip = 0 } = options;
  return unstable_cache(
    async () => serialize(await routeGroupService.getRouteGroups(options)),
    ['contentful', 'route-groups', String(limit), String(skip)],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'route-groups'] }
  )();
}

export async function getRouteGroupBySlugCached(slug: string) {
  return unstable_cache(
    async () => serialize(await routeGroupService.getRouteGroupBySlug(slug)),
    ['contentful', 'route-group', slug],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'route-group', slug] }
  )();
}

export async function getRouteBySlugCached(slug: string) {
  return unstable_cache(
    async () => serialize(await routeService.getRouteBySlug(slug)),
    ['contentful', 'route', slug],
    { revalidate: REVALIDATE_SECONDS, tags: ['contentful', 'route', slug] }
  )();
}

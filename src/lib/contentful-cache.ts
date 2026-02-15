/**
 * Server-side Contentful fetchers. Call these from Server Components only.
 * Fetches run on the server (no browser → Contentful), so one request per server render.
 *
 * Caching (unstable_cache) is disabled for now – some responses failed to serialize.
 * You can re-enable by wrapping each call in unstable_cache(..., keyParts, { revalidate, tags })
 * and ensuring the returned value is JSON-serializable (e.g. JSON.parse(JSON.stringify(data))).
 */
import { collService } from '@/services/coll-service';
import { coffeeService } from '@/services/coffee-service';
import { routeGroupService } from '@/services/route-group-service';
import { routeService } from '@/services/route-service';
import type { CollServiceOptions } from '@/services/coll-service';
import type { CoffeeServiceOptions } from '@/services/coffee-service';
import type { RouteGroupServiceOptions } from '@/services/route-group-service';

export async function getCollsCached(options: CollServiceOptions = {}) {
  return collService.getColls(options);
}

export async function getCollByIdCached(id: string) {
  return collService.getCollById(id);
}

export async function getCoffeeSpotsCached(options: CoffeeServiceOptions = {}) {
  return coffeeService.getCoffeeSpots(options);
}

export async function getCoffeeSpotByIdCached(id: string) {
  return coffeeService.getCoffeeSpotById(id);
}

export async function getRouteGroupsCached(
  options: RouteGroupServiceOptions = {}
) {
  return routeGroupService.getRouteGroups(options);
}

export async function getRouteGroupBySlugCached(slug: string) {
  return routeGroupService.getRouteGroupBySlug(slug);
}

export async function getRouteBySlugCached(slug: string) {
  return routeService.getRouteBySlug(slug);
}

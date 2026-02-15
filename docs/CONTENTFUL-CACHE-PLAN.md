# Plan: shared cache for all users (reduce Contentful requests)

**Goal:** One Contentful response shared by many users for a period (e.g. 5 minutes), so 100 visitors → a small number of Contentful calls instead of up to 100.

**Scope:** Analyze options, compare, and plan. No implementation in this doc.

---

## Options

### 1. Re-enable Next.js `unstable_cache` with serialization fix (recommended first)

**What it is:** Use `unstable_cache()` again in `src/lib/contentful-cache.ts`, but ensure the value we return is JSON-serializable so Next.js can store it. The cache is the **Next.js Data Cache**, which on Vercel is **shared across all serverless invocations** (all users).

**How:**  
- Wrap each cached call so the **return value** is plain JSON before it’s stored:  
  `return JSON.parse(JSON.stringify(await collService.getColls(options)))`  
- If `JSON.stringify` throws (e.g. circular refs, BigInt), catch and either skip cache for that call or use a safe serializer.

**Pros:**
- No new infra (no Redis, no add-ons).
- No extra cost.
- Same codebase; only change is in the cache layer.
- Cache is shared for all users on Vercel (Data Cache).

**Cons:**
- We must ensure Contentful responses are serializable (or strip/serialize them).
- `unstable_cache` is legacy in Next.js 16 (replaced by `use cache`), but still supported.

**Effort:** Low. Change only `contentful-cache.ts`: re-add `unstable_cache` and wrap returns with `JSON.parse(JSON.stringify(...))` (with try/catch if needed).

---

### 2. Page-level revalidation (ISR)

**What it is:** Keep server-side fetching but cache the **rendered page** (or segment) instead of the raw API response. Use `export const revalidate = 300` on the page (or layout) so Next.js caches the output and revalidates every 300 seconds. All users get the same cached page until revalidation.

**How:**  
- In `app/puertos/page.tsx`, `app/coffee-spots/page.tsx`, `app/rutas/page.tsx` and relevant detail pages, add `export const revalidate = 300` (or 60, 600, etc.).
- No change to the cache layer; the **full page render** (including the Contentful data) is what gets cached.

**Pros:**
- No serialization of raw API responses; Next.js caches the rendered result.
- Shared across all users on Vercel.
- No new infra or cost.
- Standard Next.js pattern.

**Cons:**
- Cache unit is the whole page (or segment), not per query. So you can’t share “same colls list” across multiple pages unless they’re the same route.
- Detail pages (e.g. `/puerto/[id]`) each have their own cache entry per `id`, which is what we want.

**Effort:** Low. Add one line per page: `export const revalidate = 300`.

---

### 3. Redis (e.g. Upstash) via Vercel

**What it is:** Use an external Redis (e.g. **Upstash Redis** from Vercel Marketplace) as a shared cache. Before calling Contentful, check Redis (e.g. key `contentful:colls:10:0`); if hit, return parsed value. If miss, call Contentful, then `set` in Redis with TTL (e.g. 300 seconds), then return. Same for all list/detail helpers.

**How:**  
- Add Upstash Redis to the project (Vercel Marketplace or direct).
- In `contentful-cache.ts`: for each getter, try `get(key)`; if value exists, `return JSON.parse(value)`. Else call service, then `set(key, JSON.stringify(data), { ex: 300 })`, return data.
- Keys must be deterministic (e.g. `contentful:colls:${limit}:${skip}`, `contentful:coll:${id}`).

**Pros:**
- Full control over serialization (you choose what to store).
- Cache is shared across all users and all serverless invocations.
- TTL and invalidation are explicit (e.g. delete key on webhook).

**Cons:**
- New dependency and env vars (Redis URL).
- Possible cost (Upstash has free tier, then paid).
- More code (get/set, key design, error handling).

**Effort:** Medium. Install client, add env, implement get/set in cache layer, define keys.

---

### 4. Next.js `use cache` (Next 16)

**What it is:** Use the new `'use cache'` directive (Next 16) to mark async functions as cacheable. Cache key is derived from the function and arguments; result is cached.

**Caveat:** In serverless, the **default in-memory cache for `use cache` does not persist across requests** (each request can hit a different instance). So for a **shared** cache for all users you need `'use cache: remote'` with a remote cache handler (e.g. Redis/KV), which brings you back to option 3.

**Conclusion:** For a shared cache for all users on Vercel without Redis, `use cache` alone is not enough; with Redis it’s similar to option 3. So not the first choice for “cache for all users with Vercel only.”

---

## Comparison

| Option                    | Shared for all users? | Extra cost | Effort | Serialization risk |
|---------------------------|------------------------|------------|--------|--------------------|
| 1. unstable_cache + JSON  | Yes (Data Cache)       | No         | Low    | Handled by us      |
| 2. Page revalidate (ISR)  | Yes                    | No         | Low    | None               |
| 3. Redis (Upstash)        | Yes                    | Maybe      | Medium | We control         |
| 4. use cache (remote)     | Yes (with Redis)       | Maybe      | Medium | Same as 3          |

---

## Recommended order

1. **Try option 1 (unstable_cache + JSON serialization)**  
   - Re-enable `unstable_cache` in `src/lib/contentful-cache.ts`.  
   - For every cached function, after calling the service, do:  
     `return JSON.parse(JSON.stringify(data))`  
     (inside try/catch; on failure, either skip cache or return raw and don’t cache).  
   - Deploy and test: puertos, coffee-spots, rutas, and one detail page.  
   - If anything still fails to serialize, fix that query’s response (strip or transform) or fall back to no cache for that getter only.

2. **If option 1 is too fragile, add option 2 (ISR)**  
   - Add `export const revalidate = 300` to the list and detail pages that use the cache layer.  
   - Then you get shared cache at the page level even if we turn off `unstable_cache` again.

3. **Only if you need more control or option 1/2 aren’t enough, add Redis (option 3)**  
   - e.g. Upstash Redis via Vercel, then implement get/set in the cache layer with explicit keys and TTL.

---

## Summary

- **Yes, you can reduce requests further and use a cache shared by all users**, without leaving the Vercel/Next ecosystem.
- **Best first step:** Re-enable Next.js `unstable_cache` and make the stored value JSON-serializable (e.g. `JSON.parse(JSON.stringify(data))`). That uses Vercel’s Data Cache and shares it for all users.
- **Fallback:** Use page-level `revalidate` (ISR) so the rendered page is cached for all users.
- **Optional later:** Add Redis (e.g. Upstash) for full control and on-demand invalidation (e.g. Contentful webhooks).

No code changes are made in this step; this doc is analysis and plan only.

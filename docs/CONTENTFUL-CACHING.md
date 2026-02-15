# Contentful: what changed and why

Short summary of the server-side Contentful changes.

---

## Cache status

**Is there a cache right now?**  
**No.** Caching is turned off. Every page view that needs Contentful data does one fresh request from the server to Contentful.

**How long does the cache take to refresh?**  
There is no cache, so there is no “refresh” time. Data is fetched on each request.

**If we turn the cache back on later:**  
We’d use a **5-minute** revalidation (300 seconds). So:
- First request → fetch from Contentful, store in cache.
- For the next 5 minutes → serve from cache (no new Contentful call).
- After 5 minutes → next request fetches again and updates the cache.

Caching was disabled because some responses failed when Next.js tried to store them. It can be re-enabled in `src/lib/contentful-cache.ts` once responses are JSON-serializable.

---

## The problem we were solving

Before:
- Every visitor’s **browser** called Contentful (puertos, cafés, rutas, detail pages).
- More visitors = many more API calls and risk of hitting Contentful limits.

---

## What we did

1. **Server-only fetching**  
   We added a layer (`src/lib/contentful-cache.ts`) that calls Contentful **only from the server**. The browser never talks to Contentful for those pages.

2. **List pages (puertos, cafés, rutas)**  
   The server fetches the list and sends the page with data. No client-side Contentful calls on those routes.

3. **Detail pages (puerto, café, ruta, colección)**  
   Same idea: the server fetches the single item and renders the page. No client → Contentful.

4. **Env vars**  
   The app uses `NEXT_PUBLIC_CONTENTFUL_*` (or `CONTENTFUL_*`) so both server and client can work. You can use server-only vars on the server if you want to keep the token out of the browser.

---

## Before vs after

| Before | After |
|--------|--------|
| Browser → Contentful on every visit | Server → Contentful (no browser calls for these pages) |
| One API call per visitor | One server call per page render (no cache, so each render = one Contentful request) |

---

## What didn’t change

- **Home page** and any screen that still fetches on open (e.g. carousels with `fetchData={true}`) still call Contentful from the client when they load.
- Only the list and detail pages we moved use the server layer.

---

## Main files

- **`src/lib/contentful-cache.ts`** – Server-side Contentful helpers (no cache at the moment).
- **`src/lib/apollo-client.ts`** – Contentful env vars and Apollo client.
- **`src/app/puertos/page.tsx`**, **`coffee-spots/page.tsx`**, **`rutas/page.tsx`** – Server components that fetch and pass data to client components.
- **Detail pages** under `coleccion-rutas`, `puerto`, `coffee`, `ruta`, `route` – Use the same server helpers.

---

**In one line:** Contentful is now called from the server for list and detail pages; there is no cache right now, so every request gets fresh data. Cache can be re-enabled later with a 5-minute refresh if we fix serialization.

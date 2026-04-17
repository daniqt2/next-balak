# LLM Friendliness Plan — BALAK RIDE

## Overview

This document outlines a phased plan to make BALAK RIDE both capable of **consuming LLMs** (adding AI features to the product) and **consumable by LLMs** (making content and APIs accessible to AI agents and tools).

**Current state:** No AI/LLM integrations. Rich content locked in Contentful's block/rich-text format.

---

## Two Dimensions of LLM-Friendliness

| Dimension | What it means | Examples |
|-----------|--------------|---------|
| **Consuming LLMs** | Add AI features to the product | Chat, recommendations, natural language search |
| **Being consumable by LLMs** | Make content/API accessible to AI agents | Flat text APIs, JSON-LD, `/llms.txt` |

---

## Roadmap (Priority Order)

### Priority 1 — Rich Text Serializer (Foundation)

**The biggest current gap.** Contentful descriptions are stored in block/rich-text format and have no plain-text export. Everything else in this plan depends on this.

**Tasks:**
- [ ] Add a Contentful Rich Text → plain markdown/text serializer utility
- [ ] Apply it to: Route descriptions, Coll descriptions, InterestSpot descriptions
- [ ] Expose serialized text via existing service methods

**Files to touch:**
- `src/lib/contentful-rich-text-serializer.ts` (new)
- `src/services/route-service.ts`
- `src/services/coll-service.ts`
- `src/services/coffee-service.ts`

**Suggested library:** `@contentful/rich-text-plain-text-renderer`

---

### Priority 2 — Flat Context API Endpoint

A single endpoint that returns all routes as LLM-consumable prose, not raw GraphQL JSON. Enables any downstream AI feature.

**Tasks:**
- [ ] Create `GET /api/routes/context` that returns an array of plain-text route summaries
- [ ] Include per-route: title, slug, metrics (km, elevation, time), difficulty, description (plain text), tags, linked colls, linked coffee stops
- [ ] Cache at build time with ISR revalidation (align with existing 10-min strategy)

**Example response shape:**
```json
[
  {
    "slug": "ruta-collserola",
    "summary": "A 45km loop through Collserola with 900m elevation gain. Moderate difficulty. Passes 2 mountain ports and 1 coffee stop in Sant Cugat. Best for intermediate riders."
  }
]
```

**Files to create:**
- `src/app/api/routes/context/route.ts`

---

### Priority 3 — Text-Only Route Summary API

Per-route endpoint returning a clean markdown summary. Used for AI recommendations, accessibility, and sharing.

**Tasks:**
- [ ] Create `GET /api/routes/[slug]/summary` returning markdown
- [ ] Include: metrics table, full description, mountain passes list, coffee stops list
- [ ] Reuse the Rich Text serializer from Priority 1

**Example output:**
```markdown
# Ruta Collserola

**Distance:** 45 km | **Elevation:** 900 m | **Time:** ~3h | **Difficulty:** Moderate

## Description
A scenic loop through the Collserola natural park...

## Mountain Passes
- Coll de la Mola (820m)

## Coffee Stops
- Bar El Pins, Sant Cugat
```

**Files to create:**
- `src/app/api/routes/[slug]/summary/route.ts`

---

### Priority 4 — `/llms.txt` and JSON-LD Schema Markup

Make the app discoverable and parseable by AI crawlers and agents.

#### `/llms.txt`
Emerging convention (like `robots.txt` for AI). Describes what the app does and how to navigate it.

**Tasks:**
- [ ] Create `public/llms.txt` with: app description, key entities (routes, colls, coffee stops), key API endpoints, content language

#### JSON-LD (Schema.org)
Add structured metadata to route and mountain pass pages for AI-powered search engines.

**Tasks:**
- [ ] Add `SportsActivity` or `TouristRoute` JSON-LD to `/route/[slug]`
- [ ] Add `LandmarksOrHistoricalBuildings` or `Mountain` JSON-LD to `/puertos/[slug]`
- [ ] Include: name, description, geo coordinates, distance, elevation, difficulty, images

**Files to touch:**
- `src/app/route/[slug]/page.tsx`
- `src/app/puertos/[slug]/page.tsx` (if it exists)
- `public/llms.txt` (new)

---

### Priority 5 — Natural Language Route Search / Chat

**High value, conversational UX.** Users ask in plain language and get route recommendations.

**Example interaction:**
```
User: "Find me a 3-hour route with less than 1000m elevation near a coffee stop"
LLM: calls getRoutes({ maxElevation: 1000, hasCoffeeStop: true })
LLM: "Here are 3 routes that match your criteria..."
```

**Tasks:**
- [ ] Add `@anthropic-ai/sdk` or Vercel `ai` package
- [ ] Create `POST /api/chat` streaming route
- [ ] Define LLM tools that wrap existing service methods:
  - `searchRoutes({ difficulty, maxKm, maxElevation, hasCoffeeStop, tags })`
  - `getRouteDetails({ slug })`
  - `getColls({ minElevation, difficulty })`
- [ ] Build a chat UI component (sidebar or modal)
- [ ] Feed route context from Priority 2 endpoint as system prompt

**Files to create:**
- `src/app/api/chat/route.ts`
- `src/components/chat/ChatWidget.tsx`
- `src/components/chat/ChatMessage.tsx`
- `src/lib/llm-tools.ts`

**Recommended stack:**
- `ai` (Vercel AI SDK) for streaming + tool calling
- Claude Sonnet as the model (Anthropic `claude-sonnet-4-6`)

---

### Priority 6 — RAG Over Full Route Corpus (Advanced)

For scale. When the number of routes grows beyond what fits in a context window, use semantic search.

**Tasks:**
- [ ] Generate embeddings for all route summaries at build time
- [ ] Store in a vector DB (Pinecone, Supabase pgvector, or Vercel KV + custom)
- [ ] Create a semantic search endpoint `POST /api/routes/search`
- [ ] Use vector search results as context in the chat route from Priority 5

**When to consider this:** When route count exceeds ~200 or response quality degrades.

---

### Priority 7 — AI-Enhanced Content (Editorial Tooling)

Internal tools to help the team write better content faster. Does not need to be in the app itself.

**Tasks:**
- [ ] Script to generate route descriptions from GPX data + metrics
- [ ] Script to auto-suggest tags based on description text
- [ ] Script to generate alt-text for images
- [ ] Optional: Contentful webhook → LLM pipeline for auto-enrichment on publish

---

## Summary Table

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | Rich Text serializer | Low | Critical (unblocks everything) |
| 2 | Flat context API endpoint | Low | High |
| 3 | Text-only summary API | Low | Medium |
| 4 | `/llms.txt` + JSON-LD | Low | Medium (SEO + discoverability) |
| 5 | Natural language chat/search | Medium | High (product feature) |
| 6 | RAG / vector search | High | High (at scale) |
| 7 | Editorial AI tooling | Medium | Medium (internal) |

---

## Tech Stack Additions

| Package | Purpose |
|---------|---------|
| `@contentful/rich-text-plain-text-renderer` | Serialize Contentful blocks to plain text |
| `ai` (Vercel AI SDK) | Streaming chat routes, tool calling, RSC support |
| `@anthropic-ai/sdk` | Claude API client (if not using Vercel AI SDK) |
| Vector DB (optional) | Pinecone / Supabase pgvector for RAG |

---

## Architectural Notes

- **API keys stay server-side** — Next.js Server Components and API routes already handle this securely. No changes needed.
- **Reuse existing services** — `RouteService`, `CollService`, `CoffeeService` are clean injection points for LLM tool definitions. No need to rewrite.
- **ISR caching** — context endpoints should align with the existing 10-minute revalidation strategy.
- **Streaming** — use streaming responses for chat to avoid cold-start timeouts on Vercel.

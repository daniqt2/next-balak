import { NextResponse } from 'next/server';
import { getRouteGroupsCached } from '@/lib/contentful-cache';
import type { RouteGroup } from '@/contentful-types';

/** Same revalidate window as /rutas so batches stay consistent with the first page. */
export const revalidate = 600;

const MAX_LIMIT = 50;

/**
 * Serves one batch of route groups so the client can pull the next page into
 * memory before the user asks for it. Paging itself happens client-side.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = Math.max(0, Number(searchParams.get('skip') ?? 0) || 0);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(searchParams.get('limit') ?? 8) || 8)
  );

  try {
    const data = await getRouteGroupsCached({ limit, skip });
    const collection = data?.routeGroupCollection;

    return NextResponse.json({
      items:
        collection?.items?.filter((r): r is RouteGroup => r != null) ?? [],
      total: collection?.total ?? 0,
      skip,
      limit,
    });
  } catch (error) {
    console.error('[api/route-groups] fetch failed', error);
    return NextResponse.json(
      { error: 'No se pudieron cargar las colecciones.' },
      { status: 502 }
    );
  }
}

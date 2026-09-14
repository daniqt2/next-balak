import { NextResponse } from 'next/server';
import { getCollsCached } from '@/lib/contentful-cache';
import type { Coll } from '@/contentful-types';

/** Same revalidate window as /puertos so batches stay consistent with page 1. */
export const revalidate = 600;

const MAX_LIMIT = 50;

/**
 * Serves one batch of puertos so the client can pull the next page into memory
 * before the user asks for it. Paging itself happens client-side.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = Math.max(0, Number(searchParams.get('skip') ?? 0) || 0);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(searchParams.get('limit') ?? 8) || 8)
  );

  try {
    const data = await getCollsCached({ limit, skip });
    const collection = data?.collCollection;

    return NextResponse.json({
      items: collection?.items?.filter((c): c is Coll => c != null) ?? [],
      total: collection?.total ?? 0,
      skip,
      limit,
    });
  } catch (error) {
    console.error('[api/colls] fetch failed', error);
    return NextResponse.json(
      { error: 'No se pudieron cargar los puertos.' },
      { status: 502 }
    );
  }
}

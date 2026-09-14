import { NextResponse } from 'next/server';
import { getCoffeeSpotsCached } from '@/lib/contentful-cache';
import type { InterestSpot } from '@/contentful-types';

/** Same revalidate window as /coffee-spots so batches stay consistent. */
export const revalidate = 600;

const MAX_LIMIT = 50;

/**
 * Serves one batch of paradas so the client can pull the next page into memory
 * before the user asks for it. Paging itself happens client-side.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = Math.max(0, Number(searchParams.get('skip') ?? 0) || 0);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(searchParams.get('limit') ?? 9) || 9)
  );

  try {
    const data = await getCoffeeSpotsCached({ limit, skip });
    const collection = data?.interestSpotCollection;

    return NextResponse.json({
      items:
        collection?.items?.filter((s): s is InterestSpot => s != null) ?? [],
      total: collection?.total ?? 0,
      skip,
      limit,
    });
  } catch (error) {
    console.error('[api/coffee-spots] fetch failed', error);
    return NextResponse.json(
      { error: 'No se pudieron cargar las paradas.' },
      { status: 502 }
    );
  }
}

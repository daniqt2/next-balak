import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxies GPX file from Contentful (or other allowed origins) to avoid CORS.
 * The map loads GPX via fetch in the browser; Contentful's CDN may block
 * cross-origin requests, so we fetch server-side and return the body.
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url');
  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  let href: URL;
  try {
    href = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  // Only allow Contentful CDN to avoid open redirect / abuse
  if (!href.hostname.endsWith('ctfassets.net') && !href.hostname.endsWith('contentful.com')) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  if (href.protocol !== 'https:' && href.protocol !== 'http:') {
    return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 });
  }

  try {
    const res = await fetch(href.toString(), {
      headers: { Accept: 'application/gpx+xml, application/xml, text/xml, */*' },
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/gpx+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    console.error('GPX proxy error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch GPX' },
      { status: 502 }
    );
  }
}

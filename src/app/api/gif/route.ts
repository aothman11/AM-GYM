import { NextRequest, NextResponse } from 'next/server';

// Allowed origin domains to prevent this proxy from being used for arbitrary URLs
const ALLOWED_HOSTS = ['fitnessprogramer.com'];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Safety: only proxy from whitelisted domains
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h))) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        // Pretend we're a browser visiting fitnessprogramer.com directly
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
        'Referer': 'https://fitnessprogramer.com/',
        'Accept': 'image/gif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      // 8-second timeout
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Upstream error', status: upstream.status }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/gif';
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache aggressively — GIFs never change
        'Cache-Control': 'public, max-age=604800, immutable',
        'Content-Length': String(body.byteLength),
      },
    });
  } catch (err) {
    console.error('[gif-proxy] fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

const API_KEY = '47eb73f2demsh76f968abf669fefp1adc10jsn53c4004121b4';
const EX_HOST = 'exercisedb.p.rapidapi.com';

const cache: Record<string, string> = {};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const gender = searchParams.get('gender') || 'male';

  if (!name) {
    return NextResponse.json({ error: 'Missing name parameter' }, { status: 400 });
  }

  const key = `${name}-${gender}`.toLowerCase();
  
  if (cache[key]) {
    return NextResponse.json({ gifUrl: cache[key] });
  }

  try {
    const url = `https://${EX_HOST}/exercises/name/${encodeURIComponent(name.toLowerCase())}?limit=1&offset=0`;
    
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': EX_HOST,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();

    if (!data || !data.length || !data[0].gifUrl) {
      return NextResponse.json({ error: 'No gif found', name }, { status: 404 });
    }

    const gifUrl = data[0].gifUrl;
    cache[key] = gifUrl;
    
    return NextResponse.json({ gifUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

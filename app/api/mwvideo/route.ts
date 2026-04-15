import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json(
      { error: 'Exercise name is required to fetch the media.' },
      { status: 400 }
    )
  }

  try {
    const formattedName = encodeURIComponent(name)
    const safePlaceholderUrl = `https://placehold.co/600x400/111111/22ff44/png?text=${formattedName}`

    /* TODO FOR PRODUCTION:
      1. Create a folder at `public/gifs/` in your Next.js project.
      2. Save your actual exercise GIFs there (e.g., `push-ups.gif`).
      3. Update this route to point to the local file path:

      const localFileName = name.toLowerCase().replace(/\s+/g, '-')
      return NextResponse.json({ gifUrl: `/gifs/${localFileName}.gif` }, { status: 200 })

      OR use the ExerciseDB RapidAPI:
      const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}?limit=1`
      const r = await fetch(url, { headers: { 'x-rapidapi-key': process.env.RAPIDAPI_KEY || '', 'x-rapidapi-host': 'exercisedb.p.rapidapi.com' } })
      const data = await r.json()
      return NextResponse.json({ gifUrl: data[0]?.gifUrl || null })
    */

    return NextResponse.json({ gifUrl: safePlaceholderUrl }, { status: 200 })
  } catch (error) {
    console.error('Media Fetch Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch the exercise media.' },
      { status: 500 }
    )
  }
}

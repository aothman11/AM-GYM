import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

/** POST /api/user/food — persist a new food log entry for today. */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();
  const { id, date, foodId, name, emoji, cal, p, c, f, per, isMeal } = body;

  if (!id || typeof id !== 'string' || !date || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Ignore duplicates (idempotent — client may retry on failure)
  const existing = await prisma.foodEntry.findUnique({ where: { id } });
  if (existing) {
    return NextResponse.json({ entry: existing });
  }

  const entry = await prisma.foodEntry.create({
    data: {
      id,
      userId,
      date,
      foodId: Number(foodId) || 0,
      name,
      emoji: emoji ?? '🍽',
      cal: Number(cal) || 0,
      p: Number(p) || 0,
      c: Number(c) || 0,
      f: Number(f) || 0,
      per: per ?? '',
      isMeal: isMeal === true,
    },
  });

  return NextResponse.json({ entry }, { status: 201 });
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

/** GET /api/user/data — returns the authenticated user's profile + today's food entries. */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const today = new Date().toDateString();

  const [profile, foodEntries] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId } }),
    prisma.foodEntry.findMany({ where: { userId, date: today }, orderBy: { createdAt: 'asc' } }),
  ]);

  return NextResponse.json({ profile, foodEntries });
}

/** POST /api/user/data — upserts the authenticated user's profile. Body is a partial UserProfile. */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();

  // Strip unknown / dangerous fields before writing
  const {
    displayName, weight, height, age, goal, gender, lang, calorieTarget,
    wizardSplit, wizardLevel, wizardGoal, wizardEquip,
    streak, weekWorkouts, totalWorkouts, lastWorkoutDate, weekStart, achievements,
  } = body;

  const data = {
    ...(displayName !== undefined && { displayName }),
    ...(weight !== undefined && { weight }),
    ...(height !== undefined && { height }),
    ...(age !== undefined && { age }),
    ...(goal !== undefined && { goal }),
    ...(gender !== undefined && { gender }),
    ...(lang !== undefined && { lang }),
    ...(calorieTarget !== undefined && { calorieTarget }),
    ...(wizardSplit !== undefined && { wizardSplit }),
    ...(wizardLevel !== undefined && { wizardLevel }),
    ...(wizardGoal !== undefined && { wizardGoal }),
    ...(wizardEquip !== undefined && { wizardEquip }),
    ...(streak !== undefined && { streak }),
    ...(weekWorkouts !== undefined && { weekWorkouts }),
    ...(totalWorkouts !== undefined && { totalWorkouts }),
    ...(lastWorkoutDate !== undefined && { lastWorkoutDate }),
    ...(weekStart !== undefined && { weekStart }),
    ...(Array.isArray(achievements) && { achievements }),
  };

  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });

  return NextResponse.json({ profile });
}

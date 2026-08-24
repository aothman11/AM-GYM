import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

/** DELETE /api/user/food/[id] — remove a food log entry owned by the authenticated user. */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const userId = session.user.id;

  // Verify ownership before deleting to prevent IDOR
  const entry = await prisma.foodEntry.findFirst({ where: { id, userId } });
  if (!entry) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.foodEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

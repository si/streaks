import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { syncGitHubActivity } from '@/lib/github'

export async function POST(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, provider: 'github' },
  })

  if (!account?.access_token || !account.providerAccountId) {
    return NextResponse.json({ error: 'GitHub not connected' }, { status: 400 })
  }

  const count = await syncGitHubActivity(
    session.user.id,
    account.access_token,
    account.providerAccountId
  )

  return NextResponse.json({ added: count })
}

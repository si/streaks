import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { backfillSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = backfillSchema.parse(body)

    // Update user preferences
    await prisma.userPreference.update({
      where: { userId: session.user.id },
      data: {
        lookbackPeriod: validatedData.lookbackPeriod,
      },
    })

    // Update onboarding state
    await prisma.onboardingState.update({
      where: { userId: session.user.id },
      data: {
        step: 4,
        lookbackSet: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving backfill:', error)
    return NextResponse.json(
      { error: 'Failed to save backfill selection' },
      { status: 500 }
    )
  }
}
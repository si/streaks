import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { goalSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = goalSchema.parse(body)

    // Upsert user preferences
    await prisma.userPreference.upsert({
      where: { userId: session.user.id },
      update: {
        goalCategory: validatedData.goalCategory,
        commsOptIn: validatedData.commsOptIn,
        lookbackPeriod: validatedData.lookbackPeriod,
      },
      create: {
        userId: session.user.id,
        goalCategory: validatedData.goalCategory,
        commsOptIn: validatedData.commsOptIn,
        lookbackPeriod: validatedData.lookbackPeriod,
      },
    })

    // Update onboarding state
    await prisma.onboardingState.upsert({
      where: { userId: session.user.id },
      update: {
        step: 2,
        goalSet: true,
        providersHint: validatedData.goalCategory,
      },
      create: {
        userId: session.user.id,
        step: 2,
        goalSet: true,
        providersHint: validatedData.goalCategory,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving goal:', error)
    return NextResponse.json(
      { error: 'Failed to save goal' },
      { status: 500 }
    )
  }
}
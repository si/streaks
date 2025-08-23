import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/')
  }

  // Get onboarding state
  const onboardingState = await prisma.onboardingState.findUnique({
    where: { userId: session.user.id },
  })

  const currentStep = onboardingState?.step || 1

  // Redirect to the appropriate step
  switch (currentStep) {
    case 1:
      redirect('/onboarding/goal')
    case 2:
      redirect('/onboarding/services')
    case 3:
      redirect('/onboarding/backfill')
    case 4:
      redirect('/onboarding/preview')
    case 5:
      redirect('/timeline')
    default:
      redirect('/onboarding/goal')
  }
}
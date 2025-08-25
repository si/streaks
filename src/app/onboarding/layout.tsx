import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Stepper } from '@/components/onboarding/Stepper'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/')
  }

  // Get onboarding state
  const onboardingState = await prisma.onboardingState.findUnique({
    where: { userId: session.user.id },
  })

  const currentStep = onboardingState?.step || 1

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-md px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-4">
            Personal Activity Aggregator
          </h1>
          <Stepper currentStep={currentStep} totalSteps={5} />
        </header>

        <main className="mb-8">
          {children}
        </main>

        <footer className="text-center text-sm text-muted-foreground">
          <p>Your data stays private. You decide what to share.</p>
        </footer>
      </div>
    </div>
  )
}
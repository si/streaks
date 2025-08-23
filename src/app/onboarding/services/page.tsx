import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { recommendedFor } from '@/lib/providers'
import { ServiceCard } from '@/components/onboarding/ServiceCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ServicesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/')
  }

  // Get user preferences to show recommended services
  const userPreference = await prisma.userPreference.findUnique({
    where: { userId: session.user.id },
  })

  if (!userPreference?.goalCategory) {
    redirect('/onboarding/goal')
  }

  const recommendedProviders = recommendedFor(userPreference.goalCategory)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Connect your services</h2>
        <p className="text-muted-foreground">
          We've picked some services that work well with your {userPreference.goalCategory.toLowerCase()} goal
        </p>
      </div>

      <div className="grid gap-4">
        {recommendedProviders.map((provider) => (
          <ServiceCard
            key={provider.id}
            provider={provider}
            href={`/onboarding/connect/${provider.id}`}
          />
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/onboarding/backfill">
            Skip for now
          </Link>
        </Button>
      </div>
    </div>
  )
}
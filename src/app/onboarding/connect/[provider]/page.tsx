'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProvider } from '@/lib/providers'
import { ProviderId } from '@prisma/client'

interface ConnectPageProps {
  params: {
    provider: string
  }
}

export default function ConnectPage({ params }: ConnectPageProps) {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  
  const provider = getProvider(params.provider as ProviderId)
  
  if (!provider) {
    router.push('/onboarding/services')
    return null
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    
    if (provider.oauthSupported) {
      // For OAuth providers, use NextAuth
      await signIn(provider.id, {
        callbackUrl: '/onboarding/backfill',
      })
    } else {
      // For non-OAuth providers, show stub and continue
      setTimeout(() => {
        router.push('/onboarding/backfill')
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Connect {provider.name}</h2>
        <p className="text-muted-foreground">
          {provider.oauthSupported 
            ? 'We'll securely connect to your account'
            : 'We'll hook this up later - for now, let's continue'
          }
        </p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-lg">
            <span className="text-3xl">{provider.emoji}</span>
            <span>{provider.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {provider.description}
          </p>
          
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting 
              ? 'Connecting...' 
              : provider.oauthSupported 
                ? 'Connect and continue'
                : 'Continue'
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
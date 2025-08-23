'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await signIn('email', { email, callbackUrl: '/onboarding' })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn what you already do into a simple timeline
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Music, runs, commits, films - see everything you do in one beautiful timeline. 
            Your data stays private. You decide what to share.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎧</span>
                <span>Music</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track your listening history from Spotify and see your musical journey
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏃</span>
                <span>Fitness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your workouts, runs, and physical activities from Strava
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💻</span>
                <span>Code</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                See your coding activity and project contributions from GitHub
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎬</span>
                <span>Films</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Keep track of your film watching history and reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Get started</h2>
            <p className="text-muted-foreground">
              Choose your preferred sign-in method
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
              className="w-full"
              size="lg"
            >
              Continue with Google
            </Button>

            <Button 
              onClick={() => signIn('apple', { callbackUrl: '/onboarding' })}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Continue with Apple
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send magic link'}
              </Button>
            </form>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to our terms and privacy policy
          </p>
        </div>
      </div>
    </div>
  )
}
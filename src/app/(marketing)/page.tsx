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
            Build lasting habits with Habit Streaks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your daily activities and build momentum with beautiful streak visualizations. 
            From fitness to learning, see your progress and stay motivated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔥</span>
                <span>Fitness Streaks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build consistent workout habits with Strava integration and streak tracking
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📚</span>
                <span>Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track your daily learning activities, coding sessions, and skill development
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎨</span>
                <span>Creativity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your creative projects, writing, and artistic pursuits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🧘</span>
                <span>Wellness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track meditation, reading, and other wellness activities for a balanced life
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Start your streak journey</h2>
            <p className="text-muted-foreground">
              Join thousands building better habits every day
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
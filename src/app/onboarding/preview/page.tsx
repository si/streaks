'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockTimelineItems = [
  {
    id: 1,
    emoji: '🎧',
    title: 'Listened to "Bohemian Rhapsody"',
    time: '2 hours ago',
    service: 'Spotify',
  },
  {
    id: 2,
    emoji: '🏃',
    title: 'Completed 5km run',
    time: '1 day ago',
    service: 'Strava',
  },
  {
    id: 3,
    emoji: '💻',
    title: 'Pushed 3 commits to main',
    time: '2 days ago',
    service: 'GitHub',
  },
  {
    id: 4,
    emoji: '🎬',
    title: 'Watched "The Matrix"',
    time: '3 days ago',
    service: 'Letterboxd',
  },
  {
    id: 5,
    emoji: '📍',
    title: 'Checked in at Coffee Shop',
    time: '1 week ago',
    service: 'Swarm',
  },
]

export default function PreviewPage() {
  const router = useRouter()

  const handleGoToTimeline = () => {
    router.push('/timeline')
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Here's your timeline</h2>
        <p className="text-muted-foreground">
          This is how your activities will appear - a simple, chronological view of everything you do
        </p>
      </div>

      <div className="space-y-3">
        {mockTimelineItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.time} • {item.service}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Your real data will appear here once we've connected your services
        </p>
        <Button onClick={handleGoToTimeline} className="w-full">
          Go to timeline
        </Button>
      </div>
    </div>
  )
}
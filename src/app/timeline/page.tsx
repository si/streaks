'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockTimelineData = [
  {
    date: 'Today',
    items: [
      {
        id: 1,
        emoji: '🎧',
        title: 'Listened to "Bohemian Rhapsody" by Queen',
        time: '2 hours ago',
        service: 'Spotify',
        category: 'entertainment',
      },
      {
        id: 2,
        emoji: '💻',
        title: 'Pushed 3 commits to personal-website',
        time: '4 hours ago',
        service: 'GitHub',
        category: 'productivity',
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        id: 3,
        emoji: '🏃',
        title: 'Completed 5km run in 25:30',
        time: '1 day ago',
        service: 'Strava',
        category: 'fitness',
      },
      {
        id: 4,
        emoji: '🎬',
        title: 'Watched "The Matrix" (1999)',
        time: '1 day ago',
        service: 'Letterboxd',
        category: 'entertainment',
      },
    ],
  },
  {
    date: 'This week',
    items: [
      {
        id: 5,
        emoji: '📍',
        title: 'Checked in at Central Coffee',
        time: '3 days ago',
        service: 'Swarm',
        category: 'social',
      },
      {
        id: 6,
        emoji: '📚',
        title: 'Finished reading "The Pragmatic Programmer"',
        time: '5 days ago',
        service: 'Goodreads',
        category: 'productivity',
      },
    ],
  },
]

const filterOptions = [
  { id: 'all', label: 'All', emoji: '📋' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'fitness', label: 'Fitness', emoji: '🏃' },
  { id: 'productivity', label: 'Productivity', emoji: '💻' },
  { id: 'social', label: 'Social', emoji: '📍' },
]

export default function TimelinePage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredData = mockTimelineData.map(day => ({
    ...day,
    items: day.items.filter(item => 
      activeFilter === 'all' || item.category === activeFilter
    ),
  })).filter(day => day.items.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Timeline</h1>
          
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
              </Button>
            ))}
          </div>
        </header>

        <main className="space-y-8">
          {filteredData.map((day) => (
            <div key={day.date} className="space-y-3">
              <h2 className="text-lg font-semibold text-muted-foreground">
                {day.date}
              </h2>
              
              <div className="space-y-3">
                {day.items.map((item) => (
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
            </div>
          ))}
        </main>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No activities found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
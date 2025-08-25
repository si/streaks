import { GoalCategory, ProviderId } from '@prisma/client'

export interface Provider {
  id: ProviderId
  name: string
  emoji: string
  description: string
  categories: GoalCategory[]
  oauthSupported: boolean
}

export const providers: Provider[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    emoji: '🎧',
    description: 'Your music listening history',
    categories: ['ENTERTAINMENT'],
    oauthSupported: true,
  },
  {
    id: 'strava',
    name: 'Strava',
    emoji: '🏃',
    description: 'Your fitness activities and workouts',
    categories: ['FITNESS'],
    oauthSupported: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    emoji: '💻',
    description: 'Your code commits and contributions',
    categories: ['PRODUCTIVITY', 'CREATIVITY'],
    oauthSupported: true,
  },
  {
    id: 'letterboxd',
    name: 'Letterboxd',
    emoji: '🎬',
    description: 'Your film watching history',
    categories: ['ENTERTAINMENT'],
    oauthSupported: false,
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    emoji: '📚',
    description: 'Your reading progress and reviews',
    categories: ['CREATIVITY', 'ENTERTAINMENT'],
    oauthSupported: false,
  },
  {
    id: 'swarm',
    name: 'Swarm',
    emoji: '📍',
    description: 'Your location check-ins',
    categories: ['LIFE_SOCIAL'],
    oauthSupported: false,
  },
  {
    id: 'rss',
    name: 'RSS Feeds',
    emoji: '📰',
    description: 'Your content consumption',
    categories: ['ENTERTAINMENT', 'PRODUCTIVITY'],
    oauthSupported: false,
  },
  {
    id: 'activitypub',
    name: 'ActivityPub',
    emoji: '🗣️',
    description: 'Your social media activity',
    categories: ['LIFE_SOCIAL', 'ENTERTAINMENT'],
    oauthSupported: false,
  },
]

export function recommendedFor(goal: GoalCategory): Provider[] {
  return providers.filter(provider => 
    provider.categories.includes(goal)
  )
}

export function getProvider(id: ProviderId): Provider | undefined {
  return providers.find(provider => provider.id === id)
}
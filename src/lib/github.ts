import { prisma } from './prisma'

interface CommitEvent {
  type: 'commit'
  repo: string
  message: string
  url: string
  timestamp: string
}

interface IssueEvent {
  type: 'issue'
  repo: string
  message: string
  url: string
  timestamp: string
  status: string
}

async function fetchGitHub<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'streaks-app',
    },
  })
  if (!res.ok) throw new Error(`GitHub request failed: ${res.status}`)
  return res.json() as Promise<T>
}

export async function syncGitHubActivity(userId: string, token: string, username: string) {
  const events = await fetchGitHub<any[]>(`https://api.github.com/users/${username}/events?per_page=100`, token)
  const commits: CommitEvent[] = []
  for (const ev of events) {
    if (ev.type === 'PushEvent') {
      const repo = ev.repo?.name ?? ''
      for (const commit of ev.payload?.commits ?? []) {
        const apiUrl = commit.url as string
        const htmlUrl = apiUrl
          .replace('api.github.com/repos', 'github.com')
          .replace('/commits/', '/commit/')
        commits.push({
          type: 'commit',
          repo,
          message: commit.message,
          url: htmlUrl,
          timestamp: ev.created_at,
        })
      }
    }
  }

  const issues = await fetchGitHub<any[]>(`https://api.github.com/issues?filter=assigned&state=all&per_page=100`, token)
  const issueEvents: IssueEvent[] = issues.map(issue => ({
    type: 'issue',
    repo: issue.repository.full_name,
    message: issue.title,
    url: issue.html_url,
    timestamp: issue.updated_at,
    status: issue.state,
  }))

  const activities = [...commits, ...issueEvents].map(a => ({
    userId,
    type: a.type,
    repo: a.repo,
    message: a.message,
    url: a.url,
    timestamp: new Date(a.timestamp),
    status: 'status' in a ? a.status : undefined,
  }))

  for (const activity of activities) {
    await prisma.gitHubActivity.upsert({
      where: { userId_url: { userId: activity.userId, url: activity.url } },
      update: {},
      create: activity,
    })
  }

  return activities.length
}

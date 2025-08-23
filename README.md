# Personal Activity Aggregator

Turn what you already do into a simple timeline - music, runs, commits, films. Your data stays private. You decide what to share.

## Features

- **Multi-provider integration**: Spotify, Strava, GitHub, Letterboxd, Goodreads, Swarm, RSS, ActivityPub
- **Smart recommendations**: Services are recommended based on your chosen goal
- **Privacy-first**: Your data stays private; you control what to share
- **Mobile-first design**: Beautiful, responsive UI that works on all devices
- **UK English copy**: Friendly, warm tone without guilt language

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google, Apple, Email magic links)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or Supabase)
- Google OAuth credentials (optional)
- Apple OAuth credentials (optional)
- SMTP server for email magic links (optional)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd personal-activity-aggregator
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/personal_activity_aggregator"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   APPLE_ID=your-apple-id
   APPLE_SECRET=your-apple-secret
   EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
   EMAIL_FROM=hello@your.app
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Landing page
│   ├── api/
│   │   ├── auth/            # NextAuth routes
│   │   └── onboarding/      # Onboarding API endpoints
│   ├── onboarding/          # Onboarding flow pages
│   └── timeline/            # Main timeline view
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── onboarding/          # Onboarding-specific components
│   ├── forms/               # Form field components
│   └── providers/           # Context providers
└── lib/
    ├── auth.ts              # NextAuth configuration
    ├── prisma.ts            # Prisma client
    ├── providers.ts         # Service provider catalogue
    ├── validation.ts        # Zod schemas
    └── utils.ts             # Utility functions
```

## Onboarding Flow

1. **Registration**: Google/Apple OAuth or email magic link
2. **Goal Selection**: Choose primary goal category (Fitness, Creativity, Entertainment, Productivity, Life & Social)
3. **Service Connection**: View recommended services and optionally connect providers
4. **Backfill Period**: Select how far back to look for data (This year, Last 30 days, All time)
5. **Preview**: See mock timeline and proceed to main app

## Database Schema

### Core Models
- `User`: User accounts and profiles
- `UserPreference`: User goals and settings
- `UserConnection`: Connected service accounts
- `OnboardingState`: Onboarding progress tracking

### NextAuth Models
- `Account`: OAuth provider accounts
- `Session`: User sessions
- `VerificationToken`: Email verification tokens

## API Endpoints

- `POST /api/onboarding/goal`: Save user goal and preferences
- `POST /api/onboarding/backfill`: Save backfill period selection
- `GET/POST /api/auth/[...nextauth]`: NextAuth authentication routes

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

### Database Commands

- `npx prisma studio`: Open Prisma Studio (database GUI)
- `npx prisma migrate dev`: Create and apply migrations
- `npx prisma generate`: Generate Prisma client
- `npx prisma db push`: Push schema changes to database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your app's base URL | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `APPLE_ID` | Apple OAuth client ID | No |
| `APPLE_SECRET` | Apple OAuth client secret | No |
| `EMAIL_SERVER` | SMTP server configuration | No |
| `EMAIL_FROM` | From email address | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.

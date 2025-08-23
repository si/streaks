# Deployment Guide for Netlify

## Overview

This project uses Next.js with API routes and NextAuth.js, which requires special handling for Netlify deployment since Netlify doesn't natively support Next.js API routes.

## Option 1: Vercel (Recommended)

**Vercel is the recommended platform for Next.js applications** as it provides native support for all Next.js features including API routes.

### Deploy to Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET`
   - OAuth provider credentials

## Option 2: Netlify with API Routes (Advanced)

If you must use Netlify, you'll need to convert API routes to Netlify Functions.

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Convert API Routes to Netlify Functions

Create the following files:

**netlify/functions/auth.js:**
```javascript
const { NextAuth } = require('next-auth')
const { authOptions } = require('../../src/lib/auth')

const handler = NextAuth(authOptions)

module.exports = { handler }
```

**netlify/functions/onboarding-goal.js:**
```javascript
const { NextRequest, NextResponse } = require('next/server')
const { getServerSession } = require('next-auth')
const { authOptions } = require('../../src/lib/auth')
const { prisma } = require('../../src/lib/prisma')
const { goalSchema } = require('../../src/lib/validation')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
    }

    const body = JSON.parse(event.body)
    const validatedData = goalSchema.parse(body)

    // Database operations...
    // (Same logic as in your API route)

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
```

### Step 3: Update netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/auth/*"
  to = "/.netlify/functions/auth"
  status = 200

[[redirects]]
  from = "/api/onboarding/*"
  to = "/.netlify/functions/onboarding-:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 4: Update API Calls
Update your frontend API calls to use the new endpoints.

## Option 3: Static Export (Limited)

For a static-only version without API routes:

### Step 1: Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

### Step 2: Remove API Routes
- Remove or comment out API route files
- Use external authentication service
- Store data in localStorage or external database

### Step 3: Update netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

Set these in your Netlify dashboard:

### Required:
- `DATABASE_URL` - Your Supabase connection string
- `NEXTAUTH_URL` - Your Netlify domain (e.g., https://your-app.netlify.app)
- `NEXTAUTH_SECRET` - A secure random string

### Optional:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `APPLE_ID` - Apple OAuth client ID
- `APPLE_SECRET` - Apple OAuth client secret
- `EMAIL_SERVER` - SMTP server configuration
- `EMAIL_FROM` - From email address

## Database Setup

1. **Run migrations on Supabase:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## Deployment Steps

1. **Connect your repository to Netlify**
2. **Set environment variables in Netlify dashboard**
3. **Deploy using one of the options above**
4. **Test the application**

## Troubleshooting

### Common Issues:

1. **API routes not working:** Use Vercel or convert to Netlify Functions
2. **Database connection errors:** Check DATABASE_URL and Supabase settings
3. **Authentication issues:** Verify NEXTAUTH_URL and OAuth credentials
4. **Build failures:** Check Node.js version and dependencies

### Support:

- For Next.js issues: [Next.js Documentation](https://nextjs.org/docs)
- For Netlify issues: [Netlify Documentation](https://docs.netlify.com)
- For Vercel issues: [Vercel Documentation](https://vercel.com/docs)
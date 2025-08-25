import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Uncomment these when you have OAuth credentials
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID!,
    //   clientSecret: process.env.APPLE_SECRET!,
    // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/onboarding',
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  session: {
    strategy: 'database',
  },
}
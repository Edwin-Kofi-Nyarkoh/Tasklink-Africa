import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: {
              accounts: true,
            },
          })

          if (!user) {
            return null
          }

          // Check if user signed up with OAuth (Google)
          const hasOAuthAccount = user.accounts.some((account: { provider: string }) => account.provider === "google")

          if (hasOAuthAccount) {
            // User exists but signed up with Google - redirect to error
            throw new Error("OAUTH_ACCOUNT_EXISTS")
          }

          // Check if user has a password (credentials account)
          if (!user.password) {
            throw new Error("NO_PASSWORD_SET")
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists with credentials
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { accounts: true },
          })

          if (existingUser) {
            // Check if user has credentials account
            const hasCredentialsAccount = existingUser.accounts.some(
              (acc: { provider: string }) => acc.provider === "credentials",
            )

            if (hasCredentialsAccount) {
              // User exists with credentials - redirect to error
              return "/auth/error?error=CREDENTIALS_ACCOUNT_EXISTS"
            }
          }

          return true
        } catch (error) {
          console.error("Google sign-in error:", error)
          return "/auth/error?error=SIGNIN_ERROR"
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // events: {
  //   async createUser({ user }) {
  //     console.log("New user created:", user.email)
  //   },
  // },
}

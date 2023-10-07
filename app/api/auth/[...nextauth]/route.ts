import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../libs/prismaDB'

export const authOptions: AuthOptions = {
  //ADAPTER TO CONNECT TO DATABASE!
  adapter: PrismaAdapter(prisma),

  // PROVIDERS FOR AUTHENTICATIONS!
  providers: [
    // GITHUB PROVIDERS!
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),

    // GOOGLE PROVIDERS
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    // EMAIL AND PASSWORD!
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      // WHAT WE WILL DO FOR AUTHORIZATION MEANS AFTER THAT!
      async authorize (credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const correctPassword = await bcrypt.compare(
          credentials?.password,
          user?.hashedPassword
        )

        if (!correctPassword) {
          throw new Error('Invalid Credentials')
        }
        return user
      }
    })
  ],

  // PAGES FOR AUTH!
  pages: {
    signIn: '/'
  },

  // SESSIONS STRATEGY!
  session: {
    strategy: 'jwt'
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET
}

// EXPORTING NEXT AUTH!
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

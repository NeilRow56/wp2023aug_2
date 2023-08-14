import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from 'bcryptjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismadb } from '@/lib/prismadb'


export const options: NextAuthOptions = {

    adapter: PrismaAdapter(prismadb),

    pages: {
        signIn: '/sign-in'
    },

    

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if (!credentials?.email || !credentials?.password) {
                throw new Error('Invalid credentials')
              }
      
              const user = await prismadb.user.findUnique({
                where: {
                  email: credentials.email
                }
              })
      
              if (!user || !user?.hashedPassword) {
                throw new Error('Invalid credentials')
              }
      
              const isCorrectPassword = await bcryptjs.compare(
                credentials.password,
                user.hashedPassword
              )
      
              if (!isCorrectPassword) {
                throw new Error('Invalid credentials')
              }
      
              return {
                id:`${user.id}`,
                name: user.name,
                email: user.email
              }
            }
           
        })
      ],

      
      debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}
    
import axios from 'axios'

import NextAuth from 'next-auth'

import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await axios.post('http://localhost:3335/session', {
          email: credentials.email,
          password: credentials.password
        })

        if (user.data.user) {
          return { ...user.data.user, token: user.data.token }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    }
  },
  secret: 'jwttoken',
  pages: {
    signIn: '/login',
    error: '/login'
  },
  jwt: {
    secret: 'jwttoken'
  }
})

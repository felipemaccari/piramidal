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

        if (user) {
          return user.data.user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token
      }

      return token
    },
    session: ({ session, user, token }) => {
      if (token) {
        session.id = token.id
      }

      return { ...session, token: token.accessToken }
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

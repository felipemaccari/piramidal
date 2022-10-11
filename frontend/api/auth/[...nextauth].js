import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email: exemplo@exemplo.com'
        },
        password: { label: 'Senha', type: 'password' }
      },
      authorize: async credentials => {
        try {
          const user = await api.post('/users/getByEmail', {
            email: credentials.email,
            password: credentials.password
          })

          if (user) {
            const userAccount = user.data

            return userAccount
          } else {
            return null
          }
        } catch (error) {
          const message = error.response.data.message
          throw new Error(message)
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

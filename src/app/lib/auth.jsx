import Credentials from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.token = user.token
        token.userData = user.User
        token.id = user.User.id
        token.name = user.User.name
        token.email = user.User.email
        token.fNacimiento = user.User.fNacimiento
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.token = token.token
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          fNacimiento: token.fNacimiento,
          useData: token.userData,
        }
      }
      return session
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        let loginData = await axios(`${process.env.NEXT_PUBLIC_APIURI}api/login`, {
          method: 'post', headers: { 'Content-Type': 'application/json' },
          data: { email: credentials.email, pass: credentials.password },
        }).catch(err => {
          console.error(err)
          return null
        })

        if (!loginData?.data.error) {
          return loginData?.data
        } else {
          return null
        }
      },
    }),
  ],

  jwt: {
    encrypt: true,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    verificationOptions: {
      algorithms: ['HS512'],
    },
  },
  theme: { colorScheme: 'auto' },
  events: {},
  debug: false,
}

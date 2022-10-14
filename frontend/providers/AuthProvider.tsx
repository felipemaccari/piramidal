import { SessionProvider } from 'next-auth/react'

type ProviderProps = {
  children: JSX.Element
  session: any
}

const AuthProvider = ({ session, children }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthProvider

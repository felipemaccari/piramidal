import AuthProvider from './AuthProvider'
import StylesProvider from './StylesProvider'
import TanStackQuery from './TanStackQuery'

type ProviderProps = {
  children: JSX.Element
  pageProps: any
  session: any
}

const Providers = ({ children, pageProps, session }: ProviderProps) => {
  return (
    <StylesProvider>
      <AuthProvider session={session}>
        <TanStackQuery pageProps={pageProps}>{children}</TanStackQuery>
      </AuthProvider>
    </StylesProvider>
  )
}

export default Providers

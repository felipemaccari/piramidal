import StylesProvider from './StylesProvider'
import TanStackQuery from './TanStackQuery'

type ProviderProps = {
  children: JSX.Element
  pageProps: any
}

const Providers = ({ children, pageProps }: ProviderProps) => {
  return (
    <TanStackQuery pageProps={pageProps}>
      <StylesProvider>{children}</StylesProvider>
    </TanStackQuery>
  )
}

export default Providers

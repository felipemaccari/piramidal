import StylesProvider from './StylesProvider'

type ProviderProps = {
  children: JSX.Element
}

const Providers = ({ children }: ProviderProps) => {
  return <StylesProvider>{children}</StylesProvider>
}

export default Providers

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

type ProviderProps = {
  children: JSX.Element
}

const colors = {
  primary: '#FF731D',
  secondary: '#1746A2',
  beige: '#FFF7E9',
  blue: '#5F9DF7',
  grayText: '#424242',
  charcoal: '#36454F'
}

const theme = extendTheme({ colors })

const StylesProvider = ({ children }: ProviderProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default StylesProvider

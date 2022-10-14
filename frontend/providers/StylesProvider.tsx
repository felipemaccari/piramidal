import { ChakraProvider, extendTheme } from '@chakra-ui/react'

type ProviderProps = {
  children: JSX.Element
}

const colors = {
  primary: '#FF731D',
  secondary: '#1746A2',
  beige: '#FFF7E9',
  blue: '#5F9DF7',
  gray: '#424242'
}

const styles = {
  global: {
    '*': {
      fontFamily: "'Work Sans', sans-serif"
    }
  }
}

const theme = extendTheme({ colors, styles })

const StylesProvider = ({ children }: ProviderProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default StylesProvider

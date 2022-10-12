import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  primary: '#FF731D',
  secondary: '#1746A2',
  beige: '#FFF7E9',
  blue: '#5F9DF7'
}

const theme = extendTheme({ colors })

const StylesProvider = ({ children }: any) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default StylesProvider

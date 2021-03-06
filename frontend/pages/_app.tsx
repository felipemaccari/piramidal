import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "blue",
  secondary: "green",
  grey: "#ccc",
  black: "#111",
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

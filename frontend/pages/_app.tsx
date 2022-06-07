import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "blue",
  secondary: "green",
  grey: "#ccc",
  black: "#111",
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

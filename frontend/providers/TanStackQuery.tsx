import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useState } from 'react'

type ProviderProps = {
  children: JSX.Element
  pageProps: any
}

const TanStackQuery = ({ children, pageProps }: ProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default TanStackQuery

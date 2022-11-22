import { useEffect } from 'react'

import type { AppProps } from 'next/app'

import { signIn, useSession } from 'next-auth/react'

import Providers from 'providers'
import { NextPageWithLayout } from 'types/page'

import MainLayout from 'layouts/MainLayout'
import 'service/index'
import 'styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & { auth?: boolean }
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <Providers pageProps={pageProps} session={session}>
      <MainLayout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </MainLayout>
    </Providers>
  )
}

function Auth({ children }: any) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (status === 'loading') return
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }
  return <div>Loading...</div>
}

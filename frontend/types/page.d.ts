import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: boolean
  getLayout?: (page: ReactElement) => ReactNode
}

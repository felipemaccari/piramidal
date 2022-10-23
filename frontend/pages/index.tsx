import { useEffect } from 'react'

import { useSession } from 'next-auth/react'

import LayoutPyramid from 'layouts/Home/LayoutPyramid'
import { NextPageWithLayout } from 'types/page'

const Home: NextPageWithLayout = () => {
  const session = useSession()

  useEffect(() => {
    if (session.data?.user) {
      console.log('session', session)
      const userInformation = session?.data?.user

      window.localStorage.setItem('__UTPY', JSON.stringify(userInformation))
    }
  }, [session])

  return <LayoutPyramid />
}

export default Home

Home.getLayout = page => {
  return <>{page}</>
}

import { NextPageWithLayout } from 'types/page'

const Home: NextPageWithLayout = () => {
  return <p>loginzera ne tio</p>
}

export default Home

Home.getLayout = page => {
  return <>{page}</>
}

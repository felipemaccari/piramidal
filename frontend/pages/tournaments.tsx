import LayoutTournaments from 'layouts/Tournaments/LayoutTournaments'
import { NextPageWithLayout } from 'types/page'

const Tournaments: NextPageWithLayout = () => <LayoutTournaments />

Tournaments.auth = true

export default Tournaments

Tournaments.getLayout = page => {
  return <>{page}</>
}

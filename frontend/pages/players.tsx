import LayoutPlayers from 'layouts/Players/LayoutPlayers'
import { NextPageWithLayout } from 'types/page'

const Players: NextPageWithLayout = () => <LayoutPlayers />

Players.auth = true

export default Players

Players.getLayout = page => {
  return <>{page}</>
}

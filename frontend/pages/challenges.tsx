import LayoutChallenges from 'layouts/Challenges/LayoutChallenges'
import { NextPageWithLayout } from 'types/page'

const Challenges: NextPageWithLayout = () => <LayoutChallenges />

Challenges.auth = true

export default Challenges

Challenges.getLayout = page => {
  return <>{page}</>
}

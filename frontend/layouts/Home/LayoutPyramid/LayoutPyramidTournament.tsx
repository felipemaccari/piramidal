import { Flex } from '@chakra-ui/react'
import Pyramid from 'components/Pyramid'
import { IListActiveTournamentDTO } from 'service/tournaments'

type PyramidTournamentProps = {
  activeTournament: IListActiveTournamentDTO
}

const LayoutPyramidTournament = ({
  activeTournament
}: PyramidTournamentProps) => {
  return (
    <Flex justify="center">
      <Pyramid tournamentPlayers={activeTournament.players} />
    </Flex>
  )
}

export default LayoutPyramidTournament

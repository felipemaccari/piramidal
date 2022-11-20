import { Flex, Spinner, Text } from '@chakra-ui/react'
import Pyramid from 'components/Pyramid'
import {
  IListActiveTournamentDTO,
  useQueryListActiveTournament
} from 'service/tournaments'
import { useTournamentState } from 'state/tournament'

const LayoutPyramid = () => {
  const handleSetTournament = useTournamentState(state => state.setTournament)

  const { data: activeTournament, isLoading } = useQueryListActiveTournament({
    onSuccess: (tournamentData: IListActiveTournamentDTO) => {
      const { id, description, initialDate, finalDate, active } =
        tournamentData.tournament

      handleSetTournament(id, description, initialDate, finalDate, active)
    }
  })

  if (isLoading) {
    return <Spinner />
  }

  if (!activeTournament) {
    return (
      <Flex
        my="100px"
        align="center"
        justify="center"
        width="100%"
        direction="column"
      >
        <Text
          color="grayText"
          fontWeight="700"
          fontSize="2rem"
          textAlign="center"
        >
          Nenhum torneio em andamento
        </Text>
        <Text
          color="grayText"
          fontWeight="500"
          fontSize="1rem"
          textAlign="center"
        >
          Fica ligado que o próximo ta quase ai! :)
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      align="center"
      overflow="scroll"
      width={'100%'}
      justify="center"
    >
      <Text my="100px" fontWeight="bold" fontSize="3rem">
        {activeTournament.tournament.description}
      </Text>

      <Flex height="calc(100vh - 70px)" width="100%" justify="center">
        <Pyramid tournamentPlayers={activeTournament.players} />
      </Flex>
    </Flex>
  )
}

export default LayoutPyramid

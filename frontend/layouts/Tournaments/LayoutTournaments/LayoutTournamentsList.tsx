import { Flex, Spinner, Text } from '@chakra-ui/react'

import { useQueryListTournaments } from 'service/tournaments'
import LayoutTournamentsCardTournament from './LayoutTournamentsCardTournament'

const LayoutTournamentsList = () => {
  const { data: tournaments = [], isLoading } = useQueryListTournaments({})

  if (isLoading) {
    return (
      <Flex align="center" justify="center" direction="column" width="100%">
        <Spinner />
      </Flex>
    )
  }

  if (tournaments.length === 0 && !isLoading) {
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
          Nenhum torneio cadastrado
        </Text>
        <Text
          color="grayText"
          fontWeight="500"
          fontSize="1rem"
          textAlign="center"
        >
          Aqui você pode adicionar um novo torneio e adicionar jogadores! :)
        </Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" mt="50px">
      {tournaments.map(tournament => (
        <LayoutTournamentsCardTournament
          key={tournament.id}
          tournament={tournament}
        />
      ))}
    </Flex>
  )
}

export default LayoutTournamentsList

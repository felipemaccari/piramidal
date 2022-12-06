import { Flex } from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import WarningMessage from 'components/WarningMessage'

import { useQueryListTournaments } from 'service/tournaments'
import LayoutTournamentsCardTournament from './LayoutTournamentsCardTournament'

const LayoutTournamentsList = () => {
  const { data: tournaments = [], isLoading } = useQueryListTournaments({})

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (tournaments.length === 0 && !isLoading) {
    return (
      <WarningMessage
        title="Nenhum torneio cadastrado"
        subtitle="Aqui você pode adicionar um novo torneio e adicionar jogadores!"
      />
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

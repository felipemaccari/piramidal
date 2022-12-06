import { Flex } from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import WarningMessage from 'components/WarningMessage'

import { useQueryPlayers } from 'service/players'
import LayoutPlayersListCard from './LayoutPlayersListCard'

const LayoutPlayersList = () => {
  const { data: players = [], isLoading } = useQueryPlayers({})

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (players.length === 0) {
    return (
      <WarningMessage
        title="Nenhum jogador cadastrado"
        subtitle="Quando você cadastrar novos jogadores, eles vão aparecer aqui!"
      />
    )
  }

  return (
    <Flex direction="column" mt="50px">
      {players.map(player => (
        <LayoutPlayersListCard key={player.id} player={player} />
      ))}
    </Flex>
  )
}

export default LayoutPlayersList

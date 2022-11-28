import { Flex, Text } from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'

import { useQueryPlayers } from 'service/players'
import LayoutPlayersListCard from './LayoutPlayersListCard'

const LayoutPlayersList = () => {
  const { data: players = [], isLoading } = useQueryPlayers({})

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (players.length === 0) {
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
          Nenhum jogador cadastrado
        </Text>
        <Text
          color="grayText"
          fontWeight="500"
          fontSize="1rem"
          textAlign="center"
        >
          Quando você cadastrar novos jogadores, eles vão aparecer aqui!
        </Text>
      </Flex>
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

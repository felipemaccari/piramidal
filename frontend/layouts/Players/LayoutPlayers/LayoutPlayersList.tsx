import { Flex, Spinner } from '@chakra-ui/react'

import Card from 'components/CardPlayer'
import { useQueryPlayers } from 'service/players'

const LayoutPlayersList = () => {
  const { data: players = [], isLoading } = useQueryPlayers({})

  if (isLoading) {
    return (
      <Flex align="center" justify="center" direction="column" width="100%">
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex direction="column" mt="50px">
      {players.map(player => (
        <Card key={player.id} player={player} />
      ))}
    </Flex>
  )
}

export default LayoutPlayersList

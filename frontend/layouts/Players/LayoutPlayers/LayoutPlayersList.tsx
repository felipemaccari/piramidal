import { Flex, Spinner, Text } from '@chakra-ui/react'

import CardPlayer from 'components/CardPlayer'
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
        <CardPlayer key={player.id} player={player} />
      ))}
    </Flex>
  )
}

export default LayoutPlayersList

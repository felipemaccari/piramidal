import { Flex, Text } from '@chakra-ui/react'

import { AiOutlineUser } from 'react-icons/ai'
import LayoutPlayersAddPlayer from './LayoutPlayersAddPlayer'
import LayoutPlayersList from './LayoutPlayersList'

const LayoutPlayers = () => {
  return (
    <Flex direction="column" p="80px" width="100%">
      <Flex align="center" color="gray" justify="space-between">
        <Flex align="center">
          <AiOutlineUser size={28} />

          <Text fontSize="1.8rem" ml="20px" fontWeight={600}>
            Jogadores cadastrados
          </Text>
        </Flex>

        <LayoutPlayersAddPlayer />
      </Flex>

      <LayoutPlayersList />
    </Flex>
  )
}

export default LayoutPlayers

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import { formatPhone } from 'utils/formatters'

type PlayerProps = {
  id: string
  name: string
  phone: string
}

type CardPlayerProps = {
  player: PlayerProps
}

const CardPlayer = ({ player }: CardPlayerProps) => {
  return (
    <Flex
      align="center"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      p="30px"
      my="10px"
      borderRadius="8px"
    >
      <Flex flex={1} align="center">
        <Box width="80px">
          <Avatar name={player.name} />
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Nome
          </Text>

          <Text fontSize="1rem">{player.name}</Text>
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Telefone
          </Text>

          <Text>{formatPhone(player.phone)}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default CardPlayer

import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text
} from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { formatPhone } from 'utils/formatters'
import LayoutPlayersListCardEditPlayer from './LayoutPlayersListCardEditPlayer'

type PlayerProps = {
  id: string
  name: string
  phone: string
  active: boolean
}

type LayoutPlayersListCardProps = {
  player: PlayerProps
}

const LayoutPlayersListCard = ({ player }: LayoutPlayersListCardProps) => {
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

          <Text>{formatPhone(player.phone) || '-'}</Text>
        </Box>

        <Flex flex={1} justify="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BiDotsVerticalRounded />}
              variant="outline"
              border="none"
            />

            <MenuList>
              <LayoutPlayersListCardEditPlayer player={player} />

              {/* <LayoutTournamentsFinishTournament tournament={tournament} /> */}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LayoutPlayersListCard

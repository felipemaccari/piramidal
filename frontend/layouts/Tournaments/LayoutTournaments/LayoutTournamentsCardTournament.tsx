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

import { format } from 'date-fns'
import LayoutTournamentsCardTournamentDeleteTournament from './LayoutTournamentsCardTournamentDeleteTournament'
import LayoutTournamentsCardTournamentEditTournament from './LayoutTournamentsCardTournamentEditTournament'
import LayoutTournamentsFinishTournament from './LayoutTournamentsCardTournamentFinishTournament'

type Tournament = {
  id?: string
  description: string
  initialDate: any
  finalDate: any
  players: Array<string>
  active: boolean
  finished?: boolean
}

type LayoutTournamentsCardTournamentProps = {
  tournament: Tournament
}

const LayoutTournamentsCardTournament = ({
  tournament
}: LayoutTournamentsCardTournamentProps) => {
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
          <Avatar name={tournament.description} />
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Nome
          </Text>

          <Text fontSize="1rem">{tournament.description}</Text>
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Data Inicial
          </Text>

          <Text fontSize="1rem">
            {format(new Date(tournament.initialDate), 'dd/MM/yyyy')}
          </Text>
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Data Final
          </Text>

          <Text fontSize="1rem">
            {format(new Date(tournament.finalDate), 'dd/MM/yyyy')}
          </Text>
        </Box>

        <Box width="33%">
          <Text fontSize="0.8rem" fontWeight={700}>
            Status
          </Text>

          <Text fontSize="1rem">
            {!tournament.finished ? 'Em andamento' : 'Encerrado'}
          </Text>
        </Box>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BiDotsVerticalRounded />}
            variant="outline"
            border="none"
          />

          <MenuList>
            {!tournament.finished && (
              <>
                <LayoutTournamentsCardTournamentEditTournament
                  tournament={tournament}
                />

                <LayoutTournamentsFinishTournament tournament={tournament} />
              </>
            )}

            <LayoutTournamentsCardTournamentDeleteTournament
              tournament={tournament}
            />
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default LayoutTournamentsCardTournament

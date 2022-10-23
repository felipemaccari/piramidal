import { Flex, Text } from '@chakra-ui/react'

import { AiOutlineTrophy } from 'react-icons/ai'
import LayoutTournamentsAddTournament from './LayoutTournamentsAddTournament'
import LayoutTournamentsList from './LayoutTournamentsList'

const LayoutTournaments = () => {
  return (
    <Flex direction="column" p="80px" width="100%">
      <Flex align="center" color="grayText" justify="space-between">
        <Flex align="center">
          <AiOutlineTrophy size={28} />

          <Text fontSize="1.8rem" ml="20px" fontWeight={600}>
            Torneios cadastrados
          </Text>
        </Flex>

        <LayoutTournamentsAddTournament />
      </Flex>

      <LayoutTournamentsList />
    </Flex>
  )
}

export default LayoutTournaments

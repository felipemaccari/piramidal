import { Flex, Text } from '@chakra-ui/react'

import { IoTennisballOutline } from 'react-icons/io5'

import LayoutChallengesAddChallenge from './LayoutChallengesAddChallenge'
import LayoutChallengesList from './LayoutChallengesList'

const LayoutChallenges = () => {
  return (
    <Flex direction="column" p="80px" width="100%">
      <Flex align="center" color="grayText" justify="space-between">
        <Flex align="center">
          <IoTennisballOutline size={28} />

          <Text fontSize="1.8rem" ml="20px" fontWeight={600}>
            Desafios do Torneio
          </Text>
        </Flex>

        <LayoutChallengesAddChallenge />
      </Flex>

      <LayoutChallengesList />
    </Flex>
  )
}

export default LayoutChallenges

import { Avatar, Flex, Text } from '@chakra-ui/react'
import { ListChallengeProps, ListChallengeResults } from 'service/challenges'

type ChallengeProps = {
  challengeInformation: ListChallengeProps
  results: ListChallengeResults
}

const LayoutChallengesListResultsPoints = ({
  challengeInformation,
  results
}: ChallengeProps) => {
  return (
    <Flex direction="column">
      <Flex align="center" my="10px">
        <Flex align="center" width="150px">
          <Text fontSize="1rem" fontWeight={600}>
            Jogadores
          </Text>
        </Flex>

        <Text
          textAlign="center"
          fontSize="1rem"
          fontWeight={600}
          mx="10px"
          width="80px"
        >
          1º Set
        </Text>

        <Text
          textAlign="center"
          fontSize="1rem"
          fontWeight={600}
          mx="10px"
          width="80px"
        >
          2º Set
        </Text>

        <Text
          textAlign="center"
          fontSize="1rem"
          fontWeight={600}
          mx="10px"
          width="80px"
        >
          Tiebreak
        </Text>

        <Text
          textAlign="center"
          fontSize="1rem"
          fontWeight={600}
          mx="10px"
          width="80px"
        >
          Pontos
        </Text>
      </Flex>

      <Flex align="center" borderBottom="1px solid #ccc" maxW="38%">
        <Flex align="center" width="150px" my="10px">
          <Avatar
            mr="15px"
            name={challengeInformation.originPlayerName}
            size="sm"
          />

          <Text fontSize="1rem" fontWeight={600}>
            {challengeInformation.originPlayerName}
          </Text>
        </Flex>

        <Text textAlign="center" mx="10px" width="80px">
          {results.originPlayerFirstSet}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.originPlayerSecondSet}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.originPlayerTiebreak}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.originPlayerPoints}
        </Text>
      </Flex>

      <Flex align="center" my="10px">
        <Flex align="center" width="150px">
          <Avatar
            mr="15px"
            name={challengeInformation.destinationPlayerName}
            size="sm"
          />

          <Text fontSize="1rem" fontWeight={600}>
            {challengeInformation.destinationPlayerName}
          </Text>
        </Flex>

        <Text textAlign="center" mx="10px" width="80px">
          {results.destinationPlayerFirstSet}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.destinationPlayerSecondSet}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.destinationPlayerTiebreak}
        </Text>

        <Text textAlign="center" mx="10px" width="80px">
          {results.destinationPlayerPoints}
        </Text>
      </Flex>
    </Flex>
  )
}

export default LayoutChallengesListResultsPoints

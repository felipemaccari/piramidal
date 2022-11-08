import { AccordionPanel, Flex, Spinner, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import {
  ListChallengeProps,
  useQueryListChallengeResults
} from 'service/challenges'
import LayoutChallengesAddChallengeResult from './LayoutChallengesAddChallengeResult'
import LayoutChallengesListResultsPoints from './LayoutChallengesListResultsPoints'
import LayoutChallengesListResultsWO from './LayoutChallengesListResultsWO'

type ChallengeProps = {
  challengeInformation: ListChallengeProps
}

const LayoutChallengesListResults = ({
  challengeInformation
}: ChallengeProps) => {
  const { data: results, isLoading } = useQueryListChallengeResults(
    challengeInformation.id,
    {}
  )

  if (isLoading) {
    return (
      <Flex align="center" justify="center" direction="column" width="100%">
        <Spinner />
      </Flex>
    )
  }

  if (!results && !isLoading) {
    return (
      <AccordionPanel pb={4}>
        <LayoutChallengesAddChallengeResult
          challengeInformation={challengeInformation}
        />

        <Flex
          align="center"
          justify="center"
          width="100%"
          direction="column"
          mb="30px"
        >
          <Text
            color="grayText"
            fontWeight="700"
            fontSize="1rem"
            textAlign="center"
          >
            Nenhum resultado adicionado para este jogo.
          </Text>

          <Text
            color="grayText"
            fontWeight="500"
            fontSize="0.8rem"
            textAlign="center"
          >
            Clique agora no botão acima e adicione os resultados.
          </Text>
        </Flex>
      </AccordionPanel>
    )
  }

  return (
    <AccordionPanel>
      <Flex direction="column" mb="30px">
        <Flex justify="space-between" align="center" mb="30px">
          {results.gameDate && (
            <Text fontWeight={600} fontSize="1.1rem">{`Data do Jogo: ${format(
              new Date(results.gameDate),
              'dd/MM/yyyy'
            )}`}</Text>
          )}

          <Flex justify="flex-end" flex={1}>
            <LayoutChallengesAddChallengeResult
              challengeInformation={challengeInformation}
            />
          </Flex>
        </Flex>

        {results.originPlayerGiveup || results.originPlayerGiveup ? (
          <LayoutChallengesListResultsWO
            challengeInformation={challengeInformation}
            results={results}
          />
        ) : (
          <LayoutChallengesListResultsPoints
            challengeInformation={challengeInformation}
            results={results}
          />
        )}
      </Flex>
    </AccordionPanel>
  )
}

export default LayoutChallengesListResults

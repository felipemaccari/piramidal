import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Avatar,
  Badge,
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'

import { format, isAfter } from 'date-fns'
import dynamic from 'next/dynamic'
import { useQueryListChallengesByTournament } from 'service/challenges'
import { TOURNAMENT_KEY } from 'utils/constants'
import { useLocalStorage } from 'utils/hooks'

const LayoutChallengesListResults = dynamic(
  () => import('./LayoutChallengesListResults')
)

type TextStatusProps = {
  gameDate: string
  finalDate: string
  finished: boolean
}

const TextStatus = ({ gameDate, finalDate, finished }: TextStatusProps) => {
  let highlightColor: string = '#1dff6ae3'
  let statusDescription: string = 'Concluído'

  if (finished) {
    highlightColor = '#1dff6ae3'
    statusDescription = 'Concluído'
  } else if (isAfter(new Date(), new Date(finalDate))) {
    highlightColor = '#ff1d1de3'
    statusDescription = 'Expirado'
  } else if (!gameDate) {
    highlightColor = '#fffb1de3'
    statusDescription = 'Pendente'
  }

  return (
    <Badge
      fontWeight={600}
      background={highlightColor}
      color="initial"
      borderRadius="4px"
      px="20px"
      py="3px"
    >
      {statusDescription}
    </Badge>
  )
}

const LayoutChallengesList = () => {
  const [tournamentID] = useLocalStorage<string>(TOURNAMENT_KEY)

  const { data: challenges = [], isLoading } =
    useQueryListChallengesByTournament(tournamentID, {})

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (challenges.length === 0 && !isLoading) {
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
          Nenhum desafio cadastrado para o torneio atual.
        </Text>

        <Text
          color="grayText"
          fontWeight="500"
          fontSize="1rem"
          textAlign="center"
        >
          Aqui você poderá adicionar os desafios e seus resultados!
        </Text>
      </Flex>
    )
  }

  return (
    <Accordion mt="50px" allowMultiple>
      {challenges.map(challenge => (
        <AccordionItem key={challenge.id} borderRadius="8px">
          <h2>
            <AccordionButton
              borderRadius="4px"
              minHeight="80px"
              justifyItems="space-between"
              _expanded={{ background: '#0000000a' }}
            >
              <Flex align="center" flex={1} justify="space-between">
                <Flex align="flex-end" minW="30%">
                  <Flex align="flex-end">
                    <Avatar
                      mr="15px"
                      name={challenge.originPlayerName}
                      size="sm"
                    />

                    <Flex direction="column" align="flex-start">
                      <Text fontSize="0.8rem" fontWeight={400}>
                        Desafiante
                      </Text>

                      <Text fontSize="1rem" fontWeight={600}>
                        {challenge.originPlayerName}
                      </Text>
                    </Flex>
                  </Flex>

                  <Text mx="30px" fontWeight={900}>
                    X
                  </Text>

                  <Flex align="flex-end">
                    <Avatar
                      mr="15px"
                      name={challenge.destinationPlayerName}
                      size="sm"
                    />

                    <Flex direction="column" align="flex-start">
                      <Text fontSize="0.8rem" fontWeight={400}>
                        Desafiado
                      </Text>

                      <Text fontSize="1rem" fontWeight={600}>
                        {challenge.destinationPlayerName}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Box minW="15%">
                  <Text fontSize="0.8rem" fontWeight={400}>
                    Data do Desafio
                  </Text>

                  <Text fontSize="1rem" fontWeight={600}>
                    {format(new Date(challenge.initialDate), 'dd/MM/yyyy')}
                  </Text>
                </Box>

                <Box minW="15%">
                  <Text fontSize="0.8rem" fontWeight={400}>
                    Prazo Final
                  </Text>

                  <Text fontSize="1rem" fontWeight={600}>
                    {format(new Date(challenge.finalDate), 'dd/MM/yyyy')}
                  </Text>
                </Box>

                <Box minW="15%">
                  <Text fontSize="0.8rem" fontWeight={400}>
                    Data do Jogo
                  </Text>

                  <Text fontSize="1rem" fontWeight={600}>
                    {challenge.gameDate
                      ? format(new Date(challenge.gameDate), 'dd/MM/yyyy')
                      : '-'}
                  </Text>
                </Box>

                <Box minW="15%">
                  <Text fontSize="0.8rem" fontWeight={400}>
                    Status
                  </Text>

                  <TextStatus
                    gameDate={challenge.gameDate}
                    finalDate={challenge.finalDate}
                    finished={challenge.finished}
                  />
                </Box>
              </Flex>

              <Flex minW="10%" justify="flex-end">
                <AccordionIcon />
              </Flex>
            </AccordionButton>
          </h2>

          <LayoutChallengesListResults challengeInformation={challenge} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default LayoutChallengesList

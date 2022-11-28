import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import {
  IListActiveTournamentDTO,
  useQueryListActiveTournament
} from 'service/tournaments'
import { TOURNAMENT_KEY } from 'utils/constants'
import { useLocalStorage } from 'utils/hooks'
import LayoutPyramidResults from './LayoutPyramidResults'
import LayoutPyramidTournament from './LayoutPyramidTournament'

const LayoutPyramid = () => {
  const [, setTournamentID] = useLocalStorage<string>(TOURNAMENT_KEY, '')

  const { data: activeTournament, isLoading } = useQueryListActiveTournament({
    onSuccess: (tournamentData: IListActiveTournamentDTO) => {
      const { id } = tournamentData.tournament
      setTournamentID(id)
    }
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!activeTournament) {
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
          Nenhum torneio em andamento
        </Text>
        <Text
          color="grayText"
          fontWeight="500"
          fontSize="1rem"
          textAlign="center"
        >
          Fica ligado que o próximo ta quase ai! :)
        </Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" width="100%">
      <Flex justify="center">
        <Text mt="50px" fontWeight="bold" fontSize="3rem">
          {activeTournament.tournament.description}
        </Text>
      </Flex>

      <Tabs isFitted variant="enclosed" mt="50px">
        <TabList mb="1em">
          <Tab>
            <Text fontWeight={600}>Pirâmide</Text>
          </Tab>
          <Tab isDisabled={isLoading || !activeTournament}>
            <Text fontWeight={600}>Estatísticas</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LayoutPyramidTournament activeTournament={activeTournament} />
          </TabPanel>

          <TabPanel>
            <LayoutPyramidResults
              tournamentID={activeTournament.tournament.id}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default LayoutPyramid

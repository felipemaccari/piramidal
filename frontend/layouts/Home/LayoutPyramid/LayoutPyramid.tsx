import { Flex, Spinner, Text } from '@chakra-ui/react'
import Pyramid from 'components/Pyramid'
import { useQueryListTournaments } from 'service/tournaments'

const LayoutPyramid = () => {
  const { data: tournamentList = [], isLoading } = useQueryListTournaments({})

  if (isLoading) {
    return <Spinner />
  }

  if (tournamentList.length === 0) {
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
    <Flex direction="column" align="center" overflow="scroll" width={'100%'}>
      <Text my="100px" fontWeight="bold" fontSize="3rem">
        {tournamentList[0].description}
      </Text>

      <Flex height="calc(100vh - 70px)" width="100%" justify="center">
        {tournamentList && tournamentList.length > 0 ? (
          <Pyramid tournamentID={tournamentList[0].id || ''} />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default LayoutPyramid

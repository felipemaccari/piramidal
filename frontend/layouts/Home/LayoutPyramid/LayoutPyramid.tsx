import { Flex, Spinner, Text } from '@chakra-ui/react'
import Pyramid from 'components/Pyramid'
import { useQueryTournament } from 'service/tournaments'

const LayoutPyramid = () => {
  const { data = [], isLoading } = useQueryTournament({})

  if (isLoading) {
    return <Spinner />
  }

  if (data.length === 0) {
    return (
      <Flex
        my="100px"
        align="center"
        justify="center"
        width="100%"
        direction="column"
      >
        <Text fontWeight="700" fontSize="2rem" textAlign="center">
          Nenhum torneio em andamento
        </Text>
        <Text fontWeight="500" fontSize="1rem" textAlign="center">
          Fica ligado que o próximo ta quase ai! :)
        </Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" align="center" overflow="scroll" width={'100%'}>
      <Text my="100px" fontWeight="bold" fontSize="3rem">
        IV Torneio Pirâmide 2022
      </Text>

      <Flex height="calc(100vh - 70px)" width="100%" justify="center">
        {data.length > 0 ? <Pyramid tournamentID={data} /> : null}
      </Flex>
    </Flex>
  )
}

export default LayoutPyramid

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
      <Text my="100px" fontWeight="bold" fontSize="3rem">
        Nenhum torneio encontrado no momento
      </Text>
    )
  }

  return (
    <Flex direction="column" align="center" overflow="scroll">
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

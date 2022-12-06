import { Flex, Select, Text } from '@chakra-ui/react'
import { useQueryListTournaments } from 'service/tournaments'

const SelectTournament = () => {
  const { data: tournaments, isLoading } = useQueryListTournaments({})

  if (!tournaments?.length || tournaments.length === 1) {
    return null
  }

  return (
    <Flex direction="column" px="30px" my="20px">
      <Text fontSize="0.8rem">Torneio ativo</Text>

      <Select isDisabled={isLoading}>
        {tournaments
          ?.sort(
            (previous, next) => Number(next.active) - Number(previous.active)
          )
          .map(tournament => (
            <option key={tournament.id}>{tournament.description}</option>
          ))}
      </Select>
    </Flex>
  )
}

export default SelectTournament

import { Flex, Text } from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import WarningMessage from 'components/WarningMessage'

import { AiOutlineUser } from 'react-icons/ai'

import { useQueryPlayers } from 'service/players'

import LayoutTournamentsAddTournamentPlayerListAddPlayer from './LayoutTournamentsAddTournamentPlayerListAddPlayer'
import LayoutTournamentsAddTournamentPlayerListCard from './LayoutTournamentsAddTournamentPlayerListCard'

const LayoutTournamentsAddTournamentPlayerList = ({
  setSelectedPlayers
}: any) => {
  const { data: players, isLoading } = useQueryPlayers({})

  // const selectAllPlayers = useCallback(() => {
  //   setSelectedPlayers(players.map(player => player.id))
  // }, [players, setSelectedPlayers])

  // const removeAllPlayers = useCallback(() => {
  //   setSelectedPlayers([])
  // }, [setSelectedPlayers])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Flex direction="column" mt="50px">
      <Flex
        align="center"
        color="grayText"
        justify="space-between"
        px="30px"
        mb="10px"
      >
        <Flex align="center">
          <AiOutlineUser size={20} />

          <Text fontSize="1.3rem" ml="10px" mr="20px" fontWeight={600}>
            Jogadores cadastrados
          </Text>

          <LayoutTournamentsAddTournamentPlayerListAddPlayer />
        </Flex>
      </Flex>

      {players?.length === 0 && (
        <WarningMessage
          title="Nenhum jogador cadastrado"
          subtitle="Cadastre novos jogadores agora pra começar o torneio!"
        />
      )}

      {players?.map(player => (
        <LayoutTournamentsAddTournamentPlayerListCard
          key={player.id}
          player={player}
          setSelectedPlayers={setSelectedPlayers}
        />
      ))}
    </Flex>
  )
}

export default LayoutTournamentsAddTournamentPlayerList

import { Flex, Text, useToast } from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import { useState } from 'react'

import { AiOutlineUser } from 'react-icons/ai'

import { useQueryPlayers } from 'service/players'
import { useQueryTournamentPlayers } from 'service/tournaments'

import LayoutTournamentsAddTournamentPlayerListAddPlayer from './LayoutTournamentsAddTournamentPlayerListAddPlayer'
import LayoutTournamentsAddTournamentPlayerListCard from './LayoutTournamentsAddTournamentPlayerListCard'

const LayoutTournamentsCardtournamentEditTournamentPlayerList = ({
  setSelectedPlayers,
  tournament
}: any) => {
  const [playerList, setPlayerList] = useState<any>()

  const toast = useToast()

  const { data: players, isLoading } = useQueryPlayers({
    onError: () => {
      toast({
        title: 'Não foi possível carregar a lista de jogadores',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  })

  const { data: tournamentPlayers, isLoading: isLoadingTournamentPlayers } =
    useQueryTournamentPlayers(tournament.id, {
      onSuccess: (data: any) => {
        const tournamentPlayers = data.map((player: any) => player.id)
        const selectedPlayers = players?.map(player =>
          tournamentPlayers.includes(player.id)
            ? { ...player, isSelected: true }
            : player
        )

        setSelectedPlayers(selectedPlayers)
        setPlayerList(selectedPlayers)
      },
      onError: () => {
        toast({
          title: 'Não foi possível carregar a lista de jogadores participantes',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
    })

  // const selectAllPlayers = useCallback(() => {
  //   setSelectedPlayers(players.map(player => player.id))
  // }, [players, setSelectedPlayers])

  // const removeAllPlayers = useCallback(() => {
  //   setSelectedPlayers([])
  // }, [setSelectedPlayers])

  if (isLoading || isLoadingTournamentPlayers) {
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

        {/* <Flex>
          <Button variant="link" mr="20px" onClick={removeAllPlayers}>
            Remover todos
          </Button>

          <Button variant="link" color="primary" onClick={selectAllPlayers}>
            Selecionar todos
          </Button>
        </Flex> */}
      </Flex>

      {playerList?.length === 0 && (
        <Flex
          my="50px"
          align="center"
          justify="center"
          width="100%"
          direction="column"
        >
          <Text
            color="grayText"
            fontWeight="700"
            fontSize="1.5rem"
            textAlign="center"
          >
            Nenhum jogador cadastrado
          </Text>

          <Text color="primary" fontWeight={'700'}>
            Cadastre novos jogadores agora pra começar o torneio!
          </Text>
        </Flex>
      )}

      {playerList?.map((player: any) => (
        <LayoutTournamentsAddTournamentPlayerListCard
          key={player.id}
          player={player}
          setSelectedPlayers={setSelectedPlayers}
          isSelected={player.isSelected}
        />
      ))}
    </Flex>
  )
}

export default LayoutTournamentsCardtournamentEditTournamentPlayerList

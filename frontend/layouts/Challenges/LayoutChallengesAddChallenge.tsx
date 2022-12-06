import { AddIcon } from '@chakra-ui/icons'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useMutationAddChallenge,
  useQueryListAvaliableDestinationPlayer
} from 'service/challenges'
import { useQueryTournamentPlayers } from 'service/tournaments'
import { TOURNAMENT_KEY } from 'utils/constants'

import { formatDate } from 'utils/formatters'
import { useLocalStorage } from 'utils/hooks'

type AddChallengeProps = {
  tournamentID: string
  initialDate: any
  finalDate: string
  originPlayerID?: string
  destinationPlayerID?: string
}

const LayoutChallengesAddChallenge = () => {
  const [tournamentID] = useLocalStorage<string>(TOURNAMENT_KEY)

  const [selectedOriginPlayer, setSelectedOriginPlayer] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit, setValue, reset } =
    useForm<AddChallengeProps>()

  const queryClient = useQueryClient()

  const { data: players, isLoading: isLoadingPlayers } =
    useQueryTournamentPlayers(tournamentID, {
      onError: () => {
        toast({
          title: 'Não foi possível carregar a lista de jogadores participantes',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
    })

  const {
    data: avaliablePlayers,
    isLoading: isLoadingAvaliablePlayers,
    refetch
  } = useQueryListAvaliableDestinationPlayer(
    selectedOriginPlayer,
    tournamentID,
    {
      onError: () => {
        toast({
          title: 'Não foi possível carregar a lista de jogadores participantes',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
    }
  )

  useEffect(() => {
    if (selectedOriginPlayer) {
      refetch()
    }
  }, [selectedOriginPlayer, refetch])

  const { mutate, isLoading } = useMutationAddChallenge({
    onSuccess: () => {
      toast({
        title: 'Novo desafio incluído com sucesso',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      reset()

      queryClient.invalidateQueries(['queryListChallengesByTournament'])
    },
    onError: () => {
      toast({
        title: 'Não foi possível cadastrar o desafio.',
        description: 'Confere suas informações e tente novamente!',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  })

  const toast = useToast()

  const handleAddChallenge: SubmitHandler<AddChallengeProps> = values => {
    const { initialDate, finalDate, originPlayerID, destinationPlayerID } =
      values

    const initialParsed = parse(initialDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })
    const finalParsed = parse(finalDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })

    const newChallenge = {
      tournamentID,
      originPlayerID,
      destinationPlayerID,
      initialDate: format(initialParsed, 'yyyy-MM-dd'),
      finalDate: format(finalParsed, 'yyyy-MM-dd')
    }

    mutate(newChallenge)
  }

  const onChangeDate = (e: any, fieldName: any) => {
    const { value = '' } = e.target

    setValue(fieldName, formatDate(value))
  }

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        variant="solid"
        background="secondary"
        color="white"
        _hover={{
          transition: ' transform 300ms',
          transform: 'translateY(-2px)'
        }}
      >
        Novo Desafio
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo desafio</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex mt="20px">
              <FormControl pr="20px">
                <FormLabel>Data do desafio</FormLabel>
                <Input
                  {...register('initialDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'initialDate')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Prazo máximo</FormLabel>
                <Input
                  {...register('finalDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'finalDate')}
                />
              </FormControl>
            </Flex>

            <Flex mt="20px" justify="space-between">
              <Flex width="100%">
                <FormControl pr="20px">
                  <FormLabel>Jogador Desafiante</FormLabel>
                  <Select
                    placeholder="Selecione o jogador"
                    isDisabled={isLoadingPlayers}
                    {...register('originPlayerID')}
                    onChange={e => setSelectedOriginPlayer(e.target.value)}
                  >
                    {players?.map(player => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>

              <Flex width="100%">
                <FormControl>
                  <FormLabel>Jogador Desafiado</FormLabel>
                  <Select
                    placeholder="Selecione o jogador"
                    isDisabled={
                      isLoadingAvaliablePlayers || !avaliablePlayers?.length
                    }
                    {...register('destinationPlayerID')}
                  >
                    {avaliablePlayers?.map(player => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
            </Flex>

            <ModalFooter justifyContent="space-between" px="0" mt="30px">
              <Button variant="text" onClick={onClose} p="0">
                Cancelar
              </Button>

              <Button
                onClick={handleSubmit(handleAddChallenge)}
                isLoading={isLoading}
                variant="solid"
                background="primary"
                color="white"
                type="submit"
              >
                Salvar
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LayoutChallengesAddChallenge

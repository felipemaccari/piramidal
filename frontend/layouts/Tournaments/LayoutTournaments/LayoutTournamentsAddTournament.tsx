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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutationAddTournament } from 'service/tournaments'
import { formatDate } from 'utils/formatters'
import LayoutTournamentsAddTournamentPlayerList from './LayoutTournamentsAddTournamentPlayerList'

type AddTournamentProps = {
  id?: string
  description: string
  initialDate: any
  finalDate: string
  players?: Array<string>
}

const LayoutTournamentsAddTournament = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Array<string>>([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit, setValue, reset } =
    useForm<AddTournamentProps>()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutationAddTournament({
    onSuccess: () => {
      reset()
      onClose()

      toast({
        title: 'Novo torneio incluído com sucesso',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryTournaments'])
    }
  })

  const toast = useToast()

  const handleAddTournament: SubmitHandler<AddTournamentProps> = values => {
    const { description, initialDate, finalDate } = values

    const initialParsed = parse(initialDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })
    const finalParsed = parse(finalDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })

    const newTournament = {
      description,
      initialDate: format(initialParsed, 'yyyy-MM-dd'),
      finalDate: format(finalParsed, 'yyyy-MM-dd'),
      players: selectedPlayers,
      active: true
    }

    mutate(newTournament)
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
        Novo Torneio
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo torneio</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Descrição do torneio</FormLabel>
              <Input
                {...register('description')}
                placeholder="Ex: Torneio Edição 2022"
              />
            </FormControl>

            <Flex mt="20px">
              <FormControl pr="20px">
                <FormLabel>Data inicial</FormLabel>
                <Input
                  {...register('initialDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'initialDate')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Data final</FormLabel>
                <Input
                  {...register('finalDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'finalDate')}
                />
              </FormControl>
            </Flex>

            <LayoutTournamentsAddTournamentPlayerList
              setSelectedPlayers={setSelectedPlayers}
            />

            <ModalFooter justifyContent="space-between" px="0" mt="30px">
              <Button variant="text" onClick={onClose} p="0">
                Cancelar
              </Button>

              <Button
                onClick={handleSubmit(handleAddTournament)}
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

export default LayoutTournamentsAddTournament

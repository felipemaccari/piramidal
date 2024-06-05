import { EditIcon } from '@chakra-ui/icons'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
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

import { useMutationEditTournament } from 'service/tournaments'
import { formatDate } from 'utils/formatters'
import LayoutTournamentsCardtournamentEditTournamentPlayerList from './LayoutTournamentsCardtournamentEditTournamentPlayerList'

type EditTournamentProps = {
  id?: string
  description: string
  initialDate: any
  finalDate: any
  players?: Array<string>
}

type EditProps = {
  tournament: EditTournamentProps
}

const LayoutTournamentsCardTournamentEditTournament = ({
  tournament
}: EditProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Array<string>>([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit, setValue } = useForm<EditTournamentProps>({
    defaultValues: {
      ...tournament,
      initialDate: format(new Date(tournament.initialDate), 'dd/MM/yyyy'),
      finalDate: format(new Date(tournament.finalDate), 'dd/MM/yyyy')
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutationEditTournament({
    onSuccess: () => {
      toast({
        title: 'Torneio editado com sucesso',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryTournaments'])
    }
  })

  const toast = useToast()

  const handleEditTournament: SubmitHandler<EditTournamentProps> = values => {
    const { description, initialDate, finalDate } = values

    const initialParsed = parse(initialDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })
    const finalParsed = parse(finalDate, 'dd/MM/yyyy', new Date(), {
      locale: ptBR
    })

    const tournamentEdited = {
      id: tournament.id,
      description,
      initialDate: format(initialParsed, 'yyyy-MM-dd'),
      finalDate: format(finalParsed, 'yyyy-MM-dd'),
      players: selectedPlayers,
      active: true
    }

    mutate(tournamentEdited)
  }

  const onChangeDate = (e: any, fieldName: any) => {
    const { value = '' } = e.target

    setValue(fieldName, formatDate(value))
  }

  console.log(tournament)

  return (
    <>
      <MenuItem icon={<EditIcon />} onClick={onOpen}>
        Editar
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar torneio</ModalHeader>
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
                <FormLabel>Data Inicial</FormLabel>
                <Input
                  {...register('initialDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'initialDate')}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Data Final</FormLabel>
                <Input
                  {...register('finalDate')}
                  placeholder="__/__/____"
                  onChange={e => onChangeDate(e, 'finalDate')}
                />
              </FormControl>
            </Flex>

            <LayoutTournamentsCardtournamentEditTournamentPlayerList
              setSelectedPlayers={setSelectedPlayers}
              tournament={tournament}
            />

            <ModalFooter justifyContent="space-between" px="0" mt="30px">
              <Button variant="text" onClick={onClose} p="0">
                Cancelar
              </Button>

              <Button
                onClick={handleSubmit(handleEditTournament)}
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

export default LayoutTournamentsCardTournamentEditTournament

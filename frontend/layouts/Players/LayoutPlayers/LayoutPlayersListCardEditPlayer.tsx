import { EditIcon } from '@chakra-ui/icons'

import {
  Button,
  Checkbox,
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutationEditPlayer } from 'service/players'

type PlayerProps = {
  id: string
  name: string
  phone: string
  active: boolean
}

type EditPlayerProps = {
  player: PlayerProps
}

const LayoutPlayersListCardEditPlayer = ({ player }: EditPlayerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

  const { register, handleSubmit } = useForm<PlayerProps>({
    defaultValues: {
      ...player
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutationEditPlayer({
    onSuccess: () => {
      toast({
        title: 'Jogador editado com sucesso',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryPlayers'])
    }
  })

  const handleEditPlayer: SubmitHandler<PlayerProps> = values => {
    console.log(values)
    mutate({ ...values, id: player.id })
  }

  return (
    <>
      <MenuItem icon={<EditIcon />} onClick={onOpen}>
        Editar
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar torneio</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl>
              <FormLabel>Nome do jogador</FormLabel>
              <Input
                {...register('name')}
                placeholder="Ex: Jimi Hendrix da Silva"
              />
            </FormControl>

            <FormControl mt="25px">
              <FormLabel>Número do contato</FormLabel>
              <Input
                {...register('phone')}
                placeholder="Ex: (46) 99111-11111"
              />
            </FormControl>

            <FormControl mt="25px">
              <Checkbox colorScheme="orange" {...register('active')}>
                Jogador ativo
              </Checkbox>
            </FormControl>

            <ModalFooter justifyContent="space-between" px="0" mt="30px">
              <Button variant="text" onClick={onClose} p="0">
                Cancelar
              </Button>

              <Button
                onClick={handleSubmit(handleEditPlayer)}
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

export default LayoutPlayersListCardEditPlayer

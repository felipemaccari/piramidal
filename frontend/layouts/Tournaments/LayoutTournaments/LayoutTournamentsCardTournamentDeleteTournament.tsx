import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

import { useQueryClient } from '@tanstack/react-query'
import { BiTrash } from 'react-icons/bi'
import { useMutationDeleteTournamentPlayers } from 'service/tournaments'

const LayoutTournamentsCardTournamentDeleteTournament = ({
  tournament
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutationDeleteTournamentPlayers({
    onSuccess: () => {
      onClose()
      toast({
        title: 'O torneio foi removido!',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryTournaments'])
    },
    onError: () => {
      toast({
        title: 'Não foi possível remover o torneio. Tente novamente.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  })

  const handleFinishTournament = () => {
    mutate(tournament.id)
  }

  return (
    <>
      <MenuItem onClick={onOpen} icon={<BiTrash />} color="red">
        Remover Torneio
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja realmente remover o torneio?</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Text textAlign="center">
              Essa ação <strong>não</strong> poderá ser revertida
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="space-between" px="10px">
            <Button variant="link" onClick={onClose} color="charcoal">
              Cancelar
            </Button>

            <Button
              isLoading={isLoading}
              variant="solid"
              background="red"
              color="white"
              onClick={handleFinishTournament}
            >
              Remover
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LayoutTournamentsCardTournamentDeleteTournament

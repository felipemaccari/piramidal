import { CloseIcon } from '@chakra-ui/icons'
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
import { useMutationEditTournament } from 'service/tournaments'

const LayoutTournamentsCardTournamentFinishTournament = ({
  tournament
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutationEditTournament({
    onSuccess: () => {
      toast({
        title: 'O torneio foi encerrado!',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryTournaments'])
    },
    onError: () => {
      toast({
        title: 'Não foi possível encerrar o torneio. Tente novamente.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  })

  const handleFinishTournament = () => {
    console.log(tournament)
    mutate({ ...tournament, active: false })
  }

  return (
    <>
      <MenuItem onClick={onOpen} icon={<CloseIcon />}>
        Encerrar Torneio
      </MenuItem>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja realmente encerrar o torneio?</ModalHeader>

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
              background="primary"
              color="white"
              onClick={handleFinishTournament}
            >
              Encerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LayoutTournamentsCardTournamentFinishTournament

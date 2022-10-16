import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
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
import styled from '@emotion/styled'
import { useQueryClient } from '@tanstack/react-query'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutationAddPlayer } from 'service/players'
import { onlyNumbers } from 'utils/formatters'

const StyledForm = styled.form`
  width: 100%;
`

type AddPlayerFormData = {
  name: string
  phone: string
}

const LayoutPlayersAddPlayer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { register, handleSubmit } = useForm<AddPlayerFormData>()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutationAddPlayer({
    onSuccess: () => {
      toast({
        title: 'Novo jogador incluído com sucesso',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

      queryClient.invalidateQueries(['queryPlayers'])
    }
  })

  const toast = useToast()

  const handleSignIn: SubmitHandler<AddPlayerFormData> = async values => {
    mutate({ ...values, phone: onlyNumbers(values.phone) })
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
        Novo Jogador
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar novo jogador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StyledForm onSubmit={handleSubmit(handleSignIn)}>
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

              <ModalFooter justifyContent="space-between">
                <Button variant="solid" onClick={onClose} p="0">
                  Cancelar
                </Button>

                <Button
                  isLoading={isLoading}
                  variant="solid"
                  background="primary"
                  color="white"
                  type="submit"
                >
                  Salvar
                </Button>
              </ModalFooter>
            </StyledForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LayoutPlayersAddPlayer

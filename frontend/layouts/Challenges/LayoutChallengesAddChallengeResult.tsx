import { EditIcon } from '@chakra-ui/icons'

import {
  Avatar,
  Button,
  Checkbox,
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
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ListChallengeProps,
  ListChallengeResults,
  useMutationAddChallengeResults
} from 'service/challenges'

import { formatDate } from 'utils/formatters'

type ChallengeProps = {
  challengeInformation: ListChallengeProps
}

const LayoutChallengesAddChallengeResult = ({
  challengeInformation
}: ChallengeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log('challengeInformation', challengeInformation)

  const { register, handleSubmit, setValue, reset } =
    useForm<ListChallengeResults>()

  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutationAddChallengeResults(
    challengeInformation.id,
    {
      onSuccess: () => {
        toast({
          title: 'Resultados incluídos com sucesso',
          status: 'success',
          duration: 4000,
          isClosable: true
        })

        reset()

        queryClient.invalidateQueries(['queryListChallengeResults'])

        onClose()
      }
    }
  )

  const handleAddChallenge: SubmitHandler<ListChallengeResults> = values => {
    const { gameDate } = values

    console.log(gameDate)

    let gameDateParsed

    if (gameDate) {
      gameDateParsed = format(
        parse(gameDate, 'dd/MM/yyyy', new Date(), {
          locale: ptBR
        }),
        'yyyy-MM-dd'
      )
    }

    const results = {
      ...values,
      gameDate: gameDateParsed
    }

    mutate(results)
  }

  const onChangeDate = (e: any, fieldName: any) => {
    const { value = '' } = e.target

    setValue(fieldName, formatDate(value))
  }

  return (
    <>
      <Flex justify="flex-end" mt="10px">
        <Button
          onClick={onOpen}
          leftIcon={<EditIcon />}
          variant="solid"
          background="primary"
          color="white"
          _hover={{
            transition: ' transform 300ms',
            transform: 'translateY(-2px)'
          }}
        >
          Editar Resultados
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar resultados para o desafio</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <Flex justifyContent={'space-between'} mt="20px">
                <FormControl pr="20px">
                  <Checkbox
                    colorScheme="orange"
                    {...register('originPlayerGiveup')}
                  >
                    {`${challengeInformation.originPlayerName} desistiu`}
                  </Checkbox>
                </FormControl>

                <FormControl pr="20px">
                  <Checkbox
                    colorScheme="orange"
                    {...register('destinationPlayerGiveup')}
                  >
                    {`${challengeInformation.destinationPlayerName} desistiu`}
                  </Checkbox>
                </FormControl>

                <FormControl pr="20px">
                  <Checkbox colorScheme="orange" {...register('expired')}>
                    O jogo expirou
                  </Checkbox>
                </FormControl>

                <FormControl pr="20px">
                  <Checkbox colorScheme="orange" {...register('refused')}>
                    O desafio foi recusado
                  </Checkbox>
                </FormControl>
              </Flex>

              <Flex maxW="180px" mt="20px">
                <FormControl pr="20px">
                  <FormLabel>Data do jogo</FormLabel>
                  <Input
                    {...register('gameDate')}
                    placeholder="__/__/____"
                    onChange={e => onChangeDate(e, 'gameDate')}
                  />
                </FormControl>
              </Flex>

              <Flex direction="column" mt="30px">
                <Flex align="center" my="10px">
                  <Flex align="center" width="150px">
                    <Text fontSize="1rem" fontWeight={600}>
                      Jogadores
                    </Text>
                  </Flex>

                  <Text
                    fontSize="1rem"
                    fontWeight={600}
                    width="80px"
                    textAlign="center"
                    mr="30px"
                  >
                    1º Set
                  </Text>

                  <Text
                    fontSize="1rem"
                    fontWeight={600}
                    width="80px"
                    textAlign="center"
                    mr="30px"
                  >
                    2º Set
                  </Text>

                  <Text
                    fontSize="1rem"
                    fontWeight={600}
                    width="80px"
                    textAlign="center"
                    mr="30px"
                  >
                    Tiebreak
                  </Text>
                </Flex>

                <Flex align="center" borderBottom="1px solid #ccc" maxW="50%">
                  <Flex align="center" width="150px" my="10px">
                    <Avatar
                      mr="15px"
                      name={challengeInformation.originPlayerName}
                      size="sm"
                    />

                    <Text fontSize="1rem" fontWeight={600}>
                      {challengeInformation.originPlayerName}
                    </Text>
                  </Flex>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('originPlayerFirstSet')}
                    />
                  </FormControl>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('originPlayerSecondSet')}
                    />
                  </FormControl>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('originPlayerTiebreak')}
                    />
                  </FormControl>
                </Flex>

                <Flex align="center" my="10px">
                  <Flex align="center" width="150px">
                    <Avatar
                      mr="15px"
                      name={challengeInformation.destinationPlayerName}
                      size="sm"
                    />

                    <Text fontSize="1rem" fontWeight={600}>
                      {challengeInformation.destinationPlayerName}
                    </Text>
                  </Flex>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('destinationPlayerFirstSet')}
                    />
                  </FormControl>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('destinationPlayerSecondSet')}
                    />
                  </FormControl>

                  <FormControl width="80px" mr="30px">
                    <Input
                      type="number"
                      {...register('destinationPlayerTiebreak')}
                    />
                  </FormControl>
                </Flex>
              </Flex>

              <ModalFooter justifyContent="space-between" px="0" mt="30px">
                <Button variant="text" onClick={onClose} p="0">
                  Cancelar
                </Button>

                <Flex>
                  <FormControl pr="20px">
                    <Checkbox colorScheme="orange" {...register('finished')}>
                      Encerrar desafio
                    </Checkbox>
                  </FormControl>

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
                </Flex>
              </ModalFooter>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LayoutChallengesAddChallengeResult

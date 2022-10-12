import Image from 'next/image'
import { useRouter } from 'next/router'

import styled from '@emotion/styled'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { NextPageWithLayout } from 'types/page'

import { signIn } from 'next-auth/react'
import piramidal from 'public/assets/brand/pyramidal.png'

const StyledForm = styled.form`
  width: 100%;
`

type SignInFormData = {
  email: string
  password: string
}

const Home: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<SignInFormData>()

  const toast = useToast()
  const router = useRouter()

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (res?.error) {
      toast({
        title: `${res?.error}`,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }

    if (res?.url) router.push('/admin')
  }

  return (
    <Flex
      height="100vh"
      width="100%"
      justify="center"
      align="center"
      direction="column"
      px="40%"
    >
      <Image
        src={piramidal}
        alt="Logo do sistema Piramidal"
        width={169}
        height={150}
      />

      <StyledForm onSubmit={handleSubmit(handleSignIn)}>
        <FormControl mt="40px">
          <FormLabel>Seu email</FormLabel>
          <Input type="email" {...register('email')} />
        </FormControl>

        <FormControl mt="25px">
          <FormLabel>Sua senha</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>

        <Button
          mt="40px"
          width="100%"
          color="white"
          background="primary"
          type="submit"
        >
          Acessar
        </Button>
      </StyledForm>
    </Flex>
  )
}

export default Home

Home.getLayout = page => {
  return <>{page}</>
}

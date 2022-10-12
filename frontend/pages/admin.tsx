import Image from 'next/image'

import { Button, Flex } from '@chakra-ui/react'

import { NextPageWithLayout } from 'types/page'

import { signOut } from 'next-auth/react'
import piramidal from 'public/assets/brand/pyramidal.png'

const Admin: NextPageWithLayout = () => {
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

      <Button
        mt="40px"
        width="100%"
        color="white"
        background="primary"
        type="submit"
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/login' })}
      >
        Acessar
      </Button>
    </Flex>
  )
}

Admin.auth = true
export default Admin

Admin.getLayout = page => {
  return <>{page}</>
}

import Image from 'next/image'
import NextLink from 'next/link'

import { useSession } from 'next-auth/react'

import { Button, Flex, Link } from '@chakra-ui/react'
import NavbarAvatarMenu from './NavbarAvatarMenu'
import NavbarOptions from './NavbarOptions'

const Navbar = () => {
  const session = useSession()

  return (
    <Flex
      height="70px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      align="center"
      px="20px"
      justify="space-between"
    >
      <Flex align="center">
        <Image
          alt="Logo do piramidal"
          src="/assets/brand/piramidal-horizontal.png"
          height={50}
          width={195}
        />

        <NavbarOptions />
      </Flex>

      {!session.data && session.status !== 'loading' ? (
        <NextLink href="/login" passHref>
          <Link>
            <Button background="primary" color="white">
              Acessar
            </Button>
          </Link>
        </NextLink>
      ) : (
        <NavbarAvatarMenu />
      )}
    </Flex>
  )
}

export default Navbar

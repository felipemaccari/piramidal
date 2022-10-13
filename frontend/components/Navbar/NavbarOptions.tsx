import NextLink from 'next/link'

import { useSession } from 'next-auth/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

const NavbarOptions = () => {
  const session = useSession()

  return (
    <Menu>
      <MenuButton
        ml="50px"
        as={Button}
        background="none"
        rightIcon={<ChevronDownIcon />}
      >
        Atividades
      </MenuButton>

      <MenuList>
        <MenuItem>
          <NextLink href="/players">
            <Link>Jogadores</Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default NavbarOptions

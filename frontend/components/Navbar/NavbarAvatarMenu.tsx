import { signOut, useSession } from 'next-auth/react'

import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

const NavbarAvatarMenu = () => {
  const session = useSession()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        background="none"
        borderRadius="50%"
        _hover={{
          transition: ' transform 300ms',
          transform: 'translateY(-2px)'
        }}
      >
        <Avatar name={session?.data?.user?.name || ''} background="blue" />
      </MenuButton>

      <MenuList>
        <MenuItem onClick={() => signOut()}>Sair</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default NavbarAvatarMenu

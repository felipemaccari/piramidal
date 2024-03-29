// @ts-nocheck

import NextLink from 'next/link'

import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import SelectTournament from 'components/SelectTournament'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AiOutlineHome, AiOutlineTrophy, AiOutlineUser } from 'react-icons/ai'
import { IoTennisballOutline } from 'react-icons/io5'

const sidebarOptions = [
  {
    name: 'Torneio atual',
    icon: <AiOutlineHome size={25} />,
    link: '/',
    private: false
  },
  {
    name: 'Jogadores',
    icon: <AiOutlineUser size={25} />,
    link: '/players',
    private: true
  },
  {
    name: 'Desafios',
    icon: <IoTennisballOutline size={22} />,
    link: '/challenges',
    private: false
  },
  {
    name: 'Torneios',
    icon: <AiOutlineTrophy size={25} />,
    link: '/tournaments',
    private: true
  }
]

const Sidebar = () => {
  const { data: session, status } = useSession()

  const router = useRouter()

  return (
    <Flex
      overflow="hidden"
      position="sticky"
      direction="column"
      minHeight="calc(100vh - 70px)"
      width="15%"
      boxShadow=" rgba(0, 0, 0, 0.1) 0px 4px 12px"
    >
      <List pt={status !== 'loading' && !session?.user ? '30px' : '0'}>
        <ListItem>
          <SelectTournament />
        </ListItem>

        {status !== 'loading' && !!session?.user && (
          <>
            <ListItem>
              <Flex px="30px" my="30px">
                <Button
                  leftIcon={<AddIcon />}
                  variant="solid"
                  width="100%"
                  background="primary"
                  color="white"
                >
                  Novo Desafio
                </Button>
              </Flex>
            </ListItem>

            <Divider mb="20px" />
          </>
        )}

        {sidebarOptions
          .filter(option => {
            if (option.private) {
              return status !== 'loading' && !!session?.user
            }

            return option
          })
          .map((option, index) => (
            <NextLink key={index} href={option.link} passHref>
              <Link _hover={{ color: 'white' }}>
                <Flex
                  align="center"
                  width="100%"
                  color={router.asPath === option.link ? 'primary' : 'gray'}
                  px="20px"
                  py="20px"
                  justify="space-between"
                  transition="0.3s"
                  borderRadius="2px"
                  _hover={{
                    background: '#FF731Df2',
                    color: 'white'
                  }}
                >
                  <Flex align="center">
                    <Box width="25px">{option.icon}</Box>

                    <Text ml="15px" fontWeight="600">
                      {option.name}
                    </Text>
                  </Flex>

                  <ChevronRightIcon fontSize={20} />
                </Flex>
              </Link>
            </NextLink>
          ))}
      </List>
    </Flex>
  )
}

export default Sidebar

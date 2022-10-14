import { Flex } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

type MainLayoutProps = {
  children: JSX.Element
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />

      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </>
  )
}

export default MainLayout

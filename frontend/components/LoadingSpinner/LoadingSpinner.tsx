import { Flex, Spinner } from '@chakra-ui/react'

const LoadingSpinner = () => (
  <Flex
    height="calc(100vh - 70px)"
    overflow="hidden"
    color="primary"
    width="100%"
    align="center"
    justify="center"
    flex={1}
    direction="column"
  >
    <Spinner size="lg" />
  </Flex>
)

export default LoadingSpinner

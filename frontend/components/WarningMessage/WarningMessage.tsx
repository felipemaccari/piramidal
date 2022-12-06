import { Flex, Text } from '@chakra-ui/react'

type WarningMessageProps = {
  title: string
  subtitle?: string
}

const WarningMessage = ({ title, subtitle }: WarningMessageProps) => {
  return (
    <Flex
      my="100px"
      align="center"
      justify="center"
      width="100%"
      direction="column"
    >
      <Text
        color="grayText"
        fontWeight="700"
        fontSize="2rem"
        textAlign="center"
      >
        {title}
      </Text>

      <Text
        color="grayText"
        fontWeight="500"
        fontSize="1rem"
        textAlign="center"
      >
        {subtitle}
      </Text>
    </Flex>
  )
}

export default WarningMessage

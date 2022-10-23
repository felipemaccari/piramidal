import { useState } from 'react'

import { Avatar, Box, Checkbox, Flex, Text } from '@chakra-ui/react'

import { formatPhone } from 'utils/formatters'

const LayoutTournamentsAddTournamentPlayerListCard = ({
  player,
  setSelectedPlayers = [],
  isSelected
}: any) => {
  const [selected, setSelected] = useState<boolean>(isSelected)

  console.log(isSelected)

  const handleSelectPlayer = () => {
    if (selected) {
      setSelectedPlayers((selectedPlayers: Array<string>) =>
        selectedPlayers.filter(selected => selected !== player)
      )
      setSelected(false)

      return
    }

    setSelectedPlayers((selectedPlayers: Array<string>) => [
      ...selectedPlayers,
      player.id
    ])
    setSelected(true)
  }

  return (
    <Flex
      key={player.id}
      width="100%"
      borderRadius="4px"
      _hover={{ cursor: 'pointer', background: '#ddddddeb' }}
      px="40px"
      background={selected ? '#dddddd9e' : 'initial'}
      transition="0.5rem"
      mt="3px"
    >
      <Flex width="100%" align="center" my="15px" borderRadius="8px">
        <Flex flex={1} align="center">
          <Box width="80px">
            <Avatar name={player.name} />
          </Box>

          <Box width="33%">
            <Text fontSize="0.8rem" fontWeight={700}>
              Nome
            </Text>

            <Text fontSize="1rem">{player.name || ''}</Text>
          </Box>

          <Box width="33%">
            <Text fontSize="0.8rem" fontWeight={700}>
              Telefone
            </Text>

            <Text>{formatPhone(player.phone) || '-'}</Text>
          </Box>
        </Flex>
      </Flex>

      <Checkbox
        borderColor="primary"
        iconColor="primary"
        size="lg"
        defaultChecked={isSelected}
        isChecked={selected}
        onChange={handleSelectPlayer}
      />
    </Flex>
  )
}

export default LayoutTournamentsAddTournamentPlayerListCard

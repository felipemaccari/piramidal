import {
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { ActiveTournamentPlayers } from 'service/tournaments'

type PyramidItemProps = {
  tournamentPlayer: ActiveTournamentPlayers
}

const PyramidItem = ({ tournamentPlayer }: PyramidItemProps) => {
  const initialParsed = parseISO(tournamentPlayer.activeChallenge?.initialDate)

  const finalParsed = parseISO(tournamentPlayer.activeChallenge?.finalDate)

  return (
    <Popover trigger="hover" placement="top-end">
      <PopoverTrigger>
        <Flex
          mb="-1px"
          mr="-1px"
          border="1px solid #ccc"
          borderRadius="4px"
          justify="center"
          width="170px"
          align="center"
          height="50px"
          background={tournamentPlayer.activeChallenge ? 'red' : 'white'}
          color={tournamentPlayer.activeChallenge ? 'white' : 'black'}
          _hover={{
            background: '#eee',
            cursor: 'pointer',
            color: 'black',
            transition: ' transform 300ms',
            transform: 'translateY(-2px)'
          }}
        >
          <Text textAlign="center" fontWeight={600} fontSize="0.9rem">
            {tournamentPlayer.player.name}
          </Text>
        </Flex>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

        <PopoverBody>
          {!tournamentPlayer.activeChallenge && (
            <Text fontWeight={500}>Esse jogador pode ser desafiado!</Text>
          )}

          {tournamentPlayer.activeChallenge && (
            <Flex direction="column">
              <Flex my="3px">
                <Text fontWeight={600}>Desafiador:</Text>
                <Text>
                  {tournamentPlayer.activeChallenge?.originPlayerName}
                </Text>
              </Flex>

              <Flex my="3px">
                <Text fontWeight={600}>Desafiado:</Text>
                <Text>
                  {tournamentPlayer.activeChallenge?.destinationPlayerName}
                </Text>
              </Flex>

              <Flex my="3px">
                <Text fontWeight={600}>Data do Desafio:</Text>
                <Text>{format(initialParsed, 'dd/MM/yyyy')}</Text>
              </Flex>

              <Flex my="3px">
                <Text fontWeight={600}>Prazo Final:</Text>
                <Text>{format(finalParsed, 'dd/MM/yyyy')}</Text>
              </Flex>
            </Flex>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PyramidItem

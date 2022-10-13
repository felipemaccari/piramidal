import { useEffect, useState } from 'react'

import { Flex, Spinner, Text } from '@chakra-ui/react'
import { useQueryTournamentPlayers } from 'service/tournaments'

type PlayersProps = {
  name: string
}
type PlayersListProps = Array<PlayersProps>
type TournamentProps = {
  id: string
}
type PyramidProps = {
  tournamentID: Array<TournamentProps>
}

const Pyramid = ({ tournamentID }: PyramidProps) => {
  const [playerLines, setPlayerLines] = useState<PlayersListProps[]>([])

  const { data = [], isLoading } = useQueryTournamentPlayers(tournamentID[0].id)

  useEffect(() => {
    if (data) {
      let pyramidItems: PlayersListProps[] = []

      let countIterator = 0
      let quantity = 1
      let playerPerLine = 2

      while (countIterator < data.length) {
        pyramidItems = [...pyramidItems, data.slice(countIterator, quantity)]

        countIterator = quantity
        quantity = quantity + playerPerLine
        playerPerLine = playerPerLine + 2
      }

      setPlayerLines(pyramidItems)
    }
  }, [data])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Flex direction="column">
      {playerLines.map((player, index) => (
        <Flex key={index} justify="center">
          {player.map((pl, index) => (
            <Flex
              mb="-1px"
              mr="-1px"
              key={index}
              border="1px solid #ccc"
              borderRadius="4px"
              justify="center"
              width="170px"
              align="center"
              height="50px"
              background="white"
              _hover={{
                background: '#eee',
                cursor: 'pointer',
                transition: ' transform 300ms',
                transform: 'translateY(-2px)'
              }}
            >
              <Text textAlign="center">{pl.name}</Text>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

export default Pyramid

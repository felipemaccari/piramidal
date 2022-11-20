import { useEffect, useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { ActiveTournamentPlayers } from 'service/tournaments'
import PyramidItem from './PyramidItem'

type PyramidProps = {
  tournamentPlayers: Array<ActiveTournamentPlayers>
}

const Pyramid = ({ tournamentPlayers }: PyramidProps) => {
  const [playerLines, setPlayerLines] = useState<
    Array<ActiveTournamentPlayers>
  >([])

  useEffect(() => {
    if (tournamentPlayers) {
      let pyramidItems: any[] = []

      let countIterator = 0
      let quantity = 1
      let playerPerLine = 2

      while (countIterator < tournamentPlayers.length) {
        pyramidItems = [
          ...pyramidItems,
          tournamentPlayers.slice(countIterator, quantity)
        ]

        countIterator = quantity
        quantity = quantity + playerPerLine
        playerPerLine = playerPerLine + 2
      }

      setPlayerLines(pyramidItems)
    }
  }, [tournamentPlayers])

  return (
    <Flex direction="column">
      {playerLines.map((item: any, index: any) => (
        <Flex key={index} justify="center">
          {item.map((item: any, index: any) => (
            <PyramidItem key={item.player.id} tournamentPlayer={item} />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

export default Pyramid

import { useEffect, useLayoutEffect, useState } from 'react'

import { Flex, Text } from '@chakra-ui/react'

const playersList = [
  { name: 'Adriana Manarin' },
  { name: 'Adriano Cassio' },
  { name: 'Álvaro Maciel' },
  { name: 'Álvaro Piccinin' },
  { name: 'André Babinski' },
  { name: 'André Philipsen' },
  { name: 'Andrei' },
  { name: 'Augusto' },
  { name: 'Belmar' },
  { name: 'Betão' },
  { name: 'Cassiano' },
  { name: 'Chicoski' },
  { name: 'Cleverton' },
  { name: 'Cobra' },
  { name: 'Dayane Rita' },
  { name: 'Diego Bitdinger' },
  { name: 'Diego Machado' },
  { name: 'Eduardo Tonet' },
  { name: 'Elisandro' },
  { name: 'Emerson Polzin' },
  { name: 'Evandro Juttel' },
  { name: 'Gislaine' },
  { name: 'Ivan Fantinel' },
  { name: 'Ivanildo' },
  { name: 'Iyoran' },
  { name: 'Jeanrie' },
  { name: 'Luciano' },
  { name: 'Luiz Henrique' },
  { name: 'Lula' },
  { name: 'Maccari' },
  { name: 'Magro' },
  { name: 'Marcelo' },
  { name: 'Marcos Sato' },
  { name: 'Marlon Cherobin' },
  { name: 'Matheus Nichetti' },
  { name: 'Molon' },
  { name: 'Neto' },
  { name: 'Peroni' },
  { name: 'Pila' },
  { name: 'Processo' },
  { name: 'Rafael Bellé' },
  { name: 'Rafael Strapasson' },
  { name: 'Reis' },
  { name: 'Robson' },
  { name: 'Ronaldo' },
  { name: 'Samuel' },
  { name: 'Sandro' },
  { name: 'Sergio Henrique' },
  { name: 'Tainã' },
  { name: 'Urso' },
  { name: 'Vivan' },
  { name: 'Wellington' }
]

const Pyramid = () => {
  const [playerLines, setPlayerLines] = useState([])

  useEffect(() => {
    let mouting = []

    let var1Index = 0
    let var2Quantidade = 1
    let lineNumber = 2

    while (var1Index < playersList.length) {
      mouting = [...mouting, playersList.slice(var1Index, var2Quantidade)]

      var1Index = var2Quantidade
      var2Quantidade = var2Quantidade + lineNumber
      lineNumber = lineNumber + 2
    }

    setPlayerLines(mouting)
  }, [])

  return (
    <Flex direction="column">
      {playerLines.map((player, index) => (
        <Flex key={index} justify="center">
          {player.map((pl, index) => (
            <Flex
              key={index}
              border="1px solid #ccc"
              justify="center"
              width="100px"
              align="center"
              height="100px"
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

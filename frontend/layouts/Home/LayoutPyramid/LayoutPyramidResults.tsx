import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import LoadingSpinner from 'components/LoadingSpinner'
import WarningMessage from 'components/WarningMessage'
import { useQueryTournamentResults } from 'service/tournaments'

type PyramidResultsProps = {
  tournamentID: string
}

const LayoutPyramidResults = ({ tournamentID }: PyramidResultsProps) => {
  const { data: tournamentResults, isLoading } = useQueryTournamentResults(
    tournamentID,
    {}
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!tournamentResults) {
    return (
      <WarningMessage
        title="Nenhum desafio cadastrado no momento!"
        subtitle="Você ja pode desafiar os outros jogadores e movimentar o torneio!"
      />
    )
  }

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Atleta</Th>
            <Th>Desafios Realizados</Th>
            <Th>Desafios Recebidos</Th>
            <Th>Pontuação Desafiado</Th>
            <Th>Vitórias Desafiado</Th>
            <Th>Pontuação Desafiador</Th>
            <Th>Vitórias Desafiador</Th>
            <Th>Pontuação Total</Th>
          </Tr>
        </Thead>

        <Tbody>
          {tournamentResults
            .sort((previous, next) => next.pointsTotal - previous.pointsTotal)
            .map(result => (
              <Tr key={result.id}>
                <Td>{result.name}</Td>
                <Td>{result.challengesAsOrigin}</Td>
                <Td>{result.challengesAsDestination}</Td>
                <Td>{result.pointsAsDestination}</Td>
                <Td>{result.winAsDestination}</Td>
                <Td>{result.pointsAsOrigin}</Td>
                <Td>{result.winAsOrigin}</Td>
                <Td>{result.pointsTotal}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default LayoutPyramidResults

import { QueryOptions, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

export const useQueryTournament = (options: QueryOptions) =>
  useQuery<[]>(['queryTournaments'], async () => {
    const api = await getApi()

    return api.get(`${URL_API}/tournaments`).then(result => result.data)
  })

export const useQueryTournamentPlayers = (tournamentID: string) =>
  useQuery<[], QueryOptions>(['queryTournaments', tournamentID], async () => {
    const api = await getApi()

    return api
      .get(`${URL_API}/tournaments/${tournamentID}`)
      .then(result => result.data)
  })

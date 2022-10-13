import axios from 'axios'

import { QueryOptions, useQuery } from '@tanstack/react-query'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

export const useQueryTournament = (options: QueryOptions) =>
  useQuery<[]>(['queryTournaments'], () =>
    axios.get(`${URL_API}/tournaments`).then(result => result.data)
  )

export const useQueryTournamentPlayers = (tournamentID: string) =>
  useQuery<[], QueryOptions>(['queryTournaments', tournamentID], () =>
    axios
      .get(`${URL_API}/tournaments/${tournamentID}`)
      .then(result => result.data)
  )

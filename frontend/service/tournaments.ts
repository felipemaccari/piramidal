import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type AddTournamentProps = {
  id?: string
  description?: any
  initialDate?: any
  finalDate?: string
  players?: Array<string>
  active?: boolean
}

export const useQueryListTournaments = (options: {}) =>
  useQuery<Array<AddTournamentProps>>(
    ['queryTournaments'],
    async () => {
      const api = await getApi()

      return api.get(`${URL_API}/tournaments`).then(result => result.data)
    },
    options
  )

export const useQueryTournamentPlayers = (tournamentID: string, options: {}) =>
  useQuery<[], QueryOptions>(
    ['queryTournaments', tournamentID],
    async () => {
      const api = await getApi()

      return api
        .get(`${URL_API}/tournaments/${tournamentID}`)
        .then(result => result.data)
    },
    { ...options }
  )

export const useMutationAddTournament = (options: any) =>
  useMutation(async (tournamentData: AddTournamentProps) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/tournaments`, { ...tournamentData })
      .then(result => result.data)
  }, options)

export const useMutationEditTournament = (options: any) =>
  useMutation(async (tournamentData: AddTournamentProps) => {
    const api = await getApi()

    return api
      .put(`${URL_API}/tournaments/${tournamentData.id}`, { ...tournamentData })
      .then(result => result.data)
  }, options)

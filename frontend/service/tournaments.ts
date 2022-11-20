import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type AddTournamentProps = {
  id: string
  description: string
  initialDate: any
  finalDate: any
  players: Array<string>
  active: boolean
}

export type ActiveChallenge = {
  id?: string
  initialDate: any
  finalDate: any
  originPlayerID?: string
  destinationPlayerID?: string
  tournamentID?: string
  createdAt?: Date
  updatedAt?: Date
  originPlayerName?: string
  destinationPlayerName?: string
}

type ActiveTournament = {
  id: string
  description: string
  initialDate: any
  finalDate: any
  active: boolean
  finished: boolean
  createdAt: Date
  updatedAt: Date
}

export type ChallengePlayer = {
  id: string
  name: string
  phone: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  position: number
  activeOnTournament: boolean
  playerID: string
  tournamentID: string
}

export type ActiveTournamentPlayers = {
  player: ChallengePlayer
  activeChallenge?: ActiveChallenge
}

export interface IListActiveTournamentDTO {
  tournament: ActiveTournament
  players: Array<ActiveTournamentPlayers>
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

export const useQueryListActiveTournament = (options: {}) =>
  useQuery<IListActiveTournamentDTO>(
    ['queryListActiveTournament'],
    async () => {
      const api = await getApi()

      return api
        .get(`${URL_API}/tournaments/active`)
        .then(result => result.data)
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

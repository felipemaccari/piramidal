import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'
import { TOURNAMENT_KEY } from 'utils/constants'

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

export interface IListTournamentResultsDTO {
  id: string
  position: number
  activeOnTournament: boolean
  playerID: string
  tournamentID: string
  createdAt: Date
  updatedAt: Date
  name: string
  phone: string
  active: boolean
  challengesAsOrigin: number
  pointsAsOrigin: number
  pointsTotal: number
  pointsAsDestination: number
  winAsDestination: number
  winAsOrigin: number
  challengesAsDestination: number
}

export const useQueryListTournaments = (options: {}) =>
  useQuery<Array<AddTournamentProps>>(
    ['queryTournaments'],
    async () => {
      const api = await getApi()

      return api.get(`${URL_API}/tournaments`).then(result => {
        const tournaments = result.data

        if (!tournaments.length) {
          window.localStorage.removeItem(TOURNAMENT_KEY)
          return
        }

        if (tournaments.length === 1) {
          window.localStorage.setItem(TOURNAMENT_KEY, tournaments[0].id)
        }

        return tournaments
      })
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

export const useQueryTournamentResults = (tournamentID: string, options: {}) =>
  useQuery<IListTournamentResultsDTO[], QueryOptions>(
    ['queryTournamentResults', tournamentID],
    async () => {
      const api = await getApi()

      return api
        .get(`${URL_API}/tournaments/${tournamentID}/results`)
        .then(result => result.data)
    },
    { ...options }
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

export const useMutationDeleteTournamentPlayers = (options: {}) =>
  useMutation<[], QueryOptions>(
    ['deleteTournaments'],
    async tournamentID => {
      const api = await getApi()

      return api
        .delete(`${URL_API}/tournaments/${tournamentID}`)
        .then(result => result.data)
    },
    { ...options }
  )

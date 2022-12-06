import { useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type AddChallengeProps = {
  tournamentID: string
  initialDate: any
  finalDate: string
  originPlayerID?: string
  destinationPlayerID?: string
}

export type ListChallengeProps = {
  id: string
  tournamentID: string
  initialDate: any
  finalDate: any
  originPlayerID: string
  originPlayerName: string
  destinationPlayerID: string
  destinationPlayerName: string
  gameDate: string
  finished: boolean
}

export type ListChallengeResults = {
  id: string
  gameDate: any
  originPlayerGiveup: boolean
  destinationPlayerGiveup: boolean
  refused: boolean
  expired: boolean
  finished: boolean
  originPlayerFirstSet: number
  destinationPlayerFirstSet: number
  originPlayerSecondSet: number
  destinationPlayerSecondSet: number
  originPlayerTiebreak: number
  destinationPlayerTiebreak: number
  originPlayerPoints: number
  destinationPlayerPoints: number
  challengeID: string
}

export const useMutationAddChallenge = (options: any) =>
  useMutation(async (challengeData: AddChallengeProps) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/challenges`, { ...challengeData })
      .then(result => result.data)
  }, options)

export const useQueryListChallengesByTournament = (
  tournamentID: string,
  options: {}
) =>
  useQuery<Array<ListChallengeProps>>(
    ['queryListChallengesByTournament'],
    async () => {
      const api = await getApi()

      return api
        .get(`${URL_API}/challenges/tournament/${tournamentID}`)
        .then(result => result.data)
    },
    options
  )

export const useQueryListAvaliableDestinationPlayer = (
  playerID: string,
  tournamentID: string,
  options: {}
) =>
  useQuery<[]>(
    ['queryListAvaliableDestinationPlayer'],
    async () => {
      const api = await getApi()

      return api
        .get(
          `${URL_API}/challenges/player-avaliable/${playerID}/${tournamentID}`
        )
        .then(result => result.data)
    },
    {
      enabled: false,
      ...options
    }
  )

export const useQueryListChallengeResults = (
  challengeID: string,
  options: {}
) =>
  useQuery<ListChallengeResults>(
    ['queryListChallengeResults', challengeID],
    async () => {
      const api = await getApi()

      return api
        .get(`${URL_API}/challenges/results/${challengeID}`)
        .then(result => result.data)
    },
    options
  )

export const useMutationAddChallengeResults = (
  challengeID: string,
  options: any
) =>
  useMutation(async (challengeResults: ListChallengeResults) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/challenges/results/${challengeID}`, {
        ...challengeResults
      })
      .then(result => result.data)
  }, options)

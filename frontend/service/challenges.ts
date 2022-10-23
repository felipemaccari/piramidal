import { useMutation } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type AddChallengeProps = {
  tournamentID: string
  initialDate: any
  finalDate: string
  originPlayerID?: string
  destinationPlayerID?: string
}

export const useMutationAddChallenge = (options: any) =>
  useMutation(async (challengeData: AddChallengeProps) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/challenges`, { ...challengeData })
      .then(result => result.data)
  }, options)

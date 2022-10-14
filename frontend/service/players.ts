import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type QueryPlayerProps = {
  id: string
  name: string
  email: string
}

type MutationPlayerProps = {
  name: string
  phone: string
}

export const useQueryPlayers = (options: QueryOptions) =>
  useQuery<Array<QueryPlayerProps>>(['queryPlayers'], async () => {
    const api = await getApi()

    return api.get(`${URL_API}/players`).then(result => result.data)
  })

export const useMutationAddPlayer = (options: any) =>
  useMutation(async (playerData: MutationPlayerProps) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/players`, { ...playerData })
      .then(result => result.data)
  }, options)

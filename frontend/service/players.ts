import { useMutation, useQuery } from '@tanstack/react-query'
import { getApi } from 'service'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

type QueryPlayerProps = {
  id: string
  name: string
  phone: string
  active: boolean
}

type MutationPlayerProps = {
  id?: string
  name: string
  phone: string
  active?: boolean
}

export const useQueryPlayers = (options: any) =>
  useQuery<Array<QueryPlayerProps>>(
    ['queryPlayers'],
    async () => {
      const api = await getApi()

      return api.get(`${URL_API}/players`).then(result => result.data)
    },
    options
  )

export const useMutationAddPlayer = (options: any) =>
  useMutation(async (playerData: MutationPlayerProps) => {
    const api = await getApi()

    return api
      .post(`${URL_API}/players`, { ...playerData, active: true })
      .then(result => result.data)
  }, options)

export const useMutationEditPlayer = (options: any) =>
  useMutation(async (playerData: MutationPlayerProps) => {
    const api = await getApi()

    return api
      .put(`${URL_API}/players/${playerData.id}`, {
        ...playerData
      })
      .then(result => result.data)
  }, options)

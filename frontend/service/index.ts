import axios from 'axios'

export const getApi = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST
  })

  const token = '123'
  api.defaults.headers.common.Authorization = `Bearer ${token}`

  return api
}

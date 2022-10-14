import axios from 'axios'

import { getSession } from 'next-auth/react'

export const getApi = async () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST
  })

  const tokenFrom = await getSession()

  api.interceptors.request.use(
    config => {
      config.headers['Authorization'] = 'Bearer ' + tokenFrom?.token
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  api.defaults.headers.common.Authorization = `Bearer ${tokenFrom}`

  return api
}

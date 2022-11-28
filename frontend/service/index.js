import axios from 'axios'

import { getSession, signOut } from 'next-auth/react'

export const getApi = async () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST
  })

  const tokenFrom = await getSession()

  api.interceptors.request.use(
    config => {
      config.headers.Authorization = 'Bearer ' + tokenFrom?.token
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  api.defaults.headers.common.Authorization = `Bearer ${tokenFrom}`

  api.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 401) {
        signOut()
      } else {
        return Promise.reject(error)
      }
    }
  )

  return api
}

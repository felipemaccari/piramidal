import axios from 'axios'

import { useMutation } from '@tanstack/react-query'

const URL_API = process.env.NEXT_PUBLIC_API_HOST

export const useMutationSendMail = (options = {}) =>
  useMutation(
    mailValues =>
      axios.post(`${URL_API}/`, mailValues).then(result => result.data.data),
    options
  )

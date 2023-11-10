import { QueryFunction } from '@tanstack/react-query'
import { axios } from './axios'

export const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  let path = queryKey.join('')

  return await axios.get(`${path}`)
}
